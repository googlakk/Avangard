'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ruLocale from '@/locales/ru.json'
import enLocale from '@/locales/en.json'
import {
    ArrowLeft,
    ArrowUp,
    ArrowDown,
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Loader2,
    Eye,
    EyeOff,
    ExternalLink,
    Search,
    CheckCircle2,
    AlertTriangle,
    Upload,
} from 'lucide-react'
import {
    canTransitionPageStatus,
    createCmsPage,
    createCmsSection,
    deleteCmsPage,
    deleteCmsSection,
    getCmsPageBySlug,
    listCmsPages,
    listCmsSections,
    reorderCmsSections,
    updateCmsPage,
    updateCmsSection,
    type CmsPageRecord,
    type CmsPageStatus,
    type CmsSectionRecord,
    type CmsSectionType,
} from '@/lib/services/page-builder'
import { DEFAULT_SEO_META, getSeoMeta, upsertSeoMeta } from '@/lib/services/seo'
import {
    getCognitiveFoundationFeatures,
    getGalleryImages,
    getJuniorHeroData,
    getLifestyleCareFeatures,
    getLifestyleCarePhotoProof,
    getMotivationCultureFeatures,
    getMotivationCulturePhotoProof,
    testimonials as juniorTestimonials,
} from '@/lib/data/junior-program'
import {
    getAcademicBreakthroughData,
    getDisciplineEnvironmentData,
    getLeadershipGovernanceData,
    getMiddleCTAData,
    getTwentyFirstSkillsData,
} from '@/lib/data/middle-program'
import {
    getAcademicResultsData,
    getCognitiveAIData,
    getSelectiveAdmissionData,
    getSeniorOfferData,
} from '@/lib/data/senior-program'

interface PageForm {
    slug: string
    title_ru: string
    title_en: string
    status: CmsPageStatus
    version: number
    scheduled_at: string
    published_at: string
    seo_title: string
    seo_description: string
    canonical_url: string
    og_image_url: string
    robots_index: boolean
    robots_follow: boolean
    structured_data_enabled: boolean
    structured_data_type: string
}

interface SectionForm {
    key: string
    type: CmsSectionType
    payloadText: string
    is_enabled: boolean
}

interface PayloadValidationResult {
    errors: string[]
    warnings: string[]
}

interface ProgramPagePreset {
    slug: string
    title_ru: string
    title_en: string
    publicPath: string
}

const emptyPageForm: PageForm = {
    slug: '',
    title_ru: '',
    title_en: '',
    status: 'draft',
    version: 1,
    scheduled_at: '',
    published_at: '',
    seo_title: DEFAULT_SEO_META.seo_title,
    seo_description: DEFAULT_SEO_META.seo_description,
    canonical_url: DEFAULT_SEO_META.canonical_url,
    og_image_url: DEFAULT_SEO_META.og_image_url,
    robots_index: DEFAULT_SEO_META.robots_index,
    robots_follow: DEFAULT_SEO_META.robots_follow,
    structured_data_enabled: DEFAULT_SEO_META.structured_data_enabled,
    structured_data_type: DEFAULT_SEO_META.structured_data_type,
}

const emptySectionForm: SectionForm = {
    key: '',
    type: 'content',
    payloadText: '{\n  "ru": "",\n  "en": ""\n}',
    is_enabled: true,
}

const PROGRAM_PAGE_PRESETS: ProgramPagePreset[] = [
    {
        slug: 'program-primary',
        title_ru: 'Intellect Primary',
        title_en: 'Intellect Primary',
        publicPath: '/programs/primary',
    },
    {
        slug: 'program-middle',
        title_ru: 'Intellect Middle',
        title_en: 'Intellect Middle',
        publicPath: '/programs/middle',
    },
    {
        slug: 'program-senior',
        title_ru: 'Intellect Senior',
        title_en: 'Intellect Senior',
        publicPath: '/programs/senior',
    },
    {
        slug: 'student-results',
        title_ru: 'Результаты наших учеников',
        title_en: 'Our Students Results',
        publicPath: '/students/results',
    },
    {
        slug: 'about',
        title_ru: 'О нас',
        title_en: 'About Us',
        publicPath: '/about',
    },
]

const PROGRAM_PAGE_SLUGS = new Set(PROGRAM_PAGE_PRESETS.map(item => item.slug))
const PROGRAM_PAGE_PATHS = new Map(PROGRAM_PAGE_PRESETS.map(item => [item.slug, item.publicPath]))
const PRIMARY_TYPED_SECTION_KEYS = new Set([
    'junior-hero',
    'junior-gallery',
    'junior-cta',
    'junior-lifestyle-care-proof',
    'junior-motivation-atmosphere-proof',
    'junior-lifestyle-care-features',
    'junior-cognitive-foundation',
    'junior-motivation-atmosphere-features',
    'junior-testimonials',
])

const MIDDLE_TYPED_SECTION_KEYS = new Set([
    'middle-academic-breakthrough',
    'middle-discipline-environment',
    'middle-twenty-first-skills',
    'middle-leadership-governance',
    'middle-cta',
])

const SENIOR_TYPED_SECTION_KEYS = new Set([
    'senior-offer',
    'senior-academic-results',
    'senior-cognitive-ai',
    'senior-selective-admission',
])

const RESULTS_TYPED_SECTION_KEYS = new Set([
    'results-hero',
    'results-grid',
    'results-cta',
])

const ABOUT_TYPED_SECTION_KEYS = new Set([
    'about-hero',
    'about-story',
    'about-values',
    'about-stats',
    'about-cta',
])

const SECTION_PAYLOAD_TEMPLATES: Record<CmsSectionType, Record<string, unknown>> = {
    hero: {
        title: { ru: 'Заголовок Hero', en: 'Hero Title' },
        subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
        description: { ru: 'Описание программы', en: 'Program description' },
        imageUrl: '/images/junior-morning-exercise.jpg',
        button: {
            label: { ru: 'Подать заявку', en: 'Apply now' },
            href: '/parents/admission',
        },
    },
    content: {
        title: { ru: 'Заголовок секции', en: 'Section title' },
        text: { ru: 'Текст секции', en: 'Section text' },
        imageUrl: '/images/middle-entrance-group.jpg',
        imageAlt: { ru: 'Изображение секции', en: 'Section image' },
    },
    cards: {
        title: { ru: 'Карточки', en: 'Cards' },
        items: [
            {
                badge: { ru: 'Бейдж', en: 'Badge' },
                title: { ru: 'Заголовок 1', en: 'Card 1' },
                description: { ru: 'Описание 1', en: 'Description 1' },
                imageUrl: '/images/senior-medalists.jpg',
            },
        ],
    },
    cta: {
        title: { ru: 'Готовы начать?', en: 'Ready to start?' },
        description: { ru: 'Краткое описание CTA', en: 'Short CTA description' },
        button: {
            label: { ru: 'Связаться', en: 'Contact us' },
            href: '/contacts',
        },
    },
    media: {
        title: { ru: 'Фотогалерея', en: 'Photo gallery' },
        images: [
            { url: '/images/junior-morning-exercise.jpg', alt: { ru: 'Фото 1', en: 'Image 1' } },
            { url: '/images/middle-entrance-group.jpg', alt: { ru: 'Фото 2', en: 'Image 2' } },
        ],
    },
    custom: {
        title: { ru: 'Кастомный блок', en: 'Custom block' },
        text: { ru: 'Свободный контент', en: 'Freeform content' },
    },
}

const PROGRAM_SECTION_KEYS: Record<string, Array<{ key: string; type: CmsSectionType }>> = {
    'program-primary': [
        { key: 'junior-hero', type: 'hero' },
        { key: 'junior-lifestyle-care-features', type: 'cards' },
        { key: 'junior-lifestyle-care-proof', type: 'media' },
        { key: 'junior-cognitive-foundation', type: 'cards' },
        { key: 'junior-motivation-atmosphere-features', type: 'cards' },
        { key: 'junior-motivation-atmosphere-proof', type: 'media' },
        { key: 'junior-gallery', type: 'media' },
        { key: 'junior-testimonials', type: 'cards' },
        { key: 'junior-cta', type: 'cta' },
    ],
    'program-middle': [
        { key: 'middle-academic-breakthrough', type: 'hero' },
        { key: 'middle-discipline-environment', type: 'cards' },
        { key: 'middle-twenty-first-skills', type: 'cards' },
        { key: 'middle-leadership-governance', type: 'cards' },
        { key: 'middle-cta', type: 'cta' },
    ],
    'program-senior': [
        { key: 'senior-offer', type: 'hero' },
        { key: 'senior-academic-results', type: 'cards' },
        { key: 'senior-cognitive-ai', type: 'cards' },
        { key: 'senior-selective-admission', type: 'cta' },
    ],
    'student-results': [
        { key: 'results-hero', type: 'hero' },
        { key: 'results-grid', type: 'cards' },
        { key: 'results-cta', type: 'cta' },
    ],
    'about': [
        { key: 'about-hero', type: 'hero' },
        { key: 'about-story', type: 'content' },
        { key: 'about-values', type: 'cards' },
        { key: 'about-stats', type: 'cards' },
        { key: 'about-cta', type: 'cta' },
    ],
}

const PROGRAM_SECTION_PAYLOAD_PRESETS: Record<string, unknown> = {
    'junior-hero': {
        title: { ru: 'Заголовок Hero', en: 'Hero title' },
        subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
        description: { ru: 'Описание', en: 'Description' },
        ctaText: { ru: 'Подать заявку', en: 'Apply now' },
        ctaLink: '/admissions',
        backgroundImage: '/images/junior-morning-exercise.jpg',
        badge: { ru: '1-4 классы', en: 'Grades 1-4' },
    },
    'junior-lifestyle-care-features': [
        {
            icon: 'Backpack',
            title: { ru: 'Заголовок', en: 'Title' },
            subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
            description: [{ ru: 'Пункт 1', en: 'Point 1' }],
            backgroundImage: '/images/junior-morning-exercise.jpg',
            benefit: { ru: 'Польза', en: 'Benefit' },
        },
    ],
    'junior-lifestyle-care-proof': {
        images: [{ src: '/images/junior-morning-exercise.jpg', caption: { ru: 'Подпись', en: 'Caption' } }],
        message: { ru: 'Сообщение', en: 'Message' },
    },
    'junior-cognitive-foundation': [
        {
            icon: 'Brain',
            title: { ru: 'Заголовок', en: 'Title' },
            subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
            description: [{ ru: 'Пункт 1', en: 'Point 1' }],
        },
    ],
    'junior-motivation-atmosphere-features': [
        {
            icon: 'Wallet',
            title: { ru: 'Заголовок', en: 'Title' },
            subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
            description: [{ ru: 'Пункт 1', en: 'Point 1' }],
            example: { ru: 'Пример', en: 'Example' },
        },
    ],
    'junior-motivation-atmosphere-proof': {
        image: '/images/junior-morning-exercise.jpg',
        caption: { ru: 'Подпись', en: 'Caption' },
    },
    'junior-gallery': [
        {
            src: '/images/junior-morning-exercise.jpg',
            alt: { ru: 'Фото', en: 'Image' },
            category: 'classroom',
        },
    ],
    'junior-testimonials': [
        {
            parentName: { ru: 'Имя родителя', en: 'Parent Name' },
            childName: { ru: 'Имя ребенка', en: 'Child Name' },
            childGrade: { ru: 'Класс', en: 'Grade' },
            quote: { ru: 'Отзыв', en: 'Quote' },
            photo: '/images/junior-morning-exercise.jpg',
        },
    ],
    'junior-cta': {
        title: { ru: 'Готовы дать своему ребенку лучший старт?', en: 'Ready to give your child the best start?' },
        description: { ru: 'Запишитесь на индивидуальную экскурсию', en: 'Book an individual school tour' },
        primaryText: { ru: 'Записаться на экскурсию', en: 'Book a tour' },
        primaryLink: '/admissions',
        secondaryText: { ru: 'Скачать брошюру', en: 'Download brochure' },
        secondaryLink: '/downloads/junior-brochure.pdf',
    },
    'middle-academic-breakthrough': {
        title: { ru: 'Академический прорыв', en: 'Academic breakthrough' },
        subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
        description: { ru: 'Описание блока', en: 'Section description' },
        ctaText: { ru: 'Поступить', en: 'Apply' },
        ctaLink: '/admissions',
        backgroundImage: '/images/middle-entrance-group.jpg',
    },
    'middle-discipline-environment': {
        title: { ru: 'Дисциплина и среда', en: 'Discipline and environment' },
        subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
        proofImage: '/images/Гимн абду.png',
        proofCaption: { ru: 'Подпись к фото', en: 'Photo caption' },
        features: [
            {
                icon: 'PhoneOff',
                title: { ru: 'Фича', en: 'Feature' },
                description: { ru: 'Описание', en: 'Description' },
                highlight: { ru: 'Акцент', en: 'Highlight' },
            },
        ],
    },
    'middle-twenty-first-skills': {
        title: { ru: 'Навыки XXI века', en: '21st century skills' },
        subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
        proofImage: '/images/middle-entrance-group.jpg',
        proofCaption: { ru: 'Подпись', en: 'Caption' },
        skills: [
            {
                icon: 'Code2',
                title: { ru: 'Навык', en: 'Skill' },
                description: { ru: 'Описание', en: 'Description' },
            },
        ],
    },
    'middle-leadership-governance': {
        title: { ru: 'Лидерство', en: 'Leadership' },
        subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
        ctaText: { ru: 'Поступить', en: 'Apply' },
        ctaLink: '/admissions',
        proofImage: '/images/middle-entrance-group.jpg',
        proofCaption: { ru: 'Подпись', en: 'Caption' },
        features: [
            {
                icon: 'Target',
                title: { ru: 'Фича', en: 'Feature' },
                description: { ru: 'Описание', en: 'Description' },
            },
        ],
    },
    'middle-cta': {
        title: { ru: 'Готовы начать?', en: 'Ready to start?' },
        description: { ru: 'Описание CTA', en: 'CTA description' },
        primaryCTA: { text: { ru: 'Поступить', en: 'Apply' }, link: '/admissions' },
        secondaryCTA: { text: { ru: 'Скачать брошюру', en: 'Download brochure' }, link: '/downloads/middle-brochure.pdf' },
    },
    'senior-offer': {
        headline: { ru: 'Путь в ведущие университеты мира', en: 'Path to top universities worldwide' },
        subheadline: { ru: 'International High School • Grades 10-11', en: 'International High School • Grades 10-11' },
        ctaText: { ru: 'Поступить', en: 'Apply' },
        ctaLink: '/contacts',
        backgroundImage: '/images/sen-hero.jpg',
        scrollText: { ru: 'Листайте вниз', en: 'Scroll down' },
    },
    'senior-academic-results': {
        headline: { ru: 'Академические результаты', en: 'Academic results' },
        description: { ru: 'Описание блока', en: 'Section description' },
        timeframe: { ru: '2 года', en: '2 years' },
        proofImage: '/images/senior-medalists.jpg',
        proofCaption: { ru: 'Подпись к фото', en: 'Photo caption' },
        bottomStrong: { ru: 'Сильный результат.', en: 'Strong outcome.' },
        bottomText: { ru: 'Дополнительный текст', en: 'Additional text' },
        pillars: [
            {
                icon: 'Globe',
                title: { ru: 'Pillar', en: 'Pillar' },
                description: { ru: 'Описание', en: 'Description' },
                details: [{ ru: 'Пункт 1', en: 'Point 1' }],
            },
        ],
    },
    'senior-cognitive-ai': {
        headline: { ru: 'Когнитивное превосходство', en: 'Cognitive superiority' },
        hook: { ru: 'Ключевая мысль', en: 'Key message' },
        proofImage: '/images/senior-medalists.jpg',
        proofCaption: { ru: 'Подпись', en: 'Caption' },
        bottomTitle: { ru: 'Итог', en: 'Bottom title' },
        bottomText: { ru: 'Описание', en: 'Bottom text' },
        advantages: [
            {
                title: { ru: 'Преимущество', en: 'Advantage' },
                tagline: { ru: 'Тэглайн', en: 'Tagline' },
                description: { ru: 'Описание', en: 'Description' },
                benefits: [{ ru: 'Польза', en: 'Benefit' }],
            },
        ],
    },
    'senior-selective-admission': {
        headline: { ru: 'Селективный набор', en: 'Selective admission' },
        filterMessage: { ru: 'Сообщение о фильтре', en: 'Filter message' },
        communityPromise: { ru: 'Обещание сообщества', en: 'Community promise' },
        ctaText: { ru: 'Поступить', en: 'Apply' },
        ctaLink: '/contacts',
        communityValues: [{ ru: 'Ценность', en: 'Value' }],
        proofImage: '/images/senior-medalists.jpg',
        subText: { ru: 'Доп. текст', en: 'Subtext' },
        proofCaption: { ru: 'Подпись', en: 'Caption' },
        bottomBoxTitle: { ru: 'Итог', en: 'Bottom title' },
        bottomBoxText: { ru: 'Описание', en: 'Bottom text' },
    },
    'results-hero': {
        eyebrow: { ru: 'Гордость школы', en: 'School pride' },
        title: { ru: 'Результаты наших учеников', en: 'Outstanding Results of Our Students' },
        subtitle: {
            ru: 'Истории достижений, которые подтверждают качество академической среды и персонального сопровождения в Intellect School.',
            en: 'Achievement stories that prove the strength of our academic environment and personalized guidance.',
        },
        backgroundImageUrl: '/images/senior-medalists.jpg',
        kpis: [
            {
                studentName: { ru: 'Международные победы', en: 'International wins' },
                resultText: { ru: '25+', en: '25+' },
            },
            {
                studentName: { ru: 'Высокие IELTS', en: 'Top IELTS scores' },
                resultText: { ru: '8.5', en: '8.5' },
            },
            {
                studentName: { ru: 'Поступления в топ-вузы', en: 'Top university admits' },
                resultText: { ru: '40+', en: '40+' },
            },
            {
                studentName: { ru: 'Олимпиадные призеры', en: 'Olympiad awardees' },
                resultText: { ru: '60+', en: '60+' },
            },
        ],
    },
    'results-grid': {
        title: { ru: 'Список достижений учеников', en: 'Student Achievement List' },
        description: {
            ru: 'Каждая карточка отражает конкретный результат ученика: экзамены, олимпиады, международные конкурсы и проектные победы.',
            en: 'Each card highlights a measurable outcome: exams, olympiads, international competitions, and project wins.',
        },
        emptyTitle: { ru: 'Добавьте первые карточки достижений', en: 'Add the first achievement cards' },
        emptyDescription: {
            ru: 'После публикации карточек в админке они появятся в этой сетке автоматически.',
            en: 'Published cards from the admin panel will appear here automatically.',
        },
        items: [
            {
                studentName: { ru: 'Алина С.', en: 'Alina S.' },
                achievementTitle: { ru: 'IELTS Academic', en: 'IELTS Academic' },
                resultText: { ru: 'Overall 8.5', en: 'Overall 8.5' },
                description: {
                    ru: 'Поступление на международную программу с высоким проходным баллом.',
                    en: 'Admitted to an international program with a high entry threshold.',
                },
                category: { ru: 'Экзамены', en: 'Exams' },
                year: 2025,
                imageUrl: '/images/senior-medalists.jpg',
                imageAlt: { ru: 'Ученик с сертификатом IELTS', en: 'Student with IELTS certificate' },
                isFeatured: true,
                isEnabled: true,
                profileUrl: '/contacts',
            },
            {
                studentName: { ru: 'Команда Intellect', en: 'Intellect Team' },
                achievementTitle: { ru: 'Республиканская олимпиада по математике', en: 'National Math Olympiad' },
                resultText: { ru: '1 место', en: '1st place' },
                description: {
                    ru: 'Победа в финале и выход на международный этап соревнований.',
                    en: 'Final victory and qualification for the international stage.',
                },
                category: { ru: 'Олимпиады', en: 'Olympiads' },
                year: 2025,
                imageUrl: '/images/middle-entrance-group.jpg',
                imageAlt: { ru: 'Команда победителей олимпиады', en: 'Olympiad winner team' },
                isEnabled: true,
            },
        ],
    },
    'results-cta': {
        title: { ru: 'Хотите, чтобы ваш ребенок был следующим в этом списке?', en: 'Want your child to be next on this list?' },
        description: {
            ru: 'Запишитесь на консультацию и узнайте, как выстроить персональную траекторию роста.',
            en: 'Book a consultation to build a personalized growth path.',
        },
        button: {
            label: { ru: 'Записаться на консультацию', en: 'Book a consultation' },
            href: '/contacts',
        },
    },
    'about-hero': {
        title: { ru: 'Формируем будущее сегодня', en: 'Shaping the future today' },
        subtitle: { ru: 'О нас', en: 'About us' },
        description: {
            ru: 'INTELLECT SCHOOL — пространство, где знания становятся инструментом, а мечты — достижимой реальностью.',
            en: 'INTELLECT SCHOOL is where knowledge becomes a tool and dreams become achievable.',
        },
        imageUrl: '/images/middle-entrance-group.jpg',
        button: {
            label: { ru: 'Наши программы', en: 'Our programs' },
            href: '/programs',
        },
    },
    'about-story': {
        title: { ru: 'Путь к мечте', en: 'Path to a dream' },
        text: {
            ru: 'История школы — это путь развития, высоких стандартов и постоянного роста учеников, команды и образовательной среды.',
            en: 'The school story is a path of growth, high standards, and continuous progress of students, team, and educational environment.',
        },
        imageUrl: '/images/senior-medalists.jpg',
        imageAlt: { ru: 'История школы', en: 'School story' },
    },
    'about-values': {
        title: { ru: 'Наши ценности', en: 'Our values' },
        items: [
            {
                badge: { ru: '01', en: '01' },
                title: { ru: 'Качество', en: 'Quality' },
                description: { ru: 'Высокие академические стандарты и системный подход к развитию.', en: 'High academic standards and a systematic approach to growth.' },
                imageUrl: '/images/junior-morning-exercise.jpg',
            },
            {
                badge: { ru: '02', en: '02' },
                title: { ru: 'Инновации', en: 'Innovation' },
                description: { ru: 'Современные методики и технологии в ежедневном обучении.', en: 'Modern methods and technologies in daily learning.' },
                imageUrl: '/images/middle-entrance-group.jpg',
            },
            {
                badge: { ru: '03', en: '03' },
                title: { ru: 'Глобальное мышление', en: 'Global mindset' },
                description: { ru: 'Подготовка к международным экзаменам, конкурсам и поступлению.', en: 'Preparation for international exams, contests, and admissions.' },
                imageUrl: '/images/senior-medalists.jpg',
            },
        ],
    },
    'about-stats': {
        title: { ru: 'Школа в цифрах', en: 'School in numbers' },
        items: [
            {
                badge: { ru: '10 000+', en: '10,000+' },
                title: { ru: 'Выпускников', en: 'Graduates' },
                description: { ru: 'Ученики, прошедшие наш образовательный путь.', en: 'Students who completed our educational path.' },
            },
            {
                badge: { ru: '20+', en: '20+' },
                title: { ru: 'Филиалов', en: 'Campuses' },
                description: { ru: 'Развитая сеть и единые стандарты качества.', en: 'A strong network with unified quality standards.' },
            },
            {
                badge: { ru: '15+', en: '15+' },
                title: { ru: 'Лет опыта', en: 'Years of experience' },
                description: { ru: 'Экспертность команды и управляемые результаты.', en: 'Team expertise and measurable outcomes.' },
            },
        ],
    },
    'about-cta': {
        title: { ru: 'Присоединяйтесь к Intellect School', en: 'Join Intellect School' },
        description: {
            ru: 'Запишитесь на консультацию и познакомьтесь со школой, которая развивает потенциал каждого ребенка.',
            en: 'Book a consultation and discover a school that develops every child’s potential.',
        },
        button: {
            label: { ru: 'Связаться с нами', en: 'Contact us' },
            href: '/contacts',
        },
    },
}

