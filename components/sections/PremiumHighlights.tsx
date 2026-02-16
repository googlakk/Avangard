'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Brain, Globe2, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const cards = {
    ru: [
        {
            icon: ShieldCheck,
            title: 'Безопасная среда',
            description: 'Охрана, видеонаблюдение и контролируемый доступ на территории школы.',
        },
        {
            icon: Brain,
            title: 'Сильная академическая база',
            description: 'Углубленные программы, английский язык и развитие критического мышления.',
        },
        {
            icon: Globe2,
            title: 'Международный вектор',
            description: 'Подготовка к глобальному образованию и уверенная коммуникация на английском.',
        },
        {
            icon: Trophy,
            title: 'Измеримый результат',
            description: 'Олимпиады, конкурсы и персональные траектории развития каждого ученика.',
        },
    ],
    en: [
        {
            icon: ShieldCheck,
            title: 'Safe Environment',
            description: 'Campus security, surveillance, and controlled access throughout the school.',
        },
        {
            icon: Brain,
            title: 'Strong Academic Core',
            description: 'Advanced curriculum, English fluency, and critical thinking development.',
        },
        {
            icon: Globe2,
            title: 'Global Outlook',
            description: 'Preparation for international education and confident global communication.',
        },
        {
            icon: Trophy,
            title: 'Measurable Outcomes',
            description: 'Olympiads, competitions, and individual growth pathways for every student.',
        },
    ],
};

export default function PremiumHighlights() {
    const { language } = useLanguage();
    const locale = language === 'en' ? 'en' : 'ru';
    const data = cards[locale];

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20">
            <div className="absolute inset-0 pointer-events-none opacity-60">
                <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto mb-10 max-w-3xl text-center"
                >
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-navy-700">
                        {locale === 'ru' ? 'Intellect Pro School' : 'Intellect Pro School'}
                    </p>
                    <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
                        {locale === 'ru'
                            ? 'Премиальный подход к школьному образованию'
                            : 'A Premium Approach to School Education'}
                    </h2>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2">
                    {data.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                            >
                                <div className="mb-4 inline-flex rounded-xl bg-navy-900/5 p-3 text-navy-900">
                                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-slate-900">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
