import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { PrivacyEs } from '@/components/legal/privacy/es'
import { PrivacyEn } from '@/components/legal/privacy/en'
import { PrivacyFr } from '@/components/legal/privacy/fr'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'
import { fmt, formatDate } from '@/lib/utils'

const UPDATED = '2026-10-09'

const content: Record<Locale, () => React.JSX.Element> = {
  es: PrivacyEs,
  en: PrivacyEn,
  fr: PrivacyFr,
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).legal
  return pageMetadata({ lang, title: t.privacyTitle, description: t.privacyDescription, path: '/privacidad' })
}

export default async function PrivacidadPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).legal
  const Content = content[lang]

  return (
    <LegalLayout
      title={t.privacyTitle}
      updated={fmt(t.updated, { date: formatDate(UPDATED, lang) })}
      links={[
        { href: localizePath(lang, '/terminos'), label: t.seeTerms },
        { href: localizePath(lang, '/contacto'), label: t.contact },
      ]}
    >
      <Content />
    </LegalLayout>
  )
}
