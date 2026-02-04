'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

type Language = 'ru' | 'en';
type Translations = typeof ru & {
    senior: any;
    teachers: any;
    contacts: any;
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations; // Localization dictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
    ru: ru as Translations,
    en: en as Translations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('ru');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load language from localStorage on mount
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
            setLanguageState(savedLanguage);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const value: LanguageContextType = {
        language,
        setLanguage,
        t: translations[language],
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
