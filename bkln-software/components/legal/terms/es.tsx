import { B, EmailLink, LegalList, LegalSection } from '../LegalLayout'

export function TermsEs() {
  return (
    <>
      <LegalSection title="1. Quiénes somos">
        <p>
          <B>BKLN Software & Systems</B> es una empresa de desarrollo de software con sede en Guinea
          Ecuatorial. Ofrecemos servicios de desarrollo a medida, productos de software y cursos online.
          Puedes contactarnos en <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. Servicios de desarrollo a medida">
        <p>
          Los servicios de desarrollo se contratan mediante propuesta y presupuesto personalizado. El
          trabajo comienza únicamente una vez firmado el acuerdo y recibido el pago inicial acordado
          entre las partes.
        </p>
        <LegalList>
          <li>
            <B>Propiedad intelectual:</B> el código desarrollado a medida pertenece al cliente una vez
            completado el pago total, salvo que el acuerdo específico indique lo contrario.
          </li>
          <li>
            <B>Plazos:</B> son estimaciones acordadas en la propuesta. Informamos proactivamente de
            cualquier desviación significativa.
          </li>
          <li>
            <B>Cambios de alcance:</B> las modificaciones fuera del alcance acordado se presupuestan por
            separado.
          </li>
          <li>
            <B>Garantía:</B> ofrecemos un periodo de corrección de errores sin cargo adicional, según lo
            especificado en cada propuesta.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Productos de software">
        <p>
          Los productos del catálogo (aplicaciones de gestión, herramientas, scripts) se adquieren según
          el tipo de entrega especificado en cada producto:
        </p>
        <LegalList>
          <li>
            <B>Licencia de uso:</B> el cliente recibe el derecho de uso del software; el código fuente
            permanece en propiedad de BKLN.
          </li>
          <li>
            <B>Código fuente:</B> entrega completa del código. El cliente puede modificarlo libremente
            sin restricciones.
          </li>
          <li>
            <B>Instalación:</B> el software se instala en los sistemas del cliente por nuestro equipo
            técnico.
          </li>
        </LegalList>
        <p>
          Los productos digitales no admiten devolución una vez entregados, salvo que presenten un
          defecto grave que no podamos resolver en un plazo razonable.
        </p>
      </LegalSection>

      <LegalSection title="4. Cursos y contenidos educativos">
        <LegalList>
          <li>El acceso a los cursos es personal e intransferible.</li>
          <li>
            El contenido (textos, videos, ejercicios) es propiedad de BKLN Software & Systems y no puede
            reproducirse ni redistribuirse sin autorización.
          </li>
          <li>
            Los cursos publicados en este sitio son de acceso abierto y no requieren registro. Nos
            reservamos el derecho de cambiar esta condición en el futuro, preservando el acceso para
            quienes ya los estén usando.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Pagos">
        <p>
          Los precios se expresan en francos CFA (XAF). El método y calendario de pago se acuerdan
          directamente con el cliente para cada proyecto o producto. Para las transacciones coordinamos
          el pago de forma directa — no actuamos como intermediario de pagos entre terceros.
        </p>
      </LegalSection>

      <LegalSection title="6. Uso del sitio web">
        <p>Este sitio web es exclusivamente informativo y de contacto. Queda prohibido:</p>
        <LegalList>
          <li>Usar el sitio para actividades ilegales o fraudulentas.</li>
          <li>Intentar acceder a sistemas o datos no autorizados.</li>
          <li>Reproducir el contenido del sitio sin autorización escrita.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="7. Limitación de responsabilidad">
        <p>
          BKLN Software & Systems no será responsable de daños indirectos, lucro cesante o pérdidas de
          datos derivados del uso de nuestros servicios o productos, más allá de lo que la legislación
          aplicable establezca como irrenunciable.
        </p>
      </LegalSection>

      <LegalSection title="8. Ley aplicable">
        <p>
          Estos términos se rigen por la legislación de la República de Guinea Ecuatorial. Para
          cualquier controversia, las partes se someten a los tribunales competentes de dicho
          territorio, salvo acuerdo escrito en contrario.
        </p>
      </LegalSection>

      <LegalSection title="9. Contacto">
        <p>
          Si tienes alguna duda sobre estos términos, escríbenos a <EmailLink />.
        </p>
      </LegalSection>
    </>
  )
}
