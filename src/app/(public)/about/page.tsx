import { Award, ChartColumn, ChartNoAxesCombined, Heart, Users, BookOpen, Shield, Lightbulb } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <main className="pt-20">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">About IVS</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Since 2010, we have been providing quality education to students from Playgroup to Grade 8,
                        preparing them for success in academics and life.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-blue-900 mb-2">15+</div>
                            <div className="text-gray-600">Years of Excellence</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-blue-900 mb-2">500+</div>
                            <div className="text-gray-600">Happy Students</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-blue-900 mb-2">50+</div>
                            <div className="text-gray-600">Qualified Teachers</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-blue-900 mb-2">98%</div>
                            <div className="text-gray-600">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Vision */}
                        <div className="bg-blue-50 rounded-3xl p-10">
                            <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                                <ChartNoAxesCombined className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                To become Pakistan's leading educational institution, producing confident, capable,
                                and ethical leaders who contribute positively to society and excel globally.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="bg-green-50 rounded-3xl p-10">
                            <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mb-6">
                                <ChartColumn className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                To provide high-quality education that develops academic excellence, critical thinking,
                                strong character, and Islamic values in every student.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="grid md:grid-cols-3">

                            {/* Image */}
                            <div className="bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-12">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Users className="w-16 h-16 text-blue-900" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">Mr. Principal Name</h3>
                                    <p className="text-blue-200">Principal, IVS</p>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="md:col-span-2 p-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Principal's Message</h2>
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        Welcome to International Vision School. As Principal, I am proud to lead an institution
                                        committed to academic excellence and character development.
                                    </p>
                                    <p>
                                        Our experienced faculty, modern facilities, and student-centered approach ensure that
                                        every child receives personalized attention and opportunities to grow.
                                    </p>
                                    <p>
                                        We believe in preparing students not just for exams, but for life. Join us in this
                                        journey of learning and growth.
                                    </p>
                                    <div className="pt-4">
                                        <p className="font-semibold text-gray-900">Best Regards,</p>
                                        <p className="text-blue-900 font-bold">Principal Name</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Core Values</h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Award className="w-10 h-10 text-blue-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                            <p className="text-gray-600">
                                Striving for the highest standards in academics and character
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-10 h-10 text-green-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Care</h3>
                            <p className="text-gray-600">
                                Nurturing every student with love, respect, and individual attention
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Lightbulb className="w-10 h-10 text-purple-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-600">
                                Using modern teaching methods and technology for better learning
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-10 h-10 text-amber-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
                            <p className="text-gray-600">
                                Building strong moral character and ethical values in students
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Why Choose IVS?</h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <BookOpen className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Quality Education</h3>
                            <p className="opacity-90">
                                Cambridge and local board curriculum with experienced teachers who care about student success
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Shield className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Safe Environment</h3>
                            <p className="opacity-90">
                                CCTV monitored campus with trained staff ensuring your child's safety and security
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Users className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Small Class Sizes</h3>
                            <p className="opacity-90">
                                Maximum 25 students per class for personalized attention and better learning outcomes
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Lightbulb className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Modern Facilities</h3>
                            <p className="opacity-90">
                                Smart classrooms, science labs, computer lab, library, and sports facilities
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Award className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Extra Activities</h3>
                            <p className="opacity-90">
                                Sports, arts, debates, and competitions for overall personality development
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                            <Heart className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Islamic Values</h3>
                            <p className="opacity-90">
                                Quran, Namaz, and Islamic education integrated with modern curriculum
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join IVS?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Visit our campus and see why parents trust us with their children's education
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="/admissions" className="px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg">
                            Apply for Admission
                        </a>
                        <a href="/contact" className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Schedule Campus Visit
                        </a>
                    </div>
                </div>
            </section>

        </main>
    )
}