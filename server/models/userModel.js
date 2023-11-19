const crypto = require('crypto');
const mongoose = require('mongoose');
// const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'guide', 'lead_guide', 'user'],
      default: 'user'
    },
    name: {
      type: String,
      required: [true, 'Choose a username'],
      default: 'user'
    },
    discordName: {
      type: String,
      required: [true, 'Enter a discord name'],
      index: true
    },

    swiped: [
      {
        type:String
      }
    ],

    matched: [
      {
        type: String
      }
    ],

    photo: {
      type: String,
      required: false,
      default: 'default.jpg'
    },
    pronoun: {
      type: String,
      enum: ['He/Him', 'She/Her', 'They/Them', 'Prefer not to say'],
      default: 'Prefer not to say'
    },
    skillLevel: {
      type: String,
      required: [true, 'Please provide your skill level'],
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    userRole: {
      type: String,
      required: [true, 'Please provide your preferred role'],
      enum: ['Developer', 'Designer', 'Product Manager', 'Presenter'],
      default: 'Developer'
    },
    interests: {
      type: String,
      required: [true, 'Please provide your interests so we can best match you'],
      maxlength: [200, 'Enter up to 3 interests']
    },
    lookingForTeam: {
      type: Boolean,
      default: true
    },
  
  });
  
// MIDDLEWARE

const User = mongoose.model('User', userSchema);

module.exports = User;