
'use client'

import { useParams } from 'next/navigation'
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
    Loader2
} from 'lucide-react'

export default function ApplicationDetailPage() {
    const params = useParams()
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
        if (!confirm(`Are you sure you want to ${newStatus} this application?`)) return

        setUpdating(true)
        try {
            const response = await fetch(`/api/admin/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })

            const data = await response.json()
            if (data.success) {
                alert('Status updated successfully!')
                fetchApplication()
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Failed to update status')
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
            </div>
        )
    }

    if (!application) {
        return <div className="text-center py-20">Application not found</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/applications" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
                        <p className="text-gray-600">ID: {application.applicationId}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
          <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                  application.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : application.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : application.status === 'under_review'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
              }`}
          >
            {application.status.toUpperCase().replace('_', ' ')}
          </span>
                </div>
            </div>

            {application.status === 'pending' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="flex gap-4">
                        <button
                            onClick={() => updateStatus('approved')}
                            disabled={updating}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Approve Application
                        </button>
                        <button
                            onClick={() => updateStatus('rejected')}
                            disabled={updating}
                            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <XCircle className="w-5 h-5" />
                            Reject Application
                        </button>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Student Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-600">Full Name</label>
                                <p className="font-semibold text-gray-900">{application.studentName}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Date of Birth</label>
                                <p className="font-semibold text-gray-900">
                                    {new Date(application.dateOfBirth).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Gender</label>
                                <p className="font-semibold text-gray-900 capitalize">{application.gender}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Grade Applied</label>
                                <p className="font-semibold text-gray-900">{application.grade}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Parent Information</h2>
                        <div className="mb-6 pb-6 border-b">
                            <h3 className="font-bold text-gray-900 mb-4">Father Details</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600">Name</label>
                                    <p className="font-semibold text-gray-900">{application.fatherName}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Phone</label>
                                    <p className="font-semibold text-gray-900">{application.fatherPhone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Timeline
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-600">Applied On</label>
                                <p className="font-semibold text-gray-900">
                                    {new Date(application.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}