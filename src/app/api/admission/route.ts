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
        // Test database connection first
        try {
            await prisma.$queryRaw`SELECT 1`
            console.log('✅ Database connection test passed')
        } catch (dbError) {
            console.error('❌ Database connection test failed:', dbError)
            return NextResponse.json(
                {
                    success: false,
                    message: 'Database connection failed. Please try again later.',
                    error: dbError instanceof Error ? dbError.message : 'Database error'
                },
                { status: 503 }
            )
        }

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

        // Create a structured folder in Cloudinary
        const currentYear = new Date().getFullYear()
        const cloudinaryFolder = `admissions/${currentYear}/${applicationId}`

        // Handle file uploads with Cloudinary
        const files = {
            studentPhoto: formData.get('studentPhoto') as File | null,
            birthCertificate: formData.get('birthCertificate') as File | null,
            fatherCNICDoc: formData.get('fatherCNICDoc') as File | null,
            motherCNICDoc: formData.get('motherCNICDoc') as File | null,
        }

        const filePaths: Record<string, string> = {}
        const { uploadImage } = await import('@/lib/cloudinary')

        for (const [key, file] of Object.entries(files)) {
            if (file && file.size > 0) {
                try {
                    // Convert File to base64 for Cloudinary
                    const bytes = await file.arrayBuffer()
                    const buffer = Buffer.from(bytes)
                    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`

                    const uploadResult = await uploadImage(base64Data, cloudinaryFolder)

                    if (uploadResult.success && uploadResult.url) {
                        filePaths[key] = uploadResult.url
                        console.log(`✅ File uploaded to Cloudinary [${key}]: ${uploadResult.url}`)
                    } else {
                        console.error(`❌ Cloudinary upload failed for ${key}:`, uploadResult.error)
                    }
                } catch (fileError) {
                    console.error(`❌ File processing error for ${key}:`, fileError)
                }
            }
        }

        console.log('📝 Attempting to save admission to database...')

        // ✅ SAVE TO DATABASE using Prisma with retry logic
        let admission
        let retries = 3
        let lastError

        while (retries > 0) {
            try {
                admission = await prisma.admission.create({
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

                console.log('✅ Admission saved successfully:', applicationId)
                break // Success, exit retry loop
            } catch (error) {
                lastError = error
                retries--
                console.error(`❌ Database save attempt failed. Retries left: ${retries}`, error)

                if (retries > 0) {
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            }
        }

        if (!admission) {
            console.error('❌ All database save attempts failed')
            return NextResponse.json(
                {
                    success: false,
                    message: 'Failed to save application to database. Please try again.',
                    error: lastError instanceof Error ? lastError.message : 'Database error',
                    applicationId // Still return ID so files aren't lost
                },
                { status: 500 }
            )
        }

        // Send email notifications
        try {
            await sendAdminNotification(admission)
            await sendConfirmationEmail(data.email, applicationId, data.studentName)
            console.log('✅ Email notifications sent')
        } catch (emailError) {
            console.error('❌ Email notification error:', emailError)
            // Don't fail the request if emails fail
        }

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            applicationId,
        })

    } catch (error) {
        console.error('❌ Admission API Error:', error)

        // Provide more detailed error information
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        const errorStack = error instanceof Error ? error.stack : undefined

        console.error('Error details:', {
            message: errorMessage,
            stack: errorStack,
        })

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error',
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? errorStack : undefined
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
                status: application.status.toLowerCase(),
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