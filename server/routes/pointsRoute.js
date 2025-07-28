import express from 'express';
import {
    claimPoints,
    getPointsHistory,
    getUserHistory
} from '../controllers/pointsController.js';

const router = express.Router();

router.post('/claim', claimPoints);
router.get('/history', getPointsHistory);
router.get('/history/:userId', getUserHistory);

export default router;