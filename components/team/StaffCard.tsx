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
    const leadershipLabel = language === 'ru' ? 'Руководство' : 'Leadership'
    const subjectsLabel = language === 'ru' ? 'Предметы' : 'Subjects'
    const contactLabel = language === 'ru' ? 'Контакты' : 'Contacts'

    if (variant === 'feature') {
        return (
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="group relative w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_56px_-44px_rgba(15,23,42,0.32)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-46px_rgba(15,23,42,0.4)]"
            >
                <div className="relative z-10 flex h-full flex-col">
                    <div className="relative aspect-[4/4.25] overflow-hidden bg-slate-100">
                        <div className="absolute inset-x-0 top-0 z-10 h-18 bg-gradient-to-b from-navy-950/12 to-transparent" />
                        {member.photo_url ? (
                            <Image
                                src={member.photo_url}
                                alt={name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                unoptimized
                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                                <User className="h-24 w-24 text-slate-300" strokeWidth={1} />
                            </div>
                        )}

                        <div className="absolute left-4 top-4 z-20">
                            <span className="inline-flex items-center rounded-full border border-white/65 bg-white/88 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy-900 backdrop-blur-sm">
                                {leadershipLabel}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4.5 p-6">
                        <div className="space-y-2.5">
                            <div className="h-px w-12 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
                            <h3 className="font-display text-[27px] font-semibold leading-[1.08] text-navy-950">
                                {name}
                            </h3>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                {position}
                            </p>
                        </div>

                        {bio && (
                            <p className="line-clamp-3 text-[14px] leading-6 text-slate-600">
                                {bio}
                            </p>
                        )}

                        {member.subjects && member.subjects.length > 0 && (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
                                <div className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    <BookOpen className="h-3.5 w-3.5 text-amber-700" />
                                    {subjectsLabel}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {member.subjects.slice(0, 3).map((subject, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                                        >
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(member.email || member.phone) && (
                            <div className="mt-auto rounded-2xl border border-navy-100 bg-navy-50/55 p-3.5">
                                <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-700">
                                    {contactLabel}
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                                {member.email && (
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3 py-2 hover:border-navy-200 hover:bg-navy-100/40 transition-colors duration-200"
                                    >
                                        <Mail className="h-4 w-4 text-navy-700" />
                                        <span className="hidden sm:inline text-slate-700">{member.email}</span>
                                        <span className="sm:hidden text-slate-700">{language === 'ru' ? 'Почта' : 'Email'}</span>
                                    </a>
                                )}
                                {member.phone && (
                                    <a
                                        href={`tel:${member.phone.replace(/\s/g, '')}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3 py-2 hover:border-navy-200 hover:bg-navy-100/40 transition-colors duration-200"
                                    >
                                        <Phone className="h-4 w-4 text-navy-700" />
                                        <span className="hidden sm:inline text-slate-700">{member.phone}</span>
                                        <span className="sm:hidden text-slate-700">{language === 'ru' ? 'Телефон' : 'Phone'}</span>
                                    </a>
                                )}
                                </div>
                            </div>
                        )}
                    </div>
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
            className="group relative w-full overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_42px_-38px_rgba(15,23,42,0.34)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_-40px_rgba(15,23,42,0.4)]"
        >
            <div className="relative z-10 flex h-full flex-col">
                <div className="relative aspect-[4/4.45] overflow-hidden bg-slate-100">
                    <div className="absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-navy-950/10 to-transparent" />
                    {member.photo_url ? (
                        <Image
                            src={member.photo_url}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            unoptimized
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <User className="h-20 w-20 text-slate-300" strokeWidth={1} />
                        </div>
                    )}

                    <div className="absolute left-3.5 top-3.5 z-20">
                        <span className="inline-flex items-center rounded-full border border-white/70 bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy-900 backdrop-blur-sm">
                            {position}
                        </span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                    <div className="space-y-2">
                        <div className="h-px w-10 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
                        <div className="space-y-2">
                            <h4 className="font-display text-[24px] font-semibold leading-[1.12] text-navy-950 transition-colors group-hover:text-navy-900">
                                {name}
                            </h4>
                            <p className="text-[13px] font-medium leading-5 text-slate-500">
                                {position}
                            </p>
                        </div>
                    </div>

                    {bio && (
                        <p className="line-clamp-3 text-[13px] leading-6 text-slate-600">
                            {bio}
                        </p>
                    )}

                    {member.subjects && member.subjects.length > 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                            <div className="mb-2.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                <BookOpen className="h-3.5 w-3.5 text-amber-700" />
                                {subjectsLabel}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {member.subjects.slice(0, 2).map((subject, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700"
                                    >
                                        {subject}
                                    </span>
                                ))}
                                {member.subjects.length > 2 && (
                                    <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-800">
                                        +{member.subjects.length - 2}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {(member.email || member.phone) && (
                        <div className="mt-auto rounded-2xl border border-navy-100 bg-navy-50/55 p-3">
                            <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-700">
                                {contactLabel}
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {member.email && (
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-3 py-2 text-xs text-slate-700 hover:border-navy-200 hover:bg-navy-100/40 transition-all duration-200"
                                        title={member.email}
                                    >
                                        <Mail className="h-3.5 w-3.5 flex-shrink-0 text-navy-700" />
                                        <span>{language === 'ru' ? 'Почта' : 'Email'}</span>
                                    </a>
                                )}
                                {member.phone && (
                                    <a
                                        href={`tel:${member.phone.replace(/\s/g, '')}`}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-3 py-2 text-xs text-slate-700 hover:border-navy-200 hover:bg-navy-100/40 transition-all duration-200"
                                        title={member.phone}
                                    >
                                        <Phone className="h-3.5 w-3.5 flex-shrink-0 text-navy-700" />
                                        <span>{language === 'ru' ? 'Телефон' : 'Phone'}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    )
}
