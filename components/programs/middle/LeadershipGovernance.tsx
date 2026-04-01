import { IconWrapper } from '@/lib/icon-wrapper';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface LeadershipGovernanceProps {
    title: string;
    subtitle: string;
    features: Feature[];
    ctaText: string;
    ctaLink: string;
    proofImage: string;
    proofCaption: string;
}

export default function LeadershipGovernance({
    title,
    subtitle,
    features,
    ctaText,
    ctaLink,
    proofImage,
    proofCaption,
}: LeadershipGovernanceProps) {
    const { language } = useLanguage();
    const isRu = language !== 'en';

    return (
        <ProgramSection id="middle-leadership" tone="white" className="relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(49,86,163,0.10),transparent_38%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">
                        {isRu ? 'Самостоятельность и влияние' : 'Student Agency'}
                    </div>
                    <ProgramSectionHeader title={title} subtitle={subtitle} className="mb-8" />

                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`${programCardClassName} rounded-[24px] border-slate-200/80 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.45)] ${index === 1 ? 'bg-slate-50' : 'bg-white'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0">
                                        <IconWrapper icon={feature.icon} variant={index === 2 ? 'achievement' : 'navy'} size="sm" hoverable={false} />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                            {isRu ? `Роль ${index + 1}` : `Role ${index + 1}`}
                                        </div>
                                        <h3 className="mt-2 text-xl font-semibold text-navy-900">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-[26px] border border-slate-200 bg-navy-900 p-6 text-white shadow-[0_28px_70px_-42px_rgba(15,23,42,0.65)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                            {isRu ? 'Почему это важно в middle school' : 'Why it matters in middle school'}
                        </p>
                        <p className="mt-3 max-w-xl text-base leading-7 text-white/80">
                            {isRu
                                ? 'Именно в этом возрасте дети начинают пробовать ответственность, командную работу и самовыражение. Лидерство должно быть видимым и достижимым.'
                                : 'This is the age when students begin to test responsibility, teamwork, and self-expression. Leadership should feel visible and achievable.'}
                        </p>
                    </div>
                </div>

                <div className="lg:pt-6">
                    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_28px_80px_-42px_rgba(15,23,42,0.4)]">
                        <ProgramFigure
                            src={proofImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000'}
                            alt="Student Leadership"
                            caption={proofCaption}
                            aspectClassName="aspect-[4/4.2]"
                            sizes="(max-width: 1024px) 100vw, 620px"
                            className="[&>div]:rounded-none [&>div]:border-0 [&>figcaption]:px-6 [&>figcaption]:pb-5"
                        />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-center shadow-sm">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{isRu ? 'Клубы' : 'Clubs'}</div>
                            <div className="mt-2 text-sm font-medium text-navy-900">{isRu ? 'Принадлежность' : 'Belonging'}</div>
                        </div>
                        <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-center shadow-sm">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{isRu ? 'Проекты' : 'Projects'}</div>
                            <div className="mt-2 text-sm font-medium text-navy-900">{isRu ? 'Инициатива' : 'Initiative'}</div>
                        </div>
                        <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-center shadow-sm">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{isRu ? 'Соревнования' : 'Competitions'}</div>
                            <div className="mt-2 text-sm font-medium text-navy-900">{isRu ? 'Уверенность' : 'Confidence'}</div>
                        </div>
                    </div>

                    <a
                        href={ctaLink}
                        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-navy-900 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>
        </ProgramSection>
    );
}
