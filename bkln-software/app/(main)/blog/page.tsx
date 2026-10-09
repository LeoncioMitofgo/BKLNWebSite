import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { BlogCard } from '@/components/sections/BlogCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { visiblePosts } from '@/data/content'

export const metadata: Metadata = pageMetadata({
  title: 'Guías',
  description:
    'Guías prácticas para digitalizar tu negocio en Guinea Ecuatorial: costes, plazos y decisiones antes de encargar una web, una app o un sistema de gestión.',
  path: '/blog',
})

export default function BlogPage() {
  const guides = visiblePosts.filter((p) => p.category === 'guias')
  const workshop = visiblePosts.filter((p) => p.category === 'taller')
  const [featuredGuide, ...otherGuides] = guides

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            <span className="text-accent-green">Guías</span> para tu negocio
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Lo que conviene saber antes de encargar una web, una app o un sistema de gestión en Guinea
            Ecuatorial, explicado sin tecnicismos.
          </p>
        </div>
      </section>

      {featuredGuide && (
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <SectionHeader title="Guías para negocios" />
            <BlogCard post={featuredGuide} featured />
            {otherGuides.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherGuides.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {workshop.length > 0 && (
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Desde el taller"
              subtitle="Artículos técnicos sobre cómo construimos: decisiones, código y lo que aprendemos en cada proyecto."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshop.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
