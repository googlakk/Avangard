import { motion } from 'framer-motion';
import Image from 'next/image';
import { MotivationCultureFeature } from '@/lib/data/junior-program';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';

interface MotivationAtmosphereSectionProps {
    features: MotivationCultureFeature[];
    photoProof?: {
        image: string;
        caption: string;
    };
}

export default function MotivationAtmosphereSection({ features, photoProof }: MotivationAtmosphereSectionProps) {
    const { t, language } = useLanguage();
    const ui = getJuniorContent(language).ui;

    return (
        <section className="py-20 md:py-28 bg-[#f5f5f7]">
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
                        {language === 'ru' ? 'Soft Skills' : 'Soft Skills'}
                    </span>
                    <h2
                        className="font-heading font-bold text-oxford-blue leading-tight max-w-3xl"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                    >
                        {t.junior.motivation.intro.title}
                    </h2>
                    <p className="text-base md:text-lg font-manrope text-slate-500 max-w-3xl mt-4">
                        {t.junior.motivation.intro.subtitle}
                    </p>
                </motion.div>

                {/* Feature Cards — 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col h-full bg-white rounded-[4px] p-7 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 group border border-slate-100 hover:border-education-amber/30 cursor-pointer hover:-translate-y-[3px]"
                        >
                            {/* Icon */}
                            <div className="mb-5 transform group-hover:scale-105 transition-transform duration-300">
                                <div className="inline-flex w-14 h-14 rounded-[4px] bg-education-amber/10 items-center justify-center text-education-amber overflow-hidden">
                                    <IconWrapper icon={feature.icon} variant="junior" size="sm" className="!bg-transparent !text-inherit !w-auto !h-auto" hoverable={false} />
                                </div>
                            </div>

                            {/* Title with accent line */}
                            <div className="flex items-start gap-3 mb-2">
                                <div className="w-[2.5px] h-5 bg-education-amber rounded-full flex-shrink-0 mt-1" />
                                <h3 className="font-heading text-xl font-bold text-oxford-blue leading-tight">
                                    {feature.title}
                                </h3>
                            </div>

                            {/* Subtitle */}
                            <p className="text-xs font-manrope font-semibold text-education-amber uppercase tracking-[0.12em] mb-5 pl-[14px]">
                                {feature.subtitle}
                            </p>

                            {/* Description */}
                            <ul className="space-y-2.5 mb-5 pl-[14px]">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="text-slate-500 font-manrope flex items-start leading-relaxed text-sm">
                                        <span className="text-education-amber mr-2 flex-shrink-0 text-xs mt-0.5">→</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Example / How it Works — Editorial Treatment */}
                            {feature.example && (
                                <div className="mt-auto pt-5 border-t border-slate-100 pl-[14px]">
                                    <div className="border-l-2 border-education-amber/40 pl-4 py-2">
                                        <p className="text-xs text-slate-400 font-manrope font-bold uppercase tracking-wider mb-1.5">{ui.motivationExampleLabel}</p>
                                        <p className="text-sm font-manrope text-oxford-blue/80 italic leading-relaxed">
                                            &ldquo;{feature.example}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Photo Proof Block */}
                {photoProof?.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-[4px] p-8 md:p-10 shadow-md border border-slate-100 relative overflow-hidden">
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-center text-oxford-blue mb-8">
                                {t.junior.motivation.photoProof.title}
                            </h3>

                            <div className="relative h-[350px] md:h-[400px] rounded-[4px] overflow-hidden shadow-lg group">
                                <Image
                                    src={photoProof.image}
                                    alt={photoProof.caption}
                                    fill
                                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                    style={{ filter: 'brightness(0.85) contrast(1.1) saturate(0.8)' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                <p className="absolute bottom-5 left-0 right-0 text-center text-white/90 font-manrope italic text-base px-4">
                                    {photoProof.caption}
                                </p>
                            </div>

                            <p className="text-center text-lg font-heading font-bold text-oxford-blue mt-6 flex items-center justify-center gap-2">
                                <span className="text-education-amber">→</span> {t.junior.motivation.photoProof.cta}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
