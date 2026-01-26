import Link from 'next/link';
import { lifeInMiddleData } from '@/lib/data/middle-program';

export const metadata = {
    title: 'Жизнь в Middle — Intellect Middle | Intellect Pro',
    description:
        'Внеклассная деятельность в Intellect Middle: секции, School Parliament, Intellect Currency, истории успеха учеников.',
};

export default function LifeInMiddlePage() {
    const data = lifeInMiddleData;

    return (
        <main className="bg-white">
            {/* Back Navigation */}
            <div className="bg-gray-50 py-4">
                <div className="container mx-auto px-4">
                    <Link
                        href="/programs/middle"
                        className="inline-flex items-center gap-2 text-navy-900 hover:text-navy-800 font-semibold font-sans"
                    >
                        ← Вернуться к Intellect Middle
                    </Link>
                </div>
            </div>

            {/* Hero */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-sm uppercase tracking-wider text-navy-900/60 mb-3 font-medium">
                            {data.subtitle}
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
                            {data.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Sections & Clubs */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-10 text-center">
                            Секции и кружки
                        </h2>

                        {/* Group by category */}
                        {['Спорт', 'Интеллект', 'Искусство'].map((category) => {
                            const filtered = data.sections.filter(
                                (s) => s.category === category
                            );
                            if (filtered.length === 0) return null;

                            return (
                                <div key={category} className="mb-10">
                                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">
                                        {category}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filtered.map((section, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
                                            >
                                                <h4 className="text-lg font-bold text-gray-900 mb-2">
                                                    {section.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 font-sans">
                                                    {section.schedule}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Clubs System */}
            <section className="py-16 bg-navy-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-center">
                            🎯 {data.clubs.title}
                        </h2>
                        <p className="text-lg text-gray-200 leading-relaxed text-center font-sans">
                            {data.clubs.description}
                        </p>

                        <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-bold mb-4">
                                Примеры клубов:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="font-bold mb-2">🤖 Робототехника</h4>
                                    <p className="text-sm text-gray-300">Создание и программирование роботов</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="font-bold mb-2">💬 Дебаты</h4>
                                    <p className="text-sm text-gray-300">Развитие навыков аргументации и публичных выступлений</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="font-bold mb-2">🎨 Дизайн</h4>
                                    <p className="text-sm text-gray-300">Графический дизайн и веб-разработка</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="font-bold mb-2">🎭 Театр</h4>
                                    <p className="text-sm text-gray-300">Актерское мастерство и постановки</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Currency Stories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-10 text-center">
                            💰 Истории успеха Intellect Currency
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.currencyStories.map((story, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-2xl p-6 md:p-8 border-l-4 border-navy-900"
                                >
                                    <h3 className="text-lg font-bold text-navy-900 mb-3">
                                        {story.student}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed font-sans">
                                        {story.achievement}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Info Box */}
                        <div className="mt-10 bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-2xl p-6 md:p-8 text-center">
                            <p className="text-lg font-sans">
                                Каждый ученик получает{' '}
                                <strong className="text-2xl">Intellect Currency</strong> за:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <div>
                                    <div className="text-3xl mb-2">📚</div>
                                    <p className="text-sm">Академические успехи</p>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">🏆</div>
                                    <p className="text-sm">Участие в олимпиадах</p>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">🤝</div>
                                    <p className="text-sm">Помощь одноклассникам</p>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">🎨</div>
                                    <p className="text-sm">Творческие проекты</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                            Приходите на экскурсию и увидьте школу изнутри
                        </h2>
                        <p className="text-gray-700 mb-8 font-sans">
                            Пообщайтесь с учениками, увидите секции и парламент в действии
                        </p>
                        <Link
                            href="/admissions"
                            className="inline-block px-8 py-4 bg-navy-900 text-white rounded-full text-lg font-semibold hover:bg-navy-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-sans"
                        >
                            Записаться на экскурсию
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
