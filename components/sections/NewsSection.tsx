import Link from 'next/link';

// Философия образования
const philosophy = [
    {
        id: 1,
        title: 'Память и Внимание',
        description: 'От памяти напрямую зависит успеваемость. Ребенку будет легко быть собранным и сфокусированным.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
    },
    {
        id: 2,
        title: 'Критическое мышление',
        description: 'Ребенок будет способен рассматривать вещи с разных сторон. Улучшаем способность принимать творческие решения.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
    },
    {
        id: 3,
        title: 'Геймификация',
        description: 'Увлекательный сюжет, мотивационно-игровые механики и вознаграждения. Ребенок никогда не заскучает у нас в школе.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
    },
];

export default function PhilosophySection() {
    return (
        <section className="py-16 bg-navy-900">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
                        Наша философия
                    </h2>
                </div>

                {/* Сетка */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {philosophy.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl overflow-hidden hover-lift"
                        >
                            {/* Изображение */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Текст */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold font-heading text-navy-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
