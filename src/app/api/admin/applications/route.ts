// src/app/api/admin/applications/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Fetch all applications from database
        const applications = await prisma.admission.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                applicationId: true,
                studentName: true,
                fatherName: true,
                grade: true,
                fatherPhone: true,
                email: true,
                status: true,
                createdAt: true,
            },
        })

        // Transform data for frontend
        const transformedApplications = applications.map((app) => ({
            id: app.id,
            applicationId: app.applicationId,
            studentName: app.studentName,
            fatherName: app.fatherName,
            grade: app.grade,
            phone: app.fatherPhone,
            email: app.email,
            status: app.status.toLowerCase(), // Convert PENDING to pending
            dateApplied: app.createdAt.toISOString(),
        }))

        return NextResponse.json({
            success: true,
            data: transformedApplications,
        })
    } catch (error) {
        console.error('Error fetching applications:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}