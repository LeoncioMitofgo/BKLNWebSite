import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any
      const userId = session.metadata?.userId
      const productId = session.metadata?.productId
      const courseId = session.metadata?.courseId

      if (userId && courseId) {
        await supabase.from('user_courses').upsert({
          user_id: userId,
          course_id: courseId,
          purchased_at: new Date().toISOString(),
        })
      }

      if (userId && productId) {
        await supabase.from('user_products').upsert({
          user_id: userId,
          product_id: productId,
          purchased_at: new Date().toISOString(),
        })
      }
      break
    }

    case 'payment_intent.payment_failed': {
      console.error('Payment failed:', event.data.object)
      break
    }
  }

  return NextResponse.json({ received: true })
}
