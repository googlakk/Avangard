import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import type { PublicLocale } from '@/lib/i18n'
import { localizePathname } from '@/lib/i18n'
import HomePage from '@/app/page'
import AboutPage from '@/app/about/page'
import AboutTeamPage from '@/app/about/team/page'
import ContactsPage from '@/app/contacts/page'
import ParentsAcademicsPage from '@/app/parents/academics/page'
import AdmissionPage from '@/app/parents/admission/page'
import ParentsCarePage from '@/app/parents/care/page'
import ParentsFaqPage from '@/app/parents/faq/page'
import ParentsSchoolPage from '@/app/parents/parents-school/page'
import ParentsPlatformsPage from '@/app/parents/platforms/page'
import ParentsValuesPage from '@/app/parents/values/page'
import ProgramsPage from '@/app/programs/page'
import PrimaryProgramPage from '@/app/programs/primary/page'
import DayInJuniorPage from '@/app/programs/primary/a-day-in-junior/page'
import BrainMethodologyPage from '@/app/programs/primary/brain-methodology/page'
import EnglishEnvironmentPage from '@/app/programs/primary/english-environment/page'
import MiddleProgramPage from '@/app/programs/middle/page'
import CambridgePathwayPage from '@/app/programs/middle/cambridge-pathway/page'
import ItSteamPage from '@/app/programs/middle/it-steam/page'
import LifeInMiddlePage from '@/app/programs/middle/life-in-middle/page'
import SeniorProgramPage from '@/app/programs/senior/page'
import ParentsRulesPage from '@/app/rules/parents/page'
import StudentsRulesPage from '@/app/rules/students/page'
import TeachersRulesPage from '@/app/rules/teachers/page'
import SafetyPage from '@/app/safety/page'
import StudentResultsPage from '@/app/students/results/page'
import TeacherBenefitsPage from '@/app/teachers/benefits/page'
import TeacherCareersPage from '@/app/teachers/careers/page'
import TeacherCulturePage from '@/app/teachers/culture/page'
import TeacherPlatformsPage from '@/app/teachers/platforms/page'
import TeachersSchoolPage from '@/app/teachers/teachers-school/page'

type PageProps = {
    params: { locale: PublicLocale; slug?: string[] }
}

type RouteEntry = {
    component: (locale: PublicLocale) => Promise<JSX.Element | null> | JSX.Element | null
    metadata: Record<PublicLocale, { title: string; description: string }>
}

const renderPage = (Component: any) => {
    const WrappedPage = (locale: PublicLocale) => <Component locale={locale} />
    WrappedPage.displayName = 'LocalizedPage'
    return WrappedPage
}

