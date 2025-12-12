// src/app/(portal)/(admin)/admin/fees/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Search, Filter, Download, Plus, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

interface FeeRecord {
    id: string
    month: string
    amount: number
    paidAmount: number
    dueDate: string
    paidDate: string | null
    status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID' | 'OVERDUE'
    voucherNumber: string | null
    student: {
        id: string
        name: string
        rollNumber: string
        grade: string
        section: string
        parent: {
            user: {
                name: string
                phone: string
            }
        }
    }
}

export default function FeesPage() {
    const [fees, setFees] = useState<FeeRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null)
    const [paymentAmount, setPaymentAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [voucherNumber, setVoucherNumber] = useState('')

    useEffect(() => {
        fetchFees()
    }, [statusFilter])

    const fetchFees = async () => {
        try {
            const params = new URLSearchParams()
            if (statusFilter !== 'all') params.append('status', statusFilter)

            const response = await fetch(`/api/admin/fees?${params}`)
            const data = await response.json()

            if (data.success) {
                setFees(data.data)
            }
        } catch (error) {
            console.error('Error fetching fees:', error)
        } finally {
            setLoading(false)
        }
    }

    const handlePayment = async () => {
        if (!selectedFee || !paymentAmount || !paymentMethod) {
            alert('Please fill all required fields')
            return
        }

        try {
            const response = await fetch(`/api/admin/fees/${selectedFee.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paidAmount: parseFloat(paymentAmount),
                    paymentMethod,
                    voucherNumber,
                }),
            })

            const data = await response.json()

            if (data.success) {
                alert('Payment recorded successfully!')
                setShowPaymentModal(false)
                setSelectedFee(null)
                setPaymentAmount('')
                setPaymentMethod('')
                setVoucherNumber('')
                fetchFees()
            }
        } catch (error) {
            console.error('Error recording payment:', error)
            alert('Failed to record payment')
        }
    }

    const filteredFees = fees.filter(fee => {
        const matchesSearch =
            fee.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fee.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fee.student.parent.user.name.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesSearch
    })

    const stats = {
        total: fees.reduce((sum, f) => sum + f.amount, 0),
        collected: fees.reduce((sum, f) => sum + f.paidAmount, 0),
        pending: fees.reduce((sum, f) => sum + (f.amount - f.paidAmount), 0),
        overdue: fees.filter(f => f.status === 'OVERDUE').length,
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
            case 'PAID': return <CheckCircle2 className="w-4 h-4" />
            case 'UNPAID': return <XCircle className="w-4 h-4" />
            case 'PARTIALLY_PAID': return <AlertCircle className="w-4 h-4" />
            case 'OVERDUE': return <AlertCircle className="w-4 h-4" />
            default: return null
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
                    <p className="text-gray-600 mt-1">Track and manage student fee payments</p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Export Report
                    </button>
                    <button
                        className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Generate Fee Vouchers
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-blue-900" />
                        <span className="text-gray-600 text-sm">Total Amount</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">Rs. {stats.total.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600 text-sm">Collected</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">Rs. {stats.collected.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        <span className="text-gray-600 text-sm">Pending</span>
                    </div>
                    <p className="text-3xl font-bold text-amber-600">Rs. {stats.pending.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-gray-600 text-sm">Overdue</span>
                    </div>
                    <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="bg-white rounded-xl shadow-md p-2">
                <div className="flex flex-wrap gap-2">
                    {['all', 'paid', 'unpaid', 'partially_paid', 'overdue'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                statusFilter === status
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {status.replace('_', ' ').toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by student name, roll number, or parent name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                    />
                </div>
            </div>

            {/* Fee Records Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Loading fee records...</p>
                    </div>
                ) : filteredFees.length === 0 ? (
                    <div className="p-12 text-center">
                        <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No fee records found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Roll No</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student Name</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Parent</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Month</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Paid</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Due Date</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredFees.map(fee => (
                                <tr key={fee.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-blue-900">
                        {fee.student.rollNumber}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{fee.student.name}</p>
                                            <p className="text-sm text-gray-600">{fee.student.grade} - {fee.student.section}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-gray-900">{fee.student.parent.user.name}</p>
                                            <p className="text-sm text-gray-600">{fee.student.parent.user.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-900 font-medium">{fee.month}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-900 font-semibold">Rs. {fee.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-green-600 font-semibold">Rs. {fee.paidAmount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700">{new Date(fee.dueDate).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-1 w-fit ${getStatusColor(fee.status)}`}>
                        {getStatusIcon(fee.status)}
                          {fee.status.replace('_', ' ')}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {fee.status !== 'PAID' && (
                                            <button
                                                onClick={() => {
                                                    setSelectedFee(fee)
                                                    setShowPaymentModal(true)
                                                }}
                                                className="px-4 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition text-sm"
                                            >
                                                Record Payment
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Payment Modal */}
            {showPaymentModal && selectedFee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Record Payment</h2>

                        <div className="space-y-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">Student</p>
                                <p className="font-semibold text-gray-900">{selectedFee.student.name}</p>
                                <p className="text-sm text-gray-600 mt-2">Amount Due</p>
                                <p className="text-2xl font-bold text-red-600">
                                    Rs. {(selectedFee.amount - selectedFee.paidAmount).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Payment Amount *</label>
                                <input
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Payment Method *</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                >
                                    <option value="">Select method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Online">Online Payment</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Voucher/Reference Number</label>
                                <input
                                    type="text"
                                    value={voucherNumber}
                                    onChange={(e) => setVoucherNumber(e.target.value)}
                                    placeholder="Enter voucher number"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowPaymentModal(false)
                                    setSelectedFee(null)
                                    setPaymentAmount('')
                                    setPaymentMethod('')
                                    setVoucherNumber('')
                                }}
                                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePayment}
                                className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                            >
                                Record Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}