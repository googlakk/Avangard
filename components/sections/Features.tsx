import Card from '@/components/ui/Card';
import { FEATURES } from '@/lib/constants';

export default function Features() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                        Почему выбирают <span className="gradient-text">нас</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Мы предлагаем комплексные решения для развития вашего бизнеса
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, index) => (
                        <Card
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
