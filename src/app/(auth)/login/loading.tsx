// src/app/(auth)/login/loading.tsx
export default function LoginLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto" />
                    <div className="h-10 bg-gray-200 rounded" />
                    <div className="h-10 bg-gray-200 rounded" />
                    <div className="h-12 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    )
}