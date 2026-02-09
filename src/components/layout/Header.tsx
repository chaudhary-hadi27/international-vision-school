'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, LogIn, UserCircle, Phone, Mail, Instagram, Facebook, ArrowRight, GraduationCap } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

// --- Types ---
interface NavLinkProps {
    name: string
    href: string
    active: boolean
}

interface PortalLinkProps {
    href: string
    icon: React.ReactNode
    title: string
    color: string
}

// --- Configuration ---
const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
]

const SOCIAL_LINKS = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Phone className="w-5 h-5" />, href: '#', label: 'Call' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' },
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [portalDropdown, setPortalDropdown] = useState(false)
    const pathname = usePathname()
    // const { scrollY } = useScroll() // Removed scroll logic
    // const isHomePage = pathname === '/' // No longer needed for bg logic
    const hasVisualBg = true // Always true now

    // Removed dynamic bg transforms

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    }, [menuOpen])

    return (
        <>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[201] focus:bg-ivs-blue focus:text-white focus:px-6 focus:py-3 focus:rounded-2xl shadow-2xl">
                Skip to content
            </a>

            <motion.nav
                style={{ backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(20px)" }}
                className="fixed w-full z-[100] transition-all duration-500 border-b py-3 border-ivs-blue-light/10 shadow-sm"
            >
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="flex justify-between items-center h-full">
                        {/* 1. Left: Brand */}
                        <div className="flex-1 flex justify-start">
                            <Brand />
                        </div>

                        {/* 2. Center: Desktop Navigation Links (No Pill Layer) */}
                        <div className="hidden lg:flex flex-1 justify-center">
                            <ul className="flex items-center gap-6 xl:gap-8">
                                {NAV_LINKS.map(link => (
                                    <NavLink key={link.href} {...link} active={pathname === link.href} />
                                ))}
                            </ul>
                        </div>

                        {/* 3. Right: Portals & Call to Action */}
                        <div className="flex-1 flex justify-end items-center gap-4">
                            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                                <PortalDropdown isOpen={portalDropdown} setIsOpen={setPortalDropdown} />
                                <div className="h-6 w-[1px] mx-1 bg-ivs-navy/10" />
                                <Link href="/admission-portal">
                                    <button className="px-6 py-2.5 bg-ivs-blue hover:bg-ivs-accent text-white rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-ivs-blue/40 active:scale-95 group flex items-center gap-2 shrink-0">
                                        Apply <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>

                            {/* Mobile Toggle */}
                            <button
                                className="lg:hidden p-3 rounded-2xl transition-all active:scale-90 text-ivs-navy"
                                onClick={() => setMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="w-7 h-7" />
                            </button>
                        </div>
                    </div>
                </div>

            </motion.nav>

            <AnimatePresence>
                {menuOpen && <MobileMenu close={() => setMenuOpen(false)} pathname={pathname} />}
            </AnimatePresence>
        </>
    )
}

function Brand() {
    return (
        <Link href="/" className="flex items-center gap-4 sm:gap-5 group outline-none py-1 shrink-0">
            <motion.div
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 ring-2 shadow-xl overflow-hidden p-1 bg-white ring-ivs-blue-light/20"
            >
                <Image
                    src="/logo/ivs.png"
                    fill
                    className="object-contain p-1"
                    alt="IVS Logo"
                    priority
                />
            </motion.div>
            <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl xl:text-3xl font-black tracking-tight leading-tight transition-colors duration-500 text-ivs-navy">
                    {SCHOOL_INFO.shortName}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold mt-1 transition-colors duration-500 text-ivs-blue">
                    Excellence in Education
                </span>
            </div>
        </Link>
    )
}

function NavLink({ name, href, active }: NavLinkProps) {
    return (
        <li>
            <Link
                href={href}
                className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-ivs-blue relative py-1 focus-visible:outline-none focus-visible:text-ivs-blue 
                ${active ? 'text-ivs-blue' : 'text-ivs-navy/80 hover:text-ivs-blue'}
                `}
            >
                {name}
                {active && (
                    <motion.div layoutId="nav-active" className="absolute -bottom-2 left-0 w-full h-0.5 bg-ivs-blue" />
                )}
            </Link>
        </li>
    )
}

function PortalDropdown({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
    return (
        <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-black transition-all border uppercase tracking-widest 
                ${isOpen ? 'bg-ivs-blue text-white border-ivs-blue' : 'text-ivs-navy border-ivs-navy/10 hover:bg-ivs-blue-light/10 hover:text-ivs-blue'}
                `}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                Portals <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute top-full right-0 mt-4 w-60 bg-white rounded-[2rem] shadow-premium-2xl p-2.5 border border-slate-100 overflow-hidden"
                    >
                        <PortalLink href="/parent-portal" icon={<UserCircle className="w-5 h-5" />} title="Parent Portal" color="bg-ivs-blue" />
                        <PortalLink href="/admission-portal" icon={<LogIn className="w-5 h-5" />} title="Admission Portal" color="bg-emerald-500" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function PortalLink({ href, icon, title, color }: PortalLinkProps) {
    return (
        <Link href={href} className="flex items-center gap-3 p-3.5 rounded-[1.5rem] hover:bg-ivs-blue-light/50 text-ivs-navy hover:text-ivs-blue transition-all group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${color} group-hover:scale-105 transition-transform`}>
                {icon}
            </div>
            <span className="font-bold text-ivs-navy text-[13px]">{title}</span>
        </Link>
    )
}

function MobileMenu({ close, pathname }: { close: () => void, pathname: string }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-ivs-navy/20 backdrop-blur-md z-[110] lg:hidden"
                onClick={close}
            />
            <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 35, stiffness: 350 }}
                className="fixed top-0 right-0 bottom-0 w-full xs:w-[320px] sm:w-[380px] bg-white z-[120] shadow-2xl flex flex-col lg:hidden border-l border-slate-100"
            >
                {/* Header within Mobile Menu */}
                <div className="flex justify-between items-center p-5 border-b border-slate-50 shrink-0">
                    <Link href="/" onClick={close} className="flex items-center gap-3">
                        <div className="relative w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-ivs-blue/10 p-1 overflow-hidden border border-slate-50">
                            <Image
                                src="/logo/ivs.png"
                                fill
                                className="object-contain p-1"
                                alt="IVS Logo"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-black text-ivs-navy leading-none">IVS</span>
                            <span className="text-[7px] uppercase font-bold text-ivs-blue tracking-widest mt-0.5">Education</span>
                        </div>
                    </Link>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={close}
                        className="p-2 bg-slate-50 text-slate-500 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* Scrollable Navigation - Scrollbar Hidden */}
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8 scrollbar-hide scroll-smooth">
                    <div className="space-y-3">
                        <p className="px-4 text-[9px] uppercase font-black text-slate-400 tracking-[0.2em]">Navigation</p>
                        <div className="space-y-1">
                            {NAV_LINKS.map(link => {
                                const active = pathname === link.href
                                return (
                                    <Link
                                        key={link.href} href={link.href} onClick={close}
                                        className={`group flex items-center justify-between py-3.5 px-4 rounded-xl font-bold text-[13px] transition-all border ${active
                                            ? 'bg-ivs-blue text-white border-ivs-blue shadow-lg shadow-ivs-blue/20'
                                            : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-ivs-blue'
                                            }`}
                                    >
                                        {link.name}
                                        <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="px-4 text-[9px] uppercase font-black text-ivs-blue tracking-[0.2em]">Services</p>
                        <div className="space-y-2">
                            <MobilePortalLink href="/parent-portal" icon={<UserCircle className="w-5 h-5" />} title="Parent Portal" color="bg-ivs-blue" onClick={close} />
                            <MobilePortalLink href="/admission-portal" icon={<LogIn className="w-5 h-5" />} title="Admission Portal" color="bg-emerald-500" onClick={close} />
                        </div>
                    </div>
                </div>

                {/* Footer within Mobile Menu */}
                <div className="p-5 bg-slate-50/50 border-t border-slate-100 space-y-5 shrink-0">
                    <div className="flex items-center justify-around gap-2 px-2">
                        {SOCIAL_LINKS.map((s, i) => (
                            <motion.a
                                whileTap={{ scale: 0.9 }}
                                key={i} href={s.href}
                                className="w-10 h-10 bg-white rounded-xl text-slate-400 flex items-center justify-center border border-slate-100 shadow-sm hover:text-ivs-blue transition-all"
                            >
                                {s.icon}
                            </motion.a>
                        ))}
                    </div>
                    <Link href="/admission-portal" onClick={close}>
                        <button className="w-full py-4 bg-gradient-to-br from-ivs-blue to-blue-700 text-white rounded-xl font-black shadow-xl shadow-ivs-blue/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-[10px]">
                            Apply Now <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </motion.div>
        </>
    )
}

function MobilePortalLink({ href, icon, title, color, onClick }: any) {
    return (
        <Link href={href} onClick={onClick} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-100 hover:border-ivs-blue/20 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white ${color} shadow-lg transition-transform group-hover:scale-105`}>{icon}</div>
                <span className="font-bold text-ivs-navy text-[13px]">{title}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-ivs-blue transition-colors" />
        </Link>
    )
}