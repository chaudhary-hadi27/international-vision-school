import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, email, phone, qualification, experience, subject, coverLetter } = body;

        // Basic validation
        if (!fullName || !email || !phone || !qualification || !subject) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const application = await prisma.teacherApplication.create({
            data: {
                fullName,
                email,
                phone,
                qualification,
                experience,
                subject,
                coverLetter,
                status: 'PENDING'
            }
        });

        return NextResponse.json({
            success: true,
            data: application,
            message: 'Application submitted successfully'
        });

    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
