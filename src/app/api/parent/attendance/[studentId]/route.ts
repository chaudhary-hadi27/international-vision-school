// src/app/api/parent/attendance/[studentId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
    params: Promise<{ studentId: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'PARENT') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { studentId } = await params

        // Verify student belongs to parent
        const student = await prisma.student.findFirst({
            where: {
                id: studentId,
                parent: { userId: session.user.id },
            },
        })

        if (!student) {
            return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 })
        }

        // Get last 30 days attendance
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 30)

        const attendance = await prisma.attendance.findMany({
            where: {
                studentId,
                date: { gte: startDate },
            },
            orderBy: { date: 'desc' },
        })

        // Calculate stats
        const total = attendance.length
        const present = attendance.filter(a => a.status === 'PRESENT').length
        const absent = attendance.filter(a => a.status === 'ABSENT').length
        const leave = attendance.filter(a => a.status === 'LEAVE').length
        const percentage = total > 0 ? Math.round((present / total) * 100) : 0

        return NextResponse.json({
            success: true,
            data: {
                attendance,
                stats: { total, present, absent, leave, percentage },
            },
        })
    } catch (error) {
        console.error('Get attendance error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}