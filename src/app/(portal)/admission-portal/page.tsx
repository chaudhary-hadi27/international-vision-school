'use client'

import { useState } from 'react'
import {
    User,
    Users,
    School,
    Upload,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
    Loader2,
    Shield,
    CheckCircle,
    Info,
    Smartphone,
    Phone,
    Mail,
    HelpCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { compressImage } from '@/lib/utils/image'
import { detectFace } from '@/lib/utils/face-detection'
import { useEffect } from 'react'

export default function AdmissionPortal() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [formData, setFormData] = useState({
        // Step 1: Student Information
        studentName: '',
        dateOfBirth: '',
        gender: '',
        grade: '',
        previousSchool: '',

        // Step 2: Parent Information
        fatherName: '',
        fatherCNIC: '',
        fatherPhone: '',
        fatherOccupation: '',
        motherName: '',
        motherCNIC: '',
        motherPhone: '',
        motherOccupation: '',

        // Step 3: Address & Contact
        address: '',
        city: '',
        emergencyContact: '',
        emergencyRelation: '',
        whatsappNumber: '',
        email: '',

        // Step 4: Documents (storing URLs or local previews)
        studentPhoto1: null as File | string | null, // Front View
        studentPhoto2: null as File | string | null, // Left Profile
        studentPhoto3: null as File | string | null, // Right Profile
        studentPhoto4: null as File | string | null, // Extra/Full
        birthCertificate: null as File | string | null,
        fatherCNICDoc: null as File | string | null,
        motherCNICDoc: null as File | string | null,
    })

    // Load draft from localStorage on mount
    useEffect(() => {
        const draft = localStorage.getItem('admission_draft')
        if (draft) {
            try {
                const parsed = JSON.parse(draft)
                // Don't restore files from localStorage, just text data
                setFormData(prev => ({ ...prev, ...parsed }))
            } catch (e) {
                console.error('Failed to parse draft')
            }
        }
    }, [])

    // Save draft to localStorage whenever text data changes
    useEffect(() => {
        const { studentPhoto1, studentPhoto2, studentPhoto3, studentPhoto4, birthCertificate, fatherCNICDoc, motherCNICDoc, ...textData } = formData
        localStorage.setItem('admission_draft', JSON.stringify(textData))
    }, [formData])

    const steps = [
        { number: 1, title: 'Student Info', icon: User },
        { number: 2, title: 'Parent Info', icon: Users },
        { number: 3, title: 'Contact', icon: School },
        { number: 4, title: 'Documents', icon: Upload },
        { number: 5, title: 'Review', icon: CheckCircle2 },
    ]

    const grades = [
        'Playgroup', 'Nursery', 'Prep',
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        let maskedValue = value

        // CNIC Masking: XXXXX-XXXXXXX-X
        if (name.includes('CNIC')) {
            const digits = value.replace(/\D/g, '').slice(0, 13)
            let res = ''
            if (digits.length > 0) res += digits.slice(0, 5)
            if (digits.length > 5) res += '-' + digits.slice(5, 12)
            if (digits.length > 12) res += '-' + digits.slice(12, 13)
            maskedValue = res
        }

        // Phone Masking: 03XX-XXXXXXX
        if (name.includes('Phone') || name === 'whatsappNumber' || name === 'emergencyContact') {
            const digits = value.replace(/\D/g, '').slice(0, 11)
            let res = ''
            if (digits.length > 0) res += digits.slice(0, 4)
            if (digits.length > 4) res += '-' + digits.slice(4, 11)
            maskedValue = res
        }

        setFormData(prev => ({ ...prev, [name]: maskedValue }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0]
        if (file) {
            // Only compress images, keep PDFs as is but check size
            if (file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, [fieldName]: 'Validating...' }))

                // Face detection for student photos
                if (fieldName.startsWith('studentPhoto')) {
                    const hasFace = await detectFace(file)
                    if (!hasFace) {
                        setErrors(prev => ({ ...prev, [fieldName]: 'No face detected. Please upload a clear photo.' }))
                        return
                    }
                }

                setErrors(prev => ({ ...prev, [fieldName]: 'Optimizing...' }))
                const compressed = await compressImage(file)
                setFormData(prev => ({ ...prev, [fieldName]: compressed }))
                setErrors(prev => ({ ...prev, [fieldName]: '' }))
            } else {
                if (file.size > 2 * 1024 * 1024) {
                    setErrors(prev => ({ ...prev, [fieldName]: 'PDF size should be less than 2MB' }))
                    return
                }
                setFormData(prev => ({ ...prev, [fieldName]: file }))
                setErrors(prev => ({ ...prev, [fieldName]: '' }))
            }
        }
    }

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {}

        if (step === 1) {
            if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required'
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
            if (!formData.gender) newErrors.gender = 'Gender is required'
            if (!formData.grade) newErrors.grade = 'Grade is required'
        }

        if (step === 2) {
            if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required'
            if (!formData.fatherCNIC.trim()) newErrors.fatherCNIC = 'Father CNIC is required'
            if (formData.fatherCNIC && !/^\d{5}-\d{7}-\d{1}$/.test(formData.fatherCNIC)) {
                newErrors.fatherCNIC = 'CNIC format: 12345-1234567-1'
            }
            if (!formData.fatherPhone.trim()) newErrors.fatherPhone = 'Father phone is required'
            if (!formData.motherName.trim()) newErrors.motherName = 'Mother name is required'
        }

        if (step === 3) {
            if (!formData.address.trim()) newErrors.address = 'Address is required'
            if (!formData.city.trim()) newErrors.city = 'City is required'
            if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required'
            if (!formData.emergencyRelation.trim()) newErrors.emergencyRelation = 'Relation is required'
            if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = 'WhatsApp number is required'
            if (!formData.email.trim()) newErrors.email = 'Email is required'
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Invalid email format'
            }
        }

        if (step === 4) {
            if (!formData.studentPhoto1) newErrors.studentPhoto1 = 'Front photo is required'
            if (!formData.studentPhoto2) newErrors.studentPhoto2 = 'Left profile is required'
            if (!formData.studentPhoto3) newErrors.studentPhoto3 = 'Right profile is required'
            if (!formData.studentPhoto4) newErrors.studentPhoto4 = 'Profile photo is required'
            if (!formData.birthCertificate) newErrors.birthCertificate = 'Birth certificate is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 5))
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    const handleSubmit = async () => {
        if (!validateStep(4)) return // Ensure documents are validated

        setIsSubmitting(true)
        try {
            const submitData = new FormData()

            // Append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value && !(value instanceof File)) {
                    submitData.append(key, value.toString())
                }
            })

            // Append files
            if (formData.studentPhoto1 instanceof File) submitData.append('studentPhoto1', formData.studentPhoto1)
            if (formData.studentPhoto2 instanceof File) submitData.append('studentPhoto2', formData.studentPhoto2)
            if (formData.studentPhoto3 instanceof File) submitData.append('studentPhoto3', formData.studentPhoto3)
            if (formData.studentPhoto4 instanceof File) submitData.append('studentPhoto4', formData.studentPhoto4)
            if (formData.birthCertificate instanceof File) submitData.append('birthCertificate', formData.birthCertificate)
            if (formData.fatherCNICDoc instanceof File) submitData.append('fatherCNICDoc', formData.fatherCNICDoc)
            if (formData.motherCNICDoc instanceof File) submitData.append('motherCNICDoc', formData.motherCNICDoc)

            const response = await fetch('/api/admission', {
                method: 'POST',
                body: submitData,
            })

            const result = await response.json()

            if (response.ok) {
                localStorage.removeItem('admission_draft')
                window.location.href = `/admission-portal/thank-you?id=${result.applicationId}`
            } else {
                alert(result.message || 'Submission failed. Please try again.')
            }
        } catch (error) {
            console.error('Submission error:', error)
            alert('A network error occurred. Please check your connection and try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 bg-white overflow-hidden border-b border-slate-100">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ivs-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-ivs-blue/10 text-ivs-blue rounded-full mb-8 font-bold text-xs uppercase tracking-widest"
                    >
                        <Shield className="w-4 h-4" />
                        Official Registry Portal
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-ivs-navy mb-6 tracking-tight"
                    >
                        Admission <span className="text-ivs-blue">Application</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Begin your journey with IVS. Complete the formal application below to join our elite academic community.
                    </motion.p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4">

                {/* Step Indicator */}
                <div className="max-w-3xl mx-auto mb-16 px-4">
                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-7 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                className="h-full bg-ivs-blue shadow-[0_0_10px_rgba(0,102,255,0.4)]"
                            />
                        </div>

                        <div className="flex justify-between items-start">
                            {steps.map((step, index) => {
                                const Icon = step.icon
                                const isActive = currentStep === step.number
                                const isCompleted = currentStep > step.number

                                return (
                                    <div key={step.number} className="flex flex-col items-center group cursor-pointer" onClick={() => (isCompleted || isActive) && setCurrentStep(step.number)}>
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                scale: isActive ? 1.15 : 1,
                                                backgroundColor: isCompleted ? '#16a34a' : isActive ? '#0066FF' : '#ffffff',
                                                borderColor: isCompleted ? '#16a34a' : isActive ? '#0066FF' : '#e2e8f0'
                                            }}
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-2 relative z-10 ${isCompleted || isActive ? 'text-white shadow-xl' : 'text-slate-400 group-hover:border-slate-300'
                                                }`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {isCompleted ? (
                                                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                        <CheckCircle2 className="w-6 h-6" />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="icon" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                        <Icon className="w-6 h-6" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Pulse effect for active step */}
                                            {isActive && (
                                                <div className="absolute inset-0 rounded-2xl bg-ivs-blue/20 animate-ping -z-10" />
                                            )}
                                        </motion.div>
                                        <div className={`mt-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 text-center max-w-[80px] ${isActive ? 'text-ivs-blue' : isCompleted ? 'text-green-600' : 'text-slate-400'
                                            }`}>
                                            {step.title}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="premium-card rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-ivs-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <AnimatePresence mode="wait">
                        {/* Step 1: Student Information */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 relative z-10"
                            >
                                <div className="mb-10">
                                    <h2 className="text-3xl font-bold text-ivs-navy mb-2 font-heading">Student Information</h2>
                                    <p className="text-slate-500">Provide personal details of the applicant.</p>
                                </div>

                                <div className="grid gap-8">
                                    <div className="group">
                                        <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Student Full Name *</label>
                                        <input
                                            type="text"
                                            name="studentName"
                                            value={formData.studentName}
                                            onChange={handleInputChange}
                                            className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.studentName ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white focus:shadow-lg focus:shadow-ivs-blue/10'
                                                }`}
                                            placeholder="Enter student's full name"
                                        />
                                        {errors.studentName && <p className="text-red-500 text-sm mt-2 flex items-center gap-2 font-medium"><AlertCircle className="w-4 h-4" /> {errors.studentName}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Date of Birth *</label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleInputChange}
                                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.dateOfBirth ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                    }`}
                                            />
                                            {errors.dateOfBirth && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.dateOfBirth}</p>}
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Gender *</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.gender ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                    }`}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            {errors.gender && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.gender}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Applying for Grade *</label>
                                            <select
                                                name="grade"
                                                value={formData.grade}
                                                onChange={handleInputChange}
                                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.grade ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                    }`}
                                            >
                                                <option value="">Select Grade</option>
                                                {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                            </select>
                                            {errors.grade && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.grade}</p>}
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Previous School (if any)</label>
                                            <input
                                                type="text"
                                                name="previousSchool"
                                                value={formData.previousSchool}
                                                onChange={handleInputChange}
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:bg-white focus:outline-none transition-all"
                                                placeholder="Previous school name"
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.email ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.email}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Parent Information */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 relative z-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-ivs-navy mb-2 font-heading">Parent Information</h2>
                                    <p className="text-slate-500">Provide details of the parents/guardians.</p>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-ivs-blue/5 rounded-3xl border border-ivs-blue/10">
                                        <h3 className="text-lg font-bold text-ivs-navy mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-ivs-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-ivs-blue/20">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            Father's Information
                                        </h3>
                                        <div className="grid gap-6">
                                            <div className="group">
                                                <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">Father's Full Name *</label>
                                                <input
                                                    type="text"
                                                    name="fatherName"
                                                    value={formData.fatherName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all ${errors.fatherName ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:shadow-lg'
                                                        }`}
                                                    placeholder="Enter full name"
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">Father's CNIC *</label>
                                                    <input
                                                        type="text"
                                                        name="fatherCNIC"
                                                        value={formData.fatherCNIC}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all ${errors.fatherCNIC ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:shadow-lg'
                                                            }`}
                                                        placeholder="12345-1234567-1"
                                                    />
                                                    {errors.fatherCNIC && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.fatherCNIC}</p>}
                                                </div>
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">Father's Phone *</label>
                                                    <input
                                                        type="tel"
                                                        name="fatherPhone"
                                                        value={formData.fatherPhone}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all ${errors.fatherPhone ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:shadow-lg'
                                                            }`}
                                                        placeholder="03XX XXXXXXX"
                                                    />
                                                    {errors.fatherPhone && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.fatherPhone}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-ivs-blue/5 rounded-3xl border border-ivs-blue/10">
                                        <h3 className="text-lg font-bold text-ivs-navy mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-ivs-blue/10 text-ivs-blue rounded-xl flex items-center justify-center">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            Mother's Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="group">
                                                <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Mother Name *</label>
                                                <input
                                                    type="text"
                                                    name="motherName"
                                                    value={formData.motherName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.motherName ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                        }`}
                                                    placeholder="Enter mother's full name"
                                                />
                                                {errors.motherName && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.motherName}</p>}
                                            </div>

                                            <div className="group">
                                                <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Mother CNIC</label>
                                                <input
                                                    type="text"
                                                    name="motherCNIC"
                                                    value={formData.motherCNIC}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.motherCNIC ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                        }`}
                                                    placeholder="12345-1234567-1"
                                                />
                                                {errors.motherCNIC && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.motherCNIC}</p>}
                                            </div>
                                            <div className="group">
                                                <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Mother Phone</label>
                                                <input
                                                    type="tel"
                                                    name="motherPhone"
                                                    value={formData.motherPhone}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all ${errors.motherPhone ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:shadow-lg'
                                                        }`}
                                                    placeholder="03XX XXXXXXX"
                                                />
                                                {errors.motherPhone && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.motherPhone}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Contact Details */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 relative z-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-ivs-navy mb-2 font-heading">Contact Details</h2>
                                    <p className="text-slate-500">How can we reach you?</p>
                                </div>

                                <div className="grid gap-8">
                                    <div className="group">
                                        <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Complete Address *</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white resize-none ${errors.address ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white focus:shadow-lg focus:shadow-ivs-blue/10'
                                                }`}
                                            placeholder="House #, Street, Area"
                                        />
                                        {errors.address && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.address}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.city ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                    }`}
                                                placeholder="Enter City"
                                            />
                                            {errors.city && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.city}</p>}
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">WhatsApp Number *</label>
                                            <input
                                                type="tel"
                                                name="whatsappNumber"
                                                value={formData.whatsappNumber}
                                                onChange={handleInputChange}
                                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.whatsappNumber ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                    }`}
                                                placeholder="03XX XXXXXXX"
                                            />
                                            {errors.whatsappNumber && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.whatsappNumber}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Emergency Contact Number *</label>
                                            <input
                                                type="tel"
                                                name="emergencyContact"
                                                value={formData.emergencyContact}
                                                onChange={handleInputChange}
                                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.emergencyContact ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                    }`}
                                                placeholder="03XX XXXXXXX"
                                            />
                                            {errors.emergencyContact && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.emergencyContact}</p>}
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Relation to Student *</label>
                                            <input
                                                type="text"
                                                name="emergencyRelation"
                                                value={formData.emergencyRelation}
                                                onChange={handleInputChange}
                                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.emergencyRelation ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                    }`}
                                                placeholder="e.g. Uncle, Brother"
                                            />
                                            {errors.emergencyRelation && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.emergencyRelation}</p>}
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all duration-300 group-hover:bg-white ${errors.email ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:bg-white'
                                                }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-[10px] mt-2 uppercase font-black tracking-widest leading-none">{errors.email}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Documents */}
                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 relative z-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-ivs-navy mb-2 font-heading">Upload Documents</h2>
                                    <p className="text-slate-500">Provide necessary documentation (Max 2MB per file).</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {[
                                        { label: 'Student Photo (Front) *', id: 'studentPhoto1', value: formData.studentPhoto1 },
                                        { label: 'Student Photo (Left) *', id: 'studentPhoto2', value: formData.studentPhoto2 },
                                        { label: 'Student Photo (Right) *', id: 'studentPhoto3', value: formData.studentPhoto3 },
                                        { label: 'Student Photo (Profile) *', id: 'studentPhoto4', value: formData.studentPhoto4 },
                                        { label: 'Birth Certificate *', id: 'birthCertificate', value: formData.birthCertificate },
                                        { label: 'Father CNIC Doc', id: 'fatherCNICDoc', value: formData.fatherCNICDoc },
                                        { label: 'Mother CNIC Doc', id: 'motherCNICDoc', value: formData.motherCNICDoc },
                                    ].map((field) => (
                                        <div key={field.id} className="group">
                                            <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">{field.label}</label>
                                            <div className="relative border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-3xl p-8 text-center hover:border-ivs-blue hover:bg-white transition-all group">
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) => handleFileChange(e, field.id)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <Upload className="w-10 h-10 text-slate-300 mx-auto mb-4 group-hover:text-ivs-blue transition-colors" />
                                                <div className="text-sm font-bold text-ivs-navy mb-1">Click to upload</div>
                                                <div className="text-xs text-slate-400">JPG, PNG or PDF</div>
                                                {field.value && (
                                                    <div className="mt-4 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full inline-flex items-center gap-2">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        {field.value instanceof File ? field.value.name : 'Uploaded'}
                                                    </div>
                                                )}
                                                {errors[field.id] && (
                                                    <div className={`mt-3 text-xs font-bold flex items-center justify-center gap-2 ${errors[field.id].includes('Optimizing') ? 'text-blue-500' : 'text-red-500'}`}>
                                                        {errors[field.id].includes('Optimizing') ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                                        {errors[field.id]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Review */}
                        {currentStep === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 relative z-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-ivs-navy mb-2 font-heading">Review Application</h2>
                                    <p className="text-slate-500">Please verify all information before final submission.</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Student Info Summary */}
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                                            <h3 className="font-bold text-ivs-navy flex items-center gap-2">
                                                <User className="w-5 h-5 text-ivs-blue" />
                                                Student & Grade
                                            </h3>
                                            <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-ivs-blue hover:underline uppercase tracking-wider">Edit</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Full Name</label>
                                                <p className="font-semibold text-ivs-navy">{formData.studentName}</p>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Apply Grade</label>
                                                <p className="font-semibold text-ivs-navy">{formData.grade}</p>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Gender</label>
                                                <p className="font-semibold text-ivs-navy capitalize">{formData.gender}</p>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">DOB</label>
                                                <p className="font-semibold text-ivs-navy">{formData.dateOfBirth}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Family Summary */}
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                                            <h3 className="font-bold text-ivs-navy flex items-center gap-2">
                                                <Users className="w-5 h-5 text-ivs-blue" />
                                                Parental Information
                                            </h3>
                                            <button onClick={() => setCurrentStep(2)} className="text-xs font-bold text-ivs-blue hover:underline uppercase tracking-wider">Edit</button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Father Name</label>
                                                    <p className="font-semibold text-ivs-navy">{formData.fatherName}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Father Phone</label>
                                                    <p className="font-semibold text-ivs-navy">{formData.fatherPhone}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Mother Name</label>
                                                    <p className="font-semibold text-ivs-navy">{formData.motherName}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Mother Phone</label>
                                                    <p className="font-semibold text-ivs-navy">{formData.motherPhone || "---"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Document Status */}
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                                            <h3 className="font-bold text-ivs-navy flex items-center gap-2">
                                                <Upload className="w-5 h-5 text-ivs-blue" />
                                                Documents Uploaded
                                            </h3>
                                            <button onClick={() => setCurrentStep(4)} className="text-xs font-bold text-ivs-blue hover:underline uppercase tracking-wider">Edit</button>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Front Photo', value: formData.studentPhoto1 },
                                                { label: 'Left Photo', value: formData.studentPhoto2 },
                                                { label: 'Right Photo', value: formData.studentPhoto3 },
                                                { label: 'Profile Photo', value: formData.studentPhoto4 },
                                                { label: 'Birth Certificate', value: formData.birthCertificate },
                                                { label: 'Father CNIC', value: formData.fatherCNICDoc },
                                                { label: 'Mother CNIC', value: formData.motherCNICDoc },
                                            ].map((doc, i) => (
                                                <div key={i} className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-500">{doc.label}</span>
                                                    {doc.value ? (
                                                        <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                                                            <CheckCircle2 className="w-4 h-4" /> Ready
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400">Not provided</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Contact Summary */}
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                                            <h3 className="font-bold text-ivs-navy flex items-center gap-2">
                                                <Smartphone className="w-5 h-5 text-ivs-blue" />
                                                Contact Details
                                            </h3>
                                            <button onClick={() => setCurrentStep(3)} className="text-xs font-bold text-ivs-blue hover:underline uppercase tracking-wider">Edit</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Address</label>
                                                <p className="font-semibold text-ivs-navy">{formData.address}, {formData.city}</p>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">WhatsApp</label>
                                                <p className="font-semibold text-ivs-navy font-mono tracking-tight">{formData.whatsappNumber}</p>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Email</label>
                                                <p className="font-semibold text-ivs-navy truncate">{formData.email}</p>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Emergency</label>
                                                <p className="font-semibold text-ivs-navy truncate">{formData.emergencyContact} ({formData.emergencyRelation})</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Document Summary */}
                                    <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                                        <div className="flex items-center justify-between mb-4 pb-2">
                                            <h3 className="font-bold text-ivs-navy flex items-center gap-2 text-sm uppercase tracking-wider">
                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                Documents Ready
                                            </h3>
                                            <button onClick={() => setCurrentStep(4)} className="text-[10px] font-bold text-ivs-blue hover:underline uppercase tracking-widest">Verify Files</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {(formData.studentPhoto1 || formData.studentPhoto2 || formData.studentPhoto3 || formData.studentPhoto4) && <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold border border-slate-100 text-slate-500 shadow-sm uppercase">4 Student Photos</span>}
                                            {formData.birthCertificate && <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold border border-slate-100 text-slate-500 shadow-sm uppercase">Birth Cert</span>}
                                            {formData.fatherCNICDoc && <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold border border-slate-100 text-slate-500 shadow-sm uppercase">Father CNIC</span>}
                                            {formData.motherCNICDoc && <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold border border-slate-100 text-slate-500 shadow-sm uppercase">Mother CNIC</span>}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <p className="text-xs text-amber-800 font-medium">
                                            By clicking "Confirm & Submit", you certify that all information provided is accurate and all documents are authentic.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100 relative z-10">
                        {currentStep > 1 && (
                            <motion.button
                                whileHover={{ scale: 1.02, x: -5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={prevStep}
                                className="px-8 py-4 bg-white text-slate-500 rounded-2xl font-bold border-2 border-slate-100 hover:border-ivs-blue hover:text-ivs-blue transition-all flex items-center gap-3 shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5 transition-transform" />
                                <span className="uppercase tracking-[0.2em] text-[10px] font-black">Previous Step</span>
                            </motion.button>
                        )}

                        {currentStep < 5 ? (
                            <motion.button
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={nextStep}
                                className="ml-auto px-10 py-4 bg-ivs-blue text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-ivs-blue/20 hover:bg-blue-600 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <span className="uppercase tracking-[0.2em] text-[10px] font-black">Next Step</span>
                                <ChevronRight className="w-5 h-5 transition-transform" />
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="ml-auto px-10 py-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl font-bold flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-emerald-500/30 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60 -mb-1">Final Entry</span>
                                            <span className="text-sm uppercase tracking-widest font-black">Confirm & Submit</span>
                                        </div>
                                        <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                    </>
                                )}
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Enhanced Portal Support Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-32 relative group"
                >
                    {/* Background Decorative Elements */}
                    <div className="absolute -top-20 -left-20 w-80 h-80 bg-ivs-blue/5 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-ivs-blue/10 rounded-full blur-[100px] animate-pulse" />

                    <div className="relative z-10 p-1 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-[4rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] overflow-hidden">
                        {/* Inner Content with Glassmorphism */}
                        <div className="bg-white/40 backdrop-blur-xl p-12 md:p-20 rounded-[3.8rem]">
                            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
                                {/* Left Side: Branding & Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-ivs-blue/5 text-ivs-blue rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8"
                                    >
                                        <HelpCircle className="w-3 h-3" />
                                        Admission Concierge
                                    </motion.div>

                                    <h2 className="text-4xl md:text-5xl font-black text-ivs-navy mb-8 font-heading leading-[1.1] tracking-tight">
                                        Need a helping <span className="text-ivs-blue">hand?</span>
                                    </h2>

                                    <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
                                        Applying to International Vision School is the first step towards an exceptional future. Our dedicated support team is here to guide you through every section of the portal.
                                    </p>

                                    <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Support Active</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-ivs-blue/40" />
                                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">admin@ivs.edu.pk</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Action Cards */}
                                <div className="w-full md:w-auto flex flex-col gap-6">
                                    <motion.a
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="tel:+923001234567"
                                        className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 hover:border-ivs-blue hover:shadow-2xl hover:shadow-ivs-blue/10 transition-all group/card"
                                    >
                                        <div className="w-16 h-16 bg-blue-50 text-ivs-blue rounded-2xl flex items-center justify-center group-hover/card:bg-ivs-blue group-hover/card:text-white transition-all duration-300">
                                            <Phone className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-ivs-blue mb-1">Direct Helpdesk</span>
                                            <span className="text-ivs-navy text-2xl font-black">+92 300 1234567</span>
                                        </div>
                                    </motion.a>

                                    <motion.a
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="https://wa.me/923001234567"
                                        className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group/card"
                                    >
                                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover/card:bg-emerald-500 group-hover/card:text-white transition-all duration-300">
                                            <Smartphone className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-600 mb-1">WhatsApp Chat</span>
                                            <span className="text-emerald-700 text-2xl font-black tracking-tight">Digital Support</span>
                                        </div>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main >
    )
}