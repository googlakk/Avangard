import { CognitiveFoundationFeature } from '@/lib/data/junior-program';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';

interface CognitiveFoundationSectionProps {
    features: CognitiveFoundationFeature[];
}

export default function CognitiveFoundationSection({ features }: CognitiveFoundationSectionProps) {
    const { t } = useLanguage();

    return (
        <section className="py-10 bg-oxford-blue relative overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Tech Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-education-amber/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Заголовок секции */}
                <div className="text-center mb-8">
                    <span className="inline-block px-4 py-2 bg-electric-blue/20 border border-electric-blue/40 rounded-full text-electric-blue text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                        Hard Skills
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-lora text-white mb-6">
                        {t.junior.cognitive.intro.title}
                    </h2>
                    <p className="text-lg md:text-xl font-manrope text-slate-300 max-w-3xl mx-auto">
                        {t.junior.cognitive.intro.subtitle}
                    </p>
                </div>

                {/* Сетка с фичами - 3 колонки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-white/5 backdrop-blur-md rounded-[24px] p-6 transition-all duration-300 group hover:bg-white/10 hover:-translate-y-2 border border-white/10 overflow-hidden"
                        >
                            {/* Glow on hover */}
                            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shimmer_1s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Иконка и Статистика */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <IconWrapper icon={feature.icon} variant="white" size="md" />
                                </div>
                                {feature.stats && (
                                    <span className="text-4xl font-manrope font-bold text-education-amber">
                                        {feature.stats}
                                    </span>
                                )}
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-2xl font-bold font-lora text-white mb-2">
                                {feature.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-xs font-bold text-electric-blue uppercase tracking-widest mb-4 font-manrope">
                                {feature.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-2 mb-4">
                                {feature.description.map((item: string, idx: number) => (
                                    <li key={idx} className="text-slate-300 font-manrope flex items-start text-sm leading-relaxed">
                                        <span className="text-education-amber mr-2 flex-shrink-0">➜</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Хайлайт бейдж если есть */}
                            {feature.highlight && (
                                <div className="mt-auto pt-6 border-t border-white/10">
                                    <span className="inline-flex items-center gap-2 text-xs font-bold text-oxford-blue bg-education-amber px-4 py-2 rounded-full font-manrope">
                                        ⭐ {feature.highlight}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
