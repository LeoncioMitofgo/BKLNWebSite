import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { contactEmail } from '@/data/contact'

const FALLBACK_ERROR = `No pudimos enviar tu solicitud. Escríbenos por WhatsApp o a ${contactEmail}.`

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud no válida' }, { status: 400 })
  }

  // Honeypot: los humanos no ven este campo; si viene relleno, es un bot.
  if (field(body.website, 200)) {
    return NextResponse.json({ success: true })
  }

  const lead = {
    name: field(body.name, 120),
    email: field(body.email, 200),
    whatsapp: field(body.whatsapp, 30),
    company: field(body.company, 120),
    project_type: field(body.projectType, 60),
    product: field(body.product, 80),
    budget: field(body.budget, 60),
    description: field(body.description, 5000),
    source_path: field(body.sourcePath, 300),
  }

  if (!lead.name || !lead.email || !(lead.project_type || lead.product) || !lead.budget || !lead.description) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }
  if (!EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ error: 'El email no parece válido' }, { status: 400 })
  }

  // 1. Guardar primero: si el email falla, la solicitud no se pierde.
  let leadId: string | null = null
  try {
    const { data, error } = await getSupabaseAdmin().from('leads').insert(lead).select('id').single()
    if (error) throw error
    leadId = data.id
  } catch (error) {
    console.error('No se pudo guardar el lead en Supabase:', error)
  }

  // 2. Avisar por email.
  let emailSent = false
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('RESEND_API_KEY no configurada — no se envía el aviso por email')
  } else {
    const emailBody = `
Nueva solicitud de proyecto — BKLN Software & Systems

Nombre: ${lead.name}
Email: ${lead.email}
WhatsApp: ${lead.whatsapp || 'N/A'}
Empresa: ${lead.company || 'N/A'}
Producto de interés: ${lead.product || 'N/A'}
Tipo de proyecto: ${lead.project_type || 'N/A'}
Presupuesto: ${lead.budget}
Enviado desde: ${lead.source_path || 'N/A'}

Descripción:
${lead.description}
    `.trim()

    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: contactEmail,
          reply_to: lead.email,
          subject: `Nueva solicitud de ${lead.name} — ${lead.product || lead.project_type}`,
          text: emailBody,
        }),
      })
      if (resendRes.ok) {
        emailSent = true
      } else {
        console.error('Resend rechazó el envío:', resendRes.status, await resendRes.text())
      }
    } catch (error) {
      console.error('Error llamando a Resend:', error)
    }
  }

  if (leadId && emailSent) {
    const { error } = await getSupabaseAdmin().from('leads').update({ email_sent: true }).eq('id', leadId)
    if (error) console.error('No se pudo marcar email_sent:', error)
  }

  if (!leadId && !emailSent) {
    return NextResponse.json({ error: FALLBACK_ERROR }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
