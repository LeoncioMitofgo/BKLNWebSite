'use client'

import { useState, useId, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ContactFormData } from '@/types'
import { waLink } from '@/data/contact'

// Los values coinciden con los slugs de servicio para que ?servicio=<slug> pre-rellene el campo.
const projectTypes = [
  { value: 'apps-android', label: 'App Android' },
  { value: 'desarrollo-web', label: 'Desarrollo Web / Marketplace' },
  { value: 'desktop-electron', label: 'App Desktop' },
  { value: 'python-automatizacion', label: 'Python & Automatización' },
  { value: 'databases-apis', label: 'Databases & APIs' },
  { value: 'ia-machine-learning', label: 'IA / Machine Learning' },
  { value: 'consultoria-tech', label: 'Consultoría Tech' },
  { value: 'otro', label: 'Otro' },
]

const budgetRanges = [
  { value: 'menos-150k', label: 'Menos de 150,000 XAF' },
  { value: '150k-500k', label: '150,000 – 500,000 XAF' },
  { value: '500k-1500k', label: '500,000 – 1,500,000 XAF' },
  { value: 'mas-1500k', label: 'Más de 1,500,000 XAF' },
  { value: 'negociar', label: 'Sin presupuesto definido / A negociar' },
]

const inputClass =
  'w-full bg-bg-dark border border-white/10 rounded-md px-4 py-2.5 text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors'

const labelClass = 'block text-text-secondary text-sm mb-1.5 font-medium'

interface ContactFormProps {
  products?: { slug: string; title: string }[]
}

function ContactFormInner({ products = [] }: ContactFormProps) {
  const searchParams = useSearchParams()
  const servicioParam = searchParams.get('servicio') ?? ''
  const productoParam = searchParams.get('producto') ?? ''
  const productTitle = products.find((p) => p.slug === productoParam)?.title ?? ''

  // La key reinicia el formulario si cambian los parámetros sin desmontar la página.
  return (
    <ContactFormFields
      key={`${servicioParam}|${productTitle}`}
      initialProjectType={servicioParam}
      initialProduct={productTitle}
    />
  )
}

function ContactFormFields({
  initialProjectType,
  initialProduct,
}: {
  initialProjectType: string
  initialProduct: string
}) {
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
          sourcePath: window.location.pathname + window.location.search,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error)
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-bg-surface border border-white/5 rounded-lg p-8 text-center">
        <CheckCircle size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-text-primary font-bold text-xl mb-2">¡Solicitud enviada!</h3>
        <p className="text-text-secondary">
          Gracias por contactarnos. Te responderemos en menos de 24 horas hábiles.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-surface border border-white/5 rounded-lg p-6 space-y-5">
      {formData.product && (
        <p className="text-sm text-text-secondary bg-brand-green/10 border border-brand-green/20 rounded-md px-4 py-2.5">
          Consulta sobre: <span className="text-text-primary font-semibold">{formData.product}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>Nombre completo *</label>
          <input
            id={`${id}-name`}
            type="text"
            required
            className={inputClass}
            placeholder="Tu nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>Email *</label>
          <input
            id={`${id}-email`}
            type="email"
            required
            className={inputClass}
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-whatsapp`} className={labelClass}>WhatsApp (opcional)</label>
          <input
            id={`${id}-whatsapp`}
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+240 ..."
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-company`} className={labelClass}>Empresa (opcional)</label>
          <input
            id={`${id}-company`}
            type="text"
            className={inputClass}
            placeholder="Nombre de tu empresa"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${id}-website`}>No rellenar este campo</label>
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
          <label htmlFor={`${id}-type`} className={labelClass}>Tipo de proyecto{formData.product ? '' : ' *'}</label>
          <select
            id={`${id}-type`}
            required={!formData.product}
            className={inputClass}
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          >
            <option value="">Seleccionar...</option>
            {projectTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-budget`} className={labelClass}>Presupuesto estimado *</label>
          <select
            id={`${id}-budget`}
            required
            className={inputClass}
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          >
            <option value="">Seleccionar...</option>
            {budgetRanges.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-description`} className={labelClass}>Descripción del proyecto *</label>
        <textarea
          id={`${id}-description`}
          required
          rows={5}
          className={inputClass}
          placeholder="Cuéntanos sobre tu proyecto: qué necesitas, plazos, detalles relevantes..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {error && (
        <p className="text-error text-sm bg-error/10 border border-error/20 rounded-md px-4 py-2.5">
          {error}{' '}
          <a
            href={waLink('Hola, quería contactar con BKLN pero el formulario me dio un error.')}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            Escribir por WhatsApp
          </a>
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={submitting}>
        {submitting ? 'Enviando...' : <><Send size={16} /> Enviar solicitud</>}
      </Button>
    </form>
  )
}

export function ContactForm({ products }: ContactFormProps) {
  return (
    <Suspense fallback={<div className="bg-bg-surface border border-white/5 rounded-lg p-6 h-96 animate-pulse" />}>
      <ContactFormInner products={products} />
    </Suspense>
  )
}
