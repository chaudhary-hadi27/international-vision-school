// src/app/(portal)/admission-portal/loading.tsx
export default function AdmissionPortalLoading() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="animate-pulse">
                    <div className="text-center mb-8">
                        <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
                        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex justify-between items-center mb-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                                    <div className="h-10 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}