import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';

export const supportedLanguages = ['ar', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const storageKey = 'nexus-language';
const storedLanguage = typeof window !== 'undefined'
  ? window.localStorage.getItem(storageKey)
  : null;
const initialLanguage: SupportedLanguage = storedLanguage === 'en' ? 'en' : 'ar';

export const updateDocumentLanguage = (language: string) => {
  const normalizedLanguage: SupportedLanguage = language.startsWith('en') ? 'en' : 'ar';
  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalizedLanguage;
    document.documentElement.dir = normalizedLanguage === 'ar' ? 'rtl' : 'ltr';
  }
};

void i18n
  .use(initReactI18next)
  .init({
    resources: { ar: { translation: ar }, en: { translation: en } },
    lng: initialLanguage,
    fallbackLng: 'ar',
    interpolation: { escapeValue: false }
  });

updateDocumentLanguage(initialLanguage);

i18n.on('languageChanged', (language) => {
  const normalizedLanguage: SupportedLanguage = language.startsWith('en') ? 'en' : 'ar';
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, normalizedLanguage);
  }
  updateDocumentLanguage(normalizedLanguage);
});

export default i18n;
