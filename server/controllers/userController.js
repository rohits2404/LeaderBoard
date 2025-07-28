import User from '../models/User.js';

// GET all users (sorted & ranked)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ totalPoints: -1, createdAt: 1 });
        await User.updateRankings();
        const updatedUsers = await User.find().sort({ rank: 1 });
        res.json(updatedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST new user
export const createUser = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'User Name Is Required' });
        }

        const existingUser = await User.findOne({ name: name.trim() });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exists' });
        }

        const user = new User({ name: name.trim() });
        await user.save();
        await User.updateRankings();

        const updatedUsers = await User.find().sort({ rank: 1 });
        res.status(201).json({
            message: 'User Added Successfully',
            user,
            users: updatedUsers
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};