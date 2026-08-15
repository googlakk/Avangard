'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getNativeTeachers } from '@/lib/data/junior-program';
import { useLanguage } from '@/contexts/LanguageContext';

export default function JuniorFaculty() {
    const { t } = useLanguage();
    const nativeTeachers = getNativeTeachers(t);

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-14"
                >
                    <span className="inline-block font-manrope font-semibold text-xs tracking-[0.15em] uppercase text-oxford-blue/40 mb-4">
                        Faculty
                    </span>
                    <h2
                        className="font-heading font-bold text-oxford-blue leading-tight max-w-3xl"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                    >
                        {t.junior.faculty.title}
                    </h2>
                    <p className="text-base md:text-lg font-manrope text-slate-500 max-w-3xl mt-4">
                        {t.junior.faculty.subtitle}
                    </p>
                </motion.div>

                {/* Split Card Teachers — Photo TOP, Navy Body BOTTOM */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                    {nativeTeachers.map((teacher, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group rounded-[4px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-[3px]"
                        >
                            {/* Photo TOP — Clean, no text overlay */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={teacher.photo}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                />
                            </div>

                            {/* Navy Body BOTTOM */}
                            <div className="bg-[#001d3d] group-hover:bg-[#002a54] transition-colors duration-500 p-6">
                                {/* Name + Country */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-[2.5px] h-5 bg-[#00c6ff] rounded-full flex-shrink-0" />
                                    <h3 className="font-heading text-lg font-bold text-white">
                                        {teacher.name}
                                    </h3>
                                    <span className="px-2 py-0.5 bg-white/10 rounded-[4px] text-xs text-white/80 font-manrope uppercase tracking-wider">
                                        {teacher.country}
                                    </span>
                                </div>

                                {/* Subjects */}
                                <p className="text-xs font-manrope font-semibold text-[#00c6ff]/80 uppercase tracking-[0.12em] mb-3 pl-[14px]">
                                    {teacher.subjects.join(' · ')}
                                </p>

                                {/* Experience */}
                                <p className="text-xs font-manrope text-education-amber/90 font-semibold pl-[14px] mb-3">
                                    {teacher.experience}
                                </p>

                                {/* Quote — Hover Reveal */}
                                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-out">
                                    <div className="pt-3 border-t border-white/10 pl-[14px]">
                                        <p className="font-manrope italic text-sm leading-relaxed" style={{ color: 'rgba(180,200,225,0.8)' }}>
                                            &ldquo;{teacher.quote}&rdquo;
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
