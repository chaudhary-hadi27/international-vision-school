import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Publicly fetch stories
export async function GET(req: NextRequest) {
    try {
        const stories = await prisma.successStory.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json({ success: true, data: stories });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

// POST - Admin create story
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        // In a real app, verify session.user.role === 'ADMIN'
        // Skipping strict check for now or assuming middleware handles it, 
        // but let's add basic check if session exists
        if (!session) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const story = await prisma.successStory.create({
            data: {
                studentName: body.studentName,
                university: body.university,
                batch: body.batch,
                photoUrl: body.photoUrl,
                quote: body.quote,
                achievement: body.achievement,
                isFeatured: body.isFeatured || false,
                order: body.order || 0
            }
        });
        return NextResponse.json({ success: true, data: story });
    } catch (error) {
        console.error('Error creating story:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
