'use client';

import Image from 'next/image';

interface Testimonial {
    parentName: string;
    childName: string;
    childGrade: string;
    photo?: string;
    quote: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function ParentTestimonials({ testimonials }: TestimonialsProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Отзывы родителей
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Что говорят семьи наших учеников
                    </p>
                </div>

                {/* Сетка отзывов */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                        >
                            {/* Кавычки */}
                            <svg
                                className="w-12 h-12 text-navy-200 mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            {/* Цитата */}
                            <p className="text-gray-700 leading-relaxed mb-6 italic">
                                &quot;{testimonial.quote}&quot;
                            </p>

                            {/* Автор */}
                            <div className="flex items-center pt-6 border-t border-gray-200">
                                {testimonial.photo && (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                                        <Image
                                            src={testimonial.photo}
                                            alt={testimonial.parentName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-gray-900">
                                        {testimonial.parentName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Родитель {testimonial.childName}, {testimonial.childGrade}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
