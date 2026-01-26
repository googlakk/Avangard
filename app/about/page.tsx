import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'О нас | Intellect School',
    description: 'Узнайте больше об Intellect School - ведущей образовательной организации Казахстана',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-navy-900">
            {/* Hero Section */}
            <section className="relative bg-navy-900 text-white pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
                            ЭКОСИСТЕМА РАЗВИТИЯ
                        </p>
                        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                            О НАС
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                            Intellect School — ведущая образовательная организация Казахстана,
                            предоставляющая качественные образовательные услуги с 2016 года
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
                            <div className="font-ibm-plex-serif text-4xl md:text-5xl font-bold mb-2">2016</div>
                            <div className="text-sm text-white/70 uppercase tracking-wider">Год основания</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
                            <div className="font-ibm-plex-serif text-4xl md:text-5xl font-bold mb-2">10 000+</div>
                            <div className="text-sm text-white/70 uppercase tracking-wider">Студентов</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
                            <div className="font-ibm-plex-serif text-4xl md:text-5xl font-bold mb-2">15+</div>
                            <div className="text-sm text-white/70 uppercase tracking-wider">Программ</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
                            <div className="font-ibm-plex-serif text-4xl md:text-5xl font-bold mb-2">20+</div>
                            <div className="text-sm text-white/70 uppercase tracking-wider">Городов</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="bg-navy-900 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-white text-center mb-12">
                        Наша философия
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="font-heading font-bold text-xl text-gray-900 mb-3">
                                Индивидуальный подход
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Мы учитываем особенности каждого ученика, создавая персонализированные образовательные траектории
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                            <div className="text-4xl mb-4">💡</div>
                            <h3 className="font-heading font-bold text-xl text-gray-900 mb-3">
                                Инновационные методы
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Применяем современные педагогические технологии и методики обучения для достижения лучших результатов
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                            <div className="text-4xl mb-4">🌟</div>
                            <h3 className="font-heading font-bold text-xl text-gray-900 mb-3">
                                Развитие потенциала
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Раскрываем таланты и способности каждого ребенка через разнообразные образовательные программы
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intellect School Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
                            INTELLECT SCHOOL
                        </h2>
                        <p className="text-lg text-gray-700 mb-8 max-w-3xl">
                            Intellect School — это современная образовательная среда, где каждый ученик получает
                            качественное образование и всестороннее развитие
                        </p>

                        {/* Text Content */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                                    Образовательный процесс
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Наш образовательный процесс построен на сочетании академических знаний и практических навыков.
                                    Мы используем интерактивные методы обучения, проектную работу и современные технологии.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                                    Квалифицированные педагоги
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Наши учителя проходят регулярное обучение и повышение квалификации, владеют современными
                                    методиками преподавания и индивидуальным подходом к каждому ученику.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                                    Современная образовательная среда
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Наши учебные помещения оснащены современным оборудованием, создающим комфортные условия
                                    для обучения и развития творческих способностей.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                                    Проекты учащихся
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Наши ученики активно участвуют в проектной деятельности, развивая критическое мышление,
                                    креативность и навыки командной работы.
                                </p>
                            </div>
                        </div>

                        {/* Image Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                <Image
                                    src="/api/placeholder/800/600"
                                    alt="Образовательный процесс"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                <Image
                                    src="/api/placeholder/800/600"
                                    alt="Подготовка педагогов"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                <Image
                                    src="/api/placeholder/800/600"
                                    alt="Современная образовательная среда"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                <Image
                                    src="/api/placeholder/800/600"
                                    alt="Проекты учащихся"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 text-center mb-12">
                        Чем мы отличаемся от других
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
                                Авторские программы
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Разработанные нашими методистами программы, адаптированные под современные требования
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
                                Малые группы
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                До 12 человек в группе для максимально эффективного обучения
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
                                Доказанная эффективность
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                95% наших выпускников поступают в ведущие вузы страны
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-12 text-center">
                            Основатель и директор школы Intellect
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
                                <Image
                                    src="/api/placeholder/600/800"
                                    alt="Основатель и директор"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                                    Имя Фамилия
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Основатель и директор Intellect School с более чем 20-летним опытом в сфере образования.
                                    Под его руководством школа выросла в крупнейшую образовательную сеть Казахстана.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <div className="text-navy-900 mr-3">✓</div>
                                        <p className="text-gray-600">
                                            Магистр педагогических наук, МГУ им. М.В. Ломоносова
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="text-navy-900 mr-3">✓</div>
                                        <p className="text-gray-600">
                                            Автор более 15 учебных программ и методических пособий
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="text-navy-900 mr-3">✓</div>
                                        <p className="text-gray-600">
                                            Лауреат премии &ldquo;Лучший педагог года&rdquo; (2018, 2020)
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="text-navy-900 mr-3">✓</div>
                                        <p className="text-gray-600">
                                            Член международной ассоциации образовательных технологий
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-navy-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="font-ibm-plex-serif text-5xl md:text-6xl font-bold text-white mb-2">
                                10 000+
                            </div>
                            <div className="text-white/70 uppercase tracking-wider text-sm">
                                Выпускников
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-ibm-plex-serif text-5xl md:text-6xl font-bold text-white mb-2">
                                15+
                            </div>
                            <div className="text-white/70 uppercase tracking-wider text-sm">
                                Образовательных программ
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-ibm-plex-serif text-5xl md:text-6xl font-bold text-white mb-2">
                                20+
                            </div>
                            <div className="text-white/70 uppercase tracking-wider text-sm">
                                Городов присутствия
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-ibm-plex-serif text-5xl md:text-6xl font-bold text-white mb-2">
                                95%
                            </div>
                            <div className="text-white/70 uppercase tracking-wider text-sm">
                                Поступление в вузы
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 text-center mb-12">
                        Миссия и Видение
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-2xl mb-4">Наша Миссия</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Предоставлять качественное и доступное образование, которое развивает критическое
                                    мышление, креативность и лидерские качества учащихся, готовя их к успешной жизни
                                    в современном мире.
                                </p>
                            </div>
                            <div className="absolute bottom-0 right-0 opacity-10 text-9xl">🎯</div>
                        </div>
                        <div className="relative bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 text-white overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-2xl mb-4">Наше Видение</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Стать ведущей образовательной организацией в регионе, признанной за инновационный
                                    подход, высокое качество образования и создание среды, в которой каждый ученик
                                    может раскрыть свой потенциал.
                                </p>
                            </div>
                            <div className="absolute bottom-0 right-0 opacity-10 text-9xl">🔭</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Licenses Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 text-center mb-12">
                        Наши Лицензии
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <div className="text-6xl mb-2">📜</div>
                                    <p className="text-sm">Лицензия МОН РК</p>
                                    <p className="text-xs mt-1">№ 123456789</p>
                                </div>
                            </div>
                            <h3 className="font-heading font-semibold text-lg text-gray-900 text-center">
                                Образовательная лицензия
                            </h3>
                        </div>
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <div className="text-6xl mb-2">🏆</div>
                                    <p className="text-sm">Сертификат качества</p>
                                    <p className="text-xs mt-1">ISO 9001:2015</p>
                                </div>
                            </div>
                            <h3 className="font-heading font-semibold text-lg text-gray-900 text-center">
                                Международная аккредитация
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Responsibility */}
            <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-16 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
                                Открытие скважин для Социального общества
                            </h2>
                            <p className="text-white/90 text-lg leading-relaxed mb-6">
                                Мы верим в важность возвращения обществу. Наша школа активно участвует в социальных
                                инициативах, направленных на улучшение доступа к образованию и развитие местных сообществ.
                            </p>
                            <ul className="space-y-3 text-white/90">
                                <li className="flex items-start">
                                    <span className="mr-3">✓</span>
                                    <span>Бесплатное обучение для детей из малообеспеченных семей</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3">✓</span>
                                    <span>Благотворительные образовательные программы</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3">✓</span>
                                    <span>Волонтерские проекты наших учащихся</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <p className="text-white/90 text-lg leading-relaxed p-8">
                                &ldquo;Я выбрала Intellect Pro, потому что хотела для дочери школу европейского уровня. Здесь уважают личность ребенка.&rdquo;
                            </p>
                            <Image
                                src="/api/placeholder/800/600"
                                alt="Социальная ответственность"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
                    <div className="text-[20rem] text-white">💧</div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-navy-900 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
                            Присоединяйтесь к нам
                        </h2>
                        <p className="text-xl text-white/80 mb-8">
                            Станьте частью нашего образовательного сообщества и откройте новые возможности для развития
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" href="/contacts" className="bg-white text-navy-900 hover:bg-gray-100">
                                Связаться с нами
                            </Button>
                            <Button
                                size="lg"
                                href="/programs"
                                className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                            >
                                Наши программы
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
