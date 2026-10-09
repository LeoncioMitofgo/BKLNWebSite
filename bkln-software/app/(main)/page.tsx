import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, CheckCircle, MessageSquare, Rocket, Search, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/data/contact'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProductCard } from '@/components/sections/ProductCard'
import { BlogCard } from '@/components/sections/BlogCard'
import { AnnouncementBanner } from '@/components/sections/AnnouncementBanner'
import { services, projects, products, visiblePosts } from '@/data/content'
import { processSteps } from '@/data/process'
import { stats, whyUs } from '@/data/about'

const processIcons = [<Search key="search" size={22} />, <Code2 key="code" size={22} />, <CheckCircle key="check" size={22} />, <Rocket key="rocket" size={22} />]

function pick<T extends { slug: string }>(items: T[], slugs: string[]): T[] {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item))
}

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const featuredServices = services.filter((s) => s.featured)
  const featuredProjects = pick(projects, ['sistema-pos-android-comercios', 'gestescolar', 'brookai'])
  const featuredProducts = pick(products, ['gestescolar', 'brookai', 'zentry'])
  const latestPosts = visiblePosts.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/50 via-bg-dark/75 to-bg-dark" />
        </div>
        <div className="absolute inset-0 opacity-10 hero-grid-overlay" />

        <div className="relative max-w-7xl mx-auto text-center w-full">
          <div className="flex flex-col items-center gap-3 mb-8">
            <AnnouncementBanner />
            <p className="text-text-secondary text-sm">Malabo, Guinea Ecuatorial · Disponibles para nuevos proyectos</p>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
            Desarrollo de software a medida en Malabo, Guinea Ecuatorial
          </h1>
          <p className="text-text-primary text-xl sm:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed font-semibold">
            Creamos webs, aplicaciones móviles, sistemas de gestión y asistentes con inteligencia artificial para negocios, instituciones y emprendedores.
          </p>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            BKLN diseña y desarrolla productos digitales a medida desde Malabo para empresas de Guinea Ecuatorial, África Central y mercados internacionales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contacto">
              <Button size="lg">
                Solicitar propuesta <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                Ver proyectos
              </Button>
            </Link>
          </div>
          <a
            href={waLink('Hola, vengo de la web de BKLN y quiero contaros un proyecto.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-text-secondary hover:text-accent-green transition-colors"
          >
            <WhatsAppIcon size={16} /> ¿Prefieres WhatsApp? Escríbenos directamente
          </a>
        </div>
      </section>

      {/* Cifras */}
      <section className="py-10 border-y border-white/5 bg-bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-accent-green">{stat.value}</p>
                <p className="text-text-secondary text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="¿Qué necesita tu negocio?"
            subtitle="Webs, apps, sistemas de gestión, asistentes con IA, mantenimiento y consultoría: software pensado para cómo se trabaja aquí."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/servicios">
              <Button variant="outline">
                Ver los {services.length} servicios <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Proyectos que ya funcionan"
            subtitle="Una muestra de lo que hemos construido. Parte de nuestro trabajo es para empresas e instituciones cuyos proyectos son confidenciales."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/portfolio">
              <Button variant="outline">
                Ver todos los proyectos <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Productos listos para adaptar"
            subtitle="Sistemas propios que ya funcionan: partir de ellos acorta plazos y abarata tu proyecto."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/productos">
              <Button variant="outline">
                Ver todos los productos <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Cómo trabajamos"
            subtitle="Un proceso claro para descubrir, diseñar, construir, validar, lanzar y acompañar tu producto a largo plazo."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-brand-green/20 z-0" />
                )}
                <div className="bg-bg-dark border border-white/5 rounded-lg p-6 relative z-10 hover:border-brand-green/30 transition-colors h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-brand-green/20 flex items-center justify-center text-accent-green">
                      {processIcons[i]}
                    </div>
                    <span className="text-brand-green/40 font-bold text-2xl">{step.step}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contacto">
              <Button size="lg">
                Hablemos de tu proyecto <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-green text-sm font-medium uppercase tracking-wider mb-3 block">
                Quiénes somos
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6 leading-tight">
                Software hecho en Malabo para negocios que trabajan aquí
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                BKLN Software & Systems diseña y construye software a medida y productos propios para empresas, instituciones y emprendedores de Guinea Ecuatorial y África Central, con soporte local y remoto desde Malabo.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Conocemos las condiciones reales del mercado: conexión irregular, pagos sin tarjeta, clientes que usan sobre todo el móvil y equipos que necesitan formación. Construimos pensando en eso desde el primer día.
              </p>
              <Link href="/nosotros">
                <Button variant="outline">
                  Conócenos <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map((item) => (
                <div
                  key={item.title}
                  className="bg-bg-surface border border-white/5 rounded-lg p-5 hover:border-brand-green/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-brand-green/20 flex items-center justify-center mb-3">
                    <CheckCircle size={16} className="text-accent-green" />
                  </div>
                  <h3 className="text-text-primary font-semibold mb-1 text-sm">{item.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guías */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Guías para decidir mejor"
            subtitle="Lo que conviene saber antes de encargar software, explicado sin tecnicismos."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline">
                Ver todas las guías <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cursos (bloque compacto: es otro público) */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-bg-surface border border-white/5 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-12 h-12 rounded-md bg-brand-green/15 border border-brand-green/20 flex items-center justify-center shrink-0">
            <BookOpen size={22} className="text-accent-green" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text-primary mb-1">También formamos</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Libros interactivos de Python, inteligencia artificial y Microsoft Azure, escritos desde los mismos proyectos que construimos para nuestros clientes.
            </p>
          </div>
          <Link href="/cursos" className="shrink-0">
            <Button variant="outline">
              Ver cursos <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Llamada final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-xl bg-brand-green/20 border border-brand-green/20 flex items-center justify-center mx-auto mb-6">
            <MessageSquare size={24} className="text-accent-green" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Contacta con BKLN Software & Systems
          </h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            Cuéntanos qué quieres construir, qué proceso necesitas mejorar o dónde se está atascando tu negocio. Analizamos el reto, proponemos el siguiente paso y te damos una orientación clara sobre alcance, tecnología y presupuesto. Trabajamos en español, inglés y francés.
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
