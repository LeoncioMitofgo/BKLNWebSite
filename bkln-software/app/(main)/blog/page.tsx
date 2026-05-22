'use client'

import { useState } from 'react'
import { BlogCard } from '@/components/sections/BlogCard'
import { blogPosts } from '@/data/seed'
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

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogPost['category'] | 'todos'>('todos')

  const filtered =
    activeCategory === 'todos'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Blog <span className="text-accent-blue">Técnico</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Artículos, tutoriales y guías sobre desarrollo de software, IA y tecnología.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-brand-blue text-white'
                    : 'bg-bg-surface text-text-secondary border border-white/10 hover:border-brand-blue/30 hover:text-text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
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
    </div>
  )
}
