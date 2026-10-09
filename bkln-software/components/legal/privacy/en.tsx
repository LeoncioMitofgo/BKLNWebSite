import { B, EmailLink, LegalList, LegalSection } from '../LegalLayout'

export function PrivacyEn() {
  return (
    <>
      <LegalSection title="1. Who is responsible">
        <p>
          <B>BKLN Software & Systems</B> is responsible for processing the data you provide to us
          through this website. You can contact us at <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. What data we collect">
        <p>We only collect the data you choose to give us:</p>
        <LegalList>
          <li>
            <B>Contact form:</B> name, email, WhatsApp and company (optional), product or type of
            project, estimated budget, project description, the page you are writing from and the
            language you are browsing in.
          </li>
          <li>
            <B>WhatsApp:</B> if you message us on WhatsApp, your number and your messages, solely to
            deal with your enquiry.
          </li>
          <li>
            <B>Virtual assistant (chat):</B> the messages you type in the chat are sent to our server
            and processed by an artificial intelligence provider to generate the reply. Please do not
            include sensitive data in the chat.
          </li>
          <li>
            <B>Visit statistics:</B> we use Vercel Web Analytics, which measures visits in aggregate
            and without cookies.
          </li>
          <li>
            <B>Cookies:</B> we do not use tracking or advertising cookies. We only store one technical
            cookie (<code>bkln_lang</code>) to remember the language you choose in the selector.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. What we use your data for">
        <LegalList>
          <li>To answer your enquiry or quote request.</li>
          <li>To coordinate the rollout of the products or services you engage us for.</li>
          <li>To send you relevant updates about a project in progress.</li>
        </LegalList>
        <p>
          We do not use your data for unsolicited marketing, nor do we pass it on to third parties for
          commercial purposes.
        </p>
      </LegalSection>

      <LegalSection title="4. Where it is stored">
        <p>
          Contact form data is sent to us by email through <B>Resend</B> and stored in <B>Supabase</B>,
          a database service that meets international security standards and encrypts data at rest
          and in transit.
        </p>
      </LegalSection>

      <LegalSection title="5. How long we keep it">
        <p>
          We keep form data for as long as necessary to handle your request. If we do not end up
          working together, we delete it within 12 months at most. You can ask us to delete it sooner
          at any time.
        </p>
      </LegalSection>

      <LegalSection title="6. Your rights">
        <p>You have the right to:</p>
        <LegalList>
          <li>Access the data we hold about you.</li>
          <li>Ask for it to be corrected or deleted.</li>
          <li>Object to its processing.</li>
          <li>Request the portability of your data.</li>
        </LegalList>
        <p>
          To exercise any of these rights, write to us at <EmailLink />. We reply within 72 business
          hours.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes to this policy">
        <p>
          If we update this policy, we will show the date of the last change at the top of the page.
          We recommend reviewing it from time to time.
        </p>
      </LegalSection>
    </>
  )
}
