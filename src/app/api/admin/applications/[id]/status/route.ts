import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SupabaseService } from '@/lib/services/supabase-service'
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
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { id: applicationId } = await params
        const body = await request.json()
        const { status } = body

        const dbStatus = STATUS_MAP[status]
        if (!dbStatus) {
            return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 })
        }

        // 1. Get current application
        const application = await prisma.admission.findUnique({
            where: { applicationId }
        })

        if (!application) {
            return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 })
        }

        // 2. If transitioning to APPROVED, sync with Supabase
        if (dbStatus === 'APPROVED' && application.status !== 'APPROVED') {
            console.log(`🚀 Approving application ${applicationId}. Syncing to Supabase...`)

            // Extract grade level number
            const gradeLevel = parseInt(application.grade.replace(/\D/g, '')) || 1

            // Find target class (Default to section A for now)
            const { data: classData } = await SupabaseService.findClass(gradeLevel, 'A')

            if (!classData) {
                console.warn(`⚠️ Target class (Grade ${gradeLevel}, Sec A) not found in Supabase. Creation will proceed without class link.`)
            }

            // Prepare student data
            const [firstName, ...lastNames] = application.studentName.split(' ')
            const lastName = lastNames.join(' ') || 'N/A'
            const studentId = `IVS-${new Date().getFullYear()}-${applicationId.slice(-4)}`

            const studentPayload = {
                student_id: studentId,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: application.dateOfBirth,
                gender: application.gender.toLowerCase(),
                class_id: classData?.id || null,
                status: 'active',
                photo_url: application.studentPhotoUrl
            }

            const parentPayload = {
                full_name: application.fatherName,
                phone: application.fatherPhone,
                relationship: 'father'
            }

            // Sync to Supabase
            const { error: syncError, warning } = await SupabaseService.createStudentWithParent(
                studentPayload,
                parentPayload
            )

            if (syncError) {
                console.error('❌ Supabase Sync Error during approval:', syncError)
                // We proceed with Prisma update but return warning in response
            } else {
                console.log('✅ Supabase Sync Successful for student:', studentId)
            }
        }

        // 3. Update application status in Prisma
        const updatedApplication = await prisma.admission.update({
            where: { applicationId },
            data: {
                status: dbStatus,
                reviewedBy: session.user.id,
                reviewedAt: new Date(),
                updatedAt: new Date(),
            },
        })

        // 4. Send email notification
        try {
            await sendStatusUpdateEmail(
                updatedApplication.email,
                updatedApplication.studentName,
                updatedApplication.applicationId,
                status
            )
        } catch (emailError) {
            console.error('Failed to send status update email:', emailError)
        }

        return NextResponse.json({
            success: true,
            message: 'Status updated and synced successfully',
            data: {
                ...updatedApplication,
                status: status,
            },
        })
    } catch (error) {
        console.error('Error updating status:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}