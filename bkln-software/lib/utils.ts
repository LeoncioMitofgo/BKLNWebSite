import { localeInfo, type Locale } from '@/i18n/config'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateString: string, lang: Locale = 'es'): string {
  return new Intl.DateTimeFormat(localeInfo[lang].intl, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // Las fechas son 'AAAA-MM-DD' (medianoche UTC): sin esto, un huso horario negativo mostraría el día anterior.
    timeZone: 'UTC',
  }).format(new Date(dateString))
}

/** Rellena los marcadores {nombre} de un texto del diccionario. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))
}
