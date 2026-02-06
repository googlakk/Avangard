'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
    {
        question: "Какой размер классов в школе?",
        answer: "Мы придерживаемся принципа комфортного обучения. Средняя наполняемость классов — около 20 человек. Это позволяет учителю уделить внимание каждому ребенку и выстроить индивидуальную траекторию обучения."
    },

    {
        question: "Как организовано питание?",
        answer: "Мы предоставляем сбалансированное 3-разовое питание (завтрак, обед, полдник). Меню составляется с учетом возрастных потребностей, есть возможность диетического стола по медицинским показаниям."
    },
    {
        question: "Есть ли развозка/трансфер?",
        answer: "Да, школа предоставляет услуги трансфера. Маршруты составляются в зависимости от места проживания учеников. Транспорт оснащен ремнями безопасности, детей сопровождает взрослый."
    },
    {
        question: "Обязательна ли школьная форма?",
        answer: "Да, в школе принят деловой стиль одежды и фирменная форма с логотипом школы для парадных мероприятий. Это дисциплинирует и создает чувство общности."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/api/placeholder/1920/1080"
                    alt="Вопросы и ответы"
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
                        Вопросы и ответы
                    </motion.h1>
                </div>
            </section>

            {/* Accordion Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="space-y-4">
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <div className="p-6 flex justify-between items-center">
                                    <h3 className="font-heading font-bold text-lg text-navy-900 pr-8">{faq.question}</h3>
                                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-amber-100' : ''}`}>
                                        <svg className={`w-4 h-4 ${openIndex === index ? 'text-amber-600' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
