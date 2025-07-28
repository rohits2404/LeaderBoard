import User from '../models/User.js';

const initializeUsers = async () => {
    const count = await User.countDocuments();
    if (count === 0) {
        const defaultUsers = [
            'Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 
            'Neha', 'Ravi', 'Anjali', 'Vikram', 'Pooja'
        ];
        
        for (const name of defaultUsers) {
            await User.create({ name });
        }

        await User.updateRankings();
        console.log('Default Users Initialized');
    }
};

export default initializeUsers;