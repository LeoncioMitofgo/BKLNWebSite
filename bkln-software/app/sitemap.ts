import { MetadataRoute } from 'next'
import { services, projects, products, publishedCourses, visiblePosts } from '@/data/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bklnsoftware.tech'

  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/servicios`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/productos`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/cursos`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/contacto`, changeFrequency: 'yearly' as const, priority: 0.9 },
    { url: `${baseUrl}/nosotros`, changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/servicios/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/productos/${p.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const courseRoutes = publishedCourses.map((c) => ({
    url: `${baseUrl}/cursos/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes = visiblePosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...productRoutes, ...courseRoutes, ...blogRoutes]
}
