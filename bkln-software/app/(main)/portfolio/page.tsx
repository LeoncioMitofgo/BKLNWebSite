'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { projects } from '@/data/content'
import type { Project } from '@/types'

const categories: { value: Project['category'] | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'android', label: 'Android' },
  { value: 'web', label: 'Web' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'python', label: 'Python' },
  { value: 'ia', label: 'IA' },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Project['category'] | 'todos'>('todos')

  const filtered =
    activeCategory === 'todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

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

      {/* Filtros */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-brand-green text-white'
                    : 'bg-bg-surface text-text-secondary border border-white/10 hover:border-brand-green/30 hover:text-text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de proyectos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-text-secondary">
              No hay proyectos en esta categoría aún.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
