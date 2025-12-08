import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendStatusUpdateEmail } from '@/lib/email'
import { AdmissionStatus } from '@prisma/client'

interface RouteParams {
    params: Promise<{ id: string }>
}

const STATUS_MAP: Record<string, AdmissionStatus> = {
    pending: 'PENDING',
    under_review: 'UNDER_REVIEW',
    approved: 'APPROVED',
    rejected: 'REJECTED',
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id: applicationId } = await params
        const body = await request.json()
        const { status } = body

        // Validate status
        const dbStatus = STATUS_MAP[status]
        if (!dbStatus) {
            return NextResponse.json(
                { success: false, message: 'Invalid status' },
                { status: 400 }
            )
        }

        // Update application status
        const application = await prisma.admission.update({
            where: { applicationId },
            data: {
                status: dbStatus,
                reviewedBy: session.user.id,
                reviewedAt: new Date(),
                updatedAt: new Date(),
            },
        })

        // Send email notification
        try {
            await sendStatusUpdateEmail(
                application.email,
                application.studentName,
                application.applicationId,
                status
            )
        } catch (emailError) {
            console.error('Failed to send status update email:', emailError)
            // Don't fail the request if email fails
        }

        return NextResponse.json({
            success: true,
            message: 'Status updated successfully',
            data: {
                ...application,
                status: status, // Return lowercase for frontend
            },
        })
    } catch (error) {
        console.error('Error updating status:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}