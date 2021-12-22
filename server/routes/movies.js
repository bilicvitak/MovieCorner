import express from 'express';
import { getRandomMovies, getAllMovies, getRandomMoviesByUser, watchMovie, likeMovie, dislikeMovie } from '../controllers/movies.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/random', getRandomMovies);
router.get('/random/:id', auth, getRandomMoviesByUser);
router.patch('/watch/:id', auth, watchMovie);
router.patch('/like/:id', auth, likeMovie);
router.patch('/dislike/:id', auth, dislikeMovie);

export default router;