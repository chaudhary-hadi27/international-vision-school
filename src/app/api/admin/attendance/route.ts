// src/app/api/admin/attendance/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - Fetch attendance for a date
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const date = searchParams.get('date')
        const grade = searchParams.get('grade')
        const section = searchParams.get('section')

        const where: any = {}
        if (date) where.date = new Date(date)
        if (grade || section) {
            where.student = {}
            if (grade) where.student.grade = grade
            if (section) where.student.section = section
        }

        const attendance = await prisma.attendance.findMany({
            where,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        rollNumber: true,
                        grade: true,
                        section: true,
                    },
                },
            },
            orderBy: { date: 'desc' },
        })

        return NextResponse.json({ success: true, data: attendance })
    } catch (error) {
        console.error('Get attendance error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}

// POST - Mark attendance
const markAttendanceSchema = z.object({
    studentId: z.string(),
    date: z.string(),
    status: z.enum(['PRESENT', 'ABSENT', 'LEAVE', 'LATE']),
    remarks: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validated = markAttendanceSchema.parse(body)

        const attendance = await prisma.attendance.upsert({
            where: {
                studentId_date: {
                    studentId: validated.studentId,
                    date: new Date(validated.date),
                },
            },
            update: {
                status: validated.status,
                remarks: validated.remarks,
                markedBy: session.user.id,
            },
            create: {
                studentId: validated.studentId,
                date: new Date(validated.date),
                status: validated.status,
                remarks: validated.remarks,
                markedBy: session.user.id,
            },
        })

        return NextResponse.json({ success: true, data: attendance })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            )
        }
        console.error('Mark attendance error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}