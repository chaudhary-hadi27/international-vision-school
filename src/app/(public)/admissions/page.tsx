'use client'

import { useState } from 'react'
import {
    GraduationCap,
    FileText,
    CheckCircle2,
    Calendar,
    Download,
    Users,
    BookOpen,
    Shield,
    Clock,
    ChevronRight,
    AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AdmissionsPage() {
    const [selectedGrade, setSelectedGrade] = useState('')

    const grades = [
        { value: 'playgroup', label: 'Playgroup', fee: '5,000' },
        { value: 'nursery-kg', label: 'Nursery', fee: '5,500' },
        { value: 'prep', label: 'Prep', fee: '6,000' },
        { value: 'class-1', label: 'Class 1', fee: '7,000' },
        { value: 'class-2', label: 'Class 2', fee: '7,500' },
        { value: 'class-3', label: 'Class 3', fee: '8,000' },
        { value: 'class-4', label: 'Class 4', fee: '8,500' },
        { value: 'class-5', label: 'Class 5', fee: '9,000' },
        { value: 'class-6', label: 'Class 6', fee: '10,000' },
        { value: 'class-7', label: 'Class 7', fee: '10,500' },
        { value: 'class-8', label: 'Class 8', fee: '11,000' },
    ]

    const admissionProcess = [
        {
            step: '01',
            title: 'Fill Online Form',
            description: 'Complete the admission form with accurate information',
            icon: FileText,
            color: 'blue'
        },
        {
            step: '02',
            title: 'Submit Documents',
            description: 'Upload required documents and photographs',
            icon: CheckCircle2,
            color: 'green'
        },
        {
            step: '03',
            title: 'Assessment Test',
            description: 'Student appears for age-appropriate assessment',
            icon: BookOpen,
            color: 'purple'
        },
        {
            step: '04',
            title: 'Final Confirmation',
            description: 'Receive confirmation and pay admission fee',
            icon: GraduationCap,
            color: 'amber'
        }
    ]

    const requirements = [
        {
            title: 'Age Requirements',
            items: [
                'Playgroup: 2.5 - 3.5 years',
                'Nursery: 3.5 - 4.5 years',
                'Prep: 4.5 - 5.5 years',
                'Class 1 onwards: As per grade'
            ],
            icon: Users
        },
        {
            title: 'Required Documents',
            items: [
                'Birth Certificate (original + copy)',
                'CNIC copies of both parents',
                '4 passport size photographs',
                'Previous school records (if applicable)'
            ],
            icon: FileText
        },
        {
            title: 'Important Dates',
            items: [
                'Admissions Open: January 2025',
                'Last Date: March 31, 2025',
                'Assessment Tests: Throughout',
                'Session Starts: April 2025'
            ],
            icon: Calendar
        }
    ]

    const feeStructure = {
        'Admission Fee (One Time)': '10,000',
        'Security Deposit (Refundable)': '5,000',
        'Annual Charges': '8,000',
        'Books & Stationery': 'Varies by grade'
    }

    return (
        <main className="pt-20">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-semibold">Admissions Open for 2025-26</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Join Our School Family
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                        Secure your child's future with quality education. Limited seats available for 2025-26 session.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/admission-portal"
                            className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg inline-flex items-center gap-2"
                        >
                            Apply Online Now
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                        <button
                            onClick={() => document.getElementById('fee-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
                        >
                            View Fee Structure
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-16 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="w-16 h-16 bg-ivs-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-blue-900" />
                            </div>
                            <div className="text-3xl font-bold text-blue-900 mb-2">24/7</div>
                            <div className="text-gray-600">Online Applications</div>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-ivs-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-700" />
                            </div>
                            <div className="text-3xl font-bold text-green-700 mb-2">25</div>
                            <div className="text-gray-600">Students Per Class</div>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-purple-700" />
                            </div>
                            <div className="text-3xl font-bold text-purple-700 mb-2">100%</div>
                            <div className="text-gray-600">Safe Environment</div>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-ivs-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <GraduationCap className="w-8 h-8 text-amber-700" />
                            </div>
                            <div className="text-3xl font-bold text-amber-700 mb-2">98%</div>
                            <div className="text-gray-600">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-20 px-4 bg-white border-t border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Admission Process</h2>
                        <p className="text-xl text-gray-600">Complete your admission in 4 easy steps</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {admissionProcess.map((item, index) => {
                            const Icon = item.icon
                            const colors = {
                                blue: 'bg-blue-100 text-blue-900',
                                green: 'bg-green-100 text-green-700',
                                purple: 'bg-purple-100 text-purple-700',
                                amber: 'bg-amber-100 text-amber-700'
                            }

                            return (
                                <div key={index} className="relative">
                                    {index < admissionProcess.length - 1 && (
                                        <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-ivs-blue-light/30" />
                                    )}
                                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition relative z-10">
                                        <div className={`w-16 h-16 ${colors[item.color as keyof typeof colors]} rounded-2xl flex items-center justify-center mb-6`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-300 mb-3">{item.step}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Requirements</h2>
                        <p className="text-xl text-gray-600">Everything you need to know before applying</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {requirements.map((req, index) => {
                            const Icon = req.icon
                            return (
                                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                    <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{req.title}</h3>
                                    <ul className="space-y-3">
                                        {req.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Fee Structure */}
            <section id="fee-section" className="py-20 px-4 bg-white border-t border-b border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Fee Structure 2025-26</h2>
                        <p className="text-xl text-gray-600">Transparent and affordable education</p>
                    </div>

                    {/* Fee Calculator */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Fees</h3>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-3">Select Grade</label>
                            <select
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                            >
                                <option value="">Choose a grade...</option>
                                {grades.map((grade) => (
                                    <option key={grade.value} value={grade.value}>
                                        {grade.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedGrade && (
                            <div className="bg-ivs-blue-light/5 rounded-2xl p-6 border-2 border-ivs-blue-light/20">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-700 font-semibold">Monthly Tuition Fee</span>
                                    <span className="text-3xl font-bold text-blue-900">
                                        Rs. {grades.find(g => g.value === selectedGrade)?.fee}
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 border-t border-blue-200 pt-4">
                                    <div className="flex justify-between">
                                        <span>Admission Fee (One Time)</span>
                                        <span className="font-semibold">Rs. 10,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Security Deposit (Refundable)</span>
                                        <span className="font-semibold">Rs. 5,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Annual Charges</span>
                                        <span className="font-semibold">Rs. 8,000</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Additional Fees */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Fees</h3>
                        <div className="space-y-4">
                            {Object.entries(feeStructure).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                                    <span className="text-gray-700 font-medium">{key}</span>
                                    <span className="text-blue-900 font-bold">Rs. {value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-amber-800">
                                <p className="font-semibold mb-1">Payment Plans Available</p>
                                <p>We offer flexible payment plans and sibling discounts. Contact us for more details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Prospectus */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-12 text-white text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Download className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Download Our Prospectus</h2>
                        <p className="text-blue-100 mb-8 text-lg">
                            Get detailed information about our programs, facilities, and admission process
                        </p>
                        <button className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg inline-flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Download PDF (2.5 MB)
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Don't wait! Limited seats available. Apply now and secure your child's bright future.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/admission-portal"
                            className="px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg inline-flex items-center gap-2"
                        >
                            Apply Online Now
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                            Schedule Campus Visit
                        </Link>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-blue-900 font-bold mb-2">📞 Call Us</div>
                            <a href="tel:+923001234567" className="text-gray-700 hover:text-blue-900">
                                +92 300 1234567
                            </a>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-blue-900 font-bold mb-2">📧 Email Us</div>
                            <a href="mailto:admissions@ivs.edu.pk" className="text-gray-700 hover:text-blue-900">
                                admissions@ivs.edu.pk
                            </a>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-blue-900 font-bold mb-2">💬 WhatsApp</div>
                            <a href="https://wa.me/923001234567" className="text-gray-700 hover:text-blue-900">
                                Chat with us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}