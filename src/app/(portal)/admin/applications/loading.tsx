// src/app/(portal)/(admin)/admin/applications/loading.tsx
export default function ApplicationsLoading() {
    return (
        <div className="space-y-6">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded flex-1" />
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-16 bg-gray-200 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}