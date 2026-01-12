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
}

module.exports = nextConfig
