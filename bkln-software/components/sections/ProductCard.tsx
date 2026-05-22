import Link from 'next/link'
import Image from 'next/image'
import { Star, Download } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

const categoryLabels: Record<Product['category'], string> = {
  android: 'Android',
  desktop: 'Desktop',
  scripts: 'Scripts & Tools',
  free: 'Gratis',
  web: 'Web App',
}

const categoryImages: Record<Product['category'], string> = {
  android: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&auto=format&fit=crop&q=80',
  desktop: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop&q=80',
  scripts: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
  free: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=600&auto=format&fit=crop&q=80',
  web: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : categoryImages[product.category]

  return (
    <div className="group bg-bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/10 transition-all duration-300">
      <div className="h-40 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-bg-dark/50" />
        <div className="absolute top-2 left-2">
          <Badge variant={product.isFree ? 'success' : 'blue'}>
            {categoryLabels[product.category]}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <span className="text-white text-xs bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded">
            v{product.version}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-text-primary font-semibold mb-1.5">{product.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-3 mb-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Star size={12} className="text-warning fill-warning" />
            {product.rating}
          </span>
          <span className="flex items-center gap-1">
            <Download size={12} />
            {product.downloads.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-primary font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          <Link href={`/productos/${product.slug}`}>
            <Button size="sm" variant={product.isFree ? 'outline' : 'primary'}>
              {product.isFree ? 'Descargar' : 'Comprar'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
