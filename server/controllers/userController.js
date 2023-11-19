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

exports.updateProfile = catchAsync(async (req, res, next) => {
  // Assuming req.body contains a JSON object with user data
  const user = req.body;

  const usernameToUpdate = user.discordName;

  if (!user.profilePic) {
    console.log('No profile picture found');
  }

  // Decode base64 data and create a buffer
  const imageBuffer = Buffer.from(user.profilePic, 'base64');
  const filename = `${usernameToUpdate}.png`;

  // Resize and save the image to local storage
  sharp(imageBuffer)
    .resize(500, 500)
    .toFormat('png')
    .jpeg({ quality: 90 })
    .toFile(`devdata/img/users/${filename}`, (err) => {
      if (err) {
        return next(err); // Pass the error to the error handling middleware
      }

      console.log('Profile picture saved successfully:', filename);

      // Update the user in MongoDB
      User.updateOne({ username: usernameToUpdate }, {
        $set: {
          name: user.name,
          role: user.role,
          discordName: user.discordName,
          skillLevel: user.skillLevel,
          userRole: user.userRole,
          interests: user.interests,
          pronoun: user.pronoun,
          lookingForTeam: user.lookingForTeam,
          photo: `devdata/img/users/${filename}`,
        },
      })
        .then((result) => {
          console.log('User updated successfully:', result);
          res.status(201).json({
            status: 'Success',
            data: {
              user: result,
            },
          });
        })
        .catch((updateError) => {
          return next(updateError); // Pass the update error to the error handling middleware
        });
    });
});