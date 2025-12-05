'use client'

import {
    Users,
    FileText,
    DollarSign,
    TrendingUp,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {

    const stats = [
        {
            title: 'Total Students',
            value: '523',
            change: '+12',
            changeType: 'increase',
            icon: Users,
            color: 'blue',
            link: '/admin/students'
        },
        {
            title: 'New Applications',
            value: '28',
            change: '+5 today',
            changeType: 'increase',
            icon: FileText,
            color: 'green',
            link: '/admin/applications'
        },
        {
            title: 'Fee Collection',
            value: 'Rs. 2.5M',
            change: '+8%',
            changeType: 'increase',
            icon: DollarSign,
            color: 'purple',
            link: '/admin/fees'
        },
        {
            title: 'Attendance Today',
            value: '94%',
            change: '-2%',
            changeType: 'decrease',
            icon: Calendar,
            color: 'amber',
            link: '/admin/attendance'
        }
    ]

    const recentApplications = [
        { id: 'IVS2024001', name: 'Ahmed Ali', grade: 'Class 5', status: 'pending', date: '2024-12-04' },
        { id: 'IVS2024002', name: 'Fatima Khan', grade: 'Class 3', status: 'approved', date: '2024-12-04' },
        { id: 'IVS2024003', name: 'Hassan Ahmed', grade: 'Nursery', status: 'pending', date: '2024-12-03' },
        { id: 'IVS2024004', name: 'Ayesha Malik', grade: 'Class 8', status: 'under_review', date: '2024-12-03' },
        { id: 'IVS2024005', name: 'Zain Abbas', grade: 'Class 1', status: 'approved', date: '2024-12-02' },
    ]

    const upcomingEvents = [
        { title: 'Parent-Teacher Meeting', date: '2024-12-10', time: '10:00 AM', type: 'meeting' },
        { title: 'Sports Day', date: '2024-12-15', time: 'All Day', type: 'event' },
        { title: 'Fee Due Date', date: '2024-12-20', time: '-', type: 'deadline' },
        { title: 'Winter Break Starts', date: '2024-12-23', time: '-', type: 'holiday' },
    ]

    const pendingTasks = [
        { task: 'Review 15 new applications', priority: 'high', count: 15 },
        { task: 'Approve fee vouchers', priority: 'medium', count: 8 },
        { task: 'Update student records', priority: 'low', count: 23 },
        { task: 'Send monthly reports', priority: 'high', count: 1 },
    ]

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'approved': return 'bg-green-100 text-green-700'
            case 'pending': return 'bg-amber-100 text-amber-700'
            case 'under_review': return 'bg-blue-100 text-blue-700'
            case 'rejected': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'approved': return <CheckCircle2 className="w-4 h-4" />
            case 'pending': return <Clock className="w-4 h-4" />
            case 'under_review': return <AlertCircle className="w-4 h-4" />
            case 'rejected': return <XCircle className="w-4 h-4" />
            default: return null
        }
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    const colors = {
                        blue: 'bg-blue-100 text-blue-900',
                        green: 'bg-green-100 text-green-700',
                        purple: 'bg-purple-100 text-purple-700',
                        amber: 'bg-amber-100 text-amber-700'
                    }

                    return (
                        <Link
                            key={index}
                            href={stat.link}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${colors[stat.color as keyof typeof colors]} rounded-lg flex items-center justify-center group-hover:scale-110 transition`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                {stat.changeType === 'increase' ? (
                                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                                ) : (
                                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                                )}
                            </div>
                            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className={`text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change} from last month
                            </p>
                        </Link>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Recent Applications */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                        <Link href="/admin/applications" className="text-blue-900 font-semibold hover:underline text-sm">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentApplications.map((app, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <p className="font-semibold text-gray-900">{app.name}</p>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                                            {app.status.replace('_', ' ')}
                    </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{app.grade} • {app.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{new Date(app.date).toLocaleDateString()}</p>
                                    <Link
                                        href={`/admin/applications/${app.id}`}
                                        className="text-xs text-blue-900 hover:underline font-semibold"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Tasks */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Tasks</h2>
                    <div className="space-y-3">
                        {pendingTasks.map((task, index) => {
                            const priorityColors = {
                                high: 'border-red-500 bg-red-50',
                                medium: 'border-amber-500 bg-amber-50',
                                low: 'border-blue-500 bg-blue-50'
                            }
                            return (
                                <div key={index} className={`p-4 rounded-lg border-l-4 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 text-sm">{task.task}</p>
                                            <p className="text-xs text-gray-600 mt-1">Priority: <span className="font-semibold">{task.priority}</span></p>
                                        </div>
                                        <span className="bg-white px-2 py-1 rounded-full text-xs font-bold text-gray-700">
                      {task.count}
                    </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button className="w-full mt-4 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
                        View All Tasks
                    </button>
                </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                    <div className="space-y-4">
                        {upcomingEvents.map((event, index) => {
                            const typeColors = {
                                meeting: 'bg-blue-100 text-blue-900',
                                event: 'bg-green-100 text-green-700',
                                deadline: 'bg-red-100 text-red-700',
                                holiday: 'bg-purple-100 text-purple-700'
                            }
                            return (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-blue-900 rounded-lg flex flex-col items-center justify-center text-white">
                                            <span className="text-xs">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                            <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                        <p className="text-sm text-gray-600">{event.time}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[event.type as keyof typeof typeColors]}`}>
                    {event.type}
                  </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/admin/applications"
                            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-center group"
                        >
                            <FileText className="w-8 h-8 text-blue-900 mx-auto mb-2 group-hover:scale-110 transition" />
                            <span className="font-semibold text-gray-900 text-sm">New Application</span>
                        </Link>
                        <Link
                            href="/admin/students"
                            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition text-center group"
                        >
                            <Users className="w-8 h-8 text-green-700 mx-auto mb-2 group-hover:scale-110 transition" />
                            <span className="font-semibold text-gray-900 text-sm">Add Student</span>
                        </Link>
                        <Link
                            href="/admin/fees"
                            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-center group"
                        >
                            <DollarSign className="w-8 h-8 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition" />
                            <span className="font-semibold text-gray-900 text-sm">Fee Voucher</span>
                        </Link>
                        <Link
                            href="/admin/announcements"
                            className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition text-center group"
                        >
                            <TrendingUp className="w-8 h-8 text-amber-700 mx-auto mb-2 group-hover:scale-110 transition" />
                            <span className="font-semibold text-gray-900 text-sm">Announcement</span>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}