// src/app/api/admin/gallery/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { url, category, title, description, isFeatured } = body;

        if (!url) {
            return NextResponse.json({ success: false, error: 'Image URL is required' }, { status: 400 });
        }

        const image = await prisma.galleryImage.create({
            data: {
                url,
                category: category || 'Campus',
                title,
                description,
                isFeatured: isFeatured || false,
            }
        });

        return NextResponse.json({ success: true, data: image });
    } catch (error) {
        console.error('Gallery Create Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to create gallery image' }, { status: 500 });
    }
}
