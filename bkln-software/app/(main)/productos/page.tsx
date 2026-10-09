import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/sections/ProductCard'
import { products } from '@/data/content'

export const metadata: Metadata = {
  title: 'Productos y soluciones',
  description:
    'Productos y soluciones de BKLN: apps, plataformas y sistemas usados por negocios reales, listos para implantar o adaptar a tu caso.',
}

export default function ProductosPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Productos y <span className="text-accent-green">soluciones</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Herramientas, plataformas y sistemas que ya usan negocios reales. Te los instalamos,
            te formamos y los adaptamos a tu caso.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            ¿No encuentras exactamente lo que necesitas?
          </h2>
          <p className="text-text-secondary mb-6">
            Construimos software a medida para tu negocio, o adaptamos uno de nuestros productos a tu
            caso.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contacto">
              <Button>Solicitar propuesta</Button>
            </Link>
            <Link href="/servicios">
              <Button variant="outline">Ver servicios</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
