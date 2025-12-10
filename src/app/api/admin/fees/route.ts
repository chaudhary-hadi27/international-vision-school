// src/app/api/admin/fees/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - Fetch fee records
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const month = searchParams.get('month')

        const where: any = {}
        if (status) where.status = status.toUpperCase()
        if (month) where.month = month

        const fees = await prisma.feeRecord.findMany({
            where,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        rollNumber: true,
                        grade: true,
                        section: true,
                        parent: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        phone: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        })

        return NextResponse.json({ success: true, data: fees })
    } catch (error) {
        console.error('Get fees error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}

// POST - Create/Update fee record
const feeRecordSchema = z.object({
    studentId: z.string(),
    month: z.string(),
    amount: z.number().positive(),
    dueDate: z.string(),
    remarks: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validated = feeRecordSchema.parse(body)

        const feeRecord = await prisma.feeRecord.create({
            data: {
                studentId: validated.studentId,
                month: validated.month,
                amount: validated.amount,
                dueDate: new Date(validated.dueDate),
                remarks: validated.remarks,
                status: 'UNPAID',
            },
        })

        return NextResponse.json({ success: true, data: feeRecord })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            )
        }
        console.error('Create fee record error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}