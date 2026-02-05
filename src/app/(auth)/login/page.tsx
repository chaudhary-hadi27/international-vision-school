'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { GraduationCap, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from 'next/link'

type UserRole = 'PARENT' | 'ADMIN'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const urlError = searchParams.get('error')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRole>('PARENT')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Handle URL errors
    useEffect(() => {
        if (urlError) {
            const errorMessages: Record<string, string> = {
                'SessionRequired': 'Please login to continue',
                'unauthorized': 'You do not have permission to access that page',
                'CredentialsSignin': 'Invalid email or password',
                'OAuthSignin': 'Error signing in with OAuth',
                'OAuthCallback': 'Error in OAuth callback',
                'OAuthCreateAccount': 'Error creating OAuth account',
                'EmailCreateAccount': 'Error creating email account',
                'Callback': 'Error in callback',
                'OAuthAccountNotLinked': 'Account already exists with different credentials',
                'EmailSignin': 'Error sending verification email',
                'CredentialsSignup': 'Error creating account',
                'SessionError': 'Your session has expired',
            }
            setError(errorMessages[urlError] || 'An authentication error occurred')
        }
    }, [urlError])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (!email || !password) {
            setError('Please enter both email and password')
            setLoading(false)
            return
        }

        try {
            const result = await signIn('credentials', {
                email: email.toLowerCase().trim(),
                password: password,
                redirect: false,
            })

            if (result?.error) {
                setError(result.error)
                setLoading(false)
                return
            }

            if (result?.ok) {
                // Determine redirect URL
                let redirectUrl = callbackUrl || (role === 'ADMIN' ? '/admin' : '/parent-portal')

                // Navigate to dashboard
                router.push(redirectUrl)
                router.refresh()
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('Something went wrong. Please try again.')
            setLoading(false)
        }
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
                            onClick={() => setRole('PARENT')}
                            className={`py-3 rounded-lg font-semibold transition ${
                                role === 'PARENT'
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Parent
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('ADMIN')}
                            className={`py-3 rounded-lg font-semibold transition ${
                                role === 'ADMIN'
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                placeholder="your.email@example.com"
                                disabled={loading}
                                autoComplete="email"
                            />
                        </div>

                        {/* Password */}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition pr-12"
                                    placeholder="••••••••"
                                    disabled={loading}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-900 rounded border-gray-300 focus:ring-blue-900"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-blue-900 hover:underline font-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
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

                    {/* Admission Link */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/admission-portal" className="text-blue-900 font-semibold hover:underline">
                            Apply for Admission
                        </Link>
                    </div>
                </div>

                {/* Demo Credentials */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <p className="font-semibold text-amber-900 mb-2 text-sm">🔐 Demo Credentials</p>
                        <div className="text-xs text-amber-800 space-y-1">
                            <p><strong>Admin:</strong> admin@ivs.edu.pk / admin123</p>
                            <p><strong>Parent:</strong> ahmed.khan@gmail.com / parent123</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}