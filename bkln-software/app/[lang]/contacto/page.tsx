import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { ContactForm } from '@/components/sections/ContactForm'
import { ExternalButton } from '@/components/ui/ButtonLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { company, contactEmail, waLink, whatsappDisplay } from '@/data/contact'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localeFromParams, type LangParams } from '@/i18n/server'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).contact
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/contacto' })
}

export default async function ContactoPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const c = t.contact
  const a = t.about
  const { services, products } = getContent(lang)
  const row = 'border-b border-white/10 py-6'
  const label = 'mb-1.5 text-sm text-text-secondary'

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 sm:pt-44">
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
          {c.h1Start} <span className="text-accent-green">{c.h1Highlight}</span>
        </h1>
        <p className="mt-8 max-w-[52ch] text-lg text-text-secondary sm:text-xl">{c.lead}</p>
        <div className="mt-10">
          <ExternalButton href={waLink(t.whatsapp.project)} size="lg" variant="whatsapp">
            <WhatsAppIcon size={18} /> {c.whatsappButton}
          </ExternalButton>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm
            lang={lang}
            t={t.form}
            waErrorMessage={t.whatsapp.formError}
            services={services.map(({ slug, title }) => ({ slug, title }))}
            products={products.map(({ slug, title }) => ({ slug, title }))}
          />
        </div>

        <aside className="lg:col-span-5">
          <p className="mb-2 inline-flex items-center gap-2.5 text-sm font-semibold text-accent-green">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
            </span>
            {c.available}
          </p>
          <p className="mb-6 text-text-secondary">{c.availableText}</p>

          <dl className="border-t border-white/10">
            <div className={row}>
              <dt className={label}>{c.whatsappTitle}</dt>
              <dd>
                <a href={waLink(t.whatsapp.general)} target="_blank" rel="noopener noreferrer" className="font-display text-[22px] font-bold underline-offset-4 hover:underline">
                  {whatsappDisplay}
                </a>
                <p className="mt-1 text-sm text-text-secondary">{c.whatsappHint}</p>
              </dd>
            </div>
            <div className={row}>
              <dt className={label}>{c.emailTitle}</dt>
              <dd>
                <a href={`mailto:${contactEmail}`} className="font-display text-[22px] font-bold underline-offset-4 hover:underline">
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div className={row}>
              <dt className={label}>{a.companyAddress}</dt>
              <dd>
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {a.companyAddressValue}
                </a>
                <span className="text-text-secondary"> · </span>
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-text-primary underline decoration-white/30 underline-offset-4 hover:decoration-text-primary">
                  {a.companyViewOnMaps}
                </a>
              </dd>
            </div>
            <div className={row}>
              <dt className={label}>{a.companyHours}</dt>
              {a.companyHoursValue.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
            <div className={row}>
              <dt className={label}>{c.responseTitle}</dt>
              <dd>{c.responseText}</dd>
            </div>
          </dl>

          <h2 className="mt-10 mb-5 font-display text-[22px] font-bold tracking-[-0.01em]">{c.expectTitle}</h2>
          <ul className="space-y-3">
            {c.expect.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  )
}
