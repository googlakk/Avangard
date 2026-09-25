'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, ExternalLink, Layers3, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const platformUrl = 'https://web-production-eaae77.up.railway.app';

const copy = {
    ru: {
        eyebrow: 'INTELLECT PRO SCHOOL · DIGITAL CAMPUS',
        title: 'Все образовательные платформы — в одном месте',
        intro: 'Быстрый доступ к цифровым инструментам школы для учеников, родителей и педагогов.',
        benefits: [
            ['Простой вход', 'Переходите к нужной платформе в один клик'],
            ['Единая среда', 'Учёба, материалы и коммуникация рядом'],
            ['Безопасный доступ', 'Ссылки ведут только на проверенные ресурсы'],
        ],
        all: 'Все',
        school: 'Школа',
        search: 'Найти платформу',
        result: 'Платформа школы',
        cardTitle: 'INTELLECT PRO SCHOOL',
        cardDescription: 'Цифровая платформа нашей школы для учебных материалов, заданий и взаимодействия с образовательным сообществом.',
        visit: 'Открыть платформу',
        note: 'Откроется в новой вкладке',
        empty: 'Платформы скоро появятся здесь.',
    },
    en: {
        eyebrow: 'INTELLECT PRO SCHOOL · DIGITAL CAMPUS',
        title: 'All educational platforms in one place',
        intro: 'Quick access to the school’s digital tools for students, parents and educators.',
        benefits: [
            ['Simple access', 'Reach the platform you need in one click'],
            ['One environment', 'Learning, resources and communication together'],
            ['Trusted access', 'Every link leads to a verified resource'],
        ],
        all: 'All',
        school: 'School',
        search: 'Find a platform',
        result: 'School platform',
        cardTitle: 'INTELLECT PRO SCHOOL',
        cardDescription: 'Our school’s digital platform for learning materials, assignments and collaboration across the school community.',
        visit: 'Open platform',
        note: 'Opens in a new tab',
        empty: 'Platforms will appear here soon.',
    },
} as const;

export default function PlatformsPage() {
    const { language } = useLanguage();
    const ui = copy[language];
    const [activeFilter, setActiveFilter] = useState('all');
    const [query, setQuery] = useState('');

    const showSchool = activeFilter === 'all' || activeFilter === 'school';
    const matchesSearch = ui.cardTitle.toLowerCase().includes(query.toLowerCase()) || ui.cardDescription.toLowerCase().includes(query.toLowerCase());
    const visiblePlatform = useMemo(() => showSchool && matchesSearch, [matchesSearch, showSchool]);

    return (
        <main className="min-h-screen bg-[#f5f7f8] pt-[78px] text-[#17233c]">
            <section className="relative overflow-hidden border-b border-[#dce4ed] bg-[#fbfcfd]">
                <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#d7e8ff] blur-3xl" />
                <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-[#f7d7c9] blur-3xl" />
                <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24 lg:px-16">
                    <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
                        <div>
                            <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#4260b8]">
                                <span className="h-2 w-2 rounded-full bg-[#d69a72]" />
                                {ui.eyebrow}
                            </p>
                            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#1c2944] md:text-6xl">
                                {ui.title}
                            </h1>
                        </div>
                        <p className="max-w-xl pb-1 text-lg leading-8 text-[#566276] md:text-xl">{ui.intro}</p>
                    </div>

                    <div className="mt-14 grid gap-4 md:grid-cols-3">
                        {ui.benefits.map(([title, text], index) => (
                            <div
                                key={title}
                                className={`flex min-h-[116px] items-center gap-4 rounded-[22px] px-5 py-5 ${index === 0 ? 'bg-gradient-to-r from-[#e9e5ff] to-[#ffd9cc]' : index === 1 ? 'bg-gradient-to-r from-[#c7f7f2] to-[#e4e2ff]' : 'bg-gradient-to-r from-[#d7f3f8] to-[#f7ddce]'}`}
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-[#4059af] shadow-sm">
                                    {index === 0 ? <Sparkles className="h-6 w-6" /> : index === 1 ? <Layers3 className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                                </span>
                                <div>
                                    <h2 className="font-heading text-base font-bold text-[#25304a]">{title}</h2>
                                    <p className="mt-1 text-sm leading-6 text-[#505b6b]">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 lg:px-16 lg:py-14">
                <div className="flex flex-col gap-5 border-b border-[#dce4ed] pb-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-2 overflow-x-auto">
                        {[
                            ['all', ui.all],
                            ['school', ui.school],
                        ].map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setActiveFilter(value)}
                                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeFilter === value ? 'bg-[#243d87] text-white shadow-[0_8px_20px_rgba(36,61,135,0.18)]' : 'bg-white text-[#667085] ring-1 ring-[#dfe5ed] hover:text-[#243d87]'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <label className="flex w-full items-center gap-3 rounded-full bg-white px-5 py-3 text-[#98a2b3] ring-1 ring-[#e2e8f0] md:max-w-[300px]">
                        <Search className="h-5 w-5" />
                        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ui.search} className="min-w-0 flex-1 bg-transparent text-sm text-[#24304a] outline-none placeholder:text-[#98a2b3]" />
                    </label>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#718096]">
                    <BookOpen className="h-4 w-4 text-[#4260b8]" />
                    {ui.result}
                </div>

                {visiblePlatform ? (
                    <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        <a href={platformUrl} target="_blank" rel="noopener noreferrer" className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] bg-white p-7 shadow-[0_12px_40px_rgba(35,52,86,0.08)] ring-1 ring-[#e4eaf1] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(35,52,86,0.14)]">
                            <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[80px] bg-gradient-to-br from-[#dce7ff] to-[#f7d7cd] opacity-80" />
                            <div className="relative flex items-start justify-between">
                                <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#213c8a] text-xl font-black tracking-[-0.08em] text-white shadow-lg shadow-[#213c8a]/20">IP</div>
                                <span className="rounded-full bg-[#eef2ff] px-3 py-1.5 text-xs font-bold text-[#4260b8]">{ui.school}</span>
                            </div>
                            <div className="relative mt-12 flex-1">
                                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#1e2b49]">{ui.cardTitle}</h3>
                                <p className="mt-4 max-w-sm text-base leading-7 text-[#667085]">{ui.cardDescription}</p>
                            </div>
                            <div className="relative mt-8 flex items-center justify-between border-t border-[#edf0f4] pt-5">
                                <span className="text-sm font-bold text-[#4260b8]">{ui.visit}</span>
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#cef8f6] to-[#ffd7cf] text-[#344469] transition group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
                            </div>
                            <span className="relative mt-3 flex items-center gap-1.5 text-xs text-[#98a2b3]"><ExternalLink className="h-3.5 w-3.5" />{ui.note}</span>
                        </a>
                    </div>
                ) : (
                    <div className="mt-5 rounded-[26px] bg-white p-12 text-center text-[#667085] ring-1 ring-[#e4eaf1]">{ui.empty}</div>
                )}
            </section>
        </main>
    );
}
