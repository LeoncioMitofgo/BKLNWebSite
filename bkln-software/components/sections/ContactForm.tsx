'use client'

import { useState, useId, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ContactFormData } from '@/types'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { waLink } from '@/data/contact'

const BUDGETS = ['menos-150k', '150k-500k', '500k-1500k', 'mas-1500k', 'negociar'] as const

const inputClass =
  'w-full bg-bg-dark border border-white/10 rounded-md px-4 py-2.5 text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors'

const labelClass = 'block text-text-secondary text-sm mb-1.5 font-medium'

interface Option {
  slug: string
  title: string
}

interface ContactFormProps {
  lang: Locale
  t: Dictionary['form']
  /** Mensaje de WhatsApp pre-rellenado si el envío falla. */
  waErrorMessage: string
  /** Opciones de "Tipo de proyecto": los slugs coinciden con ?servicio=<slug>. */
  services: Option[]
  products?: Option[]
  /** Servicio preseleccionado (p. ej. en la página de ese servicio). */
  defaultService?: string
}

type FieldsProps = Omit<ContactFormProps, 'products' | 'defaultService'> & {
  initialProjectType: string
  initialProduct: string
}

function ContactFormInner({ products = [], defaultService = '', ...props }: ContactFormProps) {
  const searchParams = useSearchParams()
  const servicioParam = searchParams.get('servicio') ?? defaultService
  const productoParam = searchParams.get('producto') ?? ''
  const productTitle = products.find((p) => p.slug === productoParam)?.title ?? ''

  // La key reinicia el formulario si cambian los parámetros sin desmontar la página.
  return (
    <ContactFormFields
      key={`${servicioParam}|${productTitle}`}
      {...props}
      initialProjectType={props.services.some((s) => s.slug === servicioParam) ? servicioParam : ''}
      initialProduct={productTitle}
    />
  )
}

function ContactFormFields({ lang, t, waErrorMessage, services, initialProjectType, initialProduct }: FieldsProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    projectType: initialProjectType,
    product: initialProduct,
    budget: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  // Campo trampa anti-spam: invisible para personas, los bots suelen rellenarlo.
  const [website, setWebsite] = useState('')
  const id = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website,
          language: lang,
          sourcePath: window.location.pathname + window.location.search,
        }),
      })
      if (!res.ok) throw new Error(res.status === 400 ? t.errorInvalid : t.errorSend)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : t.errorSend)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-bg-surface border border-white/5 rounded-lg p-8 text-center">
        <CheckCircle size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-text-primary font-bold text-xl mb-2">{t.successTitle}</h3>
        <p className="text-text-secondary">{t.successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-surface border border-white/5 rounded-lg p-6 space-y-5">
      {formData.product && (
        <p className="text-sm text-text-secondary bg-brand-green/10 border border-brand-green/20 rounded-md px-4 py-2.5">
          {t.productAbout} <span className="text-text-primary font-semibold">{formData.product}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>{t.name}</label>
          <input
            id={`${id}-name`}
            type="text"
            required
            className={inputClass}
            placeholder={t.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>{t.email}</label>
          <input
            id={`${id}-email`}
            type="email"
            required
            className={inputClass}
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-whatsapp`} className={labelClass}>{t.whatsapp}</label>
          <input
            id={`${id}-whatsapp`}
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder={t.whatsappPlaceholder}
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-company`} className={labelClass}>{t.company}</label>
          <input
            id={`${id}-company`}
            type="text"
            className={inputClass}
            placeholder={t.companyPlaceholder}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${id}-website`}>{t.honeypot}</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-type`} className={labelClass}>{t.projectType}{formData.product ? '' : ' *'}</label>
          <select
            id={`${id}-type`}
            required={!formData.product}
            className={inputClass}
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          >
            <option value="">{t.select}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
            <option value="otro">{t.other}</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-budget`} className={labelClass}>{t.budget}</label>
          <select
            id={`${id}-budget`}
            required
            className={inputClass}
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          >
            <option value="">{t.select}</option>
            {BUDGETS.map((value) => (
              <option key={value} value={value}>{t.budgets[value]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-description`} className={labelClass}>{t.description}</label>
        <textarea
          id={`${id}-description`}
          required
          rows={5}
          className={inputClass}
          placeholder={t.descriptionPlaceholder}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {error && (
        <p className="text-error text-sm bg-error/10 border border-error/20 rounded-md px-4 py-2.5">
          {error}{' '}
          <a
            href={waLink(waErrorMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            {t.errorWhatsapp}
          </a>
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={submitting}>
        {submitting ? t.sending : <><Send size={16} /> {t.send}</>}
      </Button>
    </form>
  )
}

export function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<div className="bg-bg-surface border border-white/5 rounded-lg p-6 h-96 animate-pulse" />}>
      <ContactFormInner {...props} />
    </Suspense>
  )
}
