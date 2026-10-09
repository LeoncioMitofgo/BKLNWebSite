import { ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ContactForm } from '@/components/sections/ContactForm'
import { services } from '@/data/content'
import { processSteps } from '@/data/process'
import { waLink } from '@/data/contact'

export const metadata: Metadata = pageMetadata({
  title: 'Servicios',
  description:
    'Webs y tiendas online, apps móviles, sistemas de gestión, asistentes con IA, plataformas para medios, mantenimiento y consultoría para negocios e instituciones de Guinea Ecuatorial.',
  path: '/servicios',
})

const commitments = [
  'Presupuesto y alcance por escrito antes de empezar',
  'Trabajo por fases, con entregas que puedes probar',
  'El código a medida y tus datos son tuyos al completar el pago',
  'Formación para las personas que van a usarlo',
  '30 días de soporte después del lanzamiento',
  'Respuesta en menos de 24 horas hábiles',
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
            oportunidad de negocio se convierta en una herramienta que puedas usar y hacer crecer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <a href="#presupuesto">
              <Button>
                Contar mi proyecto <ArrowRight size={16} />
              </Button>
            </a>
            <a
              href={waLink('Hola, vengo de la web de BKLN y quiero contaros un proyecto.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <WhatsAppIcon /> Escribir por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="¿Qué necesitas?"
            subtitle="Elige lo que más se parece a tu caso. Si no lo tienes claro, cuéntanoslo y te orientamos."
          />
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
            title="Cómo trabajamos"
            subtitle="Un proceso claro para tomar buenas decisiones antes, durante y después del desarrollo."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="bg-bg-dark border border-white/5 rounded-lg p-6 text-center h-full">
                  <div className="w-12 h-12 bg-brand-green/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent-green font-bold">{step.step}</span>
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

      {/* Compromisos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Lo que te garantizamos" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((item) => (
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
          <SectionHeader
            title="¿Qué necesitas construir?"
            subtitle="Cuéntanos el reto. Te responderemos con una primera orientación sobre alcance, tecnología y presupuesto en 24h hábiles."
            centered
          />
          <ContactForm services={services.map(({ slug, title }) => ({ slug, title }))} />
        </div>
      </section>
    </div>
  )
}
