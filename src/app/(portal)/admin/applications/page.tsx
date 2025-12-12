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
} from 'lucide-react'

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

    const getStatusColor = (status: ApplicationStatus): string => {
        const colors = {
            approved: 'bg-green-100 text-green-700 border-green-200',
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            under_review: 'bg-blue-100 text-blue-700 border-blue-200',
            rejected: 'bg-red-100 text-red-700 border-red-200',
        }
        return colors[status]
    }

    const getStatusIcon = (status: ApplicationStatus) => {
        const icons = {
            approved: <CheckCircle2 className="w-4 h-4" />,
            pending: <Clock className="w-4 h-4" />,
            under_review: <AlertCircle className="w-4 h-4" />,
            rejected: <XCircle className="w-4 h-4" />,
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admission Applications</h1>
                    <p className="text-gray-600 mt-1">Manage and review all admission applications</p>
                </div>
                <button
                    onClick={handleExport}
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2"
                >
                    <Download className="w-5 h-5" />
                    Export Data
                </button>
            </div>

            {/* Status Tabs */}
            <div className="bg-white rounded-xl shadow-md p-2">
                <div className="flex flex-wrap gap-2">
                    {Object.entries(statusCounts).map(([status, count]) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                statusFilter === status
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {status.replace('_', ' ').toUpperCase()} ({count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="grid md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={searchTerm}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                        />
                    </div>

                    {/* Grade Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={gradeFilter}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setGradeFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none appearance-none"
                        >
                            <option value="all">All Grades</option>
                            {GRADES.map((grade) => (
                                <option key={grade} value={grade}>
                                    {grade}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            setSearchTerm('')
                            setGradeFilter('all')
                            setStatusFilter('all')
                        }}
                        className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {filteredApplications.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No applications found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    Application ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    Student Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    Father Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Grade</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Contact</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-blue-900">
                        {app.applicationId}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-gray-900">{app.studentName}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-700">{app.fatherName}</p>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
                        {app.grade}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-700 flex items-center gap-1">
                                                <Phone className="w-3 h-3" /> {app.phone}
                                            </p>
                                            <p className="text-sm text-gray-700 flex items-center gap-1">
                                                <Mail className="w-3 h-3" /> {app.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700">
                                            {new Date(app.dateApplied).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                      <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-1 w-fit ${getStatusColor(
                              app.status
                          )}`}
                      >
                        {getStatusIcon(app.status)}
                          {app.status.replace('_', ' ')}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/src/app/(portal)/admin/applications/${app.applicationId}`}
                                            className="p-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition inline-block"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredApplications.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-semibold">{filteredApplications.length}</span> of{' '}
                        <span className="font-semibold">{applications.length}</span> applications
                    </p>
                </div>
            )}
        </div>
    )
}