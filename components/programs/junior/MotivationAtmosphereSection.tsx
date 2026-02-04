import Image from 'next/image';
import { MotivationCultureFeature } from '@/lib/data/junior-program';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';

interface MotivationAtmosphereSectionProps {
    features: MotivationCultureFeature[];
    photoProof: {
        image: string;
        caption: string;
    };
}

export default function MotivationAtmosphereSection({ features, photoProof }: MotivationAtmosphereSectionProps) {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-amber-50/50">
            <div className="container mx-auto px-4">
                {/* Заголовок секции */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-lora text-oxford-blue mb-4">
                        {t.junior.motivation.intro.title}
                    </h2>
                    <p className="text-lg md:text-xl font-manrope text-slate-600 max-w-3xl mx-auto">
                        {t.junior.motivation.intro.subtitle}
                    </p>
                </div>

                {/* Сетка с фичами - 3 колонки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 group border border-slate-100 hover:border-education-amber/30 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 group-hover:bg-amber-100 transition-colors"></div>

                            {/* Иконка */}
                            <div className="mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-education-amber/10 flex items-center justify-center text-education-amber">
                                    <IconWrapper icon={feature.icon} variant="junior" size="md" />
                                </div>
                            </div>

                            {/* Заголовок */}
                            <h3 className="text-2xl font-bold font-lora text-oxford-blue mb-2">
                                {feature.title}
                            </h3>

                            {/* Подзаголовок */}
                            <p className="text-xs font-bold text-education-amber uppercase tracking-widest mb-4 font-manrope">
                                {feature.subtitle}
                            </p>

                            {/* Описание */}
                            <ul className="space-y-3 mb-6">
                                {feature.description.map((item, idx) => (
                                    <li key={idx} className="text-slate-600 font-manrope flex items-start leading-relaxed">
                                        <span className="text-education-amber mr-2 flex-shrink-0">➜</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Пример / Валюта */}
                            {feature.example && (
                                <div className="mt-auto pt-6 border-t border-slate-100">
                                    <div className="bg-gradient-to-r from-amber-50 to-white p-4 rounded-xl border border-amber-100 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-education-amber flex items-center justify-center shadow-lg text-white font-bold text-lg border-2 border-white ring-2 ring-amber-100">
                                            $
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Concept</p>
                                            <p className="text-sm font-manrope text-oxford-blue font-medium italic">
                                                &ldquo;{feature.example}&rdquo;
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Photo Proof */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                        {/* Golden Coin Decoration */}
                        <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-education-amber to-amber-600 opacity-10 blur-xl"></div>

                        <h3 className="text-2xl font-bold font-lora text-center text-oxford-blue mb-10">
                            {t.junior.motivation.photoProof.title}
                        </h3>

                        <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 shadow-lg group">
                            <Image
                                src={photoProof.image}
                                alt={photoProof.caption}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <p className="absolute bottom-6 left-0 right-0 text-center text-white/90 font-manrope italic text-lg px-4">
                                {photoProof.caption}
                            </p>
                        </div>

                        <p className="text-center text-xl font-bold font-lora text-oxford-blue mt-6 flex items-center justify-center gap-2">
                            <span className="text-education-amber">➜</span> {t.junior.motivation.photoProof.cta}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
