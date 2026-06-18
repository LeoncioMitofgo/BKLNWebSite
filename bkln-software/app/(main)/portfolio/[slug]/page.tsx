import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { projects } from '@/data/content'

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
  return { title: project.title, description: project.description }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver al portfolio
        </Link>

        {/* Hero imagen */}
        <div className="relative h-72 rounded-lg overflow-hidden mb-8 border border-white/5 bg-gradient-to-br from-brand-green/25 to-bg-surface">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-80"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3">
            <Badge variant="blue">{categoryLabels[project.category]}</Badge>
            <span className="text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
              {project.year}
            </span>
          </div>
        </div>

        {/* Título y descripción */}
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{project.title}</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">{project.description}</p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {/* Descripción larga */}
        <div className="prose prose-invert max-w-none mb-10">
          {project.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        {/* Galería */}
        {project.gallery.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {project.gallery.slice(1).map((src, i) => (
              <div key={i} className="relative h-44 rounded-lg overflow-hidden border border-white/5">
                <Image src={src} alt={`${project.title} screenshot ${i + 1}`} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        )}

        {/* Challenges y soluciones */}
        {project.challenges.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <h2 className="text-text-primary font-bold mb-4">Retos técnicos</h2>
              <ul className="space-y-3">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-accent-green mt-1 shrink-0">→</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <h2 className="text-text-primary font-bold mb-4">Soluciones aplicadas</h2>
              <ul className="space-y-3">
                {project.solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle size={14} className="text-accent-green mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button>
                Ver proyecto en vivo <ExternalLink size={15} />
              </Button>
            </a>
          )}
          <Link href="/contacto">
            <Button variant="outline">Iniciar proyecto similar</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
