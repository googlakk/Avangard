import Link from 'next/link';
import Image from 'next/image';

// Грани образовательной экосистемы
const programs = [
    {
        id: 1,
        title: 'Intellect Junior',
        badge: '1-4 классы',
        description: 'Фундамент будущего. Мягкая адаптация, развитие Soft Skills и билингвальная среда.',
        subtitle: 'Начальная школа',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000',
        url: '/programs/junior',
    },
    {
        id: 2,
        title: 'Intellect Middle',
        badge: '5-9 классы',
        description: 'Раскрытие потенциала. Cambridge System, STEAM-лаборатории и проектная деятельность.',
        subtitle: 'Средняя школа',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000',
        url: '/programs/middle',
    },
    {
        id: 3,
        title: 'Intellect Senior',
        badge: '10-11 классы',
        description: 'Путь в университеты. Подготовка к IELTS/TOEFL/ORT и карьерное консультирование.',
        subtitle: 'Старшая школа',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000',
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
                        Грани Образования
                    </h2>

                    {/* Подзаголовок */}
                    <p className="text-xs uppercase tracking-[0.3em] text-navy-900/60 mb-4 font-medium opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                        Экосистема развития
                    </p>

                    {/* Описание - построчно, компактнее */}
                    <div className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed space-y-1">
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                            Образование в Intellect Pro — это не просто уроки. Это экосистема, где каждая грань дополняет другую, создавая целостную картину развития.
                        </p>
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]">
                            Академические программы от младших до старших классов, спорт и творчество, команда педагогов-новаторов, мировые достижения наших учеников, партнерство с университетами и IT-компаниями — все это части единого целого.
                        </p>
                        <p className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]">
                            Исследуйте каждую грань и откройте для себя мир возможностей.
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
                        <div
                            key={program.id}
                            className="group cursor-pointer relative mb-4"
                        >
                            {/* Карточка с светло-серым фоном - компактная */}
                            <div className="bg-gray-100 rounded-2xl p-3 pb-6 shadow-sm">
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
                                <Link
                                    href={program.url}
                                    className="inline-block bg-[#0f1419] text-white px-6 py-1.5 rounded-full text-xs font-medium hover:bg-[#1a1f26] transition-colors shadow-lg whitespace-nowrap"
                                >
                                    О проекте
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
