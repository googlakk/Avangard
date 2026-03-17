/**
 * Middleware for Intellect School Website
 * Handles admin route protection
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { canAccessAdminPanel, hasPermission, normalizeRole } from '@/lib/auth/rbac'
import { DEFAULT_LOCALE, getLocaleFromPathname, isValidLocale, LOCALE_COOKIE_NAME, localizePathname } from '@/lib/i18n'

function requiredPermissionForPath(pathname: string) {
    if (pathname.startsWith('/admin/staff')) {
        return { resource: 'staff' as const, action: 'read' as const }
    }

    if (pathname.startsWith('/admin/news')) {
        return { resource: 'news' as const, action: 'read' as const }
    }

    if (pathname.startsWith('/admin/documents')) {
        return { resource: 'documents' as const, action: 'read' as const }
    }

    if (pathname.startsWith('/admin/gallery')) {
        return { resource: 'gallery' as const, action: 'read' as const }
    }

    if (pathname.startsWith('/admin/pages') || pathname.startsWith('/admin/portal')) {
        return { resource: 'pages' as const, action: 'read' as const }
    }

    return { resource: 'dashboard' as const, action: 'read' as const }
}

function isStaticAsset(pathname: string) {
    return /\.[^/]+$/.test(pathname)
}

function isBypassedPath(pathname: string) {
    return pathname.startsWith('/_next')
        || pathname.startsWith('/api')
        || pathname.startsWith('/preview')
        || pathname === '/favicon.ico'
        || isStaticAsset(pathname)
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only protect admin routes (except login)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        let response = NextResponse.next({
            request: { headers: request.headers },
        })

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            request.cookies.set(name, value)
                            response = NextResponse.next({
                                request: { headers: request.headers },
                            })
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

        const { data: { user } } = await supabase.auth.getUser()
        const role = normalizeRole(user?.user_metadata?.role ?? user?.app_metadata?.role)

        if (!user || !canAccessAdminPanel(role)) {
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }

        const required = requiredPermissionForPath(pathname)
        if (!hasPermission(role, required.resource, required.action)) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

        return response
    }

    if (isBypassedPath(pathname)) {
        return NextResponse.next()
    }

    const localeInPath = getLocaleFromPathname(pathname)
    if (localeInPath) {
        const response = NextResponse.next()
        response.cookies.set(LOCALE_COOKIE_NAME, localeInPath, {
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365,
        })
        return response
    }

    const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value
    const preferredLocale = isValidLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = localizePathname(pathname, preferredLocale)
    return NextResponse.redirect(redirectUrl)

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image).*)'],
}
