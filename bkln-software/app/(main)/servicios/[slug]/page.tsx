import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, ChevronDown, Code2 } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata, siteName, siteUrl } from '@/lib/metadata'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { ContactForm } from '@/components/sections/ContactForm'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProductCard } from '@/components/sections/ProductCard'
import { BlogCard } from '@/components/sections/BlogCard'
import { serviceIcons } from '@/components/sections/ServiceCard'
import { services, projects, products, visiblePosts } from '@/data/content'
import { waLink } from '@/data/contact'

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
  return pageMetadata({ title: service.title, description: service.description, path: `/servicios/${service.slug}` })
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const Icon = serviceIcons[service.icon] ?? Code2
  const relatedProjects = projects.filter((p) => service.relatedProjects.includes(p.slug))
  const relatedProducts = products.filter((p) => service.relatedProducts.includes(p.slug))
  const relatedGuides = visiblePosts
    .filter((p) => p.relatedService === service.slug || (p.relatedProduct && service.relatedProducts.includes(p.relatedProduct)))
    .slice(0, 3)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      url: `${siteUrl}/servicios/${service.slug}`,
      areaServed: ['Guinea Ecuatorial', 'África Central'],
      provider: { '@type': 'LocalBusiness', name: siteName, url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ]

  return (
    <div className="min-h-screen pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver a servicios
        </Link>

        {/* Cabecera */}
        <div className="mb-12">
          <div className="w-12 h-12 rounded-md bg-brand-green/15 border border-brand-green/20 flex items-center justify-center mb-5">
            <Icon size={22} className="text-accent-green" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{service.title}</h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-6 max-w-3xl">{service.description}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#presupuesto">
              <Button>Pedir presupuesto</Button>
            </a>
            <a
              href={waLink(`Hola, me interesa el servicio de ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <WhatsAppIcon /> Escribir por WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Introducción + para quién */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-14">
          <div className="lg:col-span-3">
            {service.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>
            ))}
          </div>
          <div className="lg:col-span-2 bg-bg-surface border border-white/5 rounded-lg p-6 h-fit">
            <h2 className="text-text-primary font-bold mb-4">Es para ti si…</h2>
            <ul className="space-y-3">
              {service.forWho.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle size={15} className="text-accent-green mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ejemplos */}
        <section className="mb-14">
          <SectionHeader title="Qué podemos construir" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.examples.map((ex) => (
              <div key={ex.title} className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <h3 className="text-text-primary font-semibold mb-1.5">{ex.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{ex.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Productos listos para adaptar */}
        {relatedProducts.length > 0 && (
          <section className="mb-14">
            <SectionHeader
              title="Productos listos para adaptar"
              subtitle="Partir de algo que ya funciona acorta plazos y abarata el proyecto."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Qué incluye / precio / plazo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
            <h2 className="text-text-primary font-bold mb-4">Qué incluye</h2>
            <ul className="space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle size={14} className="text-accent-green mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
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
                <p className="text-text-primary font-semibold text-sm">Plazo orientativo</p>
                <p className="text-text-secondary text-sm">{service.timeline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Proyectos relacionados */}
        {relatedProjects.length > 0 && (
          <section className="mb-14">
            <SectionHeader title="Proyectos relacionados" subtitle="Casos reales donde aplicamos este servicio." />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Guías relacionadas */}
        {relatedGuides.length > 0 && (
          <section className="mb-14">
            <SectionHeader title="Guías relacionadas" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedGuides.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Preguntas frecuentes */}
        {service.faqs.length > 0 && (
          <section className="mb-14">
            <SectionHeader title="Preguntas frecuentes" />
            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group bg-bg-surface border border-white/5 rounded-lg">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-text-primary font-medium">
                    {faq.question}
                    <ChevronDown size={18} className="text-accent-green shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Tecnologías */}
        <div className="mb-14">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-3">Tecnologías que usamos</p>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div id="presupuesto" className="border-t border-white/5 pt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-text-primary mb-2">¿Te interesa este servicio?</h2>
          <p className="text-text-secondary mb-3">Cuéntanos tu proyecto y te enviamos una propuesta en 24h.</p>
          <a
            href={waLink(`Hola, me interesa el servicio de ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-accent-green hover:underline"
          >
            <WhatsAppIcon /> ¿Prefieres WhatsApp? Escríbenos directamente
          </a>
          <ContactForm
            services={services.map(({ slug, title }) => ({ slug, title }))}
            defaultService={service.slug}
          />
        </div>
      </div>
    </div>
  )
}
