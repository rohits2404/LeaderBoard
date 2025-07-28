import mongoose from 'mongoose';

const pointHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    pointsAwarded: {
        type: Number,
        required: true
    },
    previousTotal: {
        type: Number,
        required: true
    },
    newTotal: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const PointHistory = mongoose.model("PointHistory",pointHistorySchema);

export default PointHistory;