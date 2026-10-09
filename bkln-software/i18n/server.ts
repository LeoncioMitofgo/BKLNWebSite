import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from './config'

export interface LangParams {
  params: Promise<{ lang: string }>
}

export interface LangSlugParams {
  params: Promise<{ lang: string; slug: string }>
}

/** Idioma de la URL; 404 si no es uno de los soportados. */
export async function localeFromParams(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return lang
}
