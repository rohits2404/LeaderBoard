import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/LeaderBoard';
import PointsHistory from './components/PointsHistory';
import Statistics from './components/Statistics';
import { userAPI, pointsAPI } from './services/api';

function App() {
    
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastClaim, setLastClaim] = useState(null);
    const [totalClaims, setTotalClaims] = useState(0);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchTotalClaims();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userAPI.getAllUsers();
            setUsers(response.data);
        } catch (error) {
            showNotification('Error fetching users', 'error');
        }
    };

    const fetchTotalClaims = async () => {
        try {
            const response = await pointsAPI.getPointsHistory();
            setTotalClaims(response.data.length);
        } catch (error) {
            console.error('Error fetching total claims:', error);
        }
    };

    const handleAddUser = async (name) => {
        try {
            const response = await userAPI.addUser(name);
            setUsers(response.data.users);
            showNotification(`User "${name}" added successfully!`, 'success');
        } catch (error) {
            const message = error?.response?.data?.message || 'Error adding user';
            showNotification(message, 'error');
        }
    };

    const handleClaimPoints = async () => {
        if (!selectedUser) return;
        setLoading(true);
        try {
            const response = await pointsAPI.claimPoints(selectedUser);
            setUsers(response.data.leaderboard);
            setLastClaim(response.data);
            setTotalClaims(prev => prev + 1);

            showNotification(
                `🎉 ${response.data.user.name} earned ${response.data.pointsAwarded} points!`,
                'success'
            );
            setTimeout(() => setLastClaim(null), 3000);
        } catch (error) {
            showNotification('Error claiming points', 'error');
        }
        setLoading(false);
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
            {/* Background Floating Stars */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute animate-pulse -left-10 top-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute animate-ping -right-20 bottom-20 w-52 h-52 bg-yellow-400 opacity-10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                            <Trophy className="w-9 h-9 text-white" />
                        </div>
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
                            Leaderboard
                        </h1>
                        <Sparkles className="w-9 h-9 text-yellow-400 animate-bounce" />
                    </div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Claim points, compete with friends, and dominate the board!
                    </p>
                </div>

                {/* Notification */}
                {notification && (
                    <div
                        className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-xl shadow-xl backdrop-blur-md border-2 ${
                            notification.type === 'success'
                                ? 'bg-green-400/20 text-green-100 border-green-300'
                                : 'bg-red-400/20 text-red-100 border-red-300'
                        }`}
                    >
                        {notification.message}
                    </div>
                )}

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Controls */}
                    <div className="space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:shadow-xl transition">
                        <UserSelector
                            users={users}
                            selectedUser={selectedUser}
                            onUserSelect={setSelectedUser}
                            onAddUser={handleAddUser}
                        />
                        <ClaimButton
                            selectedUser={selectedUser}
                            onClaimPoints={handleClaimPoints}
                            loading={loading}
                        />
                        <Statistics users={users} totalClaims={totalClaims} />
                    </div>

                    {/* Middle Leaderboard */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:shadow-xl transition">
                        <Leaderboard users={users} lastClaim={lastClaim} />
                    </div>

                    {/* Right History */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:shadow-xl transition">
                        <PointsHistory key={totalClaims} />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-white/40 text-sm">
                    <p>✨ Built with React, Node.js, MongoDB & magic ✨</p>
                </div>
            </div>
        </div>
    );
}

export default App;