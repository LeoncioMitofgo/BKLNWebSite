import { ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ContactForm } from '@/components/sections/ContactForm'
import { waLink } from '@/data/contact'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
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

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            {s.h1Start} <span className="text-accent-green">{s.h1Highlight}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">{s.lead}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <a href="#presupuesto">
              <Button>
                {s.tellProject} <ArrowRight size={16} />
              </Button>
            </a>
            <a href={waLink(t.whatsapp.project)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <WhatsAppIcon /> {t.common.whatsappWrite}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.whatTitle} subtitle={s.whatSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.processTitle} subtitle={s.processSubtitle} centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="bg-bg-dark border border-white/5 rounded-lg p-6 text-center h-full">
                  <div className="w-12 h-12 bg-brand-green/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent-green font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < t.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-brand-green">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.commitmentsTitle} centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.commitments.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-success mt-0.5 shrink-0" />
                <span className="text-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section id="presupuesto" className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30 scroll-mt-16">
        <div className="max-w-2xl mx-auto">
          <SectionHeader title={s.formTitle} subtitle={s.formSubtitle} centered />
          <ContactForm
            lang={lang}
            t={t.form}
            waErrorMessage={t.whatsapp.formError}
            services={services.map(({ slug, title }) => ({ slug, title }))}
          />
        </div>
      </section>
    </div>
  )
}
