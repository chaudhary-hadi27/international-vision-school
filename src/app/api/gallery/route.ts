// src/app/api/gallery/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        const where: any = {};
        if (category && category !== 'All') {
            where.category = category;
        }
        if (featured === 'true') {
            where.isFeatured = true;
        }

        const images = await prisma.galleryImage.findMany({
            where,
            orderBy: [
                { isFeatured: 'desc' },
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json({ success: true, data: images });
    } catch (error) {
        console.error('Gallery Fetch Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 });
    }
}
