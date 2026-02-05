'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, GraduationCap } from 'lucide-react';

export default function AlumniPage() {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await fetch('/api/stories');
                const data = await res.json();
                if (data.success) setStories(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="bg-ivs-navy text-white py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6">
                        Hall of Fame
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Our Pride, Our Legacy
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Discover the inspiring journeys of IVS alumni who are making their mark on the world.
                    </p>
                </motion.div>
            </section>

            {/* Stories Grid */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">Loading stories...</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stories.map((story, index) => (
                                <motion.div
                                    key={story.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow p-6 md:p-8 flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                                            {story.photoUrl ? (
                                                <img src={story.photoUrl} alt={story.studentName} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-ivs-navy text-white text-xl font-bold">
                                                    {story.studentName.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{story.studentName}</h3>
                                            <p className="text-ivs-blue font-medium">{story.university}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 flex-grow">
                                        <div className="flex gap-2 mb-4">
                                            {story.batch && (
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                                                    Batch {story.batch}
                                                </span>
                                            )}
                                            {story.achievement && (
                                                <span className="px-3 py-1 bg-amber-50 rounded-full text-xs font-bold text-amber-700">
                                                    {story.achievement}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 italic relative z-10">
                                            <Quote className="w-8 h-8 text-blue-50 absolute -top-4 -left-2 -z-10" />
                                            "{story.quote}"
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
