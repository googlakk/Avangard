'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';

export default function PhilosophyIntroSection() {
    const { t, language } = useLanguage();
    const ui = getJuniorContent(language).ui;

    const formatText = (text: string) => {
        const html = text
            .replace(/<bold>/g, '<span class="font-bold text-oxford-blue">')
            .replace(/<\/bold>/g, '</span>');
        return { __html: html };
    };

    const items = [
        { icon: '01', ...t.junior.philosophy.stats.neuroplasticity },
        { icon: '02', ...t.junior.philosophy.stats.standards },
        { icon: '03', ...t.junior.philosophy.stats.love }
    ];

    return (
        <section className="py-24 bg-[#f5f5f7] relative overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(10,36,99,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(10,36,99,0.3) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Photo */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative rounded-[4px] overflow-hidden shadow-2xl"
                        >
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src="/images/цитата.jpg"
                                    alt="Intellect Junior Philosophy"
                                    fill
                                    className="object-cover"
                                    style={{
                                        filter: 'brightness(0.85) contrast(1.1) saturate(0.8)',
                                    }}
                                />
                                {/* Bottom overlay for quote */}
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue/70 via-transparent to-transparent" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-[4px] border border-white/15">
                                        <p className="font-lora italic text-base md:text-lg text-white text-center leading-relaxed">
                                            &ldquo;{ui.philosophyQuote}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Kicker */}
                            <span className="inline-block font-manrope font-semibold text-xs tracking-[0.15em] uppercase text-oxford-blue/50 mb-4">
                                {language === 'ru' ? 'Наша философия' : 'Our Philosophy'}
                            </span>

                            <h2
                                className="font-heading font-bold text-oxford-blue mb-8 leading-tight"
                                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                            >
                                {t.junior.philosophy.title}
                            </h2>

                            <div className="space-y-5 mb-10">
                                <p className="font-manrope text-base md:text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={formatText(t.junior.philosophy.intro.p1)} />
                                <p className="font-manrope text-base md:text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={formatText(t.junior.philosophy.intro.p2)} />
                            </div>

                            {/* Numbered List with accent line */}
                            <div className="space-y-0">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="flex gap-5 group py-5 border-b border-slate-200/60 last:border-b-0 cursor-pointer"
                                    >
                                        <div className="flex-shrink-0 relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#00c6ff] rounded-full" />
                                            <div className="pl-5 font-heading font-bold text-lg text-oxford-blue/30 group-hover:text-oxford-blue/60 transition-colors duration-300">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-lg font-bold text-oxford-blue mb-1 group-hover:text-electric-blue transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="font-manrope text-sm text-slate-500 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
