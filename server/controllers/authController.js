const crypto = require('crypto');
const { promisify } = require('util'); // module to promisify the function
// ES6 destructuring 0 only take promisify from util
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('./../models/userModel');
const catchAsync = require('./../utils//catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');


// exports.auth = catchAsync(async (req, res, next) => {
//   passport.authenticate('discord');
// });


exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ status: 'successfully logged out' });
};

// exports.callback = catchAsync( async (req, res, next) => {
//   passport.authenticate('discord', { failureRedirect: '/' }),
//   (req, res) => {
//     console.log(req);
//   }
// });

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token;
  if (req.headers.authorization && 
  req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];

  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  };

  if(!token){
    return next(new AppError('You are not logged in! Please log in to get access', 401));
  };
  // 2) Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); 

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next( new AppError('The user belonging to this token no longer exists'),401);
  };
  // 4) Check if user changed password after the token was issued
  if(freshUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password! Pleas log in again', 401));
  };

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});



// Middleware to check if the user is authenticated
exports.isAuthenticated = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    req.user = await User.findOne({discordName: req.user.username});
    next();
  } else {
    next( new AppError('The user is not authenticated!', 403));
  }
});