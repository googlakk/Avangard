import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';

interface CognitiveAdvantage {
    title: string;
    tagline: string;
    description: string;
    benefits: string[];
    multiplier?: string;
}

interface CognitiveSuperiorityAIProps {
    headline: string;
    hook: string;
    advantages: CognitiveAdvantage[];
    proofImage: string;
    proofCaption: string;
    bottomTitle: string;
    bottomText: string;
}

export default function CognitiveSuperiorityAI({
    headline,
    hook,
    advantages,
    proofImage,
    proofCaption,
    bottomTitle,
    bottomText
}: CognitiveSuperiorityAIProps) {
    return (
        <ProgramSection tone="muted">
            <ProgramSectionHeader title={headline} subtitle={hook} />

            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                    <ProgramFigure
                        src={proofImage || 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=2000'}
                        alt="Студент за учебой"
                        caption={proofCaption}
                        aspectClassName="aspect-[3/4]"
                        sizes="(max-width: 1024px) 100vw, 520px"
                    />
                </div>

                <div className="lg:col-span-7">
                    <ol className="space-y-6">
                        {advantages.map((advantage, index) => (
                            <li
                                key={index}
                                className={programCardClassName}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-navy-900">
                                        {index + 1}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="mb-1 font-heading text-lg font-semibold text-navy-900">
                                            {advantage.title}
                                        </h3>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                            {advantage.tagline}
                                        </p>

                                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                            {advantage.description}
                                        </p>

                                        <ul className="mt-4 space-y-2">
                                            {advantage.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <span className="mt-0.5 text-navy-900">•</span>
                                                    <span className="leading-relaxed">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {advantage.multiplier && (
                                            <div className="mt-4 inline-flex rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-navy-900 ring-1 ring-inset ring-slate-200">
                                                {advantage.multiplier}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-center">
                        <p className="mb-2 font-heading text-lg font-semibold text-navy-900">
                            {bottomTitle}
                        </p>
                        <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                            {bottomText}
                        </p>
                    </div>
                </div>
            </div>
        </ProgramSection>
    );
}
