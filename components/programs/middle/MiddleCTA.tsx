'use client';

import { ProgramSection, ProgramSectionHeader } from '@/components/programs/shared/ProgramSection';

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
    return (
        <ProgramSection tone="muted" spacing="md">
            <div className="mx-auto max-w-4xl text-center">
                <ProgramSectionHeader title={title} subtitle={description} align="center" className="mb-10" />

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href={primaryCTA.link}
                        className="inline-flex items-center justify-center rounded-lg bg-navy-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 md:px-8 md:py-4 md:text-base"
                    >
                        {primaryCTA.text}
                    </a>
                    <a
                        href={secondaryCTA.link}
                        className="inline-flex items-center justify-center rounded-lg border border-navy-900/20 bg-white px-7 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50 md:px-8 md:py-4 md:text-base"
                    >
                        {secondaryCTA.text}
                    </a>
                </div>
            </div>
        </ProgramSection>
    );
}
