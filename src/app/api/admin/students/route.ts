import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createStudentSchema = z.object({
    name: z.string().min(3),
    fatherName: z.string().min(3),
    motherName: z.string().optional(),
    dateOfBirth: z.string(),
    gender: z.enum(['MALE', 'FEMALE']),
    grade: z.string(),
    section: z.string(),
    rollNumber: z.string().optional(),
    admissionDate: z.string().optional(),
    address: z.string(),
    city: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    email: z.string().email().optional(),
    previousSchool: z.string().optional(),
    medicalInfo: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'ALUMNI', 'SUSPENDED']).optional(),
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

        const students = await prisma.student.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                parent: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                                phone: true,
                            },
                        },
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            data: students,
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

        // Validate request body
        const validatedData = createStudentSchema.parse(body)

        // Check if roll number exists
        if (validatedData.rollNumber) {
            const existing = await prisma.student.findUnique({
                where: { rollNumber: validatedData.rollNumber },
            })
            if (existing) {
                return NextResponse.json(
                    { success: false, message: 'Roll number already exists' },
                    { status: 400 }
                )
            }
        }

        // Note: In production, you need to link student to a parent
        // For now, this will fail without a valid parentId
        // You should create/find parent first, then create student

        return NextResponse.json(
            { success: false, message: 'Parent linking not implemented. Create parent first.' },
            { status: 501 }
        )
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