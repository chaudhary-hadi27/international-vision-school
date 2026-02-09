'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, ArrowLeft, Phone, Mail, HelpCircle, Smartphone, Clock, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AdmissionPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isSupportOnline = () => {
        const now = new Date()
        const pakTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }))
        const hours = pakTime.getHours()
        const day = pakTime.getDay()

        if (day >= 1 && day <= 5) return hours >= 8 && hours < 16
        if (day === 6) return hours >= 8 && hours < 13
        return false
    }

    return (
        <div className="min-h-screen bg-[#FAFBFF] selection:bg-ivs-blue/10 selection:text-ivs-blue">
            {/* Premium Glassmorphism Header */}
            <header className={`sticky top-0 z-[100] transition-all duration-500 ${scrolled
                ? 'py-3 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100'
                : 'py-6 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Enhanced Logo */}
                        <Link href="/" className="flex items-center gap-4 group">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -5 }}
                                className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-ivs-blue/20 p-1 overflow-hidden"
                            >
                                <Image
                                    src="/logo/ivs.png"
                                    fill
                                    className="object-contain p-1"
                                    alt="IVS Logo"
                                    priority
                                />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-ivs-navy tracking-tight leading-none mb-1">IVS</span>
                                <span className="text-[10px] uppercase font-bold text-ivs-blue tracking-[0.2em] leading-none">Admission Portal</span>
                            </div>
                        </Link>

                        {/* Back to Website with Magnetic Effect Feel */}
                        <Link href="/" className="group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md hover:border-ivs-blue/30 transition-all duration-300">
                            <div className="p-1 bg-slate-50 rounded-full group-hover:bg-ivs-blue/10 group-hover:text-ivs-blue transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-ivs-navy transition-colors">Main Website</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative">
                {/* Background Textures */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-ivs-blue/5 rounded-full blur-[100px] -z-10 animate-pulse" />

                {children}
            </main>

            {/* High-End Enterprise Footer */}
            <footer className="bg-white border-t border-slate-100 mt-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/30 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        {/* School Info */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 overflow-hidden p-1">
                                    <Image
                                        src="/logo/ivs.png"
                                        fill
                                        className="object-contain p-1.5"
                                        alt="IVS Logo"
                                    />
                                </div>
                                <h3 className="text-xl font-black text-ivs-navy font-heading">International Vision School</h3>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
                                Empowering students with a world-class education system designed for the future leaders of Pakistan and beyond.
                            </p>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full animate-pulse ${isSupportOnline() ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]' : 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]'}`} />
                                    <span className={`text-[10px] uppercase font-black tracking-widest ${isSupportOnline() ? 'text-green-600' : 'text-amber-600'}`}>
                                        {isSupportOnline() ? 'Support Active' : 'Offline / After Hours'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Channels */}
                        <div className="md:col-span-3 space-y-6">
                            <h4 className="text-[10px] uppercase font-black text-ivs-navy tracking-[0.2em]">Contact Helpdesk</h4>
                            <div className="space-y-4">
                                <a href="tel:+923001234567" className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                    <div className="p-2.5 bg-blue-50 text-ivs-blue rounded-xl group-hover:bg-ivs-blue group-hover:text-white transition-all">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Call Us</span>
                                        <span className="text-sm font-bold text-ivs-navy">+92 300 1234567</span>
                                    </div>
                                </a>
                                <a href="mailto:admin@ivs.edu.pk" className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                    <div className="p-2.5 bg-blue-50 text-ivs-blue rounded-xl group-hover:bg-ivs-blue group-hover:text-white transition-all">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email</span>
                                        <span className="text-sm font-bold text-ivs-navy">admin@ivs.edu.pk</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Operational Hours */}
                        <div className="md:col-span-4 space-y-6">
                            <h4 className="text-[10px] uppercase font-black text-ivs-navy tracking-[0.2em]">Office Hours</h4>
                            <div className="grid gap-4">
                                <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-ivs-navy uppercase tracking-wider">Monday — Friday</span>
                                        <Clock className="w-4 h-4 text-ivs-blue/30 group-hover:text-ivs-blue transition-colors" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-500">08:00 AM — 04:00 PM (PKT)</span>
                                </div>
                                <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-ivs-navy uppercase tracking-wider">Saturday</span>
                                        <Smartphone className="w-4 h-4 text-emerald-500/30 group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-500">08:00 AM — 01:00 PM (PKT)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em]">
                            © {new Date().getFullYear()} International Vision School. <span className="text-ivs-navy/20 mx-2">|</span> Powered by Enterprise Portal
                        </p>
                        <div className="flex items-center gap-8">
                            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-ivs-blue transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-ivs-blue transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}