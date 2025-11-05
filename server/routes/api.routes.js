import express from 'express';
import { ensureAuth } from '../middleware/authMiddleware.js';
import { 
  handleSearch, 
  getTopSearches, 
  getUserHistory 
} from '../controllers/searchController.js';
import { getProfile } from '../controllers/authController.js';

const router = express.Router();

router.get('/profile', ensureAuth, getProfile);

router.post('/search', ensureAuth, handleSearch);
router.get('/top-searches', ensureAuth, getTopSearches);
router.get('/history', ensureAuth, getUserHistory);

export default router;