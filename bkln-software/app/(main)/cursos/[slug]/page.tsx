import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, PlayCircle, Lock, BookOpen, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { courses } from '@/data/seed'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) return {}
  return { title: course.title, description: course.description }
}

const levelLabels: Record<string, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const availableLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.isFree).length,
    0
  )

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors mb-6 text-sm"
          >
            <ArrowLeft size={16} /> Volver a cursos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="blue">{course.category.toUpperCase()}</Badge>
                <Badge>{levelLabels[course.level]}</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                {course.title}
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {course.duration}
                </span>
                {totalLessons > 0 && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={14} />
                    {course.modules.length} libros · {totalLessons} capítulos
                  </span>
                )}
                {availableLessons > 0 && (
                  <span className="text-success font-medium">
                    {availableLessons} disponibles ahora
                  </span>
                )}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div>
              <div className="bg-bg-dark border border-white/10 rounded-lg p-6 sticky top-24">
                <div className="text-3xl font-bold text-text-primary mb-1">
                  {course.price === 0 ? (
                    <span className="text-success">Gratis</span>
                  ) : formatPrice(course.price)}
                </div>
                <p className="text-text-secondary text-sm mb-5">Acceso de por vida incluido.</p>

                {course.bookUrl ? (
                  <a href={course.bookUrl} target="_blank" rel="noopener noreferrer" className="block mb-3">
                    <Button size="lg" className="w-full gap-2">
                      <BookOpen size={16} /> Empezar a leer
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" className="w-full mb-3">Acceder al curso</Button>
                )}

                <Link href="/contacto">
                  <Button variant="outline" size="md" className="w-full">Tengo una duda</Button>
                </Link>

                {course.includes.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {course.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle size={12} className="text-success mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      {course.modules.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {/* Descripción larga */}
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Sobre este curso</h2>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {course.longDescription}
                </p>
              </div>

              {/* Temario */}
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-5">
                  Temario — {course.modules.length} libros · {totalLessons} capítulos
                </h2>
                <div className="space-y-3">
                  {course.modules.map((module) => {
                    const allComingSoon = module.lessons.every((l) => l.duration === 'próx.')
                    return (
                      <div
                        key={module.id}
                        className="bg-bg-surface border border-white/5 rounded-lg overflow-hidden"
                      >
                        <div className="px-5 py-3.5 flex items-center justify-between">
                          <h3 className="text-text-primary font-medium text-sm">{module.title}</h3>
                          <span className={`text-xs ${allComingSoon ? 'text-text-secondary/50' : 'text-text-secondary'}`}>
                            {module.duration}
                          </span>
                        </div>
                        <div className="border-t border-white/5">
                          {module.lessons.map((lesson) => {
                            const isComingSoon = lesson.duration === 'próx.'
                            return (
                              <div
                                key={lesson.id}
                                className="px-5 py-2.5 flex items-center justify-between hover:bg-white/3 transition-colors"
                              >
                                <div className="flex items-center gap-2.5 text-sm">
                                  {isComingSoon ? (
                                    <Lock size={13} className="text-text-secondary/30 shrink-0" />
                                  ) : (
                                    <BookOpen size={13} className="text-accent-blue shrink-0" />
                                  )}
                                  <span className={isComingSoon ? 'text-text-secondary/50' : 'text-text-primary'}>
                                    {lesson.title}
                                  </span>
                                  {!isComingSoon && (
                                    <Badge variant="success" className="text-xs">Disponible</Badge>
                                  )}
                                </div>
                                <span className={`text-xs shrink-0 ${isComingSoon ? 'text-text-secondary/30' : 'text-text-secondary'}`}>
                                  {lesson.duration}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Instructor */}
              {course.instructor.bio && (
                <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">Instructor</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-brand-blue/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-accent-blue text-xl font-bold">B</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">{course.instructor.name}</h3>
                      <p className="text-text-secondary text-sm mt-1">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info extra */}
            {course.includes.length > 0 && (
              <div className="space-y-4">
                <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                  <h3 className="text-text-primary font-semibold mb-3 text-sm">Este curso incluye</h3>
                  {course.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-secondary py-1.5 border-b border-white/5 last:border-0">
                      <CheckCircle size={13} className="text-success mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                {course.bookUrl && (
                  <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-lg p-5">
                    <h3 className="text-text-primary font-semibold mb-2 text-sm">Libro interactivo</h3>
                    <p className="text-text-secondary text-xs mb-3">
                      7 capítulos del Libro 1 disponibles ahora mismo. Sin registro.
                    </p>
                    <a
                      href={course.bookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent-blue hover:underline text-sm"
                    >
                      <ExternalLink size={13} /> Abrir libro
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
