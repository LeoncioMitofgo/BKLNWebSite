// Contenido por idioma: el español de data/content.ts es la base y cada traducción solo
// sustituye los campos de texto. Imágenes, tecnologías, slugs internos y relaciones no se duplican.
import { services, products, projects, publishedCourses, visiblePosts } from '@/data/content'
import type { BlogPost, Course, Product, Project, Service } from '@/types'
import type { Locale } from './config'
import { contentEn } from './translations/en'
import { contentFr } from './translations/fr'

export type ServiceText = Pick<Service, 'title' | 'description' | 'longDescription' | 'forWho' | 'examples' | 'deliverables' | 'pricingFactors' | 'timeline' | 'faqs'>
  // Solo cuando las "tecnologías" son palabras (p. ej. consultoría: «Revisión de código»).
  & { technologies?: string[] }
export type ProductText = Pick<Product, 'title' | 'description' | 'longDescription' | 'pricingNote' | 'includes' | 'requirements' | 'supportPlan'>
export type ProjectText = Pick<Project, 'description' | 'longDescription' | 'sector' | 'status' | 'challenges' | 'solutions'> & { title?: string }
export type CourseText = Pick<Course, 'title' | 'description' | 'longDescription' | 'duration' | 'modules' | 'includes' | 'instructor'>
export type PostText = Pick<BlogPost, 'title' | 'excerpt' | 'content' | 'tags' | 'author'>

/** Traducciones de un idioma, indexadas por slug interno. */
export interface ContentTranslation {
  services: Record<string, ServiceText>
  products: Record<string, ProductText>
  projects: Record<string, ProjectText>
  courses: Record<string, CourseText>
  posts: Record<string, PostText>
}

const translations: Record<Exclude<Locale, 'es'>, ContentTranslation> = {
  en: contentEn,
  fr: contentFr,
}

function localize<T extends { slug: string }>(items: T[], texts?: Record<string, Partial<T>>): T[] {
  return texts ? items.map((item) => ({ ...item, ...texts[item.slug] })) : items
}

export function getContent(lang: Locale) {
  if (lang === 'es') {
    return { services, products, projects, courses: publishedCourses, posts: visiblePosts }
  }
  const t = translations[lang]
  return {
    services: localize<Service>(services, t.services),
    products: localize<Product>(products, t.products),
    projects: localize<Project>(projects, t.projects),
    courses: localize<Course>(publishedCourses, t.courses),
    posts: localize<BlogPost>(visiblePosts, t.posts),
  }
}
