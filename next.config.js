const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // For Vercel deployment
    images: {
        unoptimized: false, // Enable Image Optimization API
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co'
            },
            {
                protocol: 'https',
                hostname: 'soundcloud.com'
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com'
            }
        ]
    },
    // Exclude reference directories from build
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        outputFileTracingExcludes: {
            '*': ['ref/**/*']
        },
    },
    // Exclude from webpack compilation
    webpack: (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: '**/ref/**'
        };
        return config;
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval' *.youtube.com *.soundcloud.com *.spotify.com;
                            style-src 'self' 'unsafe-inline' *.googleapis.com;
                            img-src 'self' data: *.google-analytics.com *.youtube.com *.soundcloud.com *.spotify.com *.scdn.co *.ytimg.com;
                            connect-src *;
                            font-src 'self' *.gstatic.com;
                            frame-src *.youtube.com *.soundcloud.com *.spotify.com;
                            media-src 'self' *.spotify.com blob: data:;
                        `.replace(/\n/g, ' ').trim()
                    }
                ]
            }
        ];
    },
};

// Add bundle analyzer in analyze mode
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
    ? require('@next/bundle-analyzer')({ enabled: true }) 
    : (config) => config;

module.exports = withBundleAnalyzer(nextConfig);