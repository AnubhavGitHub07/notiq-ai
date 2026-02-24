import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Initializing Google Strategy...");
console.log("Callback URL:", `${process.env.SERVER_URL || "http://localhost:3000"}/api/auth/google/callback`);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL || "http://localhost:3000"}/api/auth/google/callback`,
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // Check if user with this email already exists
                    user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        // Link google account to existing user
                        user.googleId = profile.id;
                        await user.save();
                    } else {
                        // Create new user
                        user = await User.create({
                            email: profile.emails[0].value,
                            googleId: profile.id,
                        });
                    }
                }
                return done(null, user);
            } catch (err) {
                console.error("Error in Google Strategy:", err);
                return done(err, null);
            }
        }
    )
);

console.log("Initializing GitHub Strategy...");
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL || "http://localhost:3000"}/api/auth/github/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    // Check if user with this email already exists
                    // profile.emails can be undefined if user has no public mail
                    const email = profile.emails ? profile.emails[0].value : `${profile.username}@github.com`;
                    user = await User.findOne({ email });

                    if (user) {
                        // Link github account to existing user
                        user.githubId = profile.id;
                        await user.save();
                    } else {
                        // Create new user
                        user = await User.create({
                            email,
                            githubId: profile.id,
                        });
                    }
                }
                return done(null, user);
            } catch (err) {
                console.error("Error in GitHub Strategy:", err);
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
