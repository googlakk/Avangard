export const PUBLIC_LOCALES = ['ru', 'en'] as const
export type PublicLocale = (typeof PUBLIC_LOCALES)[number]

export const DEFAULT_LOCALE: PublicLocale = 'ru'
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

const LOCALE_PREFIX_RE = /^\/(ru|en)(?=\/|$)/

export function isValidLocale(value: string | null | undefined): value is PublicLocale {
    return value === 'ru' || value === 'en'
}

export function getLocaleFromPathname(pathname: string): PublicLocale | null {
    const match = pathname.match(LOCALE_PREFIX_RE)
    return match && isValidLocale(match[1]) ? match[1] : null
}

export function stripLocaleFromPathname(pathname: string): string {
    if (!pathname) return '/'
    const stripped = pathname.replace(LOCALE_PREFIX_RE, '') || '/'
    return stripped.startsWith('/') ? stripped : `/${stripped}`
}

export function localizePathname(pathname: string, locale: PublicLocale): string {
    const cleanPath = stripLocaleFromPathname(pathname)
    if (cleanPath === '/') {
        return `/${locale}`
    }
    return `/${locale}${cleanPath}`
}

export function joinSearchParams(search: string | null | undefined): string {
    if (!search) return ''
    return search.startsWith('?') ? search : `?${search}`
}

export function getPathKey(pathname: string) {
    const stripped = stripLocaleFromPathname(pathname)
    return stripped === '/' ? '' : stripped.slice(1)
}

export const STATIC_PUBLIC_ROUTE_KEYS = [
    '',
    'about',
    'about/team',
    'contacts',
    'parents/academics',
    'parents/admission',
    'parents/care',
    'parents/faq',
    'parents/parents-school',
    'parents/platforms',
    'parents/values',
    'programs',
    'programs/primary',
    'programs/primary/a-day-in-junior',
    'programs/primary/brain-methodology',
    'programs/primary/english-environment',
    'programs/middle',
    'programs/middle/cambridge-pathway',
    'programs/middle/it-steam',
    'programs/middle/life-in-middle',
    'programs/senior',
    'rules/parents',
    'rules/students',
    'rules/teachers',
    'safety',
    'students/results',
    'teachers/benefits',
    'teachers/careers',
    'teachers/culture',
    'teachers/platforms',
    'teachers/teachers-school',
] as const
