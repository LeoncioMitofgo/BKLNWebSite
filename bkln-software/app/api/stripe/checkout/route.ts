import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { products } from '@/data/content'

export async function POST(req: NextRequest) {
  const { productId } = await req.json()
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
  }
  if (product.isFree || product.priceOnRequest) {
    return NextResponse.json({ error: 'Este producto no se compra mediante checkout' }, { status: 400 })
  }
  if (!product.stripePriceId) {
    return NextResponse.json({ error: 'Este producto todavía no está configurado para venta online' }, { status: 503 })
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Los pagos online no están activados todavía. Contáctanos para comprar este producto.' },
      { status: 503 }
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.bklnsoftware.tech'

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: product.stripePriceId, quantity: 1 }],
      success_url: `${siteUrl}/productos/${product.slug}?compra=exito`,
      cancel_url: `${siteUrl}/productos/${product.slug}?compra=cancelada`,
      metadata: { productId: product.id },
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creando sesión de Stripe Checkout:', error)
    return NextResponse.json(
      { error: 'No se pudo iniciar el pago. Intenta de nuevo o contáctanos.' },
      { status: 500 }
    )
  }
}
