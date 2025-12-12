// src/app/(portal)/(admin)/admin/attendance/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, CheckCircle2, XCircle, Clock, AlertCircle, Filter, Download } from 'lucide-react'

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
            alert('Failed to mark attendance')
        }
    }

    const markAllPresent = async () => {
        if (!confirm('Mark all students as present?')) return

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

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'PRESENT': return 'bg-green-100 text-green-700 border-green-300'
            case 'ABSENT': return 'bg-red-100 text-red-700 border-red-300'
            case 'LEAVE': return 'bg-blue-100 text-blue-700 border-blue-300'
            case 'LATE': return 'bg-amber-100 text-amber-700 border-amber-300'
            default: return 'bg-gray-100 text-gray-700 border-gray-300'
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
                    <p className="text-gray-600 mt-1">Mark and track student attendance</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={exportAttendance}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Export
                    </button>
                    <button
                        onClick={markAllPresent}
                        disabled={saving}
                        className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        Mark All Present
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-5 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-blue-900" />
                        <span className="text-gray-600 text-sm">Total</span>
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
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600 text-sm">Rate</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">{stats.percentage}%</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="grid md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Grade</label>
                        <select
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                        >
                            <option value="all">All Grades</option>
                            {grades.map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Section</label>
                        <select
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                        >
                            <option value="all">All Sections</option>
                            {sections.map(section => (
                                <option key={section} value={section}>Section {section}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSelectedGrade('all')
                                setSelectedSection('all')
                                setSelectedDate(new Date().toISOString().split('T')[0])
                            }}
                            className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Loading students...</p>
                    </div>
                ) : students.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No students found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Roll No</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student Name</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Grade</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Section</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {students.map(student => (
                                <tr key={student.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-blue-900">
                        {student.rollNumber}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-gray-900">{student.name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
                        {student.grade}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-sm font-semibold">
                        {student.section}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(attendance[student.id])}`}>
                        {attendance[student.id] || 'Not Marked'}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => markAttendance(student.id, 'PRESENT')}
                                                className={`p-2 rounded-lg transition ${
                                                    attendance[student.id] === 'PRESENT'
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                                title="Present"
                                            >
                                                <CheckCircle2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => markAttendance(student.id, 'ABSENT')}
                                                className={`p-2 rounded-lg transition ${
                                                    attendance[student.id] === 'ABSENT'
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                                title="Absent"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => markAttendance(student.id, 'LEAVE')}
                                                className={`p-2 rounded-lg transition ${
                                                    attendance[student.id] === 'LEAVE'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                }`}
                                                title="Leave"
                                            >
                                                <AlertCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => markAttendance(student.id, 'LATE')}
                                                className={`p-2 rounded-lg transition ${
                                                    attendance[student.id] === 'LATE'
                                                        ? 'bg-amber-600 text-white'
                                                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                                }`}
                                                title="Late"
                                            >
                                                <Clock className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}