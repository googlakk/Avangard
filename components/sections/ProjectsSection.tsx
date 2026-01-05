import Link from 'next/link';

// Программы школы
const programs = [
    // РЯД 1: ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ
    {
        id: 1,
        title: 'Intellect Junior',
        badge: '2 Учителя',
        description: 'Система с Co-teacher в классе. Углубленный английский (8-10 часов в неделю), ментальная арифметика и спортстекинг для развития мозга.',
        subtitle: '1-4 классы',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000',
    },
    {
        id: 2,
        title: 'Intellect Pro',
        badge: 'Cambridge System',
        description: 'Точные науки (Math, Science) на английском языке. Подготовка к IELTS/SAT и поступлению в зарубежные ВУЗы на грант. Программирование и робототехника.',
        subtitle: '5-11 классы',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000',
    },
    {
        id: 3,
        title: 'Творчество и Спорт',
        badge: '15+ Направлений',
        description: 'Вам не нужны репетиторы. В школе есть всё: Шахматы, Комуз, Спидкубинг, Танцы. Спорт: Футбол, Каратэ, Волейбол, Грэпплинг.',
        subtitle: 'Кружки и Секции',
        image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000',
    },

    // РЯД 2: ЭКОСИСТЕМА
    {
        id: 4,
        title: 'Наши Гордость',
        badge: 'Победы',
        description: 'Ученики школы — победители мировых олимпиад: Memoriad (Las Vegas), Mental Calculation World Cup, World Memory Championship.',
        subtitle: 'Мировые Чемпионы',
        image: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?q=80&w=1000',
    },
    {
        id: 5,
        title: 'Глобальная сеть',
        badge: 'Сотрудничество',
        description: 'Сотрудничаем с международными ВУЗами и IT-компаниями. Открыты для франшизы и образовательных коллабораций. Строим будущее вместе.',
        subtitle: 'Партнерам',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000',
    },
    {
        id: 6,
        title: 'Команда Экспертов',
        badge: 'Join Us',
        description: 'Мы ищем лучших. Если вы — педагог-новатор, готовый работать по международным стандартам, присоединяйтесь к нашей команде.',
        subtitle: 'Учителям',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000',
    },
];

export default function ProgramsSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
                        Наши программы
                    </h2>
                    <Link
                        href="/programs"
                        className="flex items-center text-navy-900 hover:text-navy-700 transition-colors group"
                    >
                        <svg
                            className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>

                {/* Сетка программ */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
                        >
                            {/* Изображение */}
                            <div className="relative h-64 overflow-hidden">
                                {program.badge && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {program.badge}
                                        </span>
                                    </div>
                                )}
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:-translate-y-4"
                                />

                                {/* Описание (всплывает снизу при hover) */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-sm text-gray-600 whitespace-pre-line">
                                        {program.description}
                                    </p>
                                </div>
                            </div>

                            {/* Контент */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-heading text-gray-900 mb-1">
                                    {program.title}
                                </h3>
                                {program.subtitle && (
                                    <p className="text-sm text-gray-500 mb-3">{program.subtitle}</p>
                                )}
                                <Link
                                    href={`/programs/${program.id}`}
                                    className="inline-block bg-navy-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-navy-800 transition-colors mt-4"
                                >
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
