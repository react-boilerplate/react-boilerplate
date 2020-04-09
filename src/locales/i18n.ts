import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './en/translation.json';
import translationDE from './de/translation.json';

// the translations
export const translations = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: translations,

    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
