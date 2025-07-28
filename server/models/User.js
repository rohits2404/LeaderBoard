import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to update user rankings
userSchema.statics.updateRankings = async function() {
    const users = await this.find().sort({ totalPoints: -1 });
    for (let i = 0; i < users.length; i++) {
        users[i].rank = i + 1;
        await users[i].save();
    }
    return users;
};

const User = mongoose.model("User",userSchema);

export default User;