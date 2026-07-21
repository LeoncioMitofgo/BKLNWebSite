import type { Metadata } from 'next'
import { PortfolioExplorer } from '@/components/sections/PortfolioExplorer'
import { projects } from '@/data/content'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Proyectos reales que hemos construido — desde apps Android hasta sistemas de IA.',
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Nuestro <span className="text-accent-green">Portfolio</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Proyectos reales que hemos construido — desde apps Android hasta sistemas de IA.
          </p>
        </div>
      </section>

      <PortfolioExplorer projects={projects} />
    </div>
  )
}
