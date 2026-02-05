// src/app/(admin)/admin/layout.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    CalendarDays,
    MessageSquare,
    BarChart3
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Applications', href: '/admin/applications', icon: FileText },
        { name: 'Students', href: '/admin/students', icon: Users },
        { name: 'Attendance', href: '/admin/attendance', icon: CalendarDays },
        { name: 'Fee Management', href: '/admin/fees', icon: DollarSign },
        { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
        { name: 'Announcements', href: '/admin/announcements', icon: MessageSquare },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin'
        }
        return pathname.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-ivs-surface">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-xl bg-slate-100 text-ivs-navy hover:bg-slate-200 transition-colors"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        {/* Logo */}
                        <Link href="/admin" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-ivs-navy rounded-xl flex items-center justify-center text-white shadow-lg shadow-ivs-navy/20 group-hover:scale-105 transition-transform">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-lg font-bold text-ivs-navy font-heading leading-tight">IVS Admin</div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Management Portal</div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Right Menu */}
                    <div className="flex items-center gap-3">
                        <button className="relative p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-ivs-blue/5 hover:text-ivs-blue transition-all border border-transparent hover:border-ivs-blue/10">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

                        <div className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="hidden sm:block text-right">
                                <div className="text-sm font-bold text-ivs-navy leading-none">Admin User</div>
                                <div className="text-[10px] text-ivs-blue font-bold uppercase tracking-tighter mt-1">Super Administrator</div>
                            </div>
                            <div className="w-9 h-9 bg-gradient-to-br from-ivs-blue to-ivs-navy rounded-xl flex items-center justify-center shadow-lg shadow-ivs-blue/20">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    fixed lg:sticky top-[73px] left-0 bottom-0 w-72 bg-white/50 backdrop-blur-sm border-r border-slate-200/50 z-40 
                    transform lg:transform-none transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex flex-col h-[calc(100vh-73px)] p-6">
                        <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-2">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.href)

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`
                                            flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group
                                            ${active
                                                ? 'bg-ivs-navy text-white shadow-lg shadow-ivs-navy/20'
                                                : 'text-slate-500 hover:bg-white hover:text-ivs-navy hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-ivs-gold' : ''}`} />
                                        <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                        {active && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute left-0 w-1 y-full bg-ivs-gold rounded-r-full"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="pt-6 mt-6 border-t border-slate-100">
                            <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm group">
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 min-h-screen pt-[73px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="p-6 lg:p-10"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-ivs-navy/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    )
}