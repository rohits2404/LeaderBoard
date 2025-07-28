import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Leaderboard = ({ users, lastClaim }) => {
    const getRankIcon = (rank) => {
        const baseClass = 'w-6 h-6 transition-transform duration-300 hover:scale-125';
        switch (rank) {
            case 1:
                return <Crown className={`${baseClass} text-yellow-400`} />;
            case 2:
                return <Medal className={`${baseClass} text-gray-400`} />;
            case 3:
                return <Award className={`${baseClass} text-amber-600`} />;
            default:
                return (
                    <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-white/80">
                        #{rank}
                    </span>
                );
        }
    };

    const getRankColor = (rank) => {
        switch (rank) {
            case 1:
                return 'from-yellow-400/20 to-yellow-600/20 border-yellow-400/30';
            case 2:
                return 'from-gray-300/20 to-gray-500/20 border-gray-400/30';
            case 3:
                return 'from-amber-500/20 to-amber-700/20 border-amber-600/30';
            default:
                return 'from-blue-500/10 to-purple-500/10 border-white/20';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
        >
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
            </div>

            {lastClaim && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg"
                >
                    <p className="text-green-200 text-sm">
                        🎉 <strong>{lastClaim.user.name}</strong> just earned{' '}
                        <strong>{lastClaim.pointsAwarded} points</strong>!
                    </p>
                </motion.div>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                    {users.map((user, index) => {
                        const isRecent = lastClaim && lastClaim.user.id === user._id;
                        return (
                            <motion.div
                                key={user._id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ delay: index * 0.05 }}
                                className={`bg-gradient-to-r ${getRankColor(
                                    user.rank
                                )} p-4 rounded-xl border transition-all duration-300 hover:scale-[1.015] ${
                                    isRecent ? 'ring-2 ring-green-400 animate-pulse' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getRankIcon(user.rank)}
                                        <div>
                                            <h3 className="font-semibold text-white text-lg tracking-wide">
                                                {user.name}
                                            </h3>
                                            <p className="text-white/60 text-sm">Rank #{user.rank}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">{user.totalPoints}</p>
                                        <p className="text-white/60 text-sm">points</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Leaderboard;