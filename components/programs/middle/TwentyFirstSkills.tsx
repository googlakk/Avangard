import { IconWrapper } from '@/lib/icon-wrapper';
import Link from 'next/link';
import { ProgramFigure, ProgramSection, ProgramSectionHeader, programCardClassName } from '@/components/programs/shared/ProgramSection';

interface Skill {
    icon: string;
    title: string;
    description: string;
}

interface TwentyFirstSkillsProps {
    title: string;
    subtitle: string;
    skills: Skill[];
    proofImage: string;
    proofCaption: string;
}

export default function TwentyFirstSkills({
    title,
    subtitle,
    skills,
    proofImage,
    proofCaption,
}: TwentyFirstSkillsProps) {
    return (
        <ProgramSection tone="muted">
            <ProgramSectionHeader title={title} subtitle={subtitle} />

            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className={programCardClassName}
                            >
                                <div className="mb-4">
                                    <IconWrapper icon={skill.icon} variant="navy" size="sm" hoverable={false} />
                                </div>
                                <h3 className="mb-2 font-heading text-lg font-semibold text-navy-900">
                                    {skill.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600">
                                    {skill.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <ProgramFigure
                        src={proofImage || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000'}
                        alt="21st Century Skills"
                        caption={proofCaption}
                        aspectClassName="aspect-[4/5]"
                        sizes="(max-width: 1024px) 100vw, 520px"
                    />
                </div>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-8">
                <Link
                    href="/programs/middle/it-steam"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-navy-700"
                >
                    Подробнее о программе IT &amp; STEAM
                    <span aria-hidden className="text-base">
                        →
                    </span>
                </Link>
            </div>
        </ProgramSection>
    );
}
