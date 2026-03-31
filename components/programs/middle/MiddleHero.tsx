import Image from 'next/image';
import Link from 'next/link';

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
        <section className="relative overflow-hidden bg-white pt-32 pb-20">
            {/* Warm soft radial background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.08),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.05),_transparent_35%)]" />
            
            <div className="relative container mx-auto px-4 lg:px-8">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        <div className="mb-6 inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 opacity-0 animate-[fadeInDown_0.8s_ease-out_forwards]">
                            {grade}
                        </div>
                        
                        <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-navy-900 md:text-5xl lg:text-6xl opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
                            {title}
                        </h1>
                        
                        <p className="mb-4 text-xl font-serif font-medium text-amber-600 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
                            {subtitle}
                        </p>
                        
                        <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                            {description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                            <Link 
                                href={ctaLink} 
                                className="inline-flex h-14 items-center justify-center rounded-full bg-amber-500 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {ctaText}
                            </Link>

                            <Link 
                                href="#curriculum" 
                                className="inline-flex h-14 items-center justify-center rounded-full bg-gray-50 px-8 text-base font-semibold text-navy-900 shadow-sm ring-1 ring-inset ring-gray-200 transition-all hover:bg-gray-100 hover:shadow-md"
                            >
                                Расписание
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-gray-900/5">
                            <Image
                                src={backgroundImage || "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000"}
                                alt="Middle School Students"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        
                        {/* Floating Feature Card */}
                        <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5 animate-[bounce_4s_infinite_ease-in-out]">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-navy-900">10+</div>
                                    <div className="text-sm font-medium text-gray-500">Секций и клубов</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
