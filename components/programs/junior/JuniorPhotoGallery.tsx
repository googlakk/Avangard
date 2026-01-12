'use client';

import Image from 'next/image';
import { useState } from 'react';

interface GalleryImage {
    src: string;
    alt: string;
    category: 'classroom' | 'playzone' | 'cafeteria' | 'sports';
}

interface PhotoGalleryProps {
    images: GalleryImage[];
}

const categories = {
    classroom: 'Классы',
    playzone: 'Игровые зоны',
    cafeteria: 'Столовая',
    sports: 'Спорт'
};

export default function JuniorPhotoGallery({ images }: PhotoGalleryProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const filteredImages = activeCategory === 'all'
        ? images
        : images.filter(img => img.category === activeCategory);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Наша школа
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Познакомьтесь с современными классами, игровыми зонами и комфортной инфраструктурой
                    </p>
                </div>

                {/* Фильтры */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all'
                                ? 'bg-navy-900 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Все
                    </button>
                    {Object.entries(categories).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === key
                                    ? 'bg-navy-900 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Сетка изображений */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredImages.map((image, index) => (
                        <div
                            key={index}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Overlay на hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm font-medium">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Пустое состояние */}
                {filteredImages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            Фотографии в этой категории скоро появятся
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
