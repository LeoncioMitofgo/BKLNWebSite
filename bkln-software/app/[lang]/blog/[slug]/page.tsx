import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata, siteName, siteUrl } from '@/lib/metadata'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BlogCard } from '@/components/sections/BlogCard'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { visiblePosts } from '@/data/content'
import { waLink, waShareLink } from '@/data/contact'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangSlugParams } from '@/i18n/server'
import { fmt, formatDate } from '@/lib/utils'

export function generateStaticParams() {
  return visiblePosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: LangSlugParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const post = getContent(lang).posts.find((p) => p.slug === slug)
  if (!post) return {}
  return pageMetadata({ lang, title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.coverImage })
}

export default async function BlogPostPage({ params }: LangSlugParams) {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const t = getDictionary(lang)
  const d = t.blog.post
  const { posts, products, services } = getContent(lang)
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2)
  const product = products.find((p) => p.slug === post.relatedProduct)
  const service = services.find((s) => s.slug === post.relatedService)
  // CTA contextual: el producto relacionado tiene prioridad sobre el servicio.
  const offer = product
    ? { text: `${product.title}: ${product.description}`, quoteHref: `/contacto?producto=${product.slug}`, pageHref: `/productos/${product.slug}`, pageLabel: d.seeProduct }
    : service
      ? { text: `${service.title}: ${service.description}`, quoteHref: `/contacto?servicio=${service.slug}`, pageHref: `/servicios/${service.slug}`, pageLabel: d.seeService }
      : null
  const postUrl = `${siteUrl}${localizePath(lang, `/blog/${post.slug}`)}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.coverImage}`,
    datePublished: post.publishedAt,
    inLanguage: lang,
    mainEntityOfPage: postUrl,
    author: { '@type': 'Organization', name: siteName, url: siteUrl },
    publisher: { '@type': 'Organization', name: siteName, logo: { '@type': 'ImageObject', url: `${siteUrl}/brand-logo.png` } },
  }

  return (
    <div className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={localizePath(lang, '/blog')}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> {d.back}
        </Link>

        {post.draft && (
          <p className="mb-6 rounded-md border border-warning/30 bg-warning/10 px-4 py-2.5 text-sm text-warning">
            {d.draftNotice}
          </p>
        )}

        {/* Portada */}
        <div className="h-64 relative rounded-lg overflow-hidden mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 896px) 896px, 100vw"
          />
          <div className="absolute inset-0 bg-bg-dark/50" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="blue">{t.blog.categories[post.category]}</Badge>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Calendar size={13} /> {formatDate(post.publishedAt, lang)}
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Clock size={13} /> {post.readTime} {t.common.readMinLong}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{post.title}</h1>
        <p className="text-text-secondary text-lg mb-6">{post.excerpt}</p>

        {/* Autor */}
        <div className="flex items-center gap-3 pb-8 border-b border-white/5 mb-8">
          <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center">
            <User size={16} className="text-accent-green" />
          </div>
          <div>
            <p className="text-text-primary font-medium text-sm">{post.author.name}</p>
            <p className="text-text-secondary text-xs">{post.author.bio}</p>
          </div>
        </div>

        {/* Contenido */}
        <div className="prose prose-invert prose-blue max-w-none mb-12 prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-code:text-accent-green prose-code:bg-bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-bg-surface prose-pre:border prose-pre:border-white/10 prose-li:text-text-secondary prose-a:text-accent-green prose-blockquote:border-brand-green prose-blockquote:text-text-secondary">
          <MarkdownContent content={post.content} lang={lang} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/5">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-5">
            <p className="text-text-primary font-semibold mb-2">{d.applyTitle}</p>
            <p className="text-text-secondary text-sm mb-4">{offer?.text ?? d.applyFallback}</p>
            <div className="flex flex-wrap gap-2">
              <Link href={localizePath(lang, offer?.quoteHref ?? '/contacto')}>
                <Button size="sm">{d.quote}</Button>
              </Link>
              <a href={waLink(fmt(t.whatsapp.guide, { title: post.title }))} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline">
                  <WhatsAppIcon size={14} /> {t.common.whatsapp}
                </Button>
              </a>
            </div>
            {offer && (
              <Link href={localizePath(lang, offer.pageHref)} className="inline-block mt-3 text-sm text-accent-green hover:underline">
                {offer.pageLabel} →
              </Link>
            )}
          </div>
          <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
            <p className="text-text-primary font-semibold mb-2">{d.shareTitle}</p>
            <p className="text-text-secondary text-sm mb-4">{d.shareText}</p>
            <a href={waShareLink(`${post.title} ${postUrl}`)} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">
                <Share2 size={14} /> {d.share}
              </Button>
            </a>
          </div>
        </div>

        {/* Artículos relacionados */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-5">{d.related}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} lang={lang} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
