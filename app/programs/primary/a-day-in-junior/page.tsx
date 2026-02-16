import Image from 'next/image';
import Link from 'next/link';
import { dailySchedule } from '@/lib/data/junior-program';

export const metadata = {
    title: 'Один день в Intellect Junior | Распорядок дня',
    description: 'Подробное расписание дня в начальной школе Intellect Junior: от утренней зарядки до вечерних кружков. Режим дня с 08:00 до 17:00.',
};

export default function ADayInJuniorPage() {
    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="py-16 bg-navy-900 text-white">
                <div className="container mx-auto px-4">
                    <Link
                        href="/programs/primary"
                        className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                    >
                        ← Назад к Junior Programs
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-ibm-plex-serif font-bold mb-4">
                        Один день в Intellect Junior
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl">
                        Подробное расписание с 08:00 до 17:00. Каждый день наполнен обучением, развитием и радостью.
                    </p>
                </div>
            </section>

            {/* Расписание по часам */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {dailySchedule.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Время и иконка */}
                                    <div className="bg-navy-900 text-white p-6 flex flex-col justify-center items-center">
                                        <div className="text-6xl mb-3">{item.icon}</div>
                                        <div className="text-3xl font-ibm-plex-serif font-bold">
                                            {item.time}
                                        </div>
                                    </div>

                                    {/* Описание */}
                                    <div className="p-6 md:col-span-2 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                                            {item.activity}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-700">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Фото если есть */}
                                {item.image && (
                                    <div className="relative h-48 md:h-64">
                                        <Image
                                            src={item.image}
                                            alt={item.activity}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Меню столовой - краткий пример */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-8">
                            Примерное меню на неделю
                        </h2>

                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <h3 className="text-xl font-bold font-heading text-navy-900 mb-3">
                                        🍳 Завтрак
                                    </h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• Каша (овсяная, гречневая)</li>
                                        <li>• Яйца, сырники</li>
                                        <li>• Чай, какао</li>
                                        <li>• Фрукты</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold font-heading text-navy-900 mb-3">
                                        🍲 Обед
                                    </h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• Суп (лагман, шурпа)</li>
                                        <li>• Плов, манты, котлеты</li>
                                        <li>• Овощной салат</li>
                                        <li>• Компот, сок</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold font-heading text-navy-900 mb-3">
                                        🥐 Полдник
                                    </h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• Выпечка (самса, булочки)</li>
                                        <li>• Йогурт, творог</li>
                                        <li>• Фрукты, орехи</li>
                                        <li>• Чай, молоко</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                <p className="text-sm text-gray-600">
                                    ✅ Все блюда халяльные • Разработано с учетом потребностей растущего организма
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Кружки */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
                            Кружки и секции
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: '♟️', title: 'Шахматы', desc: 'Развитие стратегического мышления' },
                                { icon: '🎨', title: 'Рисование', desc: 'Творческое самовыражение' },
                                { icon: '🥋', title: 'Каратэ', desc: 'Физическое развитие и дисциплина' },
                                { icon: '💃', title: 'Танцы', desc: 'Координация и артистизм' },
                                { icon: '🤖', title: 'Робототехника', desc: 'STEM-образование' },
                                { icon: '🎵', title: 'Музыка', desc: 'Игра на инструментах' }
                            ].map((club, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="text-5xl mb-3">{club.icon}</div>
                                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                                        {club.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">{club.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-navy-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold font-heading mb-4">
                        Хотите увидеть школу своими глазами?
                    </h3>
                    <Link
                        href="/admissions"
                        className="inline-block bg-white text-navy-900 px-10 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Записаться на экскурсию
                    </Link>
                </div>
            </section>
        </main>
    );
}
