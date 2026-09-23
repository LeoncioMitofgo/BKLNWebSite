import { ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ContactForm } from '@/components/sections/ContactForm'
import { services } from '@/data/content'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Desarrollo de apps, plataformas web, automatización, APIs e inteligencia artificial para convertir necesidades reales en software útil.',
}

const processSteps = [
  {
    number: '01',
    title: 'Entendemos el problema',
    description: 'Aterrizamos tus objetivos, usuarios, restricciones y lo que debe resolver el producto.',
  },
  {
    number: '02',
    title: 'Definimos el camino',
    description: 'Proponemos alcance, arquitectura, prioridades, plazos y presupuesto sin letra pequeña.',
  },
  {
    number: '03',
    title: 'Construimos por etapas',
    description: 'Desarrollamos, enseñamos avances y validamos cada parte importante contigo.',
  },
  {
    number: '04',
    title: 'Entregamos y acompañamos',
    description: 'Ponemos el producto en marcha, documentamos lo necesario y seguimos disponibles después.',
  },
]

export default function ServiciosPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Del problema al <span className="text-accent-green">producto</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Diseñamos y construimos software a medida para que una idea, un proceso manual o una
            oportunidad de negocio se convierta en una solución digital que puedas usar y hacer crecer.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-text-secondary">
            <span>Apps y plataformas</span>
            <span className="text-accent-green">•</span>
            <span>Automatización y datos</span>
            <span className="text-accent-green">•</span>
            <span>IA aplicada</span>
          </div>
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
            subtitle="Un proceso claro para tomar buenas decisiones antes, durante y después del desarrollo."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="bg-bg-dark border border-white/5 rounded-lg p-6 text-center h-full">
                  <div className="w-12 h-12 bg-brand-green/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent-green font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-brand-green">
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
            title="¿Qué necesitas construir?"
            subtitle="Cuéntanos el reto. Te responderemos con una primera orientación sobre alcance, tecnología y presupuesto en 24h hábiles."
            centered
          />
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
