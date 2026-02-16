import Image from 'next/image';
import Link from 'next/link';
import { nativeTeachers } from '@/lib/data/junior-program';

export const metadata = {
    title: 'Английская среда с Native Speakers | Intellect Junior',
    description: 'Обучение с носителями языка из США, Великобритании и Канады. Co-Teaching: два учителя в классе. Почему важно слышать правильный акцент с 6 лет.',
};

export default function EnglishEnvironmentPage() {
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
                        Английская среда с Native Speakers
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl">
                        Обучение с носителями языка — не привилегия, а ежедневная реальность в Intellect Junior
                    </p>
                </div>
            </section>

            {/* Почему Native Speakers важны */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-12">
                            Почему важно слышать носителя с 6 лет?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="text-4xl mb-3">👂</div>
                                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                    Правильное произношение
                                </h3>
                                <p className="text-gray-700">
                                    До 10 лет мозг ребенка способен различать и воспроизводить звуки любого языка.
                                    После этого возраста формируется «акцент родного языка».
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="text-4xl mb-3">💬</div>
                                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                    Живая речь, не учебник
                                </h3>
                                <p className="text-gray-700">
                                    Носители языка используют естественные фразы, интонации и жесты.
                                    Это не просто грамматика — это культура и мышление на английском.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="text-4xl mb-3">🎯</div>
                                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                    Снятие языкового барьера
                                </h3>
                                <p className="text-gray-700">
                                    Когда ребенок с первого класса общается с иностранцами,
                                    английский перестает быть «страшным предметом» — он становится инструментом общения.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="text-4xl mb-3">🌍</div>
                                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                    Подготовка к будущему
                                </h3>
                                <p className="text-gray-700 leading-relaxed font-sans">
                                    Все сотрудники проходят проверку и имеют профильное образование.
                                    Мы создаем атмосферу, где каждый взрослый — это &ldquo;безопасный человек&rdquo;
                                    для ребенка.
                                </p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Co-Teaching объяснение */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-12">
                            Как работает Co-Teaching?
                        </h2>

                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold font-heading text-navy-900 mb-4">
                                        Два учителя в классе
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-navy-900 mr-2 flex-shrink-0 font-bold">1.</span>
                                            <span className="text-gray-700">
                                                <strong>Основной учитель</strong> — ведет урок на русском/английском
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-navy-900 mr-2 flex-shrink-0 font-bold">2.</span>
                                            <span className="text-gray-700">
                                                <strong>Native Speaker</strong> — присутствует на уроке, помогает с произношением и общением
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-navy-900 mr-2 flex-shrink-0 font-bold">3.</span>
                                            <span className="text-gray-700">
                                                Дети слышат английский <strong>не только на уроке английского</strong>,
                                                но и на уроках Math, Science
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-navy-900 mr-2 flex-shrink-0 font-bold">4.</span>
                                            <span className="text-gray-700">
                                                На переменах и обедах дети общаются с ассистентами-носителями
                                                в неформальной обстановке
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-navy-900 text-white rounded-2xl p-6">
                                    <h4 className="text-xl font-bold mb-4">📊 Результаты погружения</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-3xl font-ibm-plex-serif font-bold">8-10</div>
                                            <p className="text-sm text-gray-300">часов английского в неделю</p>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-ibm-plex-serif font-bold">100%</div>
                                            <p className="text-sm text-gray-300">выпускников владеют английским на уровне B1-B2 к 4 классу</p>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-ibm-plex-serif font-bold">3</div>
                                            <p className="text-sm text-gray-300">носителя языка в штате Junior School</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Команда Native Teachers */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-12">
                            Познакомьтесь с нашей командой
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {nativeTeachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Фото */}
                                    <div className="relative h-80">
                                        <Image
                                            src={teacher.photo}
                                            alt={teacher.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Информация */}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold font-heading text-gray-900 mb-1">
                                            {teacher.name}
                                        </h3>
                                        <p className="text-navy-900 font-medium mb-2">
                                            {teacher.country}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {teacher.experience}
                                        </p>

                                        {/* Предметы */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {teacher.subjects.map((subject, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Цитата */}
                                        <blockquote className="border-l-4 border-navy-900 pl-4 italic text-gray-700 text-sm">
                                            &ldquo;{teacher.quote}&rdquo;
                                        </blockquote>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Фото-примеры взаимодействия */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8">
                            📸 Английский в действии
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1000",
                                    caption: "Чтение на пуфиках с Miss Sarah"
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
                                    caption: "Science эксперимент с Mr. James"
                                }
                            ].map((photo, idx) => (
                                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                    <div className="relative h-64">
                                        <Image
                                            src={photo.src}
                                            alt={photo.caption}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-700 italic">{photo.caption}</p>
                                    </div>
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
                        Приходите познакомиться с нашей командой!
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