const SECTION_UI_META: Record<string, { title: string; hint: string }> = {
    'junior-hero': {
        title: 'Hero экран',
        hint: 'Главный экран программы Primary',
    },
    'junior-lifestyle-care-features': {
        title: 'Блок “Почему мы?” (карточки)',
        hint: 'Карточки преимуществ о заботе и атмосфере',
    },
    'junior-lifestyle-care-proof': {
        title: 'Блок “Доказательство заботы”',
        hint: 'Фото + подпись + сообщение',
    },
    'junior-cognitive-foundation': {
        title: 'Блок “Когнитивный фундамент”',
        hint: 'Карточки навыков и подходов',
    },
    'junior-motivation-atmosphere-features': {
        title: 'Блок “Мотивация и атмосфера”',
        hint: 'Карточки с примерами и преимуществами',
    },
    'junior-motivation-atmosphere-proof': {
        title: 'Блок “Визуальное доказательство”',
        hint: 'Ключевое фото раздела мотивации',
    },
    'junior-gallery': {
        title: 'Галерея',
        hint: 'Фотогалерея раздела Primary',
    },
    'junior-testimonials': {
        title: 'Отзывы родителей',
        hint: 'Карточки отзывов с фото',
    },
    'junior-cta': {
        title: 'Финальный CTA',
        hint: 'Кнопки действия в конце страницы',
    },
    'middle-academic-breakthrough': {
        title: 'Middle Hero',
        hint: 'Главный экран Middle',
    },
    'middle-discipline-environment': {
        title: 'Middle: Дисциплина и среда',
        hint: 'Карточки и proof-блок',
    },
    'middle-twenty-first-skills': {
        title: 'Middle: Навыки XXI века',
        hint: 'Карточки навыков',
    },
    'middle-leadership-governance': {
        title: 'Middle: Лидерство',
        hint: 'Карточки лидерских компетенций',
    },
    'middle-cta': {
        title: 'Middle CTA',
        hint: 'Финальный призыв к действию',
    },
    'senior-offer': {
        title: 'Senior Hero',
        hint: 'Главный экран Senior',
    },
    'senior-academic-results': {
        title: 'Senior: Академические результаты',
        hint: 'Блок результатов и достижений',
    },
    'senior-cognitive-ai': {
        title: 'Senior: Cognitive AI',
        hint: 'Блок о когнитивных преимуществах',
    },
    'senior-selective-admission': {
        title: 'Senior: Selective admission',
        hint: 'Условия отбора и CTA',
    },
    'results-hero': {
        title: 'Results: Hero',
        hint: 'Главный экран страницы достижений',
    },
    'results-grid': {
        title: 'Results: Grid',
        hint: 'Сетка карточек учеников с достижениями',
    },
    'results-cta': {
        title: 'Results: CTA',
        hint: 'Финальный призыв к действию',
    },
    'about-hero': {
        title: 'About: Hero',
        hint: 'Главный экран страницы О нас',
    },
    'about-story': {
        title: 'About: История',
        hint: 'Текстовый блок с изображением',
    },
    'about-values': {
        title: 'About: Ценности',
        hint: 'Карточки ценностей школы',
    },
    'about-stats': {
        title: 'About: Статистика',
        hint: 'Карточки метрик и достижений',
    },
    'about-cta': {
        title: 'About: CTA',
        hint: 'Финальный призыв к действию',
    },
}

function getProgramPublicPath(slug: string) {
    return PROGRAM_PAGE_PATHS.get(slug) || null
}

function getProgramSectionKeys(slug: string) {
    return PROGRAM_SECTION_KEYS[slug] || []
}

function getProgramSectionPayloadPreset(key: string, type: CmsSectionType) {
    return PROGRAM_SECTION_PAYLOAD_PRESETS[key] ?? SECTION_PAYLOAD_TEMPLATES[type]
}

function isTypedSectionKey(key: string) {
    const normalized = key.trim()
    return PRIMARY_TYPED_SECTION_KEYS.has(normalized)
        || MIDDLE_TYPED_SECTION_KEYS.has(normalized)
        || SENIOR_TYPED_SECTION_KEYS.has(normalized)
        || RESULTS_TYPED_SECTION_KEYS.has(normalized)
        || ABOUT_TYPED_SECTION_KEYS.has(normalized)
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function collectPayloadValidationIssues(
    node: unknown,
    path: string,
    result: PayloadValidationResult
) {
    if (Array.isArray(node)) {
        node.forEach((item, index) => collectPayloadValidationIssues(item, `${path}[${index}]`, result))
        return
    }

    if (!isObjectRecord(node)) return

    const localizedObject =
        typeof node.ru !== 'undefined' ||
        typeof node.en !== 'undefined'

    if (localizedObject) {
        const ru = typeof node.ru === 'string' ? node.ru.trim() : ''
        const en = typeof node.en === 'string' ? node.en.trim() : ''
        if (!ru || !en) {
            result.errors.push(`${path}: локализованное поле должно содержать и ru, и en`)
        }
    }

    for (const [key, value] of Object.entries(node)) {
        const nextPath = path ? `${path}.${key}` : key
        const looksLikeMediaKey = /(image|photo|avatar|background|poster|thumbnail|src|url)$/i.test(key)
        if (looksLikeMediaKey && typeof value === 'string' && !value.trim()) {
            result.warnings.push(`${nextPath}: медиа-поле пустое`)
        }
        collectPayloadValidationIssues(value, nextPath, result)
    }
}

function validateSectionPayload(payload: unknown): PayloadValidationResult {
    const result: PayloadValidationResult = { errors: [], warnings: [] }
    collectPayloadValidationIssues(payload, 'payload', result)
    return result
}

function toDateTimeLocal(isoDate: string | null) {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    if (Number.isNaN(date.getTime())) return ''
    const pad = (value: number) => String(value).padStart(2, '0')
    const y = date.getFullYear()
    const m = pad(date.getMonth() + 1)
    const d = pad(date.getDate())
    const h = pad(date.getHours())
    const min = pad(date.getMinutes())
    return `${y}-${m}-${d}T${h}:${min}`
}

function generateSlug(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9а-яё]+/gi, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-')
}

function getStatusBadgeClass(status: CmsPageStatus) {
    switch (status) {
    case 'published':
        return 'bg-green-50 text-green-700'
    case 'scheduled':
        return 'bg-blue-50 text-blue-700'
    case 'review':
        return 'bg-amber-50 text-amber-700'
    case 'archived':
        return 'bg-gray-100 text-gray-600'
    default:
        return 'bg-slate-100 text-slate-700'
    }
}

function extractSectionSummary(payload: unknown): string {
    if (Array.isArray(payload)) {
        const first = payload[0]
        if (isObjectRecord(first)) {
            const titleRu = isObjectRecord(first.title) && typeof first.title.ru === 'string' ? first.title.ru : ''
            if (titleRu) return `Элементов: ${payload.length} · Первый заголовок: ${titleRu}`
        }
        return `Элементов: ${payload.length}`
    }

    if (!isObjectRecord(payload)) return 'Нет данных'

    const titleRu = isObjectRecord(payload.title) && typeof payload.title.ru === 'string' ? payload.title.ru : ''
    const headlineRu = isObjectRecord(payload.headline) && typeof payload.headline.ru === 'string' ? payload.headline.ru : ''
    const images = Array.isArray(payload.images) ? payload.images.length : 0
    const hasSingleImage = typeof payload.image === 'string' || typeof payload.imageUrl === 'string' || typeof payload.backgroundImage === 'string'

    const parts: string[] = []
    if (titleRu) parts.push(`RU: ${titleRu}`)
    else if (headlineRu) parts.push(`RU: ${headlineRu}`)
    if (images > 0) parts.push(`Фото: ${images}`)
    else if (hasSingleImage) parts.push('Фото: 1')

    return parts.join(' · ') || 'Контент заполнен'
}

function buildPrimaryLiveSectionPayloads() {
    const ru = ruLocale as Record<string, unknown>
    const en = enLocale as Record<string, unknown>

    const ruHero = getJuniorHeroData(ru)
    const enHero = getJuniorHeroData(en)

    const ruLifestyleFeatures = getLifestyleCareFeatures(ru)
    const enLifestyleFeatures = getLifestyleCareFeatures(en)

    const ruLifestyleProof = getLifestyleCarePhotoProof(ru)
    const enLifestyleProof = getLifestyleCarePhotoProof(en)

    const ruCognitive = getCognitiveFoundationFeatures(ru)
    const enCognitive = getCognitiveFoundationFeatures(en)

    const ruMotivation = getMotivationCultureFeatures(ru)
    const enMotivation = getMotivationCultureFeatures(en)

    const ruMotivationProof = getMotivationCulturePhotoProof(ru)
    const enMotivationProof = getMotivationCulturePhotoProof(en)

    const ruGallery = getGalleryImages(ru)
    const enGallery = getGalleryImages(en)

    return {
        'junior-hero': {
            title: { ru: ruHero.title, en: enHero.title },
            subtitle: { ru: ruHero.subtitle, en: enHero.subtitle },
            description: { ru: ruHero.description, en: enHero.description },
            ctaText: { ru: ruHero.ctaText, en: enHero.ctaText },
            ctaLink: ruHero.ctaLink,
            backgroundImage: ruHero.backgroundImage,
            badge: { ru: ruHero.badge, en: enHero.badge },
        },
        'junior-lifestyle-care-features': ruLifestyleFeatures.map((item, idx) => ({
            icon: item.icon,
            title: { ru: item.title, en: enLifestyleFeatures[idx]?.title || item.title },
            subtitle: { ru: item.subtitle, en: enLifestyleFeatures[idx]?.subtitle || item.subtitle },
            description: (item.description || []).map((line, lineIdx) => ({
                ru: line,
                en: enLifestyleFeatures[idx]?.description?.[lineIdx] || line,
            })),
            backgroundImage: item.backgroundImage || '',
            benefit: item.benefit
                ? { ru: item.benefit, en: enLifestyleFeatures[idx]?.benefit || item.benefit }
                : undefined,
        })),
        'junior-lifestyle-care-proof': {
            images: (ruLifestyleProof.images || []).map((img, idx) => ({
                src: img.src,
                caption: {
                    ru: img.caption,
                    en: enLifestyleProof.images?.[idx]?.caption || img.caption,
                },
            })),
            message: { ru: ruLifestyleProof.message, en: enLifestyleProof.message || ruLifestyleProof.message },
        },
        'junior-cognitive-foundation': ruCognitive.map((item, idx) => ({
            icon: item.icon,
            title: { ru: item.title, en: enCognitive[idx]?.title || item.title },
            subtitle: { ru: item.subtitle, en: enCognitive[idx]?.subtitle || item.subtitle },
            description: (item.description || []).map((line, lineIdx) => ({
                ru: line,
                en: enCognitive[idx]?.description?.[lineIdx] || line,
            })),
            stats: item.stats ? { ru: item.stats, en: enCognitive[idx]?.stats || item.stats } : undefined,
            highlight: item.highlight ? { ru: item.highlight, en: enCognitive[idx]?.highlight || item.highlight } : undefined,
        })),
        'junior-motivation-atmosphere-features': ruMotivation.map((item, idx) => ({
            icon: item.icon,
            title: { ru: item.title, en: enMotivation[idx]?.title || item.title },
            subtitle: { ru: item.subtitle, en: enMotivation[idx]?.subtitle || item.subtitle },
            description: (item.description || []).map((line, lineIdx) => ({
                ru: line,
                en: enMotivation[idx]?.description?.[lineIdx] || line,
            })),
            example: item.example ? { ru: item.example, en: enMotivation[idx]?.example || item.example } : undefined,
        })),
        'junior-motivation-atmosphere-proof': {
            image: ruMotivationProof.image,
            caption: { ru: ruMotivationProof.caption, en: enMotivationProof.caption || ruMotivationProof.caption },
        },
        'junior-gallery': ruGallery.map((img, idx) => ({
            src: img.src,
            alt: { ru: img.alt, en: enGallery[idx]?.alt || img.alt },
            category: img.category,
        })),
        'junior-testimonials': juniorTestimonials.map(item => ({
            parentName: { ru: item.parentName, en: item.parentName },
            childName: { ru: item.childName, en: item.childName },
            childGrade: { ru: item.childGrade, en: item.childGrade },
            quote: { ru: item.quote, en: item.quote },
            photo: item.photo || '',
        })),
        'junior-cta': {
            title: { ru: 'Готовы дать своему ребенку лучший старт?', en: 'Ready to give your child the best start?' },
            description: { ru: 'Запишитесь на индивидуальную экскурсию по школе и познакомьтесь с нашей командой', en: 'Book an individual school tour and meet our team' },
            primaryText: { ru: 'Записаться на экскурсию', en: 'Book a tour' },
            primaryLink: '/admissions',
            secondaryText: { ru: 'Скачать брошюру', en: 'Download brochure' },
            secondaryLink: '/downloads/junior-brochure.pdf',
        },
    } as Record<string, unknown>
}

