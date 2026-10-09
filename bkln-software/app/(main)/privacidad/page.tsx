import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'

export const metadata: Metadata = pageMetadata({
  title: 'Política de Privacidad',
  description: 'Cómo recogemos, usamos y protegemos tus datos en BKLN Software & Systems.',
  path: '/privacidad',
})

const updated = '9 de octubre de 2026'

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            Política de Privacidad
          </h1>
          <p className="text-text-secondary text-sm">Última actualización: {updated}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">1. Quién es el responsable</h2>
            <p>
              <strong className="text-text-primary">BKLN Software & Systems</strong> es el responsable
              del tratamiento de los datos que nos facilitas a través de este sitio web.
              Puedes contactarnos en{' '}
              <a href="mailto:hello@bklnsoftware.tech" className="text-accent-green hover:underline">
                hello@bklnsoftware.tech
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">2. Qué datos recogemos</h2>
            <p>Solo recogemos los datos que tú nos proporcionas voluntariamente:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                <strong className="text-text-primary">Formulario de contacto:</strong> nombre, email,
                WhatsApp y empresa (opcionales), producto o tipo de proyecto, presupuesto estimado,
                descripción del proyecto y la página desde la que nos escribes.
              </li>
              <li>
                <strong className="text-text-primary">WhatsApp:</strong> si nos escribes por WhatsApp,
                tu número y tus mensajes, únicamente para atender tu consulta.
              </li>
              <li>
                <strong className="text-text-primary">Asistente virtual (chat):</strong> los mensajes que
                escribes en el chat se envían a nuestro servidor y se procesan con un proveedor de
                inteligencia artificial para generar la respuesta. No incluyas datos sensibles en el chat.
              </li>
              <li>
                <strong className="text-text-primary">Estadísticas de visitas:</strong> usamos Vercel Web
                Analytics, que mide las visitas de forma agregada y sin cookies.
              </li>
              <li>
                <strong className="text-text-primary">Cookies:</strong> no usamos cookies de seguimiento
                ni publicidad.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">3. Para qué usamos tus datos</h2>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Responder a tu consulta o solicitud de presupuesto.</li>
              <li>Coordinar la implantación de los productos o servicios que contrates.</li>
              <li>Comunicarte actualizaciones relevantes sobre un proyecto en curso.</li>
            </ul>
            <p>
              No usamos tus datos para marketing no solicitado ni los cedemos a terceros
              con fines comerciales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">4. Dónde se almacenan</h2>
            <p>
              Los datos del formulario de contacto se nos envían por email a través de{' '}
              <strong className="text-text-primary">Resend</strong> y se almacenan en{' '}
              <strong className="text-text-primary">Supabase</strong>, un servicio de base de
              datos que cumple con estándares de seguridad internacionales y cifra los datos
              en reposo y en tránsito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">5. Durante cuánto tiempo</h2>
            <p>
              Conservamos los datos del formulario mientras sea necesario para gestionar
              tu solicitud. Si no llegamos a trabajar juntos, los eliminamos en un plazo
              máximo de 12 meses. Puedes solicitar la eliminación anticipada en cualquier momento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">6. Tus derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Acceder a los datos que tenemos sobre ti.</li>
              <li>Solicitar su corrección o eliminación.</li>
              <li>Oponerte a su tratamiento.</li>
              <li>Solicitar la portabilidad de tus datos.</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, escríbenos a{' '}
              <a href="mailto:hello@bklnsoftware.tech" className="text-accent-green hover:underline">
                hello@bklnsoftware.tech
              </a>
              . Respondemos en menos de 72 horas hábiles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">7. Cambios en esta política</h2>
            <p>
              Si actualizamos esta política, lo indicaremos con la fecha de la última
              modificación al inicio de la página. Te recomendamos revisarla periódicamente.
            </p>
          </section>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/terminos" className="text-accent-green hover:underline text-sm">
              Ver Términos de Servicio
            </Link>
            <Link href="/contacto" className="text-accent-green hover:underline text-sm">
              Contactar
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
