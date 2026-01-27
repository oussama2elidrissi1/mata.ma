/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com', '127.0.0.1', 'mata.ma'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mata.ma',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://mata.ma/api',
  },
  swcMinify: true,
  trailingSlash: false,
  // Redirections pour éviter les doubles requêtes
  async redirects() {
    return [
      {
        source: '/actors/',
        destination: '/actors',
        permanent: true,
      },
      {
        source: '/news/',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/events/',
        destination: '/events',
        permanent: true,
      },
    ]
  },
  // Si vous avez besoin d'un export statique, décommentez la ligne suivante
  // output: "export",
}

module.exports = nextConfig