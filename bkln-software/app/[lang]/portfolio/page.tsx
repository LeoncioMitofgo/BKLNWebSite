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
  const { projects: all } = getContent(lang)
  // v3: primero los cuatro casos de la portada (cuatro sectores); luego el resto en su orden.
  const FEATURED = ['pasa', 'sistema-pos-android-comercios', 'gestion-despacho-abogados', 'gestescolar']
  const rank = (slug: string) => (FEATURED.includes(slug) ? FEATURED.indexOf(slug) : FEATURED.length)
  const projects = [...all].sort((a, b) => rank(a.slug) - rank(b.slug))

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-12 sm:px-8 sm:pt-44">
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
          {t.h1Start} <span className="text-accent-green">{t.h1Highlight}</span>
        </h1>
        <p className="mt-8 max-w-[56ch] text-lg text-text-secondary sm:text-xl">{t.lead}</p>
      </header>

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
