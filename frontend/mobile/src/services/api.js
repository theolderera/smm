// frontend/mobile/src/services/api.js

import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject({ message });
  }
);

export const onboardingService = {
  setup: (data) => api.post('/api/onboarding', data),
  getProfile: () => api.get('/api/user/profile'),
};

export const brandingService = {
  generate: () => api.post('/api/branding/generate'),
  select: (data) => api.post('/api/branding/select', data),
};

export const strategyService = {
  generate: () => api.post('/api/strategy/generate'),
  confirm: (data) => api.post('/api/strategy/confirm', data),
};

export const analyticsService = {
  getDashboard: () => api.get('/api/analytics/dashboard'),
};

export const academyService = {
  getCourses: () => api.get('/api/academy/courses'),
};

export default api;