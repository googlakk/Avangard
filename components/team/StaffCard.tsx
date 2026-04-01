'use client'

import { motion } from 'framer-motion'
import { BookOpen, Mail, Phone, User } from 'lucide-react'
import Image from 'next/image'
import type { Tables } from '@/lib/database.types'

type StaffMember = Tables<'staff_members'>

interface StaffCardProps {
    member: StaffMember
    language: 'ru' | 'en'
    variant?: 'feature' | 'directory'
}

export default function StaffCard({ member, language, variant = 'directory' }: StaffCardProps) {
    const name = language === 'ru' ? member.name_ru : member.name_en
    const position = language === 'ru' ? member.position_ru : member.position_en
    const bio = language === 'ru' ? member.bio_ru : member.bio_en

    if (variant === 'feature') {
        return (
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="group overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_-40px_rgba(15,23,42,0.45)]"
            >
                <div className="relative aspect-[4/4.8] overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200">
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent" />
                    {member.photo_url ? (
                        <Image
                            src={member.photo_url}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            unoptimized
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <User className="h-24 w-24 text-navy-300" strokeWidth={1} />
                        </div>
                    )}
                </div>

                <div className="space-y-4 p-6 md:p-7">
                    <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-navy-600/80">
                            {language === 'ru' ? 'Руководство' : 'Leadership'}
                        </p>
                        <h3 className="font-serif text-2xl font-semibold leading-tight text-slate-900 md:text-[2rem]">
                            {name}
                        </h3>
                        <p className="text-sm font-medium tracking-[0.08em] text-slate-600">
                            {position}
                        </p>
                    </div>

                    {bio && (
                        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                            {bio}
                        </p>
                    )}

                    {member.subjects && member.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {member.subjects.slice(0, 3).map((subject, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900"
                                >
                                    <BookOpen className="h-3 w-3" />
                                    {subject}
                                </span>
                            ))}
                        </div>
                    )}

                    {(member.email || member.phone) && (
                        <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-4 text-sm text-slate-500">
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="inline-flex items-center gap-1.5 transition-colors hover:text-navy-700"
                                >
                                    <Mail className="h-4 w-4" />
                                    {member.email}
                                </a>
                            )}
                            {member.phone && (
                                <a
                                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                                    className="inline-flex items-center gap-1.5 transition-colors hover:text-navy-700"
                                >
                                    <Phone className="h-4 w-4" />
                                    {member.phone}
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </motion.article>
        )
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="group overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_18px_48px_-36px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-[0_28px_70px_-38px_rgba(15,23,42,0.45)]"
        >
            <div className="relative aspect-[4/4.7] overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200">
                {member.photo_url ? (
                    <Image
                        src={member.photo_url}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        unoptimized
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <User className="h-16 w-16 text-slate-300" strokeWidth={1} />
                    </div>
                )}

                {bio && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/65 to-transparent px-4 pb-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="line-clamp-4 text-xs leading-5 text-white/90">
                            {bio}
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-3 p-5">
                <div className="space-y-1.5">
                    <h4 className="font-serif text-xl font-semibold leading-tight text-slate-900">
                        {name}
                    </h4>
                    <p className="text-sm font-medium leading-5 text-slate-600">
                        {position}
                    </p>
                </div>

                {member.subjects && member.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {member.subjects.slice(0, 2).map((subject, i) => (
                            <span
                                key={i}
                                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                            >
                                {subject}
                            </span>
                        ))}
                        {member.subjects.length > 2 && (
                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800">
                                +{member.subjects.length - 2}
                            </span>
                        )}
                    </div>
                )}

                {(member.email || member.phone) && (
                    <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="inline-flex items-center gap-1.5 transition-colors hover:text-navy-700"
                            >
                                <Mail className="h-3.5 w-3.5" />
                                {language === 'ru' ? 'Почта' : 'Email'}
                            </a>
                        )}
                        {member.phone && (
                            <a
                                href={`tel:${member.phone.replace(/\s/g, '')}`}
                                className="inline-flex items-center gap-1.5 transition-colors hover:text-navy-700"
                            >
                                <Phone className="h-3.5 w-3.5" />
                                {language === 'ru' ? 'Телефон' : 'Phone'}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    )
}
