'use client';

import Image from 'next/image';

interface HeadMessageProps {
    name: string;
    position: string;
    photo: string;
    videoUrl?: string | null;
    quote: string;
}

export default function HeadOfJuniorMessage({ name, position, photo, videoUrl, quote }: HeadMessageProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                        {/* Фото главы школы */}
                        <div className="md:col-span-2">
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={photo}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Текст */}
                        <div className="md:col-span-3">
                            {/* Имя и должность */}
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                                    {name}
                                </h2>
                                <p className="text-sm uppercase tracking-wide text-navy-600 font-medium">
                                    {position}
                                </p>
                            </div>

                            {/* Цитата */}
                            <blockquote className="relative">
                                <svg
                                    className="absolute -top-4 -left-2 w-10 h-10 text-navy-200 opacity-50"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed pl-6 italic">
                                    {quote}
                                </p>
                            </blockquote>

                            {/* Видео (если есть) */}
                            {videoUrl && (
                                <div className="mt-6">
                                    <a
                                        href={videoUrl}
                                        className="inline-flex items-center text-navy-900 font-medium hover:text-navy-700 transition-colors"
                                    >
                                        <svg
                                            className="w-6 h-6 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                        </svg>
                                        Смотреть видео-приветствие
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
