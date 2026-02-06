'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function AdmissionPage() {
    const STEPS = [
        {
            number: '01',
            title: 'Консультация',
            text: 'Вы можете связаться с нами, и мы будем рады ответить на все ваши вопросы. Первый шаг к знакомству со школой.'
        },
        {
            number: '02',
            title: 'Тестирование',
            text: 'Предметы: Русский язык, Английский язык и Математика. Это помогает нам определить уровень знаний ребенка.'
        },
        {
            number: '03',
            title: 'Заключение контракта',
            text: 'После успешного прохождения тестирования необходимо заключить договор на обучение в нашей школе.'
        },
        {
            number: '04',
            title: 'Подать документы',
            text: 'Личное дело ребенка, копия свидетельства о рождении, копии паспортов родителей.'
        },
        {
            number: '05',
            title: 'Предоставить справки',
            text: 'Медицинские справки №026 и №063, справка о месте жительства и фотография 3х4.'
        },
        {
            number: '06',
            title: 'Зачисление',
            text: 'Добро пожаловать в Intellect International School! Вы получаете доступ к личному кабинету.'
        }
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/api/placeholder/1920/1080"
                    alt="Процесс поступления"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/80" />
                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl mb-6"
                    >
                        Процесс поступления
                    </motion.h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        Прозрачный и понятный путь к качественному образованию.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {STEPS.map((step, index) => (
                            <div key={index} className="relative p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow bg-white group">
                                <div className="text-6xl font-display font-bold text-navy-900/10 mb-6 group-hover:text-navy-900/20 transition-colors">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-bold font-heading text-navy-900 mb-4 h-16 flex items-end pb-2">
                                    {step.title}
                                </h3>
                                <div className="h-1 w-12 bg-amber-500 mb-6 group-hover:w-20 transition-all" />
                                <p className="text-gray-600 leading-relaxed">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Checklist */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl p-10 shadow-lg">
                        <h2 className="text-3xl font-bold font-display text-center mb-10 text-navy-900">Необходимые документы</h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            {[
                                'Личное дело учащегося',
                                'Копия свидетельства о рождении',
                                'Копии паспортов родителей (ИИН)',
                                'Адресная справка',
                                'Медицинская карта (Форма №026)',
                                'Паспорт здоровья (Форма №063)',
                                'Фотографии 3х4 (2 шт)',
                                'Табель успеваемости (при переводе)'
                            ].map((doc, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">{doc}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Button href="/contacts" size="lg" className="w-full md:w-auto">
                                Связаться с приемной комиссией
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
