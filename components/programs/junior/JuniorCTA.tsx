import Link from 'next/link';

export default function JuniorCTA() {
    return (
        <section className="py-24 bg-oxford-blue relative overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Заголовок */}
                <h2 className="text-4xl md:text-5xl font-lora font-bold text-white mb-6">
                    Готовы дать своему ребенку лучший старт?
                </h2>

                {/* Подзаголовок */}
                <p className="text-lg md:text-xl font-manrope text-blue-100 mb-12 max-w-2xl mx-auto">
                    Запишитесь на индивидуальную экскурсию по школе и познакомьтесь с нашей командой
                </p>

                {/* Кнопки */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href="/admissions"
                        className="inline-block bg-white text-oxford-blue px-10 py-5 rounded-full text-lg font-manrope font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Записаться на экскурсию
                    </Link>
                    <Link
                        href="/downloads/junior-brochure.pdf"
                        className="inline-block bg-transparent border border-white text-white px-10 py-5 rounded-full text-lg font-manrope font-bold hover:bg-white hover:text-oxford-blue transition-all duration-300"
                    >
                        Скачать брошюру
                    </Link>
                </div>
            </div>
        </section>
    );
}
