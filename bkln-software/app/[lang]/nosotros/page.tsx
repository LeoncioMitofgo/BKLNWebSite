import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Lock } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { ButtonLink, ExternalButton } from '@/components/ui/ButtonLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { TechStack } from '@/components/sections/TechStack'
import { company, contactEmail, waLink, whatsappDisplay } from '@/data/contact'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).about
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/nosotros' })
}

const sectionTitle = 'font-display text-[clamp(40px,5.4vw,80px)] font-extrabold leading-[0.95] tracking-[-0.03em]'
const quietLink = 'border-b border-white/25 transition-colors hover:border-text-primary'

export default async function NosotrosPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const a = t.about
  const dt = 'mb-1 text-sm text-text-secondary'

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 sm:pt-44">
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
          {a.h1Start} <span className="text-accent-green">{a.h1Highlight}</span>
        </h1>
        <p className="mt-8 max-w-[60ch] text-lg text-text-secondary sm:text-xl">{a.lead}</p>
      </header>

      {/* Cifras comprobables (sin "35+" ni "3 países") */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-3">
          {t.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse" data-reveal>
              <dt className="mt-2 text-sm text-text-secondary">{stat.label}</dt>
              <dd className="font-display text-[clamp(32px,3.6vw,48px)] font-extrabold leading-none tracking-[-0.03em]">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Quiénes somos y quién está detrás, sobre papel */}
      <section className="bg-paper py-24 text-paper-ink">
        <div className="mx-auto max-w-[720px] px-5 sm:px-7">
          <h2 className="mb-10 font-display text-[clamp(38px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em]">{a.whoTitle}</h2>
          <div className="space-y-6 font-read text-[20px] leading-[1.7] text-[#232823] sm:text-[21px]">
            <p data-reveal>{a.whoP1}</p>
            <p data-reveal>{a.whoP2}</p>
            <p data-reveal>{a.whoP3}</p>
          </div>
          <p className="mt-10 flex items-start gap-3 border-t border-paper-line pt-8 text-paper-muted" data-reveal>
            <Lock size={18} className="mt-1 shrink-0 text-paper-muted" />
            <span>
              <strong className="text-paper-ink">{a.confidentialTitle}</strong> {a.confidentialText}
            </span>
          </p>
          <div className="mt-12" data-reveal>
            <h3 className="mb-4 text-sm font-semibold tracking-[0.06em] text-paper-muted">{a.sectorsTitle.toUpperCase()}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.home.sectors.map((sector) => (
                <li key={sector} className="rounded-full border border-paper-line px-4 py-1.5 text-paper-ink">
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quién está detrás de BKLN: foto pequeña y cargo "Fundador" */}
        <div id="fundador" className="mx-auto mt-24 grid max-w-[980px] scroll-mt-24 grid-cols-1 items-start gap-10 px-5 sm:px-7 md:grid-cols-[240px_1fr] md:gap-14">
          <figure className="max-w-[160px] md:max-w-[240px]" data-reveal>
            <div className="overflow-hidden rounded-[18px] bg-[#e6e1d5]">
              <Image src="/fundador-leoncio.jpg" alt={a.founderPhotoAlt} width={600} height={832} sizes="240px" className="aspect-[4/5] w-full object-cover object-[50%_20%]" />
            </div>
          </figure>
          <div data-reveal="1">
            <p className="mb-2 text-[15px] text-paper-muted">{a.founderTitle}</p>
            <h2 className="font-display text-[clamp(30px,3.4vw,44px)] font-extrabold leading-[1.02] tracking-[-0.025em]">{a.founderName}</h2>
            <p className="mt-3 mb-7 text-[17px] text-paper-muted">{a.founderRole}</p>
            <div className="space-y-4 text-[18px] leading-[1.65] text-[#2a302b]">
              <p>{a.founderP1}</p>
              <p>{a.founderP2}</p>
              <p className="text-[15px] text-paper-muted">{a.founderP3}</p>
            </div>
            <p className="mt-7">
              <a
                href={company.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b-[1.5px] border-paper-line pb-0.5 font-semibold transition-colors hover:border-paper-ink"
              >
                {a.founderLinkedIn}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Por qué y mercado real */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <h2 className={`${sectionTitle} mb-14`} data-reveal>
          {a.whyTitle}
        </h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.map((item, i) => (
            <div key={item.title} className="border-t-2 border-text-primary pt-6" data-reveal={String(i)}>
              <h3 className="mb-3 font-display text-[22px] font-bold leading-tight tracking-[-0.01em]">{item.title}</h3>
              <p className="text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-24 mb-10 font-display text-[clamp(30px,3.4vw,44px)] font-extrabold tracking-[-0.02em]" data-reveal>
          {a.marketTitle}
        </h3>
        <ul className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.localContext.map((item) => (
            <li key={item.title} className="flex items-start gap-3" data-reveal>
              <CheckCircle size={20} className="mt-1 shrink-0 text-text-secondary" />
              <span>
                <span className="block font-semibold">{item.title}</span>
                <span className="text-text-secondary">{item.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cómo trabajamos */}
      <section className="border-y border-white/10 bg-bg-surface py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className={`${sectionTitle} mb-14`} data-reveal>
            {a.processTitle}
          </h2>
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.map((step, i) => (
              <li key={step.step} className="border-t-2 border-text-primary pt-6" data-reveal={String(i)}>
                <span className="font-display text-sm font-bold text-text-secondary">{step.step}</span>
                <h3 className="mt-2 mb-3 font-display text-[22px] font-bold leading-tight tracking-[-0.01em]">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </li>
            ))}
          </ol>
          <Link href={localizePath(lang, '/servicios')} className="mt-12 inline-block border-b-[1.5px] border-white/25 pb-1 font-semibold transition-colors hover:border-text-primary">
            {a.seeServices}
          </Link>
        </div>
      </section>

      {/* Datos de la empresa */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <h2 className={`${sectionTitle} mb-14`} data-reveal>
          {a.companyTitle}
        </h2>
        <dl className="grid grid-cols-1 gap-x-12 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          <div>
            <dt className={dt}>{a.companyLegalName}</dt>
            <dd className="text-lg">{company.legalName}</dd>
          </div>
          <div>
            <dt className={dt}>{a.companyBrand}</dt>
            <dd className="text-lg">{company.brandName}</dd>
          </div>
          <div>
            <dt className={dt}>{a.companyAddress}</dt>
            <dd className="text-lg">
              {a.companyAddressValue}{' '}
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className={`whitespace-nowrap ${quietLink}`}>
                {a.companyViewOnMaps}
              </a>
            </dd>
          </div>
          <div>
            <dt className={dt}>{a.companyHours}</dt>
            {a.companyHoursValue.map((line) => (
              <dd key={line} className="text-lg">
                {line}
              </dd>
            ))}
          </div>
          <div>
            <dt className={dt}>{a.companyContact}</dt>
            <dd className="text-lg">
              <a href={`mailto:${contactEmail}`} className={quietLink}>
                {contactEmail}
              </a>
            </dd>
            <dd className="text-lg">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className={quietLink}>
                WhatsApp {whatsappDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className={dt}>{a.companyFounded}</dt>
            <dd className="text-lg">{company.foundingYear}</dd>
          </div>
        </dl>
      </section>

      {/* Tecnología */}
      <section className="border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className={`${sectionTitle} mb-5`} data-reveal>
            {a.techTitle}
          </h2>
          <p className="mb-14 max-w-[56ch] text-lg text-text-secondary" data-reveal="1">
            {a.techSubtitle}
          </p>
          <TechStack descriptions={t.techStack} />
        </div>
      </section>

      {/* Llamada final */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="rounded-[26px] border border-white/10 bg-bg-surface p-8 sm:p-14">
          <h2 className="mb-4 font-display text-[clamp(36px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em]">{a.finalTitle}</h2>
          <p className="mb-9 max-w-[56ch] text-lg text-text-secondary">{a.finalText}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={localizePath(lang, '/contacto')} size="lg">
              {t.common.requestProposal}
            </ButtonLink>
            <ExternalButton href={waLink(t.whatsapp.project)} variant="outline" size="lg">
              <WhatsAppIcon size={18} /> {t.common.whatsappWrite}
            </ExternalButton>
          </div>
        </div>
      </section>
    </div>
  )
}
