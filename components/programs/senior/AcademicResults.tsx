import { IconWrapper } from '@/lib/icon-wrapper';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';

interface AcademicPillar {
    icon: string;
    title: string;
    description: string;
    details: string[];
}

interface AcademicResultsProps {
    headline: string;
    description: string;
    timeframe: string;
    pillars: AcademicPillar[];
    proofImage: string;
    proofCaption: string;
    bottomStrong: string;
    bottomText: string;
}

export default function AcademicResults({
    headline,
    description,
    timeframe,
    pillars,
    proofImage,
    proofCaption,
    bottomStrong,
    bottomText
}: AcademicResultsProps) {
    return (
        <ProgramSection tone="white">
            <ProgramSectionHeader title={headline} subtitle={description} align="center" className="mb-6" />

            <p className="mb-12 text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
                {timeframe}
            </p>

            <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                {pillars.map((pillar, index) => (
                    <div
                        key={index}
                        className={programCardClassName}
                    >
                        <div className="mb-4">
                            <IconWrapper icon={pillar.icon} variant="navy" size="sm" hoverable={false} />
                        </div>

                        <h3 className="mb-2 font-heading text-lg font-semibold text-navy-900">
                            {pillar.title}
                        </h3>

                        <p className="mb-4 text-sm leading-relaxed text-slate-600">
                            {pillar.description}
                        </p>

                        <ul className="space-y-2">
                            {pillar.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="mt-0.5 text-navy-900">•</span>
                                    <span className="leading-relaxed">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mx-auto max-w-5xl">
                <ProgramFigure
                    src={proofImage}
                    alt="Расписание с интегрированной подготовкой к экзаменам"
                    caption={proofCaption}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                />
            </div>

            <div className="mt-12 text-center">
                <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                    <strong className="text-navy-900">{bottomStrong}</strong>{' '}
                    {bottomText}
                </p>
            </div>
        </ProgramSection>
    );
}
