import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { pageMetadata } from '@/lib/metadata'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).blog
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/blog' })
}

export default async function BlogPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const dict = getDictionary(lang)
  const t = dict.blog
  const { posts } = getContent(lang)
  const guides = posts.filter((p) => p.category === 'guias')
  const workshop = posts.filter((p) => p.category === 'taller')
  const [featured, ...rest] = guides
  const href = (p: BlogPost) => localizePath(lang, `/blog/${p.slug}`)
  const meta = (p: BlogPost) => `${formatDate(p.publishedAt, lang)} · ${p.readTime} ${dict.common.readMinLong}`

  const list = (items: BlogPost[]) => (
    <ul className="border-t border-paper-line">
      {items.map((p) => (
        <li key={p.slug} className="border-b border-paper-line" data-reveal>
          <Link href={href(p)} className="group grid grid-cols-1 gap-2 py-8 md:grid-cols-[1fr_2fr] md:gap-10">
            <span className="text-sm text-paper-muted md:pt-2">{meta(p)}</span>
            <span>
              <span className="block font-read text-[26px] leading-[1.25] transition-colors group-hover:text-paper-green sm:text-[30px]">{p.title}</span>
              <span className="mt-3 block max-w-[62ch] text-paper-muted">{p.excerpt}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="bg-paper text-paper-ink">
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 sm:pt-44">
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
          <span className="text-paper-green">{t.h1Highlight}</span> {t.h1End}
        </h1>
        <p className="mt-8 max-w-[52ch] font-read text-[22px] leading-[1.5] text-paper-muted sm:text-[24px]">{t.lead}</p>
      </header>

      {featured && (
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <Link href={href(featured)} className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12" data-reveal>
            <div className="overflow-hidden rounded-[22px] lg:col-span-7">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[16/9] w-full object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.03]"
                priority
              />
            </div>
            <div className="lg:col-span-5">
              <p className="mb-4 text-sm text-paper-muted">
                <span className="font-semibold text-paper-green">{t.categories.guias}</span> · {meta(featured)}
              </p>
              <h2 className="mb-5 font-read text-[32px] font-medium leading-[1.2] tracking-[-0.01em] transition-colors group-hover:text-paper-green sm:text-[40px]">
                {featured.title}
              </h2>
              <p className="text-lg text-paper-muted">{featured.excerpt}</p>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <h2 className="mb-8 text-sm font-semibold tracking-[0.06em] text-paper-muted">{t.guidesTitle.toUpperCase()}</h2>
          {list(rest)}
        </section>
      )}

      {workshop.length > 0 && (
        <section className="border-t border-paper-line bg-[#e9e5da]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <h2 className="mb-3 font-display text-[clamp(36px,4.5vw,56px)] font-extrabold leading-none tracking-[-0.03em]">{t.workshopTitle}</h2>
            <p className="mb-10 max-w-[52ch] text-paper-muted">{t.workshopSubtitle}</p>
            {list(workshop)}
          </div>
        </section>
      )}
    </div>
  )
}
