import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.model.js";

const configurePassport = (passport) => {
  const commonVerifyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    const { id, provider, displayName, emails, photos, username } = profile;

    const newUser = {
      provider: provider,
      providerId: id,
      displayName: displayName || username,
      email: emails?.[0]?.value || null,
      image: photos?.[0]?.value || null,
    };

    try {
      let user = await User.findOne({
        provider: provider,
        providerId: id,
      });

      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (err) {
      console.error("Passport strategy error:", err);
      done(err, null);
    }
  };

  // --- Google Strategy ---
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,

        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        const callbackURL = `${req.protocol}://${req.get("host")}${
          process.env.GOOGLE_CALLBACK_URL
        }`;
        commonVerifyCallback(accessToken, refreshToken, profile, done);
      }
    )
  );

  // --- Facebook Strategy ---
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "emails", "photos"],
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        commonVerifyCallback(accessToken, refreshToken, profile, done);
      }
    )
  );

  // --- GitHub Strategy ---
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ["user:email"], // Request email permission
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        commonVerifyCallback(accessToken, refreshToken, profile, done);
      }
    )
  );

  // --- Serialize & Deserialize User ---
  // Stores the user ID in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrieves the user from the session using the ID
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default configurePassport;
