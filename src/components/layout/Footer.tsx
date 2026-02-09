'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Send } from 'lucide-react'
import { SCHOOL_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer className="bg-white text-ivs-navy pt-24 pb-12 overflow-hidden relative border-t border-slate-100">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ivs-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 mb-20">

                    {/* Brand & Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 space-y-10"
                    >
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="relative w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 shadow-sm overflow-hidden p-1">
                                <Image
                                    src="/logo/ivs.png"
                                    fill
                                    className="object-contain p-2"
                                    alt="IVS Logo"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight text-ivs-navy">{SCHOOL_INFO.shortName}</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-ivs-blue">Excellence in Education</span>
                            </div>
                        </Link>

                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Stay Connected</h4>
                            <div className="relative group max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-6 pr-14 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue focus:outline-none transition-all font-medium text-sm"
                                />
                                <button className="absolute right-2 top-2 bottom-2 px-4 bg-ivs-blue text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-ivs-blue/20">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium">Get latest updates and news directly in your inbox.</p>
                        </div>

                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                                { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                                { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' }
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    className="w-12 h-12 bg-ivs-blue-light/30 border border-ivs-blue-light rounded-2xl flex items-center justify-center hover:bg-ivs-blue hover:text-white hover:border-ivs-blue transition-all duration-300 text-ivs-blue shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-ivs-blue">Explore</h3>
                        <ul className="space-y-5">
                            {['Home', 'About Us', 'Academics', 'Admissions', 'Gallery', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                                        className="text-slate-500 hover:text-ivs-blue font-bold text-sm transition-all duration-300 flex items-center gap-3 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-ivs-blue rounded-full opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all font-black" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Academics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-ivs-blue">Academic Path</h3>
                        <ul className="space-y-5 font-bold text-sm">
                            {[
                                { name: 'Playgroup', href: '/academics/playgroup' },
                                { name: 'Nursery & KG', href: '/academics/nursery-kg' },
                                { name: 'Primary School', href: '/academics/primary' },
                                { name: 'Middle School', href: '/academics/middle' },
                                { name: 'Secondary Program', href: '/academics/secondary' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-500 hover:text-ivs-blue transition-colors flex items-center gap-2 group">
                                        <div className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-ivs-blue transition-colors" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-3 space-y-10"
                    >
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-ivs-blue">Contact Registry</h3>
                        <ul className="space-y-8">
                            <li className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-ivs-blue group-hover:border-ivs-blue group-hover:text-white text-ivs-blue transition-all shadow-sm">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Campus Location</span>
                                    <span className="text-slate-600 text-xs font-bold leading-relaxed">{SCHOOL_INFO.address}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-ivs-blue group-hover:border-ivs-blue group-hover:text-white text-ivs-blue transition-all shadow-sm">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Direct Line</span>
                                    <a href={`tel:${SCHOOL_INFO.phone}`} className="text-slate-600 hover:text-ivs-blue font-bold text-sm">
                                        {SCHOOL_INFO.phone}
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                </div>

                <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} {SCHOOL_INFO.shortName}. International Vision School
                    </p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <Link href="/privacy" className="hover:text-ivs-blue transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-ivs-blue transition-colors">Terms</Link>
                        <Link href="/contact" className="hover:text-ivs-blue transition-colors">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}