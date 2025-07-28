import React from 'react';
import { BarChart3, Users, Award, Activity } from 'lucide-react';

const Statistics = ({ users, totalClaims }) => {

    const totalUsers = users.length;
    const totalPoints = users.reduce((sum, user) => sum + user.totalPoints, 0);
    const averagePoints = totalUsers > 0 ? Math.round(totalPoints / totalUsers) : 0;
    const topUser = users.find(user => user.rank === 1);

    const stats = [
        {
            icon: Users,
            label: 'Total Users',
            value: totalUsers,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/20'
        },
        {
            icon: Award,
            label: 'Total Points',
            value: totalPoints,
            color: 'text-green-400',
            bgColor: 'bg-green-500/20'
        },
        {
            icon: BarChart3,
            label: 'Average Points',
            value: averagePoints,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/20'
        },
        {
            icon: Activity,
            label: 'Total Claims',
            value: totalClaims,
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/20'
        }
    ];

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Statistics
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className={`${stat.bgColor} p-4 rounded-xl border border-white/10`}>
                        <div className="flex items-center gap-2 mb-2">
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            <span className="text-white/80 text-sm">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {topUser && (
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-yellow-400/30">
                    <h3 className="text-white font-semibold mb-2">🏆 Current Leader</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-white text-lg">{topUser.name}</span>
                        <span className="text-yellow-400 font-bold text-xl">{topUser.totalPoints} points</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;