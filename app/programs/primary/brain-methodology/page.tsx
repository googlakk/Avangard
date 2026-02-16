import Image from 'next/image';
import Link from 'next/link';
import { brainMethodologyContent } from '@/lib/data/junior-program';

export const metadata = {
    title: 'Методика развития мозга | Intellect Junior',
    description: 'Научный подход к когнитивному развитию детей 6-10 лет: ментальная арифметика, сингапурская математика, спорт-стекинг. Evidence-based education.',
};

export default function BrainMethodologyPage() {
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
                        {brainMethodologyContent.title}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl">
                        {brainMethodologyContent.description}
                    </p>
                </div>
            </section>

            {/* Почему возраст 6-10 лет критичен */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
                            Почему возраст 6-10 лет — «золотое окно»?
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            В этот период мозг ребенка обладает максимальной нейропластичностью —
                            способностью создавать новые нейронные связи в 2-3 раза быстрее, чем в более позднем возрасте.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-5xl font-ibm-plex-serif font-bold text-navy-900 mb-2">
                                        2-3x
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Быстрее создаются нейронные связи
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-ibm-plex-serif font-bold text-navy-900 mb-2">
                                        700
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Новых связей в секунду формируется
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-ibm-plex-serif font-bold text-navy-900 mb-2">
                                        90%
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Мозга развивается до 10 лет
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Методики */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-12">
                        {brainMethodologyContent.methods.map((method, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start mb-6">
                                    <div className="bg-navy-900 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-2xl font-bold font-heading text-gray-900">
                                            {method.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-navy-900 mb-2">
                                            🔧 Как работает?
                                        </h4>
                                        <p className="text-gray-700">
                                            {method.how}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-navy-900 mb-2">
                                            💡 Зачем это нужно?
                                        </h4>
                                        <p className="text-gray-700">
                                            {method.why}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-navy-900 mb-2">
                                            📊 Научные доказательства
                                        </h4>
                                        <p className="text-gray-700">
                                            {method.evidence}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Инфографика - упрощенная текстовая версия */}
            <section className="py-16 bg-navy-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
                            Как нейроны создают связи
                        </h2>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                            <div className="space-y-6 text-left">
                                <div className="flex items-start">
                                    <div className="bg-white text-navy-900 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                                        1
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-200">
                                            <strong className="text-white">Новый опыт</strong> → Ребенок видит задачу на доске
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-white text-navy-900 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                                        2
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-200">
                                            <strong className="text-white">Активация нейронов</strong> → Мозг начинает обрабатывать информацию
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-white text-navy-900 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                                        3
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-200">
                                            <strong className="text-white">Повторение</strong> → Практика укрепляет связи (ментальная арифметика 3 раза в неделю)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-white text-navy-900 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                                        ✓
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-200">
                                            <strong className="text-white">Результат</strong> → Устойчивый навык: быстрый счет, лучшая память, выше концентрация
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                        Готовы развивать мозг вашего ребенка?
                    </h3>
                    <Link
                        href="/admissions"
                        className="inline-block bg-navy-900 text-white px-10 py-4 rounded-full text-base font-bold hover:bg-navy-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Записаться на экскурсию
                    </Link>
                </div>
            </section>
        </main>
    );
}
