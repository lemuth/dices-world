const isProd = process.env.NODE_ENV === 'production';


/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: 'dist',
    basePath: isProd ? '/dices-world' : '',

    images: {
        unoptimized: true
    }
};

export default nextConfig;

