'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();

    /* REMOVED OLD NAV_LINKS, hardcoded in generic for now due to complex structure */

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Логотип */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="INTELLECT INTERNATIONAL SCHOOL"
                            width={1024}
                            height={190}
                            className="h-10 md:h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm font-medium">{t.header.home}</Link>
                        <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm font-medium">{t.header.about}</Link>
                        <Link href="/programs" className="text-white/80 hover:text-white transition-colors text-sm font-medium">{t.header.programs}</Link>

                        <DropdownMenu
                            label={t.header.parentsMenu.title}
                            basePath="/parents"
                            items={[
                                { label: t.header.parentsMenu.items.academics.title, href: '/academics', description: t.header.parentsMenu.items.academics.description },
                                { label: t.header.parentsMenu.items.values.title, href: '/values', description: t.header.parentsMenu.items.values.description },
                                { label: t.header.parentsMenu.items.care.title, href: '/care', description: t.header.parentsMenu.items.care.description },
                                { label: t.header.parentsMenu.items.admission.title, href: '/admission', description: t.header.parentsMenu.items.admission.description },
                                { label: t.header.parentsMenu.items.faq.title, href: '/faq', description: t.header.parentsMenu.items.faq.description },
                            ]}
                        />

                        <DropdownMenu
                            label={t.header.teachersMenu.title}
                            basePath="/teachers"
                            items={[
                                { label: t.header.teachersMenu.items.culture.title, href: '/culture', description: t.header.teachersMenu.items.culture.description },
                                { label: t.header.teachersMenu.items.benefits.title, href: '/benefits', description: t.header.teachersMenu.items.benefits.description },
                                { label: t.header.teachersMenu.items.careers.title, href: '/careers', description: t.header.teachersMenu.items.careers.description },
                            ]}
                        />
                    </nav>

                    {/* Language Switch & CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitch />
                        <Link
                            href="/contacts"
                            className="bg-white text-navy-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                            {t.common.contactUs}
                        </Link>
                    </div>

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
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-white/10 bg-navy-900"
                        >
                            <div className="flex flex-col p-4 space-y-4 max-h-[80vh] overflow-y-auto">
                                <Link href="/" className="text-white/80 hover:text-white py-2" onClick={() => setIsMenuOpen(false)}>{t.header.home}</Link>
                                <Link href="/about" className="text-white/80 hover:text-white py-2" onClick={() => setIsMenuOpen(false)}>{t.header.about}</Link>
                                <Link href="/programs" className="text-white/80 hover:text-white py-2" onClick={() => setIsMenuOpen(false)}>{t.header.programs}</Link>

                                {/* Parents Mobile Section */}
                                <div className="py-2">
                                    <div className="text-white/60 text-xs font-bold uppercase mb-2 pl-2">{t.header.parentsMenu.title}</div>
                                    <div className="pl-4 space-y-3 border-l-2 border-white/10 ml-1">
                                        <Link href="/parents/academics" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.academics.title}</Link>
                                        <Link href="/parents/values" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.values.title}</Link>
                                        <Link href="/parents/care" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.care.title}</Link>
                                        <Link href="/parents/admission" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.admission.title}</Link>
                                        <Link href="/parents/faq" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.faq.title}</Link>
                                    </div>
                                </div>

                                {/* Teachers Mobile Section */}
                                <div className="py-2">
                                    <div className="text-white/60 text-xs font-bold uppercase mb-2 pl-2">{t.header.teachersMenu.title}</div>
                                    <div className="pl-4 space-y-3 border-l-2 border-white/10 ml-1">
                                        <Link href="/teachers/culture" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.teachersMenu.items.culture.title}</Link>
                                        <Link href="/teachers/benefits" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.teachersMenu.items.benefits.title}</Link>
                                        <Link href="/teachers/careers" className="block text-white/90" onClick={() => setIsMenuOpen(false)}>{t.header.teachersMenu.items.careers.title}</Link>
                                    </div>
                                </div>

                                <Link href="/contacts" className="text-white/80 hover:text-white py-2" onClick={() => setIsMenuOpen(false)}>{t.header.contacts}</Link>

                                <div className="flex justify-center pt-4">
                                    <LanguageSwitch />
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
