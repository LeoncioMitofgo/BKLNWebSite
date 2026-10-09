import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, CheckCircle, ChevronDown, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { projects as baseProjects } from '@/data/content'
import { waLink } from '@/data/contact'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangSlugParams } from '@/i18n/server'
import { fmt } from '@/lib/utils'

export function generateStaticParams() {
  return baseProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: LangSlugParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const project = getContent(lang).projects.find((p) => p.slug === slug)
  if (!project) return {}
  return pageMetadata({ lang, title: project.title, description: project.description, path: `/portfolio/${project.slug}`, image: project.image })
}

export default async function ProjectPage({ params }: LangSlugParams) {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const t = getDictionary(lang)
  const d = t.portfolio.detail
  const { projects, products, services } = getContent(lang)
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const relatedProduct = products.find((p) => p.slug === project.slug)
  const relatedService = services.find((s) => s.relatedProjects.includes(project.slug))
  // La primera imagen de la galería suele ser la de portada: no repetirla.
  const gallery = project.gallery.filter((src) => src !== project.image)

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={localizePath(lang, '/portfolio')}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> {d.back}
        </Link>

        {/* Cabecera */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="blue">{project.sector}</Badge>
          {project.status && <Badge variant="warning">{project.status}</Badge>}
          <span className="text-text-secondary text-xs">{project.year}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{project.title}</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">{project.description}</p>

        <div className="relative h-72 rounded-lg overflow-hidden mb-10 border border-white/5 bg-gradient-to-br from-brand-green/25 to-bg-surface">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-90"
            sizes="(min-width: 896px) 896px, 100vw"
          />
        </div>

        {/* El proyecto */}
        <h2 className="text-xl font-bold text-text-primary mb-4">{d.project}</h2>
        <div className="mb-10">
          {project.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        {/* Galería */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {gallery.map((src, i) => (
              <div key={src} className="relative h-44 rounded-lg overflow-hidden border border-white/5">
                <Image src={src} alt={fmt(d.image, { title: project.title, n: i + 1 })} fill className="object-cover" sizes="(min-width: 640px) 300px, 50vw" />
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-6 mb-10">
          <p className="text-text-primary font-semibold mb-1">{d.similarTitle}</p>
          <p className="text-text-secondary text-sm mb-4">{d.similarText}</p>
          <div className="flex flex-wrap gap-3">
            <a href={waLink(fmt(t.whatsapp.caseStudy, { title: project.title }))} target="_blank" rel="noopener noreferrer">
              <Button>
                <WhatsAppIcon /> {d.wantThis}
              </Button>
            </a>
            {relatedProduct && (
              <Link href={localizePath(lang, `/productos/${relatedProduct.slug}`)}>
                <Button variant="outline">{d.seeProduct}</Button>
              </Link>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  {d.live} <ExternalLink size={15} />
                </Button>
              </a>
            )}
            <Link href={localizePath(lang, '/contacto')}>
              <Button variant="outline">{d.tellProject}</Button>
            </Link>
          </div>
          {relatedService && (
            <Link
              href={localizePath(lang, `/servicios/${relatedService.slug}`)}
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-accent-green hover:underline"
            >
              {d.relatedService} {relatedService.title} <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Detalles técnicos, plegados */}
        {(project.challenges.length > 0 || project.technologies.length > 0) && (
          <details className="group bg-bg-surface border border-white/5 rounded-lg">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-4 text-text-primary font-semibold">
              {d.technical}
              <ChevronDown size={18} className="text-accent-green shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6">
              {project.challenges.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-text-primary font-semibold text-sm mb-3">{d.challenges}</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-accent-green mt-1 shrink-0">→</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold text-sm mb-3">{d.solutions}</h3>
                    <ul className="space-y-3">
                      {project.solutions.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-text-secondary">
                          <CheckCircle size={14} className="text-accent-green mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
