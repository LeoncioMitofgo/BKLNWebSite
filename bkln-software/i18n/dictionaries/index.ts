import type { Locale } from '../config'
import { es, type Dictionary } from './es'
import { en } from './en'
import { fr } from './fr'

export type { Dictionary }

const dictionaries: Record<Locale, Dictionary> = { es, en, fr }

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang]
}
