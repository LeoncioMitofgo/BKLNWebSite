import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
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

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={localizePath(lang, '/productos')}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> {d.back}
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="relative w-full sm:w-48 h-40 rounded-lg overflow-hidden border border-white/5 bg-bg-surface shrink-0">
            <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(min-width: 640px) 192px, 100vw" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-accent-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">
                {t.products.categories[product.category]}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{product.title}</h1>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{product.description}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href={contactHref}>
                <Button>{product.requiresMeeting ? d.requestMeeting : d.requestInfo}</Button>
              </Link>
              <a href={waLink(fmt(t.whatsapp.product, { title: product.title }))} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <WhatsAppIcon /> {t.common.whatsapp}
                </Button>
              </a>
            </div>
            {product.pricingNote && (
              <p className="text-text-secondary text-sm leading-snug mt-3">{product.pricingNote}</p>
            )}
            {relatedProject && (
              <Link
                href={localizePath(lang, `/portfolio/${relatedProject.slug}`)}
                className="inline-flex items-center gap-1.5 text-accent-green hover:underline text-sm mt-4"
              >
                {d.caseStudy}
              </Link>
            )}
          </div>
        </div>

        {/* Capturas */}
        {product.screenshots.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {product.screenshots.map((src, i) => (
              <div key={src} className="relative h-40 rounded-lg overflow-hidden border border-white/5">
                <Image src={src} alt={fmt(d.screenshot, { n: i + 1 })} fill className="object-cover" sizes="(min-width: 640px) 300px, 50vw" />
              </div>
            ))}
          </div>
        )}

        {/* Descripción */}
        <div className="mb-10">
          {product.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Qué incluye */}
          {product.includes && product.includes.length > 0 && (
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <h2 className="text-text-primary font-bold mb-4">{d.includes}</h2>
              <ul className="space-y-2">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle size={13} className="text-accent-green mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requisitos */}
          <div className="space-y-4">
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={14} className="text-accent-green" />
                <h2 className="text-text-primary font-bold">{d.requirements}</h2>
              </div>
              <ul className="space-y-1.5">
                {product.requirements.map((req) => (
                  <li key={req} className="text-sm text-text-secondary">· {req}</li>
                ))}
              </ul>
            </div>

            {/* Plan de soporte */}
            {product.supportPlan && (
              <div className="bg-brand-green/5 border border-brand-green/15 rounded-lg p-4">
                <p className="text-text-primary font-semibold text-sm mb-1">
                  {fmt(d.supportPlan, { period: product.supportPlan.period })}
                </p>
                <ul className="space-y-1">
                  {product.supportPlan.includes.map((item) => (
                    <li key={item} className="text-xs text-text-secondary">· {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CTA final */}
        <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-6 text-center">
          <p className="text-text-primary font-semibold mb-2">{d.customTitle}</p>
          <p className="text-text-secondary text-sm mb-4">{d.customText}</p>
          <Link href={contactHref}>
            <Button>{d.contact}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
