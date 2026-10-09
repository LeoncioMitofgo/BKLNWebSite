import type { Metadata } from 'next'
import { localeInfo, locales, type Locale } from '@/i18n/config'
import { alternatePaths, localizePath } from '@/i18n/routes'

export const siteName = 'BKLN Software & Systems'
export const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.bklnsoftware.tech'
const defaultImage = '/og-image.jpg'

/** hreflang de una ruta interna: es, en, fr y x-default (español). */
export function languageAlternates(internalPath: string): Record<string, string> {
  const paths = alternatePaths(internalPath)
  return { ...paths, 'x-default': paths.es }
}

interface PageMetadataInput {
  lang: Locale
  title: string
  description: string
  /** Ruta interna (p. ej. '/productos/zentry'); se traduce según el idioma. */
  path: string
  image?: string
}

// openGraph y twitter no se fusionan entre layout y página (se sustituyen enteros),
// así que cada página declara los suyos completos: si no, heredaría los de la home.
export function pageMetadata({ lang, title, description, path, image = defaultImage }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`
  const url = localizePath(lang, path)
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      locale: localeInfo[lang].ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeInfo[l].ogLocale),
      siteName,
      url,
      title: fullTitle,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}
