import React from 'react'
import { LucideIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactInfo {
    label: string
    value: string
}

interface SafetySectionProps {
    icon: LucideIcon
    title: string
    description: string
    items?: string[]
    contacts?: ContactInfo[]
    className?: string
}

/**
 * SafetySection Component
 * 
 * Component for displaying safety protocol sections with procedures and contacts.
 * Follows Design System 2.0 specifications and UX Guidelines.
 * 
 * Design Requirements:
 * - Clear visual hierarchy (icon → title → description → items)
 * - Cinzel font for main title (matches logo)
 * - Inter font for body text
 * - Navy-900 color scheme
 * - Generous spacing for readability
 * 
 * @see docs/DESIGN_SYSTEM.md - Typography & Spacing
 * @see docs/UX_GUIDELINES.md - Visual Proof & Content Hierarchy
 */
export default function SafetySection({
    icon: Icon,
    title,
    description,
    items,
    contacts,
    className
}: SafetySectionProps) {
    return (
        <section className={cn('py-8', className)}>
            {/* Section Header */}
            <div className="flex items-start gap-4 mb-6">
                {/* Icon - Minimalist thin-stroke per Design System */}
                <div className="flex-shrink-0 mt-1">
                    <div className="bg-navy-900/5 rounded-2xl p-3">
                        <Icon
                            className="text-navy-900 h-8 w-8"
                            strokeWidth={1.5}
                        />
                    </div>
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                    {/* Title - Cinzel (font-display) to match logo per Design System */}
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
                        {title}
                    </h2>

                    {/* Description - Inter (font-sans) per Design System */}
                    <p className="text-lg text-gray-600 font-sans leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Content: Steps/Items List */}
            {items && items.length > 0 && (
                <ul className="space-y-3 ml-0 md:ml-20">
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 group"
                        >
                            {/* Checkmark icon - visual confirmation per UX Guidelines */}
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-navy-900/5 rounded-full p-1 group-hover:bg-navy-900/10 transition-colors">
                                    <Check className="h-4 w-4 text-navy-900" strokeWidth={2.5} />
                                </div>
                            </div>

                            {/* Item text - Inter font */}
                            <span className="text-gray-700 font-sans leading-relaxed flex-1">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Optional: Emergency Contacts */}
            {contacts && contacts.length > 0 && (
                <div className="mt-8 ml-0 md:ml-20 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    {/* Contact header - uppercase tracking per Design System */}
                    <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-navy-900/60 mb-4">
                        Контакты
                    </h3>

                    {/* Contact details */}
                    <div className="space-y-3">
                        {contacts.map((contact, i) => (
                            <div
                                key={i}
                                className="flex items-start justify-between gap-4 flex-wrap"
                            >
                                <span className="text-sm font-medium text-gray-600 font-sans">
                                    {contact.label}
                                </span>
                                <a
                                    href={
                                        contact.value.includes('@')
                                            ? `mailto:${contact.value}`
                                            : `tel:${contact.value.replace(/\s/g, '')}`
                                    }
                                    className="text-sm font-bold text-navy-900 hover:text-navy-800 transition-colors font-sans"
                                >
                                    {contact.value}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
