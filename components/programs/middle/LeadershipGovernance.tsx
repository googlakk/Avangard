import { IconWrapper } from '@/lib/icon-wrapper';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';

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
    return (
        <ProgramSection tone="white">
            <ProgramSectionHeader title={title} subtitle={subtitle} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={programCardClassName}
                    >
                        <div className="mb-4">
                            <IconWrapper icon={feature.icon} variant="navy" size="sm" hoverable={false} />
                        </div>

                        <h3 className="mb-2 font-heading text-lg font-semibold text-navy-900">
                            {feature.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-slate-600">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                    <ProgramFigure
                        src={proofImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000'}
                        alt="Student Leadership"
                        caption={proofCaption}
                        aspectClassName="aspect-[21/9]"
                        sizes="(max-width: 1024px) 100vw, 860px"
                    />
                </div>

                <div className="lg:col-span-4 lg:pt-2">
                    <a
                        href={ctaLink}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>
        </ProgramSection>
    );
}