const ROUTES: Record<string, RouteEntry> = {
    '': {
        component: renderPage(HomePage),
        metadata: {
            ru: {
                title: 'INTELLECT INTERNATIONAL SCHOOL | Школа нового поколения',
                description: 'Частная школа в Бишкеке с Cambridge pathway, STEAM и билингвальным обучением.',
            },
            en: {
                title: 'INTELLECT INTERNATIONAL SCHOOL | School for the Next Generation',
                description: 'Private school in Bishkek with Cambridge pathway, STEAM and bilingual learning.',
            },
        },
    },
    'about': {
        component: renderPage(AboutPage),
        metadata: {
            ru: {
                title: 'О школе | Intellect School',
                description: 'История, миссия и подход Intellect International School.',
            },
            en: {
                title: 'About the School | Intellect School',
                description: 'The story, mission and educational approach of Intellect International School.',
            },
        },
    },
    'about/team': {
        component: renderPage(AboutTeamPage),
        metadata: {
            ru: {
                title: 'Команда | Intellect School',
                description: 'Преподаватели и сотрудники Intellect International School.',
            },
            en: {
                title: 'Team | Intellect School',
                description: 'Teachers and staff of Intellect International School.',
            },
        },
    },
    'contacts': {
        component: renderPage(ContactsPage),
        metadata: {
            ru: {
                title: 'Контакты | Intellect School',
                description: 'Свяжитесь с Intellect International School и получите консультацию по поступлению.',
            },
            en: {
                title: 'Contacts | Intellect School',
                description: 'Contact Intellect International School and request an admissions consultation.',
            },
        },
    },
    'parents/academics': {
        component: renderPage(ParentsAcademicsPage),
        metadata: {
            ru: {
                title: 'Академическая программа | Intellect School',
                description: 'Учебная программа и предметные направления для родителей.',
            },
            en: {
                title: 'Academic Program | Intellect School',
                description: 'Curriculum and subject pathways for parents.',
            },
        },
    },
    'parents/admission': {
        component: renderPage(AdmissionPage),
        metadata: {
            ru: {
                title: 'Поступление | Intellect School',
                description: 'Шаги поступления и список документов для Intellect International School.',
            },
            en: {
                title: 'Admissions | Intellect School',
                description: 'Admissions steps and required documents for Intellect International School.',
            },
        },
    },
    'parents/care': {
        component: renderPage(ParentsCarePage),
        metadata: {
            ru: {
                title: 'Забота о ребёнке | Intellect School',
                description: 'Подход школы к wellbeing, безопасности и поддержке детей.',
            },
            en: {
                title: 'Student Care | Intellect School',
                description: 'How the school approaches wellbeing, safety and student support.',
            },
        },
    },
    'parents/faq': {
        component: renderPage(ParentsFaqPage),
        metadata: {
            ru: {
                title: 'FAQ для родителей | Intellect School',
                description: 'Ответы на частые вопросы родителей о школе и поступлении.',
            },
            en: {
                title: 'Parent FAQ | Intellect School',
                description: 'Answers to common parent questions about the school and admissions.',
            },
        },
    },
    'parents/parents-school': {
        component: renderPage(ParentsSchoolPage),
        metadata: {
            ru: {
                title: 'Школа для родителей | Intellect School',
                description: 'Программа поддержки и вовлечения родителей Intellect School.',
            },
            en: {
                title: 'Parent School | Intellect School',
                description: 'Parent support and engagement program at Intellect School.',
            },
        },
    },
    'parents/platforms': {
        component: renderPage(ParentsPlatformsPage),
        metadata: {
            ru: {
                title: 'Платформы для родителей | Intellect School',
                description: 'Цифровые платформы и инструменты коммуникации для родителей.',
            },
            en: {
                title: 'Parent Platforms | Intellect School',
                description: 'Digital platforms and communication tools for parents.',
            },
        },
    },
    'parents/values': {
        component: renderPage(ParentsValuesPage),
        metadata: {
            ru: {
                title: 'Ценности школы | Intellect School',
                description: 'Ценности и принципы, на которых строится образовательная среда школы.',
            },
            en: {
                title: 'School Values | Intellect School',
                description: 'The values and principles shaping the school environment.',
            },
        },
    },
    'programs': {
        component: renderPage(ProgramsPage),
        metadata: {
            ru: {
                title: 'Программы | Intellect School',
                description: 'Обзор академических программ Intellect International School.',
            },
            en: {
                title: 'Programs | Intellect School',
                description: 'Overview of academic programs at Intellect International School.',
            },
        },
    },
    'programs/primary': {
        component: renderPage(PrimaryProgramPage),
        metadata: {
            ru: {
                title: 'Primary Program | Intellect School',
                description: 'Начальная школа и подход к раннему развитию.',
            },
            en: {
                title: 'Primary Program | Intellect School',
                description: 'Primary school and the approach to early development.',
            },
        },
    },
    'programs/primary/a-day-in-junior': {
        component: renderPage(DayInJuniorPage),
        metadata: {
            ru: {
                title: 'День в Junior School | Intellect School',
                description: 'Как проходит день ученика начальной школы.',
            },
            en: {
                title: 'A Day in Junior School | Intellect School',
                description: 'How a typical day looks for a junior school student.',
            },
        },
    },
    'programs/primary/brain-methodology': {
        component: renderPage(BrainMethodologyPage),
        metadata: {
            ru: {
                title: 'Brain Methodology | Intellect School',
                description: 'Подход школы к развитию памяти, мышления и когнитивных навыков.',
            },
            en: {
                title: 'Brain Methodology | Intellect School',
                description: 'How the school develops memory, thinking and cognitive skills.',
            },
        },
    },
    'programs/primary/english-environment': {
        component: renderPage(EnglishEnvironmentPage),
        metadata: {
            ru: {
                title: 'Английская среда | Intellect School',
                description: 'Билингвальная и английская языковая среда в junior program.',
            },
            en: {
                title: 'English Environment | Intellect School',
                description: 'Bilingual and English-speaking environment in the junior program.',
            },
        },
    },
    'programs/middle': {
        component: renderPage(MiddleProgramPage),
        metadata: {
            ru: {
                title: 'Middle Program | Intellect School',
                description: 'Средняя школа с Cambridge pathway, discipline и 21st century skills.',
            },
            en: {
                title: 'Middle Program | Intellect School',
                description: 'Middle school with Cambridge pathway, discipline and 21st century skills.',
            },
        },
    },
    'programs/middle/cambridge-pathway': {
        component: renderPage(CambridgePathwayPage),
        metadata: {
            ru: {
                title: 'Cambridge Pathway | Intellect School',
                description: 'Как в школе устроен академический Cambridge pathway.',
            },
            en: {
                title: 'Cambridge Pathway | Intellect School',
                description: 'How the school structures its academic Cambridge pathway.',
            },
        },
    },
    'programs/middle/it-steam': {
        component: renderPage(ItSteamPage),
        metadata: {
            ru: {
                title: 'IT & STEAM | Intellect School',
                description: 'Практический трек IT и STEAM в средней школе.',
            },
            en: {
                title: 'IT & STEAM | Intellect School',
                description: 'Practical IT and STEAM track in middle school.',
            },
        },
    },
    'programs/middle/life-in-middle': {
        component: renderPage(LifeInMiddlePage),
        metadata: {
            ru: {
                title: 'Жизнь в Middle School | Intellect School',
                description: 'Учёба, сообщество и развитие в средней школе.',
            },
            en: {
                title: 'Life in Middle School | Intellect School',
                description: 'Learning, community and growth in middle school.',
            },
        },
    },
    'programs/senior': {
        component: renderPage(SeniorProgramPage),
        metadata: {
            ru: {
                title: 'Senior Program | Intellect School',
                description: 'Старшая школа, академический трек и подготовка к университету.',
            },
            en: {
                title: 'Senior Program | Intellect School',
                description: 'Senior school, academic track and university preparation.',
            },
        },
    },
    'rules/parents': {
        component: renderPage(ParentsRulesPage),
        metadata: {
            ru: {
                title: 'Правила для родителей | Intellect School',
                description: 'Правила взаимодействия и обязанности родителей учащихся Intellect School.',
            },
            en: {
                title: 'Parent Guidelines | Intellect School',
                description: 'Rules of cooperation and parent responsibilities at Intellect School.',
            },
        },
    },
    'rules/students': {
        component: renderPage(StudentsRulesPage),
        metadata: {
            ru: {
                title: 'Правила для учеников | Intellect School',
                description: 'Кодекс поведения и академические ожидания для учеников.',
            },
            en: {
                title: 'Student Guidelines | Intellect School',
                description: 'Code of conduct and academic expectations for students.',
            },
        },
    },
    'rules/teachers': {
        component: renderPage(TeachersRulesPage),
        metadata: {
            ru: {
                title: 'Правила для учителей | Intellect School',
                description: 'Профессиональные стандарты и ожидания для преподавателей школы.',
            },
            en: {
                title: 'Teacher Guidelines | Intellect School',
                description: 'Professional standards and expectations for school teachers.',
            },
        },
    },
    'safety': {
        component: renderPage(SafetyPage),
        metadata: {
            ru: {
                title: 'Безопасность | Intellect School',
                description: 'Политики безопасности, здоровье и защита учеников Intellect School.',
            },
            en: {
                title: 'Safety | Intellect School',
                description: 'Safety policies, health and student protection at Intellect School.',
            },
        },
    },
    'students/results': {
        component: renderPage(StudentResultsPage),
        metadata: {
            ru: {
                title: 'Результаты учеников | Intellect School',
                description: 'Достижения, успехи и выдающиеся результаты учеников школы.',
            },
            en: {
                title: 'Student Results | Intellect School',
                description: 'Achievements, success stories and standout student results.',
            },
        },
    },
    'teachers/benefits': {
        component: renderPage(TeacherBenefitsPage),
        metadata: {
            ru: {
                title: 'Преимущества для учителей | Intellect School',
                description: 'Условия, возможности роста и преимущества работы в школе.',
            },
            en: {
                title: 'Teacher Benefits | Intellect School',
                description: 'Working conditions, growth opportunities and benefits for teachers.',
            },
        },
    },
    'teachers/careers': {
        component: renderPage(TeacherCareersPage),
        metadata: {
            ru: {
                title: 'Карьера | Intellect School',
                description: 'Открытые позиции и кадровый резерв Intellect International School.',
            },
            en: {
                title: 'Careers | Intellect School',
                description: 'Open roles and talent pool opportunities at Intellect International School.',
            },
        },
    },
    'teachers/culture': {
        component: renderPage(TeacherCulturePage),
        metadata: {
            ru: {
                title: 'Культура команды | Intellect School',
                description: 'Культура преподавания и командной работы в школе.',
            },
            en: {
                title: 'Team Culture | Intellect School',
                description: 'Teaching culture and teamwork at the school.',
            },
        },
    },
    'teachers/platforms': {
        component: renderPage(TeacherPlatformsPage),
        metadata: {
            ru: {
                title: 'Платформы для учителей | Intellect School',
                description: 'Цифровые платформы и рабочие инструменты для команды школы.',
            },
            en: {
                title: 'Teacher Platforms | Intellect School',
                description: 'Digital platforms and working tools for the school team.',
            },
        },
    },
    'teachers/teachers-school': {
        component: renderPage(TeachersSchoolPage),
        metadata: {
            ru: {
                title: 'Школа для учителей | Intellect School',
                description: 'Профессиональное развитие и обучение преподавателей.',
            },
            en: {
                title: 'Teacher School | Intellect School',
                description: 'Professional development and training for teachers.',
            },
        },
    },
}

