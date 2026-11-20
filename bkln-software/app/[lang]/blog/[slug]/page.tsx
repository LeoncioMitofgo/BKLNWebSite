import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata, siteName, siteUrl } from '@/lib/metadata'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { ButtonLink, ExternalButton } from '@/components/ui/ButtonLink'
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

// Colores de la tipografía del artículo sobre papel (plugin de typography).
const PAPER_PROSE =
  'prose prose-lg sm:prose-xl max-w-none font-read [--tw-prose-body:#232823] [--tw-prose-headings:var(--color-paper-ink)] [--tw-prose-bold:var(--color-paper-ink)] [--tw-prose-links:var(--color-paper-green)] [--tw-prose-bullets:var(--color-paper-green)] [--tw-prose-counters:var(--color-paper-muted)] [--tw-prose-hr:var(--color-paper-line)] [--tw-prose-quotes:var(--color-paper-ink)] [--tw-prose-quote-borders:var(--color-paper-green)] [--tw-prose-code:var(--color-paper-ink)] [--tw-prose-pre-bg:var(--color-paper-ink)] [--tw-prose-pre-code:var(--color-paper)] prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-[-0.025em] prose-h2:mt-14 prose-a:underline-offset-4 prose-a:decoration-1 prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-[0.85em]'

export default async function BlogPostPage({ params }: LangSlugParams) {
  const lang = await localeFromParams(params)
  const { slug } = await params
  const t = getDictionary(lang)
  const d = t.blog.post
  const { posts, products, services } = getContent(lang)
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)
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
    <article className="bg-paper text-paper-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Cabecera del artículo */}
      <header className="mx-auto max-w-[760px] px-5 pt-32 pb-12 sm:px-7 sm:pt-40">
        <Link href={localizePath(lang, '/blog')} className="mb-10 inline-flex items-center gap-2 text-sm text-paper-muted transition-colors hover:text-paper-ink">
          <ArrowLeft size={16} /> {d.back}
        </Link>

        {post.draft && <p className="mb-6 rounded-lg border border-warning/40 bg-warning/10 px-4 py-2.5 text-sm text-[#7a4a00]">{d.draftNotice}</p>}

        <p className="mb-5 text-[15px] text-paper-muted">
          <span className="font-semibold text-paper-muted">{t.blog.categories[post.category]}</span>
          {' · '}
          {formatDate(post.publishedAt, lang)}
          {' · '}
          {post.readTime} {t.common.readMinLong}
        </p>
        <h1 className="mb-7 font-display text-[clamp(38px,5.4vw,66px)] font-extrabold leading-[1.02] tracking-[-0.03em]">{post.title}</h1>
        <p className="font-read text-[22px] leading-[1.5] text-paper-muted sm:text-[24px]">{post.excerpt}</p>
        <p className="mt-8 text-sm text-paper-muted">
          <span className="font-semibold text-paper-ink">{post.author.name}</span> · {post.author.bio}
        </p>
      </header>

      {/* Portada */}
      <div className="mx-auto max-w-[1100px] px-5 sm:px-7">
        <Image src={post.coverImage} alt={post.title} width={1600} height={900} sizes="(min-width: 1100px) 1100px, 100vw" className="aspect-[16/9] w-full rounded-[20px] object-cover" priority />
      </div>

      {/* Texto */}
      <div className="mx-auto max-w-[720px] px-5 pt-16 pb-12 sm:px-7">
        <div className={PAPER_PROSE}>
          <MarkdownContent content={post.content} lang={lang} />
        </div>

        <ul className="mt-14 flex flex-wrap gap-2 border-t border-paper-line pt-8">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-paper-line px-3 py-1 text-sm text-paper-muted">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Siguiente paso */}
      <div className="mx-auto max-w-[1100px] px-5 pb-24 sm:px-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-[22px] bg-bg-dark p-8 text-text-primary sm:p-10">
            <p className="mb-3 font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em]">{d.applyTitle}</p>
            <p className="mb-7 max-w-[52ch] text-text-secondary">{offer?.text ?? d.applyFallback}</p>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href={localizePath(lang, offer?.quoteHref ?? '/contacto')}>{d.quote}</ButtonLink>
              <ExternalButton variant="outline" href={waLink(fmt(t.whatsapp.guide, { title: post.title }))}>
                <WhatsAppIcon size={16} /> {t.common.whatsapp}
              </ExternalButton>
            </div>
            {offer && (
              <Link href={localizePath(lang, offer.pageHref)} className="mt-6 inline-block border-b border-current pb-0.5 text-sm font-semibold">
                {offer.pageLabel}
              </Link>
            )}
          </div>
          <div className="rounded-[22px] border border-paper-line p-8 sm:p-10">
            <p className="mb-3 font-display text-[22px] font-bold tracking-[-0.02em]">{d.shareTitle}</p>
            <p className="mb-7 text-paper-muted">{d.shareText}</p>
            <ExternalButton variant="paper" href={waShareLink(`${post.title} ${postUrl}`)}>
              <Share2 size={16} /> {d.share}
            </ExternalButton>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-24 max-w-[720px]">
            <h2 className="mb-2 text-sm font-semibold tracking-[0.06em] text-paper-muted">{d.related.toUpperCase()}</h2>
            <ul>
              {related.map((p) => (
                <li key={p.slug} className="border-b border-paper-line">
                  <Link href={localizePath(lang, `/blog/${p.slug}`)} className="group block py-6">
                    <span className="block font-read text-[24px] leading-[1.3] transition-colors group-hover:underline">{p.title}</span>
                    <span className="text-sm text-paper-muted">
                      {p.readTime} {t.common.readMinLong}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
