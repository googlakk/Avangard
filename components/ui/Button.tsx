'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePathname } from '@/lib/i18n';

export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    href,
    className,
    type = 'button',
}: ButtonProps) {
    const { language } = useLanguage();
    const baseStyles =
        'inline-flex items-center justify-center font-medium transition-all rounded-lg hover-lift';

    const variants = {
        primary: 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/50',
        secondary: 'bg-gradient-secondary text-white hover:shadow-lg hover:shadow-secondary-500/50',
        outline: 'border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const buttonClasses = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
        const localizedHref = href.startsWith('/') ? localizePathname(href, language) : href;
        return (
            <Link href={localizedHref} className={buttonClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={buttonClasses}>
            {children}
        </button>
    );
}
