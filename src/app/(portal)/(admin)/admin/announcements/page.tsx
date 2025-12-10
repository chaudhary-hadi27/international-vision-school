// src/app/(portal)/(admin)/admin/announcements/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Bell, Plus, Edit, Trash2, Eye, AlertCircle, Calendar, Users } from 'lucide-react'

interface Announcement {
    id: string
    title: string
    content: string
    type: 'GENERAL' | 'ACADEMIC' | 'EVENT' | 'HOLIDAY' | 'URGENT' | 'FEE'
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
    targetAudience: string[]
    targetGrades: string[]
    publishDate: string
    expiryDate: string | null
    isActive: boolean
    createdAt: string
}

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'GENERAL',
        priority: 'NORMAL',
        targetAudience: [] as string[],
        targetGrades: [] as string[],
        publishDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
    })

    const types = ['GENERAL', 'ACADEMIC', 'EVENT', 'HOLIDAY', 'URGENT', 'FEE']
    const priorities = ['LOW', 'NORMAL', 'HIGH', 'URGENT']
    const audiences = ['all', 'parents', 'students', 'teachers']
    const grades = ['all', 'Playgroup', 'Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8']

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('/api/admin/announcements')
            const data = await response.json()

            if (data.success) {
                setAnnouncements(data.data)
            }
        } catch (error) {
            console.error('Error fetching announcements:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.content || formData.targetAudience.length === 0 || formData.targetGrades.length === 0) {
            alert('Please fill all required fields')
            return
        }

        try {
            const response = await fetch('/api/admin/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.success) {
                alert('Announcement created successfully!')
                setShowModal(false)
                resetForm()
                fetchAnnouncements()
            }
        } catch (error) {
            console.error('Error creating announcement:', error)
            alert('Failed to create announcement')
        }
    }

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            type: 'GENERAL',
            priority: 'NORMAL',
            targetAudience: [],
            targetGrades: [],
            publishDate: new Date().toISOString().split('T')[0],
            expiryDate: '',
        })
    }

    const handleAudienceToggle = (audience: string) => {
        setFormData(prev => ({
            ...prev,
            targetAudience: prev.targetAudience.includes(audience)
                ? prev.targetAudience.filter(a => a !== audience)
                : [...prev.targetAudience, audience]
        }))
    }

    const handleGradeToggle = (grade: string) => {
        setFormData(prev => ({
            ...prev,
            targetGrades: prev.targetGrades.includes(grade)
                ? prev.targetGrades.filter(g => g !== grade)
                : [...prev.targetGrades, grade]
        }))
    }

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            GENERAL: 'bg-blue-100 text-blue-700',
            ACADEMIC: 'bg-purple-100 text-purple-700',
            EVENT: 'bg-green-100 text-green-700',
            HOLIDAY: 'bg-pink-100 text-pink-700',
            URGENT: 'bg-red-100 text-red-700',
            FEE: 'bg-amber-100 text-amber-700',
        }
        return colors[type] || 'bg-gray-100 text-gray-700'
    }

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            LOW: 'bg-gray-100 text-gray-700',
            NORMAL: 'bg-blue-100 text-blue-700',
            HIGH: 'bg-amber-100 text-amber-700',
            URGENT: 'bg-red-100 text-red-700',
        }
        return colors[priority] || 'bg-gray-100 text-gray-700'
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                    <p className="text-gray-600 mt-1">Create and manage school announcements</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Announcement
                </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Bell className="w-5 h-5 text-blue-900" />
                        <span className="text-gray-600 text-sm">Total</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{announcements.length}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Eye className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600 text-sm">Active</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                        {announcements.filter(a => a.isActive).length}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-gray-600 text-sm">Urgent</span>
                    </div>
                    <p className="text-3xl font-bold text-red-600">
                        {announcements.filter(a => a.priority === 'URGENT').length}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600 text-sm">This Month</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">
                        {announcements.filter(a => {
                            const date = new Date(a.publishDate)
                            const now = new Date()
                            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                        }).length}
                    </p>
                </div>
            </div>

            {/* Announcements List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Loading announcements...</p>
                    </div>
                ) : announcements.length === 0 ? (
                    <div className="p-12 text-center">
                        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No announcements yet</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                        >
                            Create First Announcement
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {announcements.map(announcement => (
                            <div key={announcement.id} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{announcement.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(announcement.type)}`}>
                        {announcement.type}
                      </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                                            {!announcement.isActive && (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-600">
                          Inactive
                        </span>
                                            )}
                                        </div>
                                        <p className="text-gray-700 mb-3">{announcement.content}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>Audience: {announcement.targetAudience.join(', ')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Grades: {announcement.targetGrades.join(', ')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Published: {new Date(announcement.publishDate).toLocaleDateString()}</span>
                                            </div>
                                            {announcement.expiryDate && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Expires: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition"
                                            title="Edit"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="p-2 bg-red-100 text-red-900 rounded-lg hover:bg-red-200 transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Announcement</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                    placeholder="Enter announcement title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Content *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none resize-none"
                                    placeholder="Enter announcement content"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Type *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                    >
                                        {types.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Priority *</label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                    >
                                        {priorities.map(priority => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Target Audience *</label>
                                <div className="flex flex-wrap gap-2">
                                    {audiences.map(audience => (
                                        <button
                                            key={audience}
                                            type="button"
                                            onClick={() => handleAudienceToggle(audience)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                                formData.targetAudience.includes(audience)
                                                    ? 'bg-blue-900 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {audience}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Target Grades *</label>
                                <div className="flex flex-wrap gap-2">
                                    {grades.map(grade => (
                                        <button
                                            key={grade}
                                            type="button"
                                            onClick={() => handleGradeToggle(grade)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                                formData.targetGrades.includes(grade)
                                                    ? 'bg-blue-900 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {grade}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Publish Date *</label>
                                    <input
                                        type="date"
                                        value={formData.publishDate}
                                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Expiry Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false)
                                        resetForm()
                                    }}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                                >
                                    Create Announcement
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}