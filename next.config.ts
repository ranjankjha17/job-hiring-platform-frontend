import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        source: '/api/files/:path*',
        destination: 'http://localhost:5000/api/files/:path*',
      },
    ]
  },

};

export default nextConfig;
