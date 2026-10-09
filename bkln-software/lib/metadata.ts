import type { Metadata } from 'next'

export const siteName = 'BKLN Software & Systems'
const defaultImage = '/brand-logo.png'

interface PageMetadataInput {
  title: string
  description: string
  /** Ruta de la página (p. ej. '/productos/zentry'); se resuelve contra metadataBase. */
  path: string
  image?: string
}

// openGraph y twitter no se fusionan entre layout y página (se sustituyen enteros),
// así que cada página declara los suyos completos: si no, heredaría los de la home.
export function pageMetadata({ title, description, path, image = defaultImage }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      siteName,
      url: path,
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
