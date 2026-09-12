import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n, { SupportedLanguage } from '../i18n';

export const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'ar') as SupportedLanguage;
  const nextLanguage: SupportedLanguage = currentLanguage === 'ar' ? 'en' : 'ar';

  return (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(nextLanguage)}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:border-amber-400 hover:text-amber-400"
      aria-label={`${t('switchTo')} ${t('language')}`}
      title={`${t('switchTo')} ${t('language')}`}
    >
      <Languages className="h-3.5 w-3.5 text-amber-400" />
      <span>{currentLanguage === 'ar' ? 'EN' : 'AR'}</span>
    </button>
  );
};
