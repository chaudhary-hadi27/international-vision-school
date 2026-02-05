// src/app/(portal)/admin/gallery/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
    Plus,
    Trash2,
    Edit,
    Image as ImageIcon,
    RefreshCcw,
    X,
    CheckCircle2,
    Star,
    Filter,
    Search,
    ChevronDown,
    Zap,
    UploadCloud,
    Maximize2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import NextImage from 'next/image'

interface GalleryImage {
    id: string
    url: string
    category: string
    title: string | null
    description: string | null
    isFeatured: boolean
    createdAt: string
}

const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVars = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0 }
}

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [formData, setFormData] = useState({
        url: '',
        category: 'Campus',
        title: '',
        description: '',
        isFeatured: false
    })

    const categories = ['Campus', 'Events', 'Academics', 'Sports']

    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/gallery')
            const data = await res.json()
            if (data.success) setImages(data.data)
        } catch (error) {
            console.error('Error fetching gallery:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.url) return

        try {
            const res = await fetch('/api/admin/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                setShowModal(false)
                fetchGallery()
                setFormData({
                    url: '',
                    category: 'Campus',
                    title: '',
                    description: '',
                    isFeatured: false
                })
            }
        } catch (error) {
            console.error('Error adding image:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return
        try {
            const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) fetchGallery()
        } catch (error) {
            console.error('Error deleting image:', error)
        }
    }

    const filteredImages = selectedCategory === 'All'
        ? images
        : images.filter(img => img.category === selectedCategory)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-2xl font-bold text-ivs-navy mb-1">Visual Assets</h1>
                    <p className="text-slate-500 font-medium text-sm">Manage the photo gallery and campus highlights.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchGallery}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-ivs-navy hover:bg-slate-50 transition-all flex items-center justify-center p-0"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-ivs-blue text-white rounded-lg text-sm font-bold hover:bg-ivs-blue/90 flex items-center gap-2 shadow-sm transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Asset</span>
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 w-fit">
                {['All', ...categories].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                            ${selectedCategory === cat
                                ? 'bg-ivs-navy text-white shadow-sm'
                                : 'text-slate-500 hover:text-ivs-navy hover:bg-slate-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <AnimatePresence mode="wait">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 border-4 border-ivs-blue/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-ivs-navy border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Developing Darkroom Assets...</p>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-xl border border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <ImageIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <h2 className="text-lg font-bold text-ivs-navy">No Assets Found</h2>
                        <p className="text-slate-500 mt-2 font-medium text-sm">Upload your first campus memory to showcase on the website.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVars}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                variants={itemVars}
                                className="group relative aspect-[4/5] bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all"
                            >
                                <NextImage
                                    src={image.url}
                                    alt={image.title || 'Gallery Image'}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <div className="space-y-1">
                                        <p className="text-ivs-gold text-[10px] font-bold uppercase tracking-wider">{image.category}</p>
                                        <h3 className="text-white font-bold leading-tight text-sm">{image.title || 'Untitled Asset'}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white hover:text-ivs-navy transition-all">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(image.id)}
                                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-rose-500 hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {image.isFeatured && (
                                    <div className="absolute top-3 right-3 w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center text-white shadow-sm">
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-xl p-6 md:p-8 max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-ivs-navy rounded-lg flex items-center justify-center text-white">
                                        <UploadCloud className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-ivs-navy leading-none mb-1">Add Visual Asset</h2>
                                        <p className="text-sm font-medium text-slate-500">Upload new content to the gallery.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-ivs-navy transition-all hover:bg-slate-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Asset URL (Cloudinary) *</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            type="url"
                                            value={formData.url}
                                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all placeholder:text-slate-400"
                                            placeholder="Paste the delivery URL here..."
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Asset Category</label>
                                        <div className="relative">
                                            <select
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy appearance-none transition-all cursor-pointer"
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="flex items-end pb-1">
                                        <label className="flex items-center gap-2 cursor-pointer group select-none">
                                            <div className={`w-5 h-5 rounded border border-slate-300 transition-all flex items-center justify-center ${formData.isFeatured ? 'bg-amber-400 border-amber-400' : 'bg-white group-hover:border-amber-400'}`}>
                                                {formData.isFeatured && <Star className="w-3 h-3 text-white fill-current" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={formData.isFeatured}
                                                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                                className="hidden"
                                            />
                                            <span className="text-sm font-semibold text-ivs-navy">Feature Highlighting</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Asset Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all placeholder:text-slate-400"
                                        placeholder="Brief descriptive name..."
                                    />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-slate-100 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-all"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[1.5] py-2.5 bg-ivs-navy text-white rounded-lg font-bold hover:bg-ivs-navy/90 shadow-sm transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                        Record Registry
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
