import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = {
    title: 'Правила для учеников | Intellect School',
    description: 'Правила поведения и академические стандарты для учащихся Intellect School',
};

export default function StudentsRulesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Breadcrumb */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-green-100 hover:text-white mb-4 transition-colors"
                    >
                        <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                        Назад на главную
                    </Link>
                    <h1 className="text-4xl font-bold">Правила для учеников</h1>
                    <p className="text-green-100 mt-2">Кодекс поведения и академические стандарты</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Navigation between rules */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    <Link
                        href="/rules/teachers"
                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-center transition-colors"
                    >
                        Для учителей
                    </Link>
                    <Link
                        href="/rules/students"
                        className="p-4 bg-green-600 text-white rounded-xl font-semibold text-center"
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

                {/* General Behavior */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                            <Icon name="Users" className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Общее поведение</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Уважительно относиться к учителям, администрации школы, сотрудникам и одноклассникам</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Соблюдать дисциплину на уроках и переменах</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Бережно относиться к школьному имуществу, учебникам и личным вещам других учеников</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Поддерживать чистоту и порядок в классах, коридорах и на территории школы</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Attendance */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                            <Icon name="Calendar" className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Посещаемость</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Приходить в школу вовремя, не опаздывать на уроки</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>В случае отсутствия предоставлять справку от врача или объяснительную записку от родителей</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Пропуски занятий допускаются только по уважительным причинам</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Academic Work */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-orange-100 p-3 rounded-xl mr-4">
                            <Icon name="BookOpen" className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Учебная работа</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Добросовестно выполнять домашние задания и готовиться к урокам</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Приносить на уроки все необходимые учебные материалы и принадлежности</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Самостоятельно выполнять контрольные и проверочные работы</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Активно участвовать в учебных дискуссиях и проектах</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Dress Code */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-pink-100 p-3 rounded-xl mr-4">
                            <Icon name="Users" className="w-6 h-6 text-pink-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Школьная форма</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Носить школьную форму согласно установленным стандартам</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Форма должна быть чистой, опрятной и соответствовать сезону</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Сменная обувь обязательна для всех учащихся</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Спортивная форма используется только на занятиях физкультурой</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Technology Use */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                            <Icon name="Smartphone" className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Использование технологий</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Мобильные телефоны должны быть выключены или в беззвучном режиме во время уроков</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Использование гаджетов разрешено только в образовательных целях с разрешения учителя</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Запрещается фото- и видеосъемка без разрешения учителя</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Prohibited Actions */}
                <section className="mb-12">
                    <div className="flex items-start p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                        <Icon name="XCircle" className="w-6 h-6 text-red-600 mr-4 mt-1 shrink-0" />
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-red-900">Запрещается</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Курение, употребление алкоголя и наркотических веществ</li>
                                <li>• Применение физического и психологического насилия</li>
                                <li>• Использование ненормативной лексики</li>
                                <li>• Порча школьного имущества</li>
                                <li>• Пропуск уроков без уважительной причины</li>
                                <li>• Создание конфликтных ситуаций и распространение ложной информации</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Safety */}
                <section>
                    <div className="flex items-center mb-6">
                        <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                            <Icon name="Shield" className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Безопасность</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Соблюдать правила пожарной безопасности и технику безопасности</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Не покидать территорию школы во время учебного дня без разрешения</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Немедленно сообщать учителю или администрации о любых подозрительных ситуациях</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
