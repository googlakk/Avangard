import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionTone = 'white' | 'muted';
type SectionSpacing = 'md' | 'lg';
type HeaderAlign = 'center' | 'left';

const toneClasses: Record<SectionTone, string> = {
    white: 'bg-white',
    muted: 'bg-slate-50',
};

const spacingClasses: Record<SectionSpacing, string> = {
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-24',
};

export function ProgramSection({
    children,
    tone = 'white',
    spacing = 'lg',
    className,
    id,
}: {
    children: ReactNode;
    tone?: SectionTone;
    spacing?: SectionSpacing;
    className?: string;
    id?: string;
}) {
    return (
        <section id={id} className={cn(toneClasses[tone], spacingClasses[spacing], className)}>
            <div className="container mx-auto max-w-7xl px-4 lg:px-8">
                {children}
            </div>
        </section>
    );
}

export function ProgramSectionHeader({
    title,
    subtitle,
    align = 'left',
    className,
}: {
    title: string;
    subtitle?: string;
    align?: HeaderAlign;
    className?: string;
}) {
    return (
        <header
            className={cn(
                'mx-auto mb-12 max-w-3xl',
                align === 'center' ? 'text-center' : 'text-center lg:mx-0 lg:text-left',
                className
            )}
        >
            <h2 className="mb-4 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
                {title}
            </h2>
            {subtitle ? (
                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                    {subtitle}
                </p>
            ) : null}
        </header>
    );
}

export const programCardClassName = 'rounded-xl border border-slate-200 bg-white p-6';
export const programInteractiveCardClassName =
    'rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900/30';

export function ProgramFigure({
    src,
    alt,
    caption,
    aspectClassName = 'aspect-[16/7]',
    sizes,
    className,
}: {
    src: string;
    alt: string;
    caption?: string;
    aspectClassName?: string;
    sizes?: string;
    className?: string;
}) {
    return (
        <figure className={className}>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <div className={cn('relative w-full', aspectClassName)}>
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes={sizes}
                    />
                </div>
            </div>
            {caption ? (
                <figcaption className="mt-3 text-sm text-slate-600">
                    {caption}
                </figcaption>
            ) : null}
        </figure>
    );
}
