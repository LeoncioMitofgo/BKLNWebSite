'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import type { Project } from '@/types'

const categories: { value: Project['category'] | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'android', label: 'Android' },
  { value: 'web', label: 'Web' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'python', label: 'Python' },
  { value: 'ia', label: 'IA' },
]

export function PortfolioExplorer({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<Project['category'] | 'todos'>('todos')

  const filtered =
    activeCategory === 'todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Filtros */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
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
    </>
  )
}
