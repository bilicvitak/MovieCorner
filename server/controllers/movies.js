import Movie from '../models/movie.js';
import mongoose from 'mongoose';

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();

        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRandomMovies = async (req, res) => {
    try {
        const movies = await Movie.aggregate([{ $sample: { size: 6 } }]);

        res.status(200).json(movies);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLatestMovies = async (req, res) => {
    try {
        const movies = await Movie.aggregate([{ $sample: { size: 6 } }, { $sort: { year: -1 } }]);

        res.status(200).json(movies);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTopRatedMovies = async (req, res) => {
    try {
        const movies = await Movie.aggregate([{ $sample: { size: 6 } }, { $sort: { imdb_rating: -1 } }]);

        res.status(200).json(movies);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMoviesByGenre = async (req, res) => {
    const genres = ['action', 'adult', 'adventure', 'animation', 'anime', 'biography',
        'comedy', 'crime', 'documentary', 'drama', 'family', 'fantasy', 'film-noir',
        'history', 'horror', 'music', 'musical', 'mystery', 'reality-tv', 'romance',
        'sci-fi', 'science fiction', 'short', 'sport', 'tv movie', 'thriller', 'war',
        'western', 'science-fiction'];

    var genre = genres[Math.floor(Math.random() * genres.length)];

    const regex = new RegExp(genre, 'i');

    try {
        const movies = await Movie.aggregate([{ $match: { genres: regex } }, { $sample: { size: 6 } }]);

        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRandomMoviesByUser = async (req, res) => {
    try {
        const movies = await Movie.aggregate().sample(6);

        res.status(200).json(movies);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const watchMovie = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.status(403).json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No movie with that id');

    const movie = await Movie.findById(_id);

    const index = movie.watched.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        movie.watched.push(req.userId);
    } else {
        movie.watched = movie.watched.filter((id) => id !== String(req.userId));
    }

    const updatedMovie = await Movie.findByIdAndUpdate(_id, movie, { new: true });

    res.status(200).json(updatedMovie);
}

export const likeMovie = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.status(403).json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No movie with that id');

    const movie = await Movie.findById(_id);

    var index = movie.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        movie.likes.push(req.userId);
    } else {
        movie.likes = movie.watched.filter((id) => id !== String(req.userId));
    }

    index = movie.dislikes.findIndex((id) => id === String(req.userId));

    if (index !== -1) {
        movie.dislikes = movie.watched.filter((id) => id !== String(req.userId));
    }

    const updatedMovie = await Movie.findByIdAndUpdate(_id, movie, { new: true });

    res.status(200).json(updatedMovie);
}

export const dislikeMovie = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.status(403).json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No movie with that id');

    const movie = await Movie.findById(_id);

    var index = movie.dislikes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        movie.dislikes.push(req.userId);
    } else {
        movie.dislikes = movie.watched.filter((id) => id !== String(req.userId));
    }

    index = movie.likes.findIndex((id) => id === String(req.userId));

    if (index !== -1) {
        movie.likes = movie.watched.filter((id) => id !== String(req.userId));
    }

    const updatedMovie = await Movie.findByIdAndUpdate(_id, movie, { new: true });

    res.status(200).json(updatedMovie);
}