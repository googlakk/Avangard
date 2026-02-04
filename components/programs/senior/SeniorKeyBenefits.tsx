import { IconWrapper } from '@/lib/icon-wrapper';
import { Icon } from '@/lib/icons';
import Link from 'next/link';

interface KeyBenefit {
    icon: string;
    title: string;
    description: string;
    highlight: string;
    link?: string;
}

const keyBenefits: KeyBenefit[] = [
    {
        icon: 'GraduationCap',
        title: 'Поступление в ТОП-вузы',
        description: 'Комплексная подготовка к IELTS, TOEFL, SAT и ОРТ. Формируем портфолио абитуриента, за которым охотятся университеты.',
        highlight: 'Гранты за рубеж',
        link: '#academic-track'
    },
    {
        icon: 'Brain',
        title: 'Когнитивное преимущество',
        description: 'Мнемотехника, скорочтение и управление стрессом. Ученик Intellect тратит на подготовку к экзаменам в 4 раза меньше времени.',
        highlight: 'Взлом экзаменов',
        link: '#skills-development'
    },
    {
        icon: 'TrendingUp',
        title: 'Навыки будущего',
        description: 'Стартап-инкубатор, AI-fluency и лидерство. Превращаем учеников в создателей, а не потребителей знаний.',
        highlight: 'AI & Предпринимательство',
        link: '#student-experience'
    }
];

export default function SeniorKeyBenefits() {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                        Почему Intellect Senior?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Мы не просто готовим к экзаменам — мы формируем будущих лидеров
                    </p>
                </div>

                {/* Benefit Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {keyBenefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-navy-900/20 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-navy-900/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-6">
                                    <IconWrapper icon={benefit.icon} variant="senior" size="md" />
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                                    {benefit.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {benefit.description}
                                </p>

                                {/* Highlight badge */}
                                <div className="inline-flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-full text-sm font-bold">
                                    <span>✓</span>
                                    <span>{benefit.highlight}</span>
                                </div>

                                {/* Optional link */}
                                {benefit.link && (
                                    <Link
                                        href={benefit.link}
                                        className="mt-4 inline-flex items-center gap-2 text-navy-900 font-medium text-sm hover:gap-3 transition-all"
                                    >
                                        <span>Узнать больше</span>
                                        <span>→</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
