import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, projectType, budget, description } = body

    if (!name || !email || !projectType || !budget || !description) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Enviar email con Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
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

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: 'hello@bklnsoftware.com',
          subject: `Nueva solicitud de ${name} — ${projectType}`,
          text: emailBody,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en /api/contact:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
