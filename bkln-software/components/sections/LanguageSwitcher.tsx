'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALE_COOKIE, localeInfo, locales, type Locale } from '@/i18n/config'
import { alternatePaths, routeFromPathname } from '@/i18n/routes'
import { cn } from '@/lib/utils'

// Fuera del componente: la regla react-hooks/immutability no deja escribir en document desde él.
function rememberLocale(target: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`
}

interface LanguageSwitcherProps {
  lang: Locale
  label: string
  onNavigate?: () => void
}

/** ES · EN · FR: lleva a la misma página en el otro idioma y recuerda la elección. */
export function LanguageSwitcher({ lang, label, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const internalPath = routeFromPathname(pathname)?.internalPath ?? '/'
  const targets = alternatePaths(internalPath)

  function remember(target: Locale) {
    rememberLocale(target)
    onNavigate?.()
  }

  return (
    <nav aria-label={label} className="flex items-center gap-1 text-xs font-semibold">
      {locales.map((target, i) => (
        <span key={target} className="flex items-center gap-1">
          {i > 0 && <span className="text-text-secondary/50" aria-hidden="true">·</span>}
          <Link
            href={targets[target]}
            hrefLang={target}
            lang={target}
            title={localeInfo[target].name}
            aria-current={target === lang ? 'true' : undefined}
            onClick={() => remember(target)}
            className={cn(
              'px-1 py-1 rounded transition-colors',
              target === lang ? 'text-accent-green' : 'text-text-primary/60 hover:text-white'
            )}
          >
            {localeInfo[target].short}
          </Link>
        </span>
      ))}
    </nav>
  )
}
