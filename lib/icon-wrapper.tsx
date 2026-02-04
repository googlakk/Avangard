'use client';

import { Icon } from '@/lib/icons';

interface IconWrapperProps {
    icon: string;
    variant?: 'junior' | 'middle' | 'senior' | 'achievement' | 'navy' | 'white';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    hoverable?: boolean;
}

/**
 * IconWrapper - Универсальный wrapper для иконок с цветными фонами
 * 
 * @param icon - Имя иконки из Lucide (например, 'BookOpen')
 * @param variant - Цветовая схема (junior/middle/senior/achievement/navy/white)
 * @param size - Размер (sm: 40px, md: 64px, lg: 80px, xl: 96px)
 * @param hoverable - Включить hover эффекты
 */
export function IconWrapper({
    icon,
    variant = 'navy',
    size = 'md',
    className = '',
    hoverable = true
}: IconWrapperProps) {
    // Размеры контейнера
    const sizes = {
        sm: 'w-10 h-10',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-24 h-24'
    };

    // Размеры иконки (60% от контейнера)
    const iconSizes = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-14 h-14'
    };

    // Цветовые варианты
    const variants = {
        junior: 'bg-blue-50 text-blue-600 hover:bg-blue-100 group-hover:bg-blue-100',
        middle: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 group-hover:bg-emerald-100',
        senior: 'bg-purple-50 text-purple-600 hover:bg-purple-100 group-hover:bg-purple-100',
        achievement: 'bg-amber-50 text-amber-600 hover:bg-amber-100 group-hover:bg-amber-100',
        navy: 'bg-navy-900/5 text-navy-900 hover:bg-navy-900/10 group-hover:bg-navy-900/10',
        white: 'bg-white text-navy-900 hover:bg-gray-50 group-hover:bg-gray-50 shadow-sm'
    };

    return (
        <div
            className={`
                ${sizes[size]}
                ${variants[variant]}
                rounded-2xl 
                flex items-center justify-center
                transition-all duration-300
                ${hoverable ? 'group-hover:scale-105' : ''}
                ${className}
            `}
        >
            <Icon
                name={icon}
                className={`${iconSizes[size]} stroke-[1.5]`}
            />
        </div>
    );
}
