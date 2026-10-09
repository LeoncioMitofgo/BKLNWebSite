import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, CheckCircle, MessageSquare, Rocket, Search, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProductCard } from '@/components/sections/ProductCard'
import { BlogCard } from '@/components/sections/BlogCard'
import { AnnouncementBanner } from '@/components/sections/AnnouncementBanner'
import { waLink } from '@/data/contact'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'
import { fmt } from '@/lib/utils'

const processIcons = [<Search key="search" size={22} />, <Code2 key="code" size={22} />, <CheckCircle key="check" size={22} />, <Rocket key="rocket" size={22} />]

function pick<T extends { slug: string }>(items: T[], slugs: string[]): T[] {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item))
}

// El título, la descripción, el canonical y los hreflang de la home vienen del layout.
export default async function HomePage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const h = t.home
  const { services, projects, products, posts } = getContent(lang)
  const featuredServices = services.filter((s) => s.featured)
  const featuredProjects = pick(projects, ['sistema-pos-android-comercios', 'gestescolar', 'brookai'])
  const featuredProducts = pick(products, ['gestescolar', 'brookai', 'zentry'])
  const latestPosts = posts.slice(0, 3)
  const href = (path: string) => localizePath(lang, path)

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
            <AnnouncementBanner lang={lang} />
            <p className="text-text-secondary text-sm">{h.availability}</p>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">{h.h1}</h1>
          <p className="text-text-primary text-xl sm:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed font-semibold">{h.lead}</p>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{h.sublead}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={href('/contacto')}>
              <Button size="lg">
                {t.common.requestProposal} <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href={href('/portfolio')}>
              <Button variant="outline" size="lg">
                {t.common.seeProjects}
              </Button>
            </Link>
          </div>
          <a
            href={waLink(t.whatsapp.project)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-text-secondary hover:text-accent-green transition-colors"
          >
            <WhatsAppIcon size={16} /> {t.common.whatsappPrefer}
          </a>
        </div>
      </section>

      {/* Cifras */}
      <section className="py-10 border-y border-white/5 bg-bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat) => (
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
          <SectionHeader title={h.servicesTitle} subtitle={h.servicesSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={href('/servicios')}>
              <Button variant="outline">
                {fmt(h.servicesAll, { count: services.length })} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={h.projectsTitle} subtitle={h.projectsSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={href('/portfolio')}>
              <Button variant="outline">
                {h.projectsAll} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={h.productsTitle} subtitle={h.productsSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={href('/productos')}>
              <Button variant="outline">
                {h.productsAll} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={h.processTitle} subtitle={h.processSubtitle} centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.map((step, i) => (
              <div key={step.step} className="relative">
                {i < t.process.length - 1 && (
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
            <Link href={href('/contacto')}>
              <Button size="lg">
                {h.processCta} <ArrowRight size={18} />
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
                {h.aboutEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6 leading-tight">{h.aboutTitle}</h2>
              <p className="text-text-secondary leading-relaxed mb-4">{h.aboutP1}</p>
              <p className="text-text-secondary leading-relaxed mb-8">{h.aboutP2}</p>
              <Link href={href('/nosotros')}>
                <Button variant="outline">
                  {h.aboutCta} <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.whyUs.map((item) => (
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
          <SectionHeader title={h.guidesTitle} subtitle={h.guidesSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} lang={lang} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={href('/blog')}>
              <Button variant="outline">
                {h.guidesAll} <ArrowRight size={16} />
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
            <h2 className="text-xl font-bold text-text-primary mb-1">{h.coursesTitle}</h2>
            <p className="text-text-secondary text-sm leading-relaxed">{h.coursesText}</p>
          </div>
          <Link href={href('/cursos')} className="shrink-0">
            <Button variant="outline">
              {h.coursesCta} <ArrowRight size={16} />
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
          <h2 className="text-3xl font-bold text-text-primary mb-4">{h.finalTitle}</h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">{h.finalText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={href('/contacto')}>
              <Button size="lg">
                {t.common.requestProposal} <ArrowRight size={18} />
              </Button>
            </Link>
            <a href={waLink(t.whatsapp.project)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <WhatsAppIcon size={18} /> {t.common.whatsappWrite}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
