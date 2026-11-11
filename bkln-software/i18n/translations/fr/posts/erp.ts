import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Odoo, SAP ou Excel : quel système de gestion pour votre entreprise en Guinée équatoriale ?',
  excerpt: 'Quand Excel ne suffit plus, ce qu’est vraiment un ERP, ce qui distingue Odoo de SAP et ce qu’il faut regarder en Guinée équatoriale : comptabilité SYSCOHADA, francs CFA, importations, connexion et électricité.',
  content: `## Les signes qu’Excel a atteint ses limites

Excel est un excellent outil pour démarrer. Le problème arrive quand l’entreprise grandit et que chaque service a le sien : les achats dans un fichier, l’entrepôt dans un autre, les ventes dans un troisième, et la comptabilité dans un logiciel à part où quelqu’un ressaisit tout. Quelques signes qu’il est temps de changer :

- **En fin de mois, les chiffres ne concordent pas** et l’on perd des jours à chercher l’écart.
- **Personne ne sait ce qu’il y a dans l’entrepôt** sans aller compter ou téléphoner à quelqu’un.
- **Vous ne savez pas ce que vous coûtent vraiment vos importations**, parce que le fret et la douane arrivent sur des factures séparées, des semaines plus tard.
- **Vous achetez en euros ou en dollars et vendez en francs CFA**, et chacun calcule le change à sa manière.
- **Des heures ou des services ne sont jamais facturés** parce que personne ne rapproche le travail fait de ce qui a été facturé.
- **Tout dépend d’une seule personne** qui sait où se trouve chaque fichier.

Si vous vous reconnaissez dans trois de ces points ou plus, ce qu’il vous faut est probablement un ERP.

## Ce qu’est un ERP, en une phrase

Un ERP est un système où vit toute l’activité de l’entreprise dans une seule base de données : ce que vous achetez, ce que vous avez, ce que vous vendez, ce qu’on vous doit et ce que vous devez. Quand la marchandise arrive, le stock augmente et le comptable voit la facture du fournisseur à payer. Quand une vente part, le stock diminue et la facture se crée toute seule. Personne ne recopie de données d’un endroit à l’autre.

## Les trois options réalistes

**1. Excel et un logiciel de facturation.** Suffisant pour une petite entreprise, avec peu de produits et une seule personne qui contrôle tout. Peu coûteux, mais cela ne suit pas la croissance et ne relie pas l’entrepôt à la comptabilité.

**2. Odoo.** Un ERP open source, très répandu parmi les petites et moyennes entreprises du monde entier, qui fonctionne par applications : Achats, Inventaire, Ventes, Facturation et Comptabilité, Projets, Employés, Maintenance… Vous n’installez que celles dont vous avez besoin et elles partagent toutes les mêmes données. Il existe une édition gratuite (Community), installée sur votre propre serveur, et une édition payante par utilisateur (Enterprise), avec plus d’applications, la comptabilité complète et les mises à jour incluses.

**3. SAP.** La référence des grandes entreprises et de nombreuses multinationales. Très puissant et très paramétrable, mais son déploiement est long et coûteux, et il faut des spécialistes pour le maintenir. Il se justifie quand l’entreprise est grande ou quand la maison mère l’exige. Si vous utilisez déjà SAP, l’usage n’est pas de le remplacer mais de l’étendre : développements ABAP, rapports, écrans Fiori ou connexion avec d’autres applications.

Pour la plupart des entreprises de Guinée équatoriale qui quittent Excel, le choix raisonnable est Odoo.

## Ce qu’il faut regarder en Guinée équatoriale

- **Comptabilité SYSCOHADA.** Odoo inclut la localisation officielle de la Guinée équatoriale, avec le plan comptable SYSCOHADA. Il faut tout de même la faire valider par votre comptable ou votre auditeur avant toute déclaration.
- **Devises.** Le franc CFA comme devise principale, l’euro à sa parité fixe (1 euro = 655,957 FCFA) et le dollar à son taux de change. Un bon ERP convertit chaque facture tout seul.
- **Importations.** Dans un pays qui importe presque tout, le système doit ajouter le fret, la douane et le transport au coût de chaque produit. Sinon, vous calculez vos marges sur un prix qui n’est pas le vrai.
- **Plusieurs entrepôts.** Au moins Malabo et Bata, avec des transferts entre eux et le stock par entrepôt.
- **Connexion et électricité.** La version cloud nécessite internet. Si votre connexion coupe souvent, il peut être installé sur un serveur dans vos bureaux, avec un onduleur ou un groupe électrogène et des sauvegardes conservées ailleurs.
- **Paie.** Odoo ne propose pas encore de paie prête à l’emploi pour la Guinée équatoriale. Elle peut être configurée sur mesure, mais mieux vaut la garder pour une deuxième phase.
- **Un support proche.** Un ERP ne s’installe pas pour être oublié : il y aura des questions, des ajustements et du personnel à former. Que celui qui le déploie soit à Malabo fait la différence.

## Combien ça coûte

Un ERP a deux coûts distincts. Le premier, ce sont les **licences** : gratuites avec Odoo Community ; avec Enterprise, un montant par utilisateur et par mois payé directement à Odoo. Le second, le plus important, c’est le **déploiement** : analyser vos processus, configurer le système, reprendre vos données et former votre équipe.

Ce qui fait le plus varier le prix du déploiement, c’est le nombre de sociétés et de services, la quantité et l’état des données à reprendre, et les développements sur mesure. Plus vous vous adaptez à ce que le système propose déjà, moins il coûte et plus il est facile à maintenir.

## Comment le déployer sans échouer

1. **Analyse.** Entretiens avec chaque service et une carte de votre façon de travailler aujourd’hui.
2. **Ce que le système couvre et ce qu’il ne couvre pas.** Avant de configurer quoi que ce soit, on décide ce que le standard résout, ce qui se configure et ce qu’il faudrait développer.
3. **Configuration et reprise des données.** Société, plan comptable, taxes, entrepôts, produits, clients et fournisseurs, soldes d’ouverture et droits d’accès.
4. **Tests avec les personnes qui vont l’utiliser**, sur des cas réels de leur travail.
5. **Formation par profil :** achats, entrepôt, ventes, comptabilité et direction.
6. **Démarrage**, de préférence en début de mois ou, si possible, d’exercice.
7. **Accompagnement** pendant les semaines suivantes.

La règle qui sauve le plus de projets : **commencer petit**. Une société et quelques services, démarrer, puis ajouter le reste. Vouloir intégrer toutes les sociétés et toutes les applications d’un coup est la première cause d’abandon des ERP.

## Comment nous faisons chez BKLN

Nous déployons Odoo avec la comptabilité de la Guinée équatoriale, et nous développons et intégrons SAP pour les entreprises qui l’utilisent déjà. Avant de commencer, nous vous montrons [notre propre Odoo](/portfolio/bkln-en-odoo) en fonctionnement avec une entreprise de démonstration : achats importés à leur coût réel, entrepôts à Malabo et à Bata, ventes, factures et projets avec heures.

Si vous voulez savoir quelle option vous convient, [racontez-nous comment vous travaillez aujourd’hui](/servicios/erp-odoo-sap) et nous vous le dirons franchement, même si la réponse est qu’Excel vous suffit encore.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['ERP', 'Odoo', 'SAP', 'Comptabilité SYSCOHADA', 'Guinée équatoriale'],
}
