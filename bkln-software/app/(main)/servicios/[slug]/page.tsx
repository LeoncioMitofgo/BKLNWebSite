import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/seed'

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver a servicios
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{service.title}</h1>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line text-lg">
                {service.longDescription}
              </p>
            </div>

            {/* Tecnologías */}
            <div>
              <h2 className="text-text-primary font-semibold mb-3">Tecnologías</h2>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            {/* Qué determina el precio */}
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <h2 className="text-text-primary font-semibold mb-4">¿Qué determina el precio?</h2>
              <p className="text-text-secondary text-sm mb-4">
                Cada proyecto es diferente — por eso trabajamos siempre con presupuesto personalizado.
                Estos son los factores principales que influyen en el coste:
              </p>
              <ul className="space-y-2.5">
                {service.pricingFactors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-text-secondary text-sm">
                    <span className="text-accent-blue mt-1 shrink-0">•</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>

            {/* Qué entregamos */}
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
              <h2 className="text-text-primary font-semibold mb-4">Qué incluye la entrega</h2>
              <ul className="space-y-2.5">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-text-secondary text-sm">
                    <CheckCircle size={15} className="text-success mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA */}
            <div className="bg-bg-surface border border-white/5 rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-4">
                <Clock size={14} />
                Plazo estimado: {service.timeline}
              </div>

              <p className="text-text-primary font-semibold mb-1">Presupuesto personalizado</p>
              <p className="text-text-secondary text-sm mb-5">
                Cuéntanos tu proyecto y te enviamos una propuesta detallada en menos de 24h.
              </p>

              <Link href={`/contacto?servicio=${service.slug}`}>
                <Button size="lg" className="w-full gap-2">
                  Solicitar presupuesto <ArrowRight size={16} />
                </Button>
              </Link>

              <p className="text-text-secondary text-xs text-center mt-3">
                Sin compromiso. Respuesta en 24h hábiles.
              </p>
            </div>

            {/* Otros servicios */}
            <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
              <h3 className="text-text-primary font-semibold mb-3 text-sm uppercase tracking-wide">
                Otros servicios
              </h3>
              <ul className="space-y-2">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .slice(0, 4)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="text-text-secondary hover:text-accent-blue transition-colors text-sm"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
