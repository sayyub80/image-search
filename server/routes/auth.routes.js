import express from 'express';
import passport from 'passport';
import { handleLogout } from '../controllers/authController.js';

const router = express.Router();
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${clientUrl}/login`,
    successRedirect: `${clientUrl}/dashboard`, 
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${clientUrl}/login`,
    successRedirect: `${clientUrl}/dashboard`, 
  })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${clientUrl}/login`,
    successRedirect: `${clientUrl}/dashboard`, 
  })
);

// --- Logout ---
router.get('/logout', handleLogout);

export default router;