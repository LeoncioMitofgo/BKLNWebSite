import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/sections/ContactForm'
import { services } from '@/data/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return { title: service.title, description: service.description }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver a servicios
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{service.title}</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">{service.description}</p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-10">
          {service.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {/* Descripción larga */}
        <div className="mb-10">
          {service.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Qué incluye */}
          <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
            <h2 className="text-text-primary font-bold mb-4">Qué entregamos</h2>
            <ul className="space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle size={14} className="text-accent-green mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Factores de precio + timeline */}
          <div className="space-y-4">
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <h2 className="text-text-primary font-bold mb-4">Qué afecta al precio</h2>
              <ul className="space-y-2">
                {service.pricingFactors.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-accent-green mt-1 shrink-0">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-4 flex items-center gap-3">
              <Clock size={18} className="text-accent-green shrink-0" />
              <div>
                <p className="text-text-primary font-semibold text-sm">Tiempo estimado</p>
                <p className="text-text-secondary text-sm">{service.timeline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="border-t border-white/5 pt-10">
          <h2 className="text-2xl font-bold text-text-primary mb-2">¿Te interesa este servicio?</h2>
          <p className="text-text-secondary mb-8">Cuéntanos tu proyecto y te enviamos una propuesta en 24h.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
