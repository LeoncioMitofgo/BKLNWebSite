'use client'

import { useState } from 'react'
import { BlogCard } from '@/components/sections/BlogCard'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import type { BlogPost } from '@/types'

const categories: { value: BlogPost['category'] | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'python', label: 'Python' },
  { value: 'android', label: 'Android' },
  { value: 'ia-ml', label: 'IA & ML' },
  { value: 'web', label: 'Web' },
  { value: 'databases', label: 'Databases' },
  { value: 'tutoriales', label: 'Tutoriales' },
]

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogPost['category'] | 'todos'>('todos')

  const filtered =
    activeCategory === 'todos' ? posts : posts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {featured && <BlogCard post={featured} featured />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-text-secondary">
              No hay artículos en esta categoría aún.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
