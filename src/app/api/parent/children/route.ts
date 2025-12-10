// src/app/api/parent/children/route.ts
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

        const parent = await prisma.parent.findUnique({
            where: { userId: session.user.id },
            include: {
                children: {
                    where: { status: 'ACTIVE' },
                    select: {
                        id: true,
                        name: true,
                        rollNumber: true,
                        grade: true,
                        section: true,
                        photoUrl: true,
                    },
                    orderBy: { grade: 'asc' },
                },
            },
        })

        if (!parent) {
            return NextResponse.json({ success: false, message: 'Parent not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: parent.children })
    } catch (error) {
        console.error('Get children error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}