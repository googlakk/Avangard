import { Icon } from '@/lib/icons';
import { IconWrapper } from '@/lib/icon-wrapper';
interface XXICenturySkill {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    keyPoints?: string[];
}

interface AISkillsSectionProps {
    skills: XXICenturySkill[];
}

export default function AISkillsSection({ skills }: AISkillsSectionProps) {
    return (
        <section className="py-16 md:py-20 bg-navy-900 text-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Не просто студент, а создатель
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Миру не нужны «ходячие энциклопедии», ему нужны предприниматели и лидеры
                    </p>
                </div>

                {/* Навыки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300"
                        >
                            {/* Иконка */}
                            <div className="mb-4">
                                <IconWrapper icon={skill.icon} variant="senior" size="md" />
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">
                                {skill.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-sm text-gray-300 mb-4 font-medium">
                                {skill.subtitle}
                            </p>

                            {/* Описание */}
                            <div className="space-y-3 mb-6">
                                {skill.description.map((item, idx) => (
                                    <p key={idx} className="text-sm text-gray-200 leading-relaxed">
                                        {item}
                                    </p>
                                ))}
                            </div>

                            {/* Ключевые точки */}
                            {skill.keyPoints && skill.keyPoints.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {skill.keyPoints.map((point, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Дополнительный акцент */}
                <div className="mt-12 text-center">
                    <p className="text-xl md:text-2xl font-bold text-white/90">
                        Навыки XXI века — это конкурентное преимущество на всю жизнь
                    </p>
                </div>
            </div>
        </section>
    );
}
