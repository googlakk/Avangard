/**
 * Intellect School Website - Authentication Helpers
 * Server-side authentication utilities
 * Sprint 0 - INT-7: Authentication Setup
 */

import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

/**
 * Get current user session (cached)
 */
export const getSession = cache(async () => {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
        console.error('Error getting session:', error)
        return null
    }

    return session
})

/**
 * Get current authenticated user (cached)
 */
export const getUser = cache(async () => {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
        console.error('Error getting user:', error)
        return null
    }

    return user
})

/**
 * Check if user is admin
 */
export async function isAdmin() {
    const user = await getUser()

    if (!user) return false

    // Check if user has admin role in metadata
    const role = user.user_metadata?.role
    return role === 'admin'
}

/**
 * Require admin authentication
 * Throws error if user is not admin
 */
export async function requireAdmin() {
    const admin = await isAdmin()

    if (!admin) {
        throw new Error('Unauthorized: Admin access required')
    }

    return true
}

/**
 * Get user role
 */
export async function getUserRole() {
    const user = await getUser()

    if (!user) return null

    return user.user_metadata?.role || 'user'
}
