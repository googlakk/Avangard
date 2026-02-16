import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = {
    title: 'Правила для учителей | Intellect School',
    description: 'Правила и стандарты поведения для преподавателей Intellect School',
};

export default function TeachersRulesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Breadcrumb */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors"
                    >
                        <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                        Назад на главную
                    </Link>
                    <h1 className="text-4xl font-bold">Правила для учителей</h1>
                    <p className="text-blue-100 mt-2">Стандарты профессионального поведения</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Navigation between rules */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    <Link
                        href="/rules/teachers"
                        className="p-4 bg-blue-600 text-white rounded-xl font-semibold text-center"
                    >
                        Для учителей
                    </Link>
                    <Link
                        href="/rules/students"
                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-center transition-colors"
                    >
                        Для учеников
                    </Link>
                    <Link
                        href="/rules/parents"
                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-center transition-colors"
                    >
                        Для родителей
                    </Link>
                </div>

                {/* Professional Standards */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                            <Icon name="Award" className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Профессиональные стандарты</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Соблюдать этические нормы и профессиональную этику при взаимодействии с учениками, коллегами и родителями</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Постоянно повышать свою квалификацию и профессиональный уровень</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Обеспечивать высокое качество преподавания и индивидуальный подход к каждому ученику</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Поддерживать дисциплину и создавать позитивную образовательную среду</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Dress Code */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                            <Icon name="Users" className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Дресс-код</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Деловой стиль одежды: классические костюмы, рубашки, блузы</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Опрятный и ухоженный внешний вид</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Умеренное использование парфюмерии и косметики</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Work Schedule */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-orange-100 p-3 rounded-xl mr-4">
                            <Icon name="Clock" className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Рабочее время</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Соблюдать установленный график работы и быть на рабочем месте за 15 минут до начала занятий</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Своевременно информировать администрацию о невозможности выхода на работу</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Участвовать в педагогических советах, методических объединениях и родительских собраниях</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Educational Process */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                            <Icon name="BookOpen" className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Учебный процесс</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Тщательно планировать уроки и готовить учебные материалы</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Использовать современные методы преподавания и образовательные технологии</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Объективно оценивать знания учащихся и своевременно выставлять оценки</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Поддерживать связь с родителями и информировать их об успеваемости детей</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Safety and Security */}
                <section className="mb-12">
                    <div className="flex items-start p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
                        <Icon name="AlertTriangle" className="w-6 h-6 text-amber-600 mr-4 mt-1 shrink-0" />
                        <div>
                            <h3 className="font-bold text-lg mb-2">Безопасность учащихся</h3>
                            <p className="text-gray-700">
                                Учителя несут ответственность за безопасность учеников во время уроков и школьных мероприятий.
                                Необходимо незамедлительно сообщать администрации о любых чрезвычайных ситуациях.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Confidentiality */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="bg-red-100 p-3 rounded-xl mr-4">
                            <Icon name="Shield" className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Конфиденциальность</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <p className="text-gray-700 mb-4">
                            Соблюдать конфиденциальность информации о учениках и их семьях, не разглашать персональные данные третьим лицам.
                        </p>
                        <p className="text-gray-700">
                            Информация об академических успехах, поведении и личной жизни учащихся может быть передана только родителям/законным представителям или по официальному запросу уполномоченных органов.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
