// src/app/api/admin/careers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const applications = await prisma.teacherApplication.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ success: true, data: applications });
    } catch (error) {
        console.error('Careers Fetch Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch applications' }, { status: 500 });
    }
}
