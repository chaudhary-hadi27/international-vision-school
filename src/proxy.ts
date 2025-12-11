// src/proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const path = req.nextUrl.pathname

    // Admin routes protection
    if (path.startsWith('/admin9i21901029')) {
        if (!token || token.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
        }
    }

    // Parent portal protection
    if (path.startsWith('/parent-portal/182798217921')) {
        if (!token || token.role !== 'PARENT') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/parent-portal/:path*'],
}
