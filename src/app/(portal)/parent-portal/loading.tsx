// src/app/(portal)/parent-portal/loading.tsx
export default function ParentPortalLoading() {
    return (
        <div className="space-y-6">
            <div className="animate-pulse">
                <div className="bg-gradient-to-r from-ivs-navy to-blue-700 rounded-2xl p-8 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/20 rounded-full" />
                        <div className="flex-1">
                            <div className="h-8 bg-white/20 rounded w-1/3 mb-2" />
                            <div className="h-4 bg-white/20 rounded w-1/4" />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
                            <div className="h-10 bg-gray-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((j) => (
                                    <div key={j} className="h-12 bg-gray-200 rounded" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}