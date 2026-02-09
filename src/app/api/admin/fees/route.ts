import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SupabaseService } from '@/lib/services/supabase-service'
import { z } from 'zod'

// GET - Fetch fee records (History of payments)
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const studentId = searchParams.get('studentId')

        const { data: payments, error } = await SupabaseService.getFeePayments({
            studentId: studentId || undefined
        })

        if (error) {
            console.error('Supabase fetch fee payments error:', error)
            return NextResponse.json({ success: false, message: 'Error fetching fee records' }, { status: 500 })
        }

        // Transform to match frontend expectations
        const transformedData = payments?.map(payment => ({
            id: payment.id,
            studentId: payment.student_id,
            amount: payment.amount_paid,
            paidAmount: payment.amount_paid,
            status: 'PAID', // In this view, they are all paid records
            paymentDate: payment.payment_date,
            month: new Date(payment.payment_date).toLocaleString('default', { month: 'long' }),
            voucherNumber: payment.receipt_number,
            paymentMethod: payment.payment_method,
            remarks: payment.remarks,
            student: {
                id: payment.student_id,
                name: `${payment.student?.first_name} ${payment.student?.last_name}`,
                rollNumber: payment.student?.student_id,
                grade: payment.student?.class?.grade_level ? `Class ${payment.student.class.grade_level}` : 'N/A',
                section: payment.student?.class?.section || 'N/A',
            }
        }))

        return NextResponse.json({ success: true, data: transformedData })
    } catch (error) {
        console.error('Get fees error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}

// POST - Record a new fee payment
const feePaymentSchema = z.object({
    studentId: z.string(),
    feeStructureId: z.string().optional(), // In case they select a specific fee type
    amount: z.number().positive(),
    paymentDate: z.string(),
    paymentMethod: z.string().optional(),
    receiptNumber: z.string().optional(),
    remarks: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validated = feePaymentSchema.parse(body)

        // Find a default fee structure if none provided
        let feeStructureId = validated.feeStructureId
        if (!feeStructureId) {
            const { data: structures } = await SupabaseService.getFeeStructure()
            feeStructureId = structures?.[0]?.id // Fallback to first one for now
        }

        const paymentRecord = {
            student_id: validated.studentId,
            fee_structure_id: feeStructureId,
            amount_paid: validated.amount,
            payment_date: validated.paymentDate,
            payment_method: validated.paymentMethod || 'Cash',
            receipt_number: validated.receiptNumber || `R-${Date.now()}`,
            remarks: validated.remarks,
            collected_by: session.user.id
        }

        const { data, error } = await SupabaseService.createFeePayment(paymentRecord)

        if (error) {
            console.error('Supabase create fee payment error:', error)
            return NextResponse.json({ success: false, message: 'Error recording payment' }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            )
        }
        console.error('Create fee payment error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}