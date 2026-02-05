// src/app/api/admin/fees/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FeeStatus } from '@prisma/client'

interface RouteParams {
    params: Promise<{ id: string }>
}

// PUT - Update fee payment
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const { paidAmount, paymentMethod, voucherNumber } = body

        const feeRecord = await prisma.feeRecord.findUnique({ where: { id } })
        if (!feeRecord) {
            return NextResponse.json({ success: false, message: 'Fee record not found' }, { status: 404 })
        }

        const totalPaid = feeRecord.paidAmount + parseFloat(paidAmount)
        let status: FeeStatus = 'UNPAID'
        if (totalPaid >= feeRecord.amount) status = 'PAID'
        else if (totalPaid > 0) status = 'PARTIALLY_PAID'

        const updated = await prisma.feeRecord.update({
            where: { id },
            data: {
                paidAmount: totalPaid,
                paidDate: new Date(),
                status,
                paymentMethod,
                voucherNumber,
            },
        })

        return NextResponse.json({ success: true, data: updated })
    } catch (error) {
        console.error('Update fee payment error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}