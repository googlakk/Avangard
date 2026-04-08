'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, type PublicLocale } from '@/lib/i18n';

type Language = PublicLocale;
type Translations = typeof ru & {
    senior: any;
    teachers: any;
    contacts: any;
    rules: any;
    parents: any;
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

export function LanguageProvider({
    children,
    initialLanguage = DEFAULT_LOCALE,
}: {
    children: ReactNode
    initialLanguage?: Language
}) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        document.cookie = `${LOCALE_COOKIE_NAME}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
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
