'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';

interface GalleryImage {
    src: string;
    alt: string;
    category: 'classroom' | 'playzone' | 'cafeteria' | 'sports';
}

interface PhotoGalleryProps {
    images: GalleryImage[];
}

export default function JuniorPhotoGallery({ images }: PhotoGalleryProps) {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = {
        classroom: t.junior.gallery.filters.classroom,
        playzone: t.junior.gallery.filters.playzone,
        cafeteria: t.junior.gallery.filters.cafeteria,
        sports: t.junior.gallery.filters.sports
    };

    const filteredImages = activeCategory === 'all'
        ? images
        : images.filter(img => img.category === activeCategory);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-lora font-bold text-oxford-blue mb-4">
                        {t.junior.gallery.title}
                    </h2>
                    <p className="text-lg md:text-xl font-manrope text-slate-600 max-w-2xl mx-auto">
                        {t.junior.gallery.subtitle}
                    </p>
                </div>

                {/* Фильтры */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-8 py-3 rounded-full text-sm font-bold font-manrope transition-all duration-300 ${activeCategory === 'all'
                            ? 'bg-oxford-blue text-white shadow-lg scale-105'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {t.junior.gallery.filters.all}
                    </button>
                    {Object.entries(categories).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`px-8 py-3 rounded-full text-sm font-bold font-manrope transition-all duration-300 ${activeCategory === key
                                ? 'bg-oxford-blue text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Сетка изображений */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredImages.map((image, index) => (
                        <div
                            key={index}
                            className="group relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Overlay на hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-white text-lg font-lora font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Пустое состояние */}
                {filteredImages.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-manrope text-lg">
                            {t.junior.gallery.empty}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
