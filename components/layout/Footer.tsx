'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://instagram.com/intellect_pro_school',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-3.77 1.983c-1.047.048-1.614.23-1.992.377-.492.193-.846.425-1.222.8-.375.376-.607.73-.8 1.223-.147.377-.329.945-.377 1.992-.048 1.053-.058 1.37-.058 4.02v.185c0 2.651.01 2.967.058 4.02.048 1.047.23 1.614.377 1.992.193.492.425.846.8 1.222.376.375.73.607 1.223.8.377.147.945.329 1.992.377 1.053.048 1.37.058 4.02.058h.185c2.651 0 2.967-.01 4.02-.058 1.047-.048 1.614-.23 1.992-.377.492-.193.846-.425 1.222-.8.375-.376.607-.73.8-1.223.147-.377.329-.945.377-1.992.048-1.053.058-1.37.058-4.02v-.185c0-2.651-.01-2.967-.058-4.02-.048-1.047-.23-1.614-.377-1.992-.193-.492-.425-.846-.8-1.222-.376-.375-.73-.607-1.223-.8-.377-.147-.945-.329-1.992-.377-1.053-.048-1.37-.058-4.02-.058h-.185c-2.651 0-2.967.01-4.02.058zM12 6.666a5.334 5.334 0 100 10.668 5.334 5.334 0 000-10.668zm0 1.908a3.425 3.425 0 110 6.85 3.425 3.425 0 010-6.85zm5.325-3.876a1.275 1.275 0 110 2.55 1.275 1.275 0 010-2.55z" clipRule="evenodd" />
                </svg>
            ),
        },
        {
            name: 'Facebook',
            href: 'https://facebook.com/intellectproschool',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
            ),
        },
        {
            name: 'WhatsApp',
            href: 'https://wa.me/996555123456',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
        },
        {
            name: 'Telegram',
            href: 'https://t.me/intellectproschool',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            href: 'https://youtube.com/@intellectproschool',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-navy-900 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="inline-block mb-6 group">
                            <Image
                                src="/logo.png"
                                alt="INTELLECT INTERNATIONAL SCHOOL"
                                width={1024}
                                height={190}
                                className="h-10 md:h-12 w-auto transition-opacity duration-300 group-hover:opacity-80"
                            />
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Элитная частная школа в Бишкеке. Воспитываем лидеров будущего с 2016 года, объединяя традиции и инновации.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                                    aria-label={`Следите за нами в ${item.name}`}
                                    title={item.name}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Vertical separator for large screens */}
                    <div className="hidden lg:block absolute left-1/4 h-40 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                    {/* Navigation */}
                    <div>
                        <h3 className="font-heading text-white text-lg font-semibold mb-6 relative inline-block">
                            Навигация
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    {t.header.home}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    {t.header.about}
                                </Link>
                            </li>
                            <li>
                                <Link href="/programs" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    {t.header.programs}
                                </Link>
                            </li>
                            <li>
                                <Link href="/teachers" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Преподаватели
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    {t.header.contacts}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Programs (Placeholder for now based on design) */}
                    <div>
                        <h3 className="font-heading text-white text-lg font-semibold mb-6 relative inline-block">
                            Программы
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/programs#memory" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Память и Внимание
                                </Link>
                            </li>
                            <li>
                                <Link href="/programs#critical" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Критическое мышление
                                </Link>
                            </li>
                            <li>
                                <Link href="/programs#languages" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Иностранные языки
                                </Link>
                            </li>
                            <li>
                                <Link href="/programs#steam" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    STEAM Лаборатории
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h3 className="font-heading text-white text-lg font-semibold mb-6 relative inline-block">
                            {t.header.contacts}
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-400">
                                    г. Бишкек, ул. Джунусалиева, 177/1
                                    <br />
                                    ул. А. Бакаева, 119
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="text-gray-400">
                                    <a href="tel:+996705889889" className="hover:text-white transition-colors block">
                                        +996 705 889 889
                                    </a>
                                    <a href="tel:+996778889889" className="hover:text-white transition-colors block">
                                        +996 778 889 889
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@intellect.kg" className="text-gray-400 hover:text-white transition-colors">
                                    info@intellect.kg
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Enhanced separator with gradient */}
                <div className="relative pt-8 mt-8">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-gray-500 text-sm text-center">
                        © {currentYear} Intellect Pro School. {t.footer.rights}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
