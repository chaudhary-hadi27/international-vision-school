'use client';

import { Award, Globe, TrendingUp, Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
    {
        id: 1,
        name: 'Years of Excellence',
        value: '15+',
        icon: Award,
    },
    {
        id: 2,
        name: 'Happy Students',
        value: '2000+',
        icon: Users,
    },
    {
        id: 3,
        name: 'Success Rate',
        value: '98%',
        icon: TrendingUp,
    },
    {
        id: 4,
        name: 'Expert Teachers',
        value: '100+',
        icon: Globe,
    },
];

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 sm:py-32 bg-white relative overflow-hidden">
            {/* Background Pattern & Gradients */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ivs-blue-light/20 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ivs-blue-light/20 rounded-full blur-[120px] translate-y-1/2" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.65, 0, 0.35, 1] }}
                            className="text-center group"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-[2rem] bg-ivs-blue-light/10 border border-ivs-blue-light/20 text-ivs-blue group-hover:bg-ivs-blue group-hover:text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lg">
                                <stat.icon className="w-10 h-10" />
                            </div>
                            <div className="text-5xl sm:text-6xl font-bold text-ivs-navy mb-3 font-heading tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-slate-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                                {stat.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
