import React, { useState } from 'react';
import { User, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserSelector = ({ users, selectedUser, onUserSelect, onAddUser }) => {
    
    const [newUserName, setNewUserName] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!newUserName.trim()) return;

        setIsAdding(true);
        try {
            await onAddUser(newUserName.trim());
            setNewUserName('');
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
        setIsAdding(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Select User
                </h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-teal-500 hover:to-emerald-400 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                >
                    <UserPlus className="w-4 h-4" />
                    Add User
                </button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.form
                        onSubmit={handleAddUser}
                        className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                placeholder="Enter user name"
                                className="flex-1 px-4 py-2 bg-white/10 text-white placeholder-white/60 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                disabled={isAdding}
                            />
                            <button
                                type="submit"
                                disabled={isAdding || !newUserName.trim()}
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded-lg transition-all"
                            >
                                {isAdding ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="relative">
                <select
                    value={selectedUser || ''}
                    onChange={(e) => onUserSelect(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer transition-all"
                >
                    <option value="" className="bg-gray-800 text-white">
                        Choose a user to claim points...
                    </option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id} className="bg-gray-900 text-white">
                            {user.name} ({user.totalPoints} pts)
                        </option>
                    ))}
                </select>

                {/* Custom dropdown arrow (optional) */}
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-white opacity-70">
                    ▼
                </div>
            </div>
        </motion.div>
    );
};

export default UserSelector;