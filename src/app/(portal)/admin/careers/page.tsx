// src/app/(portal)/admin/careers/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
    Mail,
    Phone,
    BookOpen,
    GraduationCap,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Filter,
    Download,
    RefreshCcw,
    Briefcase,
    Calendar,
    ChevronDown,
    UserCircle,
    Users,
    FileText,
    Star,
    CheckCircle2,
    X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TeacherApplication {
    id: string
    fullName: string
    email: string
    phone: string
    qualification: string
    experience: string
    subject: string
    coverLetter: string | null
    cvUrl: string | null
    status: string
    createdAt: string
}

const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const rowVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
}

export default function AdminCareersPage() {
    const [applications, setApplications] = useState<TeacherApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('ALL')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedApp, setSelectedApp] = useState<TeacherApplication | null>(null)

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/careers')
            const data = await res.json()
            if (data.success) {
                setApplications(data.data)
            }
        } catch (error) {
            console.error('Error fetching applications:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/careers/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            if (res.ok) {
                fetchApplications()
                if (selectedApp?.id === id) {
                    setSelectedApp({ ...selectedApp, status: newStatus })
                }
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const filtered = applications.filter(app => {
        const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus
        const matchesSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.subject.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatus && matchesSearch
    })

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'PENDING').length,
        shortlisted: applications.filter(a => a.status === 'SHORTLISTED').length,
        hired: applications.filter(a => a.status === 'HIRED').length
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-ivs-navy mb-1">Talent Acquisition</h1>
                    <p className="text-slate-500 font-medium text-sm">Review applications for teaching and staff positions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchApplications}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-ivs-navy hover:bg-slate-50 transition-all flex items-center justify-center"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="px-4 py-2 bg-ivs-blue text-white rounded-lg text-sm font-bold hover:bg-ivs-accent flex items-center gap-2 shadow-sm shadow-ivs-blue/20 transition-all">
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Candidates', value: applications.length, icon: Users, color: 'text-ivs-blue', bg: 'bg-blue-50' },
                    { label: 'Pending Review', value: applications.filter(a => a.status === 'PENDING').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Shortlisted', value: applications.filter(a => a.status === 'SHORTLISTED').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Positions Open', value: '12', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-ivs-navy">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name, email or position..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-medium text-ivs-navy transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['ALL', 'PENDING', 'SHORTLISTED', 'HIRED', 'REJECTED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${filterStatus === status
                                ? 'bg-ivs-blue text-white shadow-sm shadow-ivs-blue/20'
                                : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-left">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Position & Experience</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Applied Date</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={5} className="py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Scanning Applicant Registry...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-500">
                                        No applications found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                                    {app.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-ivs-navy text-sm">{app.fullName}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{app.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-ivs-navy text-sm">{app.subject}</span>
                                                <span className="text-xs text-slate-500 font-medium">{app.experience} years exp.</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${app.status === 'SHORTLISTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                app.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                    app.status === 'HIRED' ? 'bg-blue-50 text-blue-700 border-blue-200' : // Added HIRED status style
                                                        'bg-amber-50 text-amber-700 border-amber-200' // PENDING and others
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'SHORTLISTED' ? 'bg-emerald-500' :
                                                    app.status === 'REJECTED' ? 'bg-rose-500' :
                                                        app.status === 'HIRED' ? 'bg-blue-500' : // Added HIRED status dot
                                                            'bg-amber-500'
                                                    }`}></span>
                                                {app.status.charAt(0).toUpperCase() + app.status.slice(1).toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => setSelectedApp(app)}
                                                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:text-ivs-navy hover:bg-slate-50 transition-all shadow-sm"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Application Detail Modal */}
            <AnimatePresence>
                {selectedApp && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedApp(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-xl p-6 md:p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-200"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-500 border border-slate-200">
                                        {selectedApp.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-ivs-navy">{selectedApp.fullName}</h2>
                                        <p className="text-slate-500 font-medium">{selectedApp.subject} • {selectedApp.experience} Years Exp.</p>
                                        <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Mail className="w-3.5 h-3.5" />
                                                {selectedApp.email}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5" />
                                                {selectedApp.phone}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedApp(null)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-ivs-navy hover:bg-slate-100 transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Qualification</p>
                                        <p className="text-sm font-bold text-ivs-navy">{selectedApp.qualification}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">LinkedIn Profile</p>
                                        <a href="#" className="text-sm font-bold text-ivs-blue hover:underline truncate block">
                                            linkedin.com/in/candidate
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-ivs-navy mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-slate-400" />
                                        Cover Letter / Notes
                                    </h3>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600 leading-relaxed font-medium">
                                        <p>{selectedApp.coverLetter || 'No cover letter provided.'}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold text-ivs-navy mb-2">Resume Document</h3>
                                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-ivs-blue hover:bg-blue-50/50 transition-all group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-ivs-navy group-hover:text-ivs-blue transition-colors">Resume_{selectedApp.fullName.replace(' ', '_')}.pdf</p>
                                                <p className="text-xs text-slate-500">2.4 MB • PDF Document</p>
                                            </div>
                                        </div>
                                        <Download className="w-4 h-4 text-slate-400 group-hover:text-ivs-blue" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex gap-4">
                                    {selectedApp.status === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(selectedApp.id, 'REJECTED')}
                                                className="flex-1 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg font-bold hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Reject
                                            </button>
                                            <button
                                                onClick={() => updateStatus(selectedApp.id, 'SHORTLISTED')}
                                                className="flex-1 py-2.5 bg-ivs-blue text-white rounded-lg font-bold hover:bg-ivs-accent shadow-sm shadow-ivs-blue/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                Shortlist Candidate
                                            </button>
                                        </>
                                    )}
                                    {selectedApp.status === 'SHORTLISTED' && (
                                        <button
                                            onClick={() => updateStatus(selectedApp.id, 'HIRED')}
                                            className="w-full py-2.5 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 shadow-sm transition-all flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Confirm Successful Hire
                                        </button>
                                    )}
                                    {['HIRED', 'REJECTED'].includes(selectedApp.status) && (
                                        <button
                                            onClick={() => updateStatus(selectedApp.id, 'PENDING')}
                                            className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                                        >
                                            <RefreshCcw className="w-4 h-4" />
                                            Reset to Under Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        PENDING: 'bg-amber-50 text-amber-600 border-amber-100',
        SHORTLISTED: 'bg-ivs-blue/5 text-ivs-blue border-ivs-blue/10',
        REJECTED: 'bg-rose-50 text-rose-600 border-rose-100',
        HIRED: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        DEFAULT: 'bg-slate-50 text-slate-600 border-slate-100'
    }

    const icons: any = {
        PENDING: Clock,
        SHORTLISTED: Star,
        REJECTED: XCircle,
        HIRED: CheckCircle2,
        DEFAULT: Clock
    }

    const Icon = icons[status] || icons.DEFAULT

    return (
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border inline-flex items-center gap-2 ${styles[status] || styles.DEFAULT}`}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </div>
    )
}

function DetailItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                <Icon className="w-5 h-5 text-slate-400" />
            </div>
            <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</div>
                <div className="font-bold text-ivs-navy">{value}</div>
            </div>
        </div>
    )
}
