'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center border border-white/[0.15] rounded-full p-[3px] bg-white/[0.03] backdrop-blur-sm">
            <button
                onClick={() => setLanguage('ru')}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-[0.02em] transition-all duration-300 ${language === 'ru'
                        ? 'bg-gradient-to-r from-[#C6A96B] to-[#D8C08A] text-[#0F223A] shadow-sm'
                        : 'text-white/70 hover:text-white/90'
                    }`}
            >
                RU
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-[0.02em] transition-all duration-300 ${language === 'en'
                        ? 'bg-gradient-to-r from-[#C6A96B] to-[#D8C08A] text-[#0F223A] shadow-sm'
                        : 'text-white/70 hover:text-white/90'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
