import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { products } from '@/data/content'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug && p.isFree)
  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
  }

  const supabase = getSupabaseAdmin()
  await supabase.from('downloads').insert({ slug })
  return NextResponse.json({ ok: true })
}
