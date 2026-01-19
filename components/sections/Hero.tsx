'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function Hero() {
    const { t } = useLanguage();

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
                    <Image
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2831"
                        alt="School background"
                        fill
                        className="object-cover"
                    />
                </video>
                {/* Оверлей */}
                <div className="absolute inset-0 hero-overlay" />
            </div>

            {/* Статистический блок внизу */}
            <div className="relative z-10 container mx-auto px-4 mt-auto mb-0">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-xl border border-white px-4 md:px-16 py-5 md:py-10 rounded-t-[2.5rem]">
                        {/* Мобильная версия: SINCE 2016 сверху, два блока в ряд снизу */}
                        <div className="flex flex-col gap-4 md:hidden" style={{ maxHeight: '35vh' }}>
                            {/* Год основания */}
                            <div className="text-center py-2">
                                <div className="flex flex-col items-center mb-2">
                                    <div className="text-4xl font-semibold font-[family-name:var(--font-ibm-plex-serif)] text-white tracking-tight">
                                        {yearCount}
                                    </div>
                                    <div className="text-2xl font-semibold font-[family-name:var(--font-cormorant)] text-white tracking-wider">
                                        {t.hero.since}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-200 font-medium mb-0.5">
                                    {t.hero.experience}
                                </div>
                                <div className="text-[10px] text-gray-300 font-light">
                                    {t.hero.experienceDesc}
                                </div>
                            </div>



                            {/* Студенты и кружки в одном ряду */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Количество учеников */}
                                <div className="text-center py-2">
                                    <div className="flex flex-col items-center mb-2">
                                        <div className="text-4xl font-semibold font-[family-name:var(--font-ibm-plex-serif)] text-white tracking-tight">
                                            {studentsCount}+
                                        </div>
                                        <div className="text-2xl font-semibold font-[family-name:var(--font-cormorant)] text-white tracking-wider">
                                            {t.hero.students}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-200 font-medium mb-0.5">
                                        {t.hero.happyChildren}
                                    </div>
                                    <div className="text-[10px] text-gray-300 font-light">
                                        {t.hero.happyChildrenDesc}
                                    </div>
                                </div>

                                {/* Кружки и секции */}
                                <div className="text-center py-2">
                                    <div className="flex flex-col items-center mb-2">
                                        <div className="text-4xl font-semibold font-[family-name:var(--font-ibm-plex-serif)] text-white tracking-tight">
                                            {clubsCount}+
                                        </div>
                                        <div className="text-2xl font-semibold font-[family-name:var(--font-cormorant)] text-white tracking-wider">
                                            {t.hero.clubs}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-200 font-medium mb-0.5">
                                        {t.hero.clubsAndSections}
                                    </div>
                                    <div className="text-[10px] text-gray-300 font-light">
                                        {t.hero.clubsAndSectionsDesc}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Десктопная версия: все три блока в один ряд */}
                        <div className="hidden md:grid md:grid-cols-3 md:gap-12">
                            {/* Год основания */}
                            <div className="text-center">
                                <div className="flex flex-col items-center mb-3">
                                    <div className="text-5xl font-bold font-[family-name:var(--font-ibm-plex-serif)] text-white tracking-tight">
                                        {yearCount}
                                    </div>
                                    <div className="text-3xl mt-2 font-semibold font-[family-name:var(--font-cormorant)] text-white tracking-wider">
                                        {t.hero.since}
                                    </div>
                                </div>
                                <div className="text-base text-gray-200 font-medium mb-1">
                                    {t.hero.experience}
                                </div>
                                <div className="text-xs text-gray-300 font-light">
                                    {t.hero.experienceDesc}
                                </div>
                            </div>

                            {/* Количество учеников */}
                            <div className="text-center">
                                <div className="flex flex-col items-center mb-3">
                                    <div className="text-5xl font-bold font-[family-name:var(--font-ibm-plex-serif)] text-white tracking-tight">
                                        {studentsCount}+
                                    </div>
                                    <div className="text-3xl mt-2 font-semibold font-[family-name:var(--font-cormorant)] text-white tracking-wider">
                                        {t.hero.students}
                                    </div>
                                </div>
                                <div className="text-base text-gray-200 font-medium mb-1">
                                    {t.hero.happyChildren}
                                </div>
                                <div className="text-xs text-gray-300 font-light">
                                    {t.hero.happyChildrenDesc}
                                </div>
                            </div>

                            {/* Кружки и секции */}
                            <div className="text-center">
                                <div className="flex flex-col items-center mb-3">
                                    <div className="text-5xl font-bold font-[family-name:var(--font-ibm-plex-serif)] text-white tracking-tight">
                                        {clubsCount}+
                                    </div>
                                    <div className="text-3xl mt-2 font-semibold font-[family-name:var(--font-cormorant)] text-white tracking-wider">
                                        {t.hero.clubs}
                                    </div>
                                </div>
                                <div className="text-base text-gray-200 font-medium mb-1">
                                    {t.hero.clubsAndSections}
                                </div>
                                <div className="text-xs text-gray-300 font-light">
                                    {t.hero.clubsAndSectionsDesc}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
