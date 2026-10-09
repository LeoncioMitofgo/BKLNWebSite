import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BookOpen, Clock, Users, CheckCircle, Languages } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { publishedCourses } from '@/data/content'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangSlugParams } from '@/i18n/server'
import { fmt } from '@/lib/utils'

export function generateStaticParams() {
  return publishedCourses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: LangSlugParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const course = getContent(lang).courses.find((c) => c.slug === slug)
  if (!course) return {}
  return pageMetadata({ lang, title: course.title, description: course.description, path: `/cursos/${course.slug}`, image: course.thumbnail })
}

export default async function CoursePage({ params }: LangSlugParams) {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const t = getDictionary(lang).courses
  const d = t.detail
  const course = getContent(lang).courses.find((c) => c.slug === slug)
  if (!course) notFound()

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={localizePath(lang, '/cursos')}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} /> {d.back}
        </Link>

        {/* Hero */}
        <div className="relative h-56 rounded-lg overflow-hidden mb-8 border border-white/5">
          <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="(min-width: 896px) 896px, 100vw" />
          <div className="absolute inset-0 bg-bg-dark/60" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="blue">{t.levels[course.level]}</Badge>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Clock size={13} /> {course.duration}
          </span>
          {course.students > 0 && (
            <span className="flex items-center gap-1.5 text-text-secondary text-sm">
              <Users size={13} /> {fmt(d.students, { n: course.students })}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{course.title}</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">{course.description}</p>

        {/* Los libros están en español: avisarlo en las otras versiones */}
        {d.spanishNotice && (
          <p className="flex items-start gap-2 mb-8 rounded-md border border-brand-green/20 bg-brand-green/5 px-4 py-3 text-sm text-text-secondary">
            <Languages size={16} className="text-accent-green mt-0.5 shrink-0" />
            {d.spanishNotice}
          </p>
        )}

        {/* Descripción larga */}
        <div className="mb-10">
          {course.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        {/* Qué incluye */}
        {course.includes.length > 0 && (
          <div className="bg-bg-surface border border-white/5 rounded-lg p-6 mb-8">
            <h2 className="text-text-primary font-bold mb-4">{d.includes}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle size={13} className="text-accent-green mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Temario */}
        {course.modules.length > 0 && (
          <div className="mb-10">
            <h2 className="text-text-primary font-bold text-xl mb-5">{d.syllabus}</h2>
            <div className="space-y-4">
              {course.modules.map((mod) => (
                <div key={mod.id} className="bg-bg-surface border border-white/5 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                    <h3 className="text-text-primary font-semibold text-sm">{mod.title}</h3>
                    <span className="text-text-secondary text-xs">{mod.duration}</span>
                  </div>
                  <ul className="divide-y divide-white/5">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-center justify-between px-5 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <BookOpen size={13} className="text-accent-green shrink-0" />
                          <span className="text-text-secondary text-sm">{lesson.title}</span>
                        </div>
                        <span className="text-text-secondary text-xs">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructor */}
        {course.instructor.bio && (
          <div className="flex items-start gap-4 bg-bg-surface border border-white/5 rounded-lg p-5 mb-8">
            <div className="w-14 h-14 bg-brand-green/20 rounded-full flex items-center justify-center shrink-0">
              <Image src="/brand-symbol.png" alt="BKLN Software & Systems" width={56} height={56} className="w-full h-full object-contain p-2" />
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm mb-1">{course.instructor.name}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{course.instructor.bio}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-6 text-center">
          <p className="text-text-primary font-semibold mb-2">{d.ctaTitle}</p>
          <p className="text-text-secondary text-sm mb-4">{d.ctaText}</p>
          <a href={course.bookUrl} target="_blank" rel="noopener noreferrer">
            <Button>{d.start} <BookOpen size={15} /></Button>
          </a>
        </div>
      </div>
    </div>
  )
}
