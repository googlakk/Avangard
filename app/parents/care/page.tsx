'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CarePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/рисует жуниор.png"
                    alt="Безопасность и забота"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/70" />
                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl mb-6"
                    >
                        Забота о самом главном
                    </motion.h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        Здоровье, безопасность и психологический комфорт вашего ребенка — фундамент для его успехов.
                    </p>
                </div>
            </section>

            {/* Security Block */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/api/placeholder/800/600"
                                alt="Пост охраны"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <div className="inline-block bg-navy-100 text-navy-900 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">Безопасность</div>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">Территория под защитой</h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                Мы уделяем безопасности максимальное внимание. Школа находится на закрытой охраняемой территории, доступ куда возможен только по пропускам.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Круглосуточное видеонаблюдение по периметру',
                                    'Пропускная система с контролем доступа',
                                    'Собственная профессиональная служба охраны',
                                    'Тревожные кнопки во всех классах'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Health Block (Reversed) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/api/placeholder/800/600"
                                alt="Медицинский кабинет"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">Здоровье</div>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">Медицина и Психология</h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                В школе постоянно находится квалифицированный медицинский персонал. Мы не просто реагируем на жалобы, но и проводим регулярные профилактические осмотры.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Педиатр и медсестра полного дня',
                                    'Ежегодная диспансеризация',
                                    'Штатный психолог для поддержки учеников',
                                    'Комната сенсорной разгрузки'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
