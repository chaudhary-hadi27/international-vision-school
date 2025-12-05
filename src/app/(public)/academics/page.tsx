import Link from 'next/link'
import { Baby, BookOpen, GraduationCap, Users, Globe, Award, ChevronRight, Clock, Calendar, Trophy } from 'lucide-react'

export default function AcademicsPage() {
    return (
        <main className="pt-20">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Academic Programs</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive education from Playgroup to Grade 10 (Girls) with Cambridge & local board curriculum
                    </p>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Playgroup */}
                        <Link href="/academics/playgroup" className="group">
                            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-900">
                                <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                    <Baby className="w-10 h-10 text-pink-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Playgroup</h3>
                                <p className="text-gray-600 mb-4">Ages 2-3 years</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Foundation learning through play-based activities and early childhood development
                                </p>
                                <div className="flex items-center text-blue-900 font-semibold group-hover:gap-2 transition-all">
                                    Learn More <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </Link>

                        {/* Nursery & KG */}
                        <Link href="/academics/nursery-kg" className="group">
                            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-700">
                                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                    <BookOpen className="w-10 h-10 text-green-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nursery & KG</h3>
                                <p className="text-gray-600 mb-4">Ages 3-5 years</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Early education with structured learning, reading, writing, and social skills
                                </p>
                                <div className="flex items-center text-green-700 font-semibold group-hover:gap-2 transition-all">
                                    Learn More <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </Link>

                        {/* Primary */}
                        <Link href="/academics/primary" className="group">
                            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-700">
                                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                    <Users className="w-10 h-10 text-purple-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Primary</h3>
                                <p className="text-gray-600 mb-4">Grade 1-5 (Ages 6-10)</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Strong academic foundation with focus on English, Math, Science, and Urdu
                                </p>
                                <div className="flex items-center text-purple-700 font-semibold group-hover:gap-2 transition-all">
                                    Learn More <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </Link>

                        {/* Middle */}
                        <Link href="/academics/middle" className="group">
                            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-700">
                                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                    <GraduationCap className="w-10 h-10 text-blue-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Middle School</h3>
                                <p className="text-gray-600 mb-4">Grade 6-8 (Ages 11-13)</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Advanced curriculum preparing students for secondary education
                                </p>
                                <div className="flex items-center text-blue-700 font-semibold group-hover:gap-2 transition-all">
                                    Learn More <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </Link>

                        {/* Secondary (Girls Only) */}
                        <Link href="/academics/secondary" className="group md:col-span-2 lg:col-span-1">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-900 text-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                    <Award className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Secondary</h3>
                                <p className="mb-4 font-semibold">Grade 9-10 (Girls Only)</p>
                                <p className="text-sm opacity-90 mb-4">
                                    Matric preparation with focus on board exams and career guidance
                                </p>
                                <div className="flex items-center font-semibold group-hover:gap-2 transition-all">
                                    Learn More <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>

            {/* Curriculum Features */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Curriculum Features</h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-8 h-8 text-blue-900" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cambridge System</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                                    <span>International standard curriculum</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                                    <span>English medium instruction</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                                    <span>Critical thinking focus</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                                    <span>Regular assessments</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-green-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Board</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2"></div>
                                    <span>Punjab Curriculum Authority aligned</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2"></div>
                                    <span>Urdu & Islamiyat emphasis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2"></div>
                                    <span>National history & culture</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2"></div>
                                    <span>Bilingual education</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Award className="w-8 h-8 text-purple-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Islamic Studies</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-purple-700 rounded-full mt-2"></div>
                                    <span>Quran with Tajweed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-purple-700 rounded-full mt-2"></div>
                                    <span>Daily Namaz practice</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-purple-700 rounded-full mt-2"></div>
                                    <span>Islamic values integration</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-purple-700 rounded-full mt-2"></div>
                                    <span>Character building</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Core Subjects */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Core Subjects</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">📚</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">English</h3>
                            <p className="text-sm text-gray-600">Reading, Writing, Grammar, Literature</p>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">🔢</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Mathematics</h3>
                            <p className="text-sm text-gray-600">Number Skills, Problem Solving, Logic</p>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">🔬</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Science</h3>
                            <p className="text-sm text-gray-600">Physics, Chemistry, Biology, Experiments</p>
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">📖</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Urdu</h3>
                            <p className="text-sm text-gray-600">Reading, Writing, Literature, Poetry</p>
                        </div>

                        <div className="bg-pink-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">🕌</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Islamiyat</h3>
                            <p className="text-sm text-gray-600">Quran, Hadith, Islamic History</p>
                        </div>

                        <div className="bg-indigo-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">🌍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Social Studies</h3>
                            <p className="text-sm text-gray-600">History, Geography, Pakistan Studies</p>
                        </div>

                        <div className="bg-cyan-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">💻</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Computer</h3>
                            <p className="text-sm text-gray-600">ICT, Coding, Digital Literacy</p>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Arts & Crafts</h3>
                            <p className="text-sm text-gray-600">Drawing, Painting, Creative Activities</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Extra-Curricular */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Extra-Curricular Activities</h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Trophy className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Sports</h3>
                            <p className="opacity-90">Cricket, Football, Badminton, Table Tennis, Athletics</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Award className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Competitions</h3>
                            <p className="opacity-90">Debates, Speech, Quiz, Science Fair, Math Olympiad</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Users className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Clubs</h3>
                            <p className="opacity-90">Drama, Music, Art, Science, Reading, Robotics</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* School Timings */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">School Timings</h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-blue-900" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Playgroup to KG</h3>
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <p className="flex justify-between">
                                    <span className="font-semibold">Morning Session:</span>
                                    <span>8:00 AM - 12:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="font-semibold">Days:</span>
                                    <span>Monday - Friday</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-green-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Grade 1 to 10</h3>
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <p className="flex justify-between">
                                    <span className="font-semibold">Full Day:</span>
                                    <span>8:00 AM - 2:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="font-semibold">Days:</span>
                                    <span>Monday - Friday</span>
                                </p>
                                <p className="text-sm text-pink-600 font-semibold mt-2">
                                    * Grade 9-10 for Girls only
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 bg-blue-50 rounded-2xl p-6 text-center">
                        <Calendar className="w-12 h-12 text-blue-900 mx-auto mb-4" />
                        <p className="text-gray-700">
                            <span className="font-semibold">Academic Year:</span> March to February
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Want to Learn More?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Schedule a campus tour or apply for admission today
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/admissions" className="px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg">
                            Apply for Admission
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}