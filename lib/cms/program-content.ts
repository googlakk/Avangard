export type Locale = 'ru' | 'en'
export type CmsOverrideMap = Record<string, Record<string, unknown>>

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isLocalizedObject(value: unknown): value is { ru?: string; en?: string } {
    if (!isPlainObject(value)) return false
    const keys = Object.keys(value)
    if (!keys.length) return false
    return keys.every(key => key === 'ru' || key === 'en')
}

export function deepMerge<T>(base: T, override: unknown): T {
    if (Array.isArray(base)) {
        return (Array.isArray(override) ? override : base) as T
    }

    if (!isPlainObject(base) || !isPlainObject(override)) {
        return (override as T) ?? base
    }

    const out: Record<string, unknown> = { ...base }
    Object.entries(override).forEach(([key, value]) => {
        const prev = out[key]
        if (Array.isArray(value)) {
            out[key] = value
            return
        }
        if (isPlainObject(prev) && isPlainObject(value)) {
            out[key] = deepMerge(prev, value)
            return
        }
        out[key] = value
    })

    return out as T
}

export function resolveLocalizedContent<T>(value: T, locale: Locale): T {
    if (Array.isArray(value)) {
        return value.map(item => resolveLocalizedContent(item, locale)) as T
    }

    if (!isPlainObject(value)) return value

    if (isLocalizedObject(value)) {
        const localized = locale === 'en'
            ? (value.en ?? '')
            : (value.ru ?? value.en ?? '')
        return localized as T
    }

    const out: Record<string, unknown> = {}
    Object.entries(value).forEach(([key, val]) => {
        out[key] = resolveLocalizedContent(val, locale)
    })
    return out as T
}

export function pickOverride(
    overrides: CmsOverrideMap | undefined,
    key: string
): Record<string, unknown> {
    if (!overrides) return {}
    return overrides[key] || {}
}

export function hasOverrideKey(
    overrides: CmsOverrideMap | undefined,
    key: string
): boolean {
    if (!overrides) return true
    return Object.prototype.hasOwnProperty.call(overrides, key)
}
