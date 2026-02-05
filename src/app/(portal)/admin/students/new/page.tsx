'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, ChevronRight, Save, X } from 'lucide-react'
import Link from 'next/link'
import { uploadImage } from '@/lib/cloudinary'

export default function NewStudentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        grade: '',
        section: '',
        rollNo: '',
        phone: '',
        email: '',
        address: '',
        photoUrl: '', // Will store Cloudinary URL
    })

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            const base64data = reader.result as string
            const result = await uploadImage(base64data, 'ivs-students')
            if (result.success && result.url) {
                setFormData(prev => ({ ...prev, photoUrl: result.url! }))
            } else {
                alert('Upload failed: ' + result.error)
            }
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        try {
            // await fetch('/api/admin/students', { method: 'POST', body: JSON.stringify(formData) })
            console.log('Student Data:', formData)
            // Mock success
            setTimeout(() => {
                alert('Student added successfully!')
                router.push('/admin/students')
            }, 1000)
        } catch (error) {
            console.error('Error adding student:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-ivs-navy">New Admission</h1>
                    <p className="text-slate-500">Enter student details to create a new profile.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/students" className="btn-outline-premium">
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || uploading}
                        className="btn-premium"
                    >
                        {loading ? 'Saving...' : 'Create Profile'}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Photo Upload Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <label className="block text-sm font-bold text-ivs-navy mb-4">Student Photo</label>
                        <div className="relative group cursor-pointer">
                            <div className={`w-full aspect-square rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-slate-50 overflow-hidden ${uploading ? 'animate-pulse' : ''}`}>
                                {formData.photoUrl ? (
                                    <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                                            <Upload className="w-6 h-6 text-ivs-blue" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-500">Click to upload</p>
                                        <p className="text-xs text-slate-400">JPG, PNG up to 5MB</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-ivs-navy mb-6">Academic Information</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none transition-all"
                                    placeholder="e.g. Ali Ahmed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Grade</label>
                                <select
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none transition-all"
                                >
                                    <option value="">Select Grade</option>
                                    <option value="Playgroup">Playgroup</option>
                                    <option value="Nursery">Nursery</option>
                                    <option value="Class 1">Class 1</option>
                                    <option value="Class 2">Class 2</option>
                                    <option value="Class 3">Class 3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Section</label>
                                <input
                                    type="text"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none transition-all"
                                    placeholder="e.g. Blue"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Roll Number</label>
                                <input
                                    type="text"
                                    name="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none transition-all"
                                    placeholder="e.g. 1045"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-ivs-navy mb-6">Guardian Information</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Name</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none transition-all"
                                    placeholder="e.g. Ahmed Khan"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none transition-all"
                                    placeholder="0300-1234567"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none transition-all"
                                    placeholder="parent@example.com"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Residential Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-ivs-blue outline-none transition-all"
                                    placeholder="Street 4, Sector F-10..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
