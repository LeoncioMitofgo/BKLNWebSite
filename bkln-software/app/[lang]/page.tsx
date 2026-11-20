import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { HeroWall } from '@/components/home/HeroWall'
import { ServiceList } from '@/components/home/ServiceList'
import { PosIllustration } from '@/components/home/PosIllustration'
import { LegalCaseCard } from '@/components/home/LegalCaseCard'
import { company, contactEmail, waLink, whatsappDisplay } from '@/data/contact'
import { serviceImages } from '@/data/service-images'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'
import { cn } from '@/lib/utils'

// Cuatro trabajos de sectores distintos: eventos, comercio, despachos de abogados y educación.
const CASES = [
  { key: 'pasa', path: '/portfolio/pasa', visual: 'image', image: '/pasa-crazy-december-cover.jpg' },
  { key: 'wallblue', path: '/portfolio/sistema-pos-android-comercios', visual: 'pos' },
  { key: 'despacho', path: '/portfolio/gestion-despacho-abogados', visual: 'legal' },
  { key: 'gestescolar', path: '/productos/gestescolar', visual: 'image', image: '/gestescolar-panel.jpg', demo: true, top: true },
] as const

const HOME_SERVICES = ['desarrollo-web', 'apps-moviles', 'sistemas-de-gestion', 'erp-odoo-sap', 'ia-y-automatizacion', 'consultoria-y-formacion'] as const

// Guías para cualquier organización, no solo para negocios.
const HOME_GUIDES = ['cuanto-cuesta-web-app-guinea-ecuatorial', 'digitalizar-gestion-colegio-guinea-ecuatorial', 'odoo-sap-o-excel-erp-guinea-ecuatorial']

const sectionTitle = 'font-display text-[clamp(44px,6vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em]'
const quietLink = 'border-b-[1.5px] border-white/25 pb-1 font-semibold transition-colors hover:border-text-primary'
const paperLink = 'border-b-[1.5px] border-paper-line pb-1 font-semibold transition-colors hover:border-paper-ink'
const tag = 'absolute right-2.5 top-2.5 z-[2] rounded-full bg-paper/95 px-2 py-1 text-[10px] font-semibold tracking-[0.02em] text-bg-surface sm:right-3.5 sm:top-3.5 sm:px-2.5 sm:py-1.5 sm:text-xs'

