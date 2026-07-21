import type { Metadata } from 'next'
import { BlogExplorer } from '@/components/sections/BlogExplorer'
import { blogPosts } from '@/data/content'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos, tutoriales y guías sobre desarrollo de software, IA y tecnología.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Blog <span className="text-accent-green">Técnico</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Artículos, tutoriales y guías sobre desarrollo de software, IA y tecnología.
          </p>
        </div>
      </section>

      <BlogExplorer posts={blogPosts} />
    </div>
  )
}
