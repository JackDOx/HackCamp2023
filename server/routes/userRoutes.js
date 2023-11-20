const express = require('express');
const passport = require('passport');
const session = require('express-session');
const DiscordStrategy = require('passport-discord').Strategy;
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const User = require('./../models/userModel');
const router = express.Router();

router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', 
  passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
    User.findOne({ discordName: req.user.username }, (err, existingUser) => {
      if (err) {
        // Handle the error
        console.error(err);
        return;
      }
    
      if (existingUser) {
        // User with the given username already exists
        console.log(`User with username ${req.user.username} already exists.`);
        res.redirect('http://localhost:3000/home');
      } else {
        // User with the given username doesn't exist
        const doc = User.create({
          name: 'Jack',
          role: 'user',
          discordName: req.user.username,
          skillLevel: 'Beginner',
          userRole: 'Developer',
          interests: 'I love Porsche'
        });
        // console.log(doc);
        res.redirect('/myProfile');
      }
    });
      
    // res.redirect('/api/users/profile');

});

router.patch('/updateProfile', authController.isAuthenticated, userController.updateProfile);

router.get('/getMatched',  userController.getMatched);

router.get('/logout', authController.isAuthenticated, authController.logout);

router.get('/swipe', authController.isAuthenticated, userController.swipe);

router.get('/recommendations', authController.isAuthenticated, userController.getRecommendations);
// This part requires authenticated logged in user
// router.use(authController.protect); // this middleware will be applied all the code below this line

router.get('/profile', authController.isAuthenticated, userController.getProfile);

router.get('/getAllUsers', userController.getAllUsers);




module.exports = router;
