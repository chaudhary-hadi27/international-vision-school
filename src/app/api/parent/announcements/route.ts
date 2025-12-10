// src/app/api/parent/announcements/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'PARENT') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const studentId = searchParams.get('studentId')

        if (!studentId) {
            return NextResponse.json({ success: false, message: 'Student ID required' }, { status: 400 })
        }

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

        const now = new Date()

        const announcements = await prisma.announcement.findMany({
            where: {
                isActive: true,
                publishDate: { lte: now },
                OR: [
                    { expiryDate: null },
                    { expiryDate: { gte: now } },
                ],
                AND: [
                    {
                        OR: [
                            { targetAudience: { has: 'parents' } },
                            { targetAudience: { has: 'all' } },
                        ],
                    },
                    {
                        OR: [
                            { targetGrades: { has: student.grade } },
                            { targetGrades: { has: 'all' } },
                        ],
                    },
                ],
            },
            orderBy: [
                { priority: 'desc' },
                { publishDate: 'desc' },
            ],
            take: 20,
        })

        return NextResponse.json({ success: true, data: announcements })
    } catch (error) {
        console.error('Get announcements error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}