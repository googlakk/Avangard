'use client';

import Image from 'next/image';
import { nativeTeachers } from '@/lib/data/junior-program';
import { useLanguage } from '@/contexts/LanguageContext';

export default function JuniorFaculty() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-lora text-oxford-blue mb-4">
                        Преподаватели-носители языка
                    </h2>
                    <p className="text-lg md:text-xl font-manrope text-slate-600 max-w-3xl mx-auto">
                        Они не просто учат языку, они на нем живут
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {nativeTeachers.map((teacher, index) => (
                        <div key={index} className="group relative rounded-[32px] overflow-hidden shadow-lg h-[450px]">
                            {/* Photo */}
                            <Image
                                src={teacher.photo}
                                alt={teacher.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay (always visible at bottom) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue/90 via-oxford-blue/20 to-transparent"></div>

                            {/* Info (Name, Country, Subject) */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl font-lora font-bold text-white">
                                        {teacher.name}
                                    </span>
                                    {/* Country Flag or badge */}
                                    <span className="px-2 py-1 bg-white/20 rounded text-xs text-white font-manrope uppercase tracking-wider backdrop-blur-sm">
                                        {teacher.country}
                                    </span>
                                </div>

                                <p className="text-electric-blue font-bold font-manrope text-sm uppercase tracking-widest mb-4">
                                    {teacher.subjects.join(" • ")}
                                </p>

                                {/* Quote Reveal on Hover */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-t border-white/20 pt-4 mt-4">
                                    <p className="text-slate-200 font-manrope italic leading-relaxed text-sm">
                                        &ldquo;{teacher.quote}&rdquo;
                                    </p>
                                    <p className="text-education-amber text-xs font-bold mt-2">
                                        {teacher.experience}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
