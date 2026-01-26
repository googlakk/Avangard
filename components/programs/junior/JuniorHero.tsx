import Link from 'next/link';
import Image from 'next/image';

interface JuniorHeroProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    photoProof?: {
        image: string;
        caption: string;
    };
}

export default function JuniorHero({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
    photoProof
}: JuniorHeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-32">
            {/* Фоновое изображение */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Темный оверлей для читаемости текста */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/70"></div>
            </div>

            {/* Контент */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                {/* Подзаголовок */}
                <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-300 mb-4 font-medium opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                    {subtitle}
                </p>

                {/* Главный заголовок */}
                <h1 className="text-4xl md:text-6xl font-ibm-plex-serif font-bold text-white mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                    {title}
                </h1>

                {/* Описание */}
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                    {description}
                </p>

                {/* CTA кнопка */}
                <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
                    <Link
                        href={ctaLink}
                        className="inline-block bg-white text-navy-900 px-10 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        {ctaText}
                    </Link>
                </div>

                {/* Photo Proof - если есть */}
                {photoProof && (
                    <div className="mt-12 max-w-4xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                            <div className="relative h-64 md:h-80">
                                <Image
                                    src={photoProof.image}
                                    alt={photoProof.caption}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 bg-white/5">
                                <p className="text-sm text-gray-200 text-center italic">
                                    📸 {photoProof.caption}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Декоративный элемент - волна снизу */}
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
