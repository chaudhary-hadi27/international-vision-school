import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SupabaseService } from '@/lib/services/supabase-service'
import { z } from 'zod'

const classSchema = z.object({
    name: z.string().min(2),
    gradeLevel: z.number().int().min(0).max(12),
    section: z.string().min(1),
    academicYear: z.string().min(4),
    roomNumber: z.string().optional(),
    capacity: z.number().int().optional(),
    teacherId: z.string().uuid().optional().nullable(),
})

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { data: classes, error } = await SupabaseService.getClasses()

        if (error) {
            console.error('Supabase fetch classes error:', error)
            return NextResponse.json({ success: false, message: 'Error fetching classes' }, { status: 500 })
        }

        return NextResponse.json({ success: true, data: classes })
    } catch (error) {
        console.error('Get classes error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validated = classSchema.parse(body)

        const classPayload = {
            name: validated.name,
            grade_level: validated.gradeLevel,
            section: validated.section,
            academic_year: validated.academicYear,
            room_number: validated.roomNumber,
            capacity: validated.capacity || 30,
            teacher_id: validated.teacherId
        }

        const { data, error } = await SupabaseService.createClass(classPayload)

        if (error) {
            console.error('Supabase create class error:', error)
            return NextResponse.json({ success: false, message: 'Error creating class', error }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: 'Validation error', errors: error.errors }, { status: 400 })
        }
        console.error('Create class error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}
