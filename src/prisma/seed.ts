import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10)
    const parentPassword = await bcrypt.hash('parent123', 10)

    // Create Admin User
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@ivs.edu.pk' },
        update: {},
        create: {
            email: 'admin@ivs.edu.pk',
            password: adminPassword,
            name: 'Admin User',
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

    console.log('✅ Admin user created:', adminUser.email)

    // Create Parent User
    const parentUser = await prisma.user.upsert({
        where: { email: 'parent@ivs.edu.pk' },
        update: {},
        create: {
            email: 'parent@ivs.edu.pk',
            password: parentPassword,
            name: 'Ahmed Khan',
            phone: '03009876543',
            role: 'PARENT',
            isActive: true,
            parent: {
                create: {
                    cnic: '12345-1234567-1',
                    occupation: 'Business',
                    address: 'Street 123, DHA',
                    city: 'Lahore'
                }
            }
        }
    })

    console.log('✅ Parent user created:', parentUser.email)

    // Create Student for Parent
    const parent = await prisma.parent.findUnique({
        where: { userId: parentUser.id }
    })

    if (parent) {
        const student = await prisma.student.create({
            data: {
                rollNumber: 'IVS2024001',
                name: 'Ali Khan',
                fatherName: 'Ahmed Khan',
                motherName: 'Fatima Khan',
                dateOfBirth: new Date('2015-01-15'),
                gender: 'MALE',
                grade: 'Class 5',
                section: 'A',
                address: 'Street 123, DHA',
                city: 'Lahore',
                phone: '03009876543',
                whatsapp: '03009876543',
                email: 'parent@ivs.edu.pk',
                status: 'ACTIVE',
                parentId: parent.id
            }
        })

        console.log('✅ Student created:', student.name)

        // Create Fee Records
        await prisma.feeRecord.create({
            data: {
                studentId: student.id,
                month: '2024-12',
                amount: 5000,
                paidAmount: 5000,
                dueDate: new Date('2024-12-10'),
                paidDate: new Date('2024-12-05'),
                status: 'PAID',
                voucherNumber: 'FEE2024001'
            }
        })

        // Create Attendance
        const today = new Date()
        for (let i = 0; i < 5; i++) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)

            await prisma.attendance.create({
                data: {
                    studentId: student.id,
                    date: date,
                    status: i === 2 ? 'ABSENT' : 'PRESENT',
                    markedBy: adminUser.id
                }
            })
        }

        console.log('✅ Fee records and attendance created')
    }

    // Create Sample Announcement
    await prisma.announcement.create({
        data: {
            title: 'Winter Break Notice',
            content: 'School will be closed for winter break from Dec 23 to Jan 5.',
            type: 'HOLIDAY',
            priority: 'HIGH',
            targetAudience: ['parents', 'students'],
            targetGrades: ['all'],
            isActive: true,
            createdBy: adminUser.id
        }
    })

    console.log('✅ Announcement created')

    console.log('✅ Seeding completed!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })