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
    ArrowDownRight
} from 'lucide-react'
import Link from 'next/link'

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

interface PendingTask {
    task: string
    priority: 'high' | 'medium' | 'low'
    count: number
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
            // Fetch all data in parallel
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

            // Calculate stats
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

            // Get recent 5 applications
            setRecentApplications(applications.slice(0, 5))

        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch(status?.toLowerCase()) {
            case 'approved': return 'bg-green-100 text-green-700'
            case 'pending': return 'bg-amber-100 text-amber-700'
            case 'under_review': return 'bg-blue-100 text-blue-700'
            case 'rejected': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getStatusIcon = (status: string) => {
        switch(status?.toLowerCase()) {
            case 'approved': return <CheckCircle2 className="w-4 h-4" />
            case 'pending': return <Clock className="w-4 h-4" />
            case 'under_review': return <AlertCircle className="w-4 h-4" />
            case 'rejected': return <XCircle className="w-4 h-4" />
            default: return null
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-lg font-semibold text-gray-900">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            {stats && (
                <div className="grid md:grid-cols-4 gap-6">
                    <Link href="/admin/students" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                                <Users className="w-6 h-6" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-gray-600 text-sm mb-1">Total Students</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalStudents}</p>
                        <p className="text-sm font-semibold text-green-600">
                            {stats.activeStudents} active
                        </p>
                    </Link>

                    <Link href="/admin/applications" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                                <FileText className="w-6 h-6" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-gray-600 text-sm mb-1">Applications</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalApplications}</p>
                        <p className="text-sm font-semibold text-amber-600">
                            {stats.pendingApplications} pending
                        </p>
                    </Link>

                    <Link href="/admin/fees" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-gray-600 text-sm mb-1">Fee Collection</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            Rs. {(stats.collectedFees / 1000).toFixed(0)}K
                        </p>
                        <p className="text-sm font-semibold text-green-600">
                            {stats.totalFeeAmount > 0
                                ? Math.round((stats.collectedFees / stats.totalFeeAmount) * 100)
                                : 0}% collected
                        </p>
                    </Link>

                    <Link href="/admin/attendance" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                                <Calendar className="w-6 h-6" />
                            </div>
                            {stats.attendanceToday.percentage >= 90 ? (
                                <ArrowUpRight className="w-5 h-5 text-green-600" />
                            ) : (
                                <ArrowDownRight className="w-5 h-5 text-red-600" />
                            )}
                        </div>
                        <h3 className="text-gray-600 text-sm mb-1">Attendance Today</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.attendanceToday.percentage}%</p>
                        <p className="text-sm font-semibold text-gray-600">
                            {stats.attendanceToday.present} / {stats.attendanceToday.total} present
                        </p>
                    </Link>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Applications */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                        <Link href="/admin/applications" className="text-blue-900 font-semibold hover:underline text-sm">
                            View All
                        </Link>
                    </div>

                    {recentApplications.length === 0 ? (
                        <div className="text-center py-8">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600">No recent applications</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentApplications.map((app) => (
                                <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <p className="font-semibold text-gray-900">{app.studentName}</p>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                                                {app.status?.replace('_', ' ')}
                      </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{app.grade} • {app.applicationId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </p>
                                        <Link
                                            href={`/admin/applications/${app.applicationId}`}
                                            className="text-xs text-blue-900 hover:underline font-semibold"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>

                    {stats && (
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-blue-900">
                                    Rs. {stats.totalFeeAmount.toLocaleString()}
                                </p>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Collected</p>
                                <p className="text-2xl font-bold text-green-600">
                                    Rs. {stats.collectedFees.toLocaleString()}
                                </p>
                            </div>

                            <div className="p-4 bg-amber-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Pending</p>
                                <p className="text-2xl font-bold text-amber-600">
                                    Rs. {stats.pendingFees.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                        href="/admin/applications"
                        className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-center group"
                    >
                        <FileText className="w-8 h-8 text-blue-900 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900 text-sm">View Applications</span>
                    </Link>

                    <Link
                        href="/admin/students"
                        className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition text-center group"
                    >
                        <Users className="w-8 h-8 text-green-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900 text-sm">Manage Students</span>
                    </Link>

                    <Link
                        href="/admin/attendance"
                        className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-center group"
                    >
                        <Calendar className="w-8 h-8 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900 text-sm">Mark Attendance</span>
                    </Link>

                    <Link
                        href="/admin/announcements"
                        className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition text-center group"
                    >
                        <TrendingUp className="w-8 h-8 text-amber-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900 text-sm">New Announcement</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}