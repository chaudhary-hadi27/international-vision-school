// src/app/(portal)/admission-portal/layout.tsx

import Link from 'next/link'
import { GraduationCap, ArrowLeft, Phone, Mail } from 'lucide-react'

export default function AdmissionPortalLayout({
                                                  children,
                                              }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">IVS</div>
                                <div className="text-xs text-gray-600 -mt-1">Admission Portal</div>
                            </div>
                        </Link>

                        {/* Back to Website */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back to Website</span>
                        </Link>

                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">

                        {/* About */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">International Vision School</h3>
                            <p className="text-sm text-gray-600">
                                Building Tomorrow's Leaders Today
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
                            <div className="space-y-2 text-sm">
                                <a href="tel:+923001234567" className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition justify-center md:justify-start">
                                    <Phone className="w-4 h-4" />
                                    +92 300 1234567
                                </a>
                                <a href="mailto:admissions@ivs.edu.pk" className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition justify-center md:justify-start">
                                    <Mail className="w-4 h-4" />
                                    admissions@ivs.edu.pk
                                </a>
                            </div>
                        </div>

                        {/* Office Hours */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Office Hours</h3>
                            <p className="text-sm text-gray-600">
                                Monday - Friday<br />
                                8:00 AM - 3:00 PM
                            </p>
                        </div>

                    </div>

                    <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} International Vision School. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}