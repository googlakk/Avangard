import Link from 'next/link';

// Программы школы
const programs = [
    {
        id: 1,
        title: 'Intellect Junior',
        badge: '1–4 классы',
        description: 'Углубленное изучение английского языка (8-10 уроков в неделю). В 1-4 классах работают классный руководитель и Co-teacher.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000',
    },
    {
        id: 2,
        title: 'Intellect Pro',
        badge: '5–11 классы',
        description: 'Изучение точных наук на английском языке по системе Cambridge Assessment (математика, химия, физика, биология, информатика).',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000',
    },
    {
        id: 3,
        title: 'Школа без домашней работы',
        badge: 'Study Club',
        description: 'Домашние задания выполняются в школе. Учебники хранятся в персональных шкафчиках, никаких тяжелых ранцев.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000',
    },
    {
        id: 4,
        title: 'Навыки будущего',
        badge: 'IT и Интеллект',
        description: 'Программирование (IT), Ментальная арифметика, Ораторское искусство, Логика, Робототехника.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000',
    },
    {
        id: 5,
        title: 'Спорт и Здоровье',
        badge: 'Секции включены',
        description: 'Футбол, Баскетбол, Волейбол, Настольный теннис, Каратэ, Грэпплинг. 3-разовое питание (завтрак, обед, полдник).',
        image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000',
    },
    {
        id: 6,
        title: 'Мировые Чемпионы',
        badge: 'Результат',
        description: 'Наши ученики побеждают на мировых олимпиадах: Memoriad (Las Vegas), Mental Calculation World Cup, World Memory Championship.',
        image: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?q=80&w=1000',
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
