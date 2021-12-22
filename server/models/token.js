import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    token: String,
    id: String
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;