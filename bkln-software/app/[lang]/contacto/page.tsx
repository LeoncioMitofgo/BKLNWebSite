import { Mail, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { ContactForm } from '@/components/sections/ContactForm'
import { contactEmail, waLink } from '@/data/contact'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
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
  const { services, products } = getContent(lang)

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            {c.h1Start} <span className="text-accent-green">{c.h1Highlight}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">{c.lead}</p>
          <a
            href={waLink(t.whatsapp.project)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon size={18} /> {c.whatsappButton}
          </a>
        </div>
      </section>

      {/* Formulario + Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <ContactForm
                lang={lang}
                t={t.form}
                waErrorMessage={t.whatsapp.formError}
                services={services.map(({ slug, title }) => ({ slug, title }))}
                products={products.map(({ slug, title }) => ({ slug, title }))}
              />
            </div>

            {/* Info de contacto */}
            <div className="space-y-5">
              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand-green/15 rounded-md flex items-center justify-center">
                    <Mail size={16} className="text-accent-green" />
                  </div>
                  <h3 className="text-text-primary font-semibold text-sm">{c.emailTitle}</h3>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-accent-green hover:underline text-sm"
                >
                  {contactEmail}
                </a>
              </div>

              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand-green/15 rounded-md flex items-center justify-center">
                    <MessageCircle size={16} className="text-accent-green" />
                  </div>
                  <h3 className="text-text-primary font-semibold text-sm">{c.whatsappTitle}</h3>
                </div>
                <a
                  href={waLink(t.whatsapp.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-green hover:underline text-sm"
                >
                  {c.whatsappLink}
                </a>
                <p className="text-text-secondary text-xs mt-1">{c.whatsappHint}</p>
              </div>

              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand-green/15 rounded-md flex items-center justify-center">
                    <Clock size={16} className="text-accent-green" />
                  </div>
                  <h3 className="text-text-primary font-semibold text-sm">{c.responseTitle}</h3>
                </div>
                <p className="text-text-secondary text-sm">{c.responseText}</p>
              </div>

              {/* Disponibilidad */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
                  <span className="text-success font-semibold text-sm">{c.available}</span>
                </div>
                <p className="text-text-secondary text-sm">{c.availableText}</p>
              </div>

              {/* Qué esperar */}
              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <h3 className="text-text-primary font-semibold text-sm mb-3">{c.expectTitle}</h3>
                <ul className="space-y-2">
                  {c.expect.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle size={13} className="text-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
