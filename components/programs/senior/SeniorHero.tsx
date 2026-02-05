import Image from 'next/image';
import Link from 'next/link';

interface SeniorHeroProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    trustBadges?: Array<{ icon: string; text: string }>;
}

export default function SeniorHero({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage,
}: SeniorHeroProps) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image — Right-positioned students */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover object-right-top"
                    priority
                />

                {/* Layer 1: Vertical depth gradient — continues from header */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(
                            180deg,
                            rgba(15,34,58,0.96) 0%,
                            rgba(15,34,58,0.92) 15%,
                            rgba(15,34,58,0.82) 30%,
                            rgba(15,34,58,0.65) 45%,
                            rgba(15,34,58,0.40) 60%,
                            rgba(15,34,58,0.18) 75%,
                            rgba(15,34,58,0.06) 90%,
                            rgba(15,34,58,0.02) 100%
                        )`
                    }}
                />

                {/* Layer 2: Left readability gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(
                            90deg,
                            rgba(15,34,58,0.88) 0%,
                            rgba(15,34,58,0.65) 35%,
                            rgba(15,34,58,0.25) 65%,
                            transparent 85%
                        )`
                    }}
                />

                {/* Layer 3: Warm academic gold glow */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(
                            circle at 75% 25%,
                            rgba(198,169,107,0.16) 0%,
                            rgba(198,169,107,0.06) 30%,
                            transparent 60%
                        )`,
                        mixBlendMode: 'soft-light'
                    }}
                />

                {/* Layer 4: Subtle noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Content Container — Left aligned with luxury spacing */}
            <div className="container mx-auto relative z-10 pt-28 pb-20 pl-8 md:pl-16 lg:pl-24 xl:pl-32 pr-4">
                <div className="max-w-[560px]">
                    {/* Kicker Text */}
                    <p
                        className="mb-6 font-serif text-lg tracking-[0.03em] opacity-0 animate-[fadeInDown_0.8s_ease-out_0.2s_forwards]"
                        style={{ color: 'rgba(198,169,107,0.9)' }}
                    >
                        {subtitle}
                    </p>

                    {/* Main Headline */}
                    <h1
                        className="mb-8 font-display opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]"
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 500,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                            color: 'rgba(255,255,255,0.98)'
                        }}
                    >
                        {title}
                    </h1>

                    {/* Description */}
                    <p
                        className="mb-10 text-lg leading-relaxed max-w-md opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]"
                        style={{
                            color: 'rgba(255,255,255,0.85)',
                            letterSpacing: '0.01em'
                        }}
                    >
                        {description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mb-14 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                        {/* Primary Button — Soft Gold */}
                        <Link
                            href={ctaLink}
                            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold tracking-[0.01em] transition-all duration-300 transform hover:-translate-y-[1px]"
                            style={{
                                background: 'linear-gradient(135deg, #C6A96B 0%, #D4B87A 50%, #C6A96B 100%)',
                                color: '#0F223A',
                                boxShadow: '0 4px 16px rgba(198,169,107,0.3), 0 1px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            {ctaText}
                        </Link>

                        {/* Secondary Button — Transparent Outline */}
                        <Link
                            href="#curriculum"
                            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[15px] font-medium tracking-[0.01em] transition-all duration-300 hover:bg-white/[0.06]"
                            style={{
                                background: 'rgba(15,34,58,0.3)',
                                backdropFilter: 'blur(4px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'rgba(255,255,255,0.95)',
                            }}
                        >
                            Программа обучения
                        </Link>
                    </div>

                    {/* Bottom Badges — IB SAT IELTS */}
                    <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]">
                        {/* Thin Divider Line */}
                        <div
                            className="w-24 h-px mb-5"
                            style={{ background: 'rgba(255,255,255,0.15)' }}
                        />

                        {/* Badge Text */}
                        <p
                            className="font-serif text-base tracking-[0.2em]"
                            style={{ color: 'rgba(255,255,255,0.55)' }}
                        >
                            IB • SAT • IELTS
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
