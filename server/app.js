const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

const passport = require('passport');
const session = require('express-session');
const DiscordStrategy = require('passport-discord').Strategy;


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');

const cookieParser = require('cookie-parser');


const app = express();

app.enable('trust proxy');
// Setting pug engine and the file that hold the pug template: views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// 1) GLOBAL MIDDLEWARE

app.use(cors());

// Allow other type of http request like patch, delete to use cors. " means every routes"
app.options('*', cors());
// Serving static files
// app.use(express.static(`${__dirname}/public`)); 
app.use(express.static(path.join(__dirname, 'public')));
//http://127.0.0.1:3000/overview.html
// If no routes are found, it will get to public folder

// Set security HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
//Development logging
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // produce the req statistics
};

// SECURITY: limiting requests to server : 60 reqs in 1 hour
const limiter = rateLimit({
    max: 60,
    windowMs: 60*60*1000,
    message: 'Too many requests from this ip, please try again in an hour'
});

app.use('/api', limiter); // apply this limiter to /api

// webhook need to be read in a raw data, not in json format
// app.post('/webhook-checkout', bodyParser.raw({ type: 'application/json' }), ........);
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb'})); // limit to 10kb request
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // this code is to parse the data from .form
app.use(cookieParser()); // parse the data from cookie

// Data santinization against NoSQL query injection
app.use(mongoSanitize()); // It looks at the reuqery, req body and filter out all dangerouse sign like $

// Data santinization against XSS
app.use(xss()); // Clean user input like dangerous javascript or html code

app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'difficulty',
        'maxGroupSize',
        'price'
    ]
})); // Prevent parameter pollution

app.use(compression());

const discordClientId = process.env.DISCORDCLIENT;
const discordClientSecret = process.env.DISCORDCLIENTSECRET;
const discordRedirectUri = process.env.DISCORDREDIRECT;
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


// Test middleware
app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();   // Information of the request
    next();
});

// 3) ROUTES

// Mounting Routes;
app.use('/api/users', userRouter); //tourRouter is a middleware


app.all('*', (req, res, next) => {  // all means all methods, * means all url
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // });

    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // if next() is passed in argument, it will understands it as error
});

app.use(globalErrorHandler);    // error middleware. Call with next

// 4) SERVER
module.exports = app;