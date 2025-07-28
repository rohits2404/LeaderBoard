import User from '../models/User.js';
import PointHistory from '../models/PointHistory.js';

// Claim points
export const claimPoints = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID Is Required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        const pointsAwarded = Math.floor(Math.random() * 10) + 1;
        const previousTotal = user.totalPoints;
        const newTotal = previousTotal + pointsAwarded;

        user.totalPoints = newTotal;
        await user.save();

        const historyRecord = new PointHistory({
            userId: user._id,
            userName: user.name,
            pointsAwarded,
            previousTotal,
            newTotal
        });
        await historyRecord.save();

        await User.updateRankings();

        const updatedUsers = await User.find().sort({ rank: 1 });

        res.json({
            message: 'Points Claimed Successfully',
            pointsAwarded,
            user: {
                id: user._id,
                name: user.name,
                totalPoints: newTotal,
                rank: user.rank
            },
            leaderboard: updatedUsers
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get recent points history (limit 50)
export const getPointsHistory = async (req, res) => {
    try {
        const history = await PointHistory.find()
            .sort({ timestamp: -1 })
            .limit(50);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get points history for a specific user
export const getUserHistory = async (req, res) => {
    try {
        const history = await PointHistory.find({ userId: req.params.userId })
            .sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};