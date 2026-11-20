import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { ButtonLink, ExternalButton } from '@/components/ui/ButtonLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { demoTagClass } from '@/components/sections/ProjectCard'
import { products as baseProducts } from '@/data/content'
import { waLink } from '@/data/contact'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangSlugParams } from '@/i18n/server'
import { fmt } from '@/lib/utils'

export function generateStaticParams() {
  return baseProducts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: LangSlugParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const product = getContent(lang).products.find((p) => p.slug === slug)
  if (!product) return {}
  return pageMetadata({ lang, title: product.title, description: product.description, path: `/productos/${product.slug}`, image: product.image })
}

export default async function ProductPage({ params }: LangSlugParams) {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const t = getDictionary(lang)
  const d = t.products.detail
  const { products, projects } = getContent(lang)
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const relatedProject = projects.find((p) => p.slug === product.slug)
  const contactHref = localizePath(lang, `/contacto?producto=${product.slug}`)
  const screenshots = product.screenshots.filter((src) => src !== product.image)

  return (
    <article>
      <header className="mx-auto max-w-7xl px-5 pt-32 pb-14 sm:px-8 sm:pt-40">
        <Link href={localizePath(lang, '/productos')} className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary">
          <ArrowLeft size={16} /> {d.back}
        </Link>
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">{product.title}</h1>
        <p className="mt-8 max-w-[58ch] text-lg text-text-secondary sm:text-xl">{product.description}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={contactHref} size="lg">
            {product.requiresMeeting ? d.requestMeeting : d.requestInfo}
          </ButtonLink>
          <ExternalButton href={waLink(fmt(t.whatsapp.product, { title: product.title }))} variant="outline" size="lg">
            <WhatsAppIcon size={18} /> {t.common.whatsapp}
          </ExternalButton>
        </div>
        {product.pricingNote && <p className="mt-5 text-sm text-text-secondary">{product.pricingNote}</p>}
        {relatedProject && (
          <Link href={localizePath(lang, `/portfolio/${relatedProject.slug}`)} className="mt-6 inline-flex items-center gap-2 border-b border-white/25 pb-0.5 font-semibold transition-colors hover:border-text-primary">
            {d.caseStudy.replace(/\s*→\s*$/, '')} <ArrowRight size={15} />
          </Link>
        )}
      </header>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="relative">
          <Image src={product.image} alt={product.title} width={1600} height={900} sizes="(min-width: 1240px) 1240px, 100vw" className="w-full rounded-[22px] border border-white/10" priority />
          {product.demoData && <span className={demoTagClass}>{t.home.demoTag}</span>}
        </div>
      </div>

      {screenshots.length > 0 && (
        <div className="mx-auto mt-6 grid max-w-[1240px] grid-cols-1 gap-6 px-5 sm:px-8 md:grid-cols-2">
          {screenshots.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden rounded-[18px] border border-white/10" data-reveal>
              <Image src={src} alt={fmt(d.screenshot, { n: i + 1 })} width={1200} height={720} sizes="(min-width: 768px) 50vw, 100vw" className="w-full" />
              {product.demoData && <span className={demoTagClass}>{t.home.demoTag}</span>}
            </a>
          ))}
        </div>
      )}

      {/* Descripción para leer */}
      <section className="mt-24 bg-paper py-24 text-paper-ink">
        <div className="mx-auto max-w-[720px] space-y-6 px-5 font-read text-[20px] leading-[1.7] text-[#232823] sm:px-7 sm:text-[21px]">
          {product.longDescription.split('\n\n').map((para, i) => (
            <p key={i} data-reveal>
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 lg:grid-cols-3">
        {product.includes && product.includes.length > 0 && (
          <div data-reveal>
            <h2 className="mb-6 font-display text-[26px] font-bold tracking-[-0.02em]">{d.includes}</h2>
            <ul className="space-y-3.5">
              {product.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-text-secondary">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div data-reveal="1">
          <h2 className="mb-6 font-display text-[26px] font-bold tracking-[-0.02em]">{d.requirements}</h2>
          <ul className="space-y-3.5">
            {product.requirements.map((req) => (
              <li key={req} className="flex items-start gap-3 text-text-secondary">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary" />
                {req}
              </li>
            ))}
          </ul>
        </div>
        {product.supportPlan && (
          <div data-reveal="2">
            <h2 className="mb-6 font-display text-[26px] font-bold tracking-[-0.02em]">{fmt(d.supportPlan, { period: product.supportPlan.period })}</h2>
            <ul className="space-y-3.5">
              {product.supportPlan.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-text-secondary">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="rounded-[26px] border border-white/10 bg-bg-surface p-8 sm:p-14">
          <p className="mb-4 font-display text-[clamp(32px,4.4vw,56px)] font-extrabold leading-none tracking-[-0.03em]">{d.customTitle}</p>
          <p className="mb-9 max-w-[56ch] text-lg text-text-secondary">{d.customText}</p>
          <ButtonLink href={contactHref} size="lg">
            {d.contact}
          </ButtonLink>
        </div>
      </section>
    </article>
  )
}
