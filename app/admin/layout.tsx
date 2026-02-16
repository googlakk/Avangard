/**
 * Admin Dashboard Layout
 * Sprint 0 - INT-7: Authentication Setup
 * 
 * Auth check is now handled by middleware.ts
 * This layout just renders children.
 */

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
