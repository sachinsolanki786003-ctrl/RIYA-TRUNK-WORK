import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default language is Gujarati ('gu') as specified in requirements
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('rtw_language');
      return saved && translations[saved] ? saved : 'gu';
    } catch {
      return 'gu';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rtw_language', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('Could not save language preference:', e);
    }
  }, [lang]);

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
    }
  };

  const t = translations[lang] || translations.gu;

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
