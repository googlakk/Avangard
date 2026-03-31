'use client';
import { IconWrapper } from '@/lib/icon-wrapper';

interface Skill {
    icon: string;
    title: string;
    description: string;
    outcome: string;
}

interface SkillsDevelopmentProps {
    title: string;
    subtitle: string;
    description: string;
    skills: Skill[];
}

export default function SkillsDevelopment({
    title,
    subtitle,
    description,
    skills,
}: SkillsDevelopmentProps) {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {subtitle}
                    </p>
                    <h2 className="mb-4 font-heading text-2xl font-semibold text-navy-900 md:text-3xl">
                        {title}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                        {description}
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-slate-200 bg-white p-6"
                        >
                            {/* Icon */}
                            <div className="mb-4">
                                <IconWrapper icon={skill.icon} variant="navy" size="sm" hoverable={false} />
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 font-heading text-base font-semibold text-navy-900">
                                {skill.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-4 text-sm leading-relaxed text-slate-600">
                                {skill.description}
                            </p>

                            {/* Outcome Badge */}
                            <div className="border-t border-slate-200 pt-4">
                                <p className="text-sm font-medium text-navy-900">
                                    <span className="mr-2">✓</span>
                                    {skill.outcome}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
