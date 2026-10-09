import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Servicios reorganizados por necesidad del cliente (oct 2026): las URLs antiguas siguen funcionando.
  async redirects() {
    return [
      ['apps-android', 'apps-moviles'],
      ['desktop-electron', 'sistemas-de-gestion'],
      ['databases-apis', 'sistemas-de-gestion'],
      ['python-automatizacion', 'ia-y-automatizacion'],
      ['ia-machine-learning', 'ia-y-automatizacion'],
      ['consultoria-tech', 'consultoria-y-formacion'],
    ].map(([from, to]) => ({ source: `/servicios/${from}`, destination: `/servicios/${to}`, permanent: true }))
  },
}

export default nextConfig
