import Hero from '@/components/home/Hero'
import Link from 'next/link'
import { ArrowRight, Play, CheckCircle2, Award, Users, Globe, TrendingUp } from 'lucide-react'

export default function HomePage() {
    return (
        <main className="bg-white">
            <Hero />

            {/* Video Section - Storytelling */}
            <section className="py-32 px-4 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left - Content */}
                        <div className="space-y-8">
                            <div>
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                  Our Story
                </span>
                                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Education That Transforms Lives
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    For over 15 years, International Vision School has been shaping young minds with a perfect blend of academic excellence, modern teaching, and strong Islamic values.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Cambridge & Local Board Excellence</h3>
                                        <p className="text-gray-600">Dual curriculum approach preparing students for local and international success</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Personalized Learning Environment</h3>
                                        <p className="text-gray-600">Small classes with maximum 25 students ensuring individual attention</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Character Development Focus</h3>
                                        <p className="text-gray-600">Islamic values integrated with modern education for holistic growth</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/about" className="inline-flex items-center gap-2 text-blue-900 font-semibold text-lg hover:gap-3 transition-all">
                                Learn Our Story <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Right - Visual */}
                        <div className="relative">
                            <div className="aspect-[4/3] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition">
                                        <Play className="w-8 h-8 text-blue-900 ml-1" />
                                    </button>
                                </div>
                                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
                                <div className="absolute bottom-8 left-8 right-8 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6">
                                    <p className="text-gray-900 font-medium text-lg italic">
                                        "IVS transformed my daughter's confidence and academic performance. The teachers genuinely care."
                                    </p>
                                    <p className="text-gray-600 mt-2 text-sm">— Parent of Grade 5 Student</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-100 rounded-3xl -z-10"></div>
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-50 rounded-3xl -z-10"></div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Programs - Full Width Cards */}
            <section className="py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
              Academic Excellence
            </span>
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Programs for Every Stage
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From early childhood to board examinations, we provide comprehensive education tailored to each developmental stage
                        </p>
                    </div>

                    <div className="space-y-6">

                        {/* Early Years - Large Card */}
                        <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-900 transition-all duration-500 hover:shadow-2xl">
                            <div className="grid lg:grid-cols-2">
                                <div className="p-12 lg:p-16 flex flex-col justify-center">
                                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold mb-6 self-start">
                                        Ages 2-5 Years
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-4">Early Years Education</h3>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        Playgroup, Nursery & KG programs that build strong foundations through play-based learning, early literacy, and social development in a nurturing environment.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Playgroup</span>
                                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Nursery</span>
                                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Kindergarten</span>
                                    </div>
                                    <Link href="/academics" className="inline-flex items-center gap-2 text-blue-900 font-semibold text-lg group-hover:gap-3 transition-all">
                                        Explore Program <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                                <div className="h-80 lg:h-auto bg-neutral-100 relative">
                                    <img
                                        src="images/early-education.jpg"
                                        alt="Early Years Kids"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Primary & Middle - Grid */}
                        <div className="grid lg:grid-cols-2 gap-6">

                            <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-900 transition-all duration-500 hover:shadow-2xl">
                                <div className="h-64 bg-neutral-100 relative">
                                    <img
                                        src="/images/primary-school.jpg"
                                        alt="Primary School"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-8">
                                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold mb-4">
                                        Grade 1-5
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Primary School</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Building strong academic foundations with comprehensive curriculum in English, Math, Science, Urdu, and Islamiyat.
                                    </p>
                                    <Link href="/academics/primary" className="inline-flex items-center gap-2 text-blue-900 font-semibold group-hover:gap-3 transition-all">
                                        Learn More <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-900 transition-all duration-500 hover:shadow-2xl">
                                <div className="h-64 bg-neutral-100 relative">
                                    <img
                                        src="/images/middle-school.jpg"
                                        alt="Middle School"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold mb-4">
                                        Grade 6-8
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Middle School</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Advanced curriculum with science labs, computer education, and preparation for secondary education.
                                    </p>
                                    <Link href="/academics/middle" className="inline-flex items-center gap-2 text-blue-900 font-semibold group-hover:gap-3 transition-all">
                                        Learn More <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                        </div>

                        {/* Secondary - Featured Card */}
                        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white hover:shadow-2xl transition-all duration-500">
                            <div className="grid lg:grid-cols-2">
                                <div className="h-80 lg:h-auto bg-neutral-100 relative">
                                    <img
                                        src="images/secondary-school.png"
                                        alt="Classroom Woman"
                                        className="absolute inset-0 w-full h-full object-top scale-y-150"
                                    />

                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white text-rose-600 rounded-full text-sm font-bold">
                                        👧 Girls Only
                                    </div>
                                </div>
                                <div className="p-12 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
                                    <div className="inline-block px-3 py-1 bg-white bg-opacity-20 text-black rounded-full text-sm font-semibold mb-6 self-start backdrop-blur-sm">
                                        Grade 9-10 | Board Exam Prep
                                    </div>
                                    <h3 className="text-4xl font-bold mb-4">Secondary Program</h3>
                                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                        Comprehensive SSC/Matric preparation with expert female faculty, regular mock exams, and proven track record of 100% success rate.
                                    </p>
                                    <div className="flex items-center gap-8 mb-8">
                                        <div>
                                            <div className="text-3xl font-bold">98%</div>
                                            <div className="text-blue-200 text-sm">A+ Grades</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold">100%</div>
                                            <div className="text-blue-200 text-sm">Pass Rate</div>
                                        </div>
                                    </div>
                                    <Link href="/academics/secondary" className="inline-flex items-center gap-2 font-semibold text-lg group-hover:gap-3 transition-all">
                                        Explore Program <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="py-24 px-4 bg-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-4 gap-12 text-center text-white">

                        <div className="space-y-3">
                            <Award className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                            <div className="text-6xl font-bold">15+</div>
                            <div className="text-blue-200 text-lg">Years of Excellence</div>
                        </div>

                        <div className="space-y-3">
                            <Users className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                            <div className="text-6xl font-bold">2000+</div>
                            <div className="text-blue-200 text-lg">Happy Students</div>
                        </div>

                        <div className="space-y-3">
                            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                            <div className="text-6xl font-bold">98%</div>
                            <div className="text-blue-200 text-lg">Success Rate</div>
                        </div>

                        <div className="space-y-3">
                            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                            <div className="text-6xl font-bold">100+</div>
                            <div className="text-blue-200 text-lg">Expert Teachers</div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4">
                <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold tracking-wide uppercase mb-8">
            Join IVS Family
          </span>
                    <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                        Begin Your Child's Journey to Excellence
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Limited seats available for the upcoming academic year. Schedule a campus tour and experience the IVS difference firsthand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/admissions" className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-900 text-white rounded-2xl font-semibold text-lg hover:bg-blue-800 transition shadow-xl hover:shadow-2xl">
                            Apply for Admission
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-900 border-2 border-blue-900 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition">
                            Schedule Campus Visit
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}