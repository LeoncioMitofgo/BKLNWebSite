import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { company, contactEmail, waLink, whatsappDisplay } from '@/data/contact'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'

const EXPLORE = ['servicios', 'portfolio', 'productos', 'blog', 'cursos', 'nosotros'] as const

const socialLinks = [
  { href: 'https://linkedin.com/company/bkln-software-systems', label: 'LinkedIn' },
  { href: 'https://github.com/LeoncioMitofgo', label: 'GitHub' },
  { href: 'https://twitter.com/bklnsoftware', label: 'X' },
]

interface FooterProps {
  lang: Locale
  t: Dictionary
}

export function Footer({ lang, t }: FooterProps) {
  const link = (section: string) => localizePath(lang, `/${section}`)
  const f = t.footer
  const a = t.about
  const heading = 'text-text-primary font-semibold text-sm mb-4'
  const muted = 'text-text-secondary hover:text-text-primary transition-colors'

  return (
    <footer className="border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] gap-10">
          <div>
            <Logo href={localizePath(lang, '/')} large />
            <p className="mt-5 text-text-secondary text-[15px] leading-relaxed max-w-xs">{f.tagline}</p>
          </div>

          <div>
            <h2 className={heading}>{f.explore}</h2>
            <ul className="space-y-2.5 text-[15px]">
              {EXPLORE.map((section) => (
                <li key={section}>
                  <Link href={link(section)} className={muted}>
                    {t.nav[section]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>{f.talk}</h2>
            <ul className="space-y-2.5 text-[15px] text-text-secondary">
              <li>
                <a href={waLink(t.whatsapp.general)} target="_blank" rel="noopener noreferrer" className={muted}>
                  WhatsApp {whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className={muted}>
                  {contactEmail}
                </a>
              </li>
              <li>
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className={muted}>
                  {a.companyAddressValue}
                </a>
              </li>
              {a.companyHoursValue.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>{f.info}</h2>
            <ul className="space-y-2.5 text-[15px]">
              {(['contacto', 'privacidad', 'terminos'] as const).map((section) => (
                <li key={section}>
                  <Link href={link(section)} className={muted}>
                    {t.nav[section]}
                  </Link>
                </li>
              ))}
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={muted}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* La marca, enorme y en hueco, cortada por abajo */}
      <div
        aria-hidden="true"
        className="mt-14 select-none whitespace-nowrap font-display font-extrabold leading-[0.78] tracking-[-0.06em] text-transparent text-[31vw] -ml-[1vw] -mb-[4vw] [-webkit-text-stroke:1px_rgba(238,243,239,0.14)]"
      >
        BKLN
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between gap-2 text-sm text-text-secondary">
          <p>
            © {new Date().getFullYear()} {company.brandName} · {company.legalName}
          </p>
          <p>{f.rights}</p>
        </div>
      </div>
    </footer>
  )
}
