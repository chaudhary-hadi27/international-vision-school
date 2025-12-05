import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch all students
export async function GET(request: NextRequest) {
    try {
        const students = await prisma.student.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({
            success: true,
            data: students
        })

    } catch (error) {
        console.error('Error fetching students:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST - Add new student
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            name,
            fatherName,
            motherName,
            dateOfBirth,
            gender,
            grade,
            section,
            rollNumber,
            admissionDate,
            address,
            city,
            phone,
            whatsapp,
            email,
            previousSchool,
            medicalInfo,
            status = 'active'
        } = body

        // Validate required fields
        if (!name || !fatherName || !grade || !section) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if roll number already exists
        if (rollNumber) {
            const existing = await prisma.student.findUnique({
                where: { rollNumber }
            })
            if (existing) {
                return NextResponse.json(
                    { success: false, message: 'Roll number already exists' },
                    { status: 400 }
                )
            }
        }

        // Create student
        const student = await prisma.student.create({
            data: {
                name,
                fatherName,
                motherName,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                grade,
                section,
                rollNumber,
                admissionDate: admissionDate ? new Date(admissionDate) : new Date(),
                address,
                city,
                phone,
                whatsapp,
                email,
                previousSchool,
                medicalInfo,
                status
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Student added successfully',
            data: student
        })

    } catch (error) {
        console.error('Error adding student:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}