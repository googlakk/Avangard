import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'
import { normalizeRole, type CmsRole } from '@/lib/auth/rbac'

export function getRoleFromClaims(user: User | null | undefined): CmsRole | null {
    return normalizeRole(user?.user_metadata?.role ?? user?.app_metadata?.role)
}

async function getRoleFromAdminUsers(userId: string): Promise<CmsRole | null> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
        return null
    }

    const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })

    const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', userId)
        .maybeSingle()

    if (error) {
        console.error('Failed to resolve CMS role from admin_users:', error)
        return null
    }

    return normalizeRole(data?.role)
}

export async function resolveRoleForUser(user: User | null | undefined): Promise<CmsRole | null> {
    const claimedRole = getRoleFromClaims(user)
    if (claimedRole) {
        return claimedRole
    }

    if (!user?.id) {
        return null
    }

    return getRoleFromAdminUsers(user.id)
}
