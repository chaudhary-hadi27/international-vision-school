'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, LogIn, UserCircle, Phone, Mail, Instagram, Facebook, ArrowRight } from 'lucide-react'
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
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [portalDropdown, setPortalDropdown] = useState(false)
    const pathname = usePathname()
    const { scrollY } = useScroll()
    const isHomePage = pathname === '/'
    const hasVisualBg = !isHomePage || isScrolled

    // Smooth transforms for background and blur
    const bgColor = useTransform(
        scrollY,
        [0, 80],
        isHomePage ? ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.95)"] : ["rgba(15, 23, 42, 0.95)", "rgba(15, 23, 42, 0.98)"]
    )
    const bgBlur = useTransform(
        scrollY,
        [0, 80],
        isHomePage ? ["0px", "20px"] : ["20px", "25px"]
    )

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    }, [menuOpen])

    return (
        <>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[201] focus:bg-ivs-blue focus:text-white focus:px-6 focus:py-3 focus:rounded-2xl shadow-2xl">
                Skip to content
            </a>

            <motion.nav
                style={{ backgroundColor: bgColor, backdropFilter: `blur(${bgBlur})` }}
                className={`fixed w-full z-[100] transition-all duration-500 border-b ${hasVisualBg ? 'py-3 border-white/5 shadow-premium-2xl' : 'py-5 border-transparent'
                    }`}
            >
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className="flex justify-between items-center h-full">
                        {/* 1. Left: Brand */}
                        <div className="flex-1 flex justify-start">
                            <Brand isScrolled={hasVisualBg} />
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
                                <div className="h-6 w-[1px] bg-white/10 mx-1" />
                                <Link href="/admission-portal">
                                    <button className="px-6 py-2.5 bg-ivs-blue hover:bg-ivs-accent text-white rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-ivs-blue/40 active:scale-95 group flex items-center gap-2 shrink-0">
                                        Apply <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>

                            {/* Mobile Toggle */}
                            <button
                                className={`lg:hidden p-3 rounded-2xl transition-all active:scale-90 ${hasVisualBg ? 'text-white' : 'text-white bg-ivs-navy/20 backdrop-blur-md'
                                    }`}
                                onClick={() => setMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="w-7 h-7" />
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && <MobileMenu close={() => setMenuOpen(false)} pathname={pathname} />}
                </AnimatePresence>
            </motion.nav>
        </>
    )
}

function Brand({ isScrolled }: { isScrolled: boolean }) {
    return (
        <Link href="/" className="flex items-center gap-4 sm:gap-5 group outline-none py-1 shrink-0">
            <motion.div
                animate={{
                    scale: isScrolled ? 0.9 : 1,
                }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 bg-black ring-2 ring-white/20 shadow-xl overflow-hidden p-1.5"
            >
                <Image
                    src="/logo/ivs.png"
                    fill
                    className="object-contain p-2"
                    alt="IVS Logo"
                    priority
                />
            </motion.div>
            <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl xl:text-3xl font-black tracking-tight text-white leading-tight">
                    {SCHOOL_INFO.shortName}
                </span>
                <span className={`text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold mt-1 transition-colors duration-500 ${isScrolled ? 'text-slate-400' : 'text-slate-300'
                    }`}>
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
                className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-ivs-accent relative py-1 focus-visible:outline-none focus-visible:text-ivs-accent ${active ? 'text-ivs-accent' : 'text-white/90'
                    }`}
            >
                {name}
                {active && (
                    <motion.div layoutId="nav-active" className="absolute -bottom-2 left-0 w-full h-0.5 bg-ivs-accent" />
                )}
            </Link>
        </li>
    )
}

function PortalDropdown({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
    return (
        <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button
                className="flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-black text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10 uppercase tracking-widest"
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
        <Link href={href} className="flex items-center gap-3 p-3.5 rounded-[1.5rem] hover:bg-slate-50 transition-all group">
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
                className="fixed inset-0 bg-ivs-navy/85 backdrop-blur-md z-[110]"
                onClick={close}
            />
            <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-[80%] sm:w-[380px] bg-ivs-navy z-[120] shadow-2xl flex flex-col p-6 sm:p-8"
            >
                <div className="flex justify-between items-center mb-10 shrink-0">
                    <Brand isScrolled={true} />
                    <button onClick={close} className="p-3 bg-white/5 rounded-2xl text-white active:scale-90 transition-all focus:ring-1 focus:ring-white/20">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-ivs-blue mb-5 opacity-60">Main Menu</p>
                        <div className="grid grid-cols-1 gap-1.5">
                            {NAV_LINKS.map(link => {
                                const active = pathname === link.href
                                return (
                                    <Link
                                        key={link.href} href={link.href} onClick={close}
                                        className={`py-3.5 px-5 rounded-xl font-bold text-[13px] transition-all border flex items-center justify-between ${active ? 'bg-white text-ivs-navy border-white shadow-lg' : 'text-white/70 border-white/5 hover:bg-white/5'
                                            }`}
                                    >
                                        {link.name}
                                        {active && <ArrowRight className="w-3.5 h-3.5" />}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-emerald-400 mb-5 opacity-60">Services</p>
                        <div className="space-y-2.5">
                            <MobilePortalLink href="/parent-portal" icon={<UserCircle className="w-5 h-5" />} title="Parent Portal" color="bg-ivs-blue" onClick={close} />
                            <MobilePortalLink href="/admission-portal" icon={<LogIn className="w-5 h-5" />} title="Admission Portal" color="bg-emerald-500" onClick={close} />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-5 shrink-0">
                    <div className="flex justify-around gap-2">
                        {SOCIAL_LINKS.map((s, i) => (
                            <a key={i} href={s.href} className="p-3.5 bg-white/5 rounded-xl text-white border border-white/5 hover:bg-white/10 transition-all active:scale-95">
                                {s.icon}
                            </a>
                        ))}
                    </div>
                    <Link href="/admission-portal" onClick={close}>
                        <button className="w-full py-4.5 bg-emerald-500 text-white rounded-xl font-black shadow-emerald-500/10 shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest text-[11px]">
                            Apply Now <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </Link>
                </div>
            </motion.div>
        </>
    )
}

function MobilePortalLink({ href, icon, title, color, onClick }: any) {
    return (
        <Link href={href} onClick={onClick} className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl active:scale-[0.98] transition-all border border-transparent hover:border-white/5">
            <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${color} shadow-lg shadow-black/20`}>{icon}</div>
                <span className="font-bold text-white tracking-wide text-[13px]">{title}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/30" />
        </Link>
    )
}