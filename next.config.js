/** @type {import('next').NextConfig} */
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
    },
    // Оптимизация производительности
    reactStrictMode: true,
    swcMinify: true,
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

module.exports = nextConfig
