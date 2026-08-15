'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface AcademicBreakthroughProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
}

export default function AcademicBreakthrough({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
}: AcademicBreakthroughProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';

    const pillars = isRu
        ? [
            'Международная академическая траектория',
            'IT & STEAM лаборатории',
            'Клубы, проекты и лидерство',
            'Плавный переход к senior stage',
        ]
        : [
            'International academic pathway',
            'IT & STEAM labs',
            'Clubs, projects, and leadership',
            'Structured transition to senior school',
        ];

    const stats = isRu
        ? [
            { value: '5–9', label: 'Классы' },
            { value: '360°', label: 'Поддержка' },
            { value: '15+', label: 'Клубов' },
        ]
        : [
            { value: '5–9', label: 'Grades' },
            { value: '360°', label: 'Support' },
            { value: '15+', label: 'Clubs' },
        ];

    const detailCards = isRu
        ? [
            {
                eyebrow: 'Среда middle',
                title: 'Дисциплина без перегруза',
                description: 'Чёткая школьная рамка помогает подросткам собраться, удерживать фокус и постепенно брать больше ответственности.',
                tone: 'dark' as const,
            },
            {
                eyebrow: 'Рост и переход',
                title: 'Подготовка к senior stage',
                description: 'Проекты, клубы и академический темп формируют уверенность до следующего этапа обучения.',
                tone: 'light' as const,
            },
        ]
        : [
            {
                eyebrow: 'Middle environment',
                title: 'Discipline without rigidity',
                description: 'A clear school framework helps adolescents stay focused and grow into greater responsibility.',
                tone: 'dark' as const,
            },
            {
                eyebrow: 'Growth path',
                title: 'Built for the senior transition',
                description: 'Projects, clubs, and academic pace prepare students for the next stage with confidence.',
                tone: 'light' as const,
            },
        ];

    return (
        <section id="middle-overview" className="relative overflow-hidden bg-[linear-gradient(135deg,#09162e_0%,#10264b_42%,#26468a_100%)] pt-24 text-white md:pt-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_24%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(7,15,31,0.70)_0%,rgba(7,15,31,0.38)_48%,rgba(7,15,31,0.10)_100%)]" />

            <div className="relative container mx-auto max-w-7xl px-4 pb-18 lg:px-8 lg:pb-24">
                <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                    <div className="max-w-xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 md:text-xs">
                            {isRu ? 'Intellect Middle' : 'Middle School'}
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                            {isRu ? '5–9 классы' : '5–9 Grades'}
                        </div>

                        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[0.92] tracking-[-0.03em] text-white md:text-6xl lg:text-[5.4rem]">
                            {title}
                        </h1>

                        <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-blue-100 md:text-xl">
                            {subtitle}
                        </p>

                        <p className="mt-5 max-w-lg text-base leading-7 text-white/76 md:text-lg">
                            {description}
                        </p>

                        <div className="mt-8 flex max-w-2xl flex-wrap gap-3">
                            {pillars.map((pillar) => (
                                <span
                                    key={pillar}
                                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/88 backdrop-blur-sm"
                                >
                                    {pillar}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href={ctaLink}
                                className="inline-flex h-14 items-center justify-center rounded-full bg-amber-400 px-8 text-base font-semibold text-navy-950 shadow-[0_18px_45px_-20px_rgba(250,204,21,0.7)] transition-all hover:-translate-y-0.5 hover:bg-amber-300"
                            >
                                {ctaText}
                            </Link>
                            <Link
                                href="#middle-environment"
                                className="inline-flex h-14 items-center justify-center rounded-full border border-white/18 bg-white/10 px-8 text-base font-semibold text-white transition-colors hover:bg-white/14"
                            >
                                {isRu ? 'Исследовать среду Middle' : 'Explore the middle journey'}
                            </Link>
                        </div>

                        <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-5 backdrop-blur-sm"
                                >
                                    <div className="text-3xl font-semibold text-white">{stat.value}</div>
                                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative lg:pl-6">
                        <div className="relative mx-auto max-w-[42rem]">
                            <div className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-3xl lg:block" />
                            <div className="absolute -right-8 bottom-14 hidden h-36 w-36 rounded-full bg-amber-300/15 blur-3xl lg:block" />

                            <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/8 shadow-[0_38px_90px_-38px_rgba(2,6,23,0.85)]">
                                <div className="relative aspect-[10/11] md:aspect-[10/9]">
                                    <Image
                                        src={backgroundImage}
                                        alt="Intellect Middle environment"
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/92 via-navy-950/34 to-transparent p-6 md:p-7">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">
                                        {isRu ? 'Academic Momentum' : 'Academic Momentum'}
                                    </p>
                                    <p className="mt-3 max-w-md text-base leading-7 text-white/88">
                                        {isRu
                                            ? 'Структурированные привычки, проектная работа и социальный рост для ключевого переходного этапа.'
                                            : 'Structured routines, project work, and social growth designed for the middle years.'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
                                {detailCards.map((card) => (
                                    <div
                                        key={card.title}
                                        className={
                                            card.tone === 'dark'
                                                ? 'rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur-sm'
                                                : 'rounded-[28px] border border-[#f3d98d]/55 bg-gradient-to-br from-[#ffe082] to-[#f3cb4f] p-5 text-navy-950 shadow-xl'
                                        }
                                    >
                                        <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${card.tone === 'dark' ? 'text-amber-300' : 'text-navy-700'}`}>
                                            {card.eyebrow}
                                        </p>
                                        <h2 className={`mt-3 text-2xl font-semibold leading-tight ${card.tone === 'dark' ? 'text-white' : 'text-navy-950'}`}>
                                            {card.title}
                                        </h2>
                                        <p className={`mt-3 text-sm leading-7 ${card.tone === 'dark' ? 'text-white/78' : 'text-navy-900/80'}`}>
                                            {card.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
