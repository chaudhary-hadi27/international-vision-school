import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Public paths - no auth required
    const isPublicPath =
        path === '/' ||
        path === '/login' ||
        path === '/register' ||
        path.startsWith('/') ||
        path.startsWith('/about') ||
        path.startsWith('/academics') ||
        path.startsWith('/admission') ||
        path.startsWith('/contact') ||
        path.startsWith('/admission-portal') ||
        path.startsWith('/_next') ||
        path.startsWith('/api/auth') ||
        path.startsWith('/api/admission')

    if (isPublicPath) {
        return NextResponse.next()
    }

    // Get token
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    // Not authenticated
    if (!token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', path)
        return NextResponse.redirect(loginUrl)
    }

    // Admin routes protection
    if (path.startsWith('/admin')) {
        if (token.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Parent portal routes protection
    if (path.startsWith('/parent-portal')) {
        if (token.role !== 'PARENT') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ]
}