import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, projectType, budget, description } = body

    if (!name || !email || !projectType || !budget || !description) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      console.error('RESEND_API_KEY no configurada — solicitud de contacto perdida:', { name, email, projectType })
      return NextResponse.json(
        { error: 'El formulario no está activado todavía. Escríbenos directamente a hello@bklnsoftware.tech.' },
        { status: 503 }
      )
    }

    const emailBody = `
Nueva solicitud de proyecto — BKLN Software & Systems

Nombre: ${name}
Email: ${email}
Empresa: ${company || 'N/A'}
Tipo de proyecto: ${projectType}
Presupuesto: ${budget}

Descripción:
${description}
    `.trim()

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: 'hello@bklnsoftware.tech',
        subject: `Nueva solicitud de ${name} — ${projectType}`,
        text: emailBody,
      }),
    })

    if (!resendRes.ok) {
      const errBody = await resendRes.text()
      console.error('Resend rechazó el envío:', resendRes.status, errBody)
      return NextResponse.json(
        { error: 'No pudimos enviar tu solicitud. Escríbenos directamente a hello@bklnsoftware.tech.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en /api/contact:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
