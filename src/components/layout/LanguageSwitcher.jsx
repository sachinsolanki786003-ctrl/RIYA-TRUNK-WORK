import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage();

  const languages = [
    { code: 'gu', label: 'ગુજરાતી', short: 'GU' },
    { code: 'hi', label: 'हिन्दी', short: 'HI' },
    { code: 'en', label: 'English', short: 'EN' },
  ];

  return (
    <div className={`inline-flex items-center bg-carbon/5 p-1 rounded-full border border-carbon/10 ${className}`}>
      <div className="flex items-center px-2 text-carbon/60 text-xs font-semibold">
        <Globe className="w-3.5 h-3.5 mr-1" />
      </div>
      <div className="flex items-center gap-1">
        {languages.map((l) => {
          const isActive = lang === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-carbon text-cream shadow-sm font-bold'
                  : 'text-carbon/70 hover:text-carbon hover:bg-carbon/10'
              }`}
              title={l.label}
              aria-label={`Change language to ${l.label}`}
            >
              {l.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
