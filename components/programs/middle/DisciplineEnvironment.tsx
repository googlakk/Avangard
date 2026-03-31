import { IconWrapper } from '@/lib/icon-wrapper';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';

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
    return (
        <ProgramSection tone="white">
            <ProgramSectionHeader title={title} subtitle={subtitle} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`flex h-full flex-col ${programCardClassName}`}
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

                        <div className="mt-4 border-t border-slate-200 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                {feature.highlight}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <ProgramFigure
                className="mt-12"
                src={proofImage || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2000'}
                alt="Discipline and Environment"
                caption={proofCaption}
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </ProgramSection>
    );
}
