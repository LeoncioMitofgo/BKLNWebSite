import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/routes'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  lang: Locale
}

export function ProductCard({ product, lang }: ProductCardProps) {
  const t = getDictionary(lang).products

  return (
    <Link href={localizePath(lang, `/productos/${product.slug}`)} className="group flex flex-col" data-reveal>
      <div className="overflow-hidden rounded-[18px] border border-white/10 bg-bg-surface">
        <Image
          src={product.image}
          alt={product.title}
          width={1200}
          height={750}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.035]"
        />
      </div>
      <h3 className="mt-5 mb-2 font-display text-[24px] font-bold tracking-[-0.02em]">{product.title}</h3>
      <p className="mb-4 text-text-secondary line-clamp-3">{product.description}</p>
      <span className="mt-auto inline-flex items-center gap-2 font-semibold">
        {t.card.more}
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  )
}
