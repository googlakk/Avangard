'use client';

import Image from 'next/image';
import { LifestyleCareFeature } from '@/lib/data/junior-program';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';

interface LifestyleAndCareSectionProps {
    features: LifestyleCareFeature[];
    photoProof: {
        images: { src: string; caption: string }[];
        message: string;
    };
}

// Background images for each card
const cardBackgrounds = [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200', // Study Club - teacher with student
    'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200', // No Backpacks - school lockers
    'https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1200', // Healthy Food - kitchen/food prep
    'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200'  // Security - monitoring/security
];

export default function LifestyleAndCareSection({ features, photoProof }: LifestyleAndCareSectionProps) {
    const { t } = useLanguage();

    // Custom positioning for asymmetric layout - 3 columns, 2 rows, all 4 cards visible
    const cardPositions = [
        'md:col-span-2 md:row-span-1', // Study Club - wide, top-left
        'md:col-span-1 md:row-span-2', // No Backpacks - tall, right side  
        'md:col-span-1 md:row-span-1', // Healthy Food - bottom-left
        'md:col-span-1 md:row-span-1'  // Security - bottom-center
    ];

    return (
        <section className="py-12 bg-slate-50 min-h-screen flex items-center">
            <div className="container mx-auto px-4 w-full">
                {/* Заголовок секции */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-lora text-oxford-blue mb-3">
                        Почему мы?
                    </h2>
                    <p className="text-base md:text-lg font-manrope text-slate-600 max-w-3xl mx-auto">
                        Школа остается в школе. Вечер — для семьи
                    </p>
                </div>

                {/* Asymmetric Grid Layout - 3 columns, 2 rows, all 4 cards fit */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 max-w-7xl mx-auto h-[calc(100vh-280px)] max-h-[600px]">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-[24px] shadow-lg hover:shadow-2xl transition-all duration-500 ${cardPositions[index]}`}
                        >
                            {/* Background Image */}
                            <Image
                                src={cardBackgrounds[index]}
                                alt={feature.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue/95 via-oxford-blue/60 to-oxford-blue/20 group-hover:from-oxford-blue/98 group-hover:via-oxford-blue/80 transition-all duration-500"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                {/* Top: Icon & Title (Always Visible) */}
                                <div>
                                    <div className="w-12 h-12 mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                        <IconWrapper icon={feature.icon} variant="white" size="md" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold font-lora text-white mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs font-bold text-electric-blue uppercase tracking-widest font-manrope">
                                        {feature.subtitle}
                                    </p>
                                </div>

                                {/* Bottom: Description (Hover Only) */}
                                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <ul className="space-y-2">
                                        {feature.description.map((item, idx) => (
                                            <li key={idx} className="text-white font-manrope flex items-start leading-relaxed">
                                                <span className="text-education-amber mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs md:text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Benefit Badge */}
                                    {feature.benefit && (
                                        <div className="mt-4 pt-3 border-t border-white/20">
                                            <span className="inline-flex items-center gap-2 text-xs font-bold text-oxford-blue bg-education-amber px-3 py-1.5 rounded-full font-manrope">
                                                ⭐ {feature.benefit}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
