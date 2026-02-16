'use client'

/**
 * Admin Dashboard Page
 * Sprint 0 - INT-7: Authentication Setup
 */

import { useUser } from '@/lib/auth/client'
import { signOut } from '@/lib/auth/client'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
    const { user, loading } = useUser()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut()
        router.push('/admin/login')
        router.refresh()
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Welcome back, {user?.email}
                            </p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Documents
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            News Articles
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Gallery Albums
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-primary-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Admin Panel Coming Soon
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Full admin interface will be available in Sprint 2
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="bg-gray-50 px-4 py-2 rounded-lg">
                                <p className="text-sm text-gray-600">✓ Authentication Ready</p>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 rounded-lg">
                                <p className="text-sm text-gray-600">✓ Database Schema Ready</p>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 rounded-lg">
                                <p className="text-sm text-gray-600">✓ Storage Buckets Ready</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
