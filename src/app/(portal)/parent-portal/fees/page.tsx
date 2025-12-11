// src/app/(portal)/parent-portal/fees/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { DollarSign, CheckCircle2, AlertCircle, XCircle, Calendar, Download } from 'lucide-react'

interface Child {
    id: string
    name: string
    rollNumber: string
    grade: string
    section: string
}

interface FeeRecord {
    id: string
    month: string
    amount: number
    paidAmount: number
    dueDate: string
    paidDate: string | null
    status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID' | 'OVERDUE'
    voucherNumber: string | null
    paymentMethod: string | null
}

interface FeesSummary {
    totalAmount: number
    totalPaid: number
    totalDue: number
    unpaidCount: number
}

export default function ParentFeesPage() {
    const [children, setChildren] = useState<Child[]>([])
    const [selectedChild, setSelectedChild] = useState<Child | null>(null)
    const [fees, setFees] = useState<FeeRecord[]>([])
    const [summary, setSummary] = useState<FeesSummary | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchChildren()
    }, [])

    useEffect(() => {
        if (selectedChild) {
            fetchFees(selectedChild.id)
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

    const fetchFees = async (studentId: string) => {
        try {
            const response = await fetch(`/api/parent/fees/${studentId}`)
            const data = await response.json()

            if (data.success) {
                setFees(data.data.fees)
                setSummary(data.data.summary)
            }
        } catch (error) {
            console.error('Error fetching fees:', error)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-700 border-green-300'
            case 'UNPAID': return 'bg-red-100 text-red-700 border-red-300'
            case 'PARTIALLY_PAID': return 'bg-amber-100 text-amber-700 border-amber-300'
            case 'OVERDUE': return 'bg-purple-100 text-purple-700 border-purple-300'
            default: return 'bg-gray-100 text-gray-700 border-gray-300'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PAID': return <CheckCircle2 className="w-5 h-5" />
            case 'UNPAID': return <XCircle className="w-5 h-5" />
            case 'PARTIALLY_PAID': return <AlertCircle className="w-5 h-5" />
            case 'OVERDUE': return <AlertCircle className="w-5 h-5" />
            default: return null
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading fee records...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Fee Status</h1>
                    <p className="text-gray-600 mt-1">View and track fee payments</p>
                </div>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Receipt
                </button>
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

            {/* Summary Cards */}
            {summary && (
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <DollarSign className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-600 text-sm">Total Amount</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">Rs. {summary.totalAmount.toLocaleString()}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-gray-600 text-sm">Total Paid</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">Rs. {summary.totalPaid.toLocaleString()}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                            <span className="text-gray-600 text-sm">Total Due</span>
                        </div>
                        <p className="text-3xl font-bold text-amber-600">Rs. {summary.totalDue.toLocaleString()}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="text-gray-600 text-sm">Unpaid Months</span>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{summary.unpaidCount}</p>
                    </div>
                </div>
            )}

            {/* Fee Records */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Fee History</h2>
                </div>

                {fees.length === 0 ? (
                    <div className="p-12 text-center">
                        <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No fee records found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Month</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Paid</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Balance</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Due Date</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Details</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {fees.map(fee => (
                                <tr key={fee.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-gray-900">{fee.month}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-gray-900">Rs. {fee.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-green-600 font-semibold">Rs. {fee.paidAmount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className="text-red-600 font-semibold">
                        Rs. {(fee.amount - fee.paidAmount).toLocaleString()}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(fee.dueDate).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-1 w-fit ${getStatusColor(fee.status)}`}>
                        {getStatusIcon(fee.status)}
                          {fee.status.replace('_', ' ')}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {fee.paidDate && (
                                            <div className="text-sm">
                                                <p className="text-gray-600">
                                                    Paid: {new Date(fee.paidDate).toLocaleDateString()}
                                                </p>
                                                {fee.voucherNumber && (
                                                    <p className="text-gray-600">
                                                        Voucher: {fee.voucherNumber}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Payment Instructions
                </h3>
                <div className="space-y-2 text-sm text-blue-800">
                    <p>• Fee payments can be made at the school office or via bank transfer</p>
                    <p>• Please bring your fee voucher when making payment</p>
                    <p>• For bank transfers, use Account Title: International Vision School</p>
                    <p>• Contact: +92 300 1234567 for payment queries</p>
                </div>
            </div>
        </div>
    )
}