'use client';

import type { Metadata } from 'next';
import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContactsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Имитация отправки формы
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="pt-24 px-4">
            {/* Hero секция */}
            <section className="max-w-7xl mx-auto py-20 text-center">
                <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">
                    <span className="gradient-text">Свяжитесь</span> с нами
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Мы всегда готовы ответить на ваши вопросы и обсудить возможности сотрудничества
                </p>
            </section>

            <div className="max-w-7xl mx-auto py-20">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Контактная информация */}
                    <div>
                        <h2 className="font-heading font-bold text-3xl mb-8">Контактная информация</h2>

                        <div className="space-y-6">
                            <div className="glass rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-2xl flex-shrink-0">
                                        ✉️
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg mb-2">Email</h3>
                                        <a
                                            href={`mailto:${SITE_CONFIG.email}`}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {SITE_CONFIG.email}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="glass rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-2xl flex-shrink-0">
                                        📞
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg mb-2">Телефон</h3>
                                        <a
                                            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {SITE_CONFIG.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="glass rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-2xl flex-shrink-0">
                                        📍
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg mb-2">Адрес</h3>
                                        <p className="text-gray-400">{SITE_CONFIG.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-heading font-bold text-lg mb-4">Режим работы</h3>
                            <div className="glass rounded-xl p-6 text-gray-400">
                                <p>Понедельник - Пятница: 9:00 - 18:00</p>
                                <p>Суббота - Воскресенье: Выходной</p>
                            </div>
                        </div>
                    </div>

                    {/* Форма обратной связи */}
                    <div>
                        <h2 className="font-heading font-bold text-3xl mb-8">Напишите нам</h2>

                        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder="Ваше имя"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    Телефон
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder="+7 (XXX) XXX-XX-XX"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Сообщение
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Расскажите о вашем проекте..."
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400">
                                    Спасибо! Ваше сообщение успешно отправлено.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400">
                                    Произошла ошибка. Пожалуйста, попробуйте позже.
                                </div>
                            )}

                            <Button
                                size="lg"
                                className="w-full"
                                type="submit"
                            >
                                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
