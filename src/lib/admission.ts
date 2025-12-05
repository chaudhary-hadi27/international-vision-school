export interface AdmissionFormData {
    // Student Information
    studentName: string
    dateOfBirth: string
    gender: 'male' | 'female'
    grade: string
    previousSchool?: string

    // Parent Information
    fatherName: string
    fatherCNIC: string
    fatherPhone: string
    fatherOccupation?: string
    motherName: string
    motherCNIC?: string
    motherPhone?: string
    motherOccupation?: string

    // Contact Details
    address: string
    city: string
    emergencyContact?: string
    emergencyRelation?: string
    whatsappNumber: string
    email: string
}

export interface AdmissionFiles {
    studentPhoto: File | null
    birthCertificate: File | null
    fatherCNICDoc: File | null
    motherCNICDoc: File | null
}

export interface AdmissionResponse {
    success: boolean
    message: string
    applicationId?: string
    data?: any
}

export type AdmissionStatus = 'pending' | 'under_review' | 'approved' | 'rejected'
