// src/app/(portal)/(admin)/admin/loading.tsx
export default function AdminLoading() {
    return (
        <div className="p-8">
            <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-1/4" />
                <div className="grid md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-xl" />
                    ))}
                </div>
                <div className="h-96 bg-gray-200 rounded-xl" />
            </div>
        </div>
    )
}