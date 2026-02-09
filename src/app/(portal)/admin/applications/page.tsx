// src/app/(portal)/admin/applications/page.tsx
'use client'

import { useState, useEffect, type ChangeEvent } from 'react'
import Link from 'next/link'
import {
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    ChevronDown,
    Mail,
    Phone,
    Loader2,
    Calendar,
    User,
    ArrowRight,
    RefreshCcw,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type ApplicationStatus = 'pending' | 'approved' | 'under_review' | 'rejected'

interface Application {
    id: string
    applicationId: string
    studentName: string
    fatherName: string
    grade: string
    phone: string
    email: string
    status: ApplicationStatus
    dateApplied: string
}

interface StatusCount {
    all: number
    pending: number
    under_review: number
    approved: number
    rejected: number
}

const GRADES = [
    'Playgroup',
    'Nursery',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
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

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [gradeFilter, setGradeFilter] = useState('all')

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/applications')
            const data = await response.json()

            if (data.success && Array.isArray(data.data)) {
                setApplications(data.data)
            }
        } catch (error) {
            console.error('Error fetching applications:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter
        const matchesGrade = gradeFilter === 'all' || app.grade === gradeFilter

        return matchesSearch && matchesStatus && matchesGrade
    })

    const statusCounts: StatusCount = {
        all: applications.length,
        pending: applications.filter((a) => a.status === 'pending').length,
        under_review: applications.filter((a) => a.status === 'under_review').length,
        approved: applications.filter((a) => a.status === 'approved').length,
        rejected: applications.filter((a) => a.status === 'rejected').length,
    }

    const getStatusStyles = (status: ApplicationStatus): string => {
        const styles = {
            approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            pending: 'bg-amber-50 text-amber-600 border-amber-100',
            under_review: 'bg-blue-50 text-blue-600 border-blue-100',
            rejected: 'bg-rose-50 text-rose-600 border-rose-100',
        }
        return styles[status]
    }

    const getStatusIcon = (status: ApplicationStatus) => {
        const icons = {
            approved: <CheckCircle2 className="w-3.5 h-3.5" />,
            pending: <Clock className="w-3.5 h-3.5" />,
            under_review: <AlertCircle className="w-3.5 h-3.5" />,
            rejected: <XCircle className="w-3.5 h-3.5" />,
        }
        return icons[status]
    }

    const handleExport = () => {
        const csv = [
            ['Application ID', 'Student Name', 'Father Name', 'Grade', 'Email', 'Phone', 'Status', 'Date'],
            ...filteredApplications.map((app) => [
                app.applicationId,
                app.studentName,
                app.fatherName,
                app.grade,
                app.email,
                app.phone,
                app.status,
                new Date(app.dateApplied).toLocaleDateString(),
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n')

        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `applications-${new Date().toISOString()}.csv`
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
                    <h1 className="text-4xl font-bold text-ivs-navy font-heading mb-2">Applications Portal</h1>
                    <p className="text-slate-500 font-medium">Review and process new admission requests.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchApplications}
                        className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-ivs-blue transition-all shadow-sm"
                        title="Refresh Data"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={handleExport}
                        className="btn-premium py-3 px-6 flex items-center gap-2 group"
                    >
                        <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                        Export Registry
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(statusCounts).map(([status, count], idx) => (
                    <motion.button
                        key={status}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setStatusFilter(status)}
                        className={`p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group text-left ${statusFilter === status
                            ? 'bg-ivs-blue border-ivs-blue text-white shadow-lg shadow-ivs-blue/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-ivs-blue/30 hover:shadow-md'
                            }`}
                    >
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${statusFilter === status ? 'text-white/80' : 'text-slate-400'}`}>
                            {status === 'all' ? 'Total' : status.replace('_', ' ')}
                        </p>
                        <p className="text-3xl font-bold tabular-nums tracking-tight">{count}</p>
                    </motion.button>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-6 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-ivs-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Search student name or ID..."
                            value={searchTerm}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 transition-all outline-none font-medium text-sm text-ivs-navy"
                        />
                    </div>

                    <div className="md:col-span-4 relative group">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-ivs-blue transition-colors" />
                        <select
                            value={gradeFilter}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setGradeFilter(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none font-medium text-sm text-ivs-navy appearance-none cursor-pointer"
                        >
                            <option value="all">All Grades</option>
                            {GRADES.map((grade) => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setGradeFilter('all')
                                setStatusFilter('all')
                            }}
                            className="w-full h-full py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-2 border-ivs-blue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
                            <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-ivs-navy">No records found</h3>
                        <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Application</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guardian</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
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
                                {filteredApplications.map((app) => (
                                    <motion.tr
                                        key={app.id}
                                        variants={rowVars}
                                        className="group hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-ivs-navy">
                                                    {app.studentName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-ivs-navy">
                                                        {app.studentName}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-mono">
                                                        {app.applicationId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <User className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="text-sm">{app.fatherName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                                                {app.grade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                                    <Phone className="w-3 h-3" /> {app.phone}
                                                </p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                                    <Mail className="w-3 h-3" /> {app.email}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 w-fit ${getStatusStyles(app.status)}`}>
                                                {app.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/applications/${app.applicationId}`}
                                                className="inline-flex items-center justify-center w-8 h-8 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-ivs-blue hover:border-ivs-blue transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination / Footer */}
            {filteredApplications.length > 0 && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Displaying <span className="text-ivs-navy">{filteredApplications.length}</span> of <span className="text-ivs-navy">{applications.length}</span> entries
                    </p>
                    <div className="flex gap-2">
                        {/* Pagination controls could go here if needed */}
                    </div>
                </div>
            )}
        </motion.div>
    )
}