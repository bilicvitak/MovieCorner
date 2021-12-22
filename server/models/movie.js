import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    release_date: { type: String, required: true },
    imdb_id: { type: String, required: true },
    imdb_rating: { type: String, required: true },
    popularity: { type: String, required: true },
    runtime: { type: Number, required: true },
    genres: { type: [String], required: true },
    img_uri: { type: String, required: true },
    plot: { type: String, required: true },
    likes: { type: [String], default: []},
    dislikes: { type: [String], default: []},
    watched: { type: [String], default: []},
    id: String
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;