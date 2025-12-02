import Link from 'next/link'
import { ChevronRight, Award, BookOpen, Users, Globe } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                            <Award className="w-4 h-4 text-blue-900" />
                            <span className="text-sm font-semibold text-blue-900">Excellence in Education Since 2010</span>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Building Tomorrow's
                            <span className="block text-blue-900">Leaders Today</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            International Vision School provides quality education from Playgroup to Grade 8.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            <Link href="/admissions">
                                <Button variant="primary" size="lg" className="group">
                                    Start Admission Process
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg">
                                    Schedule Campus Tour
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <div className="text-3xl font-bold text-blue-900">15+</div>
                                <div className="text-sm text-gray-600">Years</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-900">2000+</div>
                                <div className="text-sm text-gray-600">Students</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-900">98%</div>
                                <div className="text-sm text-gray-600">Success</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-2 gap-6">

                            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <BookOpen className="w-7 h-7 text-blue-900" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Modern Curriculum</h3>
                                <p className="text-sm text-gray-600">Cambridge & local board</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100 mt-8">
                                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-7 h-7 text-green-700" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Faculty</h3>
                                <p className="text-sm text-gray-600">Qualified teachers</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Globe className="w-7 h-7 text-purple-700" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Global Standards</h3>
                                <p className="text-sm text-gray-600">International quality</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100 mt-8">
                                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <Award className="w-7 h-7 text-amber-700" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Islamic Values</h3>
                                <p className="text-sm text-gray-600">Moral foundation</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}