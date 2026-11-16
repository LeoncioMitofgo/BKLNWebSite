import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { getContent } from '@/i18n/content'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import { localeFromParams, type LangParams } from '@/i18n/server'

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang).products
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: '/productos' })
}

export default async function ProductosPage({ params }: LangParams) {
  const lang = await localeFromParams(params)
  const t = getDictionary(lang)
  const p = t.products
  const { products } = getContent(lang)

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-20 sm:px-8 sm:pt-44">
        <h1 className="font-display text-[clamp(52px,8vw,120px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
          {p.h1Start} <span className="text-accent-green">{p.h1Highlight}</span>
        </h1>
        <p className="mt-8 max-w-[56ch] text-lg text-text-secondary sm:text-xl">{p.lead}</p>
      </header>

      <section className="mx-auto max-w-7xl space-y-24 px-5 pb-28 sm:px-8 lg:space-y-32">
        {products.map((product, i) => (
          <Link
            key={product.slug}
            href={localizePath(lang, `/productos/${product.slug}`)}
            className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
            data-reveal
          >
            <div className={`overflow-hidden rounded-[22px] border border-white/10 bg-bg-surface lg:col-span-7 ${i % 2 ? 'lg:col-start-6 lg:row-start-1' : ''}`}>
              <Image
                src={product.image}
                alt={product.title}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[16/9] w-full object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.035]"
                priority={i === 0}
              />
            </div>
            <div className={`lg:col-span-5 ${i % 2 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
              <h2 className="mb-4 font-display text-[clamp(36px,4vw,56px)] font-extrabold leading-none tracking-[-0.03em]">{product.title}</h2>
              <p className="mb-5 text-lg text-text-secondary">{product.description}</p>
              {product.pricingNote && <p className="mb-6 text-sm text-text-secondary">{product.pricingNote}</p>}
              <span className="inline-flex items-center gap-2.5 font-semibold">
                {p.card.more}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="border-t border-white/10 bg-bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="mb-5 max-w-[18ch] font-display text-[clamp(36px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em]">{p.notFoundTitle}</h2>
          <p className="mb-10 max-w-[56ch] text-lg text-text-secondary">{p.notFoundText}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={localizePath(lang, '/contacto')} size="lg">
              {t.common.requestProposal}
            </ButtonLink>
            <ButtonLink href={localizePath(lang, '/servicios')} variant="outline" size="lg">
              {p.seeServices}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  )
}
