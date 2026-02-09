// src/app/(admin)/admin/layout.tsx

'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useAuth } from '@/lib/hooks/useAuth'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    FileText,
    DollarSign,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Shield,
    GraduationCap,
    BookOpen,
    CalendarDays,
    MessageSquare,
    BarChart3,
    ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const { user, isLoading } = useAuth('ADMIN')

    // Body Scroll Lock for Mobile Sidebar
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [sidebarOpen])

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-4 border-ivs-blue border-t-transparent rounded-full shadow-lg shadow-ivs-blue/20"></div>
            </div>
        )
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Classes', href: '/admin/classes', icon: BookOpen },
        { name: 'Applications', href: '/admin/applications', icon: FileText },
        { name: 'Students', href: '/admin/students', icon: Users },
        { name: 'Attendance', href: '/admin/attendance', icon: CalendarDays },
        { name: 'Fee Management', href: '/admin/fees', icon: DollarSign },
        { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
        { name: 'Announcements', href: '/admin/announcements', icon: MessageSquare },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin'
        return pathname.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-[#FAFBFF] selection:bg-ivs-blue/10 selection:text-ivs-blue">
            {/* Enterprise Header */}
            <header className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-5">
                        {/* Mobile Menu Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2.5 rounded-2xl bg-slate-50 text-ivs-navy hover:bg-ivs-blue/5 hover:text-ivs-blue transition-all border border-slate-100"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>

                        {/* Premium Logo Section */}
                        <Link href="/admin" className="flex items-center gap-4 group">
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
                                <span className="text-lg font-black text-ivs-navy leading-none mb-1 tracking-tight">IVS Admin</span>
                                <span className="text-[10px] text-ivs-blue font-black uppercase tracking-[0.2em] leading-none">Enterprise Portal</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-3 rounded-2xl bg-white text-slate-400 hover:bg-slate-50 hover:text-ivs-blue transition-all border border-slate-100 shadow-sm group">
                            <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-[3px] border-white"></span>
                        </button>

                        <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block"></div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 p-1.5 pr-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-ivs-blue shadow-inner relative overflow-hidden">
                                <Shield className="w-4.5 h-4.5 relative z-10" />
                                <div className="absolute inset-0 bg-white/10 group-hover:translate-y-1 transition-transform" />
                            </div>
                            <div className="hidden sm:block text-right">
                                <div className="text-[13px] font-black text-ivs-navy leading-none mb-1">{user?.name || 'Admin'}</div>
                                <div className="text-[9px] text-ivs-blue font-black uppercase tracking-widest">{user?.role || 'Administrator'}</div>
                            </div>
                        </div>

                        {/* Exit Action */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100/30 shadow-sm shadow-red-500/5 group"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        </motion.button>
                    </div>
                </div>
            </header>

            <div className="flex min-h-screen relative pt-[77px]">
                {/* Advanced Mobile & Desktop Sidebar */}
                <aside className={`
                    fixed lg:sticky top-0 lg:top-[77px] left-0 bottom-0 w-[290px] bg-white border-r border-slate-100 z-50 
                    transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${sidebarOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="flex flex-col h-full lg:h-[calc(100vh-77px)] p-6 pt-24 lg:pt-6">
                        {/* Navigation Scrollable Area */}
                        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar -mx-2 px-2 scroll-smooth">
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
                                            <Icon className={`w-[18px] h-[18px] transition-all duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight flex-1">{item.name}</span>
                                        {active && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="w-1.5 h-1.5 bg-white rounded-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        {!active && (
                                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-ivs-blue" />
                                        )}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Sidebar Footer */}
                        <div className="mt-8 pt-6 border-t border-slate-50">
                            <div className="p-5 bg-blue-50/40 rounded-3xl border border-blue-100/50 mb-4 group hover:bg-blue-50 transition-colors">
                                <div className="text-[10px] font-black text-ivs-blue uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Shield className="w-3 h-3" />
                                    System Status
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                    <span className="text-[11px] font-bold text-slate-600">All Modules Active</span>
                                </div>
                            </div>

                            <button
                                onClick={() => signOut({ callbackUrl: '/login' })}
                                className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-50/50 transition-all font-black text-sm group border border-transparent hover:border-red-100/30"
                            >
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-all">
                                    <LogOut className="w-4 h-4" />
                                </div>
                                <span className="flex-1 text-left">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 min-h-screen">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="p-6 md:p-10 lg:p-14"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Sidebar Interaction Layer */}
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