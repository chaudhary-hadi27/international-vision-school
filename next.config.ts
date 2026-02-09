// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // ✅ NEW: serverExternalPackages (not experimental anymore)
    serverExternalPackages: [
        '@prisma/client',
        'bcryptjs',
    ],

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'element451.com',
            }
        ],
    },
};

export default nextConfig;