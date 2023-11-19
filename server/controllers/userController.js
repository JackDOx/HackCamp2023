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

exports.getProfile = catchAsync( async (req, res, next) => {
  const doc = user.findOne(req.user.findOne({ discordName: req.user.userName}));
  if (!doc) {
    res.status(404).json({ status: 'No user found'});

  } else {
    res.status(200).json(doc);
  }
} );


exports.getAllUsers = catchAsync( async (req, res, next) => {
  const doc = await User.find();
  res.status(200).json({
    status: 'Success',
    users: doc
  });
});