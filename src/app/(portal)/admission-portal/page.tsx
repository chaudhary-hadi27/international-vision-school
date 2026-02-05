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
    Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { compressImage } from '@/lib/utils/image'
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
        studentPhoto: null as File | string | null,
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
        const { studentPhoto, birthCertificate, fatherCNICDoc, motherCNICDoc, ...textData } = formData
        localStorage.setItem('admission_draft', JSON.stringify(textData))
    }, [formData])

    const steps = [
        { number: 1, title: 'Student Info', icon: User },
        { number: 2, title: 'Parent Info', icon: Users },
        { number: 3, title: 'Contact Details', icon: School },
        { number: 4, title: 'Documents', icon: Upload },
    ]

    const grades = [
        'Playgroup', 'Nursery', 'Prep',
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
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
                setErrors(prev => ({ ...prev, [fieldName]: 'Optimizing image...' }))
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
            if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = 'WhatsApp number is required'
            if (!formData.email.trim()) newErrors.email = 'Email is required'
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Invalid email format'
            }
        }

        if (step === 4) {
            if (!formData.studentPhoto) newErrors.studentPhoto = 'Student photo is required'
            if (!formData.birthCertificate) newErrors.birthCertificate = 'Birth certificate is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4))
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    const handleSubmit = async () => {
        if (!validateStep(4)) return

        setIsSubmitting(true)
        const toastId = 'submitting' // Placeholder for actual toast library if used

        try {
            const submitData = new FormData()

            // Append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value && !(value instanceof File)) {
                    submitData.append(key, value.toString())
                }
            })

            // Append files (already compressed on client if they were images)
            if (formData.studentPhoto) submitData.append('studentPhoto', formData.studentPhoto)
            if (formData.birthCertificate) submitData.append('birthCertificate', formData.birthCertificate)
            if (formData.fatherCNICDoc) submitData.append('fatherCNICDoc', formData.fatherCNICDoc)
            if (formData.motherCNICDoc) submitData.append('motherCNICDoc', formData.motherCNICDoc)

            const response = await fetch('/api/admission', {
                method: 'POST',
                body: submitData,
            })

            const result = await response.json()

            if (response.ok) {
                // Clear draft on success
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
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="bg-ivs-navy text-white py-16 px-4 text-center mb-12">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Admission Application</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Begin your journey with IVS. Complete the form below to apply for usage of our world-class facilities and education.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4">

                {/* Step Indicator */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-premium-xl border border-slate-100 p-8 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-50" />
                    <div className="flex justify-between items-center relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = currentStep === step.number
                            const isCompleted = currentStep > step.number

                            return (
                                <div key={step.number} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center flex-1 relative">
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                backgroundColor: isCompleted ? '#16a34a' : isActive ? '#0A2540' : '#f8fafc'
                                            }}
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all ${isCompleted || isActive ? 'text-white shadow-lg' : 'text-slate-400 border border-slate-100'
                                                }`}
                                        >
                                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                        </motion.div>
                                        <div className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-ivs-navy' : isCompleted ? 'text-green-600' : 'text-slate-400'
                                            }`}>
                                            {step.title}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 px-2 md:px-4">
                                            <div className={`h-[2px] w-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-600' : 'bg-slate-100'
                                                }`} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
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
                                                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:outline-none transition-all"
                                                        placeholder="12345-1234567-1"
                                                    />
                                                </div>
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">Father's Phone *</label>
                                                    <input
                                                        type="tel"
                                                        name="fatherPhone"
                                                        value={formData.fatherPhone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:outline-none transition-all"
                                                        placeholder="03XX XXXXXXX"
                                                    />
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
                                        <div className="grid gap-6">
                                            <div className="group">
                                                <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">Mother's Full Name *</label>
                                                <input
                                                    type="text"
                                                    name="motherName"
                                                    value={formData.motherName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all ${errors.motherName ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-ivs-blue focus:shadow-lg'
                                                        }`}
                                                    placeholder="Enter full name"
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">Mother's CNIC (Optional)</label>
                                                    <input
                                                        type="text"
                                                        name="motherCNIC"
                                                        value={formData.motherCNIC}
                                                        onChange={handleInputChange}
                                                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:outline-none transition-all"
                                                        placeholder="12345-1234567-1"
                                                    />
                                                </div>
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-ivs-navy mb-3 uppercase tracking-wider">Mother's Phone (Optional)</label>
                                                    <input
                                                        type="tel"
                                                        name="motherPhone"
                                                        value={formData.motherPhone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:outline-none transition-all"
                                                        placeholder="03XX XXXXXXX"
                                                    />
                                                </div>
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
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:bg-white focus:outline-none transition-all resize-none"
                                            placeholder="House #, Street, Area"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">WhatsApp Number *</label>
                                            <input
                                                type="tel"
                                                name="whatsappNumber"
                                                value={formData.whatsappNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:bg-white focus:outline-none transition-all"
                                                placeholder="03XX XXXXXXX"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-bold text-ivs-navy mb-3 uppercase tracking-wider">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-ivs-blue focus:bg-white focus:outline-none transition-all"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
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
                                        { label: 'Student Photo *', id: 'studentPhoto', value: formData.studentPhoto },
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
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100 relative z-10">
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2 group"
                            >
                                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Previous
                            </button>
                        )}

                        {currentStep < 4 ? (
                            <button
                                onClick={nextStep}
                                className="ml-auto px-10 py-4 btn-premium group"
                            >
                                Next Step
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="ml-auto px-10 py-5 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-6 h-6" />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-12 text-center relative z-10">
                    <p className="text-slate-500 mb-6 font-medium">Need help with your application?</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                        <a href="tel:+923001234567" className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-ivs-navy font-bold">
                            <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">📞</span>
                            +92 300 1234567
                        </a>
                        <a href="https://wa.me/923001234567" className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-green-600 font-bold">
                            <span className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">💬</span>
                            WhatsApp Support
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}