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

        // Step 4: Documents (we'll store file names)
        studentPhoto: null as File | null,
        birthCertificate: null as File | null,
        fatherCNICDoc: null as File | null,
        motherCNICDoc: null as File | null,
    })

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, [fieldName]: 'File size should be less than 2MB' }))
                return
            }
            setFormData(prev => ({ ...prev, [fieldName]: file }))
            setErrors(prev => ({ ...prev, [fieldName]: '' }))
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

        try {
            const submitData = new FormData()

            // Append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value && !(value instanceof File)) {
                    submitData.append(key, value.toString())
                }
            })

            // Append files
            if (formData.studentPhoto) submitData.append('studentPhoto', formData.studentPhoto)
            if (formData.birthCertificate) submitData.append('birthCertificate', formData.birthCertificate)
            if (formData.fatherCNICDoc) submitData.append('fatherCNICDoc', formData.fatherCNICDoc)
            if (formData.motherCNICDoc) submitData.append('motherCNICDoc', formData.motherCNICDoc)

            const response = await fetch('/api/admission', {
                method: 'POST',
                body: submitData,
            })

            if (response.ok) {
                const data = await response.json()
                // Redirect to thank you page
                window.location.href = `/admission-portal/thank-you?id=${data.applicationId}`
            } else {
                const error = await response.json()
                alert(error.message || 'Submission failed. Please try again.')
            }
        } catch (error) {
            console.error('Submission error:', error)
            alert('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admission Application Form</h1>
                    <p className="text-gray-600">Complete all steps to submit your application</p>
                </div>

                {/* Step Indicator */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = currentStep === step.number
                            const isCompleted = currentStep > step.number

                            return (
                                <div key={step.number} className="flex items-center flex-1">
                                    <div className="flex flex-col items-center flex-1">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                            isCompleted
                                                ? 'bg-green-600 text-white'
                                                : isActive
                                                    ? 'bg-blue-900 text-white'
                                                    : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                        </div>
                                        <div className={`mt-2 text-sm font-semibold ${
                                            isActive ? 'text-blue-900' : isCompleted ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                            {step.title}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`h-0.5 flex-1 mx-4 ${
                                            isCompleted ? 'bg-green-600' : 'bg-gray-200'
                                        }`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8">

                    {/* Step 1: Student Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Information</h2>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Student Full Name *</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                        errors.studentName ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                    }`}
                                    placeholder="Enter student's full name"
                                />
                                {errors.studentName && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.studentName}
                                    </p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Date of Birth *</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                            errors.dateOfBirth ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                        }`}
                                    />
                                    {errors.dateOfBirth && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.dateOfBirth}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                            errors.gender ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                        }`}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.gender}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Applying for Grade *</label>
                                    <select
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                            errors.grade ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                        }`}
                                    >
                                        <option value="">Select Grade</option>
                                        {grades.map(grade => (
                                            <option key={grade} value={grade}>{grade}</option>
                                        ))}
                                    </select>
                                    {errors.grade && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.grade}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Previous School (if any)</label>
                                    <input
                                        type="text"
                                        name="previousSchool"
                                        value={formData.previousSchool}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                        placeholder="Previous school name"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Parent Information */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Parent/Guardian Information</h2>

                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                <h3 className="font-bold text-blue-900 mb-2">Father's Information</h3>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Father's Full Name *</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                        errors.fatherName ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                    }`}
                                    placeholder="Enter father's full name"
                                />
                                {errors.fatherName && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.fatherName}
                                    </p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Father's CNIC *</label>
                                    <input
                                        type="text"
                                        name="fatherCNIC"
                                        value={formData.fatherCNIC}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                            errors.fatherCNIC ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                        }`}
                                        placeholder="12345-1234567-1"
                                    />
                                    {errors.fatherCNIC && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.fatherCNIC}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Father's Phone *</label>
                                    <input
                                        type="tel"
                                        name="fatherPhone"
                                        value={formData.fatherPhone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                            errors.fatherPhone ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                        }`}
                                        placeholder="03XX XXXXXXX"
                                    />
                                    {errors.fatherPhone && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.fatherPhone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Father's Occupation</label>
                                <input
                                    type="text"
                                    name="fatherOccupation"
                                    value={formData.fatherOccupation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                    placeholder="Enter occupation"
                                />
                            </div>

                            <div className="bg-pink-50 rounded-lg p-4 mb-6 mt-8">
                                <h3 className="font-bold text-pink-900 mb-2">Mother's Information</h3>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Mother's Full Name *</label>
                                <input
                                    type="text"
                                    name="motherName"
                                    value={formData.motherName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                        errors.motherName ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                    }`}
                                    placeholder="Enter mother's full name"
                                />
                                {errors.motherName && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.motherName}
                                    </p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Mother's CNIC</label>
                                    <input
                                        type="text"
                                        name="motherCNIC"
                                        value={formData.motherCNIC}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                        placeholder="12345-1234567-1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Mother's Phone</label>
                                    <input
                                        type="tel"
                                        name="motherPhone"
                                        value={formData.motherPhone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                        placeholder="03XX XXXXXXX"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Mother's Occupation</label>
                                <input
                                    type="text"
                                    name="motherOccupation"
                                    value={formData.motherOccupation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                    placeholder="Enter occupation"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Address & Contact */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Complete Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition resize-none ${
                                        errors.address ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                    }`}
                                    placeholder="House #, Street, Area"
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.address}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                        errors.city ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                    }`}
                                    placeholder="Lahore"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.city}
                                    </p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">WhatsApp Number *</label>
                                    <input
                                        type="tel"
                                        name="whatsappNumber"
                                        value={formData.whatsappNumber}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                            errors.whatsappNumber ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                        }`}
                                        placeholder="03XX XXXXXXX"
                                    />
                                    {errors.whatsappNumber && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.whatsappNumber}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                                            errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-900'
                                        }`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-4">
                                <h3 className="font-bold text-amber-900 mb-3">Emergency Contact</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Contact Person</label>
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Relation</label>
                                        <input
                                            type="text"
                                            name="emergencyRelation"
                                            value={formData.emergencyRelation}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                            placeholder="Uncle, Aunt, etc."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Documents */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents</h2>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> All files must be in JPG, PNG, or PDF format and less than 2MB in size.
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Student Photo (Passport Size) *</label>
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                                    errors.studentPhoto ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-900'
                                }`}>
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'studentPhoto')}
                                        className="hidden"
                                        id="studentPhoto"
                                    />
                                    <label htmlFor="studentPhoto" className="cursor-pointer">
                                        <span className="text-blue-900 font-semibold hover:underline">Click to upload</span>
                                        <span className="text-gray-600"> or drag and drop</span>
                                    </label>
                                    {formData.studentPhoto && (
                                        <p className="text-sm text-green-600 mt-2">✓ {formData.studentPhoto.name}</p>
                                    )}
                                </div>
                                {errors.studentPhoto && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.studentPhoto}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Birth Certificate / B-Form *</label>
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                                    errors.birthCertificate ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-900'
                                }`}>
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) => handleFileChange(e, 'birthCertificate')}
                                        className="hidden"
                                        id="birthCertificate"
                                    />
                                    <label htmlFor="birthCertificate" className="cursor-pointer">
                                        <span className="text-blue-900 font-semibold hover:underline">Click to upload</span>
                                        <span className="text-gray-600"> or drag and drop</span>
                                    </label>
                                    {formData.birthCertificate && (
                                        <p className="text-sm text-green-600 mt-2">✓ {formData.birthCertificate.name}</p>
                                    )}
                                </div>
                                {errors.birthCertificate && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> {errors.birthCertificate}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Father's CNIC Copy (Optional)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-900 transition">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) => handleFileChange(e, 'fatherCNICDoc')}
                                        className="hidden"
                                        id="fatherCNICDoc"
                                    />
                                    <label htmlFor="fatherCNICDoc" className="cursor-pointer">
                                        <span className="text-blue-900 font-semibold hover:underline">Click to upload</span>
                                    </label>
                                    {formData.fatherCNICDoc && (
                                        <p className="text-sm text-green-600 mt-2">✓ {formData.fatherCNICDoc.name}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Mother's CNIC Copy (Optional)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-900 transition">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) => handleFileChange(e, 'motherCNICDoc')}
                                        className="hidden"
                                        id="motherCNICDoc"
                                    />
                                    <label htmlFor="motherCNICDoc" className="cursor-pointer">
                                        <span className="text-blue-900 font-semibold hover:underline">Click to upload</span>
                                    </label>
                                    {formData.motherCNICDoc && (
                                        <p className="text-sm text-green-600 mt-2">✓ {formData.motherCNICDoc.name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                                <p className="text-sm text-green-800">
                                    <strong>Almost Done!</strong> Review your information and click submit to complete your application.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t">
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition inline-flex items-center gap-2"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>
                        )}

                        {currentStep < 4 ? (
                            <button
                                onClick={nextStep}
                                className="ml-auto px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition inline-flex items-center gap-2"
                            >
                                Next Step
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="ml-auto px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-2">Need help with your application?</p>
                    <div className="flex justify-center gap-4">
                        <a href="tel:+923001234567" className="text-blue-900 font-semibold hover:underline">
                            📞 Call: +92 300 1234567
                        </a>
                        <a href="https://wa.me/923001234567" className="text-green-600 font-semibold hover:underline">
                            💬 WhatsApp Support
                        </a>
                    </div>
                </div>

            </div>
        </main>
    )
}