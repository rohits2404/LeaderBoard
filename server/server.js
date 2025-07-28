import "dotenv/config";
import express from 'express';
import cors from 'cors';      

import userRoutes from './routes/userRoute.js';
import pointRoutes from './routes/pointsRoute.js';

import conncetDB from "./config/db.js"

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"]
}));

app.use(express.json());

// DB connection
conncetDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/points', pointRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});