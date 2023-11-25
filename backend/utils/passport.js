const passport = require("passport");
const User = require("../models/auth/auth_user");

// ------ google strategy ---------
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID =
  "1751221072-l0u3p9l7jbief86e4u7on9lfriii9lk1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
// ------ google strategy ---------


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// ----------------- GOOGLE --------------------

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile._json.email }],
        });

        if (existingUser) {
          console.log("User already exists");
          return done(null, existingUser, {
            redirectTo: "http://localhost:5173",
          });
        } else {
          const newUser = await new User({
            username: profile.displayName,
            platformId: profile.id,
            avatar: profile._json.picture,
            email: profile._json.email,
            provider: profile.provider,
          }).save();

          console.log("User created", newUser);
          done(null, newUser);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        done(error);
      }
    }
  )
);
// ----------------- GOOGLE --------------------