function buildMiddleLiveSectionPayloads() {
    const ru = ruLocale as Record<string, unknown>
    const en = enLocale as Record<string, unknown>

    const ruAcademic = getAcademicBreakthroughData(ru)
    const enAcademic = getAcademicBreakthroughData(en)
    const ruDiscipline = getDisciplineEnvironmentData(ru)
    const enDiscipline = getDisciplineEnvironmentData(en)
    const ruSkills = getTwentyFirstSkillsData(ru)
    const enSkills = getTwentyFirstSkillsData(en)
    const ruLeadership = getLeadershipGovernanceData(ru)
    const enLeadership = getLeadershipGovernanceData(en)
    const ruCta = getMiddleCTAData(ru)
    const enCta = getMiddleCTAData(en)

    return {
        'middle-academic-breakthrough': {
            title: { ru: ruAcademic.title, en: enAcademic.title },
            subtitle: { ru: ruAcademic.subtitle, en: enAcademic.subtitle },
            description: { ru: ruAcademic.description, en: enAcademic.description },
            ctaText: { ru: ruAcademic.ctaText, en: enAcademic.ctaText },
            ctaLink: ruAcademic.ctaLink,
            backgroundImage: ruAcademic.backgroundImage,
        },
        'middle-discipline-environment': {
            title: { ru: ruDiscipline.title, en: enDiscipline.title },
            subtitle: { ru: ruDiscipline.subtitle, en: enDiscipline.subtitle },
            features: (ruDiscipline.features || []).map((f, idx) => ({
                icon: f.icon,
                title: { ru: f.title, en: enDiscipline.features?.[idx]?.title || f.title },
                description: { ru: f.description, en: enDiscipline.features?.[idx]?.description || f.description },
                highlight: f.highlight ? { ru: f.highlight, en: enDiscipline.features?.[idx]?.highlight || f.highlight } : undefined,
            })),
            proofImage: ruDiscipline.proofImage,
            proofCaption: { ru: ruDiscipline.proofCaption, en: enDiscipline.proofCaption || ruDiscipline.proofCaption },
        },
        'middle-twenty-first-skills': {
            title: { ru: ruSkills.title, en: enSkills.title },
            subtitle: { ru: ruSkills.subtitle, en: enSkills.subtitle },
            skills: (ruSkills.skills || []).map((s, idx) => ({
                icon: s.icon,
                title: { ru: s.title, en: enSkills.skills?.[idx]?.title || s.title },
                description: { ru: s.description, en: enSkills.skills?.[idx]?.description || s.description },
            })),
            proofImage: ruSkills.proofImage,
            proofCaption: { ru: ruSkills.proofCaption, en: enSkills.proofCaption || ruSkills.proofCaption },
        },
        'middle-leadership-governance': {
            title: { ru: ruLeadership.title, en: enLeadership.title },
            subtitle: { ru: ruLeadership.subtitle, en: enLeadership.subtitle },
            features: (ruLeadership.features || []).map((f, idx) => ({
                icon: f.icon,
                title: { ru: f.title, en: enLeadership.features?.[idx]?.title || f.title },
                description: { ru: f.description, en: enLeadership.features?.[idx]?.description || f.description },
            })),
            ctaText: { ru: ruLeadership.ctaText, en: enLeadership.ctaText || ruLeadership.ctaText },
            ctaLink: ruLeadership.ctaLink,
            proofImage: ruLeadership.proofImage,
            proofCaption: { ru: ruLeadership.proofCaption, en: enLeadership.proofCaption || ruLeadership.proofCaption },
        },
        'middle-cta': {
            title: { ru: ruCta.title, en: enCta.title },
            description: { ru: ruCta.description, en: enCta.description },
            primaryCTA: {
                text: { ru: ruCta.primaryCTA.text, en: enCta.primaryCTA.text || ruCta.primaryCTA.text },
                link: ruCta.primaryCTA.link,
            },
            secondaryCTA: {
                text: { ru: ruCta.secondaryCTA.text, en: enCta.secondaryCTA.text || ruCta.secondaryCTA.text },
                link: ruCta.secondaryCTA.link,
            },
        },
    } as Record<string, unknown>
}

function buildSeniorLiveSectionPayloads() {
    const ru = ruLocale as Record<string, unknown>
    const en = enLocale as Record<string, unknown>

    const ruOffer = getSeniorOfferData(ru)
    const enOffer = getSeniorOfferData(en)
    const ruAcademic = getAcademicResultsData(ru)
    const enAcademic = getAcademicResultsData(en)
    const ruCognitive = getCognitiveAIData(ru)
    const enCognitive = getCognitiveAIData(en)
    const ruAdmission = getSelectiveAdmissionData(ru)
    const enAdmission = getSelectiveAdmissionData(en)

    return {
        'senior-offer': {
            headline: { ru: ruOffer.headline, en: enOffer.headline },
            subheadline: { ru: ruOffer.subheadline, en: enOffer.subheadline },
            ctaText: { ru: ruOffer.ctaText, en: enOffer.ctaText },
            ctaLink: ruOffer.ctaLink,
            backgroundImage: ruOffer.backgroundImage,
            scrollText: { ru: ruOffer.scrollText, en: enOffer.scrollText },
        },
        'senior-academic-results': {
            headline: { ru: ruAcademic.headline, en: enAcademic.headline },
            description: { ru: ruAcademic.description, en: enAcademic.description },
            timeframe: { ru: ruAcademic.timeframe, en: enAcademic.timeframe },
            pillars: (ruAcademic.pillars || []).map((p, idx) => ({
                icon: p.icon,
                title: { ru: p.title, en: enAcademic.pillars?.[idx]?.title || p.title },
                description: { ru: p.description, en: enAcademic.pillars?.[idx]?.description || p.description },
                details: (p.details || []).map((d: string, dIdx: number) => ({
                    ru: d,
                    en: enAcademic.pillars?.[idx]?.details?.[dIdx] || d,
                })),
            })),
            proofImage: ruAcademic.proofImage,
            proofCaption: { ru: ruAcademic.proofCaption, en: enAcademic.proofCaption || ruAcademic.proofCaption },
            bottomStrong: { ru: ruAcademic.bottomStrong, en: enAcademic.bottomStrong || ruAcademic.bottomStrong },
            bottomText: { ru: ruAcademic.bottomText, en: enAcademic.bottomText || ruAcademic.bottomText },
        },
        'senior-cognitive-ai': {
            headline: { ru: ruCognitive.headline, en: enCognitive.headline },
            hook: { ru: ruCognitive.hook, en: enCognitive.hook },
            advantages: (ruCognitive.advantages || []).map((a, idx) => ({
                title: { ru: a.title, en: enCognitive.advantages?.[idx]?.title || a.title },
                tagline: { ru: a.tagline, en: enCognitive.advantages?.[idx]?.tagline || a.tagline },
                description: { ru: a.description, en: enCognitive.advantages?.[idx]?.description || a.description },
                benefits: (a.benefits || []).map((b: string, bIdx: number) => ({
                    ru: b,
                    en: enCognitive.advantages?.[idx]?.benefits?.[bIdx] || b,
                })),
                multiplier: a.multiplier
                    ? { ru: a.multiplier, en: enCognitive.advantages?.[idx]?.multiplier || a.multiplier }
                    : undefined,
            })),
            proofImage: ruCognitive.proofImage,
            proofCaption: { ru: ruCognitive.proofCaption, en: enCognitive.proofCaption || ruCognitive.proofCaption },
            bottomTitle: { ru: ruCognitive.bottomTitle, en: enCognitive.bottomTitle || ruCognitive.bottomTitle },
            bottomText: { ru: ruCognitive.bottomText, en: enCognitive.bottomText || ruCognitive.bottomText },
        },
        'senior-selective-admission': {
            headline: { ru: ruAdmission.headline, en: enAdmission.headline },
            filterMessage: { ru: ruAdmission.filterMessage, en: enAdmission.filterMessage },
            communityPromise: { ru: ruAdmission.communityPromise, en: enAdmission.communityPromise },
            ctaText: { ru: ruAdmission.ctaText, en: enAdmission.ctaText },
            ctaLink: ruAdmission.ctaLink,
            communityValues: (ruAdmission.communityValues || []).map((v: string, idx: number) => ({
                ru: v,
                en: enAdmission.communityValues?.[idx] || v,
            })),
            proofImage: ruAdmission.proofImage,
            subText: { ru: ruAdmission.subText, en: enAdmission.subText || ruAdmission.subText },
            proofCaption: { ru: ruAdmission.proofCaption, en: enAdmission.proofCaption || ruAdmission.proofCaption },
            bottomBoxTitle: { ru: ruAdmission.bottomBoxTitle, en: enAdmission.bottomBoxTitle || ruAdmission.bottomBoxTitle },
            bottomBoxText: { ru: ruAdmission.bottomBoxText, en: enAdmission.bottomBoxText || ruAdmission.bottomBoxText },
        },
    } as Record<string, unknown>
}

