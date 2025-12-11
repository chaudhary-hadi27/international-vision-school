// src/app/(portal)/parent-portal/announcements/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Bell, Calendar, AlertCircle, Users, Filter } from 'lucide-react'

interface Child {
    id: string
    name: string
    rollNumber: string
    grade: string
    section: string
}

interface Announcement {
    id: string
    title: string
    content: string
    type: 'GENERAL' | 'ACADEMIC' | 'EVENT' | 'HOLIDAY' | 'URGENT' | 'FEE'
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
    publishDate: string
    expiryDate: string | null
    targetAudience: string[]
    targetGrades: string[]
}

export default function ParentAnnouncementsPage() {
    const [children, setChildren] = useState<Child[]>([])
    const [selectedChild, setSelectedChild] = useState<Child | null>(null)
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    const [typeFilter, setTypeFilter] = useState('all')

    useEffect(() => {
        fetchChildren()
    }, [])

    useEffect(() => {
        if (selectedChild) {
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

    const fetchAnnouncements = async (studentId: string) => {
        try {
            const response = await fetch(`/api/parent/announcements?studentId=${studentId}`)
            const data = await response.json()

            if (data.success) {
                setAnnouncements(data.data)
            }
        } catch (error) {
            console.error('Error fetching announcements:', error)
        }
    }

    const filteredAnnouncements = typeFilter === 'all'
        ? announcements
        : announcements.filter(a => a.type === typeFilter)

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading announcements...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                <p className="text-gray-600 mt-1">Stay updated with school news and events</p>
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
                                        ? 'bg-blue-900 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {child.name} ({child.grade})
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Type Filter */}
            <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-3">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <label className="text-gray-700 font-semibold">Filter by Type</label>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['all', 'GENERAL', 'ACADEMIC', 'EVENT', 'HOLIDAY', 'URGENT', 'FEE'].map(type => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                typeFilter === type
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {type === 'all' ? 'All' : type}
                        </button>
                    ))}
                </div>
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
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-gray-600 text-sm">Urgent</span>
                    </div>
                    <p className="text-3xl font-bold text-red-600">
                        {announcements.filter(a => a.priority === 'URGENT').length}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600 text-sm">Events</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                        {announcements.filter(a => a.type === 'EVENT').length}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600 text-sm">Academic</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">
                        {announcements.filter(a => a.type === 'ACADEMIC').length}
                    </p>
                </div>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
                {filteredAnnouncements.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No announcements found</p>
                    </div>
                ) : (
                    filteredAnnouncements.map(announcement => (
                        <div key={announcement.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold text-gray-900">{announcement.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(announcement.type)}`}>
                  {announcement.type}
                </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority}
                </span>
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed mb-4">{announcement.content}</p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Published: {new Date(announcement.publishDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}</span>
                                        </div>
                                        {announcement.expiryDate && (
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>Expires: {new Date(announcement.expiryDate).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
