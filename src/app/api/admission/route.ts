// src/app/api/admission/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Email service (you can use Resend, NodeMailer, or any other)
// For now, we'll just log the data

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
        const timestamp = new Date().toISOString()

        // Create uploads directory if it doesn't exist
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

        // Store application in database (for now, we'll use a JSON file)
        // In production, use PostgreSQL, MongoDB, or any database
        const applicationData = {
            applicationId,
            timestamp,
            status: 'pending',
            ...data,
            files: filePaths,
        }

        // Save to a JSON file (temporary storage)
        const dataDir = join(process.cwd(), 'data', 'admissions')
        if (!existsSync(dataDir)) {
            await mkdir(dataDir, { recursive: true })
        }

        const dataFile = join(dataDir, `${applicationId}.json`)
        await writeFile(dataFile, JSON.stringify(applicationData, null, 2))

        // TODO: Send email to admin
        await sendAdminNotification(applicationData)

        // TODO: Send confirmation email to parent
        await sendConfirmationEmail(data.email, applicationId, data.studentName)

        // TODO: Send WhatsApp notification (optional)
        // await sendWhatsAppNotification(data.whatsappNumber, applicationId)

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            applicationId,
        })

    } catch (error) {
        console.error('Admission API Error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Email notification functions
async function sendAdminNotification(data: any) {
    // TODO: Implement email sending
    // Using Resend, NodeMailer, or SendGrid
    console.log('Admin Notification:', {
        to: 'admin@ivs.edu.pk',
        subject: `New Admission Application - ${data.applicationId}`,
        student: data.studentName,
        grade: data.grade,
    })

    // Example with Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'IVS Admissions <admissions@ivs.edu.pk>',
      to: 'admin@ivs.edu.pk',
      subject: `New Admission Application - ${data.applicationId}`,
      html: `
        <h2>New Admission Application</h2>
        <p><strong>Application ID:</strong> ${data.applicationId}</p>
        <p><strong>Student Name:</strong> ${data.studentName}</p>
        <p><strong>Grade:</strong> ${data.grade}</p>
        <p><strong>Father Name:</strong> ${data.fatherName}</p>
        <p><strong>Phone:</strong> ${data.fatherPhone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><a href="https://ivs.edu.pk/admin/applications/${data.applicationId}">View Full Application</a></p>
      `
    })
    */
}

async function sendConfirmationEmail(email: string, applicationId: string, studentName: string) {
    console.log('Confirmation Email:', {
        to: email,
        subject: `Application Received - ${applicationId}`,
        student: studentName,
    })

    // TODO: Send actual email
    /*
    await resend.emails.send({
      from: 'IVS Admissions <admissions@ivs.edu.pk>',
      to: email,
      subject: 'Admission Application Received',
      html: `
        <h2>Thank You for Applying to IVS!</h2>
        <p>Dear Parent/Guardian,</p>
        <p>We have received the admission application for <strong>${studentName}</strong>.</p>
        <p><strong>Application ID:</strong> ${applicationId}</p>
        <p>Our admissions team will review your application and contact you within 2-3 business days.</p>
        <p>You can track your application status at: <a href="https://ivs.edu.pk/admission-portal/status">Track Application</a></p>
        <br>
        <p>Best Regards,<br>IVS Admissions Team</p>
      `
    })
    */
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
        const dataFile = join(process.cwd(), 'data', 'admissions', `${applicationId}.json`)

        if (!existsSync(dataFile)) {
            return NextResponse.json(
                { success: false, message: 'Application not found' },
                { status: 404 }
            )
        }

        const fs = require('fs')
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))

        // Don't send sensitive info
        const publicData = {
            applicationId: data.applicationId,
            studentName: data.studentName,
            grade: data.grade,
            status: data.status,
            timestamp: data.timestamp,
        }

        return NextResponse.json({ success: true, data: publicData })
    } catch (error) {
        console.error('Error fetching application:', error)
        return NextResponse.json(
            { success: false, message: 'Error retrieving application' },
            { status: 500 }
        )
    }
}