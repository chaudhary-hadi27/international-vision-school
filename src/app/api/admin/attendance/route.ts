import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SupabaseService } from '@/lib/services/supabase-service'
import { z } from 'zod'

// GET - Fetch attendance for a date
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
        const grade = searchParams.get('grade')
        const section = searchParams.get('section')

        // Convert grade string (e.g. "Class 5") to number (5)
        const gradeLevel = grade ? parseInt(grade.replace(/\D/g, '')) : undefined

        const { data: attendance, error } = await SupabaseService.getAttendance({
            date,
            gradeLevel,
            section: section || undefined
        })

        if (error) {
            console.error('Supabase fetch attendance error:', error)
            return NextResponse.json({ success: false, message: 'Error fetching attendance' }, { status: 500 })
        }

        // Transform to match frontend expectations
        const transformedData = attendance?.map(record => ({
            id: record.id,
            studentId: record.student_id,
            date: record.date,
            status: record.status.toUpperCase(), // Frontend might expect uppercase
            remarks: record.remarks,
            student: {
                id: record.student_id,
                name: `${record.student?.first_name} ${record.student?.last_name}`,
                rollNumber: record.student?.student_id,
                grade: record.student?.class?.grade_level ? `Class ${record.student.class.grade_level}` : 'N/A',
                section: record.student?.class?.section || 'N/A',
            }
        }))

        return NextResponse.json({ success: true, data: transformedData })
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

        // For Mark Attendance, we need the student's current class_id for historical accuracy
        // Let's find the student first
        const { data: students } = await SupabaseService.getStudents({ query: validated.studentId })
        const student = students?.find(s => s.id === validated.studentId || s.student_id === validated.studentId)

        if (!student) {
            return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 })
        }

        const attendanceRecord = {
            student_id: student.id,
            class_id: student.class_id,
            date: validated.date,
            status: validated.status.toLowerCase(),
            remarks: validated.remarks,
            marked_by: session.user.id
        }

        const { error } = await SupabaseService.markAttendance([attendanceRecord])

        if (error) {
            console.error('Supabase mark attendance error:', error)
            return NextResponse.json({ success: false, message: 'Error marking attendance' }, { status: 500 })
        }

        return NextResponse.json({ success: true, message: 'Attendance marked successfully' })
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