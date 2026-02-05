import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname

    // Skip proxy for public routes
    const publicPaths = [
        '/login',
        '/admission-portal',
        '/about',
        '/contact',
        '/academics',
        '/admissions',
        '/api/auth',
        '/api/admission',
        '/_next',
        '/favicon.ico',
        '/images',
        '/uploads',
        '/',
    ]

    // Check if path starts with any public path
    const isPublicPath = publicPaths.some(publicPath =>
        path === publicPath || path.startsWith(publicPath)
    )

    if (isPublicPath) {
        return NextResponse.next()
    }

    // Get authentication token
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })

    // Admin routes protection
    if (path.startsWith('/admin')) {
        // No token = redirect to login
        if (!token) {
            const url = new URL('/login', req.url)
            url.searchParams.set('error', 'SessionRequired')
            url.searchParams.set('callbackUrl', path)
            return NextResponse.redirect(url)
        }

        // Wrong role = redirect with error
        if (token.role !== 'ADMIN') {
            const url = new URL('/login', req.url)
            url.searchParams.set('error', 'unauthorized')
            return NextResponse.redirect(url)
        }

        // Valid admin - allow access
        return NextResponse.next()
    }

    // Parent portal routes protection
    if (path.startsWith('/parent-portal')) {
        // No token = redirect to login
        if (!token) {
            const url = new URL('/login', req.url)
            url.searchParams.set('error', 'SessionRequired')
            url.searchParams.set('callbackUrl', path)
            return NextResponse.redirect(url)
        }

        // Wrong role = redirect with error
        if (token.role !== 'PARENT') {
            const url = new URL('/login', req.url)
            url.searchParams.set('error', 'unauthorized')
            return NextResponse.redirect(url)
        }

        // Valid parent - allow access
        return NextResponse.next()
    }

    // All other routes - allow
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
