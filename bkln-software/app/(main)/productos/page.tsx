import type { Metadata } from 'next'
import { ProductsExplorer } from '@/components/sections/ProductsExplorer'
import { products } from '@/data/content'

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Apps Android, software desktop, scripts y herramientas — algunos gratuitos, otros de pago.',
}

export default function ProductosPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Tienda de <span className="text-accent-green">Productos</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Apps Android, software desktop, scripts y herramientas — algunos gratuitos, otros de
            pago.
          </p>
        </div>
      </section>

      <ProductsExplorer products={products} />
    </div>
  )
}
