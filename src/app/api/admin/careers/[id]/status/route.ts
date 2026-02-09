// src/app/api/admin/careers/[id]/status/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const application = await prisma.teacherApplication.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json({ success: true, data: application });
    } catch (error) {
        console.error('Careers Status Update Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update status' }, { status: 500 });
    }
}
