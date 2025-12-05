import { z } from 'zod'

export const admissionSchema = z.object({
    // Student Info
    studentName: z.string().min(3, 'Name must be at least 3 characters'),
    dateOfBirth: z.string(),
    gender: z.enum(['male', 'female']),
    grade: z.string().min(1, 'Please select a grade'),
    previousSchool: z.string().optional(),

    // Father Info
    fatherName: z.string().min(3, 'Father name is required'),
    fatherCNIC: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'CNIC format: 12345-1234567-1'),
    fatherPhone: z.string().min(11, 'Valid phone number required'),
    fatherOccupation: z.string().optional(),

    // Mother Info
    motherName: z.string().min(3, 'Mother name is required'),
    motherCNIC: z.string().optional(),
    motherPhone: z.string().optional(),
    motherOccupation: z.string().optional(),

    // Contact
    address: z.string().min(10, 'Complete address is required'),
    city: z.string().min(2, 'City is required'),
    emergencyContact: z.string().optional(),
    emergencyRelation: z.string().optional(),
    whatsappNumber: z.string().min(11, 'WhatsApp number required'),
    email: z.string().email('Invalid email address'),
})

export const validateFileUpload = (file: File) => {
    const maxSize = 2 * 1024 * 1024 // 2MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']

    if (file.size > maxSize) {
        return { valid: false, error: 'File size must be less than 2MB' }
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Only JPG, PNG, and PDF files are allowed' }
    }

    return { valid: true }
}