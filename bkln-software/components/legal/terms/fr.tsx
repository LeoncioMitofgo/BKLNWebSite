import { B, EmailLink, LegalList, LegalSection } from '../LegalLayout'

export function TermsFr() {
  return (
    <>
      <LegalSection title="1. Qui sommes-nous">
        <p>
          <B>BKLN Software & Systems</B> est une entreprise de développement de logiciels basée en
          Guinée équatoriale. Nous proposons des services de développement sur mesure, des produits
          logiciels et des cours en ligne. Vous pouvez nous contacter à l’adresse <EmailLink />.
        </p>
      </LegalSection>

      <LegalSection title="2. Services de développement sur mesure">
        <p>
          Les services de développement sont contractés sur la base d’une proposition et d’un devis
          personnalisés. Le travail ne commence qu’une fois l’accord signé et l’acompte convenu entre
          les parties reçu.
        </p>
        <LegalList>
          <li>
            <B>Propriété intellectuelle :</B> le code développé sur mesure appartient au client une
            fois le paiement intégral effectué, sauf disposition contraire de l’accord spécifique.
          </li>
          <li>
            <B>Délais :</B> il s’agit d’estimations convenues dans la proposition. Nous signalons de
            manière proactive tout écart important.
          </li>
          <li>
            <B>Modifications du périmètre :</B> les modifications hors du périmètre convenu font
            l’objet d’un devis séparé.
          </li>
          <li>
            <B>Garantie :</B> nous offrons une période de correction des erreurs sans frais
            supplémentaires, selon ce qui est précisé dans chaque proposition.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Produits logiciels">
        <p>
          Les produits du catalogue (applications de gestion, outils, scripts) sont acquis selon le
          type de livraison précisé pour chaque produit :
        </p>
        <LegalList>
          <li>
            <B>Licence d’utilisation :</B> le client reçoit le droit d’utiliser le logiciel ; le code
            source reste la propriété de BKLN.
          </li>
          <li>
            <B>Code source :</B> livraison complète du code. Le client peut le modifier librement et
            sans restriction.
          </li>
          <li>
            <B>Installation :</B> le logiciel est installé sur les systèmes du client par notre
            équipe technique.
          </li>
        </LegalList>
        <p>
          Les produits numériques ne peuvent être retournés une fois livrés, sauf s’ils présentent un
          défaut grave que nous ne pouvons pas résoudre dans un délai raisonnable.
        </p>
      </LegalSection>

      <LegalSection title="4. Cours et contenus pédagogiques">
        <LegalList>
          <li>L’accès aux cours est personnel et non transférable.</li>
          <li>
            Le contenu (textes, vidéos, exercices) est la propriété de BKLN Software & Systems et ne
            peut être reproduit ni redistribué sans autorisation.
          </li>
          <li>
            Les cours publiés sur ce site sont en accès libre et ne nécessitent pas d’inscription. Nous
            nous réservons le droit de modifier cette condition à l’avenir, en préservant l’accès des
            personnes qui les utilisent déjà.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Paiements">
        <p>
          Les prix sont exprimés en francs CFA (FCFA). Le moyen et le calendrier de paiement sont
          convenus directement avec le client pour chaque projet ou produit. Nous coordonnons le
          paiement directement pour chaque transaction — nous n’agissons pas comme intermédiaire de
          paiement entre des tiers.
        </p>
      </LegalSection>

      <LegalSection title="6. Utilisation du site">
        <p>Ce site a une vocation exclusivement informative et de contact. Il est interdit de :</p>
        <LegalList>
          <li>Utiliser le site pour des activités illégales ou frauduleuses.</li>
          <li>Tenter d’accéder à des systèmes ou à des données sans autorisation.</li>
          <li>Reproduire le contenu du site sans autorisation écrite.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="7. Limitation de responsabilité">
        <p>
          BKLN Software & Systems ne saurait être tenu responsable des dommages indirects, du manque à
          gagner ou des pertes de données résultant de l’utilisation de nos services ou produits,
          au-delà de ce que la législation applicable impose de manière impérative.
        </p>
      </LegalSection>

      <LegalSection title="8. Droit applicable">
        <p>
          Les présentes conditions sont régies par la législation de la République de Guinée
          équatoriale. En cas de litige, les parties se soumettent aux tribunaux compétents de ce
          territoire, sauf accord écrit contraire.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          Pour toute question sur ces conditions, écrivez-nous à <EmailLink />.
        </p>
      </LegalSection>
    </>
  )
}
