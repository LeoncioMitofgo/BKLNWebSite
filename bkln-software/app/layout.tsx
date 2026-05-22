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

export const metadata: Metadata = {
  title: {
    default: 'BKLN Software & Systems',
    template: '%s | BKLN Software & Systems',
  },
  description:
    'Software solutions para empresas e individuos — desarrollo Android, Web, Desktop, Python, IA y más.',
  keywords: ['software', 'desarrollo web', 'android', 'python', 'IA', 'machine learning', 'BKLN'],
  authors: [{ name: 'BKLN Software & Systems' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'BKLN Software & Systems',
    title: 'BKLN Software & Systems',
    description: 'Code. Create. Educate. — Software solutions worldwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BKLN Software & Systems',
    description: 'Code. Create. Educate. — Software solutions worldwide.',
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  )
}
