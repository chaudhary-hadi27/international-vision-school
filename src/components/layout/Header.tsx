'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GraduationCap, Menu, X, ChevronDown, LogIn, UserCircle } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [portalDropdown, setPortalDropdown] = useState(false)
    const pathname = usePathname()

    // Check if we're on homepage
    const isHomePage = pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Determine if header should be transparent
    const isTransparent = isHomePage && !isScrolled

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
            isTransparent
                ? 'bg-white/5 backdrop-blur-md'
                : 'bg-white shadow-lg'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-md transition ${
                            isTransparent
                                ? 'bg-white/10 backdrop-blur-md border border-white/20'
                                : 'bg-gradient-to-br from-blue-900 to-blue-700'
                        }`}>
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <div className={`text-2xl font-bold transition ${isTransparent ? 'text-white' : 'text-gray-900'}`}>
                                {SCHOOL_INFO.shortName}
                            </div>
                            <div className={`text-xs font-medium -mt-1 transition ${isTransparent ? 'text-gray-200' : 'text-gray-600'}`}>
                                {SCHOOL_INFO.name}
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`font-medium transition hover:opacity-70 ${isTransparent ? 'text-white' : 'text-gray-700'}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={`font-medium transition hover:opacity-70 ${isTransparent ? 'text-white' : 'text-gray-700'}`}
                        >
                            About
                        </Link>
                        <Link
                            href="/academics"
                            className={`font-medium transition hover:opacity-70 ${isTransparent ? 'text-white' : 'text-gray-700'}`}
                        >
                            Academics
                        </Link>
                        <Link
                            href="/admissions"
                            className={`font-medium transition hover:opacity-70 ${isTransparent ? 'text-white' : 'text-gray-700'}`}
                        >
                            Admissions
                        </Link>
                        <Link
                            href="/contact"
                            className={`font-medium transition hover:opacity-70 ${isTransparent ? 'text-white' : 'text-gray-700'}`}
                        >
                            Contact
                        </Link>

                        {/* Portals Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setPortalDropdown(!portalDropdown)}
                                onMouseEnter={() => setPortalDropdown(true)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                                    isTransparent
                                        ? 'text-white hover:bg-white/10'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Portals
                                <ChevronDown className={`w-4 h-4 transition-transform ${portalDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {portalDropdown && (
                                <div
                                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden"
                                    onMouseLeave={() => setPortalDropdown(false)}
                                >
                                    <Link
                                        href="/parent-portal"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition group"
                                        onClick={() => setPortalDropdown(false)}
                                    >
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                                            <UserCircle className="w-5 h-5 text-blue-900" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Parent Portal</div>
                                            <div className="text-xs text-gray-500">Access student information</div>
                                        </div>
                                    </Link>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <Link
                                        href="/admission-portal"
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition group"
                                        onClick={() => setPortalDropdown(false)}
                                    >
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                                            <LogIn className="w-5 h-5 text-green-700" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Admission Portal</div>
                                            <div className="text-xs text-gray-500">Apply for admission online</div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Apply Now Button */}
                        <Link href="/admission-portal">
                            <button className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:scale-105 flex items-center gap-2 ${
                                isTransparent
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-blue-900 text-white hover:bg-blue-800'
                            }`}>
                                Apply Now
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <X className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-gray-900'}`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-gray-900'}`} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className={`lg:hidden border-t transition-all duration-300 ${
                    isTransparent
                        ? 'bg-white/10 backdrop-blur-xl border-white/20'
                        : 'bg-white border-gray-200'
                }`}>
                    <div className="px-4 py-4 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 px-4 rounded-lg font-medium transition ${
                                isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 px-4 rounded-lg font-medium transition ${
                                isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/academics"
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 px-4 rounded-lg font-medium transition ${
                                isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Academics
                        </Link>
                        <Link
                            href="/admissions"
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 px-4 rounded-lg font-medium transition ${
                                isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Admissions
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 px-4 rounded-lg font-medium transition ${
                                isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Contact
                        </Link>

                        {/* Divider */}
                        <div className={`my-3 border-t ${isTransparent ? 'border-white/20' : 'border-gray-200'}`}></div>

                        {/* Mobile Portals Section */}
                        <div className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 ${isTransparent ? 'text-gray-300' : 'text-gray-500'}`}>
                            Portals
                        </div>

                        <Link href="/parent-portal" onClick={() => setMenuOpen(false)}>
                            <button className={`w-full py-3 px-4 rounded-lg font-medium transition flex items-center gap-3 ${
                                isTransparent
                                    ? 'bg-white/10 text-white hover:bg-white/20'
                                    : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                            }`}>
                                <UserCircle className="w-5 h-5" />
                                <div className="text-left">
                                    <div className="font-semibold">Parent Portal</div>
                                    <div className={`text-xs ${isTransparent ? 'text-gray-300' : 'text-gray-600'}`}>Student information</div>
                                </div>
                            </button>
                        </Link>

                        <Link href="/admission-portal" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-3 shadow-lg">
                                <LogIn className="w-5 h-5" />
                                <div className="text-left">
                                    <div className="font-semibold">Admission Portal</div>
                                    <div className="text-xs text-blue-100">Apply online now</div>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}