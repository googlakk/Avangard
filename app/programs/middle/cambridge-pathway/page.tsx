import Link from 'next/link';
import { cambridgePathwayDetailData } from '@/lib/data/middle-program';

export const metadata = {
    title: 'Cambridge Pathway — Intellect Middle | Intellect Pro',
    description:
        'Подробная информация о Cambridge Pathway для 5-9 классов: переход на английский в точных науках, второй иностранный язык, международная сертификация.',
};

export default function CambridgePathwayPage() {
    const data = cambridgePathwayDetailData;

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

            {/* Subjects Detail */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-10 text-center">
                            Предметы на английском языке
                        </h2>

                        <div className="space-y-8">
                            {data.subjects.map((subject, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-2xl p-6 md:p-8"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                                        <h3 className="text-2xl font-bold font-heading text-gray-900 flex-1">
                                            {subject.name}
                                        </h3>
                                        <span className="inline-block text-sm font-semibold text-navy-900 bg-white px-3 py-1 rounded-full">
                                            {subject.grade}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4 font-sans">
                                        {subject.description}
                                    </p>
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-sm text-gray-600 font-semibold mb-2">
                                            Учебники:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 font-sans">
                                            {subject.textbooks.map((book, i) => (
                                                <li key={i}>{book}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Language */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm">
                            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4">
                                {data.secondLanguage.title}
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-6 font-sans">
                                {data.secondLanguage.description}
                            </p>
                            <div className="flex gap-4">
                                {data.secondLanguage.options.map((lang, i) => (
                                    <span
                                        key={i}
                                        className="px-6 py-3 bg-navy-900 text-white rounded-full font-semibold"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academic Pathway */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-10 text-center">
                            Академический путь
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.pathway.map((stage, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 border-2 border-gray-200 relative hover:border-navy-900 transition-colors"
                                >
                                    {/* Stage Number */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-navy-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                        {index + 1}
                                    </div>

                                    <h4 className="text-sm uppercase tracking-wider text-gray-600 mb-2 font-medium">
                                        {stage.grade}
                                    </h4>
                                    <h5 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                        {stage.stage}
                                    </h5>
                                    <p className="text-gray-700 leading-relaxed font-sans">
                                        {stage.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                            Готовы начать обучение по Cambridge Pathway?
                        </h2>
                        <Link
                            href="/admissions"
                            className="inline-block px-8 py-4 bg-navy-900 text-white rounded-full text-lg font-semibold hover:bg-navy-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-sans"
                        >
                            Записаться на тестирование
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
