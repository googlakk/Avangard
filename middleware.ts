/**
 * Middleware for Intellect School Website
 * Handles admin route protection
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { canAccessAdminPanel, hasPermission, normalizeRole } from '@/lib/auth/rbac'

function requiredPermissionForPath(pathname: string) {
    if (pathname.startsWith('/admin/staff')) {
        return { resource: 'staff' as const, action: 'read' as const }
    }

    return { resource: 'dashboard' as const, action: 'read' as const }
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

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
