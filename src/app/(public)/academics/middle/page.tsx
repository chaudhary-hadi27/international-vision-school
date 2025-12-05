import Link from 'next/link'
import { BookOpen, Atom, Calculator, Globe, FlaskConical, Languages, Clock, Calendar, ArrowLeft, Users, Award, TrendingUp } from 'lucide-react'

export default function MiddlePage() {
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
                        <BookOpen className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Middle School Program</h1>
                    <p className="text-xl text-gray-600 mb-2">Class 6 - Class 8</p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Building critical thinking, advanced concepts, and preparing students for secondary education
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Program Overview</h2>
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Our Middle School program focuses on developing advanced academic skills, critical thinking,
                            and independent learning. Students are introduced to complex scientific concepts, advanced
                            mathematics, and comprehensive language skills.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We emphasize analytical thinking, problem-solving, research skills, and prepare students for
                            the challenges of secondary education. The curriculum balances academic excellence with
                            character development and Islamic values.
                        </p>
                    </div>
                </div>
            </section>

            {/* Subjects */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Core Subjects</h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                                <Calculator className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mathematics</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Algebra & Equations</li>
                                <li>• Geometry & Mensuration</li>
                                <li>• Fractions & Decimals</li>
                                <li>• Ratios & Percentages</li>
                                <li>• Data Handling & Statistics</li>
                                <li>• Problem Solving</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-indigo-900 rounded-xl flex items-center justify-center mb-6">
                                <Atom className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Science</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Physics (Motion, Energy, Force)</li>
                                <li>• Chemistry (Matter, Reactions)</li>
                                <li>• Biology (Life Processes, Cells)</li>
                                <li>• Practical Experiments</li>
                                <li>• Scientific Method</li>
                                <li>• Environmental Science</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                                <Languages className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">English</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Advanced Grammar</li>
                                <li>• Comprehension & Writing</li>
                                <li>• Literature & Poetry</li>
                                <li>• Essay & Letter Writing</li>
                                <li>• Vocabulary Building</li>
                                <li>• Speaking Skills</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-cyan-900 rounded-xl flex items-center justify-center mb-6">
                                <Languages className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Urdu</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Urdu Grammar</li>
                                <li>• Reading & Comprehension</li>
                                <li>• Essay Writing</li>
                                <li>• Poetry & Literature</li>
                                <li>• Translation Skills</li>
                                <li>• Creative Writing</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-sky-900 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Studies</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Pakistan Studies</li>
                                <li>• History & Civilization</li>
                                <li>• Geography & Maps</li>
                                <li>• Civics & Government</li>
                                <li>• Economics Basics</li>
                                <li>• Current Affairs</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-teal-900 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Islamiyat</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Quran with Translation</li>
                                <li>• Hadith & Sunnah</li>
                                <li>• Islamic History</li>
                                <li>• Fiqh & Beliefs</li>
                                <li>• Ethics & Morals</li>
                                <li>• Character Building</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Additional Subjects */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Additional Subjects</h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-md text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Computer Science</h3>
                            <p className="text-sm text-gray-600">Basics, MS Office, Coding</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Art & Drawing</h3>
                            <p className="text-sm text-gray-600">Creative Expression</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Physical Education</h3>
                            <p className="text-sm text-gray-600">Sports & Fitness</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Library Period</h3>
                            <p className="text-sm text-gray-600">Reading & Research</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Assessment & Evaluation</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Regular Tests</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-900 font-bold">•</span>
                                    <span>Monthly tests in all subjects</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-900 font-bold">•</span>
                                    <span>Mid-term examinations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-900 font-bold">•</span>
                                    <span>Final annual examinations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-900 font-bold">•</span>
                                    <span>Class tests and quizzes</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Continuous Assessment</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-900 font-bold">•</span>
                                    <span>Homework & assignments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-900 font-bold">•</span>
                                    <span>Project work & presentations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-900 font-bold">•</span>
                                    <span>Practical lab work</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-900 font-bold">•</span>
                                    <span>Class participation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timings */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-slate-800 text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Class Information</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Clock className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">School Timings</h3>
                            <p className="text-xl mb-2">8:00 AM - 2:00 PM</p>
                            <p className="opacity-90">Monday to Friday</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Users className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Class Size</h3>
                            <p className="text-xl mb-2">Maximum 25 Students</p>
                            <p className="opacity-90">Subject specialist teachers</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Calendar className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Academic Session</h3>
                            <p className="text-xl mb-2">April - March</p>
                            <p className="opacity-90">Summer & Winter breaks</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Enroll?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Prepare your child for academic excellence and future success
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/admissions" className="px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg">
                            Apply for Admission
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Schedule a Visit
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}