'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
        sports: t.junior.gallery.filters.sports,
    };

    const filteredImages = activeCategory === 'all'
        ? images
        : images.filter((img) => img.category === activeCategory);

    return (
        <section className="py-20 md:py-28 bg-[#f5f5f7]">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <span className="inline-block font-manrope font-semibold text-xs tracking-[0.15em] uppercase text-oxford-blue/40 mb-4">
                        Gallery
                    </span>
                    <h2
                        className="font-heading font-bold text-oxford-blue leading-tight max-w-3xl"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                    >
                        {t.junior.gallery.title}
                    </h2>
                    <p className="text-base md:text-lg font-manrope text-slate-500 max-w-2xl mt-4">
                        {t.junior.gallery.subtitle}
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-5 py-2 rounded-[4px] text-xs font-manrope font-bold tracking-wider uppercase transition-all duration-300 ${
                            activeCategory === 'all'
                                ? 'bg-oxford-blue text-white shadow-md'
                                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        {t.junior.gallery.filters.all}
                    </button>
                    {Object.entries(categories).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`px-5 py-2 rounded-[4px] text-xs font-manrope font-bold tracking-wider uppercase transition-all duration-300 ${
                                activeCategory === key
                                    ? 'bg-oxford-blue text-white shadow-md'
                                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Infrastructure Tile Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={`${image.src}-${index}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative aspect-[4/3] rounded-[4px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                style={{
                                    filter: 'brightness(0.85) contrast(1.1) saturate(0.8)',
                                }}
                            />
                            {/* Hover Overlay with Label — fades in from bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001d3d]/90 via-[#001d3d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                                    <p className="text-white text-sm font-manrope font-medium">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty state */}
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
