'use client'

import { motion } from 'framer-motion'
import { User, Mail, Phone, BookOpen } from 'lucide-react'
import Image from 'next/image'
import type { Tables } from '@/lib/database.types'

type StaffMember = Tables<'staff_members'>

interface StaffCardProps {
    member: StaffMember
    language: 'ru' | 'en'
    variant?: 'large' | 'compact'
}

export default function StaffCard({ member, language, variant = 'compact' }: StaffCardProps) {
    const name = language === 'ru' ? member.name_ru : member.name_en
    const position = language === 'ru' ? member.position_ru : member.position_en
    const bio = language === 'ru' ? member.bio_ru : member.bio_en

    if (variant === 'large') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
                <div className="flex flex-col md:flex-row">
                    {/* Photo */}
                    <div className="relative w-full md:w-56 h-64 md:h-auto bg-gradient-to-br from-navy-100 to-navy-200 flex-shrink-0">
                        {member.photo_url ? (
                            <Image
                                src={member.photo_url}
                                alt={name}
                                fill
                                sizes="(max-width: 768px) 100vw, 224px"
                                unoptimized
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-20 h-20 text-navy-400" strokeWidth={1} />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold font-display text-gray-900 mb-1">
                            {name}
                        </h3>
                        <p className="text-sm font-semibold text-navy-700 uppercase tracking-wider mb-4">
                            {position}
                        </p>

                        {bio && (
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                                {bio}
                            </p>
                        )}

                        {member.subjects && member.subjects.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {member.subjects.map((subject, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-navy-50 text-navy-700 text-xs font-medium rounded-full"
                                    >
                                        <BookOpen className="w-3 h-3" />
                                        {subject}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="inline-flex items-center gap-1.5 hover:text-navy-700 transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    {member.email}
                                </a>
                            )}
                            {member.phone && (
                                <a
                                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                                    className="inline-flex items-center gap-1.5 hover:text-navy-700 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    {member.phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    // Compact variant
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-navy-200 transition-all duration-300"
        >
            {/* Photo */}
            <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200">
                {member.photo_url ? (
                    <Image
                        src={member.photo_url}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        unoptimized
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-300" strokeWidth={1} />
                    </div>
                )}

                {/* Hover overlay with bio */}
                {bio && (
                    <div className="absolute inset-0 bg-navy-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-xs leading-relaxed line-clamp-6">
                            {bio}
                        </p>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4">
                <h4 className="font-bold font-display text-gray-900 text-sm mb-0.5 truncate">
                    {name}
                </h4>
                <p className="text-xs text-gray-500 mb-2 truncate">
                    {position}
                </p>

                {member.subjects && member.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {member.subjects.slice(0, 3).map((subject, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-navy-50 text-navy-600 text-[10px] font-medium rounded-full"
                            >
                                {subject}
                            </span>
                        ))}
                        {member.subjects.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] rounded-full">
                                +{member.subjects.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    )
}
