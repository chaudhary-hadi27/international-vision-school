// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Clear existing data (optional - comment out in production)
    console.log('🗑️  Cleaning database...')
    await prisma.attendance.deleteMany()
    await prisma.feeRecord.deleteMany()
    await prisma.result.deleteMany()
    await prisma.announcement.deleteMany()
    await prisma.student.deleteMany()
    await prisma.admission.deleteMany()
    await prisma.parent.deleteMany()
    await prisma.admin.deleteMany()
    await prisma.user.deleteMany()

    // Create Admin Users
    const adminPassword = await bcrypt.hash('admin123', 10)

    const admin1 = await prisma.user.create({
        data: {
            email: 'admin@ivs.edu.pk',
            password: adminPassword,
            name: 'Principal Aamir Khan',
            phone: '03001234567',
            role: 'ADMIN',
            isActive: true,
            admin: {
                create: {
                    designation: 'Principal'
                }
            }
        }
    })

    console.log('✅ Admin created:', admin1.email)

    // Create Parents and Students
    const parentPassword = await bcrypt.hash('parent123', 10)

    const parentsData = [
        {
            name: 'Ahmed Khan',
            email: 'ahmed.khan@gmail.com',
            phone: '03009876543',
            cnic: '35202-1234567-1',
            occupation: 'Business Owner',
            address: 'Street 123, DHA Phase 5',
            city: 'Lahore',
            children: [
                {
                    name: 'Ali Ahmed Khan',
                    fatherName: 'Ahmed Khan',
                    motherName: 'Ayesha Khan',
                    dateOfBirth: new Date('2015-03-15'),
                    gender: 'MALE' as const,
                    grade: 'Class 5',
                    section: 'A',
                    rollNumber: 'IVS-2024-001',
                },
                {
                    name: 'Fatima Ahmed Khan',
                    fatherName: 'Ahmed Khan',
                    motherName: 'Ayesha Khan',
                    dateOfBirth: new Date('2017-08-20'),
                    gender: 'FEMALE' as const,
                    grade: 'Class 3',
                    section: 'B',
                    rollNumber: 'IVS-2024-002',
                }
            ]
        },
        {
            name: 'Hassan Ali',
            email: 'hassan.ali@gmail.com',
            phone: '03121234567',
            cnic: '35202-2345678-1',
            occupation: 'Engineer',
            address: 'House 45, Johar Town',
            city: 'Lahore',
            children: [
                {
                    name: 'Zain Hassan Ali',
                    fatherName: 'Hassan Ali',
                    motherName: 'Sana Ali',
                    dateOfBirth: new Date('2016-01-10'),
                    gender: 'MALE' as const,
                    grade: 'Class 4',
                    section: 'A',
                    rollNumber: 'IVS-2024-003',
                }
            ]
        },
        {
            name: 'Bilal Ahmed',
            email: 'bilal.ahmed@gmail.com',
            phone: '03331234567',
            cnic: '35202-3456789-1',
            occupation: 'Doctor',
            address: 'Street 7, Model Town',
            city: 'Lahore',
            children: [
                {
                    name: 'Maryam Bilal',
                    fatherName: 'Bilal Ahmed',
                    motherName: 'Hira Ahmed',
                    dateOfBirth: new Date('2014-06-25'),
                    gender: 'FEMALE' as const,
                    grade: 'Class 6',
                    section: 'A',
                    rollNumber: 'IVS-2024-004',
                }
            ]
        },
        {
            name: 'Kamran Sheikh',
            email: 'kamran.sheikh@gmail.com',
            phone: '03451234567',
            cnic: '35202-4567890-1',
            occupation: 'Teacher',
            address: 'Block B, Garden Town',
            city: 'Lahore',
            children: [
                {
                    name: 'Usman Kamran',
                    fatherName: 'Kamran Sheikh',
                    motherName: 'Nadia Sheikh',
                    dateOfBirth: new Date('2016-09-12'),
                    gender: 'MALE' as const,
                    grade: 'Class 4',
                    section: 'B',
                    rollNumber: 'IVS-2024-005',
                },
                {
                    name: 'Aisha Kamran',
                    fatherName: 'Kamran Sheikh',
                    motherName: 'Nadia Sheikh',
                    dateOfBirth: new Date('2018-04-18'),
                    gender: 'FEMALE' as const,
                    grade: 'Class 2',
                    section: 'A',
                    rollNumber: 'IVS-2024-006',
                }
            ]
        },
        {
            name: 'Faisal Mahmood',
            email: 'faisal.mahmood@gmail.com',
            phone: '03561234567',
            cnic: '35202-5678901-1',
            occupation: 'Businessman',
            address: 'Street 15, Gulberg III',
            city: 'Lahore',
            children: [
                {
                    name: 'Ibrahim Faisal',
                    fatherName: 'Faisal Mahmood',
                    motherName: 'Amna Faisal',
                    dateOfBirth: new Date('2015-11-30'),
                    gender: 'MALE' as const,
                    grade: 'Class 5',
                    section: 'B',
                    rollNumber: 'IVS-2024-007',
                }
            ]
        }
    ]

    for (const parentData of parentsData) {
        const user = await prisma.user.create({
            data: {
                email: parentData.email,
                password: parentPassword,
                name: parentData.name,
                phone: parentData.phone,
                role: 'PARENT',
                isActive: true,
            }
        })

        const parent = await prisma.parent.create({
            data: {
                userId: user.id,
                cnic: parentData.cnic,
                occupation: parentData.occupation,
                address: parentData.address,
                city: parentData.city,
            }
        })

        for (const childData of parentData.children) {
            const student = await prisma.student.create({
                data: {
                    ...childData,
                    parentId: parent.id,
                    address: parentData.address,
                    city: parentData.city,
                    phone: parentData.phone,
                    whatsapp: parentData.phone,
                    email: parentData.email,
                    status: 'ACTIVE',
                    admissionDate: new Date('2024-04-01'),
                }
            })

            console.log(`✅ Created student: ${student.name}`)

            // Create Fee Records (last 3 months)
            const months = ['2024-10', '2024-11', '2024-12']
            for (const month of months) {
                const isPaid = Math.random() > 0.3 // 70% paid
                const amount = 5000
                const paidAmount = isPaid ? amount : Math.random() > 0.5 ? amount / 2 : 0

                await prisma.feeRecord.create({
                    data: {
                        studentId: student.id,
                        month,
                        amount,
                        paidAmount,
                        dueDate: new Date(`${month}-10`),
                        paidDate: isPaid ? new Date(`${month}-08`) : null,
                        status: paidAmount === amount ? 'PAID' : paidAmount > 0 ? 'PARTIALLY_PAID' : 'UNPAID',
                        voucherNumber: isPaid ? `FEE-${student.rollNumber}-${month}` : null,
                    }
                })
            }

            // Create Attendance (last 30 days)
            for (let i = 0; i < 30; i++) {
                const date = new Date()
                date.setDate(date.getDate() - i)

                // Skip weekends
                if (date.getDay() === 0 || date.getDay() === 6) continue

                const statuses = ['PRESENT', 'PRESENT', 'PRESENT', 'PRESENT', 'ABSENT', 'LEAVE', 'LATE']
                const status = statuses[Math.floor(Math.random() * statuses.length)]

                await prisma.attendance.create({
                    data: {
                        studentId: student.id,
                        date,
                        status: status as any,
                        markedBy: admin1.id,
                    }
                })
            }
        }
    }

    // Create Admission Applications
    const admissionData = [
        {
            applicationId: 'IVS-APP-2024-001',
            studentName: 'Sara Malik',
            dateOfBirth: new Date('2016-05-15'),
            gender: 'FEMALE' as const,
            grade: 'Class 4',
            fatherName: 'Malik Asad',
            fatherCNIC: '35202-6789012-1',
            fatherPhone: '03671234567',
            motherName: 'Rabia Malik',
            address: 'Street 9, Bahria Town',
            city: 'Lahore',
            whatsappNumber: '03671234567',
            email: 'malik.asad@gmail.com',
            status: 'PENDING' as const,
        },
        {
            applicationId: 'IVS-APP-2024-002',
            studentName: 'Omar Farooq',
            dateOfBirth: new Date('2017-02-20'),
            gender: 'MALE' as const,
            grade: 'Class 3',
            fatherName: 'Farooq Ahmed',
            fatherCNIC: '35202-7890123-1',
            fatherPhone: '03781234567',
            motherName: 'Zara Farooq',
            address: 'Block C, Canal Road',
            city: 'Lahore',
            whatsappNumber: '03781234567',
            email: 'farooq.ahmed@gmail.com',
            status: 'UNDER_REVIEW' as const,
        },
        {
            applicationId: 'IVS-APP-2024-003',
            studentName: 'Hina Javed',
            dateOfBirth: new Date('2015-08-10'),
            gender: 'FEMALE' as const,
            grade: 'Class 5',
            fatherName: 'Javed Iqbal',
            fatherCNIC: '35202-8901234-1',
            fatherPhone: '03891234567',
            motherName: 'Saima Javed',
            address: 'House 12, Wapda Town',
            city: 'Lahore',
            whatsappNumber: '03891234567',
            email: 'javed.iqbal@gmail.com',
            status: 'APPROVED' as const,
        }
    ]

    for (const admission of admissionData) {
        await prisma.admission.create({data: admission})
    }

    console.log('✅ Created admission applications')

    // Create Announcements
    const announcements = [
        {
            title: 'Winter Break Announcement',
            content: 'School will remain closed for winter break from December 23, 2024 to January 5, 2025. Classes will resume on January 6, 2025.',
            type: 'HOLIDAY' as const,
            priority: 'HIGH' as const,
            targetAudience: ['all'],
            targetGrades: ['all'],
            createdBy: admin1.id,
            isActive: true,
        },
        {
            title: 'Parent-Teacher Meeting',
            content: 'Parent-Teacher meeting is scheduled for December 15, 2024 at 10:00 AM. All parents are requested to attend.',
            type: 'EVENT' as const,
            priority: 'NORMAL' as const,
            targetAudience: ['parents'],
            targetGrades: ['all'],
            createdBy: admin1.id,
            isActive: true,
        },
        {
            title: 'Fee Due Reminder',
            content: 'This is a friendly reminder that December fee is due by 10th December. Please clear your dues on time to avoid late payment charges.',
            type: 'FEE' as const,
            priority: 'HIGH' as const,
            targetAudience: ['parents'],
            targetGrades: ['all'],
            createdBy: admin1.id,
            isActive: true,
        },
        {
            title: 'Annual Sports Day',
            content: 'Annual Sports Day will be held on December 20, 2024. All students must participate. Parents are welcome to attend.',
            type: 'EVENT' as const,
            priority: 'NORMAL' as const,
            targetAudience: ['parents', 'students'],
            targetGrades: ['all'],
            createdBy: admin1.id,
            isActive: true,
        },
        {
            title: 'Final Exams Schedule',
            content: 'Final examinations for all classes will begin from December 18, 2024. Detailed schedule has been sent via email.',
            type: 'ACADEMIC' as const,
            priority: 'URGENT' as const,
            targetAudience: ['students', 'parents'],
            targetGrades: ['all'],
            createdBy: admin1.id,
            isActive: true,
        }
    ]

    for (const announcement of announcements) {
        await prisma.announcement.create({data: announcement})
    }

    console.log('✅ Created announcements')

}
