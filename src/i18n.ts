import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import generalEN from './localizables/en/generalEN.json';
import generalES from './localizables/es/generalES.json';

const resources = { 
  en: {
    translation: generalEN
  },
  es:{
    translation: generalES
  }
}

i18next
.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources,
  fallbackLng: 'en',
});