// El título, la descripción, el canonical y los hreflang de la home vienen del layout.
export default async function HomePage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const h = t.home
  const { posts } = getContent(lang)
  const guides = HOME_GUIDES.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined)
  const href = (path: string) => localizePath(lang, path)

  return (
    <div>
      {/* Portada: un titular, una frase y una acción */}
      <section className="relative flex flex-col overflow-hidden pt-28 lg:min-h-screen lg:justify-center lg:pt-36 lg:pb-32">
        <HeroWall className="relative order-2 mt-10 -ml-[18%] h-[380px] w-[150%] opacity-85 [transform:perspective(1200px)_rotateX(26deg)_rotateZ(-8deg)] lg:absolute lg:inset-y-[-30%] lg:left-[44%] lg:right-[-22%] lg:mt-0 lg:ml-0 lg:h-auto lg:w-auto lg:[transform:perspective(1800px)_rotateX(22deg)_rotateY(-16deg)_rotateZ(10deg)]" />
        {/* Velo para que el texto se lea sobre la pared */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] hidden lg:block bg-[linear-gradient(90deg,var(--color-bg-dark)_0%,var(--color-bg-dark)_40%,rgba(6,16,11,0.62)_60%,rgba(6,16,11,0.2)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,var(--color-bg-dark)_0%,transparent_18%,transparent_78%,var(--color-bg-dark)_100%)] max-lg:bg-[linear-gradient(180deg,var(--color-bg-dark)_0%,var(--color-bg-dark)_55%,rgba(6,16,11,0.3)_75%,var(--color-bg-dark)_100%)]" />

        <div className="relative z-[2] order-1 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="mb-7 flex items-center gap-3 text-[15px] text-text-secondary">
            <span aria-hidden="true" className="h-px w-7 bg-text-secondary" />
            {h.kicker}
          </p>
          <h1
            className="mb-8 max-w-[11ch] font-display text-[clamp(48px,7.4vw,116px)] font-extrabold leading-[0.95] tracking-[-0.035em]"
            style={{ animation: 'fade-rise 1s var(--ease-out-soft) both' }}
          >
            {h.h1Start}{' '}
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
                  style={{ animation: 'draw 1s 0.6s var(--ease-out-soft) forwards' }}
                />
              </svg>
            </span>
          </h1>
          <p className="mb-10 max-w-[46ch] text-lg text-text-secondary sm:text-xl">
            {h.lead} <strong className="font-medium text-text-primary">{h.leadStrong}</strong>
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={href('/contacto')} size="lg">
              {h.ctaPrimary}
            </ButtonLink>
            <Link href="#trabajos" className={quietLink}>
              {h.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative z-[2] order-3 mx-auto -mt-10 w-full max-w-7xl px-5 pb-12 sm:px-8 lg:absolute lg:inset-x-0 lg:bottom-9 lg:mt-0 lg:pb-0">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
            {h.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-text-secondary" />
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
            <h2 className={sectionTitle} data-reveal>
              {h.worksTitle}
            </h2>
            <p className="max-w-[38ch] text-text-secondary" data-reveal="1">
              {h.worksSubtitle}
            </p>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {CASES.map((item, i) => {
              const c = h.cases[item.key]
              const flip = i % 2 === 1
              return (
                <Link key={item.key} href={href(item.path)} className="group grid grid-cols-1 items-center gap-7 lg:grid-cols-12" data-reveal>
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-[22px] border border-white/10 lg:col-span-8',
                      // La tarjeta del despacho es texto: en móvil crece con su contenido en vez de cortarse.
                      item.visual === 'legal' ? 'lg:aspect-[16/9]' : 'aspect-[16/9]',
                      flip && 'lg:col-start-5 lg:row-start-1'
                    )}
                    {...(item.visual === 'image' ? {} : { role: 'img', 'aria-label': c.alt })}
                  >
                    {item.visual === 'image' && (
                      <Image
                        src={item.image}
                        alt={c.alt}
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        className={cn(
                          'object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.035]',
                          'top' in item && item.top && 'object-top'
                        )}
                      />
                    )}
                    {item.visual === 'pos' && <PosIllustration t={h.pos} />}
                    {item.visual === 'legal' && <LegalCaseCard t={h.legal} />}
                    {item.visual === 'pos' && <span className={tag}>{h.recreationTag}</span>}
                    {'demo' in item && item.demo && <span className={tag}>{h.demoTag}</span>}
                  </div>
                  <div className={cn('lg:col-span-4', flip && 'lg:col-start-1 lg:row-start-1')}>
                    <p className="mb-3.5 text-sm text-text-secondary">{c.meta}</p>
                    <h3 className="mb-4 font-display text-[clamp(30px,3vw,42px)] font-bold leading-[1.05] tracking-[-0.02em]">{c.title}</h3>
                    <p className="mb-6 text-text-secondary">{c.desc}</p>
                    <span className="inline-flex items-center gap-2.5 font-semibold">
                      {c.see}
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Con quién hemos trabajado y otros trabajos */}
          <div className="mt-24 grid grid-cols-1 items-baseline gap-x-7 gap-y-4 border-t border-white/10 pt-8 md:grid-cols-[200px_1fr]" data-reveal>
            <p className="text-[15px] text-text-secondary">{h.sectorsLabel}</p>
            <ul className="flex flex-wrap gap-2.5">
              {h.sectors.map((sector) => (
                <li key={sector} className="rounded-full border border-white/20 px-3.5 py-1.5 text-[15px]">
                  {sector}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 grid grid-cols-1 items-baseline gap-x-7 gap-y-3 border-t border-white/10 pt-7 md:grid-cols-[200px_1fr]" data-reveal>
            <p className="text-[15px] text-text-secondary">{h.alsoLabel}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2.5 text-text-secondary">
              {h.also.map((item) =>
                item.path ? (
                  <Link key={item.label} href={href(item.path)} className="border-b border-white/25 text-text-primary transition-colors hover:border-text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span key={item.label}>{item.label}</span>
                )
              )}
            </div>
          </div>
          <p className="mt-12">
            <Link href={href('/portfolio')} className={quietLink}>
              {h.worksAll}
            </Link>
          </p>
        </div>
      </section>

      {/* Servicios: lenguaje para cualquier organización */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 lg:mb-20">
            <h2 className={sectionTitle} data-reveal>
              {h.servicesTitle}
            </h2>
            <p className="max-w-[38ch] text-text-secondary" data-reveal="1">
              {h.servicesSubtitle}
            </p>
          </div>
          <ServiceList
            items={HOME_SERVICES.map((slug) => ({
              href: href(`/servicios/${slug}`),
              title: h.services[slug].title,
              description: h.services[slug].desc,
              image: slug === 'sistemas-de-gestion' ? '/gestescolar-panel.jpg' : serviceImages[slug],
            }))}
          />
          <p className="mt-12">
            <Link href={href('/servicios')} className={quietLink}>
              {h.servicesAll}
            </Link>
          </p>
        </div>
      </section>

      {/* Papel: la carta, firmada; la ficha con foto está en Nosotros */}
      <section className="bg-paper py-28 text-paper-ink lg:py-36">
        <div className="mx-auto max-w-[680px] px-5 sm:px-7">
          <p className="mb-5 text-[15px] text-paper-muted" data-reveal>
            {h.readEyebrow}
          </p>
          <h2 className="mb-10 font-display text-[clamp(38px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em]" data-reveal>
            {h.readTitle}
          </h2>
          <div className="font-read text-[21px] leading-[1.65] text-[#232823] sm:text-[22px]">
            <p className="mb-6 first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:font-display first-letter:text-[88px] first-letter:font-extrabold first-letter:leading-[0.82] first-letter:text-paper-ink" data-reveal>
              {h.readP1}
            </p>
            <p className="mb-6" data-reveal>
              {h.readP2}
            </p>
            <p className="mb-6" data-reveal>
              {h.readP3}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-paper-line pt-6" data-reveal>
            <span className="font-read text-[19px] italic text-paper-muted">{h.readSign}</span>
            <Link href={`${href('/nosotros')}#fundador`} className={cn(paperLink, 'text-[15px]')}>
              {h.readMore} →
            </Link>
          </div>

          <div className="mt-24">
            <h2 className="mb-2 text-sm font-semibold tracking-[0.06em] text-paper-muted">{h.guidesTitle.toUpperCase()}</h2>
            <ul>
              {guides.map((post) => (
                <li key={post.slug} className="border-b border-paper-line" data-reveal>
                  <Link href={href(`/blog/${post.slug}`)} className="group block py-6">
                    <span className="block font-read text-[25px] leading-[1.3] decoration-1 underline-offset-4 group-hover:underline">{post.title}</span>
                    <span className="text-sm text-paper-muted">
                      {post.readTime} {t.common.readMinLong}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href={href('/blog')} className={paperLink}>
                {h.guidesAll}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="mb-14 font-display text-[clamp(64px,12vw,180px)] font-extrabold leading-[0.88] tracking-[-0.045em]" data-reveal>
            {h.closeTitle}
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
                <a href={waLink(t.whatsapp.project)} target="_blank" rel="noopener noreferrer" className="border-b border-white/25 hover:text-text-primary">
                  {whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 font-semibold text-text-primary">{h.contactEmail}</dt>
              <dd>
                <a href={`mailto:${contactEmail}`} className="border-b border-white/25 hover:text-text-primary">
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 font-semibold text-text-primary">{h.contactOffice}</dt>
              <dd>
                {t.about.companyAddressValue} ·{' '}
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="border-b border-white/25 hover:text-text-primary">
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
