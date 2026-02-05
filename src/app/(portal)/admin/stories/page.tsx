// src/app/(portal)/admin/stories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Trash,
    Edit,
    Star,
    Image as ImageIcon,
    RefreshCcw,
    X,
    CheckCircle2,
    Quote,
    GraduationCap,
    Building2,
    Award,
    Sparkles,
    Calendar,
    UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVars = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0 }
}

export default function AdminStoriesPage() {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        university: '',
        batch: '',
        achievement: '',
        quote: '',
        photoUrl: '',
        isFeatured: false
    });

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/stories');
            const data = await res.json();
            if (data.success) setStories(data.data);
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/stories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setIsFormOpen(false);
            fetchStories();
            resetForm();
        } catch (error) {
            console.error('Error saving story:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            studentName: '',
            university: '',
            batch: '',
            achievement: '',
            quote: '',
            photoUrl: '',
            isFeatured: false
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-2xl font-bold text-ivs-navy mb-1">Hall of Fame</h1>
                    <p className="text-slate-500 font-medium text-sm">Celebrate the legacy and achievements of IVS alumni.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchStories}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-ivs-navy hover:bg-slate-50 transition-all flex items-center justify-center"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 bg-ivs-blue text-white rounded-lg text-sm font-bold hover:bg-ivs-blue/90 flex items-center gap-2 shadow-sm transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Legacy Story</span>
                    </button>
                </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-ivs-blue rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Total Stories</p>
                        <p className="text-2xl font-bold text-ivs-navy">{stories.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                    <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">Featured Alumni</p>
                        <p className="text-2xl font-bold text-ivs-navy">{stories.filter(s => s.isFeatured).length}</p>
                    </div>
                </div>
            </div>

            {/* Content Feed */}
            <AnimatePresence mode="wait">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 border-4 border-ivs-blue/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-ivs-navy border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Polishing Hall of Fame...</p>
                    </div>
                ) : stories.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-xl border border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <GraduationCap className="w-8 h-8 text-slate-300" />
                        </div>
                        <h2 className="text-lg font-bold text-ivs-navy">No Stories Yet</h2>
                        <p className="text-slate-500 mt-2 font-medium text-sm">Capture your first alumni success story to inspire current students.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVars}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {stories.map(story => (
                            <motion.div
                                key={story.id}
                                variants={itemVars}
                                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col group"
                            >
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="relative shrink-0">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative z-10">
                                            {story.photoUrl ? (
                                                <img src={story.photoUrl} alt={story.studentName} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                                    <UserCircle className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        {story.isFeatured && (
                                            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-sm z-20 border-2 border-white">
                                                <Star className="w-3 h-3 fill-current" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-bold text-ivs-navy truncate">{story.studentName}</h3>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                                            <Building2 className="w-3.5 h-3.5" />
                                            <span className="truncate">{story.university || 'IVS Alumni'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="bg-sky-50 rounded-lg p-3 border border-sky-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Award className="w-3.5 h-3.5 text-sky-600" />
                                            <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">Notable Achievement</span>
                                        </div>
                                        <p className="text-sm font-bold text-ivs-navy leading-snug">
                                            {story.achievement || "High Academic Distinction"}
                                        </p>
                                    </div>

                                    {story.quote && (
                                        <div className="relative pl-5">
                                            <span className="absolute top-0 left-0 text-3xl text-slate-200 leading-none font-serif">"</span>
                                            <p className="text-sm text-slate-600 italic font-medium leading-relaxed relative z-10">
                                                {story.quote}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Batch Class</span>
                                        <span className="text-sm font-bold text-ivs-navy">Class of {story.batch || 'TBD'}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-ivs-navy hover:bg-slate-50 transition-all">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all">
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFormOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-xl p-6 md:p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-200"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-ivs-blue rounded-lg flex items-center justify-center text-white">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-ivs-navy leading-none mb-1">Legacy Builder</h2>
                                        <p className="text-sm font-medium text-slate-500">Post a new alumni success story.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsFormOpen(false)}
                                    className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-ivs-navy transition-all hover:bg-slate-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Student Name *</label>
                                        <div className="relative">
                                            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={formData.studentName}
                                                onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all"
                                                placeholder="e.g. Abdullah Khan"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Batch / Class *</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={formData.batch}
                                                onChange={e => setFormData({ ...formData, batch: e.target.value })}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all"
                                                placeholder="e.g. 2021"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Placement / University</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={formData.university}
                                                onChange={e => setFormData({ ...formData, university: e.target.value })}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all"
                                                placeholder="e.g. LUMS / Google"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Achievement Focus</label>
                                        <div className="relative">
                                            <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={formData.achievement}
                                                onChange={e => setFormData({ ...formData, achievement: e.target.value })}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all"
                                                placeholder="e.g. Software Engineer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Personal Quote / Reflection</label>
                                    <div className="relative">
                                        <Quote className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                                        <textarea
                                            value={formData.quote}
                                            onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                            rows={4}
                                            className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-medium text-slate-700 transition-all resize-none leading-relaxed"
                                            placeholder="What would they say to current students?"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Profile Visual (URL) *</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input
                                                type="url"
                                                value={formData.photoUrl}
                                                onChange={e => setFormData({ ...formData, photoUrl: e.target.value })}
                                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-ivs-blue focus:ring-2 focus:ring-ivs-blue/10 outline-none font-semibold text-ivs-navy transition-all text-sm"
                                                placeholder="Link to Cloudinary image..."
                                                required
                                            />
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-2 cursor-pointer group w-fit select-none">
                                        <div className={`w-5 h-5 rounded border border-slate-300 transition-all flex items-center justify-center ${formData.isFeatured ? 'bg-ivs-gold border-ivs-gold' : 'bg-white group-hover:border-ivs-gold'}`}>
                                            {formData.isFeatured && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={formData.isFeatured}
                                            onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                            className="hidden"
                                        />
                                        <span className="text-sm font-semibold text-ivs-navy">Feature on Website Homepage</span>
                                    </label>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        className="flex-1 py-2.5 bg-slate-100 text-slate-500 rounded-lg font-bold hover:bg-slate-200 transition-all"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-2.5 bg-ivs-navy text-white rounded-lg font-bold hover:bg-ivs-blue shadow-sm transition-all flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4 text-ivs-gold" />
                                        Commit to History
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
