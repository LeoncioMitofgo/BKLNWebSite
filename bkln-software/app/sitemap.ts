import { MetadataRoute } from 'next'
import { services, projects, products, publishedCourses, visiblePosts } from '@/data/content'
import { locales } from '@/i18n/config'
import { alternatePaths } from '@/i18n/routes'
import { siteUrl } from '@/lib/metadata'

type Entry = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
  lastModified?: Date
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Entry[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/servicios', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/productos', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/cursos', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/portfolio', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/contacto', changeFrequency: 'yearly', priority: 0.9 },
    { path: '/nosotros', changeFrequency: 'monthly', priority: 0.6 },
    ...services.map((s): Entry => ({ path: `/servicios/${s.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    ...projects.map((p): Entry => ({ path: `/portfolio/${p.slug}`, changeFrequency: 'monthly', priority: 0.6 })),
    ...products.map((p): Entry => ({ path: `/productos/${p.slug}`, changeFrequency: 'weekly', priority: 0.7 })),
    ...publishedCourses.map((c): Entry => ({ path: `/cursos/${c.slug}`, changeFrequency: 'monthly', priority: 0.7 })),
    ...visiblePosts.map((p): Entry => ({
      path: `/blog/${p.slug}`,
      changeFrequency: 'yearly',
      priority: 0.6,
      lastModified: new Date(p.publishedAt),
    })),
  ]

  // Una entrada por idioma, cada una con las direcciones de las otras versiones (hreflang).
  return pages.flatMap(({ path, ...rest }) => {
    const paths = alternatePaths(path)
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}${paths[l]}`])),
      'x-default': `${siteUrl}${paths.es}`,
    }
    return locales.map((lang) => ({ url: `${siteUrl}${paths[lang]}`, ...rest, alternates: { languages } }))
  })
}
