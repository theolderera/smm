// frontend/web/src/config/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES } from '../utils/constants';

const resources = {
  en: { translation: require('../../locales/en/translation.json') },
  ru: { translation: require('../../locales/ru/translation.json') },
  to: { translation: require('../../locales/to/translation.json') },
  uz: { translation: require('../../locales/uz/translation.json') },
  fa: { translation: require('../../locales/fa/translation.json') },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;