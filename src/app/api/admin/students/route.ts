import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SupabaseService } from '@/lib/services/supabase-service'
import { z } from 'zod'

const createStudentSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    gradeLevel: z.number(),
    section: z.string(),
    dateOfBirth: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    fatherName: z.string().min(3),
    phone: z.string(),
    address: z.string().optional(),
    bloodGroup: z.string().optional(),
})

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { data: students, error } = await SupabaseService.getStudents()

        if (error) {
            console.error('Supabase error fetching students:', error)
            return NextResponse.json(
                { success: false, message: 'Error fetching students from Supabase' },
                { status: 500 }
            )
        }

        // Transform data to match frontend expectations
        const transformedStudents = students?.map(s => {
            const primaryParent = s.parents?.find((p: any) => p.is_primary) || s.parents?.[0]
            return {
                id: s.id,
                studentId: s.student_id,
                name: `${s.first_name} ${s.last_name}`,
                grade: s.class?.grade_level ? `Class ${s.class.grade_level}` : 'Unassigned',
                section: s.class?.section || 'N/A',
                rollNo: s.student_id,
                fatherName: primaryParent?.parent?.full_name || 'N/A',
                phone: primaryParent?.parent?.phone || 'N/A',
                status: (s.status?.toUpperCase() || 'ACTIVE') as any
            }
        })

        return NextResponse.json({
            success: true,
            data: transformedStudents,
        })
    } catch (error) {
        console.error('Error fetching students:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const validatedData = createStudentSchema.parse(body)

        // 1. Find the class ID
        const { data: classData, error: classError } = await SupabaseService.findClass(
            validatedData.gradeLevel,
            validatedData.section
        )

        if (classError || !classData) {
            return NextResponse.json(
                { success: false, message: `Class not found for Grade ${validatedData.gradeLevel} Section ${validatedData.section}` },
                { status: 400 }
            )
        }

        // 2. Generate Roll Number / Student ID
        const studentId = `IVS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

        // 3. Create Student with Parent Link
        const studentPayload = {
            student_id: studentId,
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            date_of_birth: validatedData.dateOfBirth,
            gender: validatedData.gender,
            class_id: classData.id,
            blood_group: validatedData.bloodGroup,
            status: 'active',
            medical_conditions: 'N/A'
        }

        const parentPayload = {
            full_name: validatedData.fatherName,
            phone: validatedData.phone,
            relationship: 'father'
        }

        const { data: student, error: createError, warning } = await SupabaseService.createStudentWithParent(
            studentPayload,
            parentPayload
        )

        if (createError) {
            console.error('Error creating student in Supabase:', createError)
            return NextResponse.json(
                { success: false, message: 'Error creating student', error: createError },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Student created successfully',
            data: student,
            warning // Include warning if parent profile not linked
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            )
        }

        console.error('Error adding student:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}