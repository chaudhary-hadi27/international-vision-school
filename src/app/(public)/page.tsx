import Hero from '@/components/home/Hero'
import Link from 'next/link'
import { ArrowRight, Play, CheckCircle2, Award, Users, Globe, TrendingUp } from 'lucide-react'

export default function HomePage() {
    return (
        <main className="bg-white">
            <Hero />

            {/* Video Section - Storytelling */}
            <section className="py-16 sm:py-24 lg:py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

                        {/* Left - Content */}
                        <div className="space-y-6 sm:space-y-8">
                            <div>
                                <span className="inline-block px-3 sm:px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 sm:mb-6">
                                    Our Story
                                </span>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                                    Education That Transforms Lives
                                </h2>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                                    For over 15 years, International Vision School has been shaping young minds with a perfect blend of academic excellence, modern teaching, and strong Islamic values.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Cambridge & Local Board Excellence</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Dual curriculum approach preparing students for local and international success</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Personalized Learning Environment</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Small classes with maximum 25 students ensuring individual attention</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Character Development Focus</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Islamic values integrated with modern education for holistic growth</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/about" className="inline-flex items-center gap-2 text-blue-900 font-semibold text-base sm:text-lg hover:gap-3 transition-all">
                                Learn Our Story <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                        </div>

                        {/* Right - Visual */}
                        <div className="relative mt-8 lg:mt-0">
                            <div className="aspect-[4/3] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition">
                                        <Play className="w-6 h-6 sm:w-8 sm:h-8 text-blue-900 ml-1" />
                                    </button>
                                </div>
                                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
                                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                    <p className="text-gray-900 font-medium text-sm sm:text-base lg:text-lg italic">
                                        "IVS transformed my daughter's confidence and academic performance. The teachers genuinely care."
                                    </p>
                                    <p className="text-gray-600 mt-2 text-xs sm:text-sm">— Parent of Grade 5 Student</p>
                                </div>
                            </div>
                            <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 lg:w-48 lg:h-48 bg-blue-100 rounded-3xl -z-10"></div>
                            <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 lg:w-32 lg:h-32 bg-blue-50 rounded-3xl -z-10"></div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Programs - Full Width Cards */}
            <section className="py-16 sm:py-24 lg:py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <span className="inline-block px-3 sm:px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 sm:mb-6">
                            Academic Excellence
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
                            Programs for Every Stage
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            From early childhood to board examinations, we provide comprehensive education tailored to each developmental stage
                        </p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">

                        {/* Early Years - Large Card */}
                        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-900 transition-all duration-500 hover:shadow-2xl">
                            <div className="grid lg:grid-cols-2">
                                <div className="p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 self-start">
                                        Ages 2-5 Years
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Early Years Education</h3>
                                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                        Playgroup, Nursery & KG programs that build strong foundations through play-based learning, early literacy, and social development in a nurturing environment.
                                    </p>
                                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">Playgroup</span>
                                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">Nursery</span>
                                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">Kindergarten</span>
                                    </div>
                                    <Link href="/academics" className="inline-flex items-center gap-2 text-blue-900 font-semibold text-base sm:text-lg group-hover:gap-3 transition-all">
                                        Explore Program <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Link>
                                </div>
                                <div className="h-64 sm:h-80 lg:h-auto bg-neutral-100 relative order-first lg:order-last">
                                    <img
                                        src="/images/early-education.jpg"
                                        alt="Early Years Kids"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Primary & Middle - Grid */}
                        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">

                            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-900 transition-all duration-500 hover:shadow-2xl">
                                <div className="h-48 sm:h-56 lg:h-64 bg-neutral-100 relative">
                                    <img
                                        src="/images/primary-school.jpg"
                                        alt="Primary School"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-6 sm:p-8">
                                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                                        Grade 1-5
                                    </div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Primary School</h3>
                                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                                        Building strong academic foundations with comprehensive curriculum in English, Math, Science, Urdu, and Islamiyat.
                                    </p>
                                    <Link href="/academics/primary" className="inline-flex items-center gap-2 text-blue-900 font-semibold text-sm sm:text-base group-hover:gap-3 transition-all">
                                        Learn More <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-900 transition-all duration-500 hover:shadow-2xl">
                                <div className="h-48 sm:h-56 lg:h-64 bg-neutral-100 relative">
                                    <img
                                        src="/images/middle-school.jpg"
                                        alt="Middle School"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 sm:p-8">
                                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                                        Grade 6-8
                                    </div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Middle School</h3>
                                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                                        Advanced curriculum with science labs, computer education, and preparation for secondary education.
                                    </p>
                                    <Link href="/academics/middle" className="inline-flex items-center gap-2 text-blue-900 font-semibold text-sm sm:text-base group-hover:gap-3 transition-all">
                                        Learn More <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Link>
                                </div>
                            </div>

                        </div>

                        {/* Secondary - Featured Card */}
                        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white hover:shadow-2xl transition-all duration-500">
                            <div className="grid lg:grid-cols-2">
                                <div className="h-64 sm:h-80 lg:h-auto bg-neutral-100 relative order-first lg:order-first">
                                    <img
                                        src="/images/secondary-school.png"
                                        alt="Classroom Woman"
                                        className="absolute inset-0 w-full h-full object-cover object-center"
                                    />

                                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-rose-600 rounded-full text-xs sm:text-sm font-bold">
                                        👧 Girls Only
                                    </div>
                                </div>
                                <div className="p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                                    <div className="inline-block px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 self-start backdrop-blur-sm">
                                        Grade 9-10 | Board Exam Prep
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Secondary Program</h3>
                                    <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                                        Comprehensive SSC/Matric preparation with expert female faculty, regular mock exams, and proven track record of 100% success rate.
                                    </p>
                                    <div className="flex items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
                                        <div>
                                            <div className="text-2xl sm:text-3xl font-bold">98%</div>
                                            <div className="text-blue-200 text-xs sm:text-sm">A+ Grades</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl sm:text-3xl font-bold">100%</div>
                                            <div className="text-blue-200 text-xs sm:text-sm">Pass Rate</div>
                                        </div>
                                    </div>
                                    <Link href="/academics/secondary" className="inline-flex items-center gap-2 font-semibold text-base sm:text-lg group-hover:gap-3 transition-all">
                                        Explore Program <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="py-12 sm:py-16 lg:py-24 px-4 bg-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 text-center text-white">

                        <div className="space-y-2 sm:space-y-3">
                            <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-4 text-blue-300" />
                            <div className="text-3xl sm:text-4xl lg:text-6xl font-bold">15+</div>
                            <div className="text-blue-200 text-xs sm:text-sm lg:text-lg">Years of Excellence</div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-4 text-blue-300" />
                            <div className="text-3xl sm:text-4xl lg:text-6xl font-bold">2000+</div>
                            <div className="text-blue-200 text-xs sm:text-sm lg:text-lg">Happy Students</div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-4 text-blue-300" />
                            <div className="text-3xl sm:text-4xl lg:text-6xl font-bold">98%</div>
                            <div className="text-blue-200 text-xs sm:text-sm lg:text-lg">Success Rate</div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            <Globe className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-4 text-blue-300" />
                            <div className="text-3xl sm:text-4xl lg:text-6xl font-bold">100+</div>
                            <div className="text-blue-200 text-xs sm:text-sm lg:text-lg">Expert Teachers</div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-24 lg:py-32 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block px-3 sm:px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 sm:mb-8">
                        Join IVS Family
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-4">
                        Begin Your Child's Journey to Excellence
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
                        Limited seats available for the upcoming academic year. Schedule a campus tour and experience the IVS difference firsthand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                        <Link href="/admissions" className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-blue-900 text-white rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-blue-800 transition shadow-xl hover:shadow-2xl">
                            Apply for Admission
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-white text-blue-900 border-2 border-blue-900 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-blue-50 transition">
                            Schedule Campus Visit
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}