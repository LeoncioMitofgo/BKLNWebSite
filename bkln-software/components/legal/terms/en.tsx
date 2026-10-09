import { B, EmailLink, LegalList, LegalSection } from '../LegalLayout'

export function TermsEn() {
  return (
    <>
      <LegalSection title="1. Who we are">
        <p>
          <B>BKLN Software & Systems</B> is a software development company based in Equatorial Guinea.
          We offer custom development services, software products and online courses. You can contact
          us at <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. Custom development services">
        <p>
          Development services are engaged through a tailored proposal and quote. Work only begins
          once the agreement has been signed and the initial payment agreed between the parties has
          been received.
        </p>
        <LegalList>
          <li>
            <B>Intellectual property:</B> custom-developed code belongs to the client once full
            payment has been made, unless the specific agreement states otherwise.
          </li>
          <li>
            <B>Timelines:</B> these are estimates agreed in the proposal. We proactively report any
            significant deviation.
          </li>
          <li>
            <B>Changes of scope:</B> changes outside the agreed scope are quoted separately.
          </li>
          <li>
            <B>Warranty:</B> we offer a bug-fixing period at no extra charge, as specified in each
            proposal.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Software products">
        <p>
          Catalogue products (management applications, tools, scripts) are acquired according to the
          type of delivery specified for each product:
        </p>
        <LegalList>
          <li>
            <B>Licence to use:</B> the client receives the right to use the software; the source code
            remains the property of BKLN.
          </li>
          <li>
            <B>Source code:</B> full delivery of the code. The client may modify it freely without
            restriction.
          </li>
          <li>
            <B>Installation:</B> the software is installed on the client’s systems by our technical
            team.
          </li>
        </LegalList>
        <p>
          Digital products cannot be returned once delivered, unless they have a serious defect that
          we are unable to resolve within a reasonable time.
        </p>
      </LegalSection>

      <LegalSection title="4. Courses and educational content">
        <LegalList>
          <li>Access to the courses is personal and non-transferable.</li>
          <li>
            The content (text, videos, exercises) is the property of BKLN Software & Systems and may
            not be reproduced or redistributed without permission.
          </li>
          <li>
            The courses published on this website are open access and do not require registration. We
            reserve the right to change this in the future, while preserving access for those already
            using them.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Payments">
        <p>
          Prices are expressed in CFA francs (XAF). The payment method and schedule are agreed directly
          with the client for each project or product. We coordinate payment directly for each
          transaction — we do not act as a payment intermediary between third parties.
        </p>
      </LegalSection>

      <LegalSection title="6. Use of the website">
        <p>This website is solely for information and contact purposes. It is prohibited to:</p>
        <LegalList>
          <li>Use the website for illegal or fraudulent activities.</li>
          <li>Attempt to access unauthorised systems or data.</li>
          <li>Reproduce the content of the website without written permission.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="7. Limitation of liability">
        <p>
          BKLN Software & Systems shall not be liable for indirect damages, loss of profit or loss of
          data arising from the use of our services or products, beyond what applicable law
          establishes as non-waivable.
        </p>
      </LegalSection>

      <LegalSection title="8. Governing law">
        <p>
          These terms are governed by the laws of the Republic of Equatorial Guinea. For any dispute,
          the parties submit to the competent courts of that territory, unless otherwise agreed in
          writing.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          If you have any questions about these terms, write to us at <EmailLink />.
        </p>
      </LegalSection>
    </>
  )
}
