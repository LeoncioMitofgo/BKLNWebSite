'use client'

import { Fragment, useState, type ReactNode } from 'react'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import type { Project } from '@/types'

type Category = Project['category'] | 'todos'

interface PortfolioExplorerProps {
  /** Tarjetas ya renderizadas en el servidor, con su categoría para filtrar. */
  items: { key: string; category: Project['category']; card: ReactNode }[]
  labels: Record<Category, string>
  emptyText: string
}

const ORDER: Category[] = ['todos', 'android', 'web', 'desktop', 'python', 'ia']

export function PortfolioExplorer({ items, labels, emptyText }: PortfolioExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('todos')
  const categories = ORDER
    .filter((c) => c === 'todos' || items.some((item) => item.category === c))
    .map((value) => ({ value, label: labels[value] }))
  const filtered = activeCategory === 'todos' ? items : items.filter((item) => item.category === activeCategory)

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
              {filtered.map((item) => (
                <Fragment key={item.key}>{item.card}</Fragment>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-text-secondary">{emptyText}</div>
          )}
        </div>
      </section>
    </>
  )
}
