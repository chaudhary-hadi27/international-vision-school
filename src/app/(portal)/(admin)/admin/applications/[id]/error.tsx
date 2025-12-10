// src/app/(portal)/(admin)/admin/applications/[id]/error.tsx
'use client'

import { useEffect } from 'react'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ApplicationDetailError({
                                                   error,
                                                   reset,
                                               }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Application detail error:', error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Application not found</h2>
                <p className="text-gray-600 mb-6">
                    The application you're looking for doesn't exist or has been removed.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/admin/applications"
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Applications
                    </Link>
                </div>
            </div>
        </div>
    )
}