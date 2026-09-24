import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe, CheckCircle, MessageSquare, Rocket, Search, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { CourseCard } from '@/components/sections/CourseCard'
import { ProductCard } from '@/components/sections/ProductCard'
import { BlogCard } from '@/components/sections/BlogCard'
import { TechStack } from '@/components/sections/TechStack'
import { AnnouncementBanner } from '@/components/sections/AnnouncementBanner'
import { services, courses, products, blogPosts } from '@/data/content'

const stats = [
  { value: 'Malabo', label: 'Sede central' },
  { value: '35+', label: 'Proyectos entregados' },
  { value: 'ES · EN · FR', label: 'Idiomas' },
  { value: '24/7', label: 'Soporte' },
]

const processSteps = [
  {
    icon: <Search size={22} />,
    step: '01',
    title: 'Entendemos el reto',
    description: 'Aterrizamos tu idea, tus objetivos y las restricciones reales del negocio antes de escribir código.',
  },
  {
    icon: <Code2 size={22} />,
    step: '02',
    title: 'Diseñamos la solución',
    description: 'Definimos alcance, arquitectura, prioridades y un plan de trabajo que puedas entender y validar.',
  },
  {
    icon: <CheckCircle size={22} />,
    step: '03',
    title: 'Construimos y validamos',
    description: 'Desarrollamos por etapas, enseñamos avances y probamos cada flujo antes de darlo por terminado.',
  },
  {
    icon: <Rocket size={22} />,
    step: '04',
    title: 'Lanzamos contigo',
    description: 'Entregamos el producto, la documentación y el soporte necesario para que puedas operarlo con confianza.',
  },
]

const whyUs = [
  { title: 'Entendemos el contexto', description: 'Diseñamos para conectividad variable, moneda local, dispositivos reales y las necesidades concretas de cada mercado.' },
  { title: 'Construimos de principio a fin', description: 'Producto, frontend, backend, móvil, datos e infraestructura bajo una misma dirección técnica.' },
  { title: 'Experiencia demostrable', description: 'Más de 35 proyectos entre plataformas, apps, sistemas de gestión, automatización e inteligencia artificial.' },
  { title: 'Tu producto, tu código', description: 'Entregamos soluciones documentadas y mantenibles, sin encerrarte en dependencias innecesarias ni decisiones opacas.' },
]

export default function HomePage() {
  const featuredServices = services.filter((s) => s.featured)
  const latestPosts = blogPosts.slice(0, 3)
  const featuredProductSlugs = ['brookai', 'zentry', 'gestescolar']
  const featuredProducts = featuredProductSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product))
  const featuredCourseSlugs = [
    'python-desde-cero',
    'ia-machine-learning-python',
    'flutter-supabase-aplicaciones-reales',
  ]
  const featuredCourses = featuredCourseSlugs
    .map((slug) => courses.find((course) => course.slug === slug))
    .filter((course): course is (typeof courses)[number] => Boolean(course))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-20"
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
            Custom Software Development in Malabo, Equatorial Guinea
          </h1>
          <p className="text-text-primary text-xl sm:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed font-semibold">
            We create mobile applications, web platforms, management systems, marketplaces, and artificial intelligence solutions for businesses, institutions, and entrepreneurs.
          </p>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            BKLN designs and develops custom digital products from Malabo for businesses in Equatorial Guinea, Central Africa, and international markets.
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
                Software Solutions for Businesses in Equatorial Guinea
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                BKLN Software & Systems develops digital solutions with the needs of businesses and institutions in Equatorial Guinea and Central Africa in mind. We design custom software for operations, business management, education, commerce, and digital services, with local and remote support from Malabo.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                From custom web platforms and mobile applications to management systems, marketplaces, and AI-powered assistants, we build products that are useful in real operational contexts and can evolve with the client over time.
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
            title="Software, App & Digital Platform Development"
            subtitle="Custom software, web platforms, mobile applications, business systems, marketplaces, and AI solutions for businesses, institutions, and entrepreneurs."
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
            title="How We Develop Your Software Project"
            subtitle="A structured process for discovery, design, development, validation, launch, and long-term support."
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
                Hablemos de tu proyecto <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Digital Products by BKLN"
            subtitle="Platforms and products designed to solve concrete business problems, support local operations, and grow with the client."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showPrice={false} />
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
                Producto propio · Próximo lanzamiento
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                BKLN Marketplace
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg leading-relaxed">
                Marketplace local para comprar, vender y conectar sin complicaciones. Incluye publicaciones
                con fotos, categorías, chat directo, perfiles de vendedores y planes de visibilidad para
                quienes quieren hacer crecer su negocio. La plataforma está lista para su lanzamiento oficial.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://bklnmarketplace.com" target="_blank" rel="noopener noreferrer">
                  <Button>
                    Explorar plataforma <ArrowRight size={16} />
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
                unoptimized
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
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image + fill no renderiza este logo de forma fiable, ver revisión */}
              <img
                src="/miempleo-logo.png"
                alt="MiEmpleo GE"
                className="rounded-lg bg-transparent px-3 py-2 object-contain w-full h-full"
              />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-accent-blue text-xs px-3 py-1.5 rounded-full mb-4 font-medium">
                <Globe size={12} />
                Producto propio · Próximo lanzamiento
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                MiEmpleo GE
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg leading-relaxed">
                Plataforma profesional para encontrar empleo, publicar vacantes y conectar talento en Guinea
                Ecuatorial. Reúne ofertas por sectores, perfiles profesionales, oportunidades formales e
                informales y espacios diferenciados para empresas y candidatos. Lista para su lanzamiento oficial.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://miempleo.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button>
                    Explorar plataforma <ArrowRight size={16} />
                  </Button>
                </a>
                <Link href="/portfolio/marketplace-empleo-servicios">
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
            subtitle="Aprende con materiales prácticos en español, creados desde los mismos proyectos que construimos para clientes reales."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
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
            subtitle="Elegimos la tecnología que mejor encaja con tu producto: rendimiento, coste, mantenimiento y capacidad de crecer sin complicaciones."
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
            subtitle="Decisiones, aprendizajes y soluciones que nacen de construir software real: desde automatización hasta datos, seguridad y productos digitales."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline">
                Explorar el blog técnico <ArrowRight size={16} />
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
            Contact BKLN Software & Systems
          </h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            Tell us what you want to build, what process needs improving, or where your business is stuck. We analyze the challenge, recommend the next step, and provide clear guidance on scope, technology, and budget. We work in Spanish, English, and French.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>
    </div>
  )
}
