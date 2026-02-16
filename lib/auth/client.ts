/**
 * Intellect School Website - Client Auth Helpers
 * Client-side authentication utilities
 * Sprint 0 - INT-7: Authentication Setup
 */

'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import type { CmsAction, CmsResource } from '@/lib/auth/rbac'
import { hasPermission, isAdminRole, normalizeRole } from '@/lib/auth/rbac'

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) throw error

    return data
}

/**
 * Sign out
 */
export async function signOut() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return true
}

/**
 * Get current session
 */
export async function getSession() {
    const supabase = createClient()

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error

    return session
}

/**
 * Get current user
 */
export async function getUser() {
    const supabase = createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) throw error

    return user
}

/**
 * Hook to get current user
 */
export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()

        // Get initial user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return { user, loading }
}

/**
 * Hook to get current session
 */
export function useSession() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
                setLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return { session, loading }
}

/**
 * Hook to check if user is admin
 */
export function useIsAdmin() {
    const { user, loading } = useUser()
    const role = normalizeRole(user?.user_metadata?.role ?? user?.app_metadata?.role)
    const isAdmin = isAdminRole(role)

    return { isAdmin, loading }
}

/**
 * Hook to check role permission against RBAC matrix
 */
export function useHasPermission(resource: CmsResource, action: CmsAction) {
    const { user, loading } = useUser()
    const role = normalizeRole(user?.user_metadata?.role ?? user?.app_metadata?.role)

    return {
        allowed: hasPermission(role, resource, action),
        loading,
    }
}
