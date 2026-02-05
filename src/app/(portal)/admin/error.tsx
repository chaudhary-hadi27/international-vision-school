// src/app/(portal)/(admin)/admin/error.tsx
'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function AdminError({
                                       error,
                                       reset,
                                   }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Admin error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
                <p className="text-gray-600 mb-8">
                    An error occurred while loading the admin panel.
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-ivs-navy text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}