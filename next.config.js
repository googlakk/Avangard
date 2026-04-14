/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
    : null

const remotePatterns = [
    {
        protocol: 'https',
        hostname: 'images.unsplash.com',
    },
]

if (supabaseHostname) {
    remotePatterns.push({
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/public/**',
    })
}

const nextConfig = {
    images: {
        remotePatterns,
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },
    // Оптимизация производительности
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },
    async headers() {
        return [
            {
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
                ],
            },
            {
                source: '/images/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
                ],
            },
            {
                source: '/uploads/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
                ],
            },
            {
                source: '/videos/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=2592000' }
                ],
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/admission',
                destination: '/parents/admission',
                permanent: true,
            },
            {
                source: '/admissions',
                destination: '/parents/admission',
                permanent: true,
            },
            {
                source: '/rules/safety',
                destination: '/safety',
                permanent: true,
            },
            {
                source: '/programs/programming',
                destination: '/programs/middle/it-steam',
                permanent: true,
            },
            {
                source: '/programs/global-network',
                destination: '/programs',
                permanent: true,
            },
            {
                source: '/programs/life-at-intellect',
                destination: '/parents/values',
                permanent: true,
            },
            {
                source: '/teachers',
                destination: '/about/team',
                permanent: true,
            },
            {
                source: '/services',
                destination: '/programs',
                permanent: true,
            },
        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
