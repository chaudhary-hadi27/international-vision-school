import Hero from '@/components/home/Hero'
import Link from 'next/link'
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react'
import StatsSection from '@/components/home/StatsSection'
import Image from 'next/image'
import FadeUp from '@/components/ui/FadeUp'

export default function HomePage() {
    return (
        <main className="bg-white">
            <Hero />

            {/* Video Section - Storytelling */}
            <section className="py-24 sm:py-32 lg:py-40 px-4 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

                <div className="container-custom">
                    <FadeUp>
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                            {/* Left - Content */}
                            <div className="space-y-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-ivs-blue/10 text-ivs-blue rounded-full mb-8 font-bold text-xs uppercase tracking-[0.2em]">
                                        Our Legacy
                                    </div>
                                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-ivs-navy mb-8 leading-[1.1] tracking-tight">
                                        Education That <span className="text-ivs-blue">Transforms</span> Lives
                                    </h2>
                                    <p className="text-xl text-slate-600 leading-relaxed font-sans">
                                        For over 15 years, International Vision School has been shaping young minds with a perfect blend of scientific excellence, modern innovation, and strong Islamic values.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { title: 'Cambridge & Local Board Excellence', desc: 'Dual curriculum approach preparing students for local and international success.' },
                                        { title: 'Personalized Learning Environment', desc: 'Small classes with maximum 25 students ensuring individual attention.' },
                                        { title: 'Character Development Focus', desc: 'Islamic values integrated with modern education for holistic growth.' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-6 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-premium flex items-center justify-center flex-shrink-0 mt-1 transition-all group-hover:bg-ivs-blue group-hover:text-white group-hover:shadow-ivs-blue/20">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-ivs-navy mb-1">{item.title}</h3>
                                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/about" className="inline-flex items-center gap-4 text-ivs-navy font-bold text-lg hover:text-ivs-blue transition-colors group">
                                    Discover Our Story
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-ivs-blue group-hover:text-white transition-all">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </div>

                            {/* Right - Visual */}
                            <div className="relative">
                                <div className="aspect-[4/5] bg-ivs-navy rounded-[4rem] overflow-hidden shadow-premium-xl relative group">
                                    <Image
                                        src="https://images.unsplash.com/photo-1544531696-60c35eb31835?q=80&w=2070&auto=format&fit=crop"
                                        alt="IVS Campus Life"
                                        fill
                                        className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ivs-navy via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110">
                                        <button className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:text-ivs-navy transition group/btn">
                                            <Play className="w-8 h-8 text-white group-hover/btn:text-ivs-navy fill-current ml-1" />
                                        </button>
                                    </div>

                                    {/* Testimonial card floating inside the visual */}
                                    <div className="absolute bottom-8 left-8 right-8 glass-surface rounded-[2.5rem] p-8 shadow-2xl border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                        <p className="text-white font-medium text-lg lg:text-xl italic leading-relaxed mb-4">
                                            "IVS transformed my daughter's confidence and academic performance. The environment is truly nurturing."
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-ivs-gold rounded-full flex items-center justify-center text-ivs-navy font-bold">P</div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Zainab Siddique</p>
                                                <p className="text-white/60 text-xs">Parent of Grade 5 Student</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-ivs-blue/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                            </div>

                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* Programs - Full Width Cards */}
            <section className="py-24 sm:py-32 lg:py-40 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent" />

                <div className="container-custom relative z-10">
                    <FadeUp>
                        <div className="text-center mb-24">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ivs-navy/5 text-ivs-navy rounded-full mb-8 font-bold text-xs uppercase tracking-[0.2em]">
                                Academics
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-ivs-navy mb-8 leading-[1.1] tracking-tight font-heading">
                                Programs for Every <span className="text-ivs-blue">Stage</span>
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-sans leading-relaxed">
                                From early childhood to board examinations, we provide an elite schooling experience tailored to each developmental milestone.
                            </p>
                        </div>
                    </FadeUp>

                    <div className="space-y-8 lg:space-y-12">

                        {/* Early Years - Large Card */}
                        <FadeUp delay={0.1}>
                            <div className="group relative overflow-hidden rounded-[3.5rem] bg-white shadow-premium hover:shadow-premium-xl transition-all duration-700 border border-slate-100">
                                <div className="grid lg:grid-cols-2 h-full">
                                    <div className="p-12 lg:p-20 flex flex-col justify-center">
                                        <div className="text-ivs-gold font-bold text-sm uppercase tracking-[0.2em] mb-6">Ages 2-5 Years</div>
                                        <h3 className="text-3xl lg:text-5xl font-bold text-ivs-navy mb-6 font-heading">Early Years Education</h3>
                                        <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                                            Playgroup, Nursery & KG programs that build strong foundations through sensory-based learning, early literacy, and social discovery.
                                        </p>
                                        <div className="flex flex-wrap gap-3 mb-12">
                                            {['Playgroup', 'Nursery', 'Kindergarten'].map(tag => (
                                                <span key={tag} className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                        <Link href="/academics" className="inline-flex items-center gap-4 text-ivs-navy font-bold text-lg group-hover:text-ivs-blue transition-all">
                                            Explore Foundation
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                    <div className="h-80 lg:h-auto relative overflow-hidden min-h-[400px]">
                                        <Image
                                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200"
                                            alt="Early Years Education"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10"></div>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>

                        {/* Primary & Middle - Grid */}
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Primary */}
                            <FadeUp delay={0.2}>
                                <div className="group relative overflow-hidden rounded-[3.5rem] bg-white border border-slate-100 hover:shadow-premium-xl transition-all duration-700">
                                    <div className="h-72 relative overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200"
                                            alt="Primary School"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="p-12">
                                        <div className="text-ivs-gold font-bold text-xs uppercase tracking-[0.2em] mb-4">Grade 1-5</div>
                                        <h3 className="text-3xl font-bold text-ivs-navy mb-4 font-heading">Primary School</h3>
                                        <p className="text-slate-500 mb-8 leading-relaxed">
                                            Building intellectual curiosity with a rigorous curriculum in English, Math, and Computational Sciences.
                                        </p>
                                        <Link href="/academics/primary" className="inline-flex items-center gap-3 text-ivs-navy font-bold hover:text-ivs-blue transition-all">
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </FadeUp>

                            {/* Middle */}
                            <FadeUp delay={0.3}>
                                <div className="group relative overflow-hidden rounded-[3.5rem] bg-white border border-slate-100 hover:shadow-premium-xl transition-all duration-700">
                                    <div className="h-72 relative overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200"
                                            alt="Middle School"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="p-12">
                                        <div className="text-ivs-gold font-bold text-xs uppercase tracking-[0.2em] mb-4">Grade 6-8</div>
                                        <h3 className="text-3xl font-bold text-ivs-navy mb-4 font-heading">Middle School</h3>
                                        <p className="text-slate-500 mb-8 leading-relaxed">
                                            Advanced laboratories and specialized teaching tracks preparing students for secondary excellence.
                                        </p>
                                        <Link href="/academics/middle" className="inline-flex items-center gap-3 text-ivs-navy font-bold hover:text-ivs-blue transition-all">
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </FadeUp>
                        </div>

                        {/* Secondary - Featured Card */}
                        <FadeUp delay={0.4}>
                            <div className="group relative overflow-hidden rounded-[3.5rem] bg-ivs-navy text-white shadow-premium-xl">
                                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ivs-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                                <div className="grid lg:grid-cols-2 relative z-10">
                                    <div className="h-80 lg:h-auto relative overflow-hidden order-first">
                                        <Image
                                            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200"
                                            alt="Secondary Program"
                                            fill
                                            className="object-cover brightness-[0.7] group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute top-8 left-8">
                                            <div className="px-6 py-2 bg-rose-500/90 backdrop-blur-md rounded-2xl text-white text-xs font-bold uppercase tracking-widest shadow-xl">
                                                Girls Campus Only
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-12 lg:p-20 flex flex-col justify-center">
                                        <div className="text-ivs-gold font-bold text-sm uppercase tracking-[0.2em] mb-6">Board Examination Prep</div>
                                        <h3 className="text-3xl lg:text-5xl font-bold mb-6 font-heading">Secondary Program</h3>
                                        <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                                            Elite SSC/Matric preparation with expert faculty and a proven 100% success rate in board examinations.
                                        </p>
                                        <div className="flex items-center gap-12 mb-12">
                                            <div>
                                                <div className="text-4xl font-bold text-white font-heading mb-1">98%</div>
                                                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">A+ Grades</div>
                                            </div>
                                            <div className="w-[1px] h-12 bg-white/10" />
                                            <div>
                                                <div className="text-4xl font-bold text-white font-heading mb-1">100%</div>
                                                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Pass Rate</div>
                                            </div>
                                        </div>
                                        <Link href="/academics/secondary" className="inline-flex items-center gap-4 text-ivs-gold font-bold text-lg hover:text-white transition-all group">
                                            Matriculation Program
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>

                    </div>
                </div>
            </section>

            {/* Replaced old Stats Banner with new component */}
            <StatsSection />

            {/* Pride of IVS Section */}
            <section className="py-24 lg:py-40 bg-white relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <FadeUp>
                        <div className="text-center mb-24">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ivs-blue/10 text-ivs-blue rounded-full mb-6 font-bold text-xs uppercase tracking-[0.2em]">
                                Our Legacy
                            </div>
                            <h2 className="text-4xl lg:text-7xl font-heading font-bold text-ivs-navy mb-8 tracking-tight">Pride of <span className="text-ivs-blue">IVS</span></h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                Meet our distinguished alumni who are redefining excellence in top-tier universities and global organizations.
                            </p>
                        </div>
                    </FadeUp>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        {[
                            { name: 'Sarah Ahmed', role: 'Medical Resident', uni: 'King Edward Medical University', quote: 'IVS gave me the intellectual foundation to pursue my surgical vocation.' },
                            { name: 'Bilal Khan', role: 'UX Designer', uni: 'LUMS (Full Merit Scholarship)', quote: 'The creative freedom and mentorship at IVS paved my path to success.' },
                            { name: 'Ayesha Malik', role: 'Barrister', uni: 'University of London', quote: 'Confidence, character, and vision - that is the IVS promise delivered.' },
                        ].map((student, i) => (
                            <FadeUp key={i} delay={i * 0.1}>
                                <div className="group bg-slate-50 text-slate-800 rounded-[3rem] p-12 hover:bg-ivs-navy hover:text-white transition-all duration-700 hover:shadow-premium-xl hover:-translate-y-3">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-ivs-navy font-bold text-2xl group-hover:rotate-6 transition-transform shadow-premium">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-xl mb-1">{student.name}</div>
                                            <div className="text-xs font-bold text-ivs-blue uppercase tracking-widest group-hover:text-ivs-gold">{student.uni}</div>
                                        </div>
                                    </div>
                                    <p className="text-lg italic leading-relaxed opacity-80 transition-opacity">
                                        "{student.quote}"
                                    </p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/alumni" className="btn-outline-premium">
                            Alumni Hall of Fame
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 sm:py-32 lg:py-40 relative">
                <div className="container-custom">
                    <div className="bg-ivs-navy rounded-[4rem] p-12 sm:p-20 lg:p-32 text-center relative overflow-hidden shadow-premium-xl">
                        {/* Interactive glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-ivs-navy via-ivs-blue/40 to-ivs-navy opacity-50" />
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ivs-gold/50 to-transparent" />

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-10 border border-white/10">
                                Admissions 2024-25
                            </span>
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight font-heading">
                                Shape the <span className="text-ivs-gold">Future</span> of Your Child
                            </h2>
                            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-16 leading-relaxed max-w-3xl mx-auto font-sans font-medium">
                                Limited seats available for our elite academic programs. Experience the IVS difference through a private campus tour.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href="/admissions" className="btn-premium !bg-ivs-blue hover:!bg-ivs-gold hover:!text-ivs-navy shadow-xl hover:shadow-ivs-blue/40">
                                    Apply Online
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <Link href="/contact" className="btn-glass">
                                    Campus Visit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}