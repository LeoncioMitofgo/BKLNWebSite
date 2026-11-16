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
    <div className="min-h-screen">
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 sm:pt-44">
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
          {t.h1Start} <span className="text-accent-green">{t.h1Highlight}</span>
        </h1>
        <p className="mt-8 max-w-[56ch] text-lg text-text-secondary sm:text-xl">{t.lead}</p>
      </header>

      {/* Grid de cursos */}
      <section className="px-5 pb-28 sm:px-8">
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
