import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      {
        source: '/api/chat',
        destination: 'https://ai.bklnsoftware.tech/chat',
      },
    ]
  },
}

export default nextConfig
