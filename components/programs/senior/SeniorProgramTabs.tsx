'use client';

import Tabs from '@/components/ui/Tabs';
import {
    universityPathwayBlocks,
    englishProficiencyBlocks,
    cognitiveAdvantages,
    xxiCenturySkills,
    studentLifeFeatures,
    careerGuidanceItems
} from '@/lib/data/senior-program';

export default function SeniorProgramTabs() {
    const tabs = [
        {
            id: 'academic-track',
            label: 'Академический трек',
            icon: '🎓',
            content: <AcademicTrackContent />
        },
        {
            id: 'skills-development',
            label: 'Развитие навыков',
            icon: '🧠',
            content: <SkillsDevelopmentContent />
        },
        {
            id: 'student-experience',
            label: 'Студенческая жизнь',
            icon: '🌟',
            content: <StudentExperienceContent />
        }
    ];

    return (
        <section id="program-details" className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Программа обучения
                    </h2>
                    <p className="text-lg text-gray-600">
                        Выберите направление, чтобы узнать подробности
                    </p>
                </div>

                {/* Tabs Component */}
                <div className="max-w-6xl mx-auto">
                    <Tabs tabs={tabs} defaultTab="academic-track" />
                </div>
            </div>
        </section>
    );
}

// Tab 1: Academic Track (University Pathway + English)
function AcademicTrackContent() {
    return (
        <div className="space-y-12">
            {/* University Pathway */}
            <div>
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    Стратегия поступления
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                    В 10-11 классе школа работает как Career Center
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {universityPathwayBlocks.map((block) => (
                        <div
                            key={block.id}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="text-4xl mb-4">{block.icon}</div>
                            <h4 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                {block.title}
                            </h4>
                            <p className="text-sm text-navy-900/60 uppercase tracking-wider mb-4 font-medium">
                                {block.subtitle}
                            </p>
                            <ul className="space-y-2">
                                {block.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-navy-900 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* English Proficiency */}
            <div className="bg-navy-900 rounded-3xl p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold font-heading mb-4">
                    English for Academic Purposes
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                    Английский как рабочий инструмент
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {englishProficiencyBlocks.map((block, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                            <div className="text-3xl mb-3">{block.icon}</div>
                            <h4 className="text-lg font-bold mb-2">{block.title}</h4>
                            <p className="text-sm text-gray-300 mb-4">{block.subtitle}</p>
                            <ul className="space-y-2">
                                {block.description.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-200">
                                        <span className="shrink-0">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {block.target && (
                                <div className="mt-4 bg-white text-navy-900 px-3 py-1 rounded-full text-xs font-bold inline-block">
                                    🎯 {block.target}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Tab 2: Skills Development (Cognitive Advantage + AI Skills)
function SkillsDevelopmentContent() {
    return (
        <div className="space-y-12">
            {/* Cognitive Advantage */}
            <div>
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    «Взлом» экзаменов через технологии мозга
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Обычный ученик тратит на подготовку <span className="font-bold text-gray-900">4 часа</span>.
                    Ученик Intellect — <span className="font-bold text-navy-900">1 час</span>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cognitiveAdvantages.map((advantage, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center text-2xl mb-4">
                                {advantage.icon}
                            </div>
                            <h4 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                {advantage.title}
                            </h4>
                            <p className="text-sm text-navy-900/70 mb-4">{advantage.subtitle}</p>
                            <ul className="space-y-2 mb-4">
                                {advantage.description.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-navy-900">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-navy-900/5 border-2 border-navy-900 text-navy-900 px-3 py-2 rounded-full text-xs font-bold text-center">
                                {advantage.benefit}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* XXI Century Skills */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold font-heading mb-4">
                    Навыки XXI века
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                    Не просто студент, а создатель
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {xxiCenturySkills.map((skill, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                            <div className="text-4xl mb-4">{skill.icon}</div>
                            <h4 className="text-xl font-bold mb-2">{skill.title}</h4>
                            <p className="text-sm text-gray-300 mb-4">{skill.subtitle}</p>
                            <div className="space-y-2 mb-4">
                                {skill.description.map((item, itemIdx) => (
                                    <p key={itemIdx} className="text-sm text-gray-200">
                                        {item}
                                    </p>
                                ))}
                            </div>
                            {skill.keyPoints && (
                                <div className="flex flex-wrap gap-2">
                                    {skill.keyPoints.map((point, pointIdx) => (
                                        <span key={pointIdx} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Tab 3: Student Experience (Student Life + Career Guidance)
function StudentExperienceContent() {
    return (
        <div className="space-y-12">
            {/* Student Life */}
            <div>
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    Сообщество лидеров
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Здесь нет «детей». Здесь есть партнеры.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {studentLifeFeatures.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h4 className="text-xl font-bold font-heading text-gray-900 mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-navy-900/60 uppercase tracking-wider mb-4">
                                {feature.subtitle}
                            </p>
                            <ul className="space-y-2 mb-4">
                                {feature.description.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-navy-900">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {feature.benefit && (
                                <div className="bg-navy-900 text-white px-3 py-2 rounded-full text-xs font-bold inline-block">
                                    {feature.benefit}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Career Guidance */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100">
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                    Помогаем найти «СВОЕ» дело
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Персонализированный путь к успешной карьере
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {careerGuidanceItems.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h4 className="text-lg font-bold font-heading text-gray-900 mb-4">
                                {item.title}
                            </h4>
                            <ul className="space-y-2">
                                {item.description.map((desc, descIdx) => (
                                    <li key={descIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-navy-900 shrink-0">→</span>
                                        <span>{desc}</span>
                                    </li>
                                ))}
                            </ul>
                            {item.highlight && (
                                <div className="mt-4 bg-navy-900/5 text-navy-900 px-3 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1">
                                    <span>✓</span>
                                    <span>{item.highlight}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
