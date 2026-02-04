'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Здесь будет логика отправки формы
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Форма */}
                    <div>
                        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">{t.contact.title}</h2>
                        <p className="text-gray-600 mb-8">{t.contact.subtitle}</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.contact.form.name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t.contact.form.placeholderName}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/20 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.contact.form.phone}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+996 XXX XXX XXX"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/20 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.contact.form.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/20 outline-none transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-navy-900 text-white py-4 rounded-full font-medium hover:bg-navy-800 transition-colors"
                            >
                                {t.contact.form.submit}
                            </button>
                        </form>
                    </div>

                    {/* Контактная информация */}
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6">{t.contact.contactsTitle}</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">{t.contact.phones}</h4>
                                <a
                                    href="tel:+996705889889"
                                    className="text-xl text-navy-900 hover:text-navy-700 transition-colors block mb-1"
                                >
                                    +996 705 889 889
                                </a>
                                <a
                                    href="tel:+996778889889"
                                    className="text-xl text-navy-900 hover:text-navy-700 transition-colors block"
                                >
                                    +996 778 889 889
                                </a>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">{t.contact.addresses}</h4>
                                <p className="text-gray-700 mb-2">
                                    {t.contact.addressList.main}
                                </p>
                                <p className="text-gray-700">
                                    {t.contact.addressList.branch}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">{t.contact.socials}</h4>
                                <a
                                    href="https://www.instagram.com/intellect_pro_school"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg text-navy-900 hover:text-navy-700 transition-colors inline-flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    @intellect_pro_school
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
