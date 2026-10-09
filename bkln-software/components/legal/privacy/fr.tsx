import { B, EmailLink, LegalList, LegalSection } from '../LegalLayout'

export function PrivacyFr() {
  return (
    <>
      <LegalSection title="1. Responsable du traitement">
        <p>
          <B>BKLN Software & Systems</B> est responsable du traitement des données que vous nous
          communiquez via ce site. Vous pouvez nous contacter à l’adresse <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. Les données que nous collectons">
        <p>Nous ne collectons que les données que vous nous fournissez volontairement :</p>
        <LegalList>
          <li>
            <B>Formulaire de contact :</B> nom, e-mail, WhatsApp et entreprise (facultatifs), produit
            ou type de projet, budget estimé, description du projet, la page depuis laquelle vous nous
            écrivez et la langue dans laquelle vous naviguez.
          </li>
          <li>
            <B>WhatsApp :</B> si vous nous écrivez sur WhatsApp, votre numéro et vos messages,
            uniquement pour traiter votre demande.
          </li>
          <li>
            <B>Assistant virtuel (chat) :</B> les messages que vous écrivez dans le chat sont envoyés
            à notre serveur et traités par un fournisseur d’intelligence artificielle pour générer la
            réponse. N’y incluez pas de données sensibles.
          </li>
          <li>
            <B>Statistiques de visite :</B> nous utilisons Vercel Web Analytics, qui mesure les visites
            de façon agrégée et sans cookies.
          </li>
          <li>
            <B>Cookies :</B> nous n’utilisons pas de cookies de suivi ni de publicité. Nous enregistrons
            uniquement un cookie technique (<code>bkln_lang</code>) pour mémoriser la langue que vous
            choisissez dans le sélecteur.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. À quoi servent vos données">
        <LegalList>
          <li>Répondre à votre demande d’information ou de devis.</li>
          <li>Coordonner la mise en place des produits ou services que vous nous confiez.</li>
          <li>Vous communiquer les informations utiles sur un projet en cours.</li>
        </LegalList>
        <p>
          Nous n’utilisons pas vos données pour du marketing non sollicité et ne les cédons pas à des
          tiers à des fins commerciales.
        </p>
      </LegalSection>

      <LegalSection title="4. Où elles sont stockées">
        <p>
          Les données du formulaire de contact nous sont envoyées par e-mail via <B>Resend</B> et sont
          stockées dans <B>Supabase</B>, un service de base de données conforme aux normes de sécurité
          internationales, qui chiffre les données au repos et en transit.
        </p>
      </LegalSection>

      <LegalSection title="5. Durée de conservation">
        <p>
          Nous conservons les données du formulaire le temps nécessaire au traitement de votre demande.
          Si nous ne travaillons pas ensemble, nous les supprimons dans un délai maximum de 12 mois.
          Vous pouvez demander leur suppression anticipée à tout moment.
        </p>
      </LegalSection>

      <LegalSection title="6. Vos droits">
        <p>Vous avez le droit de :</p>
        <LegalList>
          <li>Accéder aux données que nous détenons sur vous.</li>
          <li>Demander leur rectification ou leur suppression.</li>
          <li>Vous opposer à leur traitement.</li>
          <li>Demander la portabilité de vos données.</li>
        </LegalList>
        <p>
          Pour exercer l’un de ces droits, écrivez-nous à <EmailLink />. Nous répondons sous 72 heures
          ouvrées.
        </p>
      </LegalSection>

      <LegalSection title="7. Modifications de cette politique">
        <p>
          Si nous mettons à jour cette politique, nous l’indiquerons par la date de dernière
          modification en haut de la page. Nous vous recommandons de la consulter régulièrement.
        </p>
      </LegalSection>
    </>
  )
}
