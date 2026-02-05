// src/app/(portal)/parent-portal/attendance/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Calendar, CheckCircle2, XCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react'

interface Child {
    id: string
    name: string
    rollNumber: string
    grade: string
    section: string
}

interface AttendanceRecord {
    id: string
    date: string
    status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'LATE'
    remarks: string | null
}

interface AttendanceStats {
    total: number
    present: number
    absent: number
    leave: number
    percentage: number
}

export default function ParentAttendancePage() {
    const [children, setChildren] = useState<Child[]>([])
    const [selectedChild, setSelectedChild] = useState<Child | null>(null)
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
    const [stats, setStats] = useState<AttendanceStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    useEffect(() => {
        fetchChildren()
    }, [])

    useEffect(() => {
        if (selectedChild) {
            fetchAttendance(selectedChild.id)
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
                setAttendance(data.data.attendance)
                setStats(data.data.stats)
            }
        } catch (error) {
            console.error('Error fetching attendance:', error)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PRESENT': return 'bg-green-100 text-green-700 border-green-300'
            case 'ABSENT': return 'bg-red-100 text-red-700 border-red-300'
            case 'LEAVE': return 'bg-blue-100 text-blue-700 border-blue-300'
            case 'LATE': return 'bg-amber-100 text-amber-700 border-amber-300'
            default: return 'bg-gray-100 text-gray-700 border-gray-300'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PRESENT': return <CheckCircle2 className="w-5 h-5" />
            case 'ABSENT': return <XCircle className="w-5 h-5" />
            case 'LEAVE': return <AlertCircle className="w-5 h-5" />
            case 'LATE': return <Clock className="w-5 h-5" />
            default: return null
        }
    }

    // Group attendance by month
    const attendanceByMonth = attendance.reduce((acc, record) => {
        const date = new Date(record.date)
        const monthYear = `${date.getFullYear()}-${date.getMonth()}`
        if (!acc[monthYear]) acc[monthYear] = []
        acc[monthYear].push(record)
        return acc
    }, {} as Record<string, AttendanceRecord[]>)

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-ivs-navy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading attendance...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Attendance Record</h1>
                <p className="text-gray-600 mt-1">View your child's attendance history</p>
            </div>

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

            {/* Stats Cards */}
            {stats && (
                <div className="grid md:grid-cols-5 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-600 text-sm">Total Days</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-gray-600 text-sm">Present</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{stats.present}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="text-gray-600 text-sm">Absent</span>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-600 text-sm">Leave</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{stats.leave}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                            <span className="text-gray-600 text-sm">Percentage</span>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{stats.percentage}%</p>
                    </div>
                </div>
            )}

            {/* Attendance Records */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Attendance History (Last 30 Days)</h2>
                </div>

                {attendance.length === 0 ? (
                    <div className="p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No attendance records found</p>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="space-y-3">
                            {attendance.map(record => (
                                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white rounded-lg flex flex-col items-center justify-center shadow-sm">
                      <span className="text-xs text-gray-600">
                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                                            <span className="text-2xl font-bold text-gray-900">
                        {new Date(record.date).getDate()}
                      </span>
                                            <span className="text-xs text-gray-600">
                        {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric' })}
                      </span>
                                        </div>

                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(record.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            {record.remarks && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    <span className="font-semibold">Note:</span> {record.remarks}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getStatusColor(record.status)}`}>
                                        {getStatusIcon(record.status)}
                                        {record.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Monthly Summary */}
            {stats && stats.total > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Summary</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
                                <p className="text-2xl font-bold text-green-600">{stats.percentage}%</p>
                            </div>
                            <div className="w-24 h-24">
                                <svg className="transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="3"
                                        strokeDasharray={`${stats.percentage}, 100`}
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Working Days</p>
                                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Days Present</p>
                                <p className="text-xl font-bold text-green-600">{stats.present}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Days Absent</p>
                                <p className="text-xl font-bold text-red-600">{stats.absent + stats.leave}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}