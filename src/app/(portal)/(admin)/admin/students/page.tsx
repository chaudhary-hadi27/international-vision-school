'use client'

import { useState, useEffect } from 'react'
import {
    Search,
    Filter,
    UserPlus,
    Eye,
    Edit,
    Trash2,
    Download,
    ChevronDown
} from 'lucide-react'

export default function StudentsPage() {
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [gradeFilter, setGradeFilter] = useState('all')
    const [sectionFilter, setSectionFilter] = useState('all')

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        try {
            const response = await fetch('/api/admin/students')
            const data = await response.json()
            if (data.success) {
                setStudents(data.data)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter
        const matchesSection = sectionFilter === 'all' || student.section === sectionFilter

        return matchesSearch && matchesGrade && matchesSection
    })

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
                    <p className="text-gray-600 mt-1">Manage all enrolled students</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Export
                    </button>
                    <a
                        href="/admin/students/add"
                        className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add Student
                    </a>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-gray-600 text-sm">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{students.length}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-gray-600 text-sm">Active</p>
                    <p className="text-3xl font-bold text-green-600">
                        {students.filter(s => s.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-gray-600 text-sm">Boys</p>
                    <p className="text-3xl font-bold text-blue-600">
                        {students.filter(s => s.gender === 'male').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-gray-600 text-sm">Girls</p>
                    <p className="text-3xl font-bold text-pink-600">
                        {students.filter(s => s.gender === 'female').length}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="grid md:grid-cols-4 gap-4">

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or roll number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                        />
                    </div>

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
                            <option value="Prep">Prep</option>
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

                    <div className="relative">
                        <select
                            value={sectionFilter}
                            onChange={(e) => setSectionFilter(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none appearance-none"
                        >
                            <option value="all">All Sections</option>
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    <button
                        onClick={() => {
                            setSearchTerm('')
                            setGradeFilter('all')
                            setSectionFilter('all')
                        }}
                        className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                        Clear Filters
                    </button>

                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Roll No</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Father Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Grade</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Section</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-blue-900">
                      {student.rollNumber}
                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-900">
                          {student.name.charAt(0)}
                        </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{student.name}</p>
                                            <p className="text-sm text-gray-600">{student.gender}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-gray-700">{student.fatherName}</p>
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
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        student.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                      {student.status}
                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`/admin/students/${student.id}`}
                                            className="p-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`/admin/students/${student.id}/edit`}
                                            className="p-2 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </a>
                                        <button className="p-2 bg-red-100 text-red-900 rounded-lg hover:bg-red-200 transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}