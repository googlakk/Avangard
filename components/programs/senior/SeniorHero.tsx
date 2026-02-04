import { IconWrapper } from '@/lib/icon-wrapper';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/lib/icons';

interface SeniorHeroProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    trustBadges: Array<{ icon: string; text: string }>;
}

export default function SeniorHero({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
    trustBadges
}: SeniorHeroProps) {
    return (
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
            {/* Фоновое изображение */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Темный градиент для читаемости */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-900/80"></div>
            </div>

            {/* Контент */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                {/* Подзаголовок */}
                <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-300 mb-4 font-medium opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                    {subtitle}
                </p>

                {/* Главный заголовок */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-ibm-plex-serif font-bold text-white mb-10 max-w-5xl mx-auto leading-tight opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                    {title}
                </h1>

                {/* Описание */}
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                    {description}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards]">
                    {trustBadges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full"
                        >
                            <IconWrapper icon={badge.icon} variant="white" size="sm" />
                            <span className="text-sm md:text-base text-white font-medium">
                                {badge.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA кнопка */}
                <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
                    <Link
                        href={ctaLink}
                        className="inline-block bg-white text-navy-900 px-10 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        {ctaText}
                    </Link>
                </div>
            </div>

            {/* Декоративная волна снизу */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
