/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
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
        ];
    },
}

module.exports = nextConfig
