import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Download, Star, Package, ShieldCheck, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DownloadButton } from '@/components/ui/DownloadButton'
import { products } from '@/data/seed'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: product.title,
    description: product.description,
  }
}

const deliveryLabels: Record<string, { label: string; note: string }> = {
  'source-code': { label: 'Código fuente completo', note: 'Recibirás el código fuente listo para instalar y modificar.' },
  license: { label: 'Licencia de uso', note: 'Licencia de uso perpetuo para un proyecto o empresa.' },
  install: { label: 'Instalación incluida', note: 'Te instalamos y configuramos la app en tu servidor o equipo.' },
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const delivery = product.deliveryType ? deliveryLabels[product.deliveryType] : null
  const fileUrl = product.fileKey
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/downloads/${product.fileKey}`
    : null

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <Link href="/productos" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-bg-surface border border-white/5">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Title & meta */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-wider text-accent-blue bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.isFree && (
                  <span className="text-xs uppercase tracking-wider text-success bg-success/10 border border-success/20 px-3 py-1 rounded-full">
                    Gratis
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{product.title}</h1>
              <p className="text-text-secondary text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 py-4 border-y border-white/5 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-warning" /> {product.rating > 0 ? product.rating.toFixed(1) : 'Nuevo'}
              </span>
              <span className="flex items-center gap-1.5">
                <Download size={14} /> {product.downloads.toLocaleString()} descargas
              </span>
              <span className="flex items-center gap-1.5">
                <Package size={14} /> v{product.version}
              </span>
            </div>

            {/* Long description */}
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-4">Descripción</h2>
              <div className="text-text-secondary leading-relaxed space-y-3">
                {product.longDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            {product.screenshots.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Capturas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.screenshots.map((src, i) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-bg-surface border border-white/5">
                      <Image src={src} alt={`Captura ${i + 1}`} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {product.requirements.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Requisitos</h2>
                <ul className="space-y-2">
                  {product.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-text-secondary text-sm">
                      <CheckCircle size={14} className="text-accent-blue mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Changelog */}
            {product.changelog.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <RefreshCw size={18} className="text-accent-blue" /> Historial de versiones
                </h2>
                <div className="space-y-4">
                  {product.changelog.map((entry) => (
                    <div key={entry.version} className="bg-bg-surface border border-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-accent-blue font-mono text-sm font-semibold">v{entry.version}</span>
                        <span className="text-text-secondary text-xs">{entry.date}</span>
                      </div>
                      <ul className="space-y-1">
                        {entry.changes.map((change) => (
                          <li key={change} className="text-text-secondary text-sm flex items-start gap-2">
                            <span className="text-brand-blue mt-1">—</span> {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="space-y-4">
            <div className="bg-bg-surface border border-white/5 rounded-xl p-6 sticky top-24 space-y-5">

              {/* Price */}
              <div>
                {product.isFree ? (
                  <p className="text-3xl font-bold text-success">Gratis</p>
                ) : (
                  <p className="text-3xl font-bold text-text-primary">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(product.price)}
                  </p>
                )}
                <p className="text-text-secondary text-xs mt-1">Pago único · sin suscripción</p>
              </div>

              {/* Includes */}
              {product.includes && product.includes.length > 0 && (
                <ul className="space-y-2">
                  {product.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-text-secondary text-sm">
                      <CheckCircle size={13} className="text-accent-blue mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Delivery type */}
              {delivery && (
                <div className="bg-brand-blue/5 border border-brand-blue/15 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={14} className="text-accent-blue" />
                    <span className="text-text-primary text-sm font-medium">{delivery.label}</span>
                  </div>
                  <p className="text-text-secondary text-xs">{delivery.note}</p>
                </div>
              )}

              {/* CTA */}
              {product.isFree && fileUrl ? (
                <DownloadButton slug={product.slug} fileUrl={fileUrl} />
              ) : product.isFree ? (
                <Button size="lg" className="w-full gap-2" disabled>
                  <Download size={16} /> Próximamente
                </Button>
              ) : (
                <>
                  <Button size="lg" className="w-full">Comprar ahora</Button>
                  <Link href="/contacto" className="block">
                    <Button variant="outline" size="lg" className="w-full">Contactar antes de comprar</Button>
                  </Link>
                </>
              )}

              <p className="text-text-secondary text-xs text-center">
                ¿Dudas? Escríbenos a hello@bklnsoftware.com
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
