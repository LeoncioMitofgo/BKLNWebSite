'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { defaultLocale, hasLocale, type Locale } from '@/i18n/config'
import { localizePath } from '@/i18n/routes'

// not-found no recibe params: el idioma sale de la URL reescrita. Textos aquí y no en el
// diccionario para no cargar los tres diccionarios completos en el cliente.
const text: Record<Locale, { title: string; body: string; home: string }> = {
  es: {
    title: 'Página no encontrada',
    body: 'La página que buscas no existe o ha cambiado de dirección.',
    home: 'Volver al inicio',
  },
  en: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    home: 'Back to home',
  },
  fr: {
    title: 'Page introuvable',
    body: "La page que vous cherchez n'existe pas ou a changé d'adresse.",
    home: "Retour à l'accueil",
  },
}

export default function NotFound() {
  const params = useParams<{ lang?: string }>()
  const lang = params.lang && hasLocale(params.lang) ? params.lang : defaultLocale
  const t = text[lang]

  return (
    <div className="min-h-[70vh] pt-24 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-accent-green mb-4">404</p>
        <h1 className="text-2xl font-bold text-text-primary mb-3">{t.title}</h1>
        <p className="text-text-secondary mb-8">{t.body}</p>
        <Link href={localizePath(lang, '/')}>
          <Button>{t.home}</Button>
        </Link>
      </div>
    </div>
  )
}
