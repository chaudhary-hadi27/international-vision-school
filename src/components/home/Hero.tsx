import Link from 'next/link'
import { ChevronRight, Award } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop&q=80"
                    alt="Students learning"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
                            <Award className="w-4 h-4 text-blue-300" />
                            <span className="text-sm font-semibold text-white">Excellence in Education Since 2010</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Building Tomorrow's
                            <span className="block text-blue-300">Leaders Today</span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl sm:text-2xl text-gray-200 mb-10 leading-relaxed">
                            International Vision School provides quality education from Playgroup to Grade 10, nurturing young minds with modern teaching and Islamic values.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mb-12">
                            <Link href="/admissions">
                                <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition shadow-2xl hover:shadow-blue-500/50 flex items-center gap-2">
                                    Start Admission Process
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-semibold text-lg transition">
                                    Schedule Campus Tour
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">15+</div>
                                <div className="text-sm text-gray-300">Years Excellence</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">2000+</div>
                                <div className="text-sm text-gray-300">Happy Students</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">98%</div>
                                <div className="text-sm text-gray-300">Success Rate</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                </div>
            </div>

        </section>
    )
}