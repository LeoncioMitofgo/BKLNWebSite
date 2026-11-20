import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Bricolage_Grotesque, Figtree, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/sections/WhatsAppButton'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { company, contactEmail, whatsappNumber } from '@/data/contact'
import { hasLocale, localeInfo, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { languageAlternates, siteName, siteUrl } from '@/lib/metadata'
import '../globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

// Solo para textos largos (guías, lectura)
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
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
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/brand-logo.png`,
    image: `${siteUrl}/brand-logo.png`,
    description: t.meta.siteDescription,
    email: contactEmail,
    telephone: `+${whatsappNumber}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.area,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    hasMap: company.mapsUrl,
    openingHoursSpecification: company.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    foundingDate: String(company.foundingYear),
    founder: {
      '@type': 'Person',
      name: company.founder.name,
      // Nunca "CEO": el cargo público es "Fundador" (decisión de Mike, 20-11-2026).
      jobTitle: 'Founder',
      sameAs: [company.founder.linkedin],
    },
    areaServed: t.meta.areaServed,
    knowsAbout: t.meta.knowsAbout,
    availableLanguage: ['es', 'en', 'fr'],
    sameAs: [
      'https://github.com/LeoncioMitofgo',
      'https://linkedin.com/company/bkln-software-systems',
    ],
  }

  return (
    <html lang={lang} className={`${figtree.variable} ${bricolage.variable} ${newsreader.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-bg-dark text-text-primary font-primary antialiased">
        <Navbar lang={lang} t={t.nav} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} t={t} />
        <WhatsAppButton message={t.whatsapp.general} label={t.whatsapp.buttonLabel} />
        {/* El chat del asistente está retirado hasta que ai.bklnsoftware.tech vuelva a funcionar (ver PLAN-WEB-V3.md). */}
        <RevealOnScroll />
        <Analytics />
      </body>
    </html>
  )
}
