'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${language === 'ru'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
            >
                RU
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${language === 'en'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
