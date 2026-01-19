export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
    title: string;
    description: string;
    image?: string;
    icon?: string;
    badge?: string;
    buttonText?: string;
    className?: string;
    style?: React.CSSProperties;
}

export interface NavLink {
    href: string;
    label: string;
}

export interface Feature {
    title: string;
    description: string;
    icon: string;
}
