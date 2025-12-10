// src/app/api/parent/fees/[studentId]/route.ts
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

        const fees = await prisma.feeRecord.findMany({
            where: { studentId },
            orderBy: { dueDate: 'desc' },
        })

        const totalAmount = fees.reduce((sum, f) => sum + Number(f.amount), 0)
        const totalPaid = fees.reduce((sum, f) => sum + Number(f.paidAmount), 0)
        const totalDue = totalAmount - totalPaid
        const unpaidCount = fees.filter(f => f.status !== 'PAID').length

        return NextResponse.json({
            success: true,
            data: {
                fees,
                summary: { totalAmount, totalPaid, totalDue, unpaidCount },
            },
        })
    } catch (error) {
        console.error('Get fees error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}