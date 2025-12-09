// src/middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Admin routes protection
        if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
        }

        // Parent portal protection
        if (path.startsWith('/parent-portal') && token?.role !== 'PARENT') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: [
        '/admin/:path*',
        '/parent-portal/:path*',
    ],
}