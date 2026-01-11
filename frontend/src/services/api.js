import axios from 'axios';

// Определяем базовый URL в зависимости от окружения
const getBaseURL = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000/api';
    } else if (window.location.hostname === '192.168.56.1') {
        return 'http://192.168.56.1:8000/api';
    }
    return '/api';
};

const API_BASE_URL = getBaseURL();

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // Увеличиваем таймаут
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

        // Для разработки возвращаем пустой ответ, чтобы использовать мок-данные
        return Promise.reject(error);
    }
);

export const portfolioAPI = {
    getProjects: () => api.get('/projects/'),
    getSkills: () => api.get('/skills/'),
    getExperience: () => api.get('/experience/'),
    getProfile: () => api.get('/profile/'),

    // Для отладки
    testConnection: () => api.get('/')
};