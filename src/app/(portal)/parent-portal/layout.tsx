// src/app/(portal)/parent-portal/layout.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    Clock
} from 'lucide-react'

export default function ParentPortalLayout({
                                               children,
                                           }: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

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
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center justify-between px-4 py-4">

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-ivs-navy to-blue-700 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-lg font-bold text-gray-900">IVS Portal</div>
                            <div className="text-xs text-gray-600 -mt-1">Parent Dashboard</div>
                        </div>
                    </Link>

                    {/* User Menu */}
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-lg hover:bg-gray-100">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-ivs-navy" />
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-sm font-semibold text-gray-900">Parent Name</div>
                                <div className="text-xs text-gray-600">View Profile</div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            {/* Sidebar */}
            <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white shadow-xl z-40 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
                <div className="flex flex-col h-full">

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.href)

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${active
                                        ? 'bg-ivs-navy text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t">
                        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>

                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="pt-16 lg:pl-64">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>

        </div>
    )
}