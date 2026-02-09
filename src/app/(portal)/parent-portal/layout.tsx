// src/app/(portal)/parent-portal/layout.tsx

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    GraduationCap,
    LayoutDashboard,
    Calendar,
    FileText,
    DollarSign,
    Bell,
    User,
    LogOut,
    Menu,
    X,
    Clock,
    ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ParentPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    // Body Scroll Lock for Mobile Sidebar
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [sidebarOpen])

    const navigation = [
        { name: 'Dashboard', href: '/parent-portal', icon: LayoutDashboard },
        { name: 'Attendance', href: '/parent-portal/attendance', icon: Calendar },
        { name: 'Results', href: '/parent-portal/results', icon: FileText },
        { name: 'Fee Status', href: '/parent-portal/fees', icon: DollarSign },
        { name: 'Timetable', href: '/parent-portal/timetable', icon: Clock },
        { name: 'Announcements', href: '/parent-portal/announcements', icon: Bell },
    ]

    const isActive = (href: string) => pathname === href

    return (
        <div className="min-h-screen bg-[#FAFBFF] selection:bg-ivs-blue/10 selection:text-ivs-blue">
            {/* Premium Header */}
            <header className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-5">
                        {/* Mobile Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2.5 rounded-2xl bg-slate-50 text-ivs-navy hover:bg-ivs-blue/5 hover:text-ivs-blue transition-all border border-slate-100"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-4 group">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -3 }}
                                className="relative w-13 h-13 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-ivs-blue/10 p-1 overflow-hidden"
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
                                <span className="text-lg font-black text-ivs-navy leading-none mb-tracking-tight mb-0.5">IVS Portal</span>
                                <span className="text-[10px] text-ivs-blue font-black uppercase tracking-[0.2em] leading-none">Parent Dashboard</span>
                            </div>
                        </Link>
                    </div>

                    {/* Quick Profile/Nav Actions */}
                    <div className="flex items-center gap-4">
                        <button className="relative p-3 rounded-2xl bg-white text-slate-400 hover:bg-slate-50 hover:text-ivs-blue transition-all border border-slate-100 shadow-sm group">
                            <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-[3px] border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 p-1.5 pr-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="w-9 h-9 bg-blue-50/50 rounded-xl flex items-center justify-center text-ivs-blue shadow-inner">
                                <User className="w-4.5 h-4.5" />
                            </div>
                            <div className="hidden sm:block text-right">
                                <div className="text-[13px] font-black text-ivs-navy leading-none mb-1">Parent Name</div>
                                <div className="text-[9px] text-ivs-blue font-black uppercase tracking-widest leading-none">View Profile</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex min-h-screen pt-[77px]">
                {/* Advanced Multi-State Sidebar */}
                <aside className={`
                    fixed lg:sticky top-0 lg:top-[77px] left-0 bottom-0 w-[280px] bg-white border-r border-slate-100 z-50 
                    transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${sidebarOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="flex flex-col h-full lg:h-[calc(100vh-77px)] p-6 pt-24 lg:pt-6">
                        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar -mx-2 px-2">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.href)

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`
                                            flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group
                                            ${active
                                                ? 'bg-ivs-blue text-white shadow-xl shadow-ivs-blue/20'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-ivs-navy border border-transparent hover:border-slate-100'
                                            }
                                        `}
                                    >
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-white/15' : 'bg-slate-50 group-hover:bg-ivs-blue/10 group-hover:text-ivs-blue'}`}>
                                            <Icon className={`w-[18px] h-[18px] ${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight flex-1">{item.name}</span>
                                        {!active && (
                                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-ivs-blue" />
                                        )}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="mt-8 pt-6 border-t border-slate-50">
                            <button className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-50/50 transition-all font-black text-sm group border border-transparent hover:border-red-100/30">
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-all">
                                    <LogOut className="w-4 h-4" />
                                </div>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.01 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="p-6 md:p-10"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Sidebar Interactions */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-ivs-navy/20 backdrop-blur-md z-[45] lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94A3B8;
                }
            `}</style>
        </div>
    )
}