import Link from 'next/link'
import { Users, BookOpen, FlaskConical, Globe, Calculator, Languages, Clock, ArrowLeft } from 'lucide-react'

export default function PrimaryPage() {
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

            <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="w-24 h-24 bg-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Users className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Primary School Program</h1>
                    <p className="text-xl text-gray-600 mb-2">Grade 1-5 (Ages 6-10 Years)</p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Building strong academic foundations with focus on core subjects and skill development
                    </p>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Program Overview</h2>
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Our Primary School program (Grade 1-5) provides comprehensive education following Cambridge
                            and Punjab Curriculum standards. We focus on developing strong foundations in English,
                            Mathematics, Science, Urdu, and Islamiyat.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Through interactive teaching methods, project-based learning, and regular assessments,
                            we ensure students develop critical thinking, problem-solving, and communication skills.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Core Subjects</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">English</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Reading comprehension</li>
                                <li>• Grammar and composition</li>
                                <li>• Creative writing</li>
                                <li>• Speaking and presentation</li>
                                <li>• Literature and poetry</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <Calculator className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mathematics</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Number operations</li>
                                <li>• Fractions and decimals</li>
                                <li>• Geometry and measurement</li>
                                <li>• Word problems</li>
                                <li>• Mental math skills</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <FlaskConical className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Science</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Living and non-living things</li>
                                <li>• Plant and animal life</li>
                                <li>• Matter and energy</li>
                                <li>• Earth and space</li>
                                <li>• Experiments and observations</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                                <Languages className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Urdu</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Reading and writing</li>
                                <li>• Grammar (Qawaid)</li>
                                <li>• Poetry (Nazam)</li>
                                <li>• Composition (Inshaiya)</li>
                                <li>• Conversation skills</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Islamiyat</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Quran reading with Tajweed</li>
                                <li>• Islamic history</li>
                                <li>• Life of Prophet (PBUH)</li>
                                <li>• Daily prayers and Duas</li>
                                <li>• Islamic values</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-8 h-8 text-cyan-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Studies</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Pakistan Studies</li>
                                <li>• World geography</li>
                                <li>• Islamic history</li>
                                <li>• Map reading skills</li>
                                <li>• Current affairs</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Additional Activities</h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">💻</div>
                            <h3 className="text-xl font-bold mb-2">Computer Lab</h3>
                            <p className="text-sm opacity-90">Basic ICT and coding</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="text-xl font-bold mb-2">Art & Craft</h3>
                            <p className="text-sm opacity-90">Creative activities</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">⚽</div>
                            <h3 className="text-xl font-bold mb-2">Sports</h3>
                            <p className="text-sm opacity-90">Physical education</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">📚</div>
                            <h3 className="text-xl font-bold mb-2">Library</h3>
                            <p className="text-sm opacity-90">Reading program</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Class Information</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 text-center">
                            <Clock className="w-12 h-12 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Timings</h3>
                            <p className="text-xl">8:00 AM - 2:00 PM</p>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 text-center">
                            <Users className="w-12 h-12 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Class Size</h3>
                            <p className="text-xl">Maximum 25 Students</p>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 text-center">
                            <BookOpen className="w-12 h-12 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Assessment</h3>
                            <p className="text-xl">Regular Tests & Exams</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Enroll Your Child Today</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Build a strong academic foundation for future success
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/admissions" className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg">
                            Apply for Admission
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Schedule a Visit
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}