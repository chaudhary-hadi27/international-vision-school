import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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

        const application = await prisma.admission.findUnique({
            where: { applicationId },
        })

        if (!application) {
            return NextResponse.json(
                { success: false, message: 'Application not found' },
                { status: 404 }
            )
        }

        // Transform status to lowercase for frontend
        const transformedApplication = {
            ...application,
            status: application.status.toLowerCase(),
        }

        return NextResponse.json({
            success: true,
            data: transformedApplication,
        })
    } catch (error) {
        console.error('Error fetching application:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}