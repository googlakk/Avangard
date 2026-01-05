import Button from '@/components/ui/Button';

export default function CTA() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Декоративный градиент */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-10 pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                            Готовы начать <span className="gradient-text">сотрудничество</span>?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Свяжитесь с нами сегодня и узнайте, как мы можем помочь вашему бизнесу достичь
                            новых высот
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" href="/contacts">
                                Связаться с нами
                            </Button>
                            <Button variant="outline" size="lg" href="/about">
                                Узнать больше
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
