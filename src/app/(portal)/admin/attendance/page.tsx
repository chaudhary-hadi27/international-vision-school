// src/app/(portal)/(admin)/admin/attendance/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
    Calendar,
    Users,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    Filter,
    Download,
    RefreshCcw,
    ChevronDown,
    Search,
    User,
    Check
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Student {
    id: string
    name: string
    rollNumber: string
    grade: string
    section: string
}

interface AttendanceRecord {
    id: string
    studentId: string
    date: string
    status: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'LATE'
    student: Student
}

const containerVars = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
}

const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
}

export default function AttendancePage() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedGrade, setSelectedGrade] = useState('all')
    const [selectedSection, setSelectedSection] = useState('all')
    const [students, setStudents] = useState<Student[]>([])
    const [attendance, setAttendance] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const grades = ['Playgroup', 'Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8']
    const sections = ['A', 'B', 'C']

    useEffect(() => {
        fetchStudents()
    }, [selectedGrade, selectedSection])

    useEffect(() => {
        fetchAttendance()
    }, [selectedDate, selectedGrade, selectedSection])

    const fetchStudents = async () => {
        try {
            const params = new URLSearchParams()
            if (selectedGrade !== 'all') params.append('grade', selectedGrade)
            if (selectedSection !== 'all') params.append('section', selectedSection)

            const response = await fetch(`/api/admin/students?${params}`)
            const data = await response.json()
            if (data.success) {
                setStudents(data.data)
            }
        } catch (error) {
            console.error('Error fetching students:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchAttendance = async () => {
        try {
            const params = new URLSearchParams({ date: selectedDate })
            if (selectedGrade !== 'all') params.append('grade', selectedGrade)
            if (selectedSection !== 'all') params.append('section', selectedSection)

            const response = await fetch(`/api/admin/attendance?${params}`)
            const data = await response.json()

            if (data.success) {
                const attendanceMap: Record<string, string> = {}
                data.data.forEach((record: AttendanceRecord) => {
                    attendanceMap[record.studentId] = record.status
                })
                setAttendance(attendanceMap)
            }
        } catch (error) {
            console.error('Error fetching attendance:', error)
        }
    }

    const markAttendance = async (studentId: string, status: string) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }))

        try {
            const response = await fetch('/api/admin/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId,
                    date: selectedDate,
                    status,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to mark attendance')
            }
        } catch (error) {
            console.error('Error marking attendance:', error)
        }
    }

    const markAllPresent = async () => {
        if (!confirm('Mark all active students as present for today?')) return

        setSaving(true)
        for (const student of students) {
            await markAttendance(student.id, 'PRESENT')
        }
        setSaving(false)
    }

    const exportAttendance = () => {
        const csv = [
            ['Roll No', 'Student Name', 'Grade', 'Section', 'Status'],
            ...students.map(student => [
                student.rollNumber,
                student.name,
                student.grade,
                student.section,
                attendance[student.id] || 'NOT_MARKED',
            ]),
        ]
            .map(row => row.join(','))
            .join('\n')

        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `attendance-${selectedDate}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    const getStatusStyles = (status?: string) => {
        switch (status) {
            case 'PRESENT': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
            case 'ABSENT': return 'bg-rose-50 text-rose-600 border-rose-100'
            case 'LEAVE': return 'bg-blue-50 text-blue-600 border-blue-100'
            case 'LATE': return 'bg-amber-50 text-amber-600 border-amber-100'
            default: return 'bg-slate-50 text-slate-400 border-slate-100'
        }
    }

    const stats = {
        total: students.length,
        present: Object.values(attendance).filter(s => s === 'PRESENT').length,
        absent: Object.values(attendance).filter(s => s === 'ABSENT').length,
        leave: Object.values(attendance).filter(s => s === 'LEAVE').length,
        percentage: students.length > 0
            ? Math.round((Object.values(attendance).filter(s => s === 'PRESENT').length / students.length) * 100)
            : 0
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-bold text-ivs-navy font-heading mb-2">Daily Attendance</h1>
                    <p className="text-slate-500 font-medium">Record and track student presence across the campus.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={exportAttendance}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-ivs-navy transition-all shadow-sm group"
                        title="Export CSV"
                    >
                        <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={markAllPresent}
                        disabled={saving || students.length === 0}
                        className="btn-premium py-4 px-8 flex items-center gap-3 group relative overflow-hidden disabled:opacity-50"
                    >
                        {saving ? (
                            <RefreshCcw className="w-5 h-5 animate-spin" />
                        ) : (
                            <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform text-ivs-gold" />
                        )}
                        <span className="relative z-10 font-bold">Mark All Present</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: "Total Students", value: stats.total, icon: Users, color: "text-ivs-blue", bg: "bg-blue-50" },
                    { label: "Present", value: stats.present, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Absent", value: stats.absent, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
                    { label: "Leave", value: stats.leave, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Rate", value: `${stats.percentage}%`, icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVars}
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full"
                    >
                        <div className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                            <stat.icon className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-ivs-navy tabular-nums tracking-tight">{stat.value}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none text-sm font-medium text-ivs-navy transition-all"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Grade</label>
                        <div className="relative">
                            <select
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none text-sm font-medium text-ivs-navy appearance-none cursor-pointer"
                            >
                                <option value="all">All Grades</option>
                                {grades.map(grade => (
                                    <option key={grade} value={grade}>{grade}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Section</label>
                        <div className="relative">
                            <select
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none text-sm font-medium text-ivs-navy appearance-none cursor-pointer"
                            >
                                <option value="all">All Sections</option>
                                {sections.map(section => (
                                    <option key={section} value={section}>Section {section}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex items-end">
                        <button
                            onClick={() => {
                                setSelectedGrade('all')
                                setSelectedSection('all')
                                setSelectedDate(new Date().toISOString().split('T')[0])
                            }}
                            className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-200 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-2 border-ivs-blue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={containerVars}
                                initial="hidden"
                                animate="visible"
                                className="divide-y divide-slate-100"
                            >
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-16 text-center text-slate-500">
                                            No students found
                                        </td>
                                    </tr>
                                ) : (
                                    students.map(student => (
                                        <motion.tr
                                            key={student.id}
                                            variants={itemVars}
                                            className="group hover:bg-slate-50/80 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-ivs-navy">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-ivs-navy">{student.name}</p>
                                                        <p className="text-xs text-slate-400 font-mono">#{student.rollNumber}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-700">{student.grade}</p>
                                                <p className="text-xs text-slate-400">Section {student.section}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(attendance[student.id])}`}>
                                                    {attendance[student.id] || 'Not Marked'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    {[
                                                        { id: 'PRESENT', color: 'bg-emerald-500', hover: 'hover:bg-emerald-600', icon: Check, title: 'Present' },
                                                        { id: 'ABSENT', color: 'bg-rose-500', hover: 'hover:bg-rose-600', icon: XCircle, title: 'Absent' },
                                                        { id: 'LEAVE', color: 'bg-blue-500', hover: 'hover:bg-blue-600', icon: AlertCircle, title: 'Leave' },
                                                        { id: 'LATE', color: 'bg-amber-500', hover: 'hover:bg-amber-600', icon: Clock, title: 'Late' }
                                                    ].map(action => (
                                                        <button
                                                            key={action.id}
                                                            onClick={() => markAttendance(student.id, action.id)}
                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${attendance[student.id] === action.id
                                                                    ? `${action.color} text-white shadow-md scale-105`
                                                                    : `bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600`
                                                                }`}
                                                            title={action.title}
                                                        >
                                                            <action.icon className="w-4 h-4" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </motion.tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.div>
    )
}