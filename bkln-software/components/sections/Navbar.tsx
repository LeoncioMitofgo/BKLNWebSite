'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/sections/LanguageSwitcher'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizePath, routeFromPathname } from '@/i18n/routes'

const NAV_SECTIONS = ['servicios', 'portfolio', 'productos', 'blog', 'cursos', 'nosotros'] as const

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo href={localizePath(lang, '/')} size="sm" className="mt-4 -ml-4 origin-left scale-[0.8]" />

          {/* Nav links desktop */}
          <nav className="hidden lg:flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-0.5 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent-green after:transition-all after:duration-200',
                  isActive(link.section)
                    ? 'text-white after:w-full'
                    : 'text-text-primary/75 after:w-0 hover:text-white hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Idioma + CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher lang={lang} label={t.language} />
            </div>
            <Link href={contactHref} className="hidden lg:block">
              <Button size="sm">{t.cta}</Button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-white/5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t.toggleMenu}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-bg-dark/98 backdrop-blur-md border-b border-white/5">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-3 py-2.5 rounded-md text-sm font-semibold transition-colors',
                  isActive(link.section)
                    ? 'text-accent-green bg-brand-green/10'
                    : 'text-text-primary/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 sm:hidden">
              <LanguageSwitcher lang={lang} label={t.language} onNavigate={() => setIsOpen(false)} />
            </div>
            <div className="pt-2">
              <Link href={contactHref} className="block" onClick={() => setIsOpen(false)}>
                <Button className="w-full" size="sm">
                  {t.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
