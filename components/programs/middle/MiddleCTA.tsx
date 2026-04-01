'use client';

import { ProgramSection, ProgramSectionHeader } from '@/components/programs/shared/ProgramSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface CTAProps {
    title: string;
    description: string;
    primaryCTA: {
        text: string;
        link: string;
    };
    secondaryCTA: {
        text: string;
        link: string;
    };
}

export default function MiddleCTA({
    title,
    description,
    primaryCTA,
    secondaryCTA,
}: CTAProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';
    const checkpoints = isRu
        ? [
            '5–9 классы',
            'Cambridge-aligned progression',
            'Проектная и клубная среда',
            'Подготовка к senior school',
        ]
        : [
            '5–9 grades',
            'Cambridge-aligned progression',
            'Project and club culture',
            'Preparation for senior school',
        ];

    return (
        <ProgramSection id="middle-cta" tone="muted" spacing="md">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#07152e_0%,#142d57_100%)] px-6 py-12 text-center text-white shadow-[0_32px_90px_-44px_rgba(15,23,42,0.6)] md:px-10 md:py-14">
                <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                    {isRu ? 'Поступление и следующий шаг' : 'Admissions & Next Step'}
                </div>
                <ProgramSectionHeader title={title} subtitle={description} align="center" className="mb-10" />

                <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
                    {checkpoints.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/82"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href={primaryCTA.link}
                        className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-amber-300 md:text-base"
                    >
                        {primaryCTA.text}
                    </a>
                    <a
                        href={secondaryCTA.link}
                        className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/14 md:text-base"
                    >
                        {secondaryCTA.text}
                    </a>
                </div>
            </div>
        </ProgramSection>
    );
}
