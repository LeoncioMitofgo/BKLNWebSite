import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ContactForm } from '@/components/sections/ContactForm'
import { services } from '@/data/seed'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Servicios de desarrollo de software: Android, Web, Desktop, Python, APIs, IA y consultoría técnica.',
}

const processSteps = [
  {
    number: '01',
    title: 'Consulta inicial',
    description: 'Conversamos sobre tu proyecto, objetivos y requerimientos técnicos.',
  },
  {
    number: '02',
    title: 'Propuesta detallada',
    description: 'Preparamos un plan técnico con alcance, plazos y presupuesto.',
  },
  {
    number: '03',
    title: 'Desarrollo ágil',
    description: 'Desarrollamos con sprints cortos, mostrándote el progreso continuamente.',
  },
  {
    number: '04',
    title: 'Entrega y soporte',
    description: 'Entregamos el producto final con documentación y soporte post-lanzamiento.',
  },
]

export default function ServiciosPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Servicios de <span className="text-accent-blue">Software</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Desarrollamos soluciones digitales a medida — desde apps móviles hasta sistemas con
            inteligencia artificial. Código limpio, entregas puntuales.
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Nuestro proceso"
            subtitle="Un flujo de trabajo transparente y orientado a resultados."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="bg-bg-dark border border-white/5 rounded-lg p-6 text-center h-full">
                  <div className="w-12 h-12 bg-brand-blue/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent-blue font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-brand-blue">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantías */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'Código limpio y bien documentado',
              'Entregas dentro del plazo acordado',
              'Soporte post-lanzamiento incluido',
              'Comunicación transparente en todo momento',
              'Testing y QA antes de entregar',
              'Posibilidad de mantenimiento continuo',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-success mt-0.5 shrink-0" />
                <span className="text-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Formulario */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="¿Listo para empezar?"
            subtitle="Cuéntanos sobre tu proyecto y te enviaremos una propuesta en 24h."
            centered
          />
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
