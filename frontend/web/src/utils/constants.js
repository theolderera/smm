// frontend/web/src/utils/constants.js

export const COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  background: '#F9FAFB',
  backgroundDark: '#1F2937',
  text: '#111827',
  textLight: '#F3F4F6',
  error: '#EF4444',
  warning: '#F59E0B',
  white: '#FFFFFF',
  black: '#000000',
};

export const FONTS = {
  regular: 'Inter',
  bold: 'Inter-Bold',
};

export const SIZES = {
  base: 8,
  font: {
    small: 12,
    regular: 16,
    large: 20,
    xlarge: 24,
  },
  padding: {
    small: 8,
    regular: 16,
    large: 24,
  },
  margin: {
    small: 8,
    regular: 16,
    large: 24,
  },
  radius: {
    small: 4,
    regular: 8,
    large: 16,
  },
};

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
};

export const SUPPORTED_LANGUAGES = ['to', 'ru', 'en', 'uz', 'fa'];

export const SOCIAL_PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
];