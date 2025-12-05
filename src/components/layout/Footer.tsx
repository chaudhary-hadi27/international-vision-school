import Link from 'next/link'
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'
import { SCHOOL_INFO, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12">

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="w-8 h-8 text-blue-400" />
                            <div>
                                <div className="text-xl font-bold">{SCHOOL_INFO.shortName}</div>
                                <div className="text-xs text-gray-400">{SCHOOL_INFO.name}</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{SCHOOL_INFO.tagline}</p>
                        <div className="flex gap-3">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                            <li><Link href="/academics" className="text-gray-400 hover:text-white transition">Academics</Link></li>
                            <li><Link href="/admissions" className="text-gray-400 hover:text-white transition">Admissions</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Programs</h3>
                        <ul className="space-y-2 text-sm">
                            <li> <Link href="/academics/playgroup" className="text-gray-400 hover:text-white"> Playgroup </Link> </li>
                            <li> <Link href="/academics/nursery-kg" className="text-gray-400 hover:text-white"> Nursery-Kg </Link> </li>
                            <li> <Link href="/academics/primary" className="text-gray-400 hover:text-white"> Primary </Link> </li>
                            <li> <Link href="/academics/middle" className="text-gray-400 hover:text-white"> Middle </Link> </li>
                            <li> <Link href="/academics/secondary" className="text-gray-400 hover:text-white"> Secondary </Link> </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-1 text-blue-400" />
                                <span className="text-gray-400">{SCHOOL_INFO.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <a href={`tel:${SCHOOL_INFO.phone}`} className="text-gray-400 hover:text-white">
                                    {SCHOOL_INFO.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <a href={`mailto:${SCHOOL_INFO.email}`} className="text-gray-400 hover:text-white">
                                    {SCHOOL_INFO.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}