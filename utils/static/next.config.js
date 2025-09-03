/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    // Disable server-side features for static export
    experimental: {
        esmExternals: false
    },
    // Ensure compatibility with static hosting
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    // Disable features not compatible with static export
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    }
}

module.exports = nextConfig 