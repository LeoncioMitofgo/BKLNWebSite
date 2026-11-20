import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle, ChevronDown } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata, siteName, siteUrl } from '@/lib/metadata'
import { ExternalButton } from '@/components/ui/ButtonLink'
import { buttonClasses } from '@/components/ui/button-styles'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { ContactForm } from '@/components/sections/ContactForm'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProductCard } from '@/components/sections/ProductCard'
import { services as baseServices } from '@/data/content'
import { waLink } from '@/data/contact'
import { serviceImages } from '@/data/service-images'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangSlugParams } from '@/i18n/server'
import { fmt } from '@/lib/utils'

export function generateStaticParams() {
  return baseServices.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: LangSlugParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const service = getContent(lang).services.find((s) => s.slug === slug)
  if (!service) return {}
  return pageMetadata({ lang, title: service.title, description: service.description, path: `/servicios/${service.slug}` })
}

const blockTitle = 'font-display text-[clamp(34px,4.4vw,56px)] font-extrabold leading-[1] tracking-[-0.03em]'

export default async function ServicePage({ params }: LangSlugParams) {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const t = getDictionary(lang)
  const d = t.services.detail
  const { services, projects, products, posts } = getContent(lang)
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const relatedProjects = projects.filter((p) => service.relatedProjects.includes(p.slug))
  const relatedProducts = products.filter((p) => service.relatedProducts.includes(p.slug))
  const relatedGuides = posts
    .filter((p) => p.relatedService === service.slug || (p.relatedProduct && service.relatedProducts.includes(p.relatedProduct)))
    .slice(0, 3)
  const waMessage = fmt(t.whatsapp.service, { title: service.title })
  const image = serviceImages[service.slug]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      url: `${siteUrl}${localizePath(lang, `/servicios/${service.slug}`)}`,
      inLanguage: lang,
      areaServed: t.meta.areaServed,
      provider: { '@type': 'LocalBusiness', name: siteName, url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ]

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Cabecera */}
      <header className="mx-auto max-w-7xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
        <Link href={localizePath(lang, '/servicios')} className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary">
          <ArrowLeft size={16} /> {d.back}
        </Link>
        <h1 className="max-w-[14ch] font-display text-[clamp(46px,7vw,104px)] font-extrabold leading-[0.95] tracking-[-0.04em]">{service.title}</h1>
        <p className="mt-8 max-w-[58ch] text-lg text-text-secondary sm:text-xl">{service.description}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#presupuesto" className={buttonClasses('primary', 'lg')}>
            {d.quote}
          </a>
          <ExternalButton href={waLink(waMessage)} variant="outline" size="lg">
            <WhatsAppIcon size={18} /> {t.common.whatsappWrite}
          </ExternalButton>
        </div>
      </header>

      {image && (
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Image src={image} alt="" width={1200} height={720} sizes="(min-width: 1240px) 1240px, 100vw" className="w-full rounded-[22px] border border-white/10" priority />
        </div>
      )}

      {/* Introducción + para quién */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed text-text-secondary lg:col-span-7">
          {service.longDescription.split('\n\n').map((para, i) => (
            <p key={i} data-reveal>
              {para}
            </p>
          ))}
        </div>
        <div className="lg:col-span-5" data-reveal="1">
          <h2 className="mb-6 font-display text-[28px] font-bold tracking-[-0.02em]">{d.forWho}</h2>
          <ul className="border-t border-white/10">
            {service.forWho.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-white/10 py-4 text-text-primary">
                <CheckCircle size={19} className="mt-0.5 shrink-0 text-text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ejemplos */}
      <section className="border-y border-white/10 bg-bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className={`${blockTitle} mb-14`} data-reveal>
            {d.examples}
          </h2>
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            {service.examples.map((ex) => (
              <div key={ex.title} className="border-t border-white/15 pt-6" data-reveal>
                <h3 className="mb-2 font-display text-[22px] font-bold tracking-[-0.01em]">{ex.title}</h3>
                <p className="text-text-secondary">{ex.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos listos para adaptar */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
          <h2 className={`${blockTitle} mb-4`}>{d.products}</h2>
          <p className="mb-12 max-w-[56ch] text-text-secondary">{d.productsSubtitle}</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {/* Qué incluye / precio / plazo */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 lg:grid-cols-3">
        <div data-reveal>
          <h2 className="mb-6 font-display text-[26px] font-bold tracking-[-0.02em]">{d.includes}</h2>
          <ul className="space-y-3.5">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="1">
          <h2 className="mb-6 font-display text-[26px] font-bold tracking-[-0.02em]">{d.pricing}</h2>
          <ul className="space-y-3.5">
            {service.pricingFactors.map((f) => (
              <li key={f} className="flex items-start gap-3 text-text-secondary">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="2">
          <h2 className="mb-6 font-display text-[26px] font-bold tracking-[-0.02em]">{d.timeline}</h2>
          <p className="font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-text-primary">{service.timeline}</p>
        </div>
      </section>

      {/* Proyectos relacionados */}
      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <h2 className={`${blockTitle} mb-4`}>{d.projects}</h2>
          <p className="mb-14 max-w-[56ch] text-text-secondary">{d.projectsSubtitle}</p>
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {/* Guías relacionadas */}
      {relatedGuides.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <h2 className="mb-6 text-sm font-semibold tracking-[0.06em] text-text-secondary">{d.guides.toUpperCase()}</h2>
          <ul className="border-t border-white/10">
            {relatedGuides.map((post) => (
              <li key={post.slug} className="border-b border-white/10">
                <Link href={localizePath(lang, `/blog/${post.slug}`)} className="group block py-6">
                  <span className="block font-read text-[24px] leading-[1.3] transition-colors group-hover:underline sm:text-[28px]">{post.title}</span>
                  <span className="text-sm text-text-secondary">
                    {post.readTime} {t.common.readMinLong}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Preguntas frecuentes */}
      {service.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
          <h2 className={`${blockTitle} mb-10`}>{d.faqs}</h2>
          <div className="border-t border-white/10">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[20px] font-bold tracking-[-0.01em] sm:text-[22px]">
                  {faq.question}
                  <ChevronDown size={22} className="shrink-0 text-text-secondary transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-[64ch] pb-7 text-lg leading-relaxed text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Formulario */}
      <section id="presupuesto" className="scroll-mt-20 border-t border-white/10 bg-bg-surface py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <h2 className={`${blockTitle} mb-5`}>{d.formTitle}</h2>
          <p className="mb-4 text-lg text-text-secondary">{d.formSubtitle}</p>
          <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="mb-12 inline-flex items-center gap-2 font-semibold text-text-primary underline decoration-white/30 underline-offset-4 hover:decoration-text-primary">
            <WhatsAppIcon size={18} /> {t.common.whatsappPrefer}
          </a>
          <ContactForm
            lang={lang}
            t={t.form}
            waErrorMessage={t.whatsapp.formError}
            services={services.map(({ slug, title }) => ({ slug, title }))}
            defaultService={service.slug}
          />
          <ul className="mt-14 flex flex-wrap gap-2" aria-label={d.tech}>
            {service.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-white/15 px-3 py-1 text-sm text-text-secondary">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
