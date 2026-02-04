import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { IconWrapper } from '@/lib/icon-wrapper';
import { Icon } from '@/lib/icons';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'О нас | Intellect School',
    description: 'Узнайте больше об Intellect School - ведущей образовательной организации Казахстана',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2 relative z-10">
                            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6">
                                Vision 2025
                            </div>
                            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-navy-900 leading-tight mb-6">
                                Формируем <br />
                                <span className="text-blue-600">будущее</span> сегодня
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                                INTELLECT SCHOOL — это пространство, где знания становятся инструментом, а мечты — достижимой реальностью.
                            </p>
                            <Button size="lg" href="/programs" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                                Узнать больше
                            </Button>
                        </div>

                        {/* Hero Image */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
                                <Image
                                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000"
                                    alt="Students meeting at sunset"
                                    fill
                                    className="object-cover"
                                />
                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3 animate-fade-in-up">
                                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-navy-900">
                                        👋
                                    </div>
                                    <div>
                                        <div className="font-bold text-navy-900">10 000+</div>
                                        <div className="text-xs text-gray-500">Учеников</div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Path to Dream Section */}
            <section className="py-20 relative bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Left: Sticky Image */}
                        <div className="w-full lg:w-5/12 sticky top-24">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy-900 mb-4">
                                Путь к мечте
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                История Жакшылыка Матанова — это путь от трудностей к созданию одной из лучших образовательных сетей региона.
                            </p>
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000"
                                    alt="Mountain path"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-8 right-8 bg-blue-600 text-white p-6 rounded-2xl max-w-xs shadow-lg">
                                    <h3 className="font-bold text-xl mb-2">Жакшылык Матанов</h3>
                                    <p className="text-white/90 text-sm leading-snug">
                                        Основатель, педагог-новатор, посол World Memory Championship
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Timeline */}
                        <div className="w-full lg:w-6/12 pt-0 lg:pt-20">
                            <div className="space-y-12 relative border-l-2 border-blue-100 ml-4 lg:ml-0 pl-8 lg:pl-12">
                                {/* Timeline Item 1 */}
                                <div className="relative">
                                    <span className="absolute -left-[41px] lg:-left-[57px] top-1 w-6 h-6 bg-blue-100 border-4 border-white outline outline-1 outline-blue-200 rounded-full"></span>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <span className="text-blue-600 font-bold block mb-2">1995: Начало</span>
                                        <p className="text-gray-600 leading-relaxed">
                                            В 6 лет теряет отца и начинает работать на Ошском рынке, чистя обувь. Эти трудности закалили характер будущего лидера.
                                        </p>
                                    </div>
                                </div>
                                {/* Timeline Item 2 */}
                                <div className="relative">
                                    <span className="absolute -left-[41px] lg:-left-[57px] top-1 w-6 h-6 bg-blue-100 border-4 border-white outline outline-1 outline-blue-200 rounded-full"></span>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <span className="text-blue-600 font-bold block mb-2">2011: Мечта</span>
                                        <p className="text-gray-600 leading-relaxed">
                                            Возвращается из Турции с дипломом и твердой мечтой — изменить систему образования в Кыргызстане.
                                        </p>
                                    </div>
                                </div>
                                {/* Timeline Item 3 */}
                                <div className="relative">
                                    <span className="absolute -left-[41px] lg:-left-[57px] top-1 w-6 h-6 bg-blue-600 border-4 border-white outline outline-1 outline-blue-600 rounded-full shadow-md"></span>
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-600">
                                        <span className="text-blue-600 font-bold block mb-2">2021: Реализация</span>
                                        <p className="text-gray-600 leading-relaxed">
                                            Открывает Intellect School для первых 300 учеников, пройдя путь до создания сети из 20+ центров.
                                        </p>
                                    </div>
                                </div>

                                {/* Quote Block */}
                                <div className="mt-12 bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
                                    <p className="text-lg text-navy-900 italic leading-relaxed">
                                        &ldquo;Моя миссия — создать среду, где каждый ребенок сможет раскрыть свой потенциал, независимо от своего происхождения. Я знал, что все трудности временны. Меня вела моя мечта дать детям то образование, которое сам не мог получить в детстве.&rdquo;
                                    </p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" width={48} height={48} alt="Жакшылык Матанов" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-navy-900">Жакшылык Матанов</div>
                                            <div className="text-sm text-gray-500">Основатель Intellect School</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blue Stats Strip */}
            <section className="bg-navy-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold mb-2">10 000+</div>
                            <div className="text-white/60 text-sm uppercase tracking-wider">Выпускников</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold mb-2">20+</div>
                            <div className="text-white/60 text-sm uppercase tracking-wider">Филиалов</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold mb-2">15+</div>
                            <div className="text-white/60 text-sm uppercase tracking-wider">Лет опыта</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-bold mb-2">4</div>
                            <div className="text-white/60 text-sm uppercase tracking-wider">Направления</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application / Mission Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy-900 mb-4">
                                    Наша Миссия
                                </h2>
                                <p className="text-gray-600 max-w-xl">
                                    Мы не просто учим — мы формируем личность, готовую к вызовам будущего.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon name="Lightbulb" className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-xl text-navy-900 mb-3">Инновации</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Внедрение передовых методик и технологий в образовательный процесс.
                                </p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                                    <Icon name="Award" className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-xl text-navy-900 mb-3">Качество</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Высокие стандарты обучения и постоянное повышение квалификации педагогов.
                                </p>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon name="Code" className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-xl text-navy-900 mb-3">IT & Технологии</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Углубленное изучение программирования и точных наук с ранних лет.
                                </p>
                            </div>
                            {/* Card 4 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon name="Globe" className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-xl text-navy-900 mb-3">Global Vision</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Формирование глобального мышления и подготовка к международной карьере.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy-900 mb-4">
                            Программы Обучения
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Junior */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-300">
                                <Icon name="BookOpen" className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">Junior School</h3>
                            <p className="text-gray-400 text-sm mb-6 uppercase tracking-wider font-semibold">1-4 классы</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    Soft Skills
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    Робототехника
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    Английский язык
                                </li>
                            </ul>
                            <Link href="/programs/junior" className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all">
                                Подробнее <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                        {/* Middle */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group scale-105 z-10">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-300">
                                <Icon name="Compass" className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">Middle School</h3>
                            <p className="text-gray-400 text-sm mb-6 uppercase tracking-wider font-semibold">5-9 классы</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    Cambridge Program
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    STEAM проекты
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    Второй язык
                                </li>
                            </ul>
                            <Link href="/programs/middle" className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all">
                                Подробнее <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                        {/* Senior */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-300">
                                <Icon name="GraduationCap" className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy-900 mb-2">Senior School</h3>
                            <p className="text-gray-400 text-sm mb-6 uppercase tracking-wider font-semibold">10-11 классы</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    Подготовка к ЕНТ
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    IELTS / TOEFL
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                                    Профориентация
                                </li>
                            </ul>
                            <Link href="/programs/senior" className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all">
                                Подробнее <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Results */}
            <section className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">
                        <div className="w-full lg:w-1/2">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy-900 mb-6">
                                Результаты обучения
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Наши ученики получают не только общеобразовательную базу, но и уникальные интеллектуальные способности, развитые через авторские методики, уверенность в себе и свободный английский.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                <ul className="space-y-4">
                                    {[
                                        'Продвинутые IT-навыки',
                                        'Развитая память',
                                        'Скорость мышления'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                                            <span className="text-navy-900 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-4">
                                    {[
                                        'Свободный английский',
                                        'Навыки лидерства',
                                        'Тяга к знаниям'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                                            <span className="text-navy-900 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-yellow-400/20">
                                        <Icon name="Star" className="w-6 h-6 fill-current" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-navy-900">Наши звезды</h3>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                    <h4 className="font-bold text-navy-900 text-lg mb-1">Команда &ldquo;Вундеркинды из Бишкека&rdquo;</h4>
                                    <p className="text-gray-500 text-sm font-medium">Звезды Central Asia&apos;s Got Talent</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {['Арсен', 'Байэл', 'Альбина', 'Нурболот', 'Чынгыз'].map((name) => (
                                        <span key={name} className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                                            {name}
                                        </span>
                                    ))}
                                </div>

                                <div>
                                    <h5 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">ПОБЕДЫ НА АРЕНАХ:</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Memoriad', icon: 'Medal' },
                                            { label: 'World Memory Champ', icon: 'Trophy' },
                                            { label: 'Mental Calculation', icon: 'Brain' },
                                            { label: 'Got Talent', icon: 'Star' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <Icon name={item.icon} className="w-4 h-4 text-yellow-500" />
                                                <span className="text-navy-900 font-bold text-sm">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dark Learning Model */}
            <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="mb-16">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                            Модель Обучения
                        </h2>
                        <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                        <p className="text-white/60 mt-6 max-w-2xl text-lg">
                            Комплексный подход к развитию ребенка, включающий академические знания, практические навыки и личностный рост.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                            <div className="text-blue-400 font-bold mb-4">01. Академическая база</div>
                            <h3 className="text-xl font-bold mb-4">Фундаментальные знания</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Глубокое изучение предметов, развитие критического мышления и системного подхода к решению задач.
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                            <div className="text-blue-400 font-bold mb-4">02. Практика</div>
                            <h3 className="text-xl font-bold mb-4">Проектная деятельность</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Применение знаний на практике через создание реальных проектов, лабораторные работы и исследования.
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                            <div className="text-blue-400 font-bold mb-4">03. Soft Skills</div>
                            <h3 className="text-xl font-bold mb-4">Лидерство и коммуникация</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Развитие эмоционального интеллекта, навыков работы в команде, ораторского искусства и лидерских качеств.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <Icon name="Users" className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm">Коллаборация</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <Icon name="User" className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm">Персонализация</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <Icon name="Globe" className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm">Проекты</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <Icon name="CheckCircle" className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-sm">Наставничество</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy-900 mb-4">
                        Почему выбирают нас?
                    </h2>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                        Мы создаем условия, в которых каждый ребенок чувствует себя уверенно и стремится к знаниям.
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: 'Shield', title: 'Безопасность', desc: 'Охраняемая территория, видеонаблюдение 24/7' },
                            { icon: 'Heart', title: 'Забота', desc: 'Психологическая поддержка и комфортная атмосфера' },
                            { icon: 'Zap', title: 'Развитие', desc: 'Секции, кружки и дополнительные занятия' },
                            { icon: 'Star', title: 'Успех', desc: 'Индивидуальный план развития для каждого' },
                            { icon: 'Coffee', title: 'Питание', desc: 'Сбалансированное 3-х разовое питание' },
                            { icon: 'Bus', title: 'Трансфер', desc: 'Развозка учеников на комфортабельных автобусах' },
                            { icon: 'Award', title: 'Олимпиады', desc: 'Подготовка и участие в международных конкурсах' },
                            { icon: 'Smile', title: 'Счастье', desc: 'Яркая школьная жизнь и мероприятия' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 text-left">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                    <Icon name={item.icon} className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-navy-900 mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
