export interface FocalPoint {
    x: number
    y: number
}

export interface OptimizedImageVariants {
    original: string
    webp: string
    avif: string
    responsive: {
        webpSrcSet: string
        avifSrcSet: string
    }
}

const RESPONSIVE_WIDTHS = [480, 768, 1200]

function appendTransform(url: string, format: 'webp' | 'avif', width?: number) {
    const separator = url.includes('?') ? '&' : '?'
    const widthQuery = width ? `&width=${width}` : ''
    return `${url}${separator}format=${format}${widthQuery}`
}

export function buildOptimizedImageVariants(url: string): OptimizedImageVariants {
    const webpSrcSet = RESPONSIVE_WIDTHS
        .map(width => `${appendTransform(url, 'webp', width)} ${width}w`)
        .join(', ')

    const avifSrcSet = RESPONSIVE_WIDTHS
        .map(width => `${appendTransform(url, 'avif', width)} ${width}w`)
        .join(', ')

    return {
        original: url,
        webp: appendTransform(url, 'webp'),
        avif: appendTransform(url, 'avif'),
        responsive: {
            webpSrcSet,
            avifSrcSet,
        },
    }
}

export function normalizeFocalPoint(input: Partial<FocalPoint>): FocalPoint {
    const x = Number.isFinite(input.x) ? Number(input.x) : 0.5
    const y = Number.isFinite(input.y) ? Number(input.y) : 0.5
    return {
        x: Math.min(1, Math.max(0, x)),
        y: Math.min(1, Math.max(0, y)),
    }
}

export function validateAltTextPolicy(altRu: string, altEn: string) {
    const ru = altRu.trim()
    const en = altEn.trim()

    if (ru.length < 4 || en.length < 4) {
        throw new Error('Alt-text policy: both RU and EN alt texts must be at least 4 characters')
    }
}
