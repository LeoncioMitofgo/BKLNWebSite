import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Lock, Mail, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
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

export default async function NosotrosPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const a = t.about

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            {a.h1Start} <span className="text-accent-green">{a.h1Highlight}</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">{a.lead}</p>
        </div>
      </section>

      {/* Cifras */}
      <section className="py-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-accent-green">{stat.value}</p>
              <p className="text-text-secondary text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={a.whoTitle} />
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>{a.whoP1}</p>
            <p>{a.whoP2}</p>
            <p>{a.whoP3}</p>
          </div>

          <div className="mt-8 flex items-start gap-3 bg-bg-surface border border-white/5 rounded-lg p-5">
            <Lock size={18} className="text-accent-green mt-0.5 shrink-0" />
            <p className="text-text-secondary text-sm leading-relaxed">
              <span className="text-text-primary font-semibold">{a.confidentialTitle}</span> {a.confidentialText}
            </p>
          </div>

          {/* Datos de la empresa */}
          <div className="mt-12">
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <h3 className="text-text-primary font-bold text-lg mb-5">{a.companyTitle}</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <dt className="text-text-secondary text-xs">{a.companyLegalName}</dt>
                  <dd className="text-text-primary">{company.legalName}</dd>
                </div>
                <div>
                  <dt className="text-text-secondary text-xs">{a.companyBrand}</dt>
                  <dd className="text-text-primary">{company.brandName}</dd>
                </div>
                <div>
                  <dt className="text-text-secondary text-xs">{a.companyAddress}</dt>
                  <dd className="text-text-primary">
                    <MapPin size={14} className="inline -mt-0.5 mr-1 text-accent-green" />
                    {a.companyAddressValue}
                    <a
                      href={company.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-accent-green hover:underline whitespace-nowrap"
                    >
                      {a.companyViewOnMaps}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-text-secondary text-xs">{a.companyHours}</dt>
                  <dd className="text-text-primary">
                    {a.companyHoursValue.map((line) => (
                      <span key={line} className="flex items-center gap-1">
                        <Clock size={14} className="text-accent-green shrink-0" /> {line}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-secondary text-xs">{a.companyContact}</dt>
                  <dd className="text-text-primary flex flex-col gap-1">
                    <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-1 hover:text-accent-green">
                      <Mail size={14} className="text-accent-green" /> {contactEmail}
                    </a>
                    <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent-green">
                      <WhatsAppIcon size={14} /> {whatsappDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-text-secondary text-xs">{a.companyFounded}</dt>
                  <dd className="text-text-primary">{company.foundingYear}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-text-primary font-bold text-lg mb-4">{a.sectorsTitle}</h3>
            <ul className="flex flex-wrap gap-2">
              {a.sectors.map((sector) => (
                <li key={sector} className="px-3 py-1.5 rounded-full border border-white/10 bg-bg-surface text-text-secondary text-sm">
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Por qué nosotros */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={a.whyTitle} centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {t.whyUs.map((item) => (
              <div key={item.title} className="bg-bg-dark border border-white/5 rounded-lg p-5">
                <CheckCircle size={18} className="text-accent-green mb-3" />
                <h3 className="text-text-primary font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <h3 className="text-text-primary font-bold text-lg mb-4 text-center">{a.marketTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.localContext.map((item) => (
              <div key={item.title} className="bg-bg-dark border border-white/5 rounded-lg p-4">
                <h4 className="text-text-primary font-semibold mb-1 text-sm">{item.title}</h4>
                <p className="text-text-secondary text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title={a.processTitle} />
          <ol className="space-y-4">
            {t.process.map((step) => (
              <li key={step.step} className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-full bg-brand-green/15 flex items-center justify-center text-accent-green font-bold text-sm">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-text-primary font-semibold">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href={localizePath(lang, '/servicios')} className="inline-flex items-center gap-1.5 mt-6 text-sm text-accent-green hover:underline">
            {a.seeServices} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Tecnología */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={a.techTitle} subtitle={a.techSubtitle} centered />
          <TechStack descriptions={t.techStack} />
        </div>
      </section>

      {/* Llamada final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">{a.finalTitle}</h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">{a.finalText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localizePath(lang, '/contacto')}>
              <Button size="lg">
                {t.common.requestProposal} <ArrowRight size={18} />
              </Button>
            </Link>
            <a href={waLink(t.whatsapp.project)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <WhatsAppIcon size={18} /> {t.common.whatsappWrite}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
