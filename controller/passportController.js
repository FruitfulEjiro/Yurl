// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// // Local Modules
// import User from "../model/UserSchema.js";

// // Google Authentication
// passport.use(
//    new GoogleStrategy(
//       {
//          clientID: process.env.GOOGLE_CLIENT_ID,
//          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//          callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       },
//       async (accessToken, refreshToken, profile, cb) => {
//          User.findOrCreate({ googleID: profile.id }, (err, user) => {
//             return cb(err, user);
//          });
//       }
//    )
// );