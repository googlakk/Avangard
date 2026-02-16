export const CMS_ROLES = ['owner', 'admin', 'editor', 'reviewer'] as const

export type CmsRole = (typeof CMS_ROLES)[number]

export const CMS_RESOURCES = [
    'dashboard',
    'staff',
    'programs',
    'news',
    'documents',
    'gallery',
    'pages',
    'sections',
    'settings',
    'users',
] as const

export type CmsResource = (typeof CMS_RESOURCES)[number]

export const CMS_ACTIONS = ['read', 'create', 'update', 'delete', 'publish', 'manage'] as const

export type CmsAction = (typeof CMS_ACTIONS)[number]

type PermissionSet = ReadonlyArray<CmsAction>

type RolePermissionMap = Record<CmsResource, PermissionSet>

const OWNER_PERMISSIONS: RolePermissionMap = {
    dashboard: ['read', 'manage'],
    staff: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    programs: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    news: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    documents: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    gallery: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    pages: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    sections: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    settings: ['read', 'create', 'update', 'delete', 'publish', 'manage'],
    users: ['read', 'create', 'update', 'delete', 'manage'],
}

const ADMIN_PERMISSIONS: RolePermissionMap = {
    dashboard: ['read'],
    staff: ['read', 'create', 'update', 'delete', 'publish'],
    programs: ['read', 'create', 'update', 'delete', 'publish'],
    news: ['read', 'create', 'update', 'delete', 'publish'],
    documents: ['read', 'create', 'update', 'delete', 'publish'],
    gallery: ['read', 'create', 'update', 'delete', 'publish'],
    pages: ['read', 'create', 'update', 'delete', 'publish'],
    sections: ['read', 'create', 'update', 'delete', 'publish'],
    settings: ['read', 'update'],
    users: ['read', 'update'],
}

const EDITOR_PERMISSIONS: RolePermissionMap = {
    dashboard: ['read'],
    staff: ['read'],
    programs: ['read', 'create', 'update'],
    news: ['read', 'create', 'update'],
    documents: ['read', 'create', 'update'],
    gallery: ['read', 'create', 'update'],
    pages: ['read', 'create', 'update'],
    sections: ['read', 'create', 'update'],
    settings: ['read'],
    users: [],
}

const REVIEWER_PERMISSIONS: RolePermissionMap = {
    dashboard: ['read'],
    staff: ['read'],
    programs: ['read', 'publish'],
    news: ['read', 'publish'],
    documents: ['read', 'publish'],
    gallery: ['read', 'publish'],
    pages: ['read', 'publish'],
    sections: ['read'],
    settings: ['read'],
    users: [],
}

export const RBAC_MATRIX: Record<CmsRole, RolePermissionMap> = {
    owner: OWNER_PERMISSIONS,
    admin: ADMIN_PERMISSIONS,
    editor: EDITOR_PERMISSIONS,
    reviewer: REVIEWER_PERMISSIONS,
}

export function isCmsRole(value: unknown): value is CmsRole {
    return typeof value === 'string' && (CMS_ROLES as readonly string[]).includes(value)
}

export function normalizeRole(value: unknown): CmsRole | null {
    return isCmsRole(value) ? value : null
}

export function canAccessAdminPanel(role: CmsRole | null): boolean {
    if (!role) return false
    return RBAC_MATRIX[role].dashboard.includes('read')
}

export function isAdminRole(role: CmsRole | null): boolean {
    return role === 'owner' || role === 'admin'
}

export function hasPermission(
    role: CmsRole | null,
    resource: CmsResource,
    action: CmsAction
): boolean {
    if (!role) return false
    return RBAC_MATRIX[role][resource].includes(action)
}

