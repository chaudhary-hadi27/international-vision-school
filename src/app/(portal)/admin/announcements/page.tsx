// src/app/(portal)/(admin)/admin/announcements/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
    Bell,
    Plus,
    Edit,
    Trash2,
    Eye,
    AlertCircle,
    Calendar,
    Users,
    CheckCircle2,
    X,
    Info,
    Megaphone,
    Search,
    ChevronDown,
    RefreshCcw,
    Zap,
    MapPin,
    Target
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVars = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
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
    const gradesList = ['all', 'Playgroup', 'Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8']

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const fetchAnnouncements = async () => {
        setLoading(true)
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
                setShowModal(false)
                resetForm()
                fetchAnnouncements()
            }
        } catch (error) {
            console.error('Error creating announcement:', error)
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

    const getTypeStyles = (type: string) => {
        const styles: Record<string, string> = {
            GENERAL: 'bg-blue-50 text-blue-600 border-blue-100',
            ACADEMIC: 'bg-purple-50 text-purple-600 border-purple-100',
            EVENT: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            HOLIDAY: 'bg-pink-50 text-pink-600 border-pink-100',
            URGENT: 'bg-rose-50 text-rose-600 border-rose-100',
            FEE: 'bg-amber-50 text-amber-600 border-amber-100',
        }
        return styles[type] || 'bg-slate-50 text-slate-600'
    }

    const getPriorityStyles = (priority: string) => {
        const styles: Record<string, string> = {
            LOW: 'bg-slate-100 text-slate-500',
            NORMAL: 'bg-blue-50 text-blue-500',
            HIGH: 'bg-amber-50 text-amber-600',
            URGENT: 'bg-rose-50 text-rose-600',
        }
        return styles[priority] || 'bg-slate-100'
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
                    <h1 className="text-2xl font-bold text-ivs-navy mb-1">Notice Board</h1>
                    <p className="text-slate-500 font-medium text-sm">Broadcast important news and updates to the school community.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchAnnouncements}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-ivs-navy hover:bg-slate-50 transition-all flex items-center justify-center"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-ivs-blue text-white rounded-lg text-sm font-bold hover:bg-ivs-blue/90 flex items-center gap-2 shadow-sm transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Broadcast</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Alerts", value: announcements.length, icon: Bell, color: "text-ivs-navy", bg: "bg-slate-100" },
                    { label: "Live Broadcasts", value: announcements.filter(a => a.isActive).length, icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Urgent Notices", value: announcements.filter(a => a.priority === 'URGENT').length, icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
                    { label: "Posted This Month", value: announcements.filter(a => new Date(a.publishDate).getMonth() === new Date().getMonth()).length, icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3"
                    >
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 leading-none">{stat.label}</p>
                            <p className={`text-2xl font-bold ${stat.color} tabular-nums`}>{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Announcements Feed */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg font-bold text-ivs-navy flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-ivs-blue" />
                        Recent Broadcasts
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-ivs-blue transition-colors" />
                            <input
                                type="text"
                                placeholder="Search notices..."
                                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-ivs-navy focus:border-ivs-blue outline-none transition-all w-48 md:w-64"
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="py-24 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 border-4 border-ivs-blue/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-ivs-blue border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Retrieving Notice Board...</p>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="py-24 text-center bg-white rounded-xl border border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <Bell className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-ivs-navy">The Board is Empty</h3>
                            <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium text-sm">No announcements have been broadcasted yet. Start by creating a new one.</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-6 px-6 py-2.5 bg-ivs-blue text-white rounded-lg text-sm font-bold hover:bg-ivs-accent transition-all shadow-sm shadow-ivs-blue/20"
                            >
                                Dispatch First Notice
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVars}
                            initial="hidden"
                            animate="visible"
                            className="grid gap-6"
                        >
                            {announcements.map(announcement => (
                                <motion.div
                                    key={announcement.id}
                                    variants={itemVars}
                                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                                >
                                    {/* Type Decorative Stripe */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${announcement.type === 'URGENT' ? 'bg-rose-500' : 'bg-ivs-blue'}`} />

                                    <div className="flex flex-col md:flex-row gap-6 relative z-10 pl-2">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getTypeStyles(announcement.type)}`}>
                                                    {announcement.type}
                                                </span>
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getPriorityStyles(announcement.priority)}`}>
                                                    {announcement.priority} Priority
                                                </span>
                                                {!announcement.isActive && (
                                                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-400">
                                                        Expired
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-bold text-ivs-navy mb-2 group-hover:text-ivs-blue transition-colors">
                                                    {announcement.title}
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed font-medium text-sm max-w-4xl">
                                                    {announcement.content}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-50 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-slate-400" />
                                                    <p className="text-xs font-semibold text-slate-600">{announcement.targetGrades.join(', ')}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <p className="text-xs font-semibold text-slate-600">{new Date(announcement.publishDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex md:flex-col gap-2 shrink-0">
                                            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-ivs-navy hover:bg-slate-50 transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-xl p-6 md:p-8 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-200"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-ivs-blue rounded-lg flex items-center justify-center text-white">
                                        <Megaphone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-ivs-navy leading-none mb-1">New Broadcast</h2>
                                        <p className="text-slate-500 font-medium text-sm tracking-tight">Compose a new school-wide notice.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-ivs-navy transition-all hover:bg-slate-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Broadcast Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all placeholder:text-slate-400"
                                        placeholder="e.g. Annual Sports Day 2026 Schedule"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Notice Content *</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-medium text-slate-700 transition-all resize-none leading-relaxed placeholder:text-slate-400"
                                        placeholder="Type the full message here..."
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Broadcast Type</label>
                                        <div className="relative">
                                            <select
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy appearance-none transition-all cursor-pointer"
                                            >
                                                {types.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Priority Status</label>
                                        <div className="relative">
                                            <select
                                                value={formData.priority}
                                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                                className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy appearance-none transition-all cursor-pointer"
                                            >
                                                {priorities.map(priority => (
                                                    <option key={priority} value={priority}>{priority}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Target Audience Recipients</label>
                                    <div className="flex flex-wrap gap-2">
                                        {audiences.map(audience => (
                                            <button
                                                key={audience}
                                                type="button"
                                                onClick={() => handleAudienceToggle(audience)}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border
                                                    ${formData.targetAudience.includes(audience)
                                                        ? 'bg-ivs-blue border-ivs-blue text-white shadow-sm shadow-ivs-blue/20'
                                                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {audience}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Academic Grade Filtering</label>
                                    <div className="flex flex-wrap gap-2">
                                        {gradesList.map(grade => (
                                            <button
                                                key={grade}
                                                type="button"
                                                onClick={() => handleGradeToggle(grade)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border
                                                    ${formData.targetGrades.includes(grade)
                                                        ? 'bg-ivs-blue border-ivs-blue text-white shadow-sm'
                                                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {grade}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Begin Broadcast Date</label>
                                        <input
                                            type="date"
                                            value={formData.publishDate}
                                            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Automatic End Date (Optional)</label>
                                        <input
                                            type="date"
                                            value={formData.expiryDate}
                                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-slate-100 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-all"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-2.5 bg-ivs-blue text-white rounded-lg font-bold hover:bg-ivs-accent shadow-sm shadow-ivs-blue/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Megaphone className="w-4 h-4" />
                                        Launch Announcement
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}