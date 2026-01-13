// src/api.js или src/utils/api.js
import axios from 'axios';

// Способ 1: Простой и рабочий (рекомендуемый)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

console.log('API Base URL:', API_BASE_URL);
console.log('Node Environment:', process.env.NODE_ENV);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// Перехватчик для обработки ошибок
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error Details:', {
            message: error.message,
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data
        });

        // Если ошибка сети (бэкенд не доступен)
        if (error.code === 'ECONNREFUSED' || !error.response) {
            console.error('Backend server is not responding');
            // Можно показать пользователю сообщение
        }

        return Promise.reject(error);
    }
);

export const portfolioAPI = {
    getProjects: () => api.get('/api/projects/'),
    getSkills: () => api.get('/api/skills/'),
    getExperience: () => api.get('/api/experience/'),
    getProfile: () => api.get('/api/profile/'),

    testConnection: () => api.get('/')
};

export default api;