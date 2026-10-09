import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PortfolioExplorer } from '@/components/sections/PortfolioExplorer'
import { projects } from '@/data/content'

export const metadata: Metadata = pageMetadata({
  title: 'Proyectos',
  description: 'Una selección de los más de 35 proyectos que hemos entregado: sistemas de gestión, apps, plataformas web y asistentes con IA.',
  path: '/portfolio',
})

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Nuestros <span className="text-accent-green">proyectos</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Una selección de los más de 35 proyectos que hemos entregado. Muchos son para empresas e
            instituciones públicas cuyo trabajo es confidencial, así que aquí solo mostramos una parte.
          </p>
        </div>
      </section>

      <PortfolioExplorer projects={projects} />
    </div>
  )
}
