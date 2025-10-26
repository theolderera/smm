// src/config/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES } from '../utils/constants';

// Translation resources (load from JSON files in public/locales/{lng}/translation.json)
const resources = {
  en: { translation: require('../../locales/en/translation.json') },
  ru: { translation: require('../../locales/ru/translation.json') },
  to: { translation: require('../../locales/to/translation.json') },
  uz: { translation: require('../../locales/uz/translation.json') },
  fa: { translation: require('../../locales/fa/translation.json') },
};

i18n
  .use(Backend) // Load translations from backend if needed (for dynamic loading)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language if detection fails
    supportedLngs: SUPPORTED_LANGUAGES,
    keySeparator: false, // We do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser language
      caches: ['localStorage'], // Cache user language in localStorage
    },
    react: {
      useSuspense: false, // Disable suspense for SSR compatibility if needed
    },
  });

export default i18n;