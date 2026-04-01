'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePathname } from '@/lib/i18n';

interface DropdownItem {
    label: string;
    href: string;
    description?: string;
}

interface DropdownMenuProps {
    label: string;
    items: DropdownItem[];
    basePath: string;
}

export default function DropdownMenu({ label, items, basePath }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-1 whitespace-nowrap py-2 font-heading text-[15px] font-semibold tracking-[0.01em] transition-colors xl:text-[16px] ${isOpen ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
            >
                {label}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 pt-4 w-64 z-50"
                    >
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden py-2 border border-blue-100/50">
                            {items.map((item) => (
                                (() => {
                                    const targetHref = `${basePath}${item.href}`;
                                    const localizedHref = targetHref.startsWith('/')
                                        ? localizePathname(targetHref, language)
                                        : targetHref;
                                    return (
                                <Link
                                    key={item.href}
                                    href={localizedHref}
                                    className="block px-4 py-3 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="text-sm font-semibold text-navy-900 group-hover:text-amber-600 transition-colors">
                                        {item.label}
                                    </div>
                                    {item.description && (
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {item.description}
                                        </div>
                                    )}
                                </Link>
                                    )
                                })()
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
