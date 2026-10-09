import Link from 'next/link'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/sections/ProductCard'
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
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            {p.h1Start} <span className="text-accent-green">{p.h1Highlight}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">{p.lead}</p>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">{p.notFoundTitle}</h2>
          <p className="text-text-secondary mb-6">{p.notFoundText}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={localizePath(lang, '/contacto')}>
              <Button>{t.common.requestProposal}</Button>
            </Link>
            <Link href={localizePath(lang, '/servicios')}>
              <Button variant="outline">{p.seeServices}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
