import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ChatWidget from '@/components/sections/ChatWidget'
import { WhatsAppButton } from '@/components/sections/WhatsAppButton'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { contactEmail, whatsappNumber } from '@/data/contact'
import { hasLocale, localeInfo, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { languageAlternates, siteName, siteUrl } from '@/lib/metadata'
import '../globals.css'

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

interface LayoutParams {
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang).meta
  const homeUrl = localizePath(lang, '/')
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.siteTitle, template: `%s | ${siteName}` },
    description: t.siteDescription,
    keywords: t.keywords,
    icons: { icon: '/brand-icon.png', apple: '/brand-icon.png' },
    authors: [{ name: siteName, url: siteUrl }],
    alternates: { canonical: homeUrl, languages: languageAlternates('/') },
    openGraph: {
      type: 'website',
      locale: localeInfo[lang].ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeInfo[l].ogLocale),
      url: homeUrl,
      siteName,
      title: t.siteTitle,
      description: t.siteDescription,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.siteTitle,
      description: t.siteDescription,
      images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default async function RootLayout({ children, params }: LayoutParams & { children: React.ReactNode }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDictionary(lang)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/brand-logo.png`,
    image: `${siteUrl}/brand-logo.png`,
    description: t.meta.siteDescription,
    email: contactEmail,
    telephone: `+${whatsappNumber}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Malabo', addressCountry: 'GQ' },
    areaServed: t.meta.areaServed,
    knowsAbout: t.meta.knowsAbout,
    availableLanguage: ['es', 'en', 'fr'],
    sameAs: [
      'https://github.com/LeoncioMitofgo',
      'https://linkedin.com/company/bklnsoftware',
      'https://twitter.com/bklnsoftware',
    ],
  }

  return (
    <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-bg-dark text-text-primary font-primary antialiased">
        <Navbar lang={lang} t={t.nav} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} nav={t.nav} t={t.footer} />
        <WhatsAppButton message={t.whatsapp.general} label={t.whatsapp.buttonLabel} />
        <ChatWidget t={t.chat} />
        <Analytics />
      </body>
    </html>
  )
}
