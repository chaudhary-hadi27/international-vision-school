import { ChevronRight, Award } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[500px] sm:min-h-[600px] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop&q=80"
                    alt="Students learning"
                    className="w-full h-full object-cover object-center"
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/10 backdrop-blur-md rounded-full mb-6 sm:mb-8 border border-white/20">
                            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold text-white">Excellence in Education Since 2010</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                            International Vision
                            <span className="block text-blue-300 text">School</span>
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-10 leading-relaxed">
                            Building Tomorrow's Leaders Today - International Vision School provides quality education from Playgroup to Grade 10, nurturing young minds with modern teaching and Islamic values.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
                            <button className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 flex items-center justify-center gap-2">
                                Start Admission Process
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105">
                                Schedule Campus Tour
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/20">
                            <div className="text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">15+</div>
                                <div className="text-xs sm:text-sm text-gray-300">Years Excellence</div>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">2000+</div>
                                <div className="text-xs sm:text-sm text-gray-300">Happy Students</div>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">98%</div>
                                <div className="text-xs sm:text-sm text-gray-300">Success Rate</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                </div>
            </div>

        </section>
    );
}