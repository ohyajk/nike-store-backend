import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        const data = { firstName: user.firstName, lastName: user.lastName, email: user.email, id: user._id }
        res.status(201).json(data);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'Email Already In Use', error });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, password: hashedPassword },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Login a user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const data = { firstName: user.firstName, lastName: user.lastName, email: user.email, id: user._id }
        if (!user) {
            return res.status(401).json({ error: 'Invalid user email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid user password' });
        }


        const token = jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
            secure: true, // Only sent over HTTPS if enabled
            expires: new Date(Date.now() + 3600000),
        });
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Invalid Credentials or Server Error...' });
    }
};