function resolveRouteKey(slug?: string[]) {
    if (!slug || slug.length === 0) return ''
    return slug.join('/')
}

function resolvePage(routeKey: string) {
    return ROUTES[routeKey]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const routeKey = resolveRouteKey(params.slug)

    if (routeKey === 'services') {
        return {}
    }

    const entry = resolvePage(routeKey)
    if (!entry) {
        return {}
    }

    const pathname = routeKey ? `/${routeKey}` : '/'
    const localizedCanonical = localizePathname(pathname, params.locale)
    const ruPath = localizePathname(pathname, 'ru')
    const enPath = localizePathname(pathname, 'en')
    const localizedMeta = entry.metadata[params.locale] ?? entry.metadata['ru']

    return {
        title: localizedMeta.title,
        description: localizedMeta.description,
        alternates: {
            canonical: localizedCanonical,
            languages: {
                ru: ruPath,
                en: enPath,
            },
        },
        openGraph: {
            title: localizedMeta.title,
            description: localizedMeta.description,
            locale: params.locale === 'en' ? 'en_US' : 'ru_RU',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: localizedMeta.title,
            description: localizedMeta.description,
        },
    }
}

export default async function LocalizedStaticPage({ params }: PageProps) {
    const routeKey = resolveRouteKey(params.slug)

    if (routeKey === 'services') {
        redirect(localizePathname('/programs', params.locale))
    }

    const entry = resolvePage(routeKey)
    if (!entry) {
        notFound()
    }

    return await entry.component(params.locale)
}
