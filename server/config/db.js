import mongoose from "mongoose";
import initializeUsers from "../utils/initUsers.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/board`);
        console.log("MongoDB Connected!");
        await initializeUsers();
    } catch (error) {
        console.log("MongoDB Connection Failed: ",error);
        process.exit(1);
    }
}

export default connectDB;