// src/api.js
import axios from 'axios';

// Базовый URL из переменных окружения
// На Railway: REACT_APP_API_URL = https://portfolio-backend.up.railway.app
// Локально: http://localhost:8000
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

console.log('API Configuration:', {
  baseURL: API_BASE_URL,
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production'
});

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000,
  withCredentials: false, // Если не используете куки/сессии
});

// Перехватчик запросов для логирования
api.interceptors.request.use(
  (config) => {
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Перехватчик ответов для обработки ошибок
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const errorDetails = {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      baseURL: error.config?.baseURL,
    };

    console.error('❌ API Error:', errorDetails);

    // Обработка специфических ошибок
    if (error.code === 'ECONNREFUSED') {
      console.error('🚫 Backend server is not responding');
      // Можно показать пользователю сообщение
      error.userMessage = 'Сервер временно недоступен. Попробуйте позже.';
    } else if (error.response?.status === 404) {
      console.error('🔍 Endpoint not found');
      error.userMessage = 'Запрашиваемый ресурс не найден.';
    } else if (error.response?.status === 500) {
      console.error('💥 Server error');
      error.userMessage = 'Внутренняя ошибка сервера.';
    } else if (!error.response) {
      console.error('🌐 Network error');
      error.userMessage = 'Проблема с сетью. Проверьте подключение.';
    }

    // Для разработки: мок-данные если бэкенд недоступен
    if (process.env.NODE_ENV === 'development' && !error.response) {
      console.log('🛠️ Development mode: Returning mock data');
      
      // Здесь можно вернуть мок-данные для разработки
      // return Promise.resolve({ data: mockData });
    }

    return Promise.reject(error);
  }
);

// API методы
export const portfolioAPI = {
  // Проекты
  getProjects: () => api.get('/projects/'),
  getProjectById: (id) => api.get(`/projects/${id}/`),
  
  // Навыки
  getSkills: () => api.get('/skills/'),
  getSkillCategories: () => api.get('/skills/categories/'),
  
  // Опыт работы
  getExperience: () => api.get('/experience/'),
  
  // Профиль
  getProfile: () => api.get('/profile/'),
  
  // Контакты
  getContacts: () => api.get('/contacts/'),
  
  // Образование
  getEducation: () => api.get('/education/'),
  
  // Тестирование соединения
  testConnection: () => api.get('/'),
  
  // Health check
  healthCheck: () => api.get('/health/'),
  
  // Статус API
  getApiStatus: () => api.get('/api/status/'),
};

// Утилиты
export const apiUtils = {
  getFullUrl: (endpoint) => `${API_BASE_URL}${endpoint}`,
  isProduction: process.env.NODE_ENV === 'production',
  getBaseURL: () => API_BASE_URL,
};

export default api;