// src/app/(portal)/(admin)/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
    Users,
    FileText,
    DollarSign,
    TrendingUp,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronRight,
    MoreVertical
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DashboardStats {
    totalStudents: number
    activeStudents: number
    totalApplications: number
    pendingApplications: number
    totalFeeAmount: number
    collectedFees: number
    pendingFees: number
    attendanceToday: {
        total: number
        present: number
        percentage: number
    }
}

interface RecentApplication {
    id: string
    applicationId: string
    studentName: string
    grade: string
    status: string
    createdAt: string
}

const containerVars = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const [studentsRes, applicationsRes, feesRes, attendanceRes] = await Promise.all([
                fetch('/api/admin/students'),
                fetch('/api/admin/applications'),
                fetch('/api/admin/fees'),
                fetch('/api/admin/attendance?date=' + new Date().toISOString().split('T')[0])
            ])

            const [studentsData, applicationsData, feesData, attendanceData] = await Promise.all([
                studentsRes.json(),
                applicationsRes.json(),
                feesRes.json(),
                attendanceRes.json()
            ])

            const students = studentsData.success ? studentsData.data : []
            const applications = applicationsData.success ? applicationsData.data : []
            const fees = feesData.success ? feesData.data : []
            const attendance = attendanceData.success ? attendanceData.data : []

            const activeStudents = students.filter((s: any) => s.status === 'ACTIVE').length
            const pendingApplications = applications.filter((a: any) =>
                a.status === 'pending' || a.status === 'PENDING'
            ).length

            const totalFeeAmount = fees.reduce((sum: number, f: any) => sum + Number(f.amount), 0)
            const collectedFees = fees.reduce((sum: number, f: any) => sum + Number(f.paidAmount), 0)

            const totalAttendance = attendance.length
            const presentCount = attendance.filter((a: any) => a.status === 'PRESENT').length

            setStats({
                totalStudents: students.length,
                activeStudents,
                totalApplications: applications.length,
                pendingApplications,
                totalFeeAmount,
                collectedFees,
                pendingFees: totalFeeAmount - collectedFees,
                attendanceToday: {
                    total: totalAttendance,
                    present: presentCount,
                    percentage: totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0
                }
            })

            setRecentApplications(applications.slice(0, 5))

        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100'
            case 'under_review': return 'bg-blue-50 text-blue-600 border-blue-100'
            case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100'
            default: return 'bg-slate-50 text-slate-600 border-slate-100'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved': return <CheckCircle2 className="w-3.5 h-3.5" />
            case 'pending': return <Clock className="w-3.5 h-3.5" />
            case 'under_review': return <AlertCircle className="w-3.5 h-3.5" />
            case 'rejected': return <XCircle className="w-3.5 h-3.5" />
            default: return null
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-ivs-blue/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-ivs-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Dashboard Data</p>
            </div>
        )
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVars}
            className="space-y-10"
        >
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-ivs-navy font-heading mb-2">Internal Dashboard</h1>
                    <p className="text-slate-500 font-medium">Monitoring International Vision School's operations and metrics.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-ivs-blue/5 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-ivs-blue" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Current Date</p>
                        <p className="text-sm font-bold text-ivs-navy">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div variants={itemVars}>
                        <Link href="/admin/students" className="premium-card group block p-6 h-full border border-slate-200 hover:border-ivs-blue/30 relative overflow-hidden">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-blue-50 text-ivs-blue rounded-xl group-hover:bg-ivs-blue group-hover:text-white transition-colors duration-300">
                                    <Users className="w-6 h-6" />
                                </div>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                    <ArrowUpRight className="w-3 h-3" />
                                    Active
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-ivs-navy tabular-nums tracking-tight">{stats.totalStudents}</p>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Total Students</p>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVars}>
                        <Link href="/admin/applications" className="premium-card group block p-6 h-full border border-slate-200 hover:border-ivs-blue/30 relative overflow-hidden">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                                    <AlertCircle className="w-3 h-3" />
                                    Pending
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-ivs-navy tabular-nums tracking-tight">{stats.totalApplications}</p>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Applications</p>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVars}>
                        <Link href="/admin/fees" className="premium-card group block p-6 h-full border border-slate-200 hover:border-ivs-blue/30 relative overflow-hidden">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-violet-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                                    Collection
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-ivs-navy tabular-nums tracking-tight">
                                    {stats.totalFeeAmount > 0 ? Math.round((stats.collectedFees / stats.totalFeeAmount) * 100) : 0}%
                                </p>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Fee Recovery</p>
                            </div>
                            <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stats.totalFeeAmount > 0 ? (stats.collectedFees / stats.totalFeeAmount) * 100 : 0}%` }}
                                    className="h-full bg-violet-500 rounded-full"
                                />
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVars}>
                        <Link href="/admin/attendance" className="premium-card group block p-6 h-full border border-slate-200 hover:border-ivs-blue/30 relative overflow-hidden">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-ivs-blue group-hover:text-white transition-colors duration-300">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${stats.attendanceToday.percentage >= 90 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                                    {stats.attendanceToday.percentage >= 90 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    Today
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-ivs-navy tabular-nums tracking-tight">{stats.attendanceToday.percentage}%</p>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Attendance</p>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Recent Applications */}
                <motion.div variants={itemVars} className="lg:col-span-2">
                    <div className="premium-card rounded-2xl p-8 h-full border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-ivs-navy font-heading">Recent Applications</h2>
                            </div>
                            <Link href="/admin/applications" className="text-sm font-bold text-ivs-blue hover:text-blue-700 transition-colors flex items-center gap-1">
                                View All
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentApplications.length === 0 ? (
                                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <p className="text-slate-500 font-medium">No recent applications</p>
                                </div>
                            ) : (
                                recentApplications.map((app, idx) => (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group p-4 bg-white border border-slate-100 hover:border-ivs-blue/20 hover:shadow-md rounded-xl transition-all duration-200 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-ivs-navy text-sm">
                                                {app.studentName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-ivs-navy text-sm">{app.studentName}</p>
                                                <p className="text-xs text-slate-500">{app.grade} • {app.applicationId}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyles(app.status)}`}>
                                                {app.status?.replace('_', ' ')}
                                            </span>
                                            <Link href={`/admin/applications/${app.applicationId}`} className="p-2 text-slate-400 hover:text-ivs-blue hover:bg-blue-50 rounded-lg transition-all">
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats & Actions */}
                <motion.div variants={itemVars} className="space-y-6">
                    <div className="premium-card rounded-[2.5rem] p-8 border border-slate-100">
                        <h2 className="text-xl font-bold text-ivs-navy font-heading mb-6 flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-ivs-blue" />
                            Financial Health
                        </h2>

                        {stats && (
                            <div className="space-y-4">
                                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-3xl group">
                                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Total Expected</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold text-ivs-navy tabular-nums">Rs. {stats.totalFeeAmount.toLocaleString()}</p>
                                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-400">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-3xl group">
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Already Collected</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold text-emerald-600 tabular-nums">Rs. {stats.collectedFees.toLocaleString()}</p>
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-rose-50/50 border border-rose-100 rounded-3xl group">
                                    <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-1">Pending Balance</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold text-rose-600 tabular-nums">Rs. {stats.pendingFees.toLocaleString()}</p>
                                        <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400">
                                            <AlertCircle className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="premium-card rounded-[2.5rem] p-8 border border-slate-100">
                        <h2 className="text-xl font-bold text-ivs-navy font-heading mb-6 flex items-center gap-3">
                            <MoreVertical className="w-5 h-5 text-ivs-blue" />
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/admin/students" className="p-4 bg-white border border-slate-100 hover:bg-ivs-blue hover:text-white rounded-2xl transition-all duration-300 group text-center hover:border-ivs-blue hover:shadow-lg hover:shadow-ivs-blue/20">
                                <Users className="w-6 h-6 mx-auto mb-2 text-ivs-navy group-hover:text-white transition-colors" />
                                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Students</span>
                            </Link>
                            <Link href="/admin/attendance" className="p-4 bg-white border border-slate-100 hover:bg-ivs-blue hover:text-white rounded-2xl transition-all duration-300 group text-center hover:border-ivs-blue hover:shadow-lg hover:shadow-ivs-blue/20">
                                <Calendar className="w-6 h-6 mx-auto mb-2 text-ivs-navy group-hover:text-white transition-colors" />
                                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Attendance</span>
                            </Link>
                            <Link href="/admin/reports" className="p-4 bg-white border border-slate-100 hover:bg-ivs-blue hover:text-white rounded-2xl transition-all duration-300 group text-center hover:border-ivs-blue hover:shadow-lg hover:shadow-ivs-blue/20">
                                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-ivs-navy group-hover:text-white transition-colors" />
                                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Analytics</span>
                            </Link>
                            <button className="p-4 bg-white border border-slate-100 hover:bg-ivs-blue hover:text-white rounded-2xl transition-all duration-300 group text-center hover:border-ivs-blue hover:shadow-lg hover:shadow-ivs-blue/20">
                                <Search className="w-6 h-6 mx-auto mb-2 text-ivs-navy group-hover:text-white transition-colors" />
                                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Search</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}