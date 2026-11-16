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

const ORDER: Category[] = ['todos', 'android', 'web', 'desktop', 'erp', 'python', 'ia']

export function PortfolioExplorer({ items, labels, emptyText }: PortfolioExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('todos')
  const categories = ORDER
    .filter((c) => c === 'todos' || items.some((item) => item.category === c))
    .map((value) => ({ value, label: labels[value] }))
  const filtered = activeCategory === 'todos' ? items : items.filter((item) => item.category === activeCategory)

  return (
    <>
      {/* Filtros */}
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
        <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Proyectos */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
            {filtered.map((item) => (
              <Fragment key={item.key}>{item.card}</Fragment>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-text-secondary">{emptyText}</p>
        )}
      </section>
    </>
  )
}
