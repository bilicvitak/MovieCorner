import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
    userId: String,
    movieId: String,
    rating: { type: Number, min: 1, max: 10 },
    id: String
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;