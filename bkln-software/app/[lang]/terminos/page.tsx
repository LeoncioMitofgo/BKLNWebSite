import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { TermsEs } from '@/components/legal/terms/es'
import { TermsEn } from '@/components/legal/terms/en'
import { TermsFr } from '@/components/legal/terms/fr'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'
import { fmt, formatDate } from '@/lib/utils'

const UPDATED = '2026-05-22'

const content: Record<Locale, () => React.JSX.Element> = {
  es: TermsEs,
  en: TermsEn,
  fr: TermsFr,
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).legal
  return pageMetadata({ lang, title: t.termsTitle, description: t.termsDescription, path: '/terminos' })
}

export default async function TerminosPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).legal
  const Content = content[lang]

  return (
    <LegalLayout
      title={t.termsTitle}
      updated={fmt(t.updated, { date: formatDate(UPDATED, lang) })}
      links={[
        { href: localizePath(lang, '/privacidad'), label: t.seePrivacy },
        { href: localizePath(lang, '/contacto'), label: t.contact },
      ]}
    >
      <Content />
    </LegalLayout>
  )
}
