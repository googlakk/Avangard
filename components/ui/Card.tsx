import { cn } from '@/lib/utils';
import { IconWrapper } from '@/lib/icon-wrapper';
import Image from 'next/image';
interface CardProps {
    title: string;
    description: string;
    image?: string;
    icon?: string;
    badge?: string;
    buttonText?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function Card({ title, description, image, icon, badge, buttonText, className, style }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group',
                className
            )}
            style={style}
        >
            {image && (
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {badge && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                {badge}
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div className="p-6">
                {icon && (
                    <div className="mb-4">
                        <div className="w-14 h-14 rounded-xl bg-navy-900 flex items-center justify-center">
                            <IconWrapper icon={icon} variant="navy" size="sm" />
                        </div>
                    </div>
                )}

                <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

                {buttonText && (
                    <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg">
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}
