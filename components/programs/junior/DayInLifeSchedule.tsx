'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ScheduleItem {
    time: string;
    activity: string;
    icon: string;
    description?: string;
    image: string;
}

interface DayScheduleProps {
    schedule: ScheduleItem[];
}

export default function DayInLifeSchedule({ schedule }: DayScheduleProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Автопереключение каждые 4 секунды
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % schedule.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [schedule.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Функция для получения 5 превью (2 слева, центр, 2 справа)
    const getVisibleSlides = () => {
        const visible = [];
        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + schedule.length) % schedule.length;
            visible.push({
                item: schedule[index],
                index: index,
                position: i
            });
        }
        return visible;
    };

    const currentItem = schedule[currentIndex];
    const visibleSlides = getVisibleSlides();

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Один день из жизни
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
                        Как проходит типичный день ученика Intellect Junior
                    </p>
                    {/* Отображаем название и описание текущей активности */}
                    <div className="max-w-2xl mx-auto mt-8">
                        <h3 className="text-2xl font-bold text-navy-900 mb-2">
                            {currentItem.activity}
                        </h3>
                        {currentItem.description && (
                            <p className="text-base text-gray-600">
                                {currentItem.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="max-w-6xl mx-auto">
                    {/* Карусель с 5 превью */}
                    <div className="flex items-end justify-center gap-3 md:gap-6 mb-8">
                        {visibleSlides.map(({ item, index, position }) => {
                            const isActive = position === 0;

                            // Размеры зависят от позиции
                            let size, rounded;
                            if (isActive) {
                                size = 'w-48 h-64 md:w-64 md:h-80'; // Центральная - самая большая
                                rounded = 'rounded-3xl';
                            } else if (Math.abs(position) === 1) {
                                size = 'w-32 h-48 md:w-40 md:h-56'; // Соседние
                                rounded = 'rounded-2xl';
                            } else {
                                size = 'w-24 h-36 md:w-32 md:h-44'; // Крайние
                                rounded = 'rounded-xl';
                            }

                            const opacity = isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80';
                            const border = isActive
                                ? 'ring-4 ring-navy-900 shadow-2xl'
                                : 'ring-2 ring-gray-200 shadow-lg';

                            return (
                                <div
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`relative ${size} ${opacity} ${border} ${rounded} overflow-hidden cursor-pointer transition-all duration-500 flex-shrink-0`}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.activity}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                    {/* Время */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <p className={`font-bold text-white text-center ${isActive ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
                                            }`}>
                                            {item.time}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Индикаторы прогресса */}
                    <div className="flex justify-center gap-2">
                        {schedule.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                        ? 'w-8 h-2 bg-navy-900'
                                        : 'w-2 h-2 bg-gray-400 hover:bg-gray-500'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
