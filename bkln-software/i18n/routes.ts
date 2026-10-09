// Mapa de direcciones por idioma. Las carpetas de app/[lang] usan los nombres internos (en español);
// el proxy traduce la dirección visible a la interna y localizePath hace lo contrario para los enlaces.
import { defaultLocale, hasLocale, type Locale } from './config'

export const sections = {
  servicios: { es: 'servicios', en: 'services', fr: 'services' },
  productos: { es: 'productos', en: 'products', fr: 'produits' },
  portfolio: { es: 'portfolio', en: 'projects', fr: 'projets' },
  blog: { es: 'blog', en: 'guides', fr: 'guides' },
  cursos: { es: 'cursos', en: 'courses', fr: 'cours' },
  contacto: { es: 'contacto', en: 'contact', fr: 'contact' },
  nosotros: { es: 'nosotros', en: 'about', fr: 'a-propos' },
  privacidad: { es: 'privacidad', en: 'privacy', fr: 'confidentialite' },
  terminos: { es: 'terminos', en: 'terms', fr: 'conditions' },
} as const satisfies Record<string, Record<Locale, string>>

export type Section = keyof typeof sections

type SlugMap = Record<string, Partial<Record<Locale, string>>>

// slug interno -> slug visible por idioma. Si un idioma no aparece, se usa el interno
// (p. ej. nombres de producto como gestescolar o zentry).
const slugs: Partial<Record<Section, SlugMap>> = {
  servicios: {
    'desarrollo-web': { en: 'web-development', fr: 'developpement-web' },
    'apps-moviles': { en: 'mobile-apps', fr: 'applications-mobiles' },
    'sistemas-de-gestion': { en: 'management-systems', fr: 'systemes-de-gestion' },
    'ia-y-automatizacion': { en: 'ai-and-automation', fr: 'ia-et-automatisation' },
    'medios-de-comunicacion': { en: 'media-platforms', fr: 'plateformes-medias' },
    'mantenimiento-y-soporte': { en: 'maintenance-and-support', fr: 'maintenance-et-support' },
    'consultoria-y-formacion': { en: 'consulting-and-training', fr: 'conseil-et-formation' },
  },
  portfolio: {
    'sistema-pos-android-comercios': { en: 'android-pos-system', fr: 'systeme-caisse-android' },
    'plataforma-delivery-multivertical': { en: 'multi-category-delivery-platform', fr: 'plateforme-livraison-multicategorie' },
    'suite-herramientas-web-privadas': { en: 'private-web-tools-suite', fr: 'suite-outils-web-prives' },
  },
  cursos: {
    'python-desde-cero': { en: 'python-from-scratch', fr: 'python-depuis-zero' },
    'ia-machine-learning-python': { en: 'ai-machine-learning-python' },
  },
  blog: {
    'sistema-caja-stock-farmacias-supermercados-restaurantes': {
      en: 'pos-stock-control-pharmacies-supermarkets-restaurants',
      fr: 'caisse-stock-pharmacies-supermarches-restaurants',
    },
    'asistente-ia-whatsapp-web-negocio': {
      en: 'ai-assistant-whatsapp-website-business',
      fr: 'assistant-ia-whatsapp-site-web-entreprise',
    },
    'cuanto-cuesta-web-app-guinea-ecuatorial': {
      en: 'how-much-does-a-website-or-app-cost-equatorial-guinea',
      fr: 'combien-coute-site-web-application-guinee-equatoriale',
    },
    'digitalizar-gestion-colegio-guinea-ecuatorial': {
      en: 'digitize-school-management-equatorial-guinea',
      fr: 'digitaliser-gestion-ecole-guinee-equatoriale',
    },
    'web-o-redes-sociales-negocio': {
      en: 'website-or-social-media-for-your-business',
      fr: 'site-web-ou-reseaux-sociaux-entreprise',
    },
    'python-automatizacion-casos-reales': {
      en: 'python-automation-real-cases',
      fr: 'automatisation-python-cas-reels',
    },
    'supabase-en-produccion-lo-que-nadie-cuenta': {
      en: 'supabase-in-production-what-nobody-tells-you',
      fr: 'supabase-en-production-ce-que-personne-ne-dit',
    },
  },
}

function localePrefix(lang: Locale): string {
  return lang === defaultLocale ? '' : `/${lang}`
}

/** Ruta interna ('/servicios/desarrollo-web', admite ?query) -> dirección visible en `lang`. */
export function localizePath(lang: Locale, internalPath: string): string {
  const [path, query] = internalPath.split('?')
  const suffix = query ? `?${query}` : ''
  const parts = path.split('/').filter(Boolean)
  if (parts.length === 0) return (localePrefix(lang) || '/') + suffix

  const section = parts[0] as Section
  const segment = sections[section]?.[lang] ?? parts[0]
  const rest = parts.slice(1)
  const map = slugs[section]
  if (rest.length > 0 && map) rest[0] = map[rest[0]]?.[lang] ?? rest[0]
  return `${localePrefix(lang)}/${[segment, ...rest].join('/')}${suffix}`
}

/** Dirección visible -> idioma y ruta interna. null si la sección no existe en ese idioma. */
export function resolvePath(pathname: string): { lang: Locale; internalPath: string } | null {
  const parts = pathname.split('/').filter(Boolean)
  let lang: Locale = defaultLocale
  if (parts[0] && parts[0] !== defaultLocale && hasLocale(parts[0])) lang = parts.shift() as Locale
  if (parts.length === 0) return { lang, internalPath: '/' }

  const section = (Object.keys(sections) as Section[]).find((s) => sections[s][lang] === parts[0])
  if (!section) return null
  const rest = parts.slice(1)
  const map = slugs[section]
  if (rest.length > 0 && map) {
    const internal = Object.keys(map).find((key) => (map[key][lang] ?? key) === rest[0])
    if (internal) rest[0] = internal
  }
  return { lang, internalPath: `/${[section, ...rest].join('/')}` }
}

/**
 * Para componentes cliente: usePathname() devuelve la dirección visible en el navegador, pero al
 * prerenderizar devuelve la ruta reescrita por proxy.ts ('/en/servicios', '/es/blog'). Acepta las
 * dos para que servidor y cliente pinten lo mismo y no haya desajustes al hidratar.
 */
export function routeFromPathname(pathname: string): { lang: Locale; internalPath: string } | null {
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] && hasLocale(parts[0]) && (parts.length === 1 || Object.prototype.hasOwnProperty.call(sections, parts[1]))) {
    return { lang: parts[0], internalPath: `/${parts.slice(1).join('/')}` }
  }
  return resolvePath(pathname)
}

/** Las tres versiones de una ruta interna, para hreflang, sitemap y selector de idioma. */
export function alternatePaths(internalPath: string): Record<Locale, string> {
  return {
    es: localizePath('es', internalPath),
    en: localizePath('en', internalPath),
    fr: localizePath('fr', internalPath),
  }
}
