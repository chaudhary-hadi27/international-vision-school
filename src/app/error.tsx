'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
                                  error,
                                  reset
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
                <p className="text-lg text-gray-600 mb-8">
                    We're sorry, but an error occurred while processing your request.
                </p>
                <button
                    onClick={() => reset()}
                    className="px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}
