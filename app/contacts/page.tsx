'use client';

import type { Metadata } from 'next';
import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { IconWrapper } from '@/lib/icon-wrapper';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactsPage() {
    const { t } = useLanguage();
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
                <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gray-900">
                    <span className="text-navy-900">{t.contacts.hero.title}</span>{t.contacts.hero.titleSuffix}
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    {t.contacts.hero.subtitle}
                </p>
            </section>

            <div className="max-w-7xl mx-auto py-20">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Контактная информация */}
                    <div>
                        <h2 className="font-heading font-bold text-3xl mb-8">{t.contacts.info.title}</h2>

                        <div className="space-y-6">
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
                                        <IconWrapper icon="Mail" variant="navy" size="sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">{t.contacts.info.email}</h3>
                                        <a
                                            href={`mailto:${SITE_CONFIG.email}`}
                                            className="text-gray-600 hover:text-navy-900 transition-colors"
                                        >
                                            {SITE_CONFIG.email}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
                                        <IconWrapper icon="Phone" variant="navy" size="sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">{t.contacts.info.phone}</h3>
                                        <a
                                            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                                            className="text-gray-600 hover:text-navy-900 transition-colors"
                                        >
                                            {SITE_CONFIG.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
                                        <IconWrapper icon="MapPin" variant="navy" size="sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">{t.contacts.info.address.title}</h3>
                                        <p className="text-gray-600">{SITE_CONFIG.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-heading font-bold text-lg mb-4 text-gray-900">{t.contacts.info.hours.title}</h3>
                            <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-600">
                                <p>{t.contacts.info.hours.weekdays}</p>
                                <p>{t.contacts.info.hours.weekend}</p>
                            </div>
                        </div>
                    </div>

                    {/* Форма обратной связи */}
                    <div>
                        <h2 className="font-heading font-bold text-3xl mb-8 text-gray-900">{t.contacts.form.title}</h2>

                        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    {t.contacts.form.labels.name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder={t.contacts.form.placeholders.name}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    {t.contacts.form.labels.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder={t.contacts.form.placeholders.email}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    {t.contacts.form.labels.phone}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder={t.contacts.form.placeholders.phone}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    {t.contacts.form.labels.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                                    placeholder={t.contacts.form.placeholders.message}
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400">
                                    {t.contacts.form.success}
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400">
                                    {t.contacts.form.error}
                                </div>
                            )}

                            <Button
                                size="lg"
                                className="w-full"
                                type="submit"
                            >
                                {isSubmitting ? t.contacts.form.sending : t.contacts.form.submit}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
