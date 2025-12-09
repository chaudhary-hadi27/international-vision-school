// src/app/actions/admin.ts
'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Type-safe action with validation
const updateApplicationStatusSchema = z.object({
    applicationId: z.string(),
    status: z.enum(['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED']),
})

export async function updateApplicationStatus(
    formData: FormData | { applicationId: string; status: string }
) {
    try {
        // Auth check
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return { success: false, error: 'Unauthorized' }
        }

        // Get data from FormData or object
        const data = formData instanceof FormData
            ? Object.fromEntries(formData)
            : formData

        // Validate
        const validated = updateApplicationStatusSchema.parse(data)

        // Update in DB
        const application = await prisma.admission.update({
            where: { applicationId: validated.applicationId },
            data: {
                status: validated.status,
                reviewedBy: session.user.id,
                reviewedAt: new Date(),
            },
        })

        // Revalidate cache
        revalidatePath('/admin/applications')
        revalidatePath(`/admin/applications/${validated.applicationId}`)

        return { success: true, data: application }
    } catch (error) {
        console.error('Update status error:', error)
        if (error instanceof z.ZodError) {
            return { success: false, error: 'Invalid data', details: error.errors }
        }
        return { success: false, error: 'Failed to update status' }
    }
}

// Get applications (can be used in Server Components)
export async function getApplications() {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            throw new Error('Unauthorized')
        }

        const applications = await prisma.admission.findMany({
            orderBy: { createdAt: 'desc' },
        })

        return applications
    } catch (error) {
        console.error('Get applications error:', error)
        throw error
    }
}

// Get single application
export async function getApplication(applicationId: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            throw new Error('Unauthorized')
        }

        const application = await prisma.admission.findUnique({
            where: { applicationId },
        })

        if (!application) {
            throw new Error('Application not found')
        }

        return application
    } catch (error) {
        console.error('Get application error:', error)
        throw error
    }
}