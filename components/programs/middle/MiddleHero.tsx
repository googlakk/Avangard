'use client';

interface MiddleHeroProps {
    title: string;
    subtitle: string;
    grade: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
}

export default function MiddleHero({
    title,
    subtitle,
    grade,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
}: MiddleHeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt={`${title} Hero Background`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                {/* Badge */}
                <div className="inline-block mb-6 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium tracking-wider">
                        {grade}
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl font-bold mb-4 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="text-2xl md:text-3xl font-light mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                    {subtitle}
                </p>

                {/* Description */}
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-200 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
                    {description}
                </p>

                {/* CTA Button */}
                <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                    <a
                        href={ctaLink}
                        className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        {ctaText}
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
