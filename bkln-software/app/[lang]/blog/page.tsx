import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { BlogCard } from '@/components/sections/BlogCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localeFromParams, type LangParams } from '@/i18n/server'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).blog
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/blog' })
}

export default async function BlogPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).blog
  const { posts } = getContent(lang)
  const guides = posts.filter((p) => p.category === 'guias')
  const workshop = posts.filter((p) => p.category === 'taller')
  const [featuredGuide, ...otherGuides] = guides

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            <span className="text-accent-green">{t.h1Highlight}</span> {t.h1End}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">{t.lead}</p>
        </div>
      </section>

      {featuredGuide && (
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <SectionHeader title={t.guidesTitle} />
            <BlogCard post={featuredGuide} lang={lang} featured />
            {otherGuides.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherGuides.map((post) => (
                  <BlogCard key={post.id} post={post} lang={lang} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {workshop.length > 0 && (
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeader title={t.workshopTitle} subtitle={t.workshopSubtitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshop.map((post) => (
                <BlogCard key={post.id} post={post} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
