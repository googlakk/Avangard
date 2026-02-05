'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

// Грани образовательной экосистемы
const programs = [
    {
        id: 1,
        title: 'Intellect Junior',
        badge: '1-4 классы',
        description: 'Фундамент будущего. Мягкая адаптация, развитие Soft Skills и билингвальная среда.',
        subtitle: 'Начальная школа',
        image: '/images/junior-morning-exercise.png',
        url: '/programs/junior',
    },
    {
        id: 2,
        title: 'Intellect Middle',
        badge: '5-9 классы',
        description: 'Раскрытие потенциала. Cambridge System, STEAM-лаборатории и проектная деятельность.',
        subtitle: 'Средняя школа',
        image: '/images/middle-entrance-group.png',
        url: '/programs/middle',
    },
    {
        id: 3,
        title: 'Intellect Senior',
        badge: '10-11 классы',
        description: 'Путь в университеты. Подготовка к IELTS/TOEFL/ORT и карьерное консультирование.',
        subtitle: 'Старшая школа',
        image: '/images/senior-medalists.png',
        url: '/programs/senior',
    },
    {
        id: 4,
        title: 'Global Network',
        badge: 'Международные возможности',
        description: 'Обучение без границ. Партнерство с мировыми школами, программы обмена и двойные дипломы.',
        subtitle: 'Партнерства',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000',
        url: '/programs/global-network',
    },
    {
        id: 5,
        title: 'Life at Intellect',
        badge: '15+ секций',
        description: 'Творчество и Спорт. 15+ секций, лидерские программы и волонтерство.',
        subtitle: 'Жизнь вне классов',
        image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000',
        url: '/programs/life-at-intellect',
    },
    {
        id: 6,
        title: 'Admissions',
        badge: 'Стипендии и гранты',
        description: 'Станьте частью сообщества. Прозрачные шаги зачисления, стипендии и гранты.',
        subtitle: 'Поступление',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000',
        url: '/admissions',
    },
];

export default function ProgramsSection() {
    const { t } = useLanguage();

    const programs = [
        {
            id: 1,
            title: t.programs.items.junior.title,
            badge: t.programs.items.junior.badge,
            description: t.programs.items.junior.description,
            subtitle: t.programs.items.junior.subtitle,
            image: '/images/junior-morning-exercise.png',
            url: '/programs/junior',
        },
        {
            id: 2,
            title: t.programs.items.middle.title,
            badge: t.programs.items.middle.badge,
            description: t.programs.items.middle.description,
            subtitle: t.programs.items.middle.subtitle,
            image: '/images/middle-entrance-group.png',
            url: '/programs/middle',
        },
        {
            id: 3,
            title: t.programs.items.senior.title,
            badge: t.programs.items.senior.badge,
            description: t.programs.items.senior.description,
            subtitle: t.programs.items.senior.subtitle,
            image: '/images/senior-medalists.png',
            url: '/programs/senior',
        },
        {
            id: 4,
            title: t.programs.items.global.title,
            badge: t.programs.items.global.badge,
            description: t.programs.items.global.description,
            subtitle: t.programs.items.global.subtitle,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000',
            url: '/programs/global-network',
        },
        {
            id: 5,
            title: t.programs.items.life.title,
            badge: t.programs.items.life.badge,
            description: t.programs.items.life.description,
            subtitle: t.programs.items.life.subtitle,
            image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000',
            url: '/programs/life-at-intellect',
        },
        {
            id: 6,
            title: t.programs.items.admissions.title,
            badge: t.programs.items.admissions.badge,
            description: t.programs.items.admissions.description,
            subtitle: t.programs.items.admissions.subtitle,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000',
            url: '/admissions',
        },
    ];

    return (
        <section className="min-h-screen py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex items-center">
            {/* Декоративный фоновый элемент */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-navy-900 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-900 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full">
                {/* Заголовок в академическом стиле - компактный */}
                <div className="text-center mb-8 md:mb-12">
                    {/* Декоративная верхняя линия */}
                    <div className="flex items-center justify-center mb-4 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-navy-900 to-transparent"></div>
                        <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-navy-900"></div>
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-navy-900 to-transparent"></div>
                    </div>

                    {/* Заголовок с serif шрифтом - меньше */}
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                        {t.programs.title}
                    </h2>

                    {/* Подзаголовок */}
                    <p className="text-xs uppercase tracking-[0.3em] text-navy-900/60 mb-4 font-medium opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                        {t.programs.subtitle}
                    </p>

                    {/* Описание - построчно, компактнее */}
                    <div className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed space-y-1">
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                            {t.programs.description.p1}
                        </p>
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]">
                            {t.programs.description.p2}
                        </p>
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]">
                            {t.programs.description.p3}
                        </p>
                    </div>

                    {/* Декоративная нижняя линия */}
                    <div className="flex items-center justify-center mt-6 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-navy-900/30 to-transparent"></div>
                    </div>
                </div>

                {/* Сетка программ - компактнее */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
                    {programs.map((program) => (
                        <Link
                            href={program.url}
                            key={program.id}
                            className="group relative mb-4 block"
                        >
                            {/* Карточка с светло-серым фоном - компактная */}
                            <div className="bg-gray-100 rounded-2xl p-3 pb-6 shadow-sm transition-shadow hover:shadow-md">
                                {/* Контейнер изображения с overflow */}
                                <div className="relative mb-4 overflow-hidden rounded-xl aspect-[5/3]">
                                    {/* Badge в левом верхнем углу */}
                                    {program.badge && (
                                        <div className="absolute top-2 left-2 z-10">
                                            <span className="bg-gray-600/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[10px] font-medium">
                                                {program.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Изображение */}
                                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-y-[40%]">
                                        <Image
                                            src={program.image}
                                            alt={program.title}
                                            fill
                                            className="object-cover rounded-xl"
                                        />
                                        <div className="absolute inset-0 bg-navy-900/30 z-10 rounded-xl"></div>
                                    </div>

                                    {/* Описание (появляется снизу при hover) */}
                                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center min-h-[50px]">
                                        <p className="text-[10px] text-gray-700 leading-tight text-center">
                                            {program.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Текстовый контент - компактный */}
                                <div className="text-center px-1 mb-2">
                                    <h3 className="text-base font-bold text-gray-900 mb-0.5">
                                        {program.title}
                                    </h3>
                                    {program.subtitle && (
                                        <p className="text-xs text-gray-500">{program.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            {/* Кнопка \"О проекте\" на границе карточки - меньше */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                                <span
                                    className="inline-block bg-[#0f1419] text-white px-6 py-1.5 rounded-full text-xs font-medium group-hover:bg-[#1a1f26] transition-colors shadow-lg whitespace-nowrap"
                                >
                                    {t.programs.moreDetails}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
