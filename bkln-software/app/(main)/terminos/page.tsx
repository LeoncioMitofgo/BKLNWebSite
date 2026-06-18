import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Condiciones de uso y contratación de servicios, productos y cursos de BKLN Software & Systems.',
}

const updated = '22 de mayo de 2026'

export default function TerminosPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            Términos de Servicio
          </h1>
          <p className="text-text-secondary text-sm">Última actualización: {updated}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">1. Quiénes somos</h2>
            <p>
              <strong className="text-text-primary">BKLN Software & Systems</strong> es una empresa
              de desarrollo de software con sede en Guinea Ecuatorial. Ofrecemos servicios de
              desarrollo a medida, productos de software y cursos online. Puedes contactarnos en{' '}
              <a href="mailto:hello@bklnsoftware.com" className="text-accent-green hover:underline">
                hello@bklnsoftware.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">2. Servicios de desarrollo a medida</h2>
            <p>
              Los servicios de desarrollo se contratan mediante propuesta y presupuesto personalizado.
              El trabajo comienza únicamente una vez firmado el acuerdo y recibido el pago inicial
              acordado entre las partes.
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                <strong className="text-text-primary">Propiedad intelectual:</strong> el código
                desarrollado a medida pertenece al cliente una vez completado el pago total, salvo
                que el acuerdo específico indique lo contrario.
              </li>
              <li>
                <strong className="text-text-primary">Plazos:</strong> son estimaciones acordadas
                en la propuesta. Informamos proactivamente de cualquier desviación significativa.
              </li>
              <li>
                <strong className="text-text-primary">Cambios de alcance:</strong> las modificaciones
                fuera del alcance acordado se presupuestan por separado.
              </li>
              <li>
                <strong className="text-text-primary">Garantía:</strong> ofrecemos un periodo de
                corrección de errores sin cargo adicional, según lo especificado en cada propuesta.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">3. Productos de software</h2>
            <p>
              Los productos del catálogo (aplicaciones de gestión, herramientas, scripts) se adquieren
              según el tipo de entrega especificado en cada producto:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                <strong className="text-text-primary">Licencia de uso:</strong> el cliente recibe
                el derecho de uso del software; el código fuente permanece en propiedad de BKLN.
              </li>
              <li>
                <strong className="text-text-primary">Código fuente:</strong> entrega completa del
                código. El cliente puede modificarlo libremente sin restricciones.
              </li>
              <li>
                <strong className="text-text-primary">Instalación:</strong> el software se instala
                en los sistemas del cliente por nuestro equipo técnico.
              </li>
            </ul>
            <p>
              Los productos digitales no admiten devolución una vez entregados, salvo que presenten
              un defecto grave que no podamos resolver en un plazo razonable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">4. Cursos y contenidos educativos</h2>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>
                El acceso a los cursos es personal e intransferible.
              </li>
              <li>
                El contenido (textos, videos, ejercicios) es propiedad de BKLN Software & Systems y
                no puede reproducirse ni redistribuirse sin autorización.
              </li>
              <li>
                Los cursos marcados como "gratuitos" son accesibles sin pago y sin registro.
                Nos reservamos el derecho de cambiar esta condición en el futuro, preservando
                el acceso para quienes ya los estén usando.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">5. Pagos</h2>
            <p>
              Los precios se expresan en francos CFA (XAF). El método y calendario de pago
              se acuerdan directamente con el cliente para cada proyecto o producto.
              Para las transacciones coordinamos el pago de forma directa — no actuamos
              como intermediario de pagos entre terceros.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">6. Uso del sitio web</h2>
            <p>
              Este sitio web es exclusivamente informativo y de contacto. Queda prohibido:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Usar el sitio para actividades ilegales o fraudulentas.</li>
              <li>Intentar acceder a sistemas o datos no autorizados.</li>
              <li>Reproducir el contenido del sitio sin autorización escrita.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">7. Limitación de responsabilidad</h2>
            <p>
              BKLN Software & Systems no será responsable de daños indirectos, lucro cesante
              o pérdidas de datos derivados del uso de nuestros servicios o productos, más allá
              de lo que la legislación aplicable establezca como irrenunciable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">8. Ley aplicable</h2>
            <p>
              Estos términos se rigen por la legislación de la República de Guinea Ecuatorial.
              Para cualquier controversia, las partes se someten a los tribunales competentes
              de dicho territorio, salvo acuerdo escrito en contrario.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-text-primary font-semibold text-lg">9. Contacto</h2>
            <p>
              Si tienes alguna duda sobre estos términos, escríbenos a{' '}
              <a href="mailto:hello@bklnsoftware.com" className="text-accent-green hover:underline">
                hello@bklnsoftware.com
              </a>
              .
            </p>
          </section>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/privacidad" className="text-accent-green hover:underline text-sm">
              Ver Política de Privacidad
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
