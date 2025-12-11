// src/app/api/admission/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { sendAdminNotification, sendConfirmationEmail } from '@/lib/email'

interface AdmissionData {
    studentName: string
    dateOfBirth: string
    gender: string
    grade: string
    previousSchool?: string
    fatherName: string
    fatherCNIC: string
    fatherPhone: string
    fatherOccupation?: string
    motherName: string
    motherCNIC?: string
    motherPhone?: string
    motherOccupation?: string
    address: string
    city: string
    emergencyContact?: string
    emergencyRelation?: string
    whatsappNumber: string
    email: string
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        // Extract all form fields
        const data: AdmissionData = {
            studentName: formData.get('studentName') as string,
            dateOfBirth: formData.get('dateOfBirth') as string,
            gender: formData.get('gender') as string,
            grade: formData.get('grade') as string,
            previousSchool: formData.get('previousSchool') as string || '',
            fatherName: formData.get('fatherName') as string,
            fatherCNIC: formData.get('fatherCNIC') as string,
            fatherPhone: formData.get('fatherPhone') as string,
            fatherOccupation: formData.get('fatherOccupation') as string || '',
            motherName: formData.get('motherName') as string,
            motherCNIC: formData.get('motherCNIC') as string || '',
            motherPhone: formData.get('motherPhone') as string || '',
            motherOccupation: formData.get('motherOccupation') as string || '',
            address: formData.get('address') as string,
            city: formData.get('city') as string,
            emergencyContact: formData.get('emergencyContact') as string || '',
            emergencyRelation: formData.get('emergencyRelation') as string || '',
            whatsappNumber: formData.get('whatsappNumber') as string,
            email: formData.get('email') as string,
        }

        // Basic validation
        if (!data.studentName || !data.email || !data.fatherName) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Generate unique application ID
        const applicationId = `IVS${Date.now()}`

        // Create uploads directory for this application
        const uploadDir = join(process.cwd(), 'public', 'uploads', applicationId)
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // Handle file uploads
        const files = {
            studentPhoto: formData.get('studentPhoto') as File | null,
            birthCertificate: formData.get('birthCertificate') as File | null,
            fatherCNICDoc: formData.get('fatherCNICDoc') as File | null,
            motherCNICDoc: formData.get('motherCNICDoc') as File | null,
        }

        const filePaths: Record<string, string> = {}

        for (const [key, file] of Object.entries(files)) {
            if (file && file.size > 0) {
                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)
                const filename = `${key}_${Date.now()}_${file.name}`
                const filepath = join(uploadDir, filename)

                await writeFile(filepath, buffer)
                filePaths[key] = `/uploads/${applicationId}/${filename}`
            }
        }

        // ✅ SAVE TO DATABASE using Prisma
        const admission = await prisma.admission.create({
            data: {
                applicationId,

                // Student Information
                studentName: data.studentName,
                dateOfBirth: new Date(data.dateOfBirth),
                gender: data.gender.toUpperCase() as 'MALE' | 'FEMALE',
                grade: data.grade,
                previousSchool: data.previousSchool || null,

                // Father Information
                fatherName: data.fatherName,
                fatherCNIC: data.fatherCNIC,
                fatherPhone: data.fatherPhone,
                fatherOccupation: data.fatherOccupation || null,

                // Mother Information
                motherName: data.motherName,
                motherCNIC: data.motherCNIC || null,
                motherPhone: data.motherPhone || null,
                motherOccupation: data.motherOccupation || null,

                // Contact Details
                address: data.address,
                city: data.city,
                whatsappNumber: data.whatsappNumber,
                email: data.email,
                emergencyContact: data.emergencyContact || null,
                emergencyRelation: data.emergencyRelation || null,

                // Document URLs
                studentPhotoUrl: filePaths.studentPhoto || null,
                birthCertUrl: filePaths.birthCertificate || null,
                fatherCNICUrl: filePaths.fatherCNICDoc || null,
                motherCNICUrl: filePaths.motherCNICDoc || null,

                // Status (default is PENDING from schema)
                status: 'PENDING',
            },
        })

        // Send email notifications
        try {
            await sendAdminNotification(admission)
            await sendConfirmationEmail(data.email, applicationId, data.studentName)
        } catch (emailError) {
            console.error('Email notification error:', emailError)
            // Don't fail the request if emails fail
        }

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            applicationId,
        })

    } catch (error) {
        console.error('Admission API Error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

// GET endpoint to retrieve application status
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('id')

    if (!applicationId) {
        return NextResponse.json(
            { success: false, message: 'Application ID required' },
            { status: 400 }
        )
    }

    try {
        const application = await prisma.admission.findUnique({
            where: { applicationId },
            select: {
                applicationId: true,
                studentName: true,
                grade: true,
                status: true,
                createdAt: true,
            },
        })

        if (!application) {
            return NextResponse.json(
                { success: false, message: 'Application not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: {
                ...application,
                status: application.status.toLowerCase(), // Convert to lowercase for frontend
            }
        })
    } catch (error) {
        console.error('Error fetching application:', error)
        return NextResponse.json(
            { success: false, message: 'Error retrieving application' },
            { status: 500 }
        )
    }
}