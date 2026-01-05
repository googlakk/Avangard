'use client';

import { useCountUp } from '@/hooks/useCountUp';

export default function Hero() {
    // Анимация для чисел
    const yearCount = useCountUp({ end: 2016, duration: 2000 });
    const studentsCount = useCountUp({ end: 1000, duration: 2500 });
    const clubsCount = useCountUp({ end: 15, duration: 1500 });

    return (
        <section className="relative h-screen flex flex-col items-center justify-center">
            {/* Фоновое видео */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/Школа.mp4" type="video/mp4" />
                    {/* Fallback изображение если видео не загрузится */}
                    <img
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2831"
                        alt="School background"
                        className="w-full h-full object-cover"
                    />
                </video>
                {/* Оверлей */}
                <div className="absolute inset-0 hero-overlay" />
            </div>

            {/* Статистический блок внизу */}
            <div className="relative z-10 container mx-auto px-4 mt-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/30 px-8 md:px-16 py-10 md:py-12 rounded-t-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {/* Год основания */}
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-light font-heading text-white mb-3 tracking-wide whitespace-nowrap">
                                    SINCE {yearCount}
                                </div>
                                <div className="text-sm md:text-base text-gray-200 font-medium mb-1">
                                    Опыт и традиции
                                </div>
                                <div className="text-xs text-gray-300 font-light">
                                    Образование проверенное временем
                                </div>
                            </div>

                            {/* Количество учеников */}
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-light font-heading text-white mb-3 tracking-wide whitespace-nowrap">
                                    {studentsCount} STUDENTS
                                </div>
                                <div className="text-sm md:text-base text-gray-200 font-medium mb-1">
                                    Счастливых детей
                                </div>
                                <div className="text-xs text-gray-300 font-light">
                                    Нам доверяют самое ценное
                                </div>
                            </div>

                            {/* Кружки и секции */}
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-light font-heading text-white mb-3 tracking-wide whitespace-nowrap">
                                    {clubsCount}+ CLUBS
                                </div>
                                <div className="text-sm md:text-base text-gray-200 font-medium mb-1">
                                    Кружков и секций
                                </div>
                                <div className="text-xs text-gray-300 font-light">
                                    Спорт, творчество и IT в одном месте
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
