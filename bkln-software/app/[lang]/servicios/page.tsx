import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { ExternalButton } from '@/components/ui/ButtonLink'
import { buttonClasses } from '@/components/ui/button-styles'
import { ServiceList } from '@/components/home/ServiceList'
import { ContactForm } from '@/components/sections/ContactForm'
import { waLink } from '@/data/contact'
import { serviceImages } from '@/data/service-images'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).services
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/servicios' })
}

export default async function ServiciosPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const s = t.services
  const { services } = getContent(lang)
  const sectionTitle = 'font-display text-[clamp(40px,5.4vw,80px)] font-extrabold leading-[0.95] tracking-[-0.03em]'

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-20 sm:px-8 sm:pt-44">
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
          {s.h1Start} <span className="text-accent-green">{s.h1Highlight}</span>
        </h1>
        <p className="mt-8 max-w-[56ch] text-lg text-text-secondary sm:text-xl">{s.lead}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#presupuesto" className={buttonClasses('primary', 'lg')}>
            {s.tellProject}
          </a>
          <ExternalButton href={waLink(t.whatsapp.project)} variant="outline" size="lg">
            <WhatsAppIcon size={18} /> {t.common.whatsappWrite}
          </ExternalButton>
        </div>
      </header>

      {/* Servicios */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className={sectionTitle} data-reveal>
            {s.whatTitle}
          </h2>
          <p className="max-w-[40ch] text-text-secondary" data-reveal="1">
            {s.whatSubtitle}
          </p>
        </div>
        <ServiceList
          items={services.map((service) => ({
            href: localizePath(lang, `/servicios/${service.slug}`),
            title: service.title,
            description: service.description,
            image: serviceImages[service.slug],
          }))}
        />
      </section>

      {/* Cómo trabajamos */}
      <section className="border-y border-white/10 bg-bg-surface py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className={`${sectionTitle} mb-5`} data-reveal>
            {s.processTitle}
          </h2>
          <p className="mb-16 max-w-[52ch] text-lg text-text-secondary" data-reveal="1">
            {s.processSubtitle}
          </p>
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.map((step, i) => (
              <li key={step.step} className="border-t-2 border-text-primary pt-6" data-reveal={String(i)}>
                <span className="font-display text-sm font-bold text-text-secondary">{step.step}</span>
                <h3 className="mt-2 mb-3 font-display text-[22px] font-bold leading-tight tracking-[-0.01em]">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-24 mb-8 font-display text-[28px] font-bold tracking-[-0.02em]" data-reveal>
            {s.commitmentsTitle}
          </h3>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-3">
            {s.commitments.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary" data-reveal>
                <CheckCircle size={20} className="mt-0.5 shrink-0 text-text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulario */}
      <section id="presupuesto" className="scroll-mt-20 py-28">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <h2 className={`${sectionTitle} mb-5`}>{s.formTitle}</h2>
          <p className="mb-12 text-lg text-text-secondary">{s.formSubtitle}</p>
          <ContactForm lang={lang} t={t.form} waErrorMessage={t.whatsapp.formError} services={services.map(({ slug, title }) => ({ slug, title }))} />
        </div>
      </section>
    </div>
  )
}
