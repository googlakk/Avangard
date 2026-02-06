'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import LifestyleAndCareSection from '@/components/programs/junior/LifestyleAndCareSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLifestyleCareFeatures, getLifestyleCarePhotoProof } from '@/lib/data/junior-program';

export default function ValuesPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/middle-entrance-group.png"
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

            {/* Why Us Section - From Junior */}
            <LifestyleAndCareSection
                features={getLifestyleCareFeatures(t)}
                photoProof={getLifestyleCarePhotoProof(t)}
            />


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
