export const locales = ['es', 'en', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

/** Cookie donde se guarda el idioma elegido con el selector. */
export const LOCALE_COOKIE = 'bkln_lang'

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const localeInfo: Record<Locale, { short: string; name: string; ogLocale: string; intl: string }> = {
  es: { short: 'ES', name: 'Español', ogLocale: 'es_ES', intl: 'es-ES' },
  en: { short: 'EN', name: 'English', ogLocale: 'en_GB', intl: 'en-GB' },
  fr: { short: 'FR', name: 'Français', ogLocale: 'fr_FR', intl: 'fr-FR' },
}
