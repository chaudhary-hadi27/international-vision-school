'use client'

import {
    User,
    Calendar,
    TrendingUp,
    DollarSign,
    CheckCircle2,
    XCircle,
    Clock,
    Award,
    Bell
} from 'lucide-react'

export default function ParentPortalDashboard() {

    const studentInfo = {
        name: 'Ahmed Khan',
        class: 'Class 5-A',
        rollNo: '205',
        section: 'A',
        photo: null // You can add actual photo URL
    }

    const stats = [
        {
            title: 'Attendance',
            value: '92%',
            change: '+2%',
            icon: Calendar,
            color: 'blue',
            trend: 'up'
        },
        {
            title: 'Overall Grade',
            value: 'A',
            change: 'Excellent',
            icon: TrendingUp,
            color: 'green',
            trend: 'up'
        },
        {
            title: 'Fee Status',
            value: 'Paid',
            change: 'Due: Jan 1',
            icon: DollarSign,
            color: 'purple',
            trend: 'neutral'
        },
        {
            title: 'Assignments',
            value: '8/10',
            change: '2 pending',
            icon: CheckCircle2,
            color: 'amber',
            trend: 'neutral'
        }
    ]

    const recentAttendance = [
        { date: '2024-12-03', status: 'present' },
        { date: '2024-12-02', status: 'present' },
        { date: '2024-12-01', status: 'absent' },
        { date: '2024-11-30', status: 'present' },
        { date: '2024-11-29', status: 'present' },
    ]

    const upcomingEvents = [
        { title: 'Parent-Teacher Meeting', date: '2024-12-10', time: '10:00 AM' },
        { title: 'Sports Day', date: '2024-12-15', time: 'All Day' },
        { title: 'Final Exams', date: '2024-12-20', time: '8:00 AM' },
    ]

    const announcements = [
        { title: 'Winter Break Notice', date: '2024-12-01', type: 'info' },
        { title: 'Fee Due Reminder', date: '2024-11-28', type: 'warning' },
        { title: 'Annual Day Invitation', date: '2024-11-25', type: 'info' },
    ]

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <User className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Welcome Back!</h1>
                            <p className="text-blue-100">Student: {studentInfo.name} - {studentInfo.class}</p>
                        </div>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-sm text-blue-200 mb-1">Roll Number</p>
                        <p className="text-2xl font-bold">{studentInfo.rollNo}</p>
                    </div>
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
                        <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${colors[stat.color as keyof typeof colors]} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                {stat.trend === 'up' && (
                                    <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                                )}
                            </div>
                            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            {stat.trend === 'neutral' && (
                                <p className="text-gray-500 text-xs mt-1">{stat.change}</p>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Recent Attendance */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Attendance</h2>
                        <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {recentAttendance.map((record, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600 text-sm">
                  {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                                {record.status === 'present' ? (
                                    <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Present
                  </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                    <XCircle className="w-4 h-4" />
                    Absent
                  </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-blue-900 font-semibold hover:bg-blue-50 rounded-lg transition">
                        View Full Attendance
                    </button>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                        <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="p-3 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                                <p className="text-xs text-gray-600 flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(event.date).toLocaleDateString()} • {event.time}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-blue-900 font-semibold hover:bg-blue-50 rounded-lg transition">
                        View All Events
                    </button>
                </div>

                {/* Announcements */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
                        <Bell className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {announcements.map((announcement, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{announcement.title}</h3>
                                        <p className="text-xs text-gray-600">
                                            {new Date(announcement.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {announcement.type === 'warning' && (
                                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-blue-900 font-semibold hover:bg-blue-50 rounded-lg transition">
                        View All Announcements
                    </button>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-center group">
                        <Award className="w-8 h-8 text-blue-900 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">View Results</span>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition text-center group">
                        <DollarSign className="w-8 h-8 text-green-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">Pay Fees</span>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-center group">
                        <Clock className="w-8 h-8 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">Timetable</span>
                    </button>
                    <button className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition text-center group">
                        <User className="w-8 h-8 text-amber-700 mx-auto mb-2 group-hover:scale-110 transition" />
                        <span className="font-semibold text-gray-900">Contact Teacher</span>
                    </button>
                </div>
            </div>

        </div>
    )
}