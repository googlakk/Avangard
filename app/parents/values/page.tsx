'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function ValuesPage() {
    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <Image
                    src="/api/placeholder/1920/1080"
                    alt="Ученики в библиотеке"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/60" />
                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl mb-6"
                    >
                        Вау-будущее начинается здесь
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light"
                    >
                        Мы не просто учим — мы раскрываем потенциал. Безопасная среда, где каждый ребенок — личность.
                    </motion.p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Card 1 */}
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-navy-900/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-navy-900/10 transition-colors">
                                <svg className="w-8 h-8 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-heading font-bold text-2xl mb-4 text-navy-900">Безопасность</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Закрытая территория 24/7, видеонаблюдение, собственная служба охраны. Мы создали крепость, где дети чувствуют себя свободно.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-navy-900/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-navy-900/10 transition-colors">
                                <svg className="w-8 h-8 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="font-heading font-bold text-2xl mb-4 text-navy-900">Забота и Здоровье</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Сбалансированное 3-разовое питание от шеф-повара, кабинет врача и психолог в штате. Мы заботимся о физическом и ментальном благополучии.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-navy-900/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-navy-900/10 transition-colors">
                                <svg className="w-8 h-8 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="font-heading font-bold text-2xl mb-4 text-navy-900">Академический трамплин</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Уникальные методики обучения, подготовка к международным экзаменам и победы в мировых олимпиадах.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                            <div className="text-5xl font-serif text-navy-900 font-bold mb-2">5</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500">Лет успешной работы</div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                            <div className="text-5xl font-serif text-navy-900 font-bold mb-2">~20</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500">Человек в классе</div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                            <div className="text-5xl font-serif text-navy-900 font-bold mb-2">24/7</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500">Охрана территории</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-4xl md:text-5xl text-navy-900 mb-12">Ключевые достижения</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Text List */}
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <span className="text-amber-500 text-2xl">•</span>
                                <p className="text-lg text-gray-800 font-medium">Разработали уникальные методики обучения с лучшими педагогами страны</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-amber-500 text-2xl">•</span>
                                <p className="text-lg text-gray-800 font-medium">Стали официальными представителями мировых чемпионатов по ментальной арифметике и памяти</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-amber-500 text-2xl">•</span>
                                <p className="text-lg text-gray-800 font-medium">Наши ученики покорили миллионы зрителей на Central Asia&apos;s Got Talent</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-amber-500 text-2xl">•</span>
                                <p className="text-lg text-gray-800 font-medium">Ученики с баллами IELTS 8.5 и 8.8</p>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <div className="text-amber-600 text-4xl mb-4">🏆</div>
                                <div className="text-5xl font-bold text-navy-900 mb-2">5</div>
                                <div className="font-bold text-lg mb-2">чемпионатов мира</div>
                                <div className="text-gray-500 text-sm">официальные представители</div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <div className="text-purple-600 text-4xl mb-4">👥</div>
                                <h3 className="font-bold text-xl text-navy-900 mb-2">Вундеркинды из Бишкека</h3>
                                <p className="text-gray-500 text-sm">звезды Central Asia&apos;s Got Talent</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Stars Block */}
            <section className="py-12 container mx-auto px-4">
                <div className="bg-navy-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    {/* Stars Decoration */}
                    <div className="absolute top-10 left-10 text-white/20 text-6xl">★</div>
                    <div className="absolute bottom-10 right-10 text-white/20 text-4xl">★</div>

                    <h2 className="font-display text-3xl md:text-4xl mb-6 relative z-10 font-normal">Наши звезды</h2>
                    <p className="max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed mb-8 relative z-10 opacity-90">
                        Команда “Вундеркинды из Бишкека” в составе Арсена Рахымбекова, Байэла Рахымбекова, Альбины Орозакуновой, Нурболота Исматтиллаева и Чынгыза Торобаева показала выдающиеся результаты на международных соревнованиях и телешоу.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 relative z-10">
                        {['Memoriad', 'Mental Calculation World Cup', 'World Memory Championship', "Central Asia's Got Talent"].map((tag) => (
                            <span key={tag} className="px-5 py-1.5 bg-white/20 rounded-full backdrop-blur-sm text-xs md:text-sm font-light tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-navy-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-3xl md:text-5xl mb-8">Убедитесь сами</h2>
                    <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                        Лучший способ принять решение — увидеть всё своими глазами. Приглашаем вас на индивидуальную экскурсию.
                    </p>
                    <Button href="/contacts" variant="primary" size="lg">Записаться на экскурсию</Button>
                </div>
            </section>
        </main>
    );
}
