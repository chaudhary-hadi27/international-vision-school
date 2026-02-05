'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Clock, Bell } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';

const EVENTS = [
    {
        id: 1,
        title: 'Annual Sports Extravaganza 2024',
        date: 'March 15, 2024',
        time: '09:00 AM - 04:00 PM',
        location: 'Main Sports Complex',
        image: 'https://images.unsplash.com/photo-1544531696-60c35eb31835?q=80&w=1200',
        category: 'Sports',
        description: 'A day of competitive sports, teamwork, and athletic excellence featuring track events, football finals, and much more.',
    },
    {
        id: 2,
        title: 'Middle School Science Fair',
        date: 'April 05, 2024',
        time: '10:00 AM - 02:00 PM',
        location: 'Innovation Lab',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',
        category: 'Academics',
        description: 'Witness the next generation of scientists as students showcase their innovative projects and scientific discoveries.',
    },
    {
        id: 3,
        title: 'Parents Awareness Workshop',
        date: 'April 20, 2024',
        time: '04:00 PM - 06:00 PM',
        location: 'Auditorium',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200',
        category: 'Workshop',
        description: 'An interactive session for parents on nurturing emotional intelligence and academic resilience in the digital age.',
    }
];

export default function EventsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-white">
            <div className="container-custom">
                {/* Header section with decorative glass element */}
                <div className="relative mb-24 rounded-[3rem] overflow-hidden bg-ivs-navy px-8 py-20 lg:p-24">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ivs-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full mb-8 font-bold text-xs uppercase tracking-widest border border-white/10"
                        >
                            <Calendar className="w-4 h-4 text-ivs-gold" />
                            Events Calendar
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
                        >
                            Where Moments Become <span className="text-gradient from-ivs-gold via-yellow-400 to-ivs-gold">Memories</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg md:text-xl leading-relaxed"
                        >
                            Join us in celebrating academic achievements, athletic milestones, and community gatherings that define the IVS spirit.
                        </motion.p>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="space-y-16 mb-32">
                    {EVENTS.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative grid lg:grid-cols-12 gap-8 items-center bg-white rounded-[3.5rem] p-6 lg:p-10 hover:shadow-premium-xl transition-all duration-700 border border-slate-100 hover:border-ivs-blue/20 overflow-hidden"
                        >
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-ivs-blue/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="lg:col-span-5 aspect-[4/3] relative rounded-[2.5rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-700">
                                <NextImage
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 px-6 py-2.5 glass-surface rounded-2xl text-ivs-navy font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg">
                                    {event.category}
                                </div>
                            </div>

                            <div className="lg:col-span-7 flex flex-col justify-center space-y-8 relative z-10 px-4 lg:px-6">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-8 text-[11px] font-bold text-ivs-blue uppercase tracking-[0.2em] items-center">
                                        <div className="flex items-center gap-3 bg-ivs-blue/5 px-4 py-2 rounded-xl">
                                            <Calendar className="w-4 h-4" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl text-slate-500">
                                            <Clock className="w-4 h-4" />
                                            {event.time}
                                        </div>
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-bold text-ivs-navy group-hover:text-ivs-blue transition-colors leading-tight font-heading">
                                        {event.title}
                                    </h2>
                                </div>

                                <p className="text-slate-500 text-lg leading-relaxed max-w-2xl font-medium">
                                    {event.description}
                                </p>

                                <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    {event.location}
                                </div>

                                <div className="pt-4 flex items-center gap-6">
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="btn-premium py-5 px-10 group/btn"
                                    >
                                        Explore Event
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
                                    </Link>
                                    <button className="w-16 h-16 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-ivs-blue hover:text-ivs-blue hover:bg-ivs-blue/5 transition-all">
                                        <Bell className="w-7 h-7" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter/CTA section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-surface-dark rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511551203524-9a24350a5e83?q=80&w=2070')] bg-cover bg-center opacity-10 animate-pulse duration-[10s]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ivs-navy via-ivs-blue/80 to-ivs-navy opacity-95" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="w-20 h-20 bg-ivs-gold/20 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-ivs-gold/30">
                            <Sparkles className="w-10 h-10 text-ivs-gold" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-heading tracking-tight">Stay in the <span className="text-ivs-gold italic">Vision</span></h2>
                        <p className="text-blue-100/70 text-lg md:text-xl mb-12 font-medium leading-relaxed">Join our inner circle to receive exclusive updates on campus developments, student accolades, and prestigious events.</p>

                        <form className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="official.email@example.com"
                                className="flex-1 px-8 py-4 bg-transparent text-white placeholder:text-blue-200/30 focus:outline-none font-medium"
                                required
                            />
                            <button className="btn-premium !bg-ivs-gold !text-ivs-navy hover:!bg-white px-10 py-4 shadow-xl shadow-ivs-gold/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
