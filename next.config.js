/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [],
    },
    // Оптимизация производительности
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig
