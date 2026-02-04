'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PhilosophyIntroSection() {
    const { t } = useLanguage();

    const formatText = (text: string) => {
        const html = text
            .replace(/<bold>/g, '<span class="font-bold text-oxford-blue">')
            .replace(/<\/bold>/g, '</span>');
        return { __html: html };
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-education-amber/5 blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-electric-blue/5 blur-[120px]"></div>
                <svg className="absolute top-20 right-20 w-64 h-64 text-slate-200/50" viewBox="0 0 200 200">
                    <path fill="currentColor" d="M45.7,28.3C58.9,38.1,76.3,46.8,85.5,60.2C94.7,73.6,95.7,91.7,86.9,104.9C78,118.1,59.3,126.4,43.2,128.5C27,130.6,13.4,126.5,-1.9,119.2C-17.3,111.9,-34.4,101.4,-44.6,86.4C-54.8,71.4,-58,51.9,-53.4,36.5C-48.8,21.1,-36.4,9.8,-24.8,1.2C-13.2,-7.4,-2.4,-13.3,12.3,-8.6C26.9,-3.9,46.3,11.5,45.7,28.3Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Component Image */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl z-10"
                        >
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src="/images/junior/philosophy-main.jpg"
                                    alt="Intellect Junior Philosophy"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue/50 to-transparent"></div>

                                <div className="absolute bottom-6 left-6 right-6 text-white bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                    <p className="font-lora italic text-lg text-center">&ldquo;Every child is a genius awaiting discovery&rdquo;</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Graphic Element */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-education-amber rounded-full blur-[80px] -z-10"></div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-electric-blue rounded-full blur-[80px] -z-10"></div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-lora text-4xl md:text-5xl font-bold text-oxford-blue mb-8 leading-tight">
                                {t.junior.philosophy.title}
                            </h2>

                            <div className="space-y-6 mb-10">
                                <p className="font-manrope text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={formatText(t.junior.philosophy.intro.p1)} />
                                <p className="font-manrope text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={formatText(t.junior.philosophy.intro.p2)} />
                            </div>

                            {/* Numbered List / Stats */}
                            <div className="space-y-6">
                                {[
                                    { icon: '01', ...t.junior.philosophy.stats.neuroplasticity },
                                    { icon: '02', ...t.junior.philosophy.stats.standards },
                                    { icon: '03', ...t.junior.philosophy.stats.love }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                        className="flex gap-6 group hover:bg-white hover:shadow-lg p-4 rounded-2xl transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-oxford-blue text-education-amber font-lora font-bold text-xl flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-lora text-xl font-bold text-oxford-blue mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="font-manrope text-slate-600">
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
