import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Caisse, stock et contrôle depuis le téléphone : guide pour pharmacies, supermarchés et restaurants',
  excerpt: 'Ce que doit offrir un système de gestion pour votre commerce : une caisse juste, un stock à jour, des permissions pour chaque employé et votre activité dans votre téléphone, même quand vous n’êtes pas là. Avec les spécificités des pharmacies, supermarchés, restaurants et bars.',
  content: `## Le problème : ne pas savoir ce qui se passe en votre absence

Si vous tenez une pharmacie, un supermarché ou un restaurant, cela vous dit sûrement quelque chose : à la fermeture, la caisse ne tombe pas juste et personne ne sait pourquoi. Un produit est en rupture sans que personne ne prévienne. Vous découvrez qu’un article a expiré quand il est déjà à la poubelle. Et si vous n’êtes pas sur place, le seul moyen de savoir comment se passe la journée, c’est de téléphoner.

Un système de gestion, qu’on appelle aussi logiciel de caisse ou point de vente, règle une bonne partie de ces problèmes. Ce n’est pas seulement une caisse enregistreuse moderne : c’est le registre de tout ce qui entre, sort et s’encaisse dans votre commerce, consultable depuis votre téléphone.

## Les quatre piliers d’un bon système

### 1. La caisse

Tout commence ici. Chaque vente est enregistrée avec ses produits, son montant, l’heure et la personne qui l’a faite. Ce qu’elle devrait offrir :

- **Ouverture et clôture par équipe.** Le caissier ouvre avec un fonds de caisse et, à la clôture, le système calcule ce qu’il devrait y avoir. Si l’argent compté ne correspond pas, l’écart est enregistré avec un nom et une heure.
- **Plusieurs moyens de paiement.** Espèces, virement, paiement mobile ou carte, et la possibilité de les combiner dans une même vente.
- **Ticket imprimé ou numérique.** Une petite imprimante thermique suffit ; le ticket peut aussi être envoyé par WhatsApp.
- **Annulations et remises sous contrôle.** Un caissier ne devrait pas pouvoir supprimer une vente ni accorder une grosse remise sans l’autorisation d’un responsable. Chaque annulation est enregistrée.

### 2. Le stock

- **Un stock qui se met à jour tout seul.** Si vous vendez une boîte de paracétamol, le système retire une unité. Plus besoin de compter à la main pour savoir ce qui reste.
- **Réceptions de marchandises.** Quand une commande fournisseur arrive, elle est enregistrée et le stock augmente.
- **Alertes de seuil minimum.** Vous fixez un minimum pour chaque produit et le système vous prévient avant la rupture.
- **Inventaires réguliers.** Compter de temps en temps ce qu’il y a en rayon et le comparer à ce qu’indique le système révèle la démarque, la casse et les vols.

### 3. Les utilisateurs et leurs permissions

Chaque personne se connecte avec son propre compte ou un code PIN et ne peut faire que ce que son poste exige. Une répartition courante :

- **Propriétaire :** voit tout, de n’importe où : rapports, marges et tous les points de vente.
- **Gérant ou responsable :** gère les produits et les prix, autorise annulations et remises, clôture la caisse et consulte les rapports de son point de vente.
- **Caissier :** vend et encaisse. Il ne modifie pas les prix et ne supprime pas de ventes.
- **Serveur**, dans les restaurants et les bars : ouvre les tables et prend les commandes ; l’encaissement se fait en caisse.
- **Magasinier :** enregistre les réceptions de marchandises et les inventaires, sans accès à la caisse.

Que chaque action soit signée par son auteur, ce n’est pas se méfier de son équipe. C’est ce qui permet d’expliquer un écart de caisse en cinq minutes au lieu d’en discuter pendant une semaine.

### 4. Votre activité dans votre téléphone

C’est là que se trouve le vrai changement. Depuis votre téléphone, où que vous soyez, vous voyez :

- Les ventes du jour en temps réel, par caisse et par point de vente.
- Les produits les plus vendus et les heures d’affluence.
- Les ventes de chaque employé.
- Les alertes de stock bas, de produits bientôt périmés, d’annulations ou d’écarts de caisse.
- Un résumé en fin de journée qui vous arrive sans avoir à le demander.

Si vous avez plusieurs points de vente, ils apparaissent tous sur le même tableau de bord.

## Les spécificités de chaque commerce

### Pharmacies

- **Lots et dates de péremption.** Chaque réception est enregistrée avec son lot et sa date, et le système vous prévient à temps de ce qui va expirer pour le vendre en priorité ou le retourner au fournisseur.
- **Premier périmé, premier sorti.** À la vente, le système indique quel lot délivrer.
- **Recherche rapide** par nom commercial ou par principe actif, pour proposer une alternative quand un médicament est en rupture.
- **Registre des médicaments vendus sur ordonnance**, si vous devez en assurer le suivi.

### Supermarchés et boutiques

- **Lecteur de codes-barres.** Encaisser en scannant est plus rapide et évite les erreurs de prix.
- **Produits au poids**, avec une balance connectée ou au moins un prix au kilo.
- **Des milliers de produits** classés par catégorie et par fournisseur, avec des changements de prix en masse.
- **Achats fournisseurs :** quoi commander, en quelle quantité et à qui, selon ce qui se vend réellement.
- **Marge par produit**, pour savoir ce qui vous rapporte et ce qui ne fait qu’occuper le rayon.

### Restaurants et bars

- **Plan de salle.** D’un coup d’œil, les tables libres, occupées ou en attente de paiement.
- **Commandes envoyées en cuisine et au bar.** Le serveur prend la commande sur un téléphone ou une tablette et elle arrive directement en cuisine, imprimée ou à l’écran. Fini les bons qui se perdent.
- **Partager l’addition** entre plusieurs personnes ou encaisser chaque part séparément.
- **Suivi des ingrédients.** Si un burger contient 150 grammes de viande, chaque vente retire cette quantité du stock. Vous savez ainsi ce qui devrait rester et vous repérez le gaspillage.
- **Le coût de chaque plat** à partir de ses ingrédients, pour fixer des prix en connaissance de cause.

## Ce qu’il faut prendre en compte ici

- **Qu’il continue de fonctionner sans internet.** Si la connexion tombe, la caisse doit continuer de vendre et se synchroniser à son retour. Demandez toujours ce qui se passe hors connexion avant de choisir un système.
- **Les coupures de courant.** Un terminal avec batterie ou un petit onduleur évite de perdre une vente en cours.
- **Les paiements sans carte.** Le système doit bien enregistrer les espèces, les virements et les paiements mobiles, qui représentent l’essentiel des encaissements dans beaucoup de commerces.
- **Un matériel simple.** Un terminal ou une tablette Android, une imprimante de tickets, un tiroir-caisse et, si vous vendez beaucoup de produits, un lecteur de codes-barres. Pas besoin d’un ordinateur coûteux.
- **Les sauvegardes.** Vos ventes et votre stock sont la mémoire de votre commerce : vérifiez qu’ils sont aussi sauvegardés en dehors du local.

## Comment le mettre en place sans arrêter l’activité

1. **Chargez le catalogue :** produits, prix et, si vous en avez, codes-barres. S’ils sont déjà dans un fichier Excel, demandez s’ils peuvent être importés.
2. **Faites un inventaire initial** pour que le stock de départ soit réel.
3. **Créez les utilisateurs** avec leurs permissions.
4. **Formez l’équipe** avec des ventes d’essai avant l’ouverture.
5. **Commencez par une seule caisse ou une seule équipe** et élargissez quand tout fonctionne.
6. **Vérifiez la première clôture de caisse** avec le responsable.

## Combien ça coûte

Il existe des systèmes avec abonnement mensuel et des systèmes avec licence propre, auxquels il faut ajouter le matériel. Ce qui fait le plus monter le prix, c’est généralement ce qui est propre à votre commerce : balances, plusieurs points de vente, commandes en cuisine ou rapports sur mesure. Pour comprendre ce qui fait varier le prix d’un projet logiciel, lisez [Combien coûte un site web ou une application en Guinée équatoriale ?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial).

## Comment nous le faisons chez BKLN

Nous avons développé un [système de caisse pour terminaux Android](/portfolio/sistema-pos-android-comercios) avec caisse, clôture d’équipe validée par le serveur, impression des tickets, accès de chaque opérateur avec son code PIN et un tableau de bord mobile depuis lequel le propriétaire suit les ventes en temps réel. Il continue de vendre quand la connexion lâche et se synchronise dès qu’elle revient. Sur cette base, nous adaptons ce dont votre commerce a besoin : lots et dates de péremption pour une pharmacie, codes-barres pour un supermarché, ou tables et commandes en cuisine pour un restaurant.

Expliquez-nous comment fonctionne votre commerce aujourd’hui et nous vous proposerons comment l’organiser.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['Point de vente', 'Gestion d’entreprise', 'Stock', 'Restaurants'],
}
