import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { company, contactEmail, waLink, whatsappDisplay } from '@/data/contact'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'

const SERVICES = ['desarrollo-web', 'apps-moviles', 'sistemas-de-gestion', 'erp-odoo-sap', 'ia-y-automatizacion', 'consultoria-y-formacion'] as const
const COMPANY = ['portfolio', 'productos', 'nosotros', 'blog', 'cursos'] as const

const socialLinks = [
  { href: 'https://linkedin.com/company/bkln-software-systems', label: 'LinkedIn' },
  { href: 'https://github.com/LeoncioMitofgo', label: 'GitHub' },
]

interface FooterProps {
  lang: Locale
  t: Dictionary
}

// v3: pie de página normal, con columnas útiles (sin la marca gigante).
export function Footer({ lang, t }: FooterProps) {
  const link = (path: string) => localizePath(lang, path)
  const f = t.footer
  const heading = 'mb-[18px] mt-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary'
  const item = 'text-text-primary/80 transition-colors hover:text-text-primary'

  return (
    <footer className="border-t border-white/10 bg-bg-surface">
      <div className="mx-auto max-w-7xl px-5 pt-[72px] sm:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo href={link('/')} large />
            <p className="mt-[18px] max-w-[30ch] text-[15px] leading-relaxed text-text-secondary">{f.about}</p>
          </div>

          <div>
            <h2 className={heading}>{f.servicesTitle}</h2>
            <ul className="grid gap-[11px] text-[15px]">
              {SERVICES.map((slug) => (
                <li key={slug}>
                  <Link href={link(`/servicios/${slug}`)} className={item}>
                    {t.home.services[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>{f.companyTitle}</h2>
            <ul className="grid gap-[11px] text-[15px]">
              {COMPANY.map((section) => (
                <li key={section}>
                  <Link href={link(`/${section}`)} className={item}>
                    {t.nav[section]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h2 className={heading}>{f.contactTitle}</h2>
            <ul className="grid gap-[11px] text-[15px]">
              <li>
                <a href={waLink(t.whatsapp.general)} target="_blank" rel="noopener noreferrer" className={item}>
                  WhatsApp {whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className={item}>
                  {contactEmail}
                </a>
              </li>
              <li>
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className={item}>
                  {t.about.companyAddressValue}
                </a>
              </li>
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={item}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 py-7 text-sm text-text-secondary sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.brandName} · {company.legalName}
          </p>
          <p className="flex gap-5">
            <Link href={link('/privacidad')} className="transition-colors hover:text-text-primary">
              {t.nav.privacidad}
            </Link>
            <Link href={link('/terminos')} className="transition-colors hover:text-text-primary">
              {t.nav.terminos}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
