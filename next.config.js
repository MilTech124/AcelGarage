/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
    images: {
        domains: ['acelgarage.pl','backend.acelgarage.pl'],
      },
}

module.exports = nextConfig
