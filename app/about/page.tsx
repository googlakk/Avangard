import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
    title: 'О компании | Ваша Компания',
    description: 'Узнайте больше о нашей компании, миссии, видении и команде профессионалов',
};

export default function AboutPage() {
    return (
        <div className="pt-24 px-4">
            {/* Hero секция */}
            <section className="max-w-7xl mx-auto py-20 text-center">
                <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">
                    О <span className="gradient-text">нашей компании</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Мы — команда профессионалов, которая стремится создавать инновационные решения для
                    развития вашего бизнеса
                </p>
            </section>

            {/* Миссия и Видение */}
            <section className="max-w-7xl mx-auto py-20">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card
                        title="Наша Миссия"
                        description="Помогать бизнесу расти и развиваться, предоставляя качественные и инновационные решения, которые отвечают потребностям современного рынка."
                        icon="🎯"
                    />
                    <Card
                        title="Наше Видение"
                        description="Стать ведущей компанией в области цифровых решений, признанной за качество, инновации и клиентоориентированный подход."
                        icon="🔭"
                    />
                </div>
            </section>

            {/* Ценности */}
            <section className="max-w-7xl mx-auto py-20">
                <h2 className="font-heading font-bold text-4xl text-center mb-12">
                    Наши <span className="gradient-text">ценности</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Качество',
                            description: 'Мы гарантируем высокое качество всех наших услуг и продуктов',
                            icon: '⭐',
                        },
                        {
                            title: 'Инновации',
                            description: 'Постоянно внедряем новые технологии и подходы',
                            icon: '💡',
                        },
                        {
                            title: 'Клиентоориентированность',
                            description: 'Наши клиенты — в центре всего, что мы делаем',
                            icon: '❤️',
                        },
                    ].map((value, index) => (
                        <Card key={index} {...value} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto py-20">
                <div className="glass rounded-3xl p-12 text-center">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                        Хотите узнать больше?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Свяжитесь с нами, и мы расскажем подробнее о нашей работе
                    </p>
                    <Button size="lg" href="/contacts">
                        Связаться с нами
                    </Button>
                </div>
            </section>
        </div>
    );
}
