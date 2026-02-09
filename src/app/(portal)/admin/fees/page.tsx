// src/app/(portal)/(admin)/admin/fees/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
    DollarSign,
    Search,
    Filter,
    Download,
    Plus,
    CheckCircle2,
    AlertCircle,
    XCircle,
    RefreshCcw,
    ChevronDown,
    CreditCard,
    User,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
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
                setShowPaymentModal(false)
                setSelectedFee(null)
                setPaymentAmount('')
                setPaymentMethod('')
                setVoucherNumber('')
                fetchFees()
            }
        } catch (error) {
            console.error('Error recording payment:', error)
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

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'PAID': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
            case 'UNPAID': return 'bg-rose-50 text-rose-600 border-rose-100'
            case 'PARTIALLY_PAID': return 'bg-amber-50 text-amber-600 border-amber-100'
            case 'OVERDUE': return 'bg-violet-50 text-violet-600 border-violet-100'
            default: return 'bg-slate-50 text-slate-400 border-slate-100'
        }
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
                    <h1 className="text-4xl font-bold text-ivs-navy font-heading mb-2">Fee Management</h1>
                    <p className="text-slate-500 font-medium">Streamline your financial records and student billing.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-ivs-blue hover:shadow-sm transition-all group">
                        <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <button className="btn-premium py-4 px-8 flex items-center gap-3 group">
                        <Plus className="w-5 h-5 text-ivs-gold group-hover:rotate-90 transition-transform" />
                        <span className="font-bold">Generate Vouchers</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Accounts Receivable", value: stats.total.toLocaleString(), icon: Wallet, color: "text-ivs-blue", bg: "bg-blue-50" },
                    { label: "Collected", value: stats.collected.toLocaleString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Outstanding", value: stats.pending.toLocaleString(), icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Overdue", value: stats.overdue, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVars}
                        className="bg-white p-6 rounded-xl border border-slate-200 hover:border-ivs-blue/30 hover:shadow-md transition-all group lg:min-h-[140px] flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between">
                            <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color} bg-opacity-50 group-hover:bg-opacity-100 transition-all`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold text-ivs-navy tabular-nums tracking-tight">{stat.value}</p>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-ivs-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Search student, roll no..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none text-sm font-medium text-ivs-navy transition-all"
                        />
                    </div>

                    <div className="md:col-span-4 relative group">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none text-sm font-medium text-ivs-navy appearance-none cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="partially_paid">Partial</option>
                            <option value="overdue">Overdue</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-2 border-ivs-blue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reference</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Parent</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={containerVars}
                                initial="hidden"
                                animate="visible"
                                className="divide-y divide-slate-100"
                            >
                                {filteredFees.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center text-slate-500">
                                            No fee records found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredFees.map(fee => (
                                        <motion.tr
                                            key={fee.id}
                                            variants={itemVars}
                                            className="group hover:bg-slate-50/80 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-ivs-navy">{fee.month}</p>
                                                    <p className="text-xs text-slate-400 font-mono">{fee.student.rollNumber}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-ivs-navy">{fee.student.name}</p>
                                                    <p className="text-xs text-slate-500">{fee.student.grade}-{fee.student.section}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm text-slate-700">{fee.student.parent.user.name}</p>
                                                    <p className="text-xs text-slate-400">{fee.student.parent.user.phone}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div>
                                                    <p className="text-sm font-medium text-ivs-navy">Rs. {fee.amount.toLocaleString()}</p>
                                                    {fee.paidAmount > 0 && (
                                                        <p className="text-xs text-emerald-600">Paid: {fee.paidAmount.toLocaleString()}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                                                {new Date(fee.dueDate).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(fee.status)}`}>
                                                    {fee.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {fee.status !== 'PAID' && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedFee(fee)
                                                            setPaymentAmount((fee.amount - fee.paidAmount).toString())
                                                            setShowPaymentModal(true)
                                                        }}
                                                        className="px-4 py-2 bg-ivs-blue text-white text-xs font-bold rounded-lg hover:bg-ivs-accent transition-colors"
                                                    >
                                                        Pay
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </motion.tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showPaymentModal && selectedFee && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[3rem] p-8 md:p-10 max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <DollarSign className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-ivs-navy">Receive Payment</h2>
                                    <p className="text-slate-500 font-medium">Registry: {selectedFee.month}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Student</p>
                                    <p className="font-bold text-ivs-navy truncate">{selectedFee.student.name}</p>
                                </div>
                                <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Due Amount</p>
                                    <p className="text-xl font-bold text-rose-600">PKR {(selectedFee.amount - selectedFee.paidAmount).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Payment Amount *</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
                                            <input
                                                type="number"
                                                value={paymentAmount}
                                                onChange={(e) => setPaymentAmount(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none font-bold text-ivs-navy transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Method *</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                                            <select
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue outline-none font-bold text-ivs-navy appearance-none transition-all cursor-pointer"
                                            >
                                                <option value="">Select Method</option>
                                                <option value="Cash">Cash Currency</option>
                                                <option value="Bank Transfer">Bank Transfer</option>
                                                <option value="Cheque">Bank Cheque</option>
                                                <option value="Online">Online Portal</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Reference / Voucher No.</label>
                                    <input
                                        type="text"
                                        value={voucherNumber}
                                        onChange={(e) => setVoucherNumber(e.target.value)}
                                        placeholder="e.g. VS-992823"
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-ivs-blue outline-none font-bold text-ivs-navy transition-all"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-[1.5rem] font-bold hover:bg-slate-200 transition-all active:scale-95"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        onClick={handlePayment}
                                        className="flex-[1.5] py-5 bg-emerald-500 text-white rounded-[1.5rem] font-bold hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Complete Record
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}