import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RulesCardProps {
    icon: LucideIcon
    title: string
    description: string
    variant?: 'default' | 'highlighted'
    className?: string
}

/**
 * RulesCard Component
 * 
 * Reusable card component for displaying individual rules/guidelines.
 * Follows Design System 2.0 specifications and UX Guidelines.
 * 
 * Design Pattern: Philosophy Cards (from NewsSection)
 * - White background with rounded corners (rounded-3xl)
 * - Shadow elevation on hover (hover:shadow-xl)
 * - Smooth transitions (300ms)
 * - Premium "Ivy League" aesthetic
 * 
 * @see docs/DESIGN_SYSTEM.md - Component Specs
 * @see docs/UX_GUIDELINES.md - Interactivity Requirements
 */
export default function RulesCard({
    icon: Icon,
    title,
    description,
    variant = 'default',
    className
}: RulesCardProps) {
    const isHighlighted = variant === 'highlighted'

    return (
        <div
            className={cn(
                // Base structure from Design System - Philosophy Cards pattern
                'bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group',
                // Card lift on hover (UX requirement: interactivity)
                'hover:-translate-y-1',
                className
            )}
        >
            {/* Icon Container */}
            <div
                className={cn(
                    'relative h-20 flex items-center justify-center',
                    isHighlighted
                        ? 'bg-navy-900/10'
                        : 'bg-navy-900/5'
                )}
            >
                <Icon
                    className={cn(
                        'transition-transform duration-300 group-hover:scale-110',
                        isHighlighted
                            ? 'text-navy-900 h-8 w-8'
                            : 'text-navy-900/70 h-7 w-7'
                    )}
                    strokeWidth={1.5}
                />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Title - Montserrat (font-heading) per Design System */}
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                    {title}
                </h3>

                {/* Description - Inter (font-sans) per Design System */}
                <p className="text-gray-600 font-sans leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}
