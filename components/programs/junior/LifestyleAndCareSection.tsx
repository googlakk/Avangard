'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { JUNIOR_LIFESTYLE_CARD_BACKGROUNDS, LifestyleCareFeature } from '@/lib/data/junior-program';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';

interface LifestyleAndCareSectionProps {
    features: LifestyleCareFeature[];
    photoProof: {
        images: { src: string; caption: string }[];
        message: string;
    };
}

export default function LifestyleAndCareSection({ features, photoProof }: LifestyleAndCareSectionProps) {
    const { language } = useLanguage();
    const ui = getJuniorContent(language).ui;

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-14"
                >
                    <span className="inline-block font-manrope font-semibold text-xs tracking-[0.15em] uppercase text-oxford-blue/40 mb-4">
                        {language === 'ru' ? 'Для родителей' : 'For Parents'}
                    </span>
                    <h2
                        className="font-heading font-bold text-oxford-blue leading-tight max-w-3xl"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                    >
                        {ui.lifestyleIntro.title}
                    </h2>
                    <p className="text-base md:text-lg font-manrope text-slate-500 max-w-2xl mt-4">
                        {ui.lifestyleIntro.subtitle}
                    </p>
                </motion.div>

                {/* Split Card Grid — Photo TOP, Navy Body BOTTOM */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex flex-col h-full rounded-[4px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-[3px]"
                        >
                            {/* Photo TOP — clean, no filters */}
                            <div className="relative h-52 md:h-56 shrink-0 overflow-hidden">
                                <Image
                                    src={feature.backgroundImage || JUNIOR_LIFESTYLE_CARD_BACKGROUNDS[index] || JUNIOR_LIFESTYLE_CARD_BACKGROUNDS[0]}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Navy Body BOTTOM */}
                            <div className="flex flex-col flex-grow bg-[#001d3d] group-hover:bg-[#002a54] transition-colors duration-500 p-6 md:p-7">
                                {/* Icon */}
                                <div className="mb-4 text-white/70">
                                    <IconWrapper icon={feature.icon} variant="white" size="sm" />
                                </div>

                                {/* Title with accent line */}
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-[2.5px] h-6 bg-[#00c6ff] rounded-full flex-shrink-0 mt-1" />
                                    <h3 className="font-heading text-lg md:text-xl font-bold text-white leading-tight">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Subtitle */}
                                <p className="text-xs font-manrope font-semibold text-[#00c6ff] uppercase tracking-[0.12em] mb-4 pl-[14px]">
                                    {feature.subtitle}
                                </p>

                                {/* Description */}
                                <ul className="space-y-2 pl-[14px]">
                                    {feature.description.map((item, idx) => (
                                        <li key={idx} className="font-manrope flex items-start leading-relaxed text-sm" style={{ color: 'rgba(180,200,225,0.85)' }}>
                                            <span className="text-education-amber mr-2 flex-shrink-0 text-xs mt-1">●</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Benefit Badge */}
                                {feature.benefit && (
                                    <div className="mt-auto pt-4 border-t border-white/10 pl-[14px]">
                                        <span className="inline-flex items-center gap-2 text-xs font-bold text-oxford-blue bg-education-amber px-3 py-1.5 rounded-[4px] font-manrope">
                                            {feature.benefit}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CMS proof block */}
                {(photoProof?.images?.length > 0 || photoProof?.message) && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {photoProof.images?.slice(0, 2).map((item, idx) => (
                                <div key={`lifestyle-proof-${idx}`} className="relative h-48 rounded-[4px] overflow-hidden border border-slate-200">
                                    <Image
                                        src={item.src}
                                        alt={item.caption || `Proof image ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        style={{ filter: 'brightness(0.85) contrast(1.1) saturate(0.8)' }}
                                    />
                                    {item.caption && (
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                            <p className="text-xs md:text-sm text-white font-manrope">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {photoProof.message && (
                            <div className="mt-3 rounded-[4px] bg-[#f5f5f7] border border-slate-200 px-5 py-4">
                                <p className="text-sm md:text-base font-manrope text-slate-600">{photoProof.message}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
