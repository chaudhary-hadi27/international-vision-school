'use client'

import { useState } from 'react'
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
    Phone
} from 'lucide-react'

export default function AdminApplicationsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [gradeFilter, setGradeFilter] = useState('all')

    // Sample data - in production, fetch from API
    const applications = [
        {
            id: 'IVS2024001',
            studentName: 'Ahmed Ali Khan',
            fatherName: 'Ali Khan',
            grade: 'Class 5',
            phone: '0300-1234567',
            email: 'ali@example.com',
            status: 'pending',
            dateApplied: '2024-12-04',
            documents: { photo: true, birth: true, cnic: true }
        },
        {
            id: 'IVS2024002',
            studentName: 'Fatima Hassan',
            fatherName: 'Hassan Ahmed',
            grade: 'Class 3',
            phone: '0321-9876543',
            email: 'hassan@example.com',
            status: 'approved',
            dateApplied: '2024-12-04',
            documents: { photo: true, birth: true, cnic: true }
        },
        {
            id: 'IVS2024003',
            studentName: 'Usman Tariq',
            fatherName: 'Tariq Mahmood',
            grade: 'Nursery',
            phone: '0333-5555555',
            email: 'tariq@example.com',
            status: 'under_review',
            dateApplied: '2024-12-03',
            documents: { photo: true, birth: false, cnic: true }
        },
        {
            id: 'IVS2024004',
            studentName: 'Ayesha Malik',
            fatherName: 'Malik Asad',
            grade: 'Class 8',
            phone: '0300-7777777',
            email: 'malik@example.com',
            status: 'pending',
            dateApplied: '2024-12-03',
            documents: { photo: true, birth: true, cnic: false }
        },
        {
            id: 'IVS2024005',
            studentName: 'Zain Abbas',
            fatherName: 'Abbas Ali',
            grade: 'Class 1',
            phone: '0321-4444444',
            email: 'abbas@example.com',
            status: 'approved',
            dateApplied: '2024-12-02',
            documents: { photo: true, birth: true, cnic: true }
        },
        {
            id: 'IVS2024006',
            studentName: 'Sara Ahmed',
            fatherName: 'Ahmed Raza',
            grade: 'Playgroup',
            phone: '0333-2222222',
            email: 'raza@example.com',
            status: 'rejected',
            dateApplied: '2024-12-01',
            documents: { photo: true, birth: true, cnic: true }
        },
    ]

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'approved': return 'bg-green-100 text-green-700 border-green-200'
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200'
            case 'under_review': return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
            default: return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'approved': return <CheckCircle2 className="w-4 h-4" />
            case 'pending': return <Clock className="w-4 h-4" />
            case 'under_review': return <AlertCircle className="w-4 h-4" />
            case 'rejected': return <XCircle className="w-4 h-4" />
            default: return null
        }
    }

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter
        const matchesGrade = gradeFilter === 'all' || app.grade === gradeFilter

        return matchesSearch && matchesStatus && matchesGrade
    })

    const statusCounts = {
        all: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        under_review: applications.filter(a => a.status === 'under_review').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admission Applications</h1>
                    <p className="text-gray-600 mt-1">Manage and review all admission applications</p>
                </div>
                <button className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2">
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
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                        />
                    </div>

                    {/* Grade Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={gradeFilter}
                            onChange={(e) => setGradeFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none appearance-none"
                        >
                            <option value="all">All Grades</option>
                            <option value="Playgroup">Playgroup</option>
                            <option value="Nursery">Nursery</option>
                            <option value="Class 1">Class 1</option>
                            <option value="Class 2">Class 2</option>
                            <option value="Class 3">Class 3</option>
                            <option value="Class 4">Class 4</option>
                            <option value="Class 5">Class 5</option>
                            <option value="Class 6">Class 6</option>
                            <option value="Class 7">Class 7</option>
                            <option value="Class 8">Class 8</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Date Filter */}
                    <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                    />

                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Application ID</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Father Name</th>
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
                                    <span className="font-mono text-sm font-semibold text-blue-900">{app.id}</span>
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
                                    <p className="text-sm text-gray-700">{new Date(app.dateApplied).toLocaleDateString()}</p>
                                </td>
                                <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-1 w-fit ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                        {app.status.replace('_', ' ')}
                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredApplications.length}</span> of <span className="font-semibold">{applications.length}</span> applications
                </p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition">
                        Previous
                    </button>
                    <button className="px-4 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
                        1
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition">
                        2
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition">
                        Next
                    </button>
                </div>
            </div>

        </div>
    )
}