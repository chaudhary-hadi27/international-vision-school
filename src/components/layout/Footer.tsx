import Link from 'next/link'
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'
import { SCHOOL_INFO, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
    return (
        <footer className="bg-ivs-navy text-white pt-24 pb-12 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ivs-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 mb-20">

                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6">
                                <GraduationCap className="w-10 h-10 text-ivs-navy" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight">{SCHOOL_INFO.shortName}</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Excellence in Education</span>
                            </div>
                        </Link>

                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            {SCHOOL_INFO.description || "Building Tomorrow's Leaders Today through a perfect blend of modern academic excellence and strong moral values."}
                        </p>

                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                                { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                                { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' }
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-ivs-blue hover:border-ivs-blue hover:-translate-y-1 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick navigation */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-ivs-gold">Explore</h3>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Academics', 'Admissions', 'Gallery', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                                        className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-ivs-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Academics */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-ivs-gold">Academics</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/academics/playgroup" className="hover:text-white transition-colors">Playgroup</Link></li>
                            <li><Link href="/academics/nursery-kg" className="hover:text-white transition-colors">Nursery & KG</Link></li>
                            <li><Link href="/academics/primary" className="hover:text-white transition-colors">Primary School</Link></li>
                            <li><Link href="/academics/middle" className="hover:text-white transition-colors">Middle School</Link></li>
                            <li><Link href="/academics/secondary" className="hover:text-white transition-colors">Secondary Program</Link></li>
                        </ul>
                    </div>

                    {/* Contact details */}
                    <div className="lg:col-span-4 space-y-8">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ivs-gold">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-ivs-blue transition-colors">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-slate-400 text-sm leading-relaxed">{SCHOOL_INFO.address}</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-ivs-blue transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <a href={`tel:${SCHOOL_INFO.phone}`} className="text-slate-400 hover:text-white font-medium text-sm">
                                    {SCHOOL_INFO.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-ivs-blue transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <a href={`mailto:${SCHOOL_INFO.email}`} className="text-slate-400 hover:text-white font-medium text-sm">
                                    {SCHOOL_INFO.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} {SCHOOL_INFO.name}. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <Link href="/privacy" className="hover:text-ivs-gold transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-ivs-gold transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}