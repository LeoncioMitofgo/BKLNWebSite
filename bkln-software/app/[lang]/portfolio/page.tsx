import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PortfolioExplorer } from '@/components/sections/PortfolioExplorer'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localeFromParams, type LangParams } from '@/i18n/server'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).portfolio
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/portfolio' })
}

export default async function PortfolioPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).portfolio
  const { projects } = getContent(lang)

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            {t.h1Start} <span className="text-accent-green">{t.h1Highlight}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">{t.lead}</p>
        </div>
      </section>

      <PortfolioExplorer
        labels={t.filters}
        emptyText={t.empty}
        items={projects.map((project) => ({
          key: project.id,
          category: project.category,
          card: <ProjectCard project={project} lang={lang} />,
        }))}
      />
    </div>
  )
}
