import { B, EmailLink, LegalList, LegalSection } from '../LegalLayout'

export function PrivacyEs() {
  return (
    <>
      <LegalSection title="1. Quién es el responsable">
        <p>
          <B>BKLN Software & Systems</B> es el responsable del tratamiento de los datos que nos
          facilitas a través de este sitio web. Puedes contactarnos en <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos recogemos">
        <p>Solo recogemos los datos que tú nos proporcionas voluntariamente:</p>
        <LegalList>
          <li>
            <B>Formulario de contacto:</B> nombre, email, WhatsApp y empresa (opcionales), producto o
            tipo de proyecto, presupuesto estimado, descripción del proyecto, la página desde la que nos
            escribes y el idioma en que navegas.
          </li>
          <li>
            <B>WhatsApp:</B> si nos escribes por WhatsApp, tu número y tus mensajes, únicamente para
            atender tu consulta.
          </li>
          <li>
            <B>Asistente virtual (chat):</B> los mensajes que escribes en el chat se envían a nuestro
            servidor y se procesan con un proveedor de inteligencia artificial para generar la
            respuesta. No incluyas datos sensibles en el chat.
          </li>
          <li>
            <B>Estadísticas de visitas:</B> usamos Vercel Web Analytics, que mide las visitas de forma
            agregada y sin cookies.
          </li>
          <li>
            <B>Cookies:</B> no usamos cookies de seguimiento ni publicidad. Solo guardamos una cookie
            técnica (<code>bkln_lang</code>) para recordar el idioma que eliges en el selector.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Para qué usamos tus datos">
        <LegalList>
          <li>Responder a tu consulta o solicitud de presupuesto.</li>
          <li>Coordinar la implantación de los productos o servicios que contrates.</li>
          <li>Comunicarte actualizaciones relevantes sobre un proyecto en curso.</li>
        </LegalList>
        <p>
          No usamos tus datos para marketing no solicitado ni los cedemos a terceros con fines
          comerciales.
        </p>
      </LegalSection>

      <LegalSection title="4. Dónde se almacenan">
        <p>
          Los datos del formulario de contacto se nos envían por email a través de <B>Resend</B> y se
          almacenan en <B>Supabase</B>, un servicio de base de datos que cumple con estándares de
          seguridad internacionales y cifra los datos en reposo y en tránsito.
        </p>
      </LegalSection>

      <LegalSection title="5. Durante cuánto tiempo">
        <p>
          Conservamos los datos del formulario mientras sea necesario para gestionar tu solicitud. Si no
          llegamos a trabajar juntos, los eliminamos en un plazo máximo de 12 meses. Puedes solicitar la
          eliminación anticipada en cualquier momento.
        </p>
      </LegalSection>

      <LegalSection title="6. Tus derechos">
        <p>Tienes derecho a:</p>
        <LegalList>
          <li>Acceder a los datos que tenemos sobre ti.</li>
          <li>Solicitar su corrección o eliminación.</li>
          <li>Oponerte a su tratamiento.</li>
          <li>Solicitar la portabilidad de tus datos.</li>
        </LegalList>
        <p>
          Para ejercer cualquiera de estos derechos, escríbenos a <EmailLink />. Respondemos en menos de
          72 horas hábiles.
        </p>
      </LegalSection>

      <LegalSection title="7. Cambios en esta política">
        <p>
          Si actualizamos esta política, lo indicaremos con la fecha de la última modificación al inicio
          de la página. Te recomendamos revisarla periódicamente.
        </p>
      </LegalSection>
    </>
  )
}
