import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe, CheckCircle, MessageSquare, Rocket, Search, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TypewriterText } from '@/components/ui/TypewriterText'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { CourseCard } from '@/components/sections/CourseCard'
import { ProductCard } from '@/components/sections/ProductCard'
import { BlogCard } from '@/components/sections/BlogCard'
import { TechStack } from '@/components/sections/TechStack'
import { services, courses, products, blogPosts } from '@/data/content'

const stats = [
  { value: 'Malabo', label: 'Sede central' },
  { value: '10+', label: 'Proyectos entregados' },
  { value: 'ES · EN · FR', label: 'Idiomas' },
  { value: '24/7', label: 'Soporte' },
]

const processSteps = [
  {
    icon: <Search size={22} />,
    step: '01',
    title: 'Consulta',
    description: 'Analizamos tus necesidades y definimos el alcance del proyecto juntos.',
  },
  {
    icon: <Code2 size={22} />,
    step: '02',
    title: 'Desarrollo',
    description: 'Construimos tu solución con actualizaciones periódicas y feedback continuo.',
  },
  {
    icon: <CheckCircle size={22} />,
    step: '03',
    title: 'Revisión',
    description: 'Pruebas exhaustivas y ajustes hasta que el producto esté perfecto.',
  },
  {
    icon: <Rocket size={22} />,
    step: '04',
    title: 'Entrega',
    description: 'Deploy, documentación y soporte post-lanzamiento incluidos.',
  },
]

const whyUs = [
  { title: 'Contexto local', description: 'Conocemos el mercado de Guinea Ecuatorial: XAF, infraestructura, idiomas. No hay que explicarnos nada.' },
  { title: 'Full-stack', description: 'Android, Web, Desktop, Python, IA — un solo equipo para todo, sin subcontratar.' },
  { title: 'Estándares internacionales', description: 'El código que entregamos aquí es el mismo que entregaríamos en cualquier otro país. Un solo nivel.' },
  { title: 'El código es tuyo', description: 'Sin dependencias innecesarias, sin vendor lock-in. Documentación clara desde el primer día.' },
]

export default function HomePage() {
  const featuredServices = services.filter((s) => s.featured)
  const latestPosts = blogPosts.slice(0, 3)
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-bg-dark/80 to-bg-dark" />
        </div>
        <div className="absolute inset-0 opacity-10 hero-grid-overlay" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-green/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 text-accent-green text-sm px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Malabo, Guinea Ecuatorial · Disponibles para nuevos proyectos
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
            Code.{' '}
            <span className="text-accent-green">Create.</span>
            <br />
            Educate.
          </h1>
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
            <TypewriterText
              text="Software a medida desde Guinea Ecuatorial — para negocios de aquí y para el mundo. Apps Android, desarrollo web, automatización e IA."
              delay={600}
              tag="p"
            />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/servicios">
              <Button size="lg">
                Ver servicios <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                Ver portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Quiénes somos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-green text-sm font-medium uppercase tracking-wider mb-3 block">
                Quiénes somos
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6 leading-tight">
                Un estudio de software con sede en Malabo
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                BKLN Software & Systems es un estudio de software fundado en Malabo. Hacemos aplicaciones,
                plataformas web, automatización e integraciones con IA — para clientes de aquí y de fuera.
                Sin rodeos.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Además formamos a la próxima generación de desarrolladores con cursos prácticos y recursos
                técnicos en español.
              </p>
              <Link href="/portfolio">
                <Button variant="outline">
                  Ver nuestro trabajo <ArrowRight size={16} />
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

      {/* Servicios destacados */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Servicios"
            subtitle="Soluciones de software a medida para cada necesidad — desde apps móviles hasta sistemas con inteligencia artificial."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/servicios">
              <Button variant="outline">
                Ver todos los servicios <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Cómo trabajamos"
            subtitle="Un proceso simple y transparente, de la idea al producto terminado."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-brand-green/20 z-0" />
                )}
                <div className="bg-bg-surface border border-white/5 rounded-lg p-6 relative z-10 hover:border-brand-green/30 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-brand-green/20 flex items-center justify-center text-accent-green">
                      {step.icon}
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
                Iniciar proyecto <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Productos digitales"
            subtitle="Apps, herramientas y templates listos para usar — algunos gratis, todos de calidad."
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

      {/* Marketplace spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-brand-green/20 to-bg-surface border border-brand-green/20 rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-brand-green/20 text-accent-green text-xs px-3 py-1.5 rounded-full mb-4 font-medium">
                <Globe size={12} />
                Marketplace propio
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                BKLN Marketplace
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg leading-relaxed">
                Plataforma C2C para África Central con mensajería en tiempo real, sistema de suscripciones,
                autenticación multi-método y panel de administración — 18 páginas construidas desde cero
                en JavaScript puro, sin frameworks.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://bklnmarketplace.com" target="_blank" rel="noopener noreferrer">
                  <Button>
                    Visitar marketplace <ArrowRight size={16} />
                  </Button>
                </a>
                <Link href="/portfolio/bkln-marketplace">
                  <Button variant="outline">Ver caso de estudio</Button>
                </Link>
              </div>
            </div>
            <div className="w-44 h-44 shrink-0 flex items-center justify-center">
              <Image
                src="/mktlogo.png"
                alt="BKLN Marketplace"
                width={176}
                height={176}
                className="object-contain"
                style={{ height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MiEmpleo spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-brand-blue/20 to-bg-surface border border-brand-blue/20 rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-48 h-24 shrink-0 flex items-center justify-center">
              <Image
                src="/miempleo-logo.png"
                alt="MiEmpleo GE"
                width={192}
                height={96}
                className="rounded-lg bg-transparent px-3 py-2 object-contain"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-accent-blue text-xs px-3 py-1.5 rounded-full mb-4 font-medium">
                <Globe size={12} />
                Portal de empleo · Guinea Ecuatorial
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                MiEmpleo GE
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg leading-relaxed">
                La plataforma de empleo digital para Guinea Ecuatorial — vacantes, perfiles profesionales,
                mensajería en tiempo real, panel de empresa y suscripciones premium. Disponible como
                solución white-label para otros mercados.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://miempleo.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button>
                    Visitar plataforma <ArrowRight size={16} />
                  </Button>
                </a>
                <Link href="/portfolio/miempleo">
                  <Button variant="outline">Ver caso de estudio</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Cursos"
            subtitle="Aprende las tecnologías más demandadas con cursos prácticos en español."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/cursos">
              <Button variant="outline">
                Ver todos los cursos <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stack tecnológico */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Stack tecnológico"
            subtitle="Trabajamos con las herramientas más modernas y demandadas del mercado."
            centered
          />
          <TechStack />
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Blog técnico"
            subtitle="Artículos, guías y tutoriales escritos por el equipo de BKLN."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline">
                Ver todos los artículos <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA worldwide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-xl bg-brand-green/20 border border-brand-green/20 flex items-center justify-center mx-auto mb-6">
            <MessageSquare size={24} className="text-accent-green" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            Ya seas una empresa en Malabo, una PYME en Bata o un proyecto desde cualquier parte del
            mundo — si tienes un problema real, tenemos las herramientas para resolverlo. Trabajamos
            en español, inglés y francés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg">
                Iniciar proyecto <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                Ver portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
