import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import fa from './locales/fa-AF.json'
import ps from './locales/ps.json'

void i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { en: { translation: en }, 'fa-AF': { translation: fa }, ps: { translation: ps } },
  fallbackLng: 'en',
  supportedLngs: ['en', 'fa-AF', 'ps'],
  interpolation: { escapeValue: false },
  detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
})

export default i18n
