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

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/[0.08]"
            style={{
                background: 'linear-gradient(90deg, #0F223A 0%, #1C2F4A 25%, #223A5E 50%, rgba(198,169,107,0.08) 70%, #1C2F4A 85%, #0F223A 100%)',
            }}
        >
            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="container mx-auto px-6 relative">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/logo.png"
                            alt="INTELLECT INTERNATIONAL SCHOOL"
                            width={1024}
                            height={190}
                            className="h-9 md:h-11 w-auto transition-opacity duration-300 group-hover:opacity-90"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-9">
                        <Link
                            href="/"
                            className="relative text-white/90 hover:text-white text-[15px] font-medium tracking-[0.01em] transition-all duration-300 py-2 group"
                        >
                            {t.header.home}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#C6A96B] to-[#D8C08A] group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link
                            href="/about"
                            className="relative text-white/90 hover:text-white text-[15px] font-medium tracking-[0.01em] transition-all duration-300 py-2 group"
                        >
                            {t.header.about}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#C6A96B] to-[#D8C08A] group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link
                            href="/programs"
                            className="relative text-white/90 hover:text-white text-[15px] font-medium tracking-[0.01em] transition-all duration-300 py-2 group"
                        >
                            {t.header.programs}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#C6A96B] to-[#D8C08A] group-hover:w-full transition-all duration-300" />
                        </Link>

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
                    <div className="hidden lg:flex items-center gap-5">
                        <LanguageSwitch />
                        <Link
                            href="/contacts"
                            className="relative px-6 py-2.5 rounded-full text-[14px] font-semibold tracking-[0.02em] transition-all duration-300 transform hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(198,169,107,0.25)]"
                            style={{
                                background: 'linear-gradient(135deg, #C6A96B 0%, #D8C08A 50%, #C6A96B 100%)',
                                color: '#0F223A',
                                boxShadow: '0 4px 12px rgba(198,169,107,0.2)',
                            }}
                        >
                            {t.common.contactUs}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-white/90 hover:text-white p-2 transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
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
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden border-t border-white/[0.08]"
                            style={{
                                background: 'linear-gradient(180deg, #0F223A 0%, #162B46 100%)',
                            }}
                        >
                            <div className="flex flex-col py-6 px-2 space-y-1 max-h-[80vh] overflow-y-auto">
                                <Link
                                    href="/"
                                    className="text-white/90 hover:text-white hover:bg-white/[0.05] px-4 py-3 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t.header.home}
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-white/90 hover:text-white hover:bg-white/[0.05] px-4 py-3 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t.header.about}
                                </Link>
                                <Link
                                    href="/programs"
                                    className="text-white/90 hover:text-white hover:bg-white/[0.05] px-4 py-3 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t.header.programs}
                                </Link>

                                {/* Parents Mobile Section */}
                                <div className="py-3 px-4">
                                    <div className="text-[#C6A96B] text-xs font-semibold uppercase tracking-[0.15em] mb-3">{t.header.parentsMenu.title}</div>
                                    <div className="pl-3 space-y-1 border-l border-[#C6A96B]/30">
                                        <Link href="/parents/academics" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.academics.title}</Link>
                                        <Link href="/parents/values" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.values.title}</Link>
                                        <Link href="/parents/care" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.care.title}</Link>
                                        <Link href="/parents/admission" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.admission.title}</Link>
                                        <Link href="/parents/faq" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.parentsMenu.items.faq.title}</Link>
                                    </div>
                                </div>

                                {/* Teachers Mobile Section */}
                                <div className="py-3 px-4">
                                    <div className="text-[#C6A96B] text-xs font-semibold uppercase tracking-[0.15em] mb-3">{t.header.teachersMenu.title}</div>
                                    <div className="pl-3 space-y-1 border-l border-[#C6A96B]/30">
                                        <Link href="/teachers/culture" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.teachersMenu.items.culture.title}</Link>
                                        <Link href="/teachers/benefits" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.teachersMenu.items.benefits.title}</Link>
                                        <Link href="/teachers/careers" className="block text-white/80 hover:text-white py-2 px-3 rounded transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t.header.teachersMenu.items.careers.title}</Link>
                                    </div>
                                </div>

                                <Link
                                    href="/contacts"
                                    className="text-white/90 hover:text-white hover:bg-white/[0.05] px-4 py-3 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t.header.contacts}
                                </Link>

                                <div className="flex justify-center pt-6 pb-2">
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
