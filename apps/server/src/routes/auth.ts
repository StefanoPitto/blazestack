import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { verifyToken, requireAuth } from '../middleware/auth';

const router = Router();

// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// GET /api/auth/profile/:id - Get user profile (protected)
router.get('/profile/:id', verifyToken, requireAuth, getProfile);

export default router;
