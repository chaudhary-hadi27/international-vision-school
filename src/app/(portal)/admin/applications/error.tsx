// src/app/(portal)/(admin)/admin/applications/error.tsx
'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ApplicationsError({
                                              error,
                                              reset,
                                          }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Applications error:', error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load applications</h2>
                <p className="text-gray-600 mb-6">
                    {error.message || 'An unexpected error occurred'}
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-2 bg-ivs-navy text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/admin"
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}