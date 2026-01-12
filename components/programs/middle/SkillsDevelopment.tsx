'use client';

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
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <p className="text-sm uppercase tracking-wider text-gray-600 mb-3 font-medium">
                        {subtitle}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-[#0f1419] hover:shadow-xl transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {skill.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {skill.description}
                            </p>

                            {/* Outcome Badge */}
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm font-medium text-[#0f1419]">
                                    ✓ {skill.outcome}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
