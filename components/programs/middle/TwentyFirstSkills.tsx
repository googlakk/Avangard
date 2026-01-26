'use client';

import Image from 'next/image';

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
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <p className="text-sm uppercase tracking-wider text-navy-900/60 mb-3 font-medium">
                        {subtitle}
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
                        {title}
                    </h2>
                </div>

                {/* Two-Column Layout: Skills + Proof Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                    {/* Left: Skills List */}
                    <div className="space-y-6">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-start group"
                            >
                                {/* Icon */}
                                <div className="text-4xl flex-shrink-0 mt-1">
                                    {skill.icon}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 group-hover:text-navy-900 transition-colors">
                                        {skill.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed font-sans">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Proof Image */}
                    <div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={proofImage}
                                    alt="IT & Financial Literacy"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        {/* Caption */}
                        <p className="text-center text-sm text-gray-600 italic mt-4 font-sans">
                            📸 {proofCaption}
                        </p>
                    </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="text-center mt-12">
                    <a
                        href="/programs/middle/it-steam"
                        className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:gap-3 transition-all font-sans"
                    >
                        Подробнее о программе IT & STEAM
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
