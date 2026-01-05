import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

export default function Card({ title, description, image, icon, className, style }: CardProps) {
    return (
        <div
            className={cn(
                'glass rounded-2xl p-6 hover-lift transition-all',
                'border border-white/10 hover:border-white/20',
                className
            )}
            style={style}
        >
            {image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={image} alt={title} className="w-full h-48 object-cover" />
                </div>
            )}

            {icon && (
                <div className="mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-3xl">
                        {icon}
                    </div>
                </div>
            )}

            <h3 className="font-heading font-bold text-xl mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
}
