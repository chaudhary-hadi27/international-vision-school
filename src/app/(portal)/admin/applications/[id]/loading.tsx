// src/app/(portal)/(admin)/admin/applications/[id]/loading.tsx
export default function ApplicationDetailLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i}>
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                            <div className="h-6 bg-gray-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded" />
                    ))}
                </div>
            </div>
        </div>
    )
}