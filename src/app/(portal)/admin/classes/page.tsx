// src/app/(portal)/admin/classes/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
    Plus,
    Search,
    Users,
    BookOpen,
    Filter,
    MoreVertical,
    Calendar,
    Home,
    ShieldCheck,
    Loader2,
    X,
    DraftingCompass
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Class {
    id: string
    name: string
    grade_level: number
    section: string
    academic_year: string
    room_number?: string
    capacity: number
    teacher?: {
        full_name: string
    }
}

export default function AdminClassesPage() {
    const [classes, setClasses] = useState<Class[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        gradeLevel: 1,
        section: 'A',
        academicYear: '2024-25',
        roomNumber: '',
        capacity: 30
    })

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/classes')
            const data = await res.json()
            if (data.success) {
                setClasses(data.data)
            }
        } catch (err) {
            console.error('Error fetching classes:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await fetch('/api/admin/classes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                setShowModal(false)
                setFormData({
                    name: '',
                    gradeLevel: 1,
                    section: 'A',
                    academicYear: '2024-25',
                    roomNumber: '',
                    capacity: 30
                })
                fetchClasses()
            } else {
                alert(data.message || 'Failed to create class')
            }
        } catch (err) {
            console.error('Error creating class:', err)
            alert('A network error occurred.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.academic_year.includes(searchTerm)
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-ivs-navy font-heading mb-2">Class Management</h1>
                    <p className="text-slate-500 font-medium">Define and organize academic structures for the session.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-ivs-blue text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-ivs-accent transition-all shadow-lg shadow-ivs-blue/20 flex items-center gap-2 whitespace-nowrap"
                >
                    <Plus className="w-5 h-5" />
                    Create New Class
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name, section or year..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-ivs-blue/20 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 font-bold text-sm">
                        <Filter className="w-4 h-4" />
                        Refine
                    </button>
                    <button className="px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 font-bold text-sm">
                        <Calendar className="w-4 h-4" />
                        2024-25
                    </button>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="py-20 flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-ivs-blue animate-spin mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Class Registry...</p>
                </div>
            ) : filteredClasses.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-ivs-navy">No classes found</h3>
                    <p className="text-slate-500 mt-1">Start by defining your first academic class.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClasses.map((cls, idx) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-ivs-blue/5 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ivs-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-ivs-blue/10 transition-colors" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-blue-50 text-ivs-blue rounded-2xl flex items-center justify-center font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                                    {cls.grade_level}
                                </div>
                                <button className="p-2 text-slate-300 hover:text-ivs-navy transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-ivs-navy group-hover:text-ivs-blue transition-colors leading-tight">
                                        {cls.name}
                                    </h3>
                                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
                                        Section {cls.section} • {cls.academic_year}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacity</p>
                                            <p className="font-bold text-ivs-navy text-sm">{cls.capacity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                            <Home className="w-4 h-4" />
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Room</p>
                                            <p className="font-bold text-ivs-navy text-sm">{cls.room_number || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-ivs-blue/10 group-hover:text-ivs-blue transition-colors">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div className="leading-tight">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lead Teacher</p>
                                        <p className="font-bold text-ivs-navy text-sm truncate">{cls.teacher?.full_name || 'Unassigned'}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Create Class Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="fixed inset-0 bg-ivs-navy/20 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-ivs-blue/10 text-ivs-blue rounded-2xl flex items-center justify-center">
                                        <DraftingCompass className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-ivs-navy">New Academic Class</h2>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Setup Registry</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Class Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Nursery Blue, Grade 5 Alpha"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-ivs-blue/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Grade Level</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.gradeLevel}
                                            onChange={(e) => setFormData({ ...formData, gradeLevel: parseInt(e.target.value) })}
                                            className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-ivs-blue/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Section</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.section}
                                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-ivs-blue/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Academic Year</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.academicYear}
                                            onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-ivs-blue/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Capacity</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.capacity}
                                            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                            className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-ivs-blue/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] py-4 bg-ivs-blue text-white rounded-2xl font-bold hover:bg-ivs-accent transition-all shadow-lg shadow-ivs-blue/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                        Establish Class
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
