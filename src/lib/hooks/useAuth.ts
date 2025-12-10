'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth(requiredRole?: 'ADMIN' | 'PARENT' | 'TEACHER') {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push('/login')
            return
        }

        if (requiredRole && session.user.role !== requiredRole) {
            router.push('/login?error=unauthorized')
        }
    }, [session, status, requiredRole, router])

    return {
        session,
        status,
        isLoading: status === 'loading',
        isAuthenticated: !!session,
        user: session?.user,
    }
}

// Usage example:
// const { user, isLoading } = useAuth('ADMIN')