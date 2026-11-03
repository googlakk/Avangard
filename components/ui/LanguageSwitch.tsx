'use client';

import { feedbackPath, type FeedbackLocale } from '@/lib/feedback';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { joinSearchParams, localizePathname } from '@/lib/i18n';

export default function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const switchLanguage = (nextLanguage: 'ru' | 'en') => {
        if (!pathname) return;
        setLanguage(nextLanguage);
        const nextPath = localizePathname(pathname, nextLanguage);
        router.replace(`${nextPath}${joinSearchParams(searchParams?.toString())}`);
    };

    if (pathname?.endsWith('/feedback')) {
        const active = pathname.startsWith('/ky/') ? 'ky' : language;
        return <div className="flex rounded-full border border-white/15 p-1">{(['ru', 'en', 'ky'] as FeedbackLocale[]).map(locale => <a key={locale} href={feedbackPath(locale)} hrefLang={locale} aria-current={active === locale ? 'page' : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold ${active === locale ? 'bg-[#C6A96B] text-[#0F223A]' : 'text-white/80'}`}>{locale.toUpperCase()}</a>)}</div>;
    }

    return (
        <div className="flex items-center rounded-full border border-white/[0.15] bg-white/[0.03] p-[3px] backdrop-blur-sm">
            <button
                onClick={() => switchLanguage('ru')}
                className={`rounded-full px-3.5 py-2 font-heading text-[13px] font-semibold leading-none tracking-[0.02em] transition-all duration-300 xl:px-4 ${language === 'ru'
                        ? 'bg-gradient-to-r from-[#C6A96B] to-[#D8C08A] text-[#0F223A] shadow-sm'
                        : 'text-white/70 hover:text-white/90'
                    }`}
            >
                RU
            </button>
            <button
                onClick={() => switchLanguage('en')}
                className={`rounded-full px-3.5 py-2 font-heading text-[13px] font-semibold leading-none tracking-[0.02em] transition-all duration-300 xl:px-4 ${language === 'en'
                        ? 'bg-gradient-to-r from-[#C6A96B] to-[#D8C08A] text-[#0F223A] shadow-sm'
                        : 'text-white/70 hover:text-white/90'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
