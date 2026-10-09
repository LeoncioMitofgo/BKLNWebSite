import Link from 'next/link'
import { ArrowRight, CheckCircle, Lock } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { TechStack } from '@/components/sections/TechStack'
import { stats, whyUs, localContext } from '@/data/about'
import { processSteps } from '@/data/process'
import { waLink } from '@/data/contact'

export const metadata: Metadata = pageMetadata({
  title: 'Nosotros',
  description:
    'BKLN Software & Systems es un estudio de desarrollo de software con sede en Malabo. Más de 35 proyectos para empresas, instituciones y emprendedores de Guinea Ecuatorial y África Central.',
  path: '/nosotros',
})

export default function NosotrosPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Software hecho en <span className="text-accent-green">Malabo</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Somos un estudio de desarrollo de software. Diseñamos y construimos webs, apps, sistemas de
            gestión y asistentes con inteligencia artificial para negocios, instituciones y emprendedores
            de Guinea Ecuatorial y África Central.
          </p>
        </div>
      </section>

      {/* Cifras */}
      <section className="py-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
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
          <SectionHeader title="Quiénes somos" />
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              BKLN Software & Systems nace en Malabo con una idea sencilla: que los negocios e
              instituciones de aquí tengan software pensado para cómo se trabaja aquí, no adaptado a
              medias desde otros mercados.
            </p>
            <p>
              Cubrimos el ciclo completo de un producto digital: entender el problema, diseñar la
              solución, desarrollar la web, la app o el sistema, ponerlo en marcha con tu equipo y
              mantenerlo después. Además de proyectos a medida, desarrollamos productos propios como
              GestEscolar o BrookAI, que ya se usan en Malabo, Accra (Ghana) y Madrid (España).
            </p>
            <p>
              También formamos: publicamos libros interactivos de programación e inteligencia
              artificial escritos desde los mismos proyectos que construimos. Code. Create. Educate.
            </p>
          </div>

          <div className="mt-8 flex items-start gap-3 bg-bg-surface border border-white/5 rounded-lg p-5">
            <Lock size={18} className="text-accent-green mt-0.5 shrink-0" />
            <p className="text-text-secondary text-sm leading-relaxed">
              <span className="text-text-primary font-semibold">Trabajo confidencial.</span> Una parte
              importante de nuestros más de 35 proyectos es para empresas e instituciones públicas que no
              podemos nombrar. Por eso en la web solo mostramos una selección.
            </p>
          </div>
        </div>
      </section>

      {/* Por qué nosotros */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Por qué trabajar con nosotros" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {whyUs.map((item) => (
              <div key={item.title} className="bg-bg-dark border border-white/5 rounded-lg p-5">
                <CheckCircle size={18} className="text-accent-green mb-3" />
                <h3 className="text-text-primary font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <h3 className="text-text-primary font-bold text-lg mb-4 text-center">Construimos para el mercado real</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {localContext.map((item) => (
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
          <SectionHeader title="Cómo trabajamos" />
          <ol className="space-y-4">
            {processSteps.map((step) => (
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
          <Link href="/servicios" className="inline-flex items-center gap-1.5 mt-6 text-sm text-accent-green hover:underline">
            Ver nuestros servicios <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Tecnología */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Con qué trabajamos"
            subtitle="Elegimos la tecnología que mejor encaja con cada proyecto: rendimiento, coste, mantenimiento y capacidad de crecer sin complicaciones."
            centered
          />
          <TechStack />
        </div>
      </section>

      {/* Llamada final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">¿Hablamos?</h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            Cuéntanos qué quieres construir o qué problema quieres resolver. Te respondemos en menos de
            24 horas hábiles, en español, inglés o francés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg">
                Solicitar propuesta <ArrowRight size={18} />
              </Button>
            </Link>
            <a
              href={waLink('Hola, vengo de la web de BKLN y quiero contaros un proyecto.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <WhatsAppIcon size={18} /> Escribir por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
