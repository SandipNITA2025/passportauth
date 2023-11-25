// server.js

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();
const PORT = process.env.PORT || 8080;

// Replace these values with your Google OAuth credentials
const GOOGLE_CLIENT_ID = 'your-client-id';
const GOOGLE_CLIENT_SECRET = 'your-client-secret';
const JWT_SECRET = 'your-jwt-secret';

app.use(express.json());
app.use(passport.initialize());

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Use the profile information (e.g., profile.id) to identify or create a user in your database
  // You may also store additional user information in the session or JWT payload

  return done(null, profile);
}));

// Middleware to generate JWT
app.use(
  expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/auth/google/callback'] })
);

// Endpoint to start the Google OAuth flow
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback endpoint after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate JWT token and send it to the client
    const token = jwt.sign({ user: req.user.id }, JWT_SECRET);
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
