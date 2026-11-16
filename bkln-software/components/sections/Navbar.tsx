'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/sections/LanguageSwitcher'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizePath, routeFromPathname } from '@/i18n/routes'

// Cursos sale del menú principal (otro público): está en el pie.
const NAV_SECTIONS = ['servicios', 'portfolio', 'productos', 'blog', 'nosotros'] as const

interface NavbarProps {
  lang: Locale
  t: Dictionary['nav']
}

export function Navbar({ lang, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const links = NAV_SECTIONS.map((section) => ({ section, label: t[section], href: localizePath(lang, `/${section}`) }))
  const contactHref = localizePath(lang, '/contacto')
  // Se compara la ruta interna: al prerenderizar, pathname es la reescrita ('/es/servicios').
  const internalPath = routeFromPathname(pathname)?.internalPath ?? '/'
  const isActive = (section: string) => internalPath === `/${section}` || internalPath.startsWith(`/${section}/`)
  // Páginas que empiezan sobre papel claro: la cabecera va oscura desde el principio.
  const paperTop = /^\/(blog|privacidad|terminos)(\/|$)/.test(internalPath)
  const solid = scrolled || paperTop

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-500',
        // Sin desenfoque con el menú abierto: backdrop-filter encerraría el panel fijo dentro de la cabecera.
        isOpen ? 'bg-bg-dark border-white/10' : solid ? 'bg-bg-dark/90 backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[72px] gap-6">
          <Logo href={localizePath(lang, '/')} onClick={() => setIsOpen(false)} />

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.section) ? 'page' : undefined}
                className={cn(
                  'text-[15px] transition-colors duration-200',
                  isActive(link.section) ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher lang={lang} label={t.language} />
            </div>
            <div className="hidden sm:block">
              <ButtonLink href={contactHref} size="sm">
                {t.cta}
              </ButtonLink>
            </div>
            <button
              type="button"
              className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-text-primary hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t.toggleMenu}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú del móvil a pantalla completa */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-bg-dark overflow-y-auto">
          <nav className="px-5 pt-8 pb-10 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.section) ? 'page' : undefined}
                className={cn(
                  'font-display font-extrabold text-[40px] leading-[1.15] tracking-[-0.03em] py-1.5',
                  isActive(link.section) ? 'text-accent-green' : 'text-text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href={localizePath(lang, '/cursos')} onClick={() => setIsOpen(false)} className="mt-4 text-lg text-text-secondary">
              {t.cursos}
            </Link>
            <div className="mt-8">
              <ButtonLink href={contactHref} size="lg" className="w-full" onClick={() => setIsOpen(false)}>
                {t.cta}
              </ButtonLink>
            </div>
            <div className="mt-8 sm:hidden">
              <LanguageSwitcher lang={lang} label={t.language} onNavigate={() => setIsOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
