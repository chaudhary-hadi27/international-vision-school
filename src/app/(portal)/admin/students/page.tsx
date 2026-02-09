// src/app/(portal)/admin/students/page.tsx
'use client'

import { useState, useEffect, type ChangeEvent } from 'react'
import {
    Search,
    Filter,
    Download,
    Eye,
    ChevronDown,
    Mail,
    Phone,
    Loader2,
    Plus,
    User,
    Shield,
    Calendar,
    ArrowRight,
    RefreshCcw,
    Circle,
    GraduationCap,
    MoreVertical
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Student {
    id: string
    studentId: string
    name: string
    grade: string
    section: string
    rollNo: string
    fatherName: string
    phone: string
    status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'WITHDRAWN'
}

const GRADES = [
    'Playgroup', 'Nursery', 'Class 1', 'Class 2', 'Class 3',
    'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'
]

const containerVars = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
}

const rowVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
}

export default function AdminStudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [gradeFilter, setGradeFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/students')
            const data = await response.json()
            if (data.success && Array.isArray(data.data)) {
                setStudents(data.data)
            }
        } catch (error) {
            console.error('Error fetching students:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter
        const matchesStatus = statusFilter === 'all' || student.status === statusFilter

        return matchesSearch && matchesGrade && matchesStatus
    })

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
            case 'INACTIVE': return 'bg-amber-50 text-amber-600 border-amber-100'
            case 'GRADUATED': return 'bg-blue-50 text-blue-600 border-blue-100'
            case 'WITHDRAWN': return 'bg-rose-50 text-rose-600 border-rose-100'
            default: return 'bg-slate-50 text-slate-600 border-slate-100'
        }
    }

    const handleExport = () => {
        const csv = [
            ['Student ID', 'Roll No', 'Name', 'Grade', 'Section', 'Father Name', 'Phone', 'Status'],
            ...filteredStudents.map((s) => [
                s.studentId,
                s.rollNo,
                s.name,
                s.grade,
                s.section,
                s.fatherName,
                s.phone,
                s.status
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n')

        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `students-registry-${new Date().toISOString()}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-ivs-navy font-heading mb-2">Student Registry</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor International Vision School's student body.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchStudents}
                        className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-ivs-blue transition-all shadow-sm"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={handleExport}
                        className="btn-premium py-3 px-6 flex items-center gap-2 group whitespace-nowrap"
                    >
                        <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                        Export Data
                    </button>
                    <Link href="/admin/students/new" className="bg-ivs-blue text-white px-6 py-3 rounded-2xl font-bold hover:bg-ivs-accent transition-all shadow-lg shadow-ivs-blue/20 flex items-center gap-2 whitespace-nowrap">
                        <Plus className="w-5 h-5 text-white" />
                        New Student
                    </Link>
                </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-ivs-blue rounded-2xl flex items-center justify-center">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Total Enrollment</p>
                        <p className="text-xl font-bold text-ivs-navy">{students.length}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Circle className="w-3 h-3 fill-current" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Active Now</p>
                        <p className="text-xl font-bold text-ivs-navy">{students.filter(s => s.status === 'ACTIVE').length}</p>
                    </div>
                </div>
                {/* Add more stats if needed */}
            </div>

            {/* Filters */}
            <div className="premium-card rounded-[2rem] p-6 border border-slate-100 bg-white/50 backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-12 lg:col-span-6 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-ivs-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, ID or roll number..."
                            value={searchTerm}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue focus:shadow-lg focus:shadow-ivs-blue/5 transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="md:col-span-4 lg:col-span-2 relative group">
                        <select
                            value={gradeFilter}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setGradeFilter(e.target.value)}
                            className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue outline-none font-medium appearance-none cursor-pointer"
                        >
                            <option value="all">All Grades</option>
                            {GRADES.map((grade) => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                    </div>

                    <div className="md:col-span-4 lg:col-span-2 relative group">
                        <select
                            value={statusFilter}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                            className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue outline-none font-medium appearance-none cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="GRADUATED">Graduated</option>
                            <option value="WITHDRAWN">Withdrawn</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                    </div>

                    <div className="md:col-span-4 lg:col-span-2">
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setGradeFilter('all')
                                setStatusFilter('all')
                            }}
                            className="w-full h-full py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="premium-card rounded-[2.5rem] border border-slate-100 overflow-hidden bg-white">
                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-4 border-ivs-blue/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-ivs-blue border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Refreshing Student Bank</p>
                    </div>
                ) : filteredStudents.length === 0 ? (
                    <div className="py-32 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
                            <User className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-ivs-navy">No students found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search criteria or filters.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identification</th>
                                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Grade</th>
                                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section / Roll</th>
                                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guardian Info</th>
                                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={containerVars}
                                initial="hidden"
                                animate="visible"
                                className="divide-y divide-slate-50"
                            >
                                {filteredStudents.map((student) => (
                                    <motion.tr
                                        key={student.id}
                                        variants={rowVars}
                                        className="group hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ivs-blue to-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-ivs-blue/10 group-hover:scale-110 transition-transform">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-ivs-navy group-hover:text-ivs-blue transition-colors">
                                                        {student.name}
                                                    </p>
                                                    <p className="text-[11px] font-medium text-slate-400 font-mono">
                                                        {student.studentId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-ivs-blue">
                                                    <Shield className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-slate-600">{student.grade}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-ivs-navy">Sec: {student.section}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roll: {student.rollNo}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-slate-600 truncate max-w-[150px]">{student.fatherName}</p>
                                                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                                                    <Phone className="w-3 h-3" /> {student.phone}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 w-fit ${getStatusStyles(student.status)}`}>
                                                <Circle className={`w-2 h-2 fill-current ${student.status === 'ACTIVE' ? 'animate-pulse' : ''}`} />
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/students/${student.studentId}`}
                                                    className="inline-flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-ivs-blue hover:border-ivs-blue hover:shadow-lg hover:shadow-ivs-blue/10 transition-all"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                                <button className="inline-flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Table Footer */}
            {filteredStudents.length > 0 && (
                <div className="px-2 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                        Registry Count: <span className="text-ivs-navy">{filteredStudents.length}</span> / {students.length}
                    </p>
                </div>
            )}
        </motion.div>
    )
}