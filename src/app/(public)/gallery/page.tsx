// src/app/(public)/gallery/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, X, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import NextImage from 'next/image';

const CATEGORIES = ['All', 'Campus', 'Events', 'Academics', 'Sports'];

interface GalleryImage {
    id: string;
    url: string;
    category: string;
    title: string | null;
    description: string | null;
    isFeatured: boolean;
}

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/gallery');
            const data = await res.json();
            if (data.success) {
                setImages(data.data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredImages = selectedCategory === 'All'
        ? images
        : images.filter(img => img.category === selectedCategory);

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="container-custom">
                {/* Header Section */}
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-ivs-blue/5 border border-ivs-blue/10 text-ivs-blue rounded-full mb-6 font-bold text-xs uppercase tracking-[0.2em]"
                    >
                        <Camera className="w-4 h-4" />
                        Our Visual Legacy
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-ivs-navy font-heading"
                    >
                        Life at <span className="text-ivs-blue">IVS</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
                    >
                        A window into the vibrant campus life, academic excellence, and memorable events that define our community.
                    </motion.p>
                </div>

                {/* Filtering Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-10 py-4 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${selectedCategory === cat
                                ? 'bg-ivs-navy text-white shadow-2xl shadow-ivs-navy/20 scale-105'
                                : 'bg-white text-slate-400 hover:text-ivs-navy border border-slate-100 hover:border-ivs-blue shadow-sm'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Results Grid */}
                <AnimatePresence mode='wait'>
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-32 flex flex-col items-center justify-center"
                        >
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 border-4 border-ivs-blue/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-ivs-navy border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="mt-6 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Processing Visual Archive...</p>
                        </motion.div>
                    ) : filteredImages.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-32 bg-slate-50 rounded-[3rem] border border-slate-100"
                        >
                            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <ImageIcon className="w-10 h-10 text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-bold text-ivs-navy mb-2">The Gallery is Quiet</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">No memories have been added to this collection yet. Check back soon for updates.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredImages.map((image) => (
                                    <motion.div
                                        key={image.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className="group relative aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden cursor-pointer premium-card shadow-lg hover:shadow-2xl transition-all duration-500"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <NextImage
                                            src={image.url}
                                            alt={image.title || 'IVS Story'}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ivs-navy/90 via-ivs-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                className="space-y-3"
                                            >
                                                <p className="text-ivs-gold text-xs font-bold uppercase tracking-[0.2em]">{image.category}</p>
                                                <h3 className="text-white text-2xl font-bold leading-tight">{image.title || 'A Moment at IVS'}</h3>
                                            </motion.div>
                                            <div className="absolute top-10 right-10">
                                                <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 text-white transform hover:rotate-12 transition-transform">
                                                    <Maximize2 className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-ivs-navy/98 backdrop-blur-2xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all flex items-center justify-center z-10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative w-full max-w-6xl aspect-[16/10] md:aspect-video overflow-hidden rounded-[3rem] md:rounded-[4rem] shadow-premium-xl bg-black border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <NextImage
                                src={selectedImage.url}
                                alt={selectedImage.title || ''}
                                fill
                                className="object-contain"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-ivs-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-3">{selectedImage.category}</p>
                                    <h3 className="text-white text-3xl md:text-5xl font-bold font-heading">{selectedImage.title || 'Alumni Achievement'}</h3>
                                    {selectedImage.description && (
                                        <p className="text-slate-400 mt-4 text-lg hidden md:block max-w-3xl leading-relaxed">
                                            {selectedImage.description}
                                        </p>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
