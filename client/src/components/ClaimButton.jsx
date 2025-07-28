import React from 'react';
import { Gift } from 'lucide-react';

const ClaimButton = ({ selectedUser, onClaimPoints, loading }) => {
    
    const isDisabled = !selectedUser || loading;

    return (
        <div
            className={`relative rounded-2xl p-6 shadow-xl border border-white/20 backdrop-blur-md 
                ${selectedUser ? 'bg-gradient-to-br from-purple-800/30 via-pink-700/20 to-indigo-700/20' : 'bg-white/10'}`}
        >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Gift className="w-6 h-6" />
                Claim Points
            </h2>

            <button
                onClick={onClaimPoints}
                disabled={isDisabled}
                className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2
                    text-white transition-all duration-300 shadow-lg disabled:cursor-not-allowed
                    ${isDisabled
                        ? 'bg-gray-600/60'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    }`}
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        Claiming...
                    </>
                ) : (
                    <>
                        <Gift className="w-5 h-5" />
                        Claim Random Points (1–10)
                    </>
                )}
            </button>

            {!selectedUser && (
                <p className="text-white/60 text-sm mt-3 text-center">
                    Please select a user first
                </p>
            )}

            {/* Glowing ring effect */}
            {selectedUser && !loading && (
                <div className="absolute -inset-0.5 rounded-2xl border-2 border-purple-400 opacity-30 animate-pulse pointer-events-none"></div>
            )}
        </div>
    );
};

export default ClaimButton;