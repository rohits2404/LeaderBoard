import React, { useState, useEffect } from 'react';
import { History, Clock, TrendingUp } from 'lucide-react';
import { pointsAPI } from '../services/api.js';
import { motion, AnimatePresence } from 'framer-motion';

const PointsHistory = () => {
    
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await pointsAPI.getPointsHistory();
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
        setLoading(false);
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
        >
            <div className="flex items-center gap-2 mb-6">
                <History className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Points History</h2>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                    <AnimatePresence>
                        {history.length === 0 ? (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-white/60 text-center py-4"
                            >
                                No history available
                            </motion.p>
                        ) : (
                            history.map((record, index) => (
                                <motion.div
                                    key={record._id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ delay: index * 0.04 }}
                                    whileHover={{ scale: 1.015 }}
                                    className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-green-400" />
                                            <span className="font-semibold text-white">{record.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60 text-sm">
                                            <Clock className="w-4 h-4" />
                                            {formatTimeAgo(record.timestamp)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-white/80">
                                            Earned{' '}
                                            <span className="font-bold text-green-400">
                                                +{record.pointsAwarded}
                                            </span>{' '}
                                            points
                                        </div>
                                        <div className="text-sm text-white/60">
                                            {record.previousTotal} →{' '}
                                            <span className="text-white font-semibold">
                                                {record.newTotal}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
};

export default PointsHistory;