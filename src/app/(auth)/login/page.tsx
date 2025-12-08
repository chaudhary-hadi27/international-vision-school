// src/app/(auth)/login/page.tsx
'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { GraduationCap, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from 'next/link'

type UserRole = 'PARENT' | 'ADMIN'

interface FormData {
    email: string
    password: string
    role: UserRole
}

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const authError = searchParams.get('error')

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        role: 'PARENT',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(authError || '')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (result?.error) {
                setError('Invalid email or password')
                setLoading(false)
                return
            }

            if (result?.ok) {
                const redirectUrl = formData.role === 'ADMIN' ? '/admin' : '/parent-portal'
                router.push(redirectUrl)
                router.refresh()
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('Something went wrong. Please try again.')
            setLoading(false)
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRoleChange = (role: UserRole) => {
        setFormData((prev) => ({ ...prev, role }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl cursor-pointer hover:scale-105 transition">
                            <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to IVS</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Role Selector */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('PARENT')}
                            className={`py-3 rounded-lg font-semibold transition ${
                                formData.role === 'PARENT'
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Parent
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleChange('ADMIN')}
                            className={`py-3 rounded-lg font-semibold transition ${
                                formData.role === 'ADMIN'
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Admin
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-900 rounded" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-blue-900 hover:underline font-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-blue-900 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/admission-portal" className="text-blue-900 font-semibold hover:underline">
                            Apply for Admission
                        </Link>
                    </div>
                </div>

                {/* Demo Note - Remove in production */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                        <p className="font-semibold text-amber-900 mb-2">🔐 Development Mode</p>
                        <p className="text-amber-800 text-xs">
                            Run seed command to create demo accounts: <code className="bg-amber-100 px-1 py-0.5 rounded">pnpm db:seed</code>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}