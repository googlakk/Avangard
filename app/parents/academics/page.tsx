'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { IconWrapper } from '@/lib/icon-wrapper';

export default function AcademicsPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/класс.png"
                    alt="Учебный процесс"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/70" />
                <div className="relative container mx-auto px-4 text-center text-white z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl mb-6"
                    >
                        Образовательная среда
                    </motion.h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto font-light">
                        Система обучения, построенная на преемственности и индивидуальном подходе от 1 до 11 класса.
                    </p>
                </div>
            </section>

            {/* School Stages */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-4">Три ступени развития</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Эффективное разделение для максимальной концентрации на возрастных особенностях детей.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Junior */}
                        <Link href="/programs/junior" className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all flex flex-col h-full">
                            <div className="h-48 relative bg-blue-50 shrink-0">
                                <Image
                                    src="/images/junior-morning-exercise.png"
                                    alt="Junior School"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/0 transition-colors" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-heading font-bold text-2xl text-navy-900 mb-2">Intellect Junior</h3>
                                <div className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">1–4 классы</div>
                                <p className="text-gray-600 mb-6">
                                    Мягкая адаптация к школе, развитие эмоционального интеллекта, ментальная арифметика и углубленный английский в игровой форме.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 mb-6 flex-grow">
                                    <li>• Продленка до 18:00</li>
                                    <li>• Развитие Soft Skills</li>
                                </ul>
                                <span className="inline-flex items-center justify-center font-medium transition-all rounded-lg px-4 py-2 text-sm border-2 border-navy-900 text-navy-900 group-hover:bg-navy-900 group-hover:text-white w-full mt-auto">Подробнее</span>
                            </div>
                        </Link>

                        {/* Middle */}
                        <Link href="/programs/middle" className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all flex flex-col h-full">
                            <div className="h-48 relative bg-blue-50 shrink-0">
                                <Image
                                    src="/images/middle-entrance-group.png"
                                    alt="Middle School"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/0 transition-colors" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-heading font-bold text-2xl text-navy-900 mb-2">Intellect Middle</h3>
                                <div className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">5–9 классы</div>
                                <p className="text-gray-600 mb-6">
                                    Фундаментальные предметы, проектная деятельность, начало профориентации и подготовка к олимпиадам.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 mb-6 flex-grow">
                                    <li>• Углубленная математика</li>
                                    <li>• IT и робототехника</li>
                                </ul>
                                <span className="inline-flex items-center justify-center font-medium transition-all rounded-lg px-4 py-2 text-sm border-2 border-navy-900 text-navy-900 group-hover:bg-navy-900 group-hover:text-white w-full mt-auto">Подробнее</span>
                            </div>
                        </Link>

                        {/* Senior */}
                        <Link href="/programs/senior" className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all flex flex-col h-full">
                            <div className="h-48 relative bg-blue-50 shrink-0">
                                <Image
                                    src="/images/senior-medalists.png"
                                    alt="Senior School"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/0 transition-colors" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-heading font-bold text-2xl text-navy-900 mb-2">Intellect Senior</h3>
                                <div className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">10–11 классы</div>
                                <p className="text-gray-600 mb-6">
                                    Индивидуальные треки обучения, подготовка к ОРТ и IELTS/TOEFL, помощь с поступлением в зарубежные вузы.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 mb-6 flex-grow">
                                    <li>• Career Guidance</li>
                                    <li>• Подготовка к University</li>
                                </ul>
                                <span className="inline-flex items-center justify-center font-medium transition-all rounded-lg px-4 py-2 text-sm border-2 border-navy-900 text-navy-900 group-hover:bg-navy-900 group-hover:text-white w-full mt-auto">Подробнее</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Subjects Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-12 text-center">Академический фокус</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Математика', icon: 'Calculator', desc: 'Углубленное изучение' },
                            { name: 'Английский язык', icon: 'Globe', desc: 'Cambridge/IELTS' },
                            { name: 'IT и Программирование', icon: 'Code2', desc: 'Python, Web' },
                            { name: 'Естественные науки', icon: 'Microscope', desc: 'Лабораторные практики' },
                            { name: 'Ментальная арифметика', icon: 'Brain', desc: 'Развитие интеллекта' },
                            { name: 'История', icon: 'BookOpen', desc: 'Критическое мышление' },
                            { name: 'Спорт', icon: 'Trophy', desc: 'Физическое развитие' },
                            { name: 'Искусство', icon: 'Palette', desc: 'Творческий потенциал' },
                        ].map((subject, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors flex flex-col items-center text-center group">
                                <IconWrapper
                                    icon={subject.icon}
                                    variant="navy"
                                    size="md"
                                    className="mb-4 group-hover:scale-110 transition-transform duration-300"
                                />
                                <h3 className="font-bold text-navy-900 mb-1">{subject.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">{subject.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Extracurriculars */}
            <section className="py-20 bg-navy-900 text-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="font-display text-3xl md:text-5xl mb-6">Кружки и Секции</h2>
                        <p className="text-xl text-white/80 mb-8 font-light leading-relaxed">
                            Мы верим, что таланты раскрываются не только за партой. В нашей школе более 15 кружков для разностороннего развития.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Шахматы</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Робототехника</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Тхэквондо</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Хореография</li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> ИЗО студия</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Дебатный клуб</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Футбол</li>
                                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Вокал</li>
                            </ul>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/20">
                        <Image
                            src="/api/placeholder/800/600"
                            alt="Дети на кружках"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
