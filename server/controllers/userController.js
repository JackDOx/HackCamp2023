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
  if (!doc) {
    res.status(404).json({ status: 'No user found'});

  } else {
    res.status(200).json(req.user);
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

  const discordNameToUpdate = user.discordName;

  if (!user.profilePic) {
    console.log('No profile picture found');
  }

  // Decode base64 data and create a buffer
  const imageBuffer = Buffer.from(user.profilePic, 'base64');
  const filename = `${discordNameToUpdate}.png`;

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
      User.updateOne({ username: discordNameToUpdate }, {
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
    res.status(200).json({
      status: 'Success',
      users: doc
    });
});

exports.getRecommendations = catchAsync( async (req, res, next) => {
  const roleToFind = req.body.role;
  const doc = await User.find({userRole: roleToFind});
  doc.filter( user => !req.user.swiped.includes(user.discordName));
  res.status(200).json({
    status: 'success',
    users: doc
  });
});

exports.getMatched = catchAsync(async (req, res, next) => {
  try {
    const matched = req.user.matched;
    console.log(matched);

    const doc = await Promise.all(
      matched.map(async (m) => {
        try {
          return await User.findOne({ discordName: m });
        } catch (error) {
          // Handle the error for the specific User.findOne call
          console.error(`Error in User.findOne for ${m}:`, error.message);
          return null; // or another value to indicate the error
        }
      })
    );

    console.log(doc);

    res.status(200).json({
      status: 'success',
      users: doc,
    });
  } catch (error) {
    // Handle any general error in the main try-catch block
    console.error('Error in getMatched:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});


exports.swipe = catchAsync( async (req, res, next) => {
  if (!req.body.user) {
    res.status(404).json({
      status: 'failed',
      message: 'no user found with this discordName'
    });
  }
  if (req.user.swiped.includes(req.body.user.discordName)) {
    res.status(302).json({
      status: 'failed',
      message: 'already swiped this user'
    });
  }

  if (req.body.user.swiped.includes(req.user.discordName)) {
    match(req, res, next);
  } else {
    const added = req.user.swiped.push(req.body.user.discordName);

    const doc = await User.findOneAndUpdate({discordName: req.user.discordName}, {swiped: added}, {new: true});
    res.status(200).json({
      status: 'success',
      message: 'successfully swiped'
    })
  }
  
});

const match = catchAsync( async (req, res, next) => {
  const removed = req.body.user.swiped.removeItemFromArray(req.body.user.swiped, req.user.discordName);
  const matched1 = req.user.matched.push(req.body.user.discordName);
  const matched2 = req.body.user.matched.push(req.user.discordName);
  const doc1 = await User.findOneAndUpdate({discordName: req.body.user.discordName}, {swiped: removed, matched: matched1}, {new: true});
  const doc2 = await User.findOneAndUpdate({discordName: req.user.discordName}, {swiped: removed, matched: matched2}, {new: true});

  if(doc1 & doc2) {
    res.status(200).json({
      status: 'success',
      message: 'Found a match'
    });
  }
});


function removeItemFromArray(array, itemToRemove) {
  const indexToRemove = array.indexOf(itemToRemove);

  if (indexToRemove !== -1) {
    array.splice(indexToRemove, 1);
    return true; // Indicates that the item was found and removed
  }

  return false; // Indicates that the item was not found in the array
}