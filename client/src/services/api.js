import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userAPI = {
    getAllUsers: () => api.get('/users'),
    addUser: (name) => api.post('/users', { name }),
    getUserById: (id) => api.get(`/users/${id}`),
};  

export const pointsAPI = {
    claimPoints: (userId) => api.post('/points/claim', { userId }),
    getPointsHistory: () => api.get('/points/history'),
    getUserPointsHistory: (userId) => api.get(`/points/history/${userId}`),
};

export default api;