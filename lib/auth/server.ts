/**
 * Intellect School Website - Authentication Helpers
 * Server-side authentication utilities
 * Sprint 0 - INT-7: Authentication Setup
 */

import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import type { CmsAction, CmsResource } from '@/lib/auth/rbac'
import { hasPermission, isAdminRole } from '@/lib/auth/rbac'
import { resolveRoleForUser } from '@/lib/auth/roles'

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

    const role = await resolveRoleForUser(user)
    return isAdminRole(role)
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

    return resolveRoleForUser(user)
}

/**
 * Check permission against RBAC matrix
 */
export async function can(resource: CmsResource, action: CmsAction) {
    const role = await getUserRole()
    return hasPermission(role, resource, action)
}

/**
 * Require permission and throw when access is denied
 */
export async function requirePermission(resource: CmsResource, action: CmsAction) {
    const role = await getUserRole()
    const allowed = hasPermission(role, resource, action)

    if (!allowed) {
        throw new Error(`Unauthorized: ${String(role ?? 'guest')} cannot ${action} ${resource}`)
    }

    return true
}
