// src/app/(portal)/admin/applications/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    FileText,
    Download,
    CheckCircle2,
    XCircle,
    Loader2,
    Shield,
    Clock,
    UserCircle,
    ChevronRight,
    ExternalLink,
    AlertCircle,
    Briefcase,
    Globe,
    Users,
    RefreshCcw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ApplicationDetailPage() {
    const params = useParams()
    const router = useRouter()
    const applicationId = params.id as string

    const [application, setApplication] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        fetchApplication()
    }, [applicationId])

    const fetchApplication = async () => {
        try {
            const response = await fetch(`/api/admin/applications/${applicationId}`)
            const data = await response.json()
            if (data.success) {
                setApplication(data.data)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (newStatus: string) => {
        if (!confirm(`Are you sure you want to change the status to ${newStatus}?`)) return

        setUpdating(true)
        try {
            const response = await fetch(`/api/admin/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })

            const data = await response.json()
            if (data.success) {
                fetchApplication()
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setUpdating(false)
        }
    }

    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100'
            case 'under_review': return 'bg-blue-50 text-blue-600 border-blue-100'
            case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100'
            default: return 'bg-slate-50 text-slate-600 border-slate-100'
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-ivs-blue/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-ivs-navy border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Retrieving Application details</p>
            </div>
        )
    }

    if (!application) {
        return (
            <div className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                <AlertCircle className="w-16 h-16 text-rose-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-ivs-navy">Application Registry Not Found</h3>
                <Link href="/admin/applications" className="mt-6 inline-flex items-center gap-2 text-ivs-blue font-bold hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Return to Applications
                </Link>
            </div>
        )
    }

    const documents = [
        { label: "Student Picture", value: application.studentPhotoUrl, icon: UserCircle },
        { label: "Birth Certificate", value: application.birthCertUrl, icon: FileText },
        { label: "Father CNIC", value: application.fatherCNICUrl, icon: Shield },
        { label: "Mother CNIC", value: application.motherCNICUrl, icon: Shield },
    ].filter(doc => doc.value);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-10"
        >
            {/* Top Navigation & Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-ivs-navy hover:bg-slate-50 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-ivs-navy">Application Review</h1>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-mono font-bold tracking-tight">
                                {application.applicationId}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">Reviewing {application.studentName}'s enrollment request.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border flex items-center gap-2 ${getStatusStyles(application.status)}`}>
                        {application.status === 'pending' && <Clock className="w-4 h-4" />}
                        {application.status === 'approved' && <CheckCircle2 className="w-4 h-4" />}
                        {application.status === 'rejected' && <XCircle className="w-4 h-4" />}
                        {application.status.replace('_', ' ')}
                    </span>
                </div>
            </div>

            {/* Quick Actions for Pending */}
            {application.status === 'pending' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div>
                        <h3 className="text-lg font-bold text-ivs-navy mb-1">Decision Required</h3>
                        <p className="text-sm text-slate-600 font-medium">This application is awaiting your final review and approval.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => updateStatus('rejected')}
                            disabled={updating}
                            className="px-4 py-2 bg-white border border-rose-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <XCircle className="w-4 h-4" />
                            Reject
                        </button>
                        <button
                            onClick={() => updateStatus('under_review')}
                            disabled={updating}
                            className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <Clock className="w-4 h-4" />
                            Review
                        </button>
                        <button
                            onClick={() => updateStatus('approved')}
                            disabled={updating}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Approve Entry
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Student Info */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 bg-ivs-navy rounded-lg flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-ivs-navy">Student Information</h2>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Enrollment Details</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                            {[
                                { label: "Full Name", value: application.studentName, icon: User },
                                { label: "Grade Applied", value: application.grade, icon: Shield },
                                { label: "Date of Birth", value: new Date(application.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: Calendar },
                                { label: "Gender", value: application.gender, icon: UserCircle, capitalize: true },
                                { label: "WhatsApp", value: application.whatsappNumber, icon: Phone },
                                { label: "Contact Email", value: application.email, icon: Mail },
                            ].map((item, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                                        <item.icon className="w-3.5 h-3.5" />
                                        <label className="text-[10px] font-bold uppercase tracking-wider">{item.label}</label>
                                    </div>
                                    <p className={`text-base font-semibold text-ivs-navy ${item.capitalize ? 'capitalize' : ''}`}>
                                        {item.value || "Not provided"}
                                    </p>
                                </div>
                            ))}
                            <div className="md:col-span-2 group">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <label className="text-[10px] font-bold uppercase tracking-wider">Address</label>
                                </div>
                                <p className="text-base font-medium text-ivs-navy leading-relaxed">
                                    {application.address || "Not provided"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Parent Info */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-ivs-navy">Guardian Network</h2>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Family Details</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Father */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-bold text-ivs-navy uppercase tracking-tight text-xs">Father</h4>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Name</label>
                                    <p className="font-semibold text-ivs-navy text-sm">{application.fatherName}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Phone</label>
                                    <p className="font-semibold text-ivs-navy text-sm">{application.fatherPhone}</p>
                                </div>
                            </div>

                            {/* Mother */}
                            <div className="grid md:grid-cols-3 gap-6 pb-2 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-bold text-ivs-navy uppercase tracking-tight text-xs">Mother</h4>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Name</label>
                                    <p className="font-semibold text-ivs-navy text-sm">{application.motherName || "Not provided"}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Phone</label>
                                    <p className="font-semibold text-ivs-navy text-sm">{application.motherPhone || "Not provided"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Documents */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-ivs-navy">Documents</h2>
                        </div>

                        <div className="space-y-3">
                            {documents.length === 0 ? (
                                <p className="text-sm text-slate-400 py-4 text-center italic">No documents uploaded.</p>
                            ) : (
                                documents.map((doc, idx) => (
                                    <a
                                        key={idx}
                                        href={doc.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-slate-50 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-slate-400 group-hover:text-ivs-blue transition-colors">
                                                <doc.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-600 uppercase tracking-tight leading-tight max-w-[120px]">
                                                {doc.label}
                                            </span>
                                        </div>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ivs-blue transition-colors" />
                                    </a>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-blue-50 text-ivs-blue rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-ivs-navy">Audit Trail</h2>
                        </div>

                        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                            <div className="relative pl-10">
                                <div className="absolute left-0 w-[38px] h-[38px] bg-emerald-50 text-emerald-600 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Created At</p>
                                <p className="text-sm font-bold text-ivs-navy">{new Date(application.createdAt).toLocaleString()}</p>
                            </div>

                            <div className="relative pl-10">
                                <div className="absolute left-0 w-[38px] h-[38px] bg-slate-50 text-slate-400 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                                    <RefreshCcw className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Last Updated</p>
                                <p className="text-sm font-bold text-ivs-navy">{new Date(application.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}