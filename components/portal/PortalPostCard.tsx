'use client'


import { motion } from 'framer-motion'
import { ExternalLink, Calendar } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Tables } from '@/lib/database.types'

type PortalPost = Tables<'portal_posts'>

const categoryColors: Record<string, { bg: string; text: string }> = {
    event: { bg: 'bg-blue-50', text: 'text-blue-700' },
    course: { bg: 'bg-purple-50', text: 'text-purple-700' },
    seminar: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
    platform: { bg: 'bg-amber-50', text: 'text-amber-700' },
    announcement: { bg: 'bg-navy-50', text: 'text-navy-700' },
    resource: { bg: 'bg-rose-50', text: 'text-rose-700' },
}

const categoryLabels: Record<string, { ru: string; en: string }> = {
    event: { ru: 'Мероприятие', en: 'Event' },
    course: { ru: 'Курс', en: 'Course' },
    seminar: { ru: 'Семинар', en: 'Seminar' },
    platform: { ru: 'Платформа', en: 'Platform' },
    announcement: { ru: 'Анонс', en: 'Announcement' },
    resource: { ru: 'Ресурс', en: 'Resource' },
}

export default function PortalPostCard({ post, index }: { post: PortalPost; index: number }) {
    const { language } = useLanguage()
    const title = language === 'en' ? post.title_en : post.title_ru
    const description = language === 'en' ? post.description_en : post.description_ru
    const catColors = categoryColors[post.category] || categoryColors.announcement
    const catLabel = categoryLabels[post.category]?.[language] || post.category

    const publishedDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null

    const Wrapper = post.link_url ? 'a' : 'div'
    const wrapperProps = post.link_url
        ? { href: post.link_url, target: '_blank', rel: 'noopener noreferrer' }
        : {}

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
        >
            <Wrapper
                {...(wrapperProps as any)}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#C6A96B]/40 transition-all duration-300"
            >
                {/* Image */}
                {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.image_url}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors.bg} ${catColors.text}`}>
                            {catLabel}
                        </span>
                        {publishedDate && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {publishedDate}
                            </span>
                        )}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-navy-900 mb-2 line-clamp-2 group-hover:text-[#C6A96B] transition-colors">
                        {title}
                    </h3>

                    {description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {description}
                        </p>
                    )}

                    {post.link_url && (
                        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#C6A96B]">
                            <ExternalLink className="w-4 h-4" />
                            {language === 'ru' ? 'Перейти' : 'Visit'}
                        </div>
                    )}
                </div>
            </Wrapper>
        </motion.div>
    )
}
