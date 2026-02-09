'use client'

import { motion } from 'framer-motion'

export default function AdmissionPortalLoading() {
    return (
        <main className="min-h-screen bg-[#FAFBFF] py-20 px-6 mt-10">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-12">
                    {/* Header Skeleton */}
                    <div className="text-center space-y-4">
                        <div className="h-12 bg-slate-200/60 rounded-3xl w-3/4 mx-auto animate-pulse" />
                        <div className="h-4 bg-slate-200/40 rounded-full w-1/2 mx-auto animate-pulse" />
                    </div>

                    {/* Step Indicator Skeleton */}
                    <div className="bg-white/40 backdrop-blur-sm rounded-[3rem] border border-slate-100 p-8 shadow-sm">
                        <div className="flex justify-between items-center relative gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex flex-col items-center gap-3 relative z-10 flex-1">
                                    <div className="w-14 h-14 bg-slate-200/50 rounded-2xl animate-pulse" />
                                    <div className="h-3 bg-slate-200/40 rounded-full w-16 animate-pulse" />
                                </div>
                            ))}
                            {/* Connector Line Skeleton */}
                            <div className="absolute top-7 left-10 right-10 h-[2px] bg-slate-100 -z-0" />
                        </div>
                    </div>

                    {/* Form Card Skeleton */}
                    <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] p-12 md:p-20 overflow-hidden relative">
                        {/* Shimmer Effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]" />

                        <div className="space-y-12 relative z-10">
                            <div className="space-y-3">
                                <div className="h-8 bg-slate-200/60 rounded-2xl w-1/3 animate-pulse" />
                                <div className="h-4 bg-slate-200/30 rounded-full w-2/3 animate-pulse" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="h-3 bg-slate-200/40 rounded-full w-1/4 animate-pulse uppercase tracking-widest" />
                                        <div className="h-16 bg-slate-100/50 rounded-2xl animate-pulse" />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-10 flex justify-between items-center border-t border-slate-50">
                                <div className="w-32 h-14 bg-slate-100 rounded-2xl animate-pulse" />
                                <div className="w-40 h-14 bg-slate-200/80 rounded-2xl animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </main>
    )
}