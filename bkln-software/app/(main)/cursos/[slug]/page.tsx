import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BookOpen, Clock, Users, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { courses } from '@/data/content'

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
  principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado',
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  const isComingSoon = course.status === 'coming-soon'

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/cursos"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} /> Volver a cursos
        </Link>

        {/* Hero */}
        <div className="relative h-56 rounded-lg overflow-hidden mb-8 border border-white/5">
          <Image src={course.thumbnail} alt={course.title} fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-bg-dark/60" />
          {isComingSoon && (
            <div className="absolute top-4 right-4">
              <Badge>Próximamente</Badge>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="blue">{levelLabels[course.level]}</Badge>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Clock size={13} /> {course.duration}
          </span>
          {course.students > 0 && (
            <span className="flex items-center gap-1.5 text-text-secondary text-sm">
              <Users size={13} /> {course.students} estudiantes
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{course.title}</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">{course.description}</p>

        {/* Descripción larga */}
        <div className="mb-10">
          {course.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        {/* Qué incluye */}
        {course.includes.length > 0 && (
          <div className="bg-bg-surface border border-white/5 rounded-lg p-6 mb-8">
            <h2 className="text-text-primary font-bold mb-4">Qué incluye</h2>
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
            <h2 className="text-text-primary font-bold text-xl mb-5">Temario completo</h2>
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
              <span className="text-accent-green text-xl font-bold">B</span>
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm mb-1">{course.instructor.name}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{course.instructor.bio}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-6 text-center">
          {isComingSoon ? (
            <>
              <p className="text-text-primary font-semibold mb-2">Este curso llega pronto</p>
              <p className="text-text-secondary text-sm mb-4">Contáctanos para saber cuándo estará disponible.</p>
              <Link href="/contacto">
                <Button variant="outline">Avisarme cuando esté disponible</Button>
              </Link>
            </>
          ) : course.bookUrl ? (
            <>
              <p className="text-text-primary font-semibold mb-2">Acceso gratuito — sin registro</p>
              <p className="text-text-secondary text-sm mb-4">Empieza a leer ahora mismo, sin crear cuenta ni pagar nada.</p>
              <a href={course.bookUrl} target="_blank" rel="noopener noreferrer">
                <Button>Empezar a aprender <BookOpen size={15} /></Button>
              </a>
            </>
          ) : (
            <>
              <p className="text-text-primary font-semibold mb-2">¿Listo para empezar?</p>
              <Link href="/contacto">
                <Button>Acceder al curso</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
