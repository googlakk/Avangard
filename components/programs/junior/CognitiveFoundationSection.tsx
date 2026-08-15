import { motion } from 'framer-motion';
import { CognitiveFoundationFeature } from '@/lib/data/junior-program';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { getJuniorContent } from '@/lib/content/junior-content';

interface CognitiveFoundationSectionProps {
    features: CognitiveFoundationFeature[];
}

export default function CognitiveFoundationSection({ features }: CognitiveFoundationSectionProps) {
    const { t, language } = useLanguage();
    const ui = getJuniorContent(language).ui;

    return (
        <section className="py-20 md:py-28 bg-[#0A2463] relative overflow-hidden">
            {/* Tech Background Grid */}
            <div
                className="absolute inset-0 z-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Glow orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00c6ff]/15 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-education-amber/8 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-14"
                >
                    <span className="inline-block px-4 py-1.5 bg-[#00c6ff]/15 border border-[#00c6ff]/30 rounded-[4px] text-[#00c6ff] text-xs font-manrope font-bold tracking-[0.15em] uppercase mb-6 backdrop-blur-sm">
                        {ui.cognitiveBadge}
                    </span>
                    <h2
                        className="font-heading font-bold text-white leading-tight max-w-3xl"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                    >
                        {t.junior.cognitive.intro.title}
                    </h2>
                    <p className="text-base md:text-lg font-manrope text-slate-300/80 max-w-3xl mt-4">
                        {t.junior.cognitive.intro.subtitle}
                    </p>
                </motion.div>

                {/* Feature Cards — 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex flex-col h-full bg-white/[0.04] rounded-[4px] p-6 md:p-7 transition-all duration-500 group hover:bg-white/[0.08] hover:-translate-y-[3px] border border-white/[0.08] cursor-pointer"
                        >
                            {/* Icon + Stats Row */}
                            <div className="flex justify-between items-start mb-5">
                                <div className="p-3 bg-white/[0.06] rounded-[4px] border border-white/[0.08] group-hover:scale-105 transition-transform duration-300">
                                    <IconWrapper icon={feature.icon} variant="white" size="md" />
                                </div>
                                {feature.stats && (
                                    <span className="font-heading font-bold text-3xl md:text-4xl text-[#00c6ff] tracking-tight">
                                        {feature.stats}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <div className="flex items-start gap-3 mb-2">
                                <div className="w-[2.5px] h-5 bg-[#00c6ff] rounded-full flex-shrink-0 mt-1" />
                                <h3 className="font-heading text-xl font-bold text-white leading-tight">
                                    {feature.title}
                                </h3>
                            </div>

                            {/* Subtitle */}
                            <p className="text-xs font-manrope font-semibold text-[#00c6ff]/80 uppercase tracking-[0.12em] mb-5 pl-[14px]">
                                {feature.subtitle}
                            </p>

                            {/* Description */}
                            <ul className="space-y-2.5 mb-5 pl-[14px]">
                                {feature.description.map((item: string, idx: number) => (
                                    <li key={idx} className="font-manrope flex items-start text-sm leading-relaxed" style={{ color: 'rgba(180,200,225,0.8)' }}>
                                        <span className="text-[#00c6ff] mr-2 flex-shrink-0 text-xs mt-0.5">→</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Highlight Badge */}
                            {feature.highlight && (
                                <div className="mt-auto pt-5 border-t border-white/[0.08] pl-[14px]">
                                    <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0A2463] bg-education-amber px-3 py-1.5 rounded-[4px] font-manrope">
                                        {feature.highlight}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
