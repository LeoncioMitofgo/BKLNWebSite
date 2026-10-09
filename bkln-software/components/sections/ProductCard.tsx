import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'

const categoryLabels: Record<Product['category'], string> = {
  android: 'Android',
  desktop: 'Desktop',
  web: 'Web App',
  ia: 'IA',
}

const categoryImages: Record<Product['category'], string> = {
  android: '/course-android.jpg',
  desktop: '/service-desktop.jpg',
  web: '/product-web.jpg',
  ia: '/product-ia.jpg',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image || categoryImages[product.category]

  return (
    <div className="group flex flex-col bg-bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300">
      <div className="h-40 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-bg-dark/50" />
        <div className="absolute top-2 left-2">
          <Badge variant="blue">{categoryLabels[product.category]}</Badge>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-text-primary font-semibold mb-1.5">{product.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3">
          {product.description}
        </p>
        <Link href={`/productos/${product.slug}`} className="mt-auto">
          <Button size="sm" variant="outline" className="w-full">
            Ver producto <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
