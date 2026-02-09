// src/app/(public)/careers/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    Users,
    Award,
    Send,
    CheckCircle2,
    Briefcase,
    Globe,
    Sparkles,
    Heart,
    Zap
} from 'lucide-react';

export default function CareersPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        qualification: '',
        experience: '',
        subject: '',
        coverLetter: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/careers/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
            } else {
                setError(data.message || 'Something went wrong.');
            }
        } catch (err) {
            setError('Failed to submit application.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-white overflow-hidden">
                {/* Background Image Container with increased visibility */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                        fill
                        className="object-cover opacity-[0.12] scale-105 transition-transform duration-[20s] hover:scale-100"
                        alt="Background Educators"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 bg-white border border-ivs-blue/10 text-ivs-blue rounded-full mb-10 font-black text-[10px] uppercase tracking-[0.3em] shadow-sm"
                    >
                        <div className="relative w-5 h-5 overflow-hidden">
                            <Image src="/logo/ivs.png" fill className="object-contain" alt="Logo" />
                        </div>
                        Career Opportunities
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-ivs-navy mb-8 tracking-tight"
                    >
                        Shape the <span className="text-ivs-blue italic">Future</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Join a community of prestigious educators at IVS, where we nurture brilliant minds and build tomorrow's leaders.
                    </motion.p>
                </div>

                {/* Decorative Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.4em]">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-ivs-blue to-transparent" />
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold text-ivs-navy mb-6 font-heading">Why Teach at IVS?</h2>
                        <div className="w-24 h-1.5 bg-ivs-gold mx-auto mb-8 rounded-full" />
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">Beyond a traditional workspace, we offer an environment that values intellectual growth and professional distinction.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Users,
                                title: 'Elite Community',
                                desc: 'Collaborate with top-tier educators in an environment of mutual respect and high intellectual standards.',
                                color: 'bg-blue-50 text-blue-600'
                            },
                            {
                                icon: Zap,
                                title: 'Continuous Growth',
                                desc: 'Access exclusive professional development retreats, international seminars, and research funding.',
                                color: 'bg-amber-50 text-amber-600'
                            },
                            {
                                icon: Award,
                                title: 'Premium Distinction',
                                desc: 'Benefit from industry-leading compensation, comprehensive wellness packages, and a legacy-driven career.',
                                color: 'bg-rose-50 text-rose-600'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="premium-card bg-white border border-slate-100 p-10 rounded-[3rem] group hover:border-ivs-blue hover:shadow-2xl transition-all duration-500"
                            >
                                <div className={`w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-ivs-blue group-hover:text-white transition-colors shadow-sm`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-ivs-navy mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium group-hover:text-white/70 transition-colors">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-32 bg-white border-t border-slate-100 relative">
                <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full translate-x-1/2" />

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[4rem] shadow-premium border border-slate-100 p-8 md:p-20 overflow-hidden relative"
                    >
                        {/* Static Decoration */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-ivs-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-ivs-navy mb-4 font-heading">Application Register</h2>
                            <p className="text-slate-500 font-medium tracking-tight">Begin your journey towards educational excellence.</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-ivs-navy mb-4">Registry Success!</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto text-lg leading-relaxed font-medium">Your credentials have been recorded. Our Talent Acquisition team will review your profile shortly.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-10 text-ivs-blue font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all"
                                    >
                                        Apply for another role <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {error && (
                                        <div className="p-5 bg-rose-50 text-rose-600 rounded-[1.5rem] text-sm font-bold border border-rose-100 flex items-center gap-3">
                                            <div className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Legal Full Name *</label>
                                            <input
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-ivs-blue outline-none font-bold text-ivs-navy transition-all placeholder:text-slate-300"
                                                placeholder="e.g. Dr. Salman Ahmed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Official Email *</label>
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-ivs-blue outline-none font-bold text-ivs-navy transition-all placeholder:text-slate-300"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Direct Contact *</label>
                                            <input
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-ivs-blue outline-none font-bold text-ivs-navy transition-all placeholder:text-slate-300"
                                                placeholder="+92 3XX XXXXXXX"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Specialty Domain *</label>
                                            <input
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-ivs-blue outline-none font-bold text-ivs-navy transition-all placeholder:text-slate-300"
                                                placeholder="e.g. Theoretical Physics, Literature"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Academic Credential *</label>
                                            <div className="relative">
                                                <select
                                                    name="qualification"
                                                    required
                                                    value={formData.qualification}
                                                    onChange={handleChange}
                                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue outline-none font-bold text-ivs-navy appearance-none transition-all cursor-pointer"
                                                >
                                                    <option value="">Select Qualification</option>
                                                    <option value="Bachelors">Bachelors Honors</option>
                                                    <option value="Masters">Masters / M.Phil</option>
                                                    <option value="PhD">Doctorate (PhD)</option>
                                                    <option value="Other">Specialized Diploma</option>
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Experience Level *</label>
                                            <div className="relative">
                                                <select
                                                    name="experience"
                                                    required
                                                    value={formData.experience}
                                                    onChange={handleChange}
                                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue outline-none font-bold text-ivs-navy appearance-none transition-all cursor-pointer"
                                                >
                                                    <option value="">Select Level</option>
                                                    <option value="Fresh">Associate (Fresh)</option>
                                                    <option value="1-3">Senior (1-3 Yrs)</option>
                                                    <option value="3-5">Lead (3-5 Yrs)</option>
                                                    <option value="5+">Distinguished (5+ Yrs)</option>
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Statement of Purpose / Cover Letter</label>
                                        <textarea
                                            name="coverLetter"
                                            rows={5}
                                            value={formData.coverLetter}
                                            onChange={handleChange}
                                            className="w-full px-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-ivs-blue outline-none font-medium text-slate-700 transition-all resize-none leading-relaxed placeholder:text-slate-300"
                                            placeholder="Introduce yourself and your vision for teaching..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-6 bg-ivs-blue hover:bg-ivs-accent text-white font-bold rounded-[2rem] transition-all shadow-xl shadow-ivs-blue/10 flex items-center justify-center gap-3 disabled:opacity-70 group"
                                    >
                                        {submitting ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                <span>Verifying Registry...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Submit Official Application</span>
                                                <Send className="w-5 h-5 text-white/70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

function ChevronDown({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    )
}
