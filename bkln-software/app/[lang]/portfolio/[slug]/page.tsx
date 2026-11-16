import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, CheckCircle, ChevronDown, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { ButtonLink, ExternalButton } from '@/components/ui/ButtonLink'
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

const isStockImage = (src: string) => !src || /^\/(course|project|product|service|blog)-/.test(src)

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
  // La primera imagen de la galería suele ser la de portada: no repetirla. Las de archivo no se enseñan.
  const gallery = project.gallery.filter((src) => src !== project.image && !isStockImage(src))
  const showCover = !isStockImage(project.image)
  const meta = [project.sector, String(project.year), project.status].filter(Boolean).join(' · ')

  return (
    <article>
      {/* Cabecera */}
      <header className="mx-auto max-w-7xl px-5 pt-32 pb-14 sm:px-8 sm:pt-40">
        <Link href={localizePath(lang, '/portfolio')} className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary">
          <ArrowLeft size={16} /> {d.back}
        </Link>
        <p className="mb-5 text-[15px] text-text-secondary">{meta}</p>
        <h1 className="max-w-[16ch] font-display text-[clamp(46px,7vw,104px)] font-extrabold leading-[0.95] tracking-[-0.04em]">{project.title}</h1>
        <p className="mt-8 max-w-[60ch] text-lg text-text-secondary sm:text-xl">{project.tagline ?? project.description}</p>
      </header>

      {showCover && (
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={900}
            sizes="(min-width: 1240px) 1240px, 100vw"
            className="w-full rounded-[22px] border border-white/10"
            priority
          />
        </div>
      )}

      {/* La historia, sobre papel para leerla */}
      <section className="mt-20 bg-paper py-24 text-paper-ink">
        <div className="mx-auto max-w-[720px] px-5 sm:px-7">
          <h2 className="mb-10 font-display text-[clamp(34px,4.4vw,52px)] font-extrabold leading-none tracking-[-0.03em]">{d.project}</h2>
          <div className="font-read text-[20px] leading-[1.7] text-[#232823] sm:text-[21px]">
            {project.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="mb-6" data-reveal>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Galería en grande */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {gallery.map((src, i) => (
              <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-[18px] border border-white/10" data-reveal>
                <Image
                  src={src}
                  alt={fmt(d.image, { title: project.title, n: i + 1 })}
                  width={1200}
                  height={720}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.02]"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ¿Quieres algo así? */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="rounded-[26px] border border-white/10 bg-bg-surface p-8 sm:p-14">
          <p className="mb-4 font-display text-[clamp(36px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em]">{d.similarTitle}</p>
          <p className="mb-9 max-w-[56ch] text-lg text-text-secondary">{d.similarText}</p>
          <div className="flex flex-wrap items-center gap-3">
            <ExternalButton href={waLink(fmt(t.whatsapp.caseStudy, { title: project.title }))} size="lg">
              <WhatsAppIcon size={18} /> {d.wantThis}
            </ExternalButton>
            <ButtonLink href={localizePath(lang, '/contacto')} variant="outline" size="lg">
              {d.tellProject}
            </ButtonLink>
            {relatedProduct && (
              <ButtonLink href={localizePath(lang, `/productos/${relatedProduct.slug}`)} variant="outline" size="lg">
                {d.seeProduct}
              </ButtonLink>
            )}
            {project.liveUrl && (
              <ExternalButton href={project.liveUrl} variant="outline" size="lg">
                {d.live} <ArrowUpRight size={17} />
              </ExternalButton>
            )}
          </div>
          {relatedService && (
            <Link href={localizePath(lang, `/servicios/${relatedService.slug}`)} className="mt-8 inline-flex items-center gap-2 border-b border-accent-green pb-0.5 font-semibold">
              {d.relatedService} {relatedService.title} <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Detalles técnicos, plegados */}
        {(project.challenges.length > 0 || project.technologies.length > 0) && (
          <details className="group mt-6 rounded-[22px] border border-white/10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-8 py-6 font-semibold">
              {d.technical}
              <ChevronDown size={20} className="shrink-0 text-accent-green transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-8 pb-8">
              {project.challenges.length > 0 && (
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-sm font-semibold">{d.challenges}</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-[15px] text-text-secondary">
                          <span className="mt-0.5 shrink-0 text-accent-green">→</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-sm font-semibold">{d.solutions}</h3>
                    <ul className="space-y-3">
                      {project.solutions.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-[15px] text-text-secondary">
                          <CheckCircle size={15} className="mt-1 shrink-0 text-accent-green" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-white/15 px-3 py-1 text-sm text-text-secondary">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        )}
      </section>
    </article>
  )
}
