import { IconWrapper } from '@/lib/icon-wrapper';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface Feature {
    icon: string;
    title: string;
    description: string;
    highlight: string;
}

interface DisciplineEnvironmentProps {
    title: string;
    subtitle: string;
    features: Feature[];
    proofImage: string;
    proofCaption: string;
}

export default function DisciplineEnvironment({
    title,
    subtitle,
    features,
    proofImage,
    proofCaption,
}: DisciplineEnvironmentProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';

    return (
        <ProgramSection id="middle-environment" tone="white" className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-10 h-64 bg-[radial-gradient(circle_at_top_left,rgba(49,86,163,0.08),transparent_42%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_38%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">
                        {isRu ? 'Культура школы' : 'School Culture'}
                    </div>
                    <ProgramSectionHeader title={title} subtitle={subtitle} className="mb-8" />

                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group flex h-full flex-col rounded-[24px] border border-slate-200/80 p-5 transition-transform duration-300 hover:-translate-y-0.5 ${index === 1 ? 'bg-navy-900 text-white shadow-xl' : 'bg-white shadow-[0_24px_60px_-44px_rgba(15,23,42,0.35)]'}`}
                            >
                                <div className="mb-4">
                                    <IconWrapper icon={feature.icon} variant={index === 1 ? 'achievement' : 'navy'} size="sm" hoverable={false} />
                                </div>

                                <h3 className={`mb-2 text-xl font-semibold ${index === 1 ? 'text-white' : 'text-navy-900'}`}>
                                    {feature.title}
                                </h3>

                                <p className={`text-sm leading-7 ${index === 1 ? 'text-white/78' : 'text-slate-600'}`}>
                                    {feature.description}
                                </p>

                                <div className={`mt-5 border-t pt-4 ${index === 1 ? 'border-white/15' : 'border-slate-200'}`}>
                                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-amber-300' : 'text-slate-500'}`}>
                                        {feature.highlight}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 lg:pt-14">
                    <div className="grid gap-4 md:grid-cols-[0.82fr_0.18fr]">
                        <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-500">
                                {isRu ? 'Фокус и рамка' : 'Focus Framework'}
                            </p>
                            <p className="mt-3 text-base leading-7 text-slate-700">
                                {isRu
                                    ? 'Ученикам middle school нужна дисциплина, которая сохраняет смысл, социальность и внутреннюю мотивацию.'
                                    : 'Middle students need a disciplined structure that still feels purposeful, social, and motivating.'}
                            </p>
                        </div>
                        <div className="hidden rounded-[28px] bg-amber-200 md:block" />
                    </div>

                    <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
                        <div className="absolute left-6 top-6 z-10 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-900 backdrop-blur-sm">
                            {isRu ? 'Фото-доказательство' : 'Documentary proof'}
                        </div>
                        <ProgramFigure
                            src={proofImage || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2000'}
                            alt="Discipline and Environment"
                            caption={proofCaption}
                            aspectClassName="aspect-[16/10]"
                            sizes="(max-width: 1024px) 100vw, 920px"
                            className="[&>div]:rounded-none [&>div]:border-0 [&>figcaption]:px-6 [&>figcaption]:pb-5 [&>figcaption]:text-sm"
                        />
                    </div>
                </div>
            </div>
        </ProgramSection>
    );
}
