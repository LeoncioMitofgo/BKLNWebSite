import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://bklnsoftware.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BKLN Software & Systems',
    template: '%s | BKLN Software & Systems',
  },
  description:
    'Estudio de software con sede en Malabo, Guinea Ecuatorial — desarrollo Android, Web, automatización e IA para negocios de aquí y del mundo.',
  keywords: [
    'software', 'desarrollo web', 'android', 'python', 'IA', 'inteligencia artificial',
    'BKLN', 'Malabo', 'Guinea Ecuatorial', 'aplicaciones móviles', 'automatización',
  ],
  authors: [{ name: 'BKLN Software & Systems', url: siteUrl }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'BKLN Software & Systems',
    title: 'BKLN Software & Systems — Code. Create. Educate.',
    description: 'Estudio de software con sede en Malabo — apps Android, Web, automatización e IA para el mundo.',
    images: [{ url: '/logo8.png', width: 512, height: 512, alt: 'BKLN Software & Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BKLN Software & Systems — Code. Create. Educate.',
    description: 'Estudio de software con sede en Malabo — apps Android, Web, automatización e IA para el mundo.',
    images: ['/logo8.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg-dark text-text-primary font-primary antialiased">
        {children}
        {/* BKLN Support Bot Widget */}
        <script
          src="https://api.africasport365.com/widget.js"
          data-tenant-id="00000000-0000-0000-0000-000000000001"
          data-tenant-key="demo-key"
          data-api-url="https://api.africasport365.com"
          data-bot-name="Asistente BKLN"
          data-welcome="¡Hola! Soy el asistente virtual de BKLN Software & Systems. ¿En qué puedo ayudarte?"
          data-primary-color="#00a85a"
          async
        />
      </body>
    </html>
  )
}
