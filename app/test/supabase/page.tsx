'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SupabaseTestPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')

    useEffect(() => {
        async function testConnection() {
            try {
                const supabase = createClient()

                // Test connection by fetching session
                const { data, error } = await supabase.auth.getSession()

                if (error) throw error

                setStatus('success')
                setMessage('✅ Supabase connection successful! Session: ' + (data.session ? 'Authenticated' : 'Not authenticated'))
            } catch (error) {
                setStatus('error')
                setMessage('❌ Connection failed: ' + (error as Error).message)
            }
        }

        testConnection()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Supabase Connection Test</h1>

                <div className={`p-6 rounded-xl ${status === 'loading' ? 'bg-gray-100' :
                        status === 'success' ? 'bg-green-100' :
                            'bg-red-100'
                    }`}>
                    <div className="flex items-center gap-3 mb-4">
                        {status === 'loading' && (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
                        )}
                        <p className="text-lg font-semibold">{message || 'Testing connection...'}</p>
                    </div>

                    {status === 'success' && (
                        <div className="mt-4 p-4 bg-white rounded-lg">
                            <h3 className="font-semibold mb-2">Connection Details:</h3>
                            <p className="text-sm text-gray-600">URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
                            <p className="text-sm text-gray-600 mt-2">✓ Supabase client initialized</p>
                            <p className="text-sm text-gray-600">✓ Environment variables loaded</p>
                            <p className="text-sm text-gray-600">✓ Auth service accessible</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm text-gray-500">
                    <p><strong>Project:</strong> Intellect School Website</p>
                    <p><strong>Task:</strong> INT-8 - Frontend Supabase Client Integration</p>
                    <p><strong>Sprint:</strong> Sprint 0 - Infrastructure Setup</p>
                </div>
            </div>
        </div>
    )
}
