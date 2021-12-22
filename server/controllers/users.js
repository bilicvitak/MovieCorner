import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Token from '../models/token.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: 'User does not exists.' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

        const accessToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        const refreshToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.REFRESH_TOKEN_SECRET);

        await Token.create({ token: refreshToken });

        return res.status(200).json({ result: existingUser, accessToken, refreshToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    const { email, password, name, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'User already exists.' });

        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match.' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ email, password: hashedPassword, name: name });

        const accessToken = jwt.sign({ email: user.email, id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })

        const refreshToken = jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH_TOKEN_SECRET);

        await Token.create({ token: refreshToken });

        return res.status(200).json({ result: user, accessToken, refreshToken });

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const token = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) return res.status(401).json({ message: 'Refresh token is empty.' });

    const token = Token.findOne({ refreshToken });

    if (!token) return res.status(403).json({ message: 'Refresh token does not exist.' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Refresh token is not valid.' });

        User.findById(user.id).exec((err, existingUser) => {
            if (err) return res.status(403).json({ message: 'User not found.' });

            const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

            return res.status(200).json({ result: existingUser, accessToken, refreshToken });
        });
    });
}

export const logout = async (req, res) => {
    const token = req.body.token;

    await Token.findOneAndDelete({ token });

    return res.status(204).json({ message: 'Refresh token succesfully removed.' });
}