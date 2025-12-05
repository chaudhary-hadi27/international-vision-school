import Link from 'next/link'
import { BookOpen, BookA, PenTool, Users, Brain, Star, Clock, Calendar, ArrowLeft } from 'lucide-react'

export default function NurseryPage() {
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
            <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Nursery & KG Program</h1>
                    <p className="text-xl text-gray-600 mb-2">Ages 3-5 Years</p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Building strong foundations in reading, writing, and mathematics through structured learning
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Program Overview</h2>
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Our Nursery and KG program prepares children for primary school by introducing them to
                            structured learning in a fun and engaging way. Children develop essential pre-reading,
                            pre-writing, and early math skills.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We focus on alphabet recognition, number concepts, phonics, basic reading, fine motor skills,
                            and social development through interactive lessons and activities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Learning Areas */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Children Learn</h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <BookA className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Language & Literacy</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Alphabet recognition (A-Z)</li>
                                <li>• Phonics and letter sounds</li>
                                <li>• Basic reading skills</li>
                                <li>• Vocabulary building</li>
                                <li>• Speaking and listening</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <PenTool className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Writing Skills</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Pencil grip and control</li>
                                <li>• Letter formation (a-z)</li>
                                <li>• Name writing</li>
                                <li>• Pattern writing</li>
                                <li>• Drawing and coloring</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Brain className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mathematics</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Number recognition (1-100)</li>
                                <li>• Counting and number sense</li>
                                <li>• Shapes and colors</li>
                                <li>• Basic addition & subtraction</li>
                                <li>• Patterns and sorting</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Skills</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Sharing and cooperation</li>
                                <li>• Following instructions</li>
                                <li>• Classroom routines</li>
                                <li>• Making friends</li>
                                <li>• Good manners</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                                <Star className="w-8 h-8 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Islamic Education</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Basic Duas (prayers)</li>
                                <li>• Kalmas</li>
                                <li>• Islamic stories</li>
                                <li>• Good habits</li>
                                <li>• Respect and kindness</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-cyan-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">General Knowledge</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Animals and birds</li>
                                <li>• Fruits and vegetables</li>
                                <li>• Body parts</li>
                                <li>• Days, months, seasons</li>
                                <li>• My family and community</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Daily Schedule */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Typical Day Schedule</h2>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 flex items-center gap-6">
                            <div className="text-2xl font-bold text-blue-900 min-w-[120px]">8:00 - 8:30</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Morning Assembly</h3>
                                <p className="text-gray-700">Dua, National Anthem, Morning Exercises</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 flex items-center gap-6">
                            <div className="text-2xl font-bold text-green-900 min-w-[120px]">8:30 - 9:30</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">English & Phonics</h3>
                                <p className="text-gray-700">Letters, sounds, reading practice</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 flex items-center gap-6">
                            <div className="text-2xl font-bold text-purple-900 min-w-[120px]">9:30 - 10:15</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Mathematics</h3>
                                <p className="text-gray-700">Numbers, counting, shapes, basic operations</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6 flex items-center gap-6">
                            <div className="text-2xl font-bold text-amber-900 min-w-[120px]">10:15 - 10:45</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Break Time</h3>
                                <p className="text-gray-700">Snacks, play, restroom</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl p-6 flex items-center gap-6">
                            <div className="text-2xl font-bold text-rose-900 min-w-[120px]">10:45 - 11:30</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Writing & Art</h3>
                                <p className="text-gray-700">Handwriting, coloring, crafts</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-2xl p-6 flex items-center gap-6">
                            <div className="text-2xl font-bold text-cyan-900 min-w-[120px]">11:30 - 12:00</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Urdu & Islamiyat</h3>
                                <p className="text-gray-700">Urdu letters, Duas, Islamic stories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timings */}
            <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Class Information</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8">
                            <Clock className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">School Timings</h3>
                            <p className="text-xl mb-2">8:00 AM - 12:00 PM</p>
                            <p className="opacity-90">Monday to Friday</p>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8">
                            <Calendar className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Class Size</h3>
                            <p className="text-xl mb-2">Maximum 20 Students</p>
                            <p className="opacity-90">1 Qualified Teacher per class</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Enroll?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Give your child a strong academic foundation
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/admissions" className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg">
                            Apply for Admission
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Schedule a Visit
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}