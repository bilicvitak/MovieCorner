import Movie from '../models/movie.js';
import mongoose from 'mongoose';

const getMoviesByPreference = async (id) => {
    const result = await Movie.find({ $or: [{ likes: id }, { watched: id }] });

    return result;
}

const getMinMaxYear = (movies) => {
    var years = [];

    movies.forEach((movie) => { years.push(movie.year) });

    var max = Math.max.apply(Math, years);
    var min = Math.min.apply(Math, years);

    const maxMin = [max, min];

    return maxMin;
}

const getAvgRating = (movies) => {
    var ratings = [];

    movies.forEach((movie) => { ratings.push(movie.imdb_rating) });

    const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    const avg = parseFloat(average(ratings).toFixed(2));

    return avg;
}

const getGenres = (movies) => {
    var genres = [];

    movies.forEach((movie) => { movie.genres.forEach((genre) => genres.push(new RegExp(genre, 'i'))) });

    return genres;
}

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
    try {
        var genres = [];

        const result = await Movie.find();

        result.forEach((movie) => { movie.genres.forEach((genre) => genres.push(new RegExp(genre, 'i'))) });

        const genre = genres[Math.floor(Math.random() * genres.length)];

        const movies = await Movie.aggregate([{ $match: { genres: genre } }, { $sample: { size: 6 } }]);

        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRandomMoviesByUser = async (req, res) => {
    try {
        const result = await getMoviesByPreference(req.userId);

        if (result.length === 0) {
            getRandomMovies(req, res);
        } else {
            const years = getMinMaxYear(result);
            const avg = getAvgRating(result);
            const genres = getGenres(result);

            const movies = await Movie.aggregate([{
                $match: {
                    year: { $lte: years[0], $gte: years[1] },
                    imdb_rating: { $gte: avg },
                    genres: { $elemMatch: { $in: genres } }
                }
            },
            { $sample: { size: 6 } }]);

            res.status(200).json(movies);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLatestMoviesByUser = async (req, res) => {
    try {
        const result = await getMoviesByPreference(req.userId);

        if (result.length === 0) {
            getLatestMovies(req, res);
        } else {
            const maxMin = getMinMaxYear(result);

            const movies = await Movie.aggregate([{ $match: { year: { $lte: maxMin[0], $gte: maxMin[1] } } },
            { $sample: { size: 6 } }, { $sort: { year: -1 } }]);

            res.status(200).json(movies);
        }

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTopRatedMoviesByUser = async (req, res) => {
    try {
        const result = await getMoviesByPreference(req.userId);

        if (result.length === 0) {
            getTopRatedMovies(req, res);
        } else {
            const avg = getAvgRating(result);

            const movies = await Movie.aggregate([{ $match: { imdb_rating: { $gte: avg } } },
            { $sample: { size: 6 } }, { $sort: { imdb_rating: -1 } }]);

            res.status(200).json(movies);
        }

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMoviesByGenreUser = async (req, res) => {
    try {
        const result = await getMoviesByPreference(req.userId);

        if (result.length === 0) {
            getMoviesByGenre(req, res);
        } else {
            var genres = getGenres(result);

            const movies = await Movie.aggregate([{ $match: { genres: { $elemMatch: { $in: genres } } } },
            { $sample: { size: 6 } }])

            res.status(200).json(movies);
        }
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