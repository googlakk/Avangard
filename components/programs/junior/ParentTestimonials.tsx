'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';

interface Testimonial {
    parentName: string;
    childName: string;
    childGrade: string;
    photo?: string;
    quote: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function ParentTestimonials({ testimonials }: TestimonialsProps) {
    const { language } = useLanguage();
    const ui = getJuniorContent(language).ui.testimonials;

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-14"
                >
                    <span className="inline-block font-manrope font-semibold text-xs tracking-[0.15em] uppercase text-oxford-blue/40 mb-4">
                        {language === 'ru' ? 'Отзывы' : 'Testimonials'}
                    </span>
                    <h2
                        className="font-heading font-bold text-oxford-blue leading-tight max-w-3xl"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                    >
                        {ui.title}
                    </h2>
                    <p className="text-base md:text-lg font-manrope text-slate-500 max-w-2xl mt-4">
                        {ui.subtitle}
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#f5f5f7] rounded-[4px] p-7 md:p-8 hover:shadow-lg transition-all duration-500 group cursor-pointer hover:-translate-y-[3px]"
                        >
                            {/* Editorial Quote Marks */}
                            <div className="text-oxford-blue/10 font-lora text-7xl leading-none mb-3 select-none">
                                «
                            </div>

                            {/* Quote */}
                            <p className="font-lora text-base md:text-lg text-oxford-blue/80 leading-relaxed mb-8 italic">
                                {testimonial.quote}
                            </p>

                            {/* Author — Gold accent line above */}
                            <div className="pt-5 border-t-2 border-education-amber/30">
                                <div className="flex items-center gap-4">
                                    {testimonial.photo && (
                                        <div className="relative w-11 h-11 rounded-[4px] overflow-hidden flex-shrink-0">
                                            <Image
                                                src={testimonial.photo}
                                                alt={testimonial.parentName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-heading font-bold text-sm text-oxford-blue">
                                            {testimonial.parentName}
                                        </p>
                                        <p className="text-xs text-slate-400 font-manrope">
                                            {ui.parentLabel} {testimonial.childName}, {testimonial.childGrade}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
