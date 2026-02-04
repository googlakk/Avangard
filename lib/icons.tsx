import * as LucideIcons from 'lucide-react';

// Маппинг названий иконок к компонентам Lucide React
export type IconName = keyof typeof iconMap;

export const iconMap = {
    // General
    TrendingUp: LucideIcons.TrendingUp,
    Users: LucideIcons.Users,
    Target: LucideIcons.Target,
    Award: LucideIcons.Award,
    Languages: LucideIcons.Languages,
    Sprout: LucideIcons.Sprout,
    BookOpen: LucideIcons.BookOpen,
    GraduationCap: LucideIcons.GraduationCap,
    MessageCircle: LucideIcons.MessageCircle,
    Clock: LucideIcons.Clock,
    Book: LucideIcons.Book,
    Calculator: LucideIcons.Calculator,
    PenTool: LucideIcons.PenTool,
    Globe: LucideIcons.Globe,
    Brain: LucideIcons.Brain,
    Lightbulb: LucideIcons.Lightbulb,
    Grid3x3: LucideIcons.Grid3x3,
    Code2: LucideIcons.Code2,
    Monitor: LucideIcons.Monitor,
    Tablet: LucideIcons.Tablet,
    UtensilsCrossed: LucideIcons.UtensilsCrossed,
    School: LucideIcons.School,
    Trophy: LucideIcons.Trophy,
    Palette: LucideIcons.Palette,
    Cpu: LucideIcons.Cpu,
    Wallet: LucideIcons.Wallet,
    Heart: LucideIcons.Heart,
    User: LucideIcons.User,
    Handshake: LucideIcons.Handshake,
    Shield: LucideIcons.Shield,
    Activity: LucideIcons.Activity,
    Apple: LucideIcons.Apple,
    Home: LucideIcons.Home,
    Backpack: LucideIcons.Backpack,
    Ban: LucideIcons.Ban,
    Salad: LucideIcons.Salad,

    // Middle School
    PhoneOff: LucideIcons.PhoneOff,
    Flame: LucideIcons.Flame,
    Sparkles: LucideIcons.Sparkles,
    Star: LucideIcons.Star,
    MessageSquare: LucideIcons.MessageSquare,
    UserCheck: LucideIcons.UserCheck,

    // Senior School
    Microscope: LucideIcons.Microscope,
    Flag: LucideIcons.Flag,
    FileText: LucideIcons.FileText,
    Zap: LucideIcons.Zap,
    Compass: LucideIcons.Compass,
    Briefcase: LucideIcons.Briefcase,
};

interface IconProps {
    name: string;
    className?: string;
    size?: number;
}

/**
 * Динамический компонент иконки, который рендерит Lucide иконку по названию
 * @param name - Название иконки (например, "Target", "BookOpen")
 * @param className - CSS классы для стилизации
 * @param size - Размер иконки (по умолчанию 24)
 */
export function Icon({ name, className = '', size = 24 }: IconProps) {
    const IconComponent = iconMap[name as IconName];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in iconMap`);
        return null;
    }

    return <IconComponent className={className} size={size} />;
}

/**
 * Получить компонент иконки по названию (для прямого использования)
 */
export function getIcon(name: string): LucideIcons.LucideIcon | null {
    return iconMap[name as IconName] || null;
}
