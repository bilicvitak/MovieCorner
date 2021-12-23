import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    imdb_id: { type: String, required: true },
    imdb_rating: { type: Number, required: true },
    popularity: { type: Number, required: true },
    runtime: { type: Number, required: true },
    genres: { type: [String], required: true },
    img_uri: { type: String, required: true },
    plot: { type: String, required: true },
    likes: { type: [String], default: [], required: true},
    dislikes: { type: [String], default: [], required: true},
    watched: { type: [String], default: [], required: true},
    id: String
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;