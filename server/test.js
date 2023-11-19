const express = require('express');
const passport = require('passport');
const session = require('express-session');
const DiscordStrategy = require('passport-discord').Strategy;

const app = express();
const port = 3000;

// Replace these values with your Discord application's credentials
const discordClientId = '1175587561037643816';
const discordClientSecret = 'tAGbKaJfMFDJU_Xw5StCzR8ubsY4FCtD';
const discordRedirectUri = 'http://localhost:3000/auth/discord/callback';

// Passport setup
passport.use(new DiscordStrategy({
  clientID: discordClientId,
  clientSecret: discordClientSecret,
  callbackURL: discordRedirectUri,
  scope: ['identify', 'email'], // Add additional scopes as needed
}, (accessToken, refreshToken, profile, done) => {
  // This callback will be called after a successful authentication
  return done(null, profile);
}));

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure express-session
app.use(session({
  secret: 'bugattichiron', // Replace with a secret key for session management
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Define routes

// Home route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Login with Discord route
app.get('/auth/discord',
  passport.authenticate('discord'));

// Callback route after successful Discord authentication
app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page or a profile page
    res.redirect('/');
  });

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Profile route - requires authentication
app.get('/profile', isAuthenticated, (req, res) => {
  res.send(`${req.user.username}#${req.user.discriminator}`);
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