export default function AdminPagesBuilderPage() {
    const [pages, setPages] = useState<CmsPageRecord[]>([])
    const [sections, setSections] = useState<CmsSectionRecord[]>([])
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [programOnly, setProgramOnly] = useState(true)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [creatingPreviewId, setCreatingPreviewId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [notice, setNotice] = useState<string | null>(null)

    const [showPageForm, setShowPageForm] = useState(false)
    const [editingPage, setEditingPage] = useState<CmsPageRecord | null>(null)
    const [pageForm, setPageForm] = useState<PageForm>(emptyPageForm)

    const [showSectionForm, setShowSectionForm] = useState(false)
    const [editingSection, setEditingSection] = useState<CmsSectionRecord | null>(null)
    const [sectionForm, setSectionForm] = useState<SectionForm>(emptySectionForm)
    const [sectionValidationResult, setSectionValidationResult] = useState<PayloadValidationResult | null>(null)
    const [showRawPayloadEditor, setShowRawPayloadEditor] = useState(false)
    const [uploadingMediaField, setUploadingMediaField] = useState<string | null>(null)

    const selectedPage = useMemo(
        () => pages.find(page => page.id === selectedPageId) || null,
        [pages, selectedPageId]
    )

    const filteredPages = useMemo(() => {
        return pages.filter(page => {
            if (programOnly && !PROGRAM_PAGE_SLUGS.has(page.slug)) return false
            const haystack = [page.slug, page.title_ru, page.title_en].join(' ').toLowerCase()
            return haystack.includes(searchQuery.toLowerCase())
        })
    }, [pages, searchQuery, programOnly])

    const fetchPages = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await listCmsPages()
            setPages(data)
            if (!selectedPageId && data.length > 0) {
                setSelectedPageId(data[0].id)
            }
        } catch (err) {
            console.error('Failed to fetch cms pages:', err)
            setError('Ошибка загрузки страниц')
        } finally {
            setLoading(false)
        }
    }, [selectedPageId])

    const fetchSections = useCallback(async (pageId: string) => {
        try {
            const data = await listCmsSections(pageId)
            setSections(data)
        } catch (err) {
            console.error('Failed to fetch sections:', err)
            setError('Ошибка загрузки секций')
        }
    }, [])

    useEffect(() => {
        fetchPages()
    }, [fetchPages])

    useEffect(() => {
        if (selectedPageId) {
            fetchSections(selectedPageId)
        } else {
            setSections([])
        }
    }, [selectedPageId, fetchSections])

    const bootstrapProgramPages = async () => {
        try {
            setSaving(true)
            setError(null)
            setNotice(null)
            let createdCount = 0
            let existingCount = 0
            for (const preset of PROGRAM_PAGE_PRESETS) {
                const exists = await getCmsPageBySlug(preset.slug)
                if (exists) {
                    existingCount += 1
                    continue
                }

                try {
                    await createCmsPage({
                        slug: preset.slug,
                        title_ru: preset.title_ru,
                        title_en: preset.title_en,
                        status: 'draft',
                        version: 1,
                    })
                    createdCount += 1
                } catch (err: unknown) {
                    const code = (err as { code?: string })?.code
                    if (code === '23505') {
                        existingCount += 1
                        continue
                    }
                    throw err
                }
            }

            await fetchPages()
            if (createdCount > 0) {
                setError(null)
            } else if (existingCount === PROGRAM_PAGE_PRESETS.length) {
                setError('Program pages уже существуют. Выберите их в списке слева.')
            }
        } catch (err) {
            console.error('Failed to bootstrap program pages:', err)
            const message = (err as { message?: string })?.message
            setError(`Ошибка создания program pages${message ? `: ${message}` : ''}`)
        } finally {
            setSaving(false)
        }
    }

    const bootstrapProgramSections = async () => {
        if (!selectedPage) return
        const presets = getProgramSectionKeys(selectedPage.slug)
        if (!presets.length) return

        try {
            setSaving(true)
            setError(null)
            setNotice(null)

            const existingKeys = new Set(sections.map(section => section.key))
            let nextOrder = sections.length
            let createdCount = 0

            for (const preset of presets) {
                if (existingKeys.has(preset.key)) continue
                try {
                    await createCmsSection({
                        page_id: selectedPage.id,
                        key: preset.key,
                        type: preset.type,
                        payload: getProgramSectionPayloadPreset(preset.key, preset.type) as Record<string, unknown>,
                        is_enabled: true,
                        order_index: nextOrder++,
                    })
                    createdCount += 1
                } catch (err: unknown) {
                    const code = (err as { code?: string })?.code
                    if (code === '23505') continue
                    throw err
                }
            }

            await fetchSections(selectedPage.id)
            if (createdCount === 0) {
                setError('Preset секции уже существуют для этой страницы.')
            }
        } catch (err) {
            console.error('Failed to bootstrap program sections:', err)
            const message = (err as { message?: string })?.message
            setError(`Ошибка создания preset секций${message ? `: ${message}` : ''}`)
        } finally {
            setSaving(false)
        }
    }

    const openPageForm = async (page?: CmsPageRecord) => {
        if (page) {
            setEditingPage(page)
            let seoMeta = null
            try {
                seoMeta = await getSeoMeta('page', page.id)
            } catch (err) {
                console.error('Failed to fetch page SEO metadata:', err)
            }
            setPageForm({
                slug: page.slug,
                title_ru: page.title_ru,
                title_en: page.title_en,
                status: page.status,
                version: page.version,
                scheduled_at: toDateTimeLocal(page.scheduled_at),
                published_at: toDateTimeLocal(page.published_at),
                seo_title: seoMeta?.seo_title || '',
                seo_description: seoMeta?.seo_description || '',
                canonical_url: seoMeta?.canonical_url || '',
                og_image_url: seoMeta?.og_image_url || '',
                robots_index: seoMeta?.robots_index ?? true,
                robots_follow: seoMeta?.robots_follow ?? true,
                structured_data_enabled: seoMeta?.structured_data_enabled ?? false,
                structured_data_type: seoMeta?.structured_data_type || '',
            })
        } else {
            setEditingPage(null)
            setPageForm(emptyPageForm)
        }
        setShowPageForm(true)
    }

    const closePageForm = () => {
        setShowPageForm(false)
        setEditingPage(null)
        setPageForm(emptyPageForm)
    }

    const savePage = async () => {
        if (!pageForm.slug || !pageForm.title_ru || !pageForm.title_en) return

        if (editingPage && !canTransitionPageStatus(editingPage.status, pageForm.status)) {
            setError(`Недопустимый переход статуса: ${editingPage.status} → ${pageForm.status}`)
            return
        }

        if (pageForm.status === 'scheduled' && !pageForm.scheduled_at) {
            setError('Для scheduled необходимо указать дату и время публикации')
            return
        }

        try {
            setSaving(true)
            setNotice(null)
            const payload = {
                slug: generateSlug(pageForm.slug),
                title_ru: pageForm.title_ru,
                title_en: pageForm.title_en,
                status: pageForm.status,
                version: Math.max(1, Math.trunc(pageForm.version || 1)),
                scheduled_at: pageForm.status === 'scheduled'
                    ? new Date(pageForm.scheduled_at).toISOString()
                    : null,
                published_at: pageForm.status === 'published'
                    ? (pageForm.published_at ? new Date(pageForm.published_at).toISOString() : new Date().toISOString())
                    : null,
            }

            if (editingPage) {
                await updateCmsPage(editingPage.id, payload)
                await upsertSeoMeta('page', editingPage.id, {
                    seo_title: pageForm.seo_title,
                    seo_description: pageForm.seo_description,
                    canonical_url: pageForm.canonical_url,
                    og_image_url: pageForm.og_image_url,
                    robots_index: pageForm.robots_index,
                    robots_follow: pageForm.robots_follow,
                    structured_data_enabled: pageForm.structured_data_enabled,
                    structured_data_type: pageForm.structured_data_type,
                })
            } else {
                const created = await createCmsPage(payload)
                await upsertSeoMeta('page', created.id, {
                    seo_title: pageForm.seo_title,
                    seo_description: pageForm.seo_description,
                    canonical_url: pageForm.canonical_url,
                    og_image_url: pageForm.og_image_url,
                    robots_index: pageForm.robots_index,
                    robots_follow: pageForm.robots_follow,
                    structured_data_enabled: pageForm.structured_data_enabled,
                    structured_data_type: pageForm.structured_data_type,
                })
                setSelectedPageId(created.id)
            }

            closePageForm()
            await fetchPages()
        } catch (err) {
            console.error('Failed to save page:', err)
            setError('Ошибка сохранения страницы')
        } finally {
            setSaving(false)
        }
    }

    const removePage = async (pageId: string) => {
        if (!confirm('Удалить страницу и все её секции?')) return
        try {
            await deleteCmsPage(pageId)
            if (selectedPageId === pageId) setSelectedPageId(null)
            await fetchPages()
        } catch (err) {
            console.error('Failed to delete page:', err)
            setError('Ошибка удаления страницы')
        }
    }

    const togglePagePublish = async (page: CmsPageRecord) => {
        try {
            const nextStatus: CmsPageStatus = page.status === 'published' ? 'draft' : 'published'
            if (!canTransitionPageStatus(page.status, nextStatus)) {
                setError(`Недопустимый переход статуса: ${page.status} → ${nextStatus}`)
                return
            }
            await updateCmsPage(page.id, {
                status: nextStatus,
                scheduled_at: null,
                published_at: nextStatus === 'published' ? (page.published_at || new Date().toISOString()) : null,
            })
            await fetchPages()
        } catch (err) {
            console.error('Failed to toggle page publish:', err)
            setError('Ошибка изменения статуса страницы')
        }
    }

    const openSectionForm = (section?: CmsSectionRecord) => {
        if (section) {
            setEditingSection(section)
            setSectionForm({
                key: section.key,
                type: section.type,
                payloadText: JSON.stringify(section.payload || {}, null, 2),
                is_enabled: section.is_enabled,
            })
        } else {
            setEditingSection(null)
            setSectionForm({
                ...emptySectionForm,
                payloadText: JSON.stringify(getProgramSectionPayloadPreset('', 'content'), null, 2),
            })
        }
        setShowSectionForm(true)
    }

    const closeSectionForm = () => {
        setShowSectionForm(false)
        setEditingSection(null)
        setSectionForm(emptySectionForm)
        setSectionValidationResult(null)
        setShowRawPayloadEditor(false)
        setUploadingMediaField(null)
    }

    const parseSectionPayload = useCallback(() => {
        try {
            return JSON.parse(sectionForm.payloadText || '{}') as Record<string, unknown>
        } catch {
            return null
        }
    }, [sectionForm.payloadText])

    const mutateSectionPayload = useCallback((updater: (payload: Record<string, unknown> | unknown[]) => void) => {
        const parsed = parseSectionPayload()
        if (!parsed) {
            setError('Payload JSON невалиден. Сначала исправьте JSON или вставьте шаблон.')
            return
        }
        const nextPayload: Record<string, unknown> | unknown[] = Array.isArray(parsed) ? [...parsed] : { ...parsed }
        updater(nextPayload)
        setSectionForm(prev => ({ ...prev, payloadText: JSON.stringify(nextPayload, null, 2) }))
    }, [parseSectionPayload])

    const uploadImageForSection = useCallback(async (
        file: File,
        fieldId: string,
        applyUrl: (url: string) => void
    ) => {
        if (!selectedPageId) return
        try {
            setUploadingMediaField(fieldId)
            setError(null)
            const formData = new FormData()
            formData.append('file', file)
            formData.append('pageId', selectedPageId)
            formData.append('fieldId', fieldId)

            const response = await fetch('/api/cms/upload-image', {
                method: 'POST',
                body: formData,
            })

            const payload = await response.json().catch(() => ({}))
            if (!response.ok || !payload?.publicUrl) {
                throw new Error(payload?.error || 'Upload failed')
            }

            applyUrl(payload.publicUrl as string)
        } catch (err) {
            console.error('Failed to upload section image:', err)
            const message = (err as { message?: string })?.message
            setError(`Ошибка загрузки изображения${message ? `: ${message}` : ''}`)
        } finally {
            setUploadingMediaField(null)
        }
    }, [selectedPageId])

    const applySectionTemplate = (type: CmsSectionType) => {
        setSectionForm(prev => ({
            ...prev,
            type,
            payloadText: JSON.stringify(getProgramSectionPayloadPreset(prev.key, type), null, 2),
        }))
    }

    const saveSection = async () => {
        if (!selectedPageId) return
        const sectionKey = sectionForm.key.trim() || `${sectionForm.type}-${Date.now()}`
        let parsedPayload: Record<string, unknown> = {}
        try {
            parsedPayload = JSON.parse(sectionForm.payloadText || '{}')
        } catch {
            setError('Payload должен быть валидным JSON')
            return
        }

        const validation = validateSectionPayload(parsedPayload)
        setSectionValidationResult(validation)
        if (validation.errors.length > 0) {
            setError(`Проверьте payload: найдено ошибок — ${validation.errors.length}`)
            return
        }

        try {
            setSaving(true)
            setNotice(null)
            const payload = {
                page_id: selectedPageId,
                key: sectionKey,
                type: sectionForm.type,
                payload: parsedPayload,
                is_enabled: sectionForm.is_enabled,
            }

            if (editingSection) {
                await updateCmsSection(editingSection.id, payload)
            } else {
                await createCmsSection({
                    ...payload,
                    order_index: sections.length,
                })
            }

            closeSectionForm()
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to save section:', err)
            setError('Ошибка сохранения секции')
        } finally {
            setSaving(false)
        }
    }

    const runSectionPayloadValidation = () => {
        try {
            const parsedPayload = JSON.parse(sectionForm.payloadText || '{}') as Record<string, unknown>
            const validation = validateSectionPayload(parsedPayload)
            setSectionValidationResult(validation)
            if (validation.errors.length > 0) {
                setError(`Проверьте payload: найдено ошибок — ${validation.errors.length}`)
                return
            }
            setError(null)
        } catch {
            setSectionValidationResult(null)
            setError('Payload должен быть валидным JSON')
        }
    }

    const parsedSectionPayload = parseSectionPayload()
    const sectionKey = sectionForm.key.trim()
    const isTypedSection = isTypedSectionKey(sectionKey)

    const removeSection = async (sectionId: string) => {
        if (!selectedPageId) return
        if (!confirm('Удалить секцию?')) return
        try {
            await deleteCmsSection(sectionId)
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to delete section:', err)
            setError('Ошибка удаления секции')
        }
    }

    const toggleSectionEnabled = async (section: CmsSectionRecord) => {
        if (!selectedPageId) return
        try {
            await updateCmsSection(section.id, { is_enabled: !section.is_enabled })
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to toggle section:', err)
            setError('Ошибка изменения статуса секции')
        }
    }

    const moveSection = async (index: number, direction: 'up' | 'down') => {
        if (!selectedPageId) return
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= sections.length) return

        const nextSections = [...sections]
        const [moved] = nextSections.splice(index, 1)
        nextSections.splice(targetIndex, 0, moved)
        setSections(nextSections)

        try {
            await reorderCmsSections(nextSections.map((item, idx) => ({ id: item.id, order_index: idx })))
            await fetchSections(selectedPageId)
        } catch (err) {
            console.error('Failed to reorder sections:', err)
            setError('Ошибка сортировки секций')
            await fetchSections(selectedPageId)
        }
    }

    const openSecurePreview = async (page: CmsPageRecord) => {
        try {
            setCreatingPreviewId(page.id)
            const response = await fetch('/api/cms/preview-links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    entityType: 'page',
                    entityId: page.id,
                    slug: page.slug,
                    expiresInMinutes: 120,
                    maxUses: 5,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate preview link')
            }

            const data = await response.json()
            if (!data?.url) {
                throw new Error('Preview URL was not generated')
            }

            window.open(data.url, '_blank', 'noopener,noreferrer')
        } catch (err) {
            console.error('Failed to open secure page preview:', err)
            setError('Ошибка генерации preview-ссылки')
        } finally {
            setCreatingPreviewId(null)
        }
    }

    const syncPrimaryPageFromCurrentContent = async () => {
        if (!selectedPage || selectedPage.slug !== 'program-primary') return

        const confirmed = confirm('Синхронизировать program-primary с текущими данными страницы? Это перезапишет payload секций в CMS.')
        if (!confirmed) return

        try {
            setSaving(true)
            setError(null)
            setNotice(null)

            const livePayloads = buildPrimaryLiveSectionPayloads()
            const sectionDefs = getProgramSectionKeys(selectedPage.slug)
            const existingByKey = new Map(sections.map(section => [section.key, section]))
            let nextOrder = sections.length

            for (const def of sectionDefs) {
                const payload = livePayloads[def.key] ?? getProgramSectionPayloadPreset(def.key, def.type)
                const existing = existingByKey.get(def.key)

                if (existing) {
                    await updateCmsSection(existing.id, {
                        payload: payload as Record<string, unknown>,
                        type: def.type,
                        is_enabled: true,
                    })
                } else {
                    await createCmsSection({
                        page_id: selectedPage.id,
                        key: def.key,
                        type: def.type,
                        payload: payload as Record<string, unknown>,
                        is_enabled: true,
                        order_index: nextOrder++,
                    })
                }
            }

            await fetchSections(selectedPage.id)
            await fetchPages()
            setNotice('Program Primary синхронизирован с текущими данными страницы.')
        } catch (err) {
            console.error('Failed to sync primary page from current content:', err)
            const message = (err as { message?: string })?.message
            setError(`Ошибка синхронизации program-primary${message ? `: ${message}` : ''}`)
        } finally {
            setSaving(false)
        }
    }

    const syncMiddlePageFromCurrentContent = async () => {
        if (!selectedPage || selectedPage.slug !== 'program-middle') return

        const confirmed = confirm('Синхронизировать program-middle с текущими данными страницы? Это перезапишет payload секций в CMS.')
        if (!confirmed) return

        try {
            setSaving(true)
            setError(null)
            setNotice(null)

            const livePayloads = buildMiddleLiveSectionPayloads()
            const sectionDefs = getProgramSectionKeys(selectedPage.slug)
            const existingByKey = new Map(sections.map(section => [section.key, section]))
            let nextOrder = sections.length

            for (const def of sectionDefs) {
                const payload = livePayloads[def.key] ?? getProgramSectionPayloadPreset(def.key, def.type)
                const existing = existingByKey.get(def.key)

                if (existing) {
                    await updateCmsSection(existing.id, {
                        payload: payload as Record<string, unknown>,
                        type: def.type,
                        is_enabled: true,
                    })
                } else {
                    await createCmsSection({
                        page_id: selectedPage.id,
                        key: def.key,
                        type: def.type,
                        payload: payload as Record<string, unknown>,
                        is_enabled: true,
                        order_index: nextOrder++,
                    })
                }
            }

            await fetchSections(selectedPage.id)
            await fetchPages()
            setNotice('Program Middle синхронизирован с текущими данными страницы.')
        } catch (err) {
            console.error('Failed to sync middle page from current content:', err)
            const message = (err as { message?: string })?.message
            setError(`Ошибка синхронизации program-middle${message ? `: ${message}` : ''}`)
        } finally {
            setSaving(false)
        }
    }

    const syncSeniorPageFromCurrentContent = async () => {
        if (!selectedPage || selectedPage.slug !== 'program-senior') return

        const confirmed = confirm('Синхронизировать program-senior с текущими данными страницы? Это перезапишет payload секций в CMS.')
        if (!confirmed) return

        try {
            setSaving(true)
            setError(null)
            setNotice(null)

            const livePayloads = buildSeniorLiveSectionPayloads()
            const sectionDefs = getProgramSectionKeys(selectedPage.slug)
            const existingByKey = new Map(sections.map(section => [section.key, section]))
            let nextOrder = sections.length

            for (const def of sectionDefs) {
                const payload = livePayloads[def.key] ?? getProgramSectionPayloadPreset(def.key, def.type)
                const existing = existingByKey.get(def.key)

                if (existing) {
                    await updateCmsSection(existing.id, {
                        payload: payload as Record<string, unknown>,
                        type: def.type,
                        is_enabled: true,
                    })
                } else {
                    await createCmsSection({
                        page_id: selectedPage.id,
                        key: def.key,
                        type: def.type,
                        payload: payload as Record<string, unknown>,
                        is_enabled: true,
                        order_index: nextOrder++,
                    })
                }
            }

            await fetchSections(selectedPage.id)
            await fetchPages()
            setNotice('Program Senior синхронизирован с текущими данными страницы.')
        } catch (err) {
            console.error('Failed to sync senior page from current content:', err)
            const message = (err as { message?: string })?.message
            setError(`Ошибка синхронизации program-senior${message ? `: ${message}` : ''}`)
        } finally {
            setSaving(false)
        }
    }

    const selectedPagePresetKeys = selectedPage ? getProgramSectionKeys(selectedPage.slug).map(item => item.key) : []
    const selectedPageExistingKeys = new Set(sections.map(section => section.key))
    const selectedPageMissingPresetKeys = selectedPagePresetKeys.filter(key => !selectedPageExistingKeys.has(key))

    const getLocalizedValue = (node: unknown, lang: 'ru' | 'en') => {
        if (typeof node === 'string') return node
        if (!isObjectRecord(node)) return ''
        const value = node[lang]
        return typeof value === 'string' ? value : ''
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Program & Static Pages Builder</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Динамические блоки и секции для публичных страниц
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={bootstrapProgramPages}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2.5 border border-navy-200 text-navy-900 text-sm font-medium rounded-lg hover:bg-navy-50 transition-colors disabled:opacity-50"
                            >
                                <Plus className="w-4 h-4" />
                                Создать preset pages
                            </button>
                            <button
                                onClick={() => openPageForm()}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Добавить страницу
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                        <button onClick={() => setError(null)} className="ml-2 font-bold">✕</button>
                    </div>
                )}
                {notice && (
                    <div className="mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">
                        {notice}
                        <button onClick={() => setNotice(null)} className="ml-2 font-bold">✕</button>
                    </div>
                )}

                {loading && (
                    <div className="flex items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        <section className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-4">
                            <label className="relative block mb-4">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Поиск страниц"
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </label>
                            <div className="mb-4 flex items-center gap-2">
                                <button
                                    onClick={() => setProgramOnly(true)}
                                    className={`px-3 py-1.5 text-xs rounded-full border ${programOnly ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-300'}`}
                                >
                                    Preset pages
                                </button>
                                <button
                                    onClick={() => setProgramOnly(false)}
                                    className={`px-3 py-1.5 text-xs rounded-full border ${!programOnly ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-300'}`}
                                >
                                    Все страницы
                                </button>
                            </div>

                            <div className="space-y-2">
                                {filteredPages.map(page => (
                                    <div
                                        key={page.id}
                                        className={`rounded-lg border p-3 ${selectedPageId === page.id ? 'border-navy-300 bg-navy-50/40' : 'border-gray-200'}`}
                                    >
                                        <button
                                            onClick={() => setSelectedPageId(page.id)}
                                            className="w-full text-left"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold text-sm text-gray-900 truncate">
                                                    {page.title_ru}
                                                </h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(page.status)}`}>
                                                    {page.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate mt-1">{page.title_en}</p>
                                            <p className="text-xs text-gray-400 truncate">
                                                /{page.slug} · v{page.version}
                                                {page.status === 'scheduled' && page.scheduled_at
                                                    ? ` · scheduled ${new Date(page.scheduled_at).toLocaleString()}`
                                                    : ''}
                                            </p>
                                        </button>

                                        <div className="mt-2 flex items-center gap-1.5">
                                            <button
                                                onClick={() => togglePagePublish(page)}
                                                className={`p-1.5 rounded transition-colors ${page.status === 'published' ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                                                title={page.status === 'published' ? 'Снять с публикации' : 'Опубликовать'}
                                            >
                                                {page.status === 'published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => openSecurePreview(page)}
                                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                                title="Preview"
                                                disabled={creatingPreviewId === page.id}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            {getProgramPublicPath(page.slug) && (
                                                <button
                                                    onClick={() => window.open(getProgramPublicPath(page.slug)!, '_blank', 'noopener,noreferrer')}
                                                    className="p-1.5 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded transition-colors"
                                                    title="Открыть публичную страницу"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => openPageForm(page)}
                                                className="p-1.5 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removePage(page.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {filteredPages.length === 0 && (
                                    <div className="text-center py-10 text-gray-500 text-sm">
                                        {programOnly ? 'Preset pages не найдены. Нажмите "Создать preset pages".' : 'Страницы не найдены'}
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="xl:col-span-3 bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {selectedPage ? selectedPage.title_ru : 'Выберите страницу'}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {selectedPage ? `${sections.length} секций` : 'Управление секциями'}
                                    </p>
                                    {selectedPage && getProgramPublicPath(selectedPage.slug) && (
                                        <button
                                            onClick={() => window.open(getProgramPublicPath(selectedPage.slug)!, '_blank', 'noopener,noreferrer')}
                                            className="mt-2 inline-flex items-center gap-1 text-xs text-navy-700 hover:text-navy-900"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Открыть {getProgramPublicPath(selectedPage.slug)}
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    {selectedPage?.slug === 'program-primary' && (
                                        <button
                                            onClick={syncPrimaryPageFromCurrentContent}
                                            disabled={saving}
                                            className="inline-flex items-center gap-2 px-3 py-2 border border-green-200 text-green-700 text-sm font-medium rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Синхронизировать с текущей страницей
                                        </button>
                                    )}
                                    {selectedPage?.slug === 'program-middle' && (
                                        <button
                                            onClick={syncMiddlePageFromCurrentContent}
                                            disabled={saving}
                                            className="inline-flex items-center gap-2 px-3 py-2 border border-green-200 text-green-700 text-sm font-medium rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Синхронизировать с текущей страницей
                                        </button>
                                    )}
                                    {selectedPage?.slug === 'program-senior' && (
                                        <button
                                            onClick={syncSeniorPageFromCurrentContent}
                                            disabled={saving}
                                            className="inline-flex items-center gap-2 px-3 py-2 border border-green-200 text-green-700 text-sm font-medium rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Синхронизировать с текущей страницей
                                        </button>
                                    )}
                                    <button
                                        onClick={bootstrapProgramSections}
                                        disabled={!selectedPage || !getProgramSectionKeys(selectedPage.slug).length || saving}
                                        className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Добавить preset секции
                                    </button>
                                    <button
                                        onClick={() => openSectionForm()}
                                        disabled={!selectedPage}
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Добавить секцию
                                    </button>
                                </div>
                            </div>

                            {selectedPage && getProgramSectionKeys(selectedPage.slug).length > 0 && (
                                <div className="mb-4 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <p className="font-semibold mb-1">Ключи секций для этой программы:</p>
                                    <p>{getProgramSectionKeys(selectedPage.slug).map(item => item.key).join(', ')}</p>
                                </div>
                            )}

                            {selectedPage && selectedPagePresetKeys.length > 0 && (
                                <div className="mb-4 rounded-lg border border-gray-200 p-3 bg-white">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                        {selectedPageMissingPresetKeys.length === 0 ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                                        )}
                                        Готовность страницы программы
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Обязательных preset секций: {selectedPagePresetKeys.length}. Создано: {selectedPagePresetKeys.length - selectedPageMissingPresetKeys.length}.
                                    </p>
                                    {selectedPageMissingPresetKeys.length > 0 && (
                                        <p className="text-xs text-amber-700 mt-2">
                                            Не хватает секций: {selectedPageMissingPresetKeys.join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}

                            {!selectedPage && (
                                <div className="text-center py-14 text-gray-500">
                                    Выберите страницу слева
                                </div>
                            )}

                            {selectedPage && sections.length === 0 && (
                                <div className="text-center py-14 text-gray-500">
                                    <p>Секций пока нет</p>
                                    <p className="text-xs mt-2">
                                        Нажмите <strong>«Добавить preset секции»</strong>, затем редактируйте каждую секцию через иконку карандаша.
                                    </p>
                                </div>
                            )}

                            {selectedPage && sections.length > 0 && (
                                <div className="space-y-2">
                                    <div className="text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
                                        Редактирование контента: нажмите иконку <strong>карандаша</strong> у нужной секции, измените <strong>Payload JSON</strong>, проверьте payload кнопкой <strong>«Проверить»</strong>, сохраните и затем переведите страницу в <strong>published</strong>.
                                    </div>
                                    {sections.map((section, index) => (
                                        <div key={section.id} className="border border-gray-200 rounded-lg p-3">
                                            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {SECTION_UI_META[section.key]?.title || section.key}
                                                        </p>
                                                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                            {section.type}
                                                        </span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${section.is_enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                            {section.is_enabled ? 'enabled' : 'disabled'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate mt-1">
                                                        {SECTION_UI_META[section.key]?.hint || 'Технический ключ секции'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate mt-1">
                                                        {extractSectionSummary(section.payload)}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 truncate mt-1">
                                                        key: {section.key}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        onClick={() => moveSection(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30"
                                                        title="Вверх"
                                                    >
                                                        <ArrowUp className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => moveSection(index, 'down')}
                                                        disabled={index === sections.length - 1}
                                                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-30"
                                                        title="Вниз"
                                                    >
                                                        <ArrowDown className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleSectionEnabled(section)}
                                                        className={`p-1.5 rounded transition-colors ${section.is_enabled ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                                                        title={section.is_enabled ? 'Отключить секцию' : 'Включить секцию'}
                                                    >
                                                        {section.is_enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => openSectionForm(section)}
                                                        className="p-1.5 text-gray-400 hover:text-navy-700 hover:bg-gray-100 rounded transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeSection(section.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </main>

            {showPageForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingPage ? 'Редактировать страницу' : 'Новая страница'}
                            </h2>
                            <button onClick={closePageForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (RU) *</label>
                                    <input
                                        type="text"
                                        value={pageForm.title_ru}
                                        onChange={e => {
                                            const value = e.target.value
                                            setPageForm(prev => ({ ...prev, title_ru: value }))
                                            if (!pageForm.slug) {
                                                setPageForm(prev => ({ ...prev, slug: generateSlug(value) }))
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN) *</label>
                                    <input
                                        type="text"
                                        value={pageForm.title_en}
                                        onChange={e => setPageForm(prev => ({ ...prev, title_en: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        value={pageForm.slug}
                                        onChange={e => setPageForm(prev => ({ ...prev, slug: e.target.value }))}
                                        placeholder="about-team"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={pageForm.status}
                                        onChange={e => setPageForm(prev => ({ ...prev, status: e.target.value as CmsPageStatus }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    >
                                        <option value="draft">draft</option>
                                        <option value="review">review</option>
                                        <option value="scheduled">scheduled</option>
                                        <option value="published">published</option>
                                        <option value="archived">archived</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={pageForm.version}
                                        onChange={e => setPageForm(prev => ({ ...prev, version: Math.max(1, Number(e.target.value) || 1) }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled at</label>
                                <input
                                    type="datetime-local"
                                    value={pageForm.scheduled_at}
                                    onChange={e => setPageForm(prev => ({ ...prev, scheduled_at: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Published at</label>
                                <input
                                    type="datetime-local"
                                    value={pageForm.published_at}
                                    onChange={e => setPageForm(prev => ({ ...prev, published_at: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                />
                            </div>

                            <div className="border border-gray-200 rounded-xl p-4 space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900">SEO Metadata</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO title</label>
                                    <input
                                        type="text"
                                        value={pageForm.seo_title}
                                        onChange={e => setPageForm(prev => ({ ...prev, seo_title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO description</label>
                                    <textarea
                                        rows={3}
                                        value={pageForm.seo_description}
                                        onChange={e => setPageForm(prev => ({ ...prev, seo_description: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                                        <input
                                            type="url"
                                            value={pageForm.canonical_url}
                                            onChange={e => setPageForm(prev => ({ ...prev, canonical_url: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">OG image URL</label>
                                        <input
                                            type="url"
                                            value={pageForm.og_image_url}
                                            onChange={e => setPageForm(prev => ({ ...prev, og_image_url: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={pageForm.robots_index}
                                            onChange={e => setPageForm(prev => ({ ...prev, robots_index: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Robots index
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={pageForm.robots_follow}
                                            onChange={e => setPageForm(prev => ({ ...prev, robots_follow: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Robots follow
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={pageForm.structured_data_enabled}
                                            onChange={e => setPageForm(prev => ({ ...prev, structured_data_enabled: e.target.checked }))}
                                            className="rounded border-gray-300"
                                        />
                                        Structured data
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Structured data type</label>
                                    <input
                                        type="text"
                                        value={pageForm.structured_data_type}
                                        onChange={e => setPageForm(prev => ({ ...prev, structured_data_type: e.target.value }))}
                                        placeholder="WebPage, Article..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closePageForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={savePage}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSectionForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingSection ? 'Редактировать секцию' : 'Новая секция'}
                            </h2>
                            <button onClick={closeSectionForm} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section key (optional)</label>
                                    <input
                                        type="text"
                                        value={sectionForm.key}
                                        onChange={e => setSectionForm(prev => ({ ...prev, key: e.target.value }))}
                                        placeholder="hero-main (если пусто, сгенерируется автоматически)"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section type</label>
                                    <select
                                        value={sectionForm.type}
                                        onChange={e => applySectionTemplate(e.target.value as CmsSectionType)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                    >
                                        <option value="hero">hero</option>
                                        <option value="content">content</option>
                                        <option value="cards">cards</option>
                                        <option value="cta">cta</option>
                                        <option value="media">media</option>
                                        <option value="custom">custom</option>
                                    </select>
                                </div>
                            </div>

                            {isTypedSection && parsedSectionPayload && (
                                <div className="border border-blue-100 bg-blue-50/50 rounded-xl p-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-blue-900">Типизированный редактор секции</h3>
                                        <button
                                            type="button"
                                            onClick={() => setShowRawPayloadEditor(prev => !prev)}
                                            className="text-xs px-2 py-1 rounded-md border border-blue-200 text-blue-700 hover:bg-blue-100"
                                        >
                                            {showRawPayloadEditor ? 'Скрыть JSON' : 'Показать JSON'}
                                        </button>
                                    </div>

                                    {sectionKey === 'junior-hero' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title (RU) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title (EN) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle (RU) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.subtitle, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.subtitle = { ru: e.target.value, en: getLocalizedValue(payload.subtitle, 'en') }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle (EN) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.subtitle, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.subtitle = { ru: getLocalizedValue(payload.subtitle, 'ru'), en: e.target.value }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">CTA text (RU) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.ctaText, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.ctaText = { ru: e.target.value, en: getLocalizedValue(payload.ctaText, 'en') }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">CTA text (EN) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.ctaText, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.ctaText = { ru: getLocalizedValue(payload.ctaText, 'ru'), en: e.target.value }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">CTA link</label>
                                                <input
                                                    type="text"
                                                    value={typeof parsedSectionPayload.ctaLink === 'string' ? parsedSectionPayload.ctaLink : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.ctaLink = e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Background image URL *</label>
                                                <div className="flex flex-col gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.backgroundImage === 'string' ? parsedSectionPayload.backgroundImage : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.backgroundImage = e.target.value
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === 'junior-hero-bg' ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === 'junior-hero-bg'}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, 'junior-hero-bg', (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.backgroundImage = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                {typeof parsedSectionPayload.backgroundImage === 'string' && parsedSectionPayload.backgroundImage && (
                                                    <div className="mt-2 relative w-full h-28 rounded-lg overflow-hidden border border-gray-200">
                                                        <Image
                                                            src={parsedSectionPayload.backgroundImage}
                                                            alt="Hero background"
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {sectionKey === 'junior-cta' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title (RU) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title (EN) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Primary CTA (RU) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.primaryText, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.primaryText = { ru: e.target.value, en: getLocalizedValue(payload.primaryText, 'en') }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Primary CTA (EN) *</label>
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.primaryText, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.primaryText = { ru: getLocalizedValue(payload.primaryText, 'ru'), en: e.target.value }
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Primary link</label>
                                                    <input
                                                        type="text"
                                                        value={typeof parsedSectionPayload.primaryLink === 'string' ? parsedSectionPayload.primaryLink : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.primaryLink = e.target.value
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Secondary link</label>
                                                    <input
                                                        type="text"
                                                        value={typeof parsedSectionPayload.secondaryLink === 'string' ? parsedSectionPayload.secondaryLink : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.secondaryLink = e.target.value
                                                        })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {sectionKey === 'junior-gallery' && (
                                        <div className="space-y-3">
                                            {(() => {
                                                const items = Array.isArray(parsedSectionPayload)
                                                    ? parsedSectionPayload
                                                    : (isObjectRecord(parsedSectionPayload) && Array.isArray(parsedSectionPayload.images) ? parsedSectionPayload.images : [])

                                                return (
                                                    <>
                                                        <div className="text-xs text-gray-600">
                                                            Фото в галерее: {items.length}
                                                        </div>
                                                        {items.map((item, idx) => {
                                                            const itemRecord = isObjectRecord(item) ? item : {}
                                                            const currentSrc = typeof itemRecord.src === 'string'
                                                                ? itemRecord.src
                                                                : (typeof itemRecord.url === 'string' ? itemRecord.url : '')

                                                            return (
                                                                <div key={`gallery-item-${idx}`} className="border border-gray-200 rounded-lg p-3 space-y-2">
                                                                    <div className="flex justify-between items-center">
                                                                        <p className="text-xs font-medium text-gray-700">Фото #{idx + 1}</p>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => mutateSectionPayload(payload => {
                                                                                const next = Array.isArray(payload)
                                                                                    ? [...payload]
                                                                                    : (isObjectRecord(payload) && Array.isArray(payload.images) ? [...payload.images] : [])
                                                                                next.splice(idx, 1)
                                                                                if (Array.isArray(payload)) {
                                                                                    next.forEach((v, i) => { (payload as unknown[])[i] = v })
                                                                                    ;(payload as unknown[]).length = next.length
                                                                                } else if (isObjectRecord(payload)) {
                                                                                    payload.images = next
                                                                                }
                                                                            })}
                                                                            className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                                        >
                                                                            Удалить
                                                                        </button>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                        <input
                                                                            type="url"
                                                                            value={currentSrc}
                                                                            onChange={e => mutateSectionPayload(payload => {
                                                                                const next = Array.isArray(payload)
                                                                                    ? [...payload]
                                                                                    : (isObjectRecord(payload) && Array.isArray(payload.images) ? [...payload.images] : [])
                                                                                if (!isObjectRecord(next[idx])) next[idx] = {}
                                                                                ;(next[idx] as Record<string, unknown>).src = e.target.value
                                                                                ;(next[idx] as Record<string, unknown>).url = e.target.value
                                                                                if (Array.isArray(payload)) {
                                                                                    next.forEach((v, i) => { (payload as unknown[])[i] = v })
                                                                                } else if (isObjectRecord(payload)) {
                                                                                    payload.images = next
                                                                                }
                                                                            })}
                                                                            placeholder="Image URL"
                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                        />
                                                                        <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                                            <Upload className="w-3.5 h-3.5" />
                                                                            {uploadingMediaField === `junior-gallery-${idx}` ? 'Загрузка...' : 'Загрузить фото'}
                                                                            <input
                                                                                type="file"
                                                                                accept="image/jpeg,image/png,image/webp,image/avif"
                                                                                className="hidden"
                                                                                disabled={uploadingMediaField === `junior-gallery-${idx}`}
                                                                                onChange={async e => {
                                                                                    const file = e.target.files?.[0]
                                                                                    if (!file) return
                                                                                    await uploadImageForSection(file, `junior-gallery-${idx}`, (url) => {
                                                                                        mutateSectionPayload(payload => {
                                                                                            const next = Array.isArray(payload)
                                                                                                ? [...payload]
                                                                                                : (isObjectRecord(payload) && Array.isArray(payload.images) ? [...payload.images] : [])
                                                                                            if (!isObjectRecord(next[idx])) next[idx] = {}
                                                                                            ;(next[idx] as Record<string, unknown>).src = url
                                                                                            ;(next[idx] as Record<string, unknown>).url = url
                                                                                            if (Array.isArray(payload)) {
                                                                                                next.forEach((v, i) => { (payload as unknown[])[i] = v })
                                                                                            } else if (isObjectRecord(payload)) {
                                                                                                payload.images = next
                                                                                            }
                                                                                        })
                                                                                    })
                                                                                    e.target.value = ''
                                                                                }}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                        <input
                                                                            type="text"
                                                                            value={getLocalizedValue(itemRecord.alt, 'ru')}
                                                                            onChange={e => mutateSectionPayload(payload => {
                                                                                const next = Array.isArray(payload)
                                                                                    ? [...payload]
                                                                                    : (isObjectRecord(payload) && Array.isArray(payload.images) ? [...payload.images] : [])
                                                                                if (!isObjectRecord(next[idx])) next[idx] = {}
                                                                                const nextItem = next[idx] as Record<string, unknown>
                                                                                nextItem.alt = { ru: e.target.value, en: getLocalizedValue(nextItem.alt, 'en') }
                                                                                if (Array.isArray(payload)) {
                                                                                    next.forEach((v, i) => { (payload as unknown[])[i] = v })
                                                                                } else if (isObjectRecord(payload)) {
                                                                                    payload.images = next
                                                                                }
                                                                            })}
                                                                            placeholder="Alt RU"
                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={getLocalizedValue(itemRecord.alt, 'en')}
                                                                            onChange={e => mutateSectionPayload(payload => {
                                                                                const next = Array.isArray(payload)
                                                                                    ? [...payload]
                                                                                    : (isObjectRecord(payload) && Array.isArray(payload.images) ? [...payload.images] : [])
                                                                                if (!isObjectRecord(next[idx])) next[idx] = {}
                                                                                const nextItem = next[idx] as Record<string, unknown>
                                                                                nextItem.alt = { ru: getLocalizedValue(nextItem.alt, 'ru'), en: e.target.value }
                                                                                if (Array.isArray(payload)) {
                                                                                    next.forEach((v, i) => { (payload as unknown[])[i] = v })
                                                                                } else if (isObjectRecord(payload)) {
                                                                                    payload.images = next
                                                                                }
                                                                            })}
                                                                            placeholder="Alt EN"
                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                        />
                                                                    </div>
                                                                    {currentSrc && (
                                                                        <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                                                                            <Image
                                                                                src={currentSrc}
                                                                                alt={getLocalizedValue(itemRecord.alt, 'ru') || `Gallery image ${idx + 1}`}
                                                                                fill
                                                                                className="object-cover"
                                                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        })}
                                                        <button
                                                            type="button"
                                                            onClick={() => mutateSectionPayload(payload => {
                                                                const nextItem = {
                                                                    src: '',
                                                                    alt: { ru: '', en: '' },
                                                                }
                                                                if (Array.isArray(payload)) {
                                                                    payload.push(nextItem)
                                                                } else if (isObjectRecord(payload)) {
                                                                    const current = Array.isArray(payload.images) ? payload.images : []
                                                                    payload.images = [...current, nextItem]
                                                                }
                                                            })}
                                                            className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        >
                                                            + Добавить фото
                                                        </button>
                                                    </>
                                                )
                                            })()}
                                        </div>
                                    )}

                                    {sectionKey === 'junior-lifestyle-care-proof' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Message (RU) *</label>
                                                    <textarea
                                                        value={getLocalizedValue(parsedSectionPayload.message, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.message = { ru: e.target.value, en: getLocalizedValue(payload.message, 'en') }
                                                        })}
                                                        rows={2}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Message (EN) *</label>
                                                    <textarea
                                                        value={getLocalizedValue(parsedSectionPayload.message, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.message = { ru: getLocalizedValue(payload.message, 'ru'), en: e.target.value }
                                                        })}
                                                        rows={2}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {(() => {
                                                const images = Array.isArray(parsedSectionPayload.images) ? parsedSectionPayload.images : []
                                                const image = isObjectRecord(images[0]) ? images[0] : {}
                                                const src = typeof image.src === 'string' ? image.src : ''
                                                return (
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-medium text-gray-700">Фото секции *</label>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="url"
                                                                value={src}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload)) return
                                                                    const nextImage = { ...image, src: e.target.value }
                                                                    payload.images = [nextImage]
                                                                })}
                                                                placeholder="Image URL"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                                <Upload className="w-3.5 h-3.5" />
                                                                {uploadingMediaField === 'junior-lifestyle-care-proof' ? 'Загрузка...' : 'Загрузить фото'}
                                                                <input
                                                                    type="file"
                                                                    accept="image/jpeg,image/png,image/webp,image/avif"
                                                                    className="hidden"
                                                                    disabled={uploadingMediaField === 'junior-lifestyle-care-proof'}
                                                                    onChange={async e => {
                                                                        const file = e.target.files?.[0]
                                                                        if (!file) return
                                                                        await uploadImageForSection(file, 'junior-lifestyle-care-proof', (url) => {
                                                                            mutateSectionPayload(payload => {
                                                                                if (!isObjectRecord(payload)) return
                                                                                payload.images = [{ ...image, src: url }]
                                                                            })
                                                                        })
                                                                        e.target.value = ''
                                                                    }}
                                                                />
                                                            </label>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(image.caption, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload)) return
                                                                    payload.images = [{
                                                                        ...image,
                                                                        caption: { ru: e.target.value, en: getLocalizedValue(image.caption, 'en') },
                                                                    }]
                                                                })}
                                                                placeholder="Caption RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(image.caption, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload)) return
                                                                    payload.images = [{
                                                                        ...image,
                                                                        caption: { ru: getLocalizedValue(image.caption, 'ru'), en: e.target.value },
                                                                    }]
                                                                })}
                                                                placeholder="Caption EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        {src && (
                                                            <div className="relative w-full h-28 rounded-lg overflow-hidden border border-gray-200">
                                                                <Image
                                                                    src={src}
                                                                    alt={getLocalizedValue(image.caption, 'ru') || 'Lifestyle proof'}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    )}

                                    {sectionKey === 'junior-motivation-atmosphere-proof' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Фото секции *</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.image === 'string' ? parsedSectionPayload.image : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.image = e.target.value
                                                        })}
                                                        placeholder="Image URL"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === 'junior-motivation-atmosphere-proof' ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === 'junior-motivation-atmosphere-proof'}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, 'junior-motivation-atmosphere-proof', (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.image = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                {typeof parsedSectionPayload.image === 'string' && parsedSectionPayload.image && (
                                                    <div className="relative w-full h-28 rounded-lg overflow-hidden border border-gray-200">
                                                        <Image
                                                            src={parsedSectionPayload.image}
                                                            alt={getLocalizedValue(parsedSectionPayload.caption, 'ru') || 'Motivation proof'}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.caption, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.caption = { ru: e.target.value, en: getLocalizedValue(payload.caption, 'en') }
                                                    })}
                                                    placeholder="Caption RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.caption, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.caption = { ru: getLocalizedValue(payload.caption, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Caption EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {(sectionKey === 'junior-lifestyle-care-features'
                                        || sectionKey === 'junior-cognitive-foundation'
                                        || sectionKey === 'junior-motivation-atmosphere-features')
                                        && Array.isArray(parsedSectionPayload) && (
                                        <div className="space-y-3">
                                            <p className="text-xs text-gray-600">Карточек: {parsedSectionPayload.length}</p>
                                            {parsedSectionPayload.map((item, idx) => {
                                                const card = isObjectRecord(item) ? item : {}
                                                const firstDescription = Array.isArray(card.description) && isObjectRecord(card.description[0])
                                                    ? card.description[0]
                                                    : { ru: '', en: '' }
                                                return (
                                                    <div key={`primary-card-${idx}`} className="border border-gray-200 rounded-lg p-3 space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-xs font-medium text-gray-700">Карточка #{idx + 1}</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    payload.splice(idx, 1)
                                                                })}
                                                                className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={typeof card.icon === 'string' ? card.icon : ''}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.icon = e.target.value
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Icon name (например Brain)"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(card.title, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.title = { ru: e.target.value, en: getLocalizedValue(next.title, 'en') }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Title RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(card.title, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.title = { ru: getLocalizedValue(next.title, 'ru'), en: e.target.value }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Title EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(card.subtitle, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.subtitle = { ru: e.target.value, en: getLocalizedValue(next.subtitle, 'en') }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Subtitle RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(card.subtitle, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.subtitle = { ru: getLocalizedValue(next.subtitle, 'ru'), en: e.target.value }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Subtitle EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <textarea
                                                                rows={2}
                                                                value={getLocalizedValue(firstDescription, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.description = [{ ru: e.target.value, en: getLocalizedValue(firstDescription, 'en') }]
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Description RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <textarea
                                                                rows={2}
                                                                value={getLocalizedValue(firstDescription, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.description = [{ ru: getLocalizedValue(firstDescription, 'ru'), en: e.target.value }]
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Description EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        {sectionKey === 'junior-lifestyle-care-features' && (
                                                            <div className="space-y-2">
                                                                <label className="block text-xs font-medium text-gray-700">Фон карточки</label>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                    <input
                                                                        type="url"
                                                                        value={typeof card.backgroundImage === 'string' ? card.backgroundImage : ''}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!Array.isArray(payload)) return
                                                                            const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                            next.backgroundImage = e.target.value
                                                                            payload[idx] = next
                                                                        })}
                                                                        placeholder="Background image URL"
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                                        <Upload className="w-3.5 h-3.5" />
                                                                        {uploadingMediaField === `junior-lifestyle-card-bg-${idx}` ? 'Загрузка...' : 'Загрузить фон'}
                                                                        <input
                                                                            type="file"
                                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                                            className="hidden"
                                                                            disabled={uploadingMediaField === `junior-lifestyle-card-bg-${idx}`}
                                                                            onChange={async e => {
                                                                                const file = e.target.files?.[0]
                                                                                if (!file) return
                                                                                await uploadImageForSection(file, `junior-lifestyle-card-bg-${idx}`, (url) => {
                                                                                    mutateSectionPayload(payload => {
                                                                                        if (!Array.isArray(payload)) return
                                                                                        const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                                        next.backgroundImage = url
                                                                                        payload[idx] = next
                                                                                    })
                                                                                })
                                                                                e.target.value = ''
                                                                            }}
                                                                        />
                                                                    </label>
                                                                </div>
                                                                {typeof card.backgroundImage === 'string' && card.backgroundImage && (
                                                                    <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                                                                        <Image
                                                                            src={card.backgroundImage}
                                                                            alt={getLocalizedValue(card.title, 'ru') || `Lifestyle background ${idx + 1}`}
                                                                            fill
                                                                            className="object-cover"
                                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                        {sectionKey === 'junior-lifestyle-care-features' && (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.benefit, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!Array.isArray(payload)) return
                                                                        const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                        next.benefit = { ru: e.target.value, en: getLocalizedValue(next.benefit, 'en') }
                                                                        payload[idx] = next
                                                                    })}
                                                                    placeholder="Benefit RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.benefit, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!Array.isArray(payload)) return
                                                                        const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                        next.benefit = { ru: getLocalizedValue(next.benefit, 'ru'), en: e.target.value }
                                                                        payload[idx] = next
                                                                    })}
                                                                    placeholder="Benefit EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                        )}
                                                        {sectionKey === 'junior-motivation-atmosphere-features' && (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.example, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!Array.isArray(payload)) return
                                                                        const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                        next.example = { ru: e.target.value, en: getLocalizedValue(next.example, 'en') }
                                                                        payload[idx] = next
                                                                    })}
                                                                    placeholder="Example RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.example, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!Array.isArray(payload)) return
                                                                        const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                        next.example = { ru: getLocalizedValue(next.example, 'ru'), en: e.target.value }
                                                                        payload[idx] = next
                                                                    })}
                                                                    placeholder="Example EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                            <button
                                                type="button"
                                                onClick={() => mutateSectionPayload(payload => {
                                                    if (!Array.isArray(payload)) return
                                                    const baseCard: Record<string, unknown> = {
                                                        icon: '',
                                                        title: { ru: '', en: '' },
                                                        subtitle: { ru: '', en: '' },
                                                        description: [{ ru: '', en: '' }],
                                                    }
                                                    if (sectionKey === 'junior-lifestyle-care-features') {
                                                        baseCard.backgroundImage = ''
                                                    }
                                                    payload.push(baseCard)
                                                })}
                                                className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                                            >
                                                + Добавить карточку
                                            </button>
                                        </div>
                                    )}

                                    {sectionKey === 'junior-testimonials' && Array.isArray(parsedSectionPayload) && (
                                        <div className="space-y-3">
                                            <p className="text-xs text-gray-600">Отзывов: {parsedSectionPayload.length}</p>
                                            {parsedSectionPayload.map((item, idx) => {
                                                const t = isObjectRecord(item) ? item : {}
                                                const photo = typeof t.photo === 'string' ? t.photo : ''
                                                return (
                                                    <div key={`testimonial-${idx}`} className="border border-gray-200 rounded-lg p-3 space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-xs font-medium text-gray-700">Отзыв #{idx + 1}</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    payload.splice(idx, 1)
                                                                })}
                                                                className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(t.parentName, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.parentName = { ru: e.target.value, en: getLocalizedValue(next.parentName, 'en') }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Parent name RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(t.parentName, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.parentName = { ru: getLocalizedValue(next.parentName, 'ru'), en: e.target.value }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Parent name EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(t.childName, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.childName = { ru: e.target.value, en: getLocalizedValue(next.childName, 'en') }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Child name RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(t.childName, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.childName = { ru: getLocalizedValue(next.childName, 'ru'), en: e.target.value }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Child name EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(t.childGrade, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.childGrade = { ru: e.target.value, en: getLocalizedValue(next.childGrade, 'en') }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Grade RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(t.childGrade, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.childGrade = { ru: getLocalizedValue(next.childGrade, 'ru'), en: e.target.value }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Grade EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <textarea
                                                                rows={3}
                                                                value={getLocalizedValue(t.quote, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.quote = { ru: e.target.value, en: getLocalizedValue(next.quote, 'en') }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Quote RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <textarea
                                                                rows={3}
                                                                value={getLocalizedValue(t.quote, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.quote = { ru: getLocalizedValue(next.quote, 'ru'), en: e.target.value }
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Quote EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="url"
                                                                value={photo}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!Array.isArray(payload)) return
                                                                    const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                    next.photo = e.target.value
                                                                    payload[idx] = next
                                                                })}
                                                                placeholder="Photo URL"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                                <Upload className="w-3.5 h-3.5" />
                                                                {uploadingMediaField === `junior-testimonial-${idx}` ? 'Загрузка...' : 'Загрузить фото'}
                                                                <input
                                                                    type="file"
                                                                    accept="image/jpeg,image/png,image/webp,image/avif"
                                                                    className="hidden"
                                                                    disabled={uploadingMediaField === `junior-testimonial-${idx}`}
                                                                    onChange={async e => {
                                                                        const file = e.target.files?.[0]
                                                                        if (!file) return
                                                                        await uploadImageForSection(file, `junior-testimonial-${idx}`, (url) => {
                                                                            mutateSectionPayload(payload => {
                                                                                if (!Array.isArray(payload)) return
                                                                                const next = isObjectRecord(payload[idx]) ? payload[idx] as Record<string, unknown> : {}
                                                                                next.photo = url
                                                                                payload[idx] = next
                                                                            })
                                                                        })
                                                                        e.target.value = ''
                                                                    }}
                                                                />
                                                            </label>
                                                        </div>
                                                        {photo && (
                                                            <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                                                                <Image
                                                                    src={photo}
                                                                    alt={getLocalizedValue(t.parentName, 'ru') || 'Testimonial photo'}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                            <button
                                                type="button"
                                                onClick={() => mutateSectionPayload(payload => {
                                                    if (!Array.isArray(payload)) return
                                                    payload.push({
                                                        parentName: { ru: '', en: '' },
                                                        childName: { ru: '', en: '' },
                                                        childGrade: { ru: '', en: '' },
                                                        quote: { ru: '', en: '' },
                                                        photo: '',
                                                    })
                                                })}
                                                className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                                            >
                                                + Добавить отзыв
                                            </button>
                                        </div>
                                    )}

                                    {sectionKey === 'middle-academic-breakthrough' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: e.target.value, en: getLocalizedValue(payload.subtitle, 'en') }
                                                    })}
                                                    placeholder="Subtitle RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: getLocalizedValue(payload.subtitle, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Subtitle EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: e.target.value, en: getLocalizedValue(payload.description, 'en') }
                                                    })}
                                                    placeholder="Description RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: getLocalizedValue(payload.description, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Description EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.ctaText, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.ctaText = { ru: e.target.value, en: getLocalizedValue(payload.ctaText, 'en') }
                                                    })}
                                                    placeholder="CTA text RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.ctaText, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.ctaText = { ru: getLocalizedValue(payload.ctaText, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="CTA text EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={typeof parsedSectionPayload.ctaLink === 'string' ? parsedSectionPayload.ctaLink : ''}
                                                onChange={e => mutateSectionPayload(payload => {
                                                    if (!isObjectRecord(payload)) return
                                                    payload.ctaLink = e.target.value
                                                })}
                                                placeholder="CTA link"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Hero background</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.backgroundImage === 'string' ? parsedSectionPayload.backgroundImage : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.backgroundImage = e.target.value
                                                        })}
                                                        placeholder="Background image URL"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === 'middle-academic-bg' ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === 'middle-academic-bg'}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, 'middle-academic-bg', (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.backgroundImage = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(sectionKey === 'middle-discipline-environment'
                                        || sectionKey === 'middle-twenty-first-skills'
                                        || sectionKey === 'middle-leadership-governance')
                                        && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: e.target.value, en: getLocalizedValue(payload.subtitle, 'en') }
                                                    })}
                                                    placeholder="Subtitle RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: getLocalizedValue(payload.subtitle, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Subtitle EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>

                                            {Array.isArray(parsedSectionPayload.features) && (
                                                <div className="space-y-3">
                                                    <p className="text-xs text-gray-600">Карточек: {parsedSectionPayload.features.length}</p>
                                                    {parsedSectionPayload.features.map((feature, idx) => {
                                                        const f = isObjectRecord(feature) ? feature : {}
                                                        return (
                                                            <div key={`middle-feature-${sectionKey}-${idx}`} className="border border-gray-200 rounded-lg p-3 space-y-2">
                                                                <div className="flex justify-between items-center">
                                                                    <p className="text-xs font-medium text-gray-700">Карточка #{idx + 1}</p>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.features)) return
                                                                            payload.features.splice(idx, 1)
                                                                        })}
                                                                        className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                                    >
                                                                        Удалить
                                                                    </button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    value={typeof f.icon === 'string' ? f.icon : ''}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.features)) return
                                                                        const next = isObjectRecord(payload.features[idx]) ? payload.features[idx] as Record<string, unknown> : {}
                                                                        next.icon = e.target.value
                                                                        payload.features[idx] = next
                                                                    })}
                                                                    placeholder="Icon"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                    <input
                                                                        type="text"
                                                                        value={getLocalizedValue(f.title, 'ru')}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.features)) return
                                                                            const next = isObjectRecord(payload.features[idx]) ? payload.features[idx] as Record<string, unknown> : {}
                                                                            next.title = { ru: e.target.value, en: getLocalizedValue(next.title, 'en') }
                                                                            payload.features[idx] = next
                                                                        })}
                                                                        placeholder="Title RU"
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={getLocalizedValue(f.title, 'en')}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.features)) return
                                                                            const next = isObjectRecord(payload.features[idx]) ? payload.features[idx] as Record<string, unknown> : {}
                                                                            next.title = { ru: getLocalizedValue(next.title, 'ru'), en: e.target.value }
                                                                            payload.features[idx] = next
                                                                        })}
                                                                        placeholder="Title EN"
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                    <textarea
                                                                        rows={2}
                                                                        value={getLocalizedValue(f.description, 'ru')}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.features)) return
                                                                            const next = isObjectRecord(payload.features[idx]) ? payload.features[idx] as Record<string, unknown> : {}
                                                                            next.description = { ru: e.target.value, en: getLocalizedValue(next.description, 'en') }
                                                                            payload.features[idx] = next
                                                                        })}
                                                                        placeholder="Description RU"
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                    <textarea
                                                                        rows={2}
                                                                        value={getLocalizedValue(f.description, 'en')}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.features)) return
                                                                            const next = isObjectRecord(payload.features[idx]) ? payload.features[idx] as Record<string, unknown> : {}
                                                                            next.description = { ru: getLocalizedValue(next.description, 'ru'), en: e.target.value }
                                                                            payload.features[idx] = next
                                                                        })}
                                                                        placeholder="Description EN"
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                    <button
                                                        type="button"
                                                        onClick={() => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            const features = Array.isArray(payload.features) ? payload.features : []
                                                            features.push({
                                                                icon: '',
                                                                title: { ru: '', en: '' },
                                                                description: { ru: '', en: '' },
                                                            })
                                                            payload.features = features
                                                        })}
                                                        className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    >
                                                        + Добавить карточку
                                                    </button>
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Proof image</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.proofImage === 'string' ? parsedSectionPayload.proofImage : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.proofImage = e.target.value
                                                        })}
                                                        placeholder="Proof image URL"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === `${sectionKey}-proof` ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === `${sectionKey}-proof`}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, `${sectionKey}-proof`, (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.proofImage = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.proofCaption, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.proofCaption = { ru: e.target.value, en: getLocalizedValue(payload.proofCaption, 'en') }
                                                        })}
                                                        placeholder="Proof caption RU"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.proofCaption, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.proofCaption = { ru: getLocalizedValue(payload.proofCaption, 'ru'), en: e.target.value }
                                                        })}
                                                        placeholder="Proof caption EN"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {sectionKey === 'middle-leadership-governance' && (
                                                <>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <input
                                                            type="text"
                                                            value={getLocalizedValue(parsedSectionPayload.ctaText, 'ru')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.ctaText = { ru: e.target.value, en: getLocalizedValue(payload.ctaText, 'en') }
                                                            })}
                                                            placeholder="CTA text RU"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={getLocalizedValue(parsedSectionPayload.ctaText, 'en')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.ctaText = { ru: getLocalizedValue(payload.ctaText, 'ru'), en: e.target.value }
                                                            })}
                                                            placeholder="CTA text EN"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={typeof parsedSectionPayload.ctaLink === 'string' ? parsedSectionPayload.ctaLink : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.ctaLink = e.target.value
                                                        })}
                                                        placeholder="CTA link"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {sectionKey === 'middle-twenty-first-skills' && isObjectRecord(parsedSectionPayload) && Array.isArray(parsedSectionPayload.skills) && (
                                        <div className="space-y-3">
                                            <p className="text-xs text-gray-600">Skills: {parsedSectionPayload.skills.length}</p>
                                            {parsedSectionPayload.skills.map((skill, idx) => {
                                                const s = isObjectRecord(skill) ? skill : {}
                                                return (
                                                    <div key={`middle-skill-${idx}`} className="border border-gray-200 rounded-lg p-3 space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-xs font-medium text-gray-700">Skill #{idx + 1}</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload) || !Array.isArray(payload.skills)) return
                                                                    payload.skills.splice(idx, 1)
                                                                })}
                                                                className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={typeof s.icon === 'string' ? s.icon : ''}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload) || !Array.isArray(payload.skills)) return
                                                                const next = isObjectRecord(payload.skills[idx]) ? payload.skills[idx] as Record<string, unknown> : {}
                                                                next.icon = e.target.value
                                                                payload.skills[idx] = next
                                                            })}
                                                            placeholder="Icon"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(s.title, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload) || !Array.isArray(payload.skills)) return
                                                                    const next = isObjectRecord(payload.skills[idx]) ? payload.skills[idx] as Record<string, unknown> : {}
                                                                    next.title = { ru: e.target.value, en: getLocalizedValue(next.title, 'en') }
                                                                    payload.skills[idx] = next
                                                                })}
                                                                placeholder="Title RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={getLocalizedValue(s.title, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload) || !Array.isArray(payload.skills)) return
                                                                    const next = isObjectRecord(payload.skills[idx]) ? payload.skills[idx] as Record<string, unknown> : {}
                                                                    next.title = { ru: getLocalizedValue(next.title, 'ru'), en: e.target.value }
                                                                    payload.skills[idx] = next
                                                                })}
                                                                placeholder="Title EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <textarea
                                                                rows={2}
                                                                value={getLocalizedValue(s.description, 'ru')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload) || !Array.isArray(payload.skills)) return
                                                                    const next = isObjectRecord(payload.skills[idx]) ? payload.skills[idx] as Record<string, unknown> : {}
                                                                    next.description = { ru: e.target.value, en: getLocalizedValue(next.description, 'en') }
                                                                    payload.skills[idx] = next
                                                                })}
                                                                placeholder="Description RU"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                            <textarea
                                                                rows={2}
                                                                value={getLocalizedValue(s.description, 'en')}
                                                                onChange={e => mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload) || !Array.isArray(payload.skills)) return
                                                                    const next = isObjectRecord(payload.skills[idx]) ? payload.skills[idx] as Record<string, unknown> : {}
                                                                    next.description = { ru: getLocalizedValue(next.description, 'ru'), en: e.target.value }
                                                                    payload.skills[idx] = next
                                                                })}
                                                                placeholder="Description EN"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <button
                                                type="button"
                                                onClick={() => mutateSectionPayload(payload => {
                                                    if (!isObjectRecord(payload)) return
                                                    const skills = Array.isArray(payload.skills) ? payload.skills : []
                                                    skills.push({
                                                        icon: '',
                                                        title: { ru: '', en: '' },
                                                        description: { ru: '', en: '' },
                                                    })
                                                    payload.skills = skills
                                                })}
                                                className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                                            >
                                                + Добавить skill
                                            </button>
                                        </div>
                                    )}

                                    {sectionKey === 'middle-cta' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: e.target.value, en: getLocalizedValue(payload.description, 'en') }
                                                    })}
                                                    placeholder="Description RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: getLocalizedValue(payload.description, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Description EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(isObjectRecord(parsedSectionPayload.primaryCTA) ? parsedSectionPayload.primaryCTA.text : undefined, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.primaryCTA) ? payload.primaryCTA : {}
                                                        payload.primaryCTA = {
                                                            ...current,
                                                            text: { ru: e.target.value, en: getLocalizedValue(current.text, 'en') },
                                                        }
                                                    })}
                                                    placeholder="Primary CTA RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(isObjectRecord(parsedSectionPayload.primaryCTA) ? parsedSectionPayload.primaryCTA.text : undefined, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.primaryCTA) ? payload.primaryCTA : {}
                                                        payload.primaryCTA = {
                                                            ...current,
                                                            text: { ru: getLocalizedValue(current.text, 'ru'), en: e.target.value },
                                                        }
                                                    })}
                                                    placeholder="Primary CTA EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.primaryCTA) && typeof parsedSectionPayload.primaryCTA.link === 'string' ? parsedSectionPayload.primaryCTA.link : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.primaryCTA) ? payload.primaryCTA : {}
                                                        payload.primaryCTA = { ...current, link: e.target.value }
                                                    })}
                                                    placeholder="Primary CTA link"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(isObjectRecord(parsedSectionPayload.secondaryCTA) ? parsedSectionPayload.secondaryCTA.text : undefined, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.secondaryCTA) ? payload.secondaryCTA : {}
                                                        payload.secondaryCTA = {
                                                            ...current,
                                                            text: { ru: e.target.value, en: getLocalizedValue(current.text, 'en') },
                                                        }
                                                    })}
                                                    placeholder="Secondary CTA RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(isObjectRecord(parsedSectionPayload.secondaryCTA) ? parsedSectionPayload.secondaryCTA.text : undefined, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.secondaryCTA) ? payload.secondaryCTA : {}
                                                        payload.secondaryCTA = {
                                                            ...current,
                                                            text: { ru: getLocalizedValue(current.text, 'ru'), en: e.target.value },
                                                        }
                                                    })}
                                                    placeholder="Secondary CTA EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.secondaryCTA) && typeof parsedSectionPayload.secondaryCTA.link === 'string' ? parsedSectionPayload.secondaryCTA.link : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.secondaryCTA) ? payload.secondaryCTA : {}
                                                        payload.secondaryCTA = { ...current, link: e.target.value }
                                                    })}
                                                    placeholder="Secondary CTA link"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {sectionKey === 'senior-offer' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.headline, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.headline = { ru: e.target.value, en: getLocalizedValue(payload.headline, 'en') }
                                                    })}
                                                    placeholder="Headline RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.headline, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.headline = { ru: getLocalizedValue(payload.headline, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Headline EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subheadline, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subheadline = { ru: e.target.value, en: getLocalizedValue(payload.subheadline, 'en') }
                                                    })}
                                                    placeholder="Subheadline RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subheadline, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subheadline = { ru: getLocalizedValue(payload.subheadline, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Subheadline EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.ctaText, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.ctaText = { ru: e.target.value, en: getLocalizedValue(payload.ctaText, 'en') }
                                                    })}
                                                    placeholder="CTA text RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.ctaText, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.ctaText = { ru: getLocalizedValue(payload.ctaText, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="CTA text EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={typeof parsedSectionPayload.ctaLink === 'string' ? parsedSectionPayload.ctaLink : ''}
                                                onChange={e => mutateSectionPayload(payload => {
                                                    if (!isObjectRecord(payload)) return
                                                    payload.ctaLink = e.target.value
                                                })}
                                                placeholder="CTA link"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Background image</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.backgroundImage === 'string' ? parsedSectionPayload.backgroundImage : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.backgroundImage = e.target.value
                                                        })}
                                                        placeholder="Background image URL"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === 'senior-offer-bg' ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === 'senior-offer-bg'}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, 'senior-offer-bg', (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.backgroundImage = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(sectionKey === 'senior-academic-results' || sectionKey === 'senior-cognitive-ai') && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.headline, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.headline = { ru: e.target.value, en: getLocalizedValue(payload.headline, 'en') }
                                                    })}
                                                    placeholder="Headline RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.headline, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.headline = { ru: getLocalizedValue(payload.headline, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Headline EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>

                                            {sectionKey === 'senior-academic-results' && (
                                                <>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <textarea
                                                            rows={2}
                                                            value={getLocalizedValue(parsedSectionPayload.description, 'ru')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.description = { ru: e.target.value, en: getLocalizedValue(payload.description, 'en') }
                                                            })}
                                                            placeholder="Description RU"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                        <textarea
                                                            rows={2}
                                                            value={getLocalizedValue(parsedSectionPayload.description, 'en')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.description = { ru: getLocalizedValue(payload.description, 'ru'), en: e.target.value }
                                                            })}
                                                            placeholder="Description EN"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <input
                                                            type="text"
                                                            value={getLocalizedValue(parsedSectionPayload.timeframe, 'ru')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.timeframe = { ru: e.target.value, en: getLocalizedValue(payload.timeframe, 'en') }
                                                            })}
                                                            placeholder="Timeframe RU"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={getLocalizedValue(parsedSectionPayload.timeframe, 'en')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.timeframe = { ru: getLocalizedValue(payload.timeframe, 'ru'), en: e.target.value }
                                                            })}
                                                            placeholder="Timeframe EN"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            {sectionKey === 'senior-cognitive-ai' && (
                                                <>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <textarea
                                                            rows={2}
                                                            value={getLocalizedValue(parsedSectionPayload.hook, 'ru')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.hook = { ru: e.target.value, en: getLocalizedValue(payload.hook, 'en') }
                                                            })}
                                                            placeholder="Hook RU"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                        <textarea
                                                            rows={2}
                                                            value={getLocalizedValue(parsedSectionPayload.hook, 'en')}
                                                            onChange={e => mutateSectionPayload(payload => {
                                                                if (!isObjectRecord(payload)) return
                                                                payload.hook = { ru: getLocalizedValue(payload.hook, 'ru'), en: e.target.value }
                                                            })}
                                                            placeholder="Hook EN"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Proof image</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.proofImage === 'string' ? parsedSectionPayload.proofImage : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.proofImage = e.target.value
                                                        })}
                                                        placeholder="Proof image URL"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === `${sectionKey}-proof` ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === `${sectionKey}-proof`}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, `${sectionKey}-proof`, (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.proofImage = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.proofCaption, 'ru')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.proofCaption = { ru: e.target.value, en: getLocalizedValue(payload.proofCaption, 'en') }
                                                        })}
                                                        placeholder="Proof caption RU"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={getLocalizedValue(parsedSectionPayload.proofCaption, 'en')}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.proofCaption = { ru: getLocalizedValue(payload.proofCaption, 'ru'), en: e.target.value }
                                                        })}
                                                        placeholder="Proof caption EN"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {sectionKey === 'results-hero' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.eyebrow, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.eyebrow = { ru: e.target.value, en: getLocalizedValue(payload.eyebrow, 'en') }
                                                    })}
                                                    placeholder="Eyebrow RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.eyebrow, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.eyebrow = { ru: getLocalizedValue(payload.eyebrow, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Eyebrow EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: e.target.value, en: getLocalizedValue(payload.subtitle, 'en') }
                                                    })}
                                                    placeholder="Subtitle RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: getLocalizedValue(payload.subtitle, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Subtitle EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Background image</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.backgroundImageUrl === 'string' ? parsedSectionPayload.backgroundImageUrl : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.backgroundImageUrl = e.target.value
                                                        })}
                                                        placeholder="Background image URL"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === 'results-hero-bg' ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === 'results-hero-bg'}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, 'results-hero-bg', (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.backgroundImageUrl = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {sectionKey === 'results-grid' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Grid title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Grid title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: e.target.value, en: getLocalizedValue(payload.description, 'en') }
                                                    })}
                                                    placeholder="Grid description RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: getLocalizedValue(payload.description, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Grid description EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>

                                            <div className="space-y-3 border border-gray-200 rounded-lg p-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-semibold text-gray-700">Карточки достижений</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            const items = Array.isArray(payload.items) ? payload.items : []
                                                            items.push({
                                                                studentName: { ru: '', en: '' },
                                                                achievementTitle: { ru: '', en: '' },
                                                                resultText: { ru: '', en: '' },
                                                                description: { ru: '', en: '' },
                                                                category: { ru: '', en: '' },
                                                                year: new Date().getFullYear(),
                                                                imageUrl: '',
                                                                imageAlt: { ru: '', en: '' },
                                                                isFeatured: false,
                                                                isEnabled: true,
                                                            })
                                                            payload.items = items
                                                        })}
                                                        className="text-xs px-2 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    >
                                                        + Добавить карточку
                                                    </button>
                                                </div>
                                                {(Array.isArray(parsedSectionPayload.items) ? parsedSectionPayload.items : []).map((item, idx) => {
                                                    const card = isObjectRecord(item) ? item : {}
                                                    return (
                                                        <div key={`result-card-editor-${idx}`} className="rounded-lg border border-gray-200 p-3 space-y-2 bg-white">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-xs font-medium text-gray-700">Карточка #{idx + 1}</p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        payload.items.splice(idx, 1)
                                                                    })}
                                                                    className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                                >
                                                                    Удалить
                                                                </button>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.studentName, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.studentName = { ru: e.target.value, en: getLocalizedValue(next.studentName, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Student name RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.studentName, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.studentName = { ru: getLocalizedValue(next.studentName, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Student name EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.achievementTitle, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.achievementTitle = { ru: e.target.value, en: getLocalizedValue(next.achievementTitle, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Achievement title RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.achievementTitle, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.achievementTitle = { ru: getLocalizedValue(next.achievementTitle, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Achievement title EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.resultText, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.resultText = { ru: e.target.value, en: getLocalizedValue(next.resultText, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Result text RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.resultText, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.resultText = { ru: getLocalizedValue(next.resultText, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Result text EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.category, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.category = { ru: e.target.value, en: getLocalizedValue(next.category, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Category RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.category, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.category = { ru: getLocalizedValue(next.category, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Category EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    value={typeof card.year === 'number' || typeof card.year === 'string' ? String(card.year) : ''}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.year = Number(e.target.value) || ''
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Year"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                    <input
                                                                        type="url"
                                                                        value={typeof card.imageUrl === 'string' ? card.imageUrl : ''}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                            const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                            next.imageUrl = e.target.value
                                                                            payload.items[idx] = next
                                                                        })}
                                                                        placeholder="Image URL"
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                                        <Upload className="w-3.5 h-3.5" />
                                                                        {uploadingMediaField === `results-card-${idx}` ? 'Загрузка...' : 'Загрузить фото'}
                                                                        <input
                                                                            type="file"
                                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                                            className="hidden"
                                                                            disabled={uploadingMediaField === `results-card-${idx}`}
                                                                            onChange={async e => {
                                                                                const file = e.target.files?.[0]
                                                                                if (!file) return
                                                                                await uploadImageForSection(file, `results-card-${idx}`, (url) => {
                                                                                    mutateSectionPayload(payload => {
                                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                                        next.imageUrl = url
                                                                                        payload.items[idx] = next
                                                                                    })
                                                                                })
                                                                                e.target.value = ''
                                                                            }}
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <textarea
                                                                    rows={2}
                                                                    value={getLocalizedValue(card.description, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.description = { ru: e.target.value, en: getLocalizedValue(next.description, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Description RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <textarea
                                                                    rows={2}
                                                                    value={getLocalizedValue(card.description, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.description = { ru: getLocalizedValue(next.description, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Description EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.imageAlt, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.imageAlt = { ru: e.target.value, en: getLocalizedValue(next.imageAlt, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Image alt RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.imageAlt, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.imageAlt = { ru: getLocalizedValue(next.imageAlt, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Image alt EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={card.isFeatured === true}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                            const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                            next.isFeatured = e.target.checked
                                                                            payload.items[idx] = next
                                                                        })}
                                                                        className="rounded border-gray-300"
                                                                    />
                                                                    Featured card
                                                                </label>
                                                                <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={card.isEnabled !== false}
                                                                        onChange={e => mutateSectionPayload(payload => {
                                                                            if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                            const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                            next.isEnabled = e.target.checked
                                                                            payload.items[idx] = next
                                                                        })}
                                                                        className="rounded border-gray-300"
                                                                    />
                                                                    Card enabled
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {sectionKey === 'results-cta' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="CTA title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="CTA title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: e.target.value, en: getLocalizedValue(payload.description, 'en') }
                                                    })}
                                                    placeholder="CTA description RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: getLocalizedValue(payload.description, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="CTA description EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.button) ? getLocalizedValue(parsedSectionPayload.button.label, 'ru') : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.button) ? payload.button : {}
                                                        const label = isObjectRecord(current.label) ? current.label : {}
                                                        payload.button = {
                                                            ...current,
                                                            label: { ...label, ru: e.target.value, en: getLocalizedValue(label, 'en') },
                                                        }
                                                    })}
                                                    placeholder="Button label RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.button) ? getLocalizedValue(parsedSectionPayload.button.label, 'en') : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.button) ? payload.button : {}
                                                        const label = isObjectRecord(current.label) ? current.label : {}
                                                        payload.button = {
                                                            ...current,
                                                            label: { ...label, ru: getLocalizedValue(label, 'ru'), en: e.target.value },
                                                        }
                                                    })}
                                                    placeholder="Button label EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={isObjectRecord(parsedSectionPayload.button) && typeof parsedSectionPayload.button.href === 'string' ? parsedSectionPayload.button.href : ''}
                                                onChange={e => mutateSectionPayload(payload => {
                                                    if (!isObjectRecord(payload)) return
                                                    const current = isObjectRecord(payload.button) ? payload.button : {}
                                                    payload.button = { ...current, href: e.target.value }
                                                })}
                                                placeholder="Button href"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    )}

                                    {sectionKey === 'about-hero' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: e.target.value, en: getLocalizedValue(payload.subtitle, 'en') }
                                                    })}
                                                    placeholder="Subtitle RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.subtitle, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.subtitle = { ru: getLocalizedValue(payload.subtitle, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Subtitle EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: e.target.value, en: getLocalizedValue(payload.description, 'en') }
                                                    })}
                                                    placeholder="Description RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: getLocalizedValue(payload.description, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Description EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Hero image</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        type="url"
                                                        value={typeof parsedSectionPayload.imageUrl === 'string' ? parsedSectionPayload.imageUrl : ''}
                                                        onChange={e => mutateSectionPayload(payload => {
                                                            if (!isObjectRecord(payload)) return
                                                            payload.imageUrl = e.target.value
                                                        })}
                                                        placeholder="Image URL"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === 'about-hero-image' ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp,image/avif"
                                                            className="hidden"
                                                            disabled={uploadingMediaField === 'about-hero-image'}
                                                            onChange={async e => {
                                                                const file = e.target.files?.[0]
                                                                if (!file) return
                                                                await uploadImageForSection(file, 'about-hero-image', (url) => {
                                                                    mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload)) return
                                                                        payload.imageUrl = url
                                                                    })
                                                                })
                                                                e.target.value = ''
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.button) ? getLocalizedValue(parsedSectionPayload.button.label, 'ru') : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.button) ? payload.button : {}
                                                        const label = isObjectRecord(current.label) ? current.label : {}
                                                        payload.button = {
                                                            ...current,
                                                            label: { ...label, ru: e.target.value, en: getLocalizedValue(label, 'en') },
                                                        }
                                                    })}
                                                    placeholder="Button label RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.button) ? getLocalizedValue(parsedSectionPayload.button.label, 'en') : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.button) ? payload.button : {}
                                                        const label = isObjectRecord(current.label) ? current.label : {}
                                                        payload.button = {
                                                            ...current,
                                                            label: { ...label, ru: getLocalizedValue(label, 'ru'), en: e.target.value },
                                                        }
                                                    })}
                                                    placeholder="Button label EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={isObjectRecord(parsedSectionPayload.button) && typeof parsedSectionPayload.button.href === 'string' ? parsedSectionPayload.button.href : ''}
                                                onChange={e => mutateSectionPayload(payload => {
                                                    if (!isObjectRecord(payload)) return
                                                    const current = isObjectRecord(payload.button) ? payload.button : {}
                                                    payload.button = { ...current, href: e.target.value }
                                                })}
                                                placeholder="Button href"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    )}

                                    {sectionKey === 'about-story' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={3}
                                                    value={getLocalizedValue(parsedSectionPayload.text, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.text = { ru: e.target.value, en: getLocalizedValue(payload.text, 'en') }
                                                    })}
                                                    placeholder="Text RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={3}
                                                    value={getLocalizedValue(parsedSectionPayload.text, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.text = { ru: getLocalizedValue(payload.text, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Text EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="url"
                                                    value={typeof parsedSectionPayload.imageUrl === 'string' ? parsedSectionPayload.imageUrl : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.imageUrl = e.target.value
                                                    })}
                                                    placeholder="Image URL"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                    <Upload className="w-3.5 h-3.5" />
                                                    {uploadingMediaField === 'about-story-image' ? 'Загрузка...' : 'Загрузить фото'}
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp,image/avif"
                                                        className="hidden"
                                                        disabled={uploadingMediaField === 'about-story-image'}
                                                        onChange={async e => {
                                                            const file = e.target.files?.[0]
                                                            if (!file) return
                                                            await uploadImageForSection(file, 'about-story-image', (url) => {
                                                                mutateSectionPayload(payload => {
                                                                    if (!isObjectRecord(payload)) return
                                                                    payload.imageUrl = url
                                                                })
                                                            })
                                                            e.target.value = ''
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.imageAlt, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.imageAlt = { ru: e.target.value, en: getLocalizedValue(payload.imageAlt, 'en') }
                                                    })}
                                                    placeholder="Image alt RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.imageAlt, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.imageAlt = { ru: getLocalizedValue(payload.imageAlt, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Image alt EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {(sectionKey === 'about-values' || sectionKey === 'about-stats') && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="Section title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="Section title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const items = Array.isArray(payload.items) ? payload.items as unknown[] : []
                                                        items.push({
                                                            badge: { ru: '', en: '' },
                                                            title: { ru: '', en: '' },
                                                            description: { ru: '', en: '' },
                                                            imageUrl: '',
                                                        })
                                                        payload.items = items
                                                    })}
                                                    className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                                                >
                                                    + Добавить карточку
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(Array.isArray(parsedSectionPayload.items) ? parsedSectionPayload.items : []).map((item, idx) => {
                                                    const card = isObjectRecord(item) ? item : {}
                                                    return (
                                                        <div key={`about-card-${idx}`} className="border border-gray-200 rounded-lg p-3 space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-xs font-medium text-gray-700">Карточка #{idx + 1}</p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        payload.items.splice(idx, 1)
                                                                    })}
                                                                    className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
                                                                >
                                                                    Удалить
                                                                </button>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.badge, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.badge = { ru: e.target.value, en: getLocalizedValue(next.badge, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Badge RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.badge, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.badge = { ru: getLocalizedValue(next.badge, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Badge EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.title, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.title = { ru: e.target.value, en: getLocalizedValue(next.title, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Title RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={getLocalizedValue(card.title, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.title = { ru: getLocalizedValue(next.title, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Title EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <textarea
                                                                    rows={2}
                                                                    value={getLocalizedValue(card.description, 'ru')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.description = { ru: e.target.value, en: getLocalizedValue(next.description, 'en') }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Description RU"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <textarea
                                                                    rows={2}
                                                                    value={getLocalizedValue(card.description, 'en')}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.description = { ru: getLocalizedValue(next.description, 'ru'), en: e.target.value }
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Description EN"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <input
                                                                    type="url"
                                                                    value={typeof card.imageUrl === 'string' ? card.imageUrl : ''}
                                                                    onChange={e => mutateSectionPayload(payload => {
                                                                        if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                        const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                        next.imageUrl = e.target.value
                                                                        payload.items[idx] = next
                                                                    })}
                                                                    placeholder="Image URL (optional)"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                />
                                                                <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                                    <Upload className="w-3.5 h-3.5" />
                                                                    {uploadingMediaField === `about-card-${idx}` ? 'Загрузка...' : 'Загрузить фото'}
                                                                    <input
                                                                        type="file"
                                                                        accept="image/jpeg,image/png,image/webp,image/avif"
                                                                        className="hidden"
                                                                        disabled={uploadingMediaField === `about-card-${idx}`}
                                                                        onChange={async e => {
                                                                            const file = e.target.files?.[0]
                                                                            if (!file) return
                                                                            await uploadImageForSection(file, `about-card-${idx}`, (url) => {
                                                                                mutateSectionPayload(payload => {
                                                                                    if (!isObjectRecord(payload) || !Array.isArray(payload.items)) return
                                                                                    const next = isObjectRecord(payload.items[idx]) ? payload.items[idx] as Record<string, unknown> : {}
                                                                                    next.imageUrl = url
                                                                                    payload.items[idx] = next
                                                                                })
                                                                            })
                                                                            e.target.value = ''
                                                                        }}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {sectionKey === 'about-cta' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: e.target.value, en: getLocalizedValue(payload.title, 'en') }
                                                    })}
                                                    placeholder="CTA title RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={getLocalizedValue(parsedSectionPayload.title, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.title = { ru: getLocalizedValue(payload.title, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="CTA title EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'ru')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: e.target.value, en: getLocalizedValue(payload.description, 'en') }
                                                    })}
                                                    placeholder="CTA description RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <textarea
                                                    rows={2}
                                                    value={getLocalizedValue(parsedSectionPayload.description, 'en')}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        payload.description = { ru: getLocalizedValue(payload.description, 'ru'), en: e.target.value }
                                                    })}
                                                    placeholder="CTA description EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.button) ? getLocalizedValue(parsedSectionPayload.button.label, 'ru') : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.button) ? payload.button : {}
                                                        const label = isObjectRecord(current.label) ? current.label : {}
                                                        payload.button = {
                                                            ...current,
                                                            label: { ...label, ru: e.target.value, en: getLocalizedValue(label, 'en') },
                                                        }
                                                    })}
                                                    placeholder="Button label RU"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={isObjectRecord(parsedSectionPayload.button) ? getLocalizedValue(parsedSectionPayload.button.label, 'en') : ''}
                                                    onChange={e => mutateSectionPayload(payload => {
                                                        if (!isObjectRecord(payload)) return
                                                        const current = isObjectRecord(payload.button) ? payload.button : {}
                                                        const label = isObjectRecord(current.label) ? current.label : {}
                                                        payload.button = {
                                                            ...current,
                                                            label: { ...label, ru: getLocalizedValue(label, 'ru'), en: e.target.value },
                                                        }
                                                    })}
                                                    placeholder="Button label EN"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={isObjectRecord(parsedSectionPayload.button) && typeof parsedSectionPayload.button.href === 'string' ? parsedSectionPayload.button.href : ''}
                                                onChange={e => mutateSectionPayload(payload => {
                                                    if (!isObjectRecord(payload)) return
                                                    const current = isObjectRecord(payload.button) ? payload.button : {}
                                                    payload.button = { ...current, href: e.target.value }
                                                })}
                                                placeholder="Button href"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                    )}

                                    {sectionKey === 'senior-selective-admission' && isObjectRecord(parsedSectionPayload) && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input type="text" value={getLocalizedValue(parsedSectionPayload.headline, 'ru')} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.headline = { ru: e.target.value, en: getLocalizedValue(payload.headline, 'en') } })} placeholder="Headline RU" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                                <input type="text" value={getLocalizedValue(parsedSectionPayload.headline, 'en')} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.headline = { ru: getLocalizedValue(payload.headline, 'ru'), en: e.target.value } })} placeholder="Headline EN" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <textarea rows={2} value={getLocalizedValue(parsedSectionPayload.filterMessage, 'ru')} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.filterMessage = { ru: e.target.value, en: getLocalizedValue(payload.filterMessage, 'en') } })} placeholder="Filter message RU" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                                <textarea rows={2} value={getLocalizedValue(parsedSectionPayload.filterMessage, 'en')} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.filterMessage = { ru: getLocalizedValue(payload.filterMessage, 'ru'), en: e.target.value } })} placeholder="Filter message EN" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input type="text" value={getLocalizedValue(parsedSectionPayload.ctaText, 'ru')} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.ctaText = { ru: e.target.value, en: getLocalizedValue(payload.ctaText, 'en') } })} placeholder="CTA text RU" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                                <input type="text" value={getLocalizedValue(parsedSectionPayload.ctaText, 'en')} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.ctaText = { ru: getLocalizedValue(payload.ctaText, 'ru'), en: e.target.value } })} placeholder="CTA text EN" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                            </div>
                                            <input type="text" value={typeof parsedSectionPayload.ctaLink === 'string' ? parsedSectionPayload.ctaLink : ''} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.ctaLink = e.target.value })} placeholder="CTA link" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-gray-700">Proof image</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input type="url" value={typeof parsedSectionPayload.proofImage === 'string' ? parsedSectionPayload.proofImage : ''} onChange={e => mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.proofImage = e.target.value })} placeholder="Proof image URL" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                                    <label className="inline-flex items-center gap-2 text-xs text-gray-600 cursor-pointer border border-gray-300 rounded-lg px-3 py-2">
                                                        <Upload className="w-3.5 h-3.5" />
                                                        {uploadingMediaField === 'senior-admission-proof' ? 'Загрузка...' : 'Загрузить фото'}
                                                        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" disabled={uploadingMediaField === 'senior-admission-proof'} onChange={async e => { const file = e.target.files?.[0]; if (!file) return; await uploadImageForSection(file, 'senior-admission-proof', (url) => { mutateSectionPayload(payload => { if (!isObjectRecord(payload)) return; payload.proofImage = url }) }); e.target.value = '' }} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Payload JSON</label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={runSectionPayloadValidation}
                                            className="text-xs px-2 py-1 rounded-md border border-blue-200 text-blue-700 hover:bg-blue-50"
                                        >
                                            Проверить
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => applySectionTemplate(sectionForm.type)}
                                            className="text-xs px-2 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
                                        >
                                            Вставить шаблон
                                        </button>
                                    </div>
                                </div>
                                {(!isTypedSection || showRawPayloadEditor) && (
                                    <>
                                        <textarea
                                            value={sectionForm.payloadText}
                                            onChange={e => setSectionForm(prev => ({ ...prev, payloadText: e.target.value }))}
                                            rows={10}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Поддерживаются локализованные поля вида <code>{'{ "ru": "...", "en": "..." }'}</code> и URL изображений в <code>imageUrl</code>.
                                        </p>
                                    </>
                                )}
                                {isTypedSection && !showRawPayloadEditor && (
                                    <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-md px-2 py-2">
                                        Для этой секции включен типизированный редактор. JSON скрыт, чтобы снизить риск ошибок.
                                    </p>
                                )}
                                {sectionValidationResult && (
                                    <div className="mt-3 space-y-2">
                                        {sectionValidationResult.errors.length === 0 && sectionValidationResult.warnings.length === 0 && (
                                            <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-md px-2 py-1">
                                                Payload валиден.
                                            </p>
                                        )}
                                        {sectionValidationResult.errors.length > 0 && (
                                            <div className="text-xs text-red-700 bg-red-50 border border-red-100 rounded-md px-2 py-2">
                                                <p className="font-semibold">Ошибки ({sectionValidationResult.errors.length})</p>
                                                <ul className="list-disc ml-4 mt-1 space-y-0.5">
                                                    {sectionValidationResult.errors.slice(0, 5).map(item => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {sectionValidationResult.warnings.length > 0 && (
                                            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-2 py-2">
                                                <p className="font-semibold">Предупреждения ({sectionValidationResult.warnings.length})</p>
                                                <ul className="list-disc ml-4 mt-1 space-y-0.5">
                                                    {sectionValidationResult.warnings.slice(0, 5).map(item => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={sectionForm.is_enabled}
                                    onChange={e => setSectionForm(prev => ({ ...prev, is_enabled: e.target.checked }))}
                                    className="rounded border-gray-300"
                                />
                                Секция включена
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeSectionForm}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={saveSection}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
