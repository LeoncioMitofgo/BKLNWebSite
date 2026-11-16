import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { AnnouncementBanner } from '@/components/sections/AnnouncementBanner'
import { HeroWall } from '@/components/home/HeroWall'
import { OfflineDemo } from '@/components/home/OfflineDemo'
import { ServiceList } from '@/components/home/ServiceList'
import { company, contactEmail, waLink, whatsappDisplay } from '@/data/contact'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'
import { fmt } from '@/lib/utils'

function pick<T extends { slug: string }>(items: T[], slugs: string[]): T[] {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item))
}

const HOME_SERVICES = ['desarrollo-web', 'apps-moviles', 'sistemas-de-gestion', 'erp-odoo-sap', 'oficina-digital-microsoft-365', 'ia-y-automatizacion']

// Captura que aparece al pasar el ratón por cada servicio (trabajo real relacionado).
const SERVICE_IMAGES: Record<string, string> = {
  'desarrollo-web': '/marketplace-buscar.jpg',
  'apps-moviles': '/pasa-1.jpg',
  'sistemas-de-gestion': '/pasa-crazy-december-2.jpg',
  'erp-odoo-sap': '/odoo-existencias.jpg',
  'ia-y-automatizacion': '/brookai-cover.jpg',
}

// El título, la descripción, el canonical y los hreflang de la home vienen del layout.
export default async function HomePage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const h = t.home
  const { services, projects, posts } = getContent(lang)
  const works = pick(projects, ['pasa', 'bkln-marketplace', 'bkln-en-odoo'])
  const homeServices = pick(services, HOME_SERVICES)
  const guides = posts.filter((p) => p.category === 'guias').slice(0, 3)
  const href = (path: string) => localizePath(lang, path)

  return (
    <div>
      {/* Portada */}
      <section className="relative flex flex-col overflow-hidden pt-28 lg:min-h-screen lg:justify-center lg:pt-36 lg:pb-32">
        <HeroWall className="relative order-2 mt-10 -ml-[18%] h-[380px] w-[150%] [transform:perspective(1200px)_rotateX(26deg)_rotateZ(-8deg)] lg:absolute lg:inset-y-[-30%] lg:left-[44%] lg:right-[-22%] lg:mt-0 lg:ml-0 lg:h-auto lg:w-auto lg:[transform:perspective(1800px)_rotateX(22deg)_rotateY(-16deg)_rotateZ(10deg)]" />
        {/* Velo para que el texto se lea sobre la pared */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] hidden lg:block bg-[linear-gradient(90deg,var(--color-bg-dark)_0%,var(--color-bg-dark)_38%,rgba(6,16,11,0.55)_58%,rgba(6,16,11,0.15)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,var(--color-bg-dark)_0%,transparent_18%,transparent_78%,var(--color-bg-dark)_100%)] max-lg:bg-[linear-gradient(180deg,var(--color-bg-dark)_0%,var(--color-bg-dark)_55%,rgba(6,16,11,0.3)_75%,var(--color-bg-dark)_100%)]" />

        <div className="relative z-[2] order-1 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-8">
            <AnnouncementBanner lang={lang} />
          </div>
          <p className="mb-7 flex items-center gap-3 text-[15px] text-text-secondary">
            <span aria-hidden="true" className="h-px w-7 bg-accent-green" />
            {h.kicker}
          </p>
          <h1 className="mb-8 max-w-[10ch] font-display text-[clamp(52px,9.2vw,140px)] font-extrabold leading-[0.92] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="inline-block" style={{ animation: 'rise 1s var(--ease-out-soft) both' }}>
                {h.h1Line1}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="inline-block" style={{ animation: 'rise 1s 0.1s var(--ease-out-soft) both' }}>
                {h.h1Line2}{' '}
                <span className="relative whitespace-nowrap text-accent-green">
                  {h.h1Here}
                  <svg aria-hidden="true" viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute -bottom-[0.16em] left-[-2%] h-[0.3em] w-[104%] overflow-visible">
                    <path
                      className="draw-line"
                      d="M6 28 C 90 10, 210 8, 394 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray="420"
                      strokeDashoffset="420"
                      style={{ animation: 'draw 1s 0.8s var(--ease-out-soft) forwards' }}
                    />
                  </svg>
                </span>
              </span>
            </span>
          </h1>
          <p className="mb-10 max-w-[44ch] text-lg text-text-secondary sm:text-xl">
            {h.lead} <strong className="font-medium text-text-primary">{h.leadStrong}</strong>
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={href('/contacto')} size="lg">
              {h.ctaPrimary}
            </ButtonLink>
            <Link href="#trabajos" className="border-b-[1.5px] border-accent-green pb-1 font-semibold">
              {h.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative z-[2] order-3 mx-auto -mt-10 w-full max-w-7xl px-5 pb-12 sm:px-8 lg:absolute lg:inset-x-0 lg:bottom-9 lg:mt-0 lg:pb-0">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
            {h.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-accent-green" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trabajos */}
      <section id="trabajos" className="scroll-mt-20 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 lg:mb-20">
            <h2 className="font-display text-[clamp(44px,6vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal>
              {h.worksTitle}
            </h2>
            <p className="max-w-[38ch] text-text-secondary" data-reveal="1">
              {h.worksSubtitle}
            </p>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {works.map((project, i) => (
              <Link
                key={project.slug}
                href={href(`/portfolio/${project.slug}`)}
                className="group grid grid-cols-1 items-center gap-7 lg:grid-cols-12"
                data-reveal
              >
                <div className={`overflow-hidden rounded-[22px] border border-white/10 lg:col-span-8 ${i % 2 ? 'lg:col-start-5 lg:row-start-1' : ''}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.035]"
                  />
                </div>
                <div className={`lg:col-span-4 ${i % 2 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <p className="mb-3.5 text-sm text-text-secondary">
                    {project.sector} · {project.year}
                    {project.status ? ` · ${project.status}` : ''}
                  </p>
                  <h3 className="mb-4 font-display text-[clamp(30px,3vw,42px)] font-bold leading-[1.05] tracking-[-0.02em]">{project.title}</h3>
                  <p className="mb-6 text-text-secondary">{project.tagline ?? project.description}</p>
                  <span className="inline-flex items-center gap-2.5 font-semibold">
                    {h.worksSee}
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-20">
            <Link href={href('/portfolio')} className="border-b-[1.5px] border-accent-green pb-1 font-semibold">
              {h.worksAll}
            </Link>
          </p>
        </div>
      </section>

      {/* Demostración: quita la conexión */}
      <section className="border-y border-white/10 bg-bg-surface py-28 lg:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="mb-7 font-display text-[clamp(44px,6vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal>
              {h.demoTitle}
            </h2>
            <p className="mb-5 max-w-[44ch] text-lg text-text-secondary sm:text-xl" data-reveal="1">
              {h.demoText}
            </p>
            <p className="max-w-[44ch] text-text-secondary" data-reveal="2">
              {h.demoHint}
            </p>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:col-start-8" data-reveal="1">
            <OfflineDemo lang={lang} t={h} />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 lg:mb-20">
            <h2 className="font-display text-[clamp(44px,6vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal>
              {h.servicesTitle}
            </h2>
            <p className="max-w-[38ch] text-text-secondary" data-reveal="1">
              {h.servicesSubtitle}
            </p>
          </div>
          <ServiceList
            items={homeServices.map((s) => ({
              href: href(`/servicios/${s.slug}`),
              title: s.title,
              description: s.description,
              image: SERVICE_IMAGES[s.slug],
            }))}
          />
          <p className="mt-12">
            <Link href={href('/servicios')} className="border-b-[1.5px] border-accent-green pb-1 font-semibold">
              {fmt(h.servicesAll, { count: services.length })}
            </Link>
          </p>
        </div>
      </section>

      {/* Lectura */}
      <section className="bg-paper py-28 text-paper-ink lg:py-36">
        <div className="mx-auto max-w-[680px] px-5 sm:px-7">
          <p className="mb-5 text-[15px] text-paper-muted" data-reveal>
            {h.readEyebrow}
          </p>
          <h2 className="mb-10 font-display text-[clamp(38px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em]" data-reveal>
            {h.readTitle}
          </h2>
          <div className="font-read text-[21px] leading-[1.65] text-[#232823] sm:text-[22px]">
            <p className="mb-6 first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:font-display first-letter:text-[88px] first-letter:font-extrabold first-letter:leading-[0.82] first-letter:text-paper-green" data-reveal>
              {h.readP1}
            </p>
            <p className="mb-6" data-reveal>
              {h.readP2}
            </p>
            <p className="mb-6" data-reveal>
              {h.readP3}
            </p>
            <p className="text-[19px] italic text-paper-muted" data-reveal>
              {h.readSign}
            </p>
          </div>
          <p className="mt-8" data-reveal>
            <Link href={href('/nosotros')} className="border-b-[1.5px] border-paper-green pb-1 font-semibold">
              {h.readMore}
            </Link>
          </p>

          <div className="mt-24">
            <h2 className="mb-2 text-sm font-semibold tracking-[0.06em] text-paper-muted">{h.guidesTitle.toUpperCase()}</h2>
            <ul>
              {guides.map((post) => (
                <li key={post.slug} className="border-b border-paper-line" data-reveal>
                  <Link href={href(`/blog/${post.slug}`)} className="group block py-6">
                    <span className="block font-read text-[25px] leading-[1.3] transition-colors group-hover:text-paper-green">{post.title}</span>
                    <span className="text-sm text-paper-muted">
                      {post.readTime} {t.common.readMinLong}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href={href('/blog')} className="border-b-[1.5px] border-paper-green pb-1 font-semibold">
                {h.guidesAll}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="mb-14 font-display text-[clamp(64px,15vw,230px)] font-extrabold leading-[0.85] tracking-[-0.05em]" data-reveal>
            {h.closeStart}
            <span className="text-accent-green">{h.closeEnd}</span>
          </p>
          <div className="mb-14" data-reveal="1">
            <ButtonLink href={href('/contacto')} size="lg">
              {h.ctaPrimary}
            </ButtonLink>
          </div>
          <dl className="grid grid-cols-1 gap-7 border-t border-white/10 pt-9 text-text-secondary sm:grid-cols-2 lg:grid-cols-4" data-reveal="2">
            <div>
              <dt className="mb-1 font-semibold text-text-primary">{h.contactWhatsapp}</dt>
              <dd>
                <a href={waLink(t.whatsapp.project)} target="_blank" rel="noopener noreferrer" className="hover:text-accent-green">
                  {whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 font-semibold text-text-primary">{h.contactEmail}</dt>
              <dd>
                <a href={`mailto:${contactEmail}`} className="hover:text-accent-green">
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 font-semibold text-text-primary">{h.contactOffice}</dt>
              <dd>
                {t.about.companyAddressValue} ·{' '}
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">
                  {h.contactHowToGet}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 font-semibold text-text-primary">{h.contactHours}</dt>
              {t.about.companyHoursValue.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}
