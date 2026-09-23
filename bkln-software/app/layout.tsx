import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import ChatWidget from '@/components/sections/ChatWidget'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.bklnsoftware.tech'

const homeDescription =
  'Estudio de software y academia de programación en Malabo, Guinea Ecuatorial — cursos de Python, IA y certificaciones cloud, además de desarrollo Android, Web, automatización e IA para negocios de aquí y del mundo.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BKLN Software & Systems — Cursos de Programación y Desarrollo de Software',
    template: '%s | BKLN Software & Systems',
  },
  icons: {
    icon: '/brand-icon.png',
    apple: '/brand-icon.png',
  },
  description: homeDescription,
  keywords: [
    'software', 'desarrollo web', 'android', 'python', 'IA', 'inteligencia artificial',
    'BKLN', 'Malabo', 'Guinea Ecuatorial', 'aplicaciones móviles', 'automatización',
    'cursos de programación', 'aprender a programar', 'academia de programación Guinea Ecuatorial',
    'curso de Python en español', 'certificación AZ-900', 'clases de programación Malabo',
  ],
  authors: [{ name: 'BKLN Software & Systems', url: siteUrl }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'BKLN Software & Systems',
    title: 'BKLN Software & Systems — Cursos de Programación y Desarrollo de Software',
    description: homeDescription,
    images: [{ url: '/brand-logo.png', alt: 'BKLN Software & Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BKLN Software & Systems — Cursos de Programación y Desarrollo de Software',
    description: homeDescription,
    images: ['/brand-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'BKLN Software & Systems',
  url: siteUrl,
  logo: `${siteUrl}/brand-logo.png`,
  image: `${siteUrl}/brand-logo.png`,
  description: homeDescription,
  email: 'hello@bklnsoftware.tech',
  telephone: '+240222798086',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Malabo',
    addressCountry: 'GQ',
  },
  areaServed: ['Guinea Ecuatorial', 'África Central'],
  knowsAbout: [
    'Desarrollo de software', 'Desarrollo Android', 'Desarrollo web', 'Python',
    'Inteligencia artificial', 'Cursos de programación', 'Automatización', 'Bases de datos',
  ],
  sameAs: [
    'https://github.com/LeoncioMitofgo',
    'https://linkedin.com/company/bklnsoftware',
    'https://twitter.com/bklnsoftware',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-bg-dark text-text-primary font-primary antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
