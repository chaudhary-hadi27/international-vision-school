'use client';

import { ArrowRight, Award, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-white">
            {/* Background Image with Slow Zoom */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                    className="w-full h-full relative"
                >
                    <NextImage
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
                        alt="International Vision School Students"
                        fill
                        className="object-cover object-center brightness-[0.4]"
                        priority
                    />
                </motion.div>
                {/* Refined Gradient Overlays - Adjusted for White Theme */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full container-custom">
                <div className="max-w-4xl">
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 glass-surface rounded-full mb-10 border border-white/10 shadow-gold-glow animate-float"
                    >
                        <Award className="w-4 h-4 text-ivs-gold" />
                        <span className="text-[13px] font-bold text-ivs-navy tracking-[0.15em] uppercase">Excellence Since 2010</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ivs-navy mb-8 leading-[1.1] tracking-tight"
                    >
                        Nurturing Minds,<br />
                        <span className="text-gradient from-ivs-gold via-yellow-400 to-ivs-gold animate-gradient-x">
                            Building Character
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl font-light italic"
                    >
                        IVS blends academic rigor with moral excellence, shaping visionary leaders for a global future.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-5"
                    >
                        <Link
                            href="/admissions"
                            className="btn-premium !rounded-full !bg-ivs-blue hover:!bg-ivs-accent"
                        >
                            Apply Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                        </Link>

                        <Link
                            href="/about"
                            className="btn-glass !rounded-full"
                        >
                            <span className="w-10 h-10 rounded-full bg-ivs-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-ivs-gold text-ivs-gold" />
                            </span>
                            Discover Our Vision
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Stats - Desktop Only */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="hidden xl:flex absolute right-12 bottom-24 flex-col gap-12 z-10 py-8 border-l border-ivs-navy/10 pl-12"
            >
                <div>
                    <div className="text-5xl font-bold text-ivs-navy mb-2">15+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-[0.2em]">Years of Legacy</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-ivs-navy mb-2">100%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-[0.2em]">Success Rate</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-ivs-navy mb-2">2k+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-[0.2em]">Global Alumni</div>
                </div>
            </motion.div>

            {/* Decorative Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-ivs-gold to-transparent opacity-50"></div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Scroll</span>
            </motion.div>
        </section>
    );
}