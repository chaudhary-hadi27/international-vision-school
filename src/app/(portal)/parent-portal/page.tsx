// src/app/(portal)/parent-portal/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { User, Calendar, TrendingUp, DollarSign, CheckCircle2, XCircle, Clock, Award, Bell, Users } from 'lucide-react'
import Link from 'next/link'

interface Child {
    id: string
    name: string
    rollNumber: string
    grade: string
    section: string
    photoUrl: string | null
}

interface AttendanceStats {
    total: number
    present: number
    absent: number
    leave: number
    percentage: number
}

interface FeesSummary {
    totalAmount: number
    totalPaid: number
    totalDue: number
    unpaidCount: number
}

interface Announcement {
    id: string
    title: string
    content: string
    type: string
    priority: string
    publishDate: string
}

export default function ParentPortalDashboard() {
    const [children, setChildren] = useState<Child[]>([])
    const [selectedChild, setSelectedChild] = useState<Child | null>(null)
    const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null)
    const [feesSummary, setFeesSummary] = useState<FeesSummary | null>(null)
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchChildren()
    }, [])

    useEffect(() => {
        if (selectedChild) {
            fetchAttendance(selectedChild.id)
            fetchFees(selectedChild.id)
            fetchAnnouncements(selectedChild.id)
        }
    }, [selectedChild])

    const fetchChildren = async () => {
        try {
            const response = await fetch('/api/parent/children')
            const data = await response.json()

            if (data.success && data.data.length > 0) {
                setChildren(data.data)
                setSelectedChild(data.data[0])
            }
        } catch (error) {
            console.error('Error fetching children:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchAttendance = async (studentId: string) => {
        try {
            const response = await fetch(`/api/parent/attendance/${studentId}`)
            const data = await response.json()

            if (data.success) {
                setAttendanceStats(data.data.stats)
            }
        } catch (error) {
            console.error('Error fetching attendance:', error)
        }
    }

    const fetchFees = async (studentId: string) => {
        try {
            const response = await fetch(`/api/parent/fees/${studentId}`)
            const data = await response.json()

            if (data.success) {
                setFeesSummary(data.data.summary)
            }
        } catch (error) {
            console.error('Error fetching fees:', error)
        }
    }

    const fetchAnnouncements = async (studentId: string) => {
        try {
            const response = await fetch(`/api/parent/announcements?studentId=${studentId}`)
            const data = await response.json()

            if (data.success) {
                setAnnouncements(data.data.slice(0, 5))
            }
        } catch (error) {
            console.error('Error fetching announcements:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-ivs-navy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading portal...</p>
                </div>
            </div>
        )
    }

    if (children.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center max-w-md">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Children Found</h2>
                    <p className="text-gray-600 mb-6">Please contact the school administration to link your children to your account.</p>
                    <Link
                        href="/contact"
                        className="inline-block px-6 py-3 bg-ivs-navy text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        Contact School
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Child Selector */}
            {children.length > 1 && (
                <div className="bg-white rounded-xl shadow-md p-4">
                    <label className="block text-gray-700 font-semibold mb-2">Select Child</label>
                    <div className="flex flex-wrap gap-3">
                        {children.map(child => (
                            <button
                                key={child.id}
                                onClick={() => setSelectedChild(child)}
                                className={`px-6 py-3 rounded-lg font-semibold transition ${
                                    selectedChild?.id === child.id
                                        ? 'bg-ivs-navy text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {child.name} ({child.grade})
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Header Card */}
            {selectedChild && (
                <div className="bg-gradient-to-r from-ivs-navy to-blue-700 rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                {selectedChild.photoUrl ? (
                                    <img src={selectedChild.photoUrl} alt={selectedChild.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-1">{selectedChild.name}</h1>
                                <p className="text-blue-100">{selectedChild.grade} - Section {selectedChild.section}</p>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-sm text-blue-200 mb-1">Roll Number</p>
                            <p className="text-2xl font-bold">{selectedChild.rollNumber}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-ivs-navy" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Attendance</h3>
                    <p className="text-3xl font-bold text-gray-900">{attendanceStats?.percentage || 0}%</p>
                    <p className="text-sm text-green-600 font-semibold mt-1">
                        {attendanceStats?.present || 0} / {attendanceStats?.total || 0} days
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-700" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Overall Grade</h3>
                    <p className="text-3xl font-bold text-gray-900">A</p>
                    <p className="text-sm text-gray-500 font-semibold mt-1">Excellent</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-purple-700" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Fee Status</h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {feesSummary && feesSummary.totalDue > 0 ? 'Due' : 'Paid'}
                    </p>
                    <p className="text-sm text-amber-600 font-semibold mt-1">
                        Rs. {feesSummary?.totalDue.toLocaleString() || 0}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Bell className="w-6 h-6 text-amber-700" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Announcements</h3>
                    <p className="text-3xl font-bold text-gray-900">{announcements.length}</p>
                    <p className="text-sm text-gray-500 font-semibold mt-1">New updates</p>
                </div>
            </div>

            {/* Recent Attendance & Announcements */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Attendance */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Attendance</h2>
                        <Link href="/parent-portal/attendance" className="text-ivs-navy font-semibold hover:underline text-sm">
                            View All
                        </Link>
                    </div>

                    {attendanceStats && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-gray-900">Present Days</span>
                                </div>
                                <span className="text-2xl font-bold text-green-600">{attendanceStats.present}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">

                                <div className="flex items-center gap-3"> <XCircle className="w-5 h-5 text-red-600" /> <span className="font-semibold text-gray-900">Absent Days</span> </div> <span className="text-2xl font-bold text-red-600">{attendanceStats.absent}</span> </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold text-gray-900">Leave Days</span>
                                </div>
                                <span className="text-2xl font-bold text-blue-600">{attendanceStats.leave}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Announcements */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
                        <Link href="/parent-portal/announcements" className="text-ivs-navy font-semibold hover:underline text-sm">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {announcements.length === 0 ? (
                            <div className="text-center py-8">
                                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">No announcements</p>
                            </div>
                        ) : (
                            announcements.map(announcement => (
                                <div key={announcement.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 flex-1">{announcement.title}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            announcement.priority === 'URGENT' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                  {announcement.type}
                </span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{announcement.content}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(announcement.publishDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <Link
                        href="/parent-portal/attendance"
                        className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-center group"
                    >
                        <Calendar className="w-8 h-8 text-ivs-navy mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">View Attendance</span>
                    </Link>

                    <Link
                        href="/parent-portal/fees"
                        className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition text-center group"
                    >
                        <DollarSign className="w-8 h-8 text-green-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">Fee Status</span>
                    </Link>

                    <Link
                        href="/parent-portal/results"
                        className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-center group"
                    >
                        <Award className="w-8 h-8 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">View Results</span>
                    </Link>

                    <Link
                        href="/parent-portal/announcements"
                        className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition text-center group"
                    >
                        <Bell className="w-8 h-8 text-amber-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">Announcements</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

