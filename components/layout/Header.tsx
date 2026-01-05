'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
    { label: 'Главная', href: '/' },
    { label: 'О школе', href: '/about' },
    { label: 'Программы', href: '/programs' },
    { label: 'Преподаватели', href: '/teachers' },
    { label: 'Поступление', href: '/admission' },
    { label: 'Контакты', href: '/contacts' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Логотип */}
                    <Link href="/" className="flex items-center">
                        <div className="font-heading text-xl md:text-2xl font-bold text-white">
                            INTELLECT PRO SCHOOL
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <Link
                        href="/contacts"
                        className="hidden md:inline-block bg-white text-navy-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                        Записаться
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-white/10">
                        <div className="flex flex-col space-y-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/80 hover:text-white transition-colors text-base py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/contacts"
                                className="bg-white text-navy-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Записаться
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
