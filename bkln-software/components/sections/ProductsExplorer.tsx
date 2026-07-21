'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/sections/ProductCard'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import type { Product } from '@/types'

const categories: { value: Product['category'] | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'android', label: 'Apps Android' },
  { value: 'desktop', label: 'Software Desktop' },
  { value: 'scripts', label: 'Scripts & Tools' },
  { value: 'free', label: 'Gratis' },
]

export function ProductsExplorer({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<Product['category'] | 'todos'>('todos')

  const filtered =
    activeCategory === 'todos'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Filtros */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-text-secondary">
              No hay productos en esta categoría aún.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
