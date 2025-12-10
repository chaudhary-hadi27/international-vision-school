// src/types/index.ts

import type { User, Student, Admission, Attendance, FeeRecord, Result } from '@prisma/client'

// Extended types with relations
export type StudentWithParent = Student & {
    parent: {
        user: Pick<User, 'name' | 'email' | 'phone'>
    }
}

export type AdmissionWithDetails = Admission & {
    studentName: string
    fatherName: string
    grade: string
}

// UI State types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

// Form types
export interface AdmissionFormData {
    studentName: string
    dateOfBirth: string
    gender: 'male' | 'female'
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

// Dashboard stats
export interface DashboardStats {
    totalStudents: number
    totalApplications: number
    pendingApplications: number
    totalRevenue: number
    attendanceRate: number
}

export interface ParentDashboardStats {
    attendance: {
        total: number
        present: number
        absent: number
        percentage: number
    }
    fees: {
        totalAmount: number
        totalPaid: number
        totalDue: number
    }
    results: Result[]
}