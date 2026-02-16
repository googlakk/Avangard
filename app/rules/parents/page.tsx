import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = {
    title: 'Правила для родителей | Intellect School',
    description: 'Правила взаимодействия и обязанности родителей учащихся Intellect School',
};

export default function ParentsRulesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Breadcrumb */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-purple-100 hover:text-white mb-4 transition-colors"
                    >
                        <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                        Назад на главную
                    </Link>
                    <h1 className="text-4xl font-bold">Правила для родителей</h1>
                    <p className="text-purple-100 mt-2">Партнерство в образовании вашего ребенка</p>
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
                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-center transition-colors"
                    >
                        Для учеников
                    </Link>
                    <Link
                        href="/rules/parents"
                        className="p-4 bg-purple-600 text-white rounded-xl font-semibold text-center"
                    >
                        Для родителей
                    </Link>
                </div>

                {/* General Responsibilities */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl mr-4">
                            <Icon name="Heart" className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Общие обязанности</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Создавать дома условия для выполнения домашних заданий и занятий</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Обеспечить регулярное посещение школы ребенком</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Контролировать успеваемость и поведение ребенка</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Уважительно относиться к учителям, администрации и другим сотрудникам школы</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Communication */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-green-100 p-3 rounded-xl mr-4">
                            <Icon name="MessageCircle" className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Коммуникация со школой</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Посещать родительские собрания и индивидуальные встречи с учителями</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Своевременно отвечать на сообщения и уведомления от школы</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Информировать школу об изменениях в контактных данных</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Сообщать о проблемах со здоровьем или особых потребностях ребенка</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Attendance & Absence */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-orange-100 p-3 rounded-xl mr-4">
                            <Icon name="Calendar" className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Посещаемость и пропуски</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Заранее уведомлять школу о планируемых отсутствиях ребенка</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Предоставлять медицинские справки после болезни (при отсутствии более 3 дней)</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Обеспечить явку ребенка к началу занятий без опозданий</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Financial Obligations */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-3 rounded-xl mr-4">
                            <Icon name="DollarSign" className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Финансовые обязательства</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Своевременно оплачивать обучение согласно договору</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Компенсировать ущерб, нанесенный ребенком школьному имуществу</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Обеспечить ребенка необходимыми учебными материалами</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Behavior Support */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-pink-100 p-3 rounded-xl mr-4">
                            <Icon name="Users" className="w-6 h-6 text-pink-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Поддержка поведения</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Воспитывать у ребенка уважительное отношение к учителям и одноклассникам</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Поддерживать дисциплинарные меры, применяемые школой</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Сотрудничать с психологом и педагогами в решении поведенческих вопросов</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* School Entry */}
                <section className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                            <Icon name="Shield" className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Пропускной режим</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Вход на территорию школы осуществляется по пропуску или с разрешения охраны</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Предварительно согласовывать время посещения с администрацией</span>
                            </li>
                            <li className="flex items-start">
                                <Icon name="CheckCircle" className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span>Не отвлекать учителей во время проведения уроков</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Important Notice */}
                <section className="mb-12">
                    <div className="flex items-start p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                        <Icon name="Info" className="w-6 h-6 text-blue-600 mr-4 mt-1 shrink-0" />
                        <div>
                            <h3 className="font-bold text-lg mb-2">Важная информация</h3>
                            <p className="text-gray-700">
                                Школа и родители являются партнерами в образовании детей. Открытое и конструктивное общение,
                                взаимное уважение и сотрудничество - ключ к успеху вашего ребенка.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-4">Свяжитесь с нами</h3>
                        <p className="mb-4">
                            По всем вопросам вы можете обратиться к классному руководителю или в администрацию школы.
                        </p>
                        <Link
                            href="/contacts"
                            className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                        >
                            Контакты школы
                            <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
