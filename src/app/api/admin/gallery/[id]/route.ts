// src/app/api/admin/gallery/[id]/route.ts
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
        const { url, category, title, description, isFeatured } = body;

        const image = await prisma.galleryImage.update({
            where: { id },
            data: {
                url,
                category,
                title,
                description,
                isFeatured,
            }
        });

        return NextResponse.json({ success: true, data: image });
    } catch (error) {
        console.error('Gallery Update Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update gallery image' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.galleryImage.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Gallery Delete Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete gallery image' }, { status: 500 });
    }
}
