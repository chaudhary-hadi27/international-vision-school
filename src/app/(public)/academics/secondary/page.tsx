import Link from 'next/link'
import { BookOpen, Award, Users, Shield, FlaskConical, Calculator, Languages, Atom, Clock, Calendar, ArrowLeft, TrendingUp, Target, CheckCircle2 } from 'lucide-react'

export default function SecondaryPage() {
    return (
        <main className="pt-20">

            <div className="bg-gray-50 py-4 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/academics" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 font-semibold">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Academics
                    </Link>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-50 to-slate-100 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="w-24 h-24 bg-blue-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Award className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Secondary School Program</h1>
                    <p className="text-xl text-gray-600 mb-2">Class 9 - Class 10 (Girls Only)</p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Board examination preparation with comprehensive coverage of SSC/Matric curriculum
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Program Overview</h2>
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Our Secondary School program provides focused board examination preparation for female students
                            in Classes 9 and 10. We follow the Federal/Provincial board curriculum with emphasis on
                            conceptual clarity, extensive practice, and examination techniques.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Students receive individual attention in a safe, encouraging environment designed specifically
                            for young women. Our experienced teachers ensure comprehensive subject coverage while fostering
                            confidence, critical thinking, and academic excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Subjects - Science Group */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Science Group</h2>
                    <p className="text-center text-gray-600 mb-16">For students pursuing medical or engineering fields</p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                                <Atom className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Physics</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Measurements & Units</li>
                                <li>• Kinematics & Dynamics</li>
                                <li>• Work, Energy & Power</li>
                                <li>• Heat & Thermodynamics</li>
                                <li>• Electricity & Magnetism</li>
                                <li>• Light & Sound</li>
                                <li>• Atomic Physics</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-indigo-900 rounded-xl flex items-center justify-center mb-6">
                                <FlaskConical className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Chemistry</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Chemical Equilibrium</li>
                                <li>• Acids, Bases & Salts</li>
                                <li>• Organic Chemistry</li>
                                <li>• Electrochemistry</li>
                                <li>• Chemical Industries</li>
                                <li>• Environmental Chemistry</li>
                                <li>• Practical Lab Work</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Biology</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Cell Biology</li>
                                <li>• Biodiversity</li>
                                <li>• Enzymes & Nutrition</li>
                                <li>• Bioenergetics</li>
                                <li>• Reproduction & Growth</li>
                                <li>• Inheritance & Evolution</li>
                                <li>• Biotechnology</li>
                            </ul>
                        </div>

                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-blue-900 mb-2">Complete Practical Training</h3>
                                <p className="text-gray-700">
                                    All science subjects include comprehensive practical lab work as per board requirements.
                                    Students perform experiments under expert supervision to master practical skills.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Subjects */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Compulsory Subjects</h2>

                    <div className="grid md:grid-cols-4 gap-6">

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Calculator className="w-6 h-6 text-blue-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mathematics</h3>
                            <p className="text-sm text-gray-600 mb-3">Class 9-10 complete syllabus</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• Matrices & Sets</li>
                                <li>• Algebra</li>
                                <li>• Trigonometry</li>
                                <li>• Geometry</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                                <Languages className="w-6 h-6 text-slate-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">English</h3>
                            <p className="text-sm text-gray-600 mb-3">Language & Literature</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• Grammar</li>
                                <li>• Comprehension</li>
                                <li>• Essay Writing</li>
                                <li>• Literature</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                                <Languages className="w-6 h-6 text-cyan-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Urdu</h3>
                            <p className="text-sm text-gray-600 mb-3">Compulsory</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• Urdu Grammar</li>
                                <li>• Literature</li>
                                <li>• Essay Writing</li>
                                <li>• Translation</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-indigo-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Islamiyat</h3>
                            <p className="text-sm text-gray-600 mb-3">Compulsory</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• Quran & Tafseer</li>
                                <li>• Hadith</li>
                                <li>• Islamic History</li>
                                <li>• Seerat</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Exam Preparation */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Board Exam Preparation</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Class 9 Focus</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                                    <span>Strong foundation in all subjects</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                                    <span>Regular tests and assessments</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                                    <span>Practical lab sessions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                                    <span>Concept clarity and understanding</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Class 10 Focus</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-900 flex-shrink-0 mt-1" />
                                    <span>Complete syllabus coverage</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-900 flex-shrink-0 mt-1" />
                                    <span>Extensive past papers practice</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-900 flex-shrink-0 mt-1" />
                                    <span>Monthly mock examinations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-900 flex-shrink-0 mt-1" />
                                    <span>Exam techniques and time management</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timings & Info */}
            <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Class Information</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <Clock className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">School Timings</h3>
                            <p className="text-xl mb-2">8:00 AM - 2:00 PM</p>
                            <p className="text-blue-200">Monday to Friday</p>
                            <p className="text-sm text-blue-200 mt-2">(Extended hours during exams)</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <Users className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Class Size</h3>
                            <p className="text-xl mb-2">Maximum 20 Students</p>
                            <p className="text-blue-200">Small batches for focused attention</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <Calendar className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Board Registration</h3>
                            <p className="text-xl mb-2">September - October</p>
                            <p className="text-blue-200">Annual board examinations in March</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Secure Your Daughter's Future</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join IVS Secondary School for comprehensive board exam preparation in a safe, nurturing environment
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/admissions" className="px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg">
                            Apply for Admission
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Schedule Campus Visit
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}