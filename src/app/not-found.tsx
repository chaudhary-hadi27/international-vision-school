'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-900 mb-4">404</h1>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                >
                    <Home className="w-5 h-5" />
                    Back to Home
                </Link>
            </div>
        </div>
    )
}