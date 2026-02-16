import RulesCard from '@/components/ui/RulesCard'
import SafetySection from '@/components/safety/SafetySection'
import {
    Shield,
    Users,
    AlertTriangle,
    Heart,
    Video,
    Utensils,
    Clock,
    GraduationCap,
    BookOpen,
    Smartphone
} from 'lucide-react'

/**
 * Component Preview Page
 * 
 * Visual testing page for RulesCard and SafetySection components.
 * Allows developers to verify Design System compliance before integration.
 * 
 * Access: /preview/components (development only)
 */
export default function ComponentPreview() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3">
                        Component Preview
                    </h1>
                    <p className="text-lg text-gray-600 font-sans">
                        Visual testing for INT-15 reusable components
                    </p>
                </div>

                {/* RulesCard Examples */}
                <section className="mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                            RulesCard Component
                        </h2>
                        <p className="text-gray-600 font-sans">
                            Reusable cards for displaying rules and guidelines
                        </p>
                    </div>

                    {/* Default Variant Grid */}
                    <div className="mb-8">
                        <h3 className="text-lg font-heading font-semibold text-gray-700 mb-4">
                            Default Variant
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <RulesCard
                                icon={Clock}
                                title="Пунктуальность"
                                description="Приходите в школу минимум за 15 минут до начала занятий. Начинайте и заканчивайте уроки вовремя."
                            />
                            <RulesCard
                                icon={Users}
                                title="Внешний вид"
                                description="Соблюдайте деловой дресс-код. Профессиональный и опрятный внешний вид обязателен."
                            />
                            <RulesCard
                                icon={Shield}
                                title="Конфиденциальность"
                                description="Сохраняйте конфиденциальность личной информации учеников и их семей."
                            />
                            <RulesCard
                                icon={GraduationCap}
                                title="Непрерывное развитие"
                                description="Участвуйте в программах повышения квалификации и профессиональных семинарах."
                            />
                            <RulesCard
                                icon={BookOpen}
                                title="Планирование уроков"
                                description="Заранее готовьте детальные планы уроков. Используйте разнообразные методы обучения."
                            />
                            <RulesCard
                                icon={Heart}
                                title="Уважение"
                                description="Относитесь ко всем ученикам с уважением и достоинством. Никакие формы дискриминации недопустимы."
                            />
                        </div>
                    </div>

                    {/* Highlighted Variant */}
                    <div>
                        <h3 className="text-lg font-heading font-semibold text-gray-700 mb-4">
                            Highlighted Variant
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <RulesCard
                                icon={AlertTriangle}
                                title="Важное правило"
                                description="Этот вариант используется для выделения особо важных правил или требований."
                                variant="highlighted"
                            />
                            <RulesCard
                                icon={Smartphone}
                                title="Запрет телефонов"
                                description="Мобильные телефоны должны быть выключены и сданы в начале учебного дня."
                                variant="highlighted"
                            />
                        </div>
                    </div>
                </section>

                {/* SafetySection Examples */}
                <section className="bg-white rounded-3xl p-8 md:p-12">
                    <div className="mb-12">
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                            SafetySection Component
                        </h2>
                        <p className="text-gray-600 font-sans">
                            Sections for displaying safety protocols with items and contacts
                        </p>
                    </div>

                    {/* Example 1: With Items Only */}
                    <SafetySection
                        icon={AlertTriangle}
                        title="Протоколы эвакуации"
                        description="Четкие процедуры на случай чрезвычайных ситуаций"
                        items={[
                            'Регулярные пожарные учения (дважды в год)',
                            'Четко обозначенные пути эвакуации',
                            'Специально обученный персонал',
                            'Точки сбора для каждого класса',
                            'Система подсчета учеников'
                        ]}
                    />

                    <div className="border-t border-gray-200 my-12" />

                    {/* Example 2: With Items and Contacts */}
                    <SafetySection
                        icon={Heart}
                        title="Медицинская помощь"
                        description="Полностью оборудованный медицинский кабинет"
                        items={[
                            'Квалифицированная медсестра присутствует постоянно',
                            'Медицинский кабинет с необходимым оборудованием',
                            'Протоколы действий в чрезвычайных ситуациях',
                            'Медицинские карты на всех учеников',
                            'Партнерство с ближайшей клиникой'
                        ]}
                        contacts={[
                            { label: 'Скорая помощь', value: '103' },
                            { label: 'Медсестра школы', value: '+996 555 123 456' },
                            { label: 'Администрация', value: '+996 770 123 456' }
                        ]}
                    />

                    <div className="border-t border-gray-200 my-12" />

                    {/* Example 3: Video Surveillance */}
                    <SafetySection
                        icon={Video}
                        title="Видеонаблюдение"
                        description="Современная система видеонаблюдения"
                        items={[
                            'Камеры в коридорах, на входах и на территории',
                            'Запись хранится 30 дней',
                            'Мониторинг в реальном времени',
                            'Защита конфиденциальности учеников',
                            'Доступ только для уполномоченного персонала'
                        ]}
                    />

                    <div className="border-t border-gray-200 my-12" />

                    {/* Example 4: Food Safety */}
                    <SafetySection
                        icon={Utensils}
                        title="Безопасность питания"
                        description="Здоровое и безопасное питание"
                        items={[
                            'Собственная кухня с профессиональным поваром',
                            'Меню халяль',
                            'Регулярные санитарные проверки',
                            'Учет аллергий и диетических ограничений',
                            'Свежие продукты ежедневно'
                        ]}
                        contacts={[
                            { label: 'Шеф-повар', value: '+996 777 888 999' },
                            { label: 'Email', value: 'kitchen@intellectschool.kg' }
                        ]}
                    />
                </section>

                {/* Design System Compliance Notes */}
                <section className="mt-12 bg-navy-900 text-white rounded-3xl p-8">
                    <h3 className="text-2xl font-display font-bold mb-4">
                        Проверка Design System
                    </h3>
                    <ul className="space-y-2 font-sans text-white/90">
                        <li>✅ Шрифты: Cinzel (заголовки H2), Montserrat (заголовки H3), Inter (текст)</li>
                        <li>✅ Цвета: Navy-900 (#0B1B3D), White, Gray-50</li>
                        <li>✅ Иконки: Lucide React (минималистичные, тонкие линии)</li>
                        <li>✅ Hover эффекты: shadow-xl, translate, scale</li>
                        <li>✅ Скругления: rounded-3xl для карточек, rounded-2xl для внутренних элементов</li>
                        <li>✅ Отступы: py-16 между секциями, p-6 внутри карточек</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}
