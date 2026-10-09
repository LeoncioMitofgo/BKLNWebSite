import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { CourseCard } from '@/components/sections/CourseCard'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localeFromParams, type LangParams } from '@/i18n/server'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).courses
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/cursos' })
}

export default async function CursosPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).courses
  const { courses } = getContent(lang)

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

      {/* Grid de cursos */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
