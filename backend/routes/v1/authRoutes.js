import express from 'express';
import { login, register } from '../../controllers/authController.js';

const router = express.Router();

// Public auth routes — rate-limited at the server level via authLimiter
router.post('/login', login);
router.post('/register', register);

export default router;