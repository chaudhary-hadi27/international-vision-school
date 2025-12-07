'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Download, Mail, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function ThankYouPage() {
    const searchParams = useSearchParams()
    const applicationId = searchParams.get('id')
    const [applicationData, setApplicationData] = useState<any>(null)

    useEffect(() => {
        if (applicationId) {
            fetch(`/api/admission?id=${applicationId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setApplicationData(data.data)
                    }
                })
                .catch((error) => console.error('Error fetching application:', error))
        }
    }, [applicationId])

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-12 text-center mb-8">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Application Submitted Successfully!
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                        Thank you for applying to International Vision School
                    </p>

                    {applicationId && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                            <p className="text-sm text-gray-600 mb-2">Your Application ID</p>
                            <p className="text-3xl font-bold text-blue-900 mb-2">{applicationId}</p>
                            <p className="text-sm text-gray-600">
                                Please save this ID for future reference
                            </p>
                        </div>
                    )}

                    {applicationData && (
                        <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">Student Name</p>
                                <p className="font-bold text-gray-900">{applicationData.studentName}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">Applied for Grade</p>
                                <p className="font-bold text-gray-900">{applicationData.grade}</p>
                            </div>
                        </div>
                    )}

                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-gray-700 mb-4">
                            A confirmation email has been sent to your registered email address.
                        </p>
                        <p className="text-gray-700">
                            Our admissions team will review your application and contact you within{' '}
                            <strong>2-3 business days</strong>.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <a
                        href="mailto:admissions@ivs.edu.pk"
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-center group"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                            <Mail className="w-6 h-6 text-blue-900" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                        <p className="text-sm text-gray-600">admissions@ivs.edu.pk</p>
                    </a>

                    <a
                        href="tel:+923001234567"
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-center group"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                            <Phone className="w-6 h-6 text-green-700" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                        <p className="text-sm text-gray-600">+92 300 1234567</p>
                    </a>

                    <a
                        href="https://wa.me/923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-center group"
                    >
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                            <MessageCircle className="w-6 h-6 text-emerald-700" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                        <p className="text-sm text-gray-600">Chat with us</p>
                    </a>
                </div>
            </div>
        </main>
    )
}