import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Servicios reorganizados por necesidad del cliente (oct 2026): las URLs antiguas siguen funcionando.
  // Zentry se sustituyó por Pasa (nov 2026): producto y caso, en los tres idiomas.
  async redirects() {
    const servicios = [
      ['apps-android', 'apps-moviles'],
      ['desktop-electron', 'sistemas-de-gestion'],
      ['databases-apis', 'sistemas-de-gestion'],
      ['python-automatizacion', 'ia-y-automatizacion'],
      ['ia-machine-learning', 'ia-y-automatizacion'],
      ['consultoria-tech', 'consultoria-y-formacion'],
    ].map(([from, to]) => ({ source: `/servicios/${from}`, destination: `/servicios/${to}`, permanent: true }))
    const zentry = ['/productos', '/en/products', '/fr/produits', '/portfolio', '/en/projects', '/fr/projets'].map(
      (seccion) => ({ source: `${seccion}/zentry`, destination: `${seccion}/pasa`, permanent: true }),
    )
    return [...servicios, ...zentry]
  },
}

export default nextConfig
