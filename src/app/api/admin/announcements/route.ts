// src/app/api/admin/announcements/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - Fetch announcements
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const announcements = await prisma.announcement.findMany({
            orderBy: [
                { priority: 'desc' },
                { publishDate: 'desc' },
            ],
        })

        return NextResponse.json({ success: true, data: announcements })
    } catch (error) {
        console.error('Get announcements error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}

// POST - Create announcement
const announcementSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    type: z.enum(['GENERAL', 'ACADEMIC', 'EVENT', 'HOLIDAY', 'URGENT', 'FEE']),
    priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
    targetAudience: z.array(z.string()),
    targetGrades: z.array(z.string()),
    publishDate: z.string().optional(),
    expiryDate: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validated = announcementSchema.parse(body)

        const announcement = await prisma.announcement.create({
            data: {
                title: validated.title,
                content: validated.content,
                type: validated.type,
                priority: validated.priority,
                targetAudience: validated.targetAudience,
                targetGrades: validated.targetGrades,
                publishDate: validated.publishDate ? new Date(validated.publishDate) : new Date(),
                expiryDate: validated.expiryDate ? new Date(validated.expiryDate) : null,
                createdBy: session.user.id,
                isActive: true,
            },
        })

        return NextResponse.json({ success: true, data: announcement })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            )
        }
        console.error('Create announcement error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}