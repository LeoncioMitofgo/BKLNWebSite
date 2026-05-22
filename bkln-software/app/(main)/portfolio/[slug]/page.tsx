import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Star } from 'lucide-react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { projects } from '@/data/seed'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

const categoryLabels: Record<string, string> = {
  android: 'Android', web: 'Web', desktop: 'Desktop', python: 'Python', ia: 'IA',
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver al portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <div className="relative h-72 rounded-lg overflow-hidden mb-8 border border-white/5 bg-gradient-to-br from-brand-blue/25 to-bg-surface">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-accent-blue text-5xl font-bold">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="blue">{categoryLabels[project.category]}</Badge>
              <span className="text-text-secondary text-sm">{project.year}</span>
            </div>

            <h1 className="text-3xl font-bold text-text-primary mb-4">{project.title}</h1>
            <p className="text-text-secondary leading-relaxed mb-8">{project.longDescription}</p>

            {/* Retos y soluciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <h3 className="text-text-primary font-semibold mb-3">Retos</h3>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                      <span className="text-warning mt-0.5">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <h3 className="text-text-primary font-semibold mb-3">Soluciones</h3>
                <ul className="space-y-2">
                  {project.solutions.map((s, i) => (
                    <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                      <span className="text-success mt-0.5">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Testimonial del cliente */}
            {project.clientTestimonial && (
              <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-lg p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: project.clientTestimonial.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-text-secondary italic mb-4">
                  &ldquo;{project.clientTestimonial.content}&rdquo;
                </p>
                <p className="text-text-primary font-semibold text-sm">
                  {project.clientTestimonial.name}
                </p>
                <p className="text-text-secondary text-xs">
                  {project.clientTestimonial.role} · {project.clientTestimonial.company}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tecnologías */}
            <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
              <h3 className="text-text-primary font-semibold mb-3 text-sm uppercase tracking-wide">
                Tecnologías
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.liveUrl || project.demoUrl) && (
              <div className="bg-bg-surface border border-white/5 rounded-lg p-5 space-y-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      Ver proyecto live <ExternalLink size={14} />
                    </Button>
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full gap-2">
                      Ver demo <ExternalLink size={14} />
                    </Button>
                  </a>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-lg p-5 text-center">
              <p className="text-text-primary font-semibold mb-2">¿Proyecto similar?</p>
              <p className="text-text-secondary text-sm mb-4">
                Podemos construir algo así para ti.
              </p>
              <Link href="/contacto">
                <Button size="sm" className="w-full">Contactar</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
