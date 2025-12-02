'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GraduationCap, Menu, X } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'
import Button from '../ui/Button'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{SCHOOL_INFO.shortName}</div>
                            <div className="text-xs text-gray-600 font-medium -mt-1">{SCHOOL_INFO.name}</div>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium transition">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-900 font-medium transition">About</Link>
                        <Link href="/academics" className="text-gray-700 hover:text-blue-900 font-medium transition">Academics</Link>
                        <Link href="/admissions" className="text-gray-700 hover:text-blue-900 font-medium transition">Admissions</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-900 font-medium transition">Contact</Link>
                        <Button variant="primary" size="sm">Apply Now</Button>
                    </div>

                    <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="lg:hidden bg-white border-t">
                    <div className="px-4 py-4 space-y-3">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700">Home</Link>
                        <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700">About</Link>
                        <Link href="/academics" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700">Academics</Link>
                        <Link href="/admissions" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700">Admissions</Link>
                        <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700">Contact</Link>
                        <Button variant="primary" size="md" className="w-full">Apply Now</Button>
                    </div>
                </div>
            )}
        </nav>
    )
}