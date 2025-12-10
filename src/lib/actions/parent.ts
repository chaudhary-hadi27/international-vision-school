// src/lib/actions/parent.ts
'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Attendance, FeeRecord, Result, Announcement, Student } from '@prisma/client'

/**
 * Helpers
 */
function ensureSessionUserId(session: any): string {
    if (!session?.user?.id) throw new Error('Unauthorized: missing user id')
    return session.user.id
}

function toNumber(value: unknown): number {
    return Number((value as any) ?? 0)
}

/**
 * Types returned by these functions
 */
type AttendanceStats = {
    total: number
    present: number
    absent: number
    leave: number
    percentage: number
}

/**
 * Get parent's children
 */
export async function getMyChildren(): Promise<Student[]> {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user?.role !== 'PARENT') {
            throw new Error('Unauthorized')
        }

        const userId = ensureSessionUserId(session)

        const parent = await prisma.parent.findUnique({
            where: { userId },
            include: {
                children: {
                    where: { status: 'ACTIVE' },
                    orderBy: { grade: 'asc' },
                },
            },
        })

        return parent?.children ?? []
    } catch (error) {
        console.error('Get children error:', error)
        throw error
    }
}

/**
 * Get student attendance (last `days` days)
 */
export async function getStudentAttendance(studentId: string, days = 30) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user?.role !== 'PARENT') {
            throw new Error('Unauthorized')
        }

        const userId = ensureSessionUserId(session)

        // Verify student belongs to parent
        const student = await prisma.student.findFirst({
            where: {
                id: studentId,
                parent: { userId },
            },
        })

        if (!student) {
            throw new Error('Student not found or unauthorized')
        }

        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        const attendance = await prisma.attendance.findMany({
            where: {
                studentId,
                date: { gte: startDate },
            },
            orderBy: { date: 'desc' },
        })

        // Calculate stats
        const total = attendance.length
        const present = attendance.filter(a => a.status === 'PRESENT').length
        const absent = attendance.filter(a => a.status === 'ABSENT').length
        const leave = attendance.filter(a => a.status === 'LEAVE').length
        const percentage = total > 0 ? Math.round((present / total) * 100) : 0

        const stats: AttendanceStats = { total, present, absent, leave, percentage }

        return {
            attendance,
            stats,
        }
    } catch (error) {
        console.error('Get attendance error:', error)
        throw error
    }
}

/**
 * Get student fee records
 */
export async function getStudentFees(studentId: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user?.role !== 'PARENT') {
            throw new Error('Unauthorized')
        }

        const userId = ensureSessionUserId(session)

        // Verify student belongs to parent
        const student = await prisma.student.findFirst({
            where: {
                id: studentId,
                parent: { userId },
            },
        })

        if (!student) {
            throw new Error('Student not found or unauthorized')
        }

        const fees = await prisma.feeRecord.findMany({
            where: { studentId },
            orderBy: { dueDate: 'desc' },
        })

        const totalAmount = fees.reduce<number>((sum, f) => sum + toNumber(f.amount), 0)
        const totalPaid = fees.reduce<number>((sum, f) => sum + toNumber(f.paidAmount), 0)
        const totalDue = totalAmount - totalPaid
        const unpaidCount = fees.filter(f => f.status !== 'PAID').length

        return {
            fees,
            summary: {
                totalAmount,
                totalPaid,
                totalDue,
                unpaidCount,
            },
        }
    } catch (error) {
        console.error('Get fees error:', error)
        throw error
    }
}

/**
 * Get student results
 */
export async function getStudentResults(studentId: string): Promise<Result[]> {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user?.role !== 'PARENT') {
            throw new Error('Unauthorized')
        }

        const userId = ensureSessionUserId(session)

        // Verify student belongs to parent
        const student = await prisma.student.findFirst({
            where: {
                id: studentId,
                parent: { userId },
            },
        })

        if (!student) {
            throw new Error('Student not found or unauthorized')
        }

        const results = await prisma.result.findMany({
            where: {
                studentId,
                isPublished: true,
            },
            orderBy: { createdAt: 'desc' },
        })

        return results
    } catch (error) {
        console.error('Get results error:', error)
        throw error
    }
}

/**
 * Get announcements for parent
 */
export async function getAnnouncementsForParent(studentId: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user?.role !== 'PARENT') {
            throw new Error('Unauthorized')
        }

        const userId = ensureSessionUserId(session)

        const student = await prisma.student.findFirst({
            where: {
                id: studentId,
                parent: { userId },
            },
        })

        if (!student) {
            throw new Error('Student not found')
        }

        const now = new Date()

        const announcements = await prisma.announcement.findMany({
            where: {
                isActive: true,
                publishDate: { lte: now },
                OR: [
                    { expiryDate: null },
                    { expiryDate: { gte: now } },
                ],
                AND: [
                    {
                        OR: [
                            { targetAudience: { has: 'parents' } },
                            { targetAudience: { has: 'all' } },
                        ],
                    },
                    {
                        OR: [
                            { targetGrades: { has: student.grade } },
                            { targetGrades: { has: 'all' } },
                        ],
                    },
                ],
            },
            orderBy: [
                { priority: 'desc' },
                { publishDate: 'desc' },
            ],
            take: 20,
        })

        return announcements
    } catch (error) {
        console.error('Get announcements error:', error)
        throw error
    }
}