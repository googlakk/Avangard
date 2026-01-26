import Link from 'next/link';
import { itSteamDetailData } from '@/lib/data/middle-program';

export const metadata = {
    title: 'IT & STEAM — Intellect Middle | Intellect Pro',
    description:
        'Программа IT и STEAM в Intellect Middle: технологическое оснащение, проекты учеников, робототехника, программирование на Python.',
};

export default function ITSteamPage() {
    const data = itSteamDetailData;

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
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
                            {data.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Infrastructure */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-10 text-center">
                            {data.infrastructure.title}
                        </h2>

                        <div className="bg-navy-900 text-white rounded-3xl p-8 md:p-12">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.infrastructure.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="text-2xl">✓</span>
                                        <span className="text-lg font-sans">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Projects */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-10 text-center">
                            Проекты учеников
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
                                >
                                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-navy-900 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed font-sans">
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Info Box */}
                        <div className="mt-12 bg-white border-2 border-navy-900 rounded-2xl p-6 md:p-8">
                            <p className="text-gray-700 leading-relaxed font-sans text-center">
                                <strong className="text-navy-900">Каждый ученик</strong> создает как минимум{' '}
                                <strong className="text-navy-900">3 проекта в год</strong>, которые
                                презентуются на школьной конференции и добавляются в портфолио.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
                            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-6 text-center">
                                💡 Почему IT — это обязательная часть программы?
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed font-sans">
                                <p>
                                    В XXI веке цифровая грамотность — не опция, а базовый навык. Мы не
                                    просто учим детей «пользоваться компьютером», мы учим их{' '}
                                    <strong>создавать технологии</strong>.
                                </p>
                                <p>
                                    Программирование развивает логическое мышление, умение решать
                                    комплексные задачи и работать с абстрактными концепциями —
                                    те же навыки, что необходимы и в математике, и в науках.
                                </p>
                                <p>
                                    <strong className="text-navy-900">
                                        Искусственный интеллект
                                    </strong>{' '}
                                    мы рассматриваем как инструмент усиления интеллекта, а не замену
                                    мышлению. Ученики учатся работать с AI-ассистентами для ускорения
                                    обучения и творчества.
                                </p>
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
                            Запишитесь на экскурсию в IT-лабораторию
                        </h2>
                        <p className="text-gray-700 mb-8 font-sans">
                            Приходите и посмотрите, как работают наши ученики
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
