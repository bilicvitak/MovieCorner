import express from 'express';
import { signin, signup, token, logout } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/token', token);
router.post('/logout', logout);

export default router;