// src/utils/constants.js

export const COLORS = {
  primary: '#3B82F6', // Blue for headers, buttons, and accents
  secondary: '#10B981', // Green for success states, CTAs
  background: '#F9FAFB', // Light gray for background (light theme)
  backgroundDark: '#1F2937', // Dark gray for dark theme
  text: '#111827', // Dark text for light theme
  textLight: '#F3F4F6', // Light text for dark theme
  error: '#EF4444', // Red for error states
  warning: '#F59E0B', // Yellow for warnings
  white: '#FFFFFF',
  black: '#000000',
};

export const FONTS = {
  regular: 'Inter-Regular',
  bold: 'Inter-Bold',
};

export const SIZES = {
  base: 8, // Base unit for spacing and sizing
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
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.smmplus.ai' : 'http://localhost:3000',
  timeout: 10000, // 10 seconds
};

export const SUPPORTED_LANGUAGES = ['to', 'ru', 'en', 'uz', 'fa'];

export const SOCIAL_PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
];