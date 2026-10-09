import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALE_COOKIE, defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { localizePath, resolvePath } from '@/i18n/routes'

const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|lighthouse/i

/** Idioma preferido del navegador entre los que ofrecemos (Accept-Language). */
function preferredLocale(header: string | null): Locale | null {
  if (!header) return null
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { lang: tag.split('-')[0].toLowerCase(), q: q ? Number(q) : 1 }
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q)
  const match = ranked.find((entry) => (locales as readonly string[]).includes(entry.lang))
  return match ? (match.lang as Locale) : null
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /es/... no es una dirección pública: el español va sin prefijo.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  // Portada sin idioma elegido: primera visita según el idioma del dispositivo (nunca a buscadores).
  if (pathname === '/' && !BOT_UA.test(request.headers.get('user-agent') ?? '')) {
    const chosen = request.cookies.get(LOCALE_COOKIE)?.value
    const target = chosen && hasLocale(chosen) ? chosen : preferredLocale(request.headers.get('accept-language'))
    if (target && target !== defaultLocale) {
      const url = request.nextUrl.clone()
      url.pathname = `/${target}`
      return NextResponse.redirect(url, 307)
    }
  }

  const resolved = resolvePath(pathname)
  const url = request.nextUrl.clone()
  if (!resolved) {
    // Sección inexistente en ese idioma: la ruta comodín de [lang] devuelve el 404 traducido.
    const lang = pathname.split('/')[1]
    url.pathname = `/${hasLocale(lang) ? lang : defaultLocale}/__404`
    return NextResponse.rewrite(url)
  }

  // Dirección no canónica (p. ej. slug en español dentro de /en): redirigir a la buena.
  const canonical = localizePath(resolved.lang, resolved.internalPath)
  if (canonical !== pathname) {
    url.pathname = canonical
    return NextResponse.redirect(url, 308)
  }

  url.pathname = `/${resolved.lang}${resolved.internalPath === '/' ? '' : resolved.internalPath}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Todo menos la API, los recursos de Next y los archivos con extensión (imágenes, sitemap, libros…).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
