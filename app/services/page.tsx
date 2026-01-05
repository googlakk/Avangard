import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Услуги | Ваша Компания',
    description: 'Ознакомьтесь с полным спектром наших профессиональных услуг',
};

const services = [
    {
        title: 'Веб-разработка',
        description:
            'Создание современных, быстрых и адаптивных веб-сайтов и веб-приложений с использованием передовых технологий.',
        icon: '💻',
    },
    {
        title: 'Мобильная разработка',
        description:
            'Разработка нативных и кроссплатформенных мобильных приложений для iOS и Android.',
        icon: '📱',
    },
    {
        title: 'UI/UX Дизайн',
        description:
            'Создание привлекательных и интуитивно понятных пользовательских интерфейсов для любых платформ.',
        icon: '🎨',
    },
    {
        title: 'Консалтинг',
        description:
            'Профессиональные консультации по цифровой трансформации и оптимизации бизнес-процессов.',
        icon: '📊',
    },
    {
        title: 'SEO и Маркетинг',
        description:
            'Продвижение вашего бизнеса в интернете, увеличение видимости и привлечение клиентов.',
        icon: '🚀',
    },
    {
        title: 'Техническая поддержка',
        description:
            'Круглосуточная поддержка и обслуживание ваших цифровых продуктов и сервисов.',
        icon: '🛠️',
    },
];

export default function ServicesPage() {
    return (
        <div className="pt-24 px-4">
            {/* Hero секция */}
            <section className="max-w-7xl mx-auto py-20 text-center">
                <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">
                    Наши <span className="gradient-text">услуги</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Предлагаем полный спектр профессиональных услуг для развития вашего бизнеса в
                    цифровой среде
                </p>
            </section>

            {/* Услуги */}
            <section className="max-w-7xl mx-auto py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Card key={index} {...service} />
                    ))}
                </div>
            </section>

            {/* Процесс работы */}
            <section className="max-w-7xl mx-auto py-20">
                <h2 className="font-heading font-bold text-4xl text-center mb-12">
                    Как мы <span className="gradient-text">работаем</span>
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { step: '01', title: 'Консультация', desc: 'Обсуждаем ваши потребности' },
                        { step: '02', title: 'Планирование', desc: 'Разрабатываем стратегию' },
                        { step: '03', title: 'Реализация', desc: 'Воплощаем проект в жизнь' },
                        { step: '04', title: 'Поддержка', desc: 'Обеспечиваем сопровождение' },
                    ].map((item, index) => (
                        <div key={index} className="glass rounded-xl p-6 text-center">
                            <div className="font-heading font-bold text-4xl gradient-text mb-3">
                                {item.step}
                            </div>
                            <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto py-20">
                <div className="glass rounded-3xl p-12 text-center">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                        Готовы начать проект?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Свяжитесь с нами, чтобы обсудить ваш проект и получить предложение
                    </p>
                    <Button size="lg" href="/contacts">
                        Связаться с нами
                    </Button>
                </div>
            </section>
        </div>
    );
}
