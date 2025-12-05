import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendStatusUpdateEmail } from '@/lib/email'

// PUT - Update application status
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const applicationId = params.id
        const body = await request.json()
        const { status } = body

        // Validate status
        const validStatuses = ['pending', 'under_review', 'approved', 'rejected']
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: 'Invalid status' },
                { status: 400 }
            )
        }

        // Update application status
        const application = await prisma.admission.update({
            where: { applicationId },
            data: {
                status,
                updatedAt: new Date()
            }
        })

        // Send email notification
        await sendStatusUpdateEmail(
            application.email,
            application.studentName,
            application.applicationId,
            status
        )

        return NextResponse.json({
            success: true,
            message: 'Status updated successfully',
            data: application
        })

    } catch (error) {
        console.error('Error updating status:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}