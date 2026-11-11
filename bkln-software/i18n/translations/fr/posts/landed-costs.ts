import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Le coût réel de ce que vous importez : fret, douane et la marge que vous croyez faire',
  excerpt: 'Si vous calculez vos prix à partir de ce que vous payez au fournisseur, vous gagnez probablement moins que vous ne le pensez. Ce qu’il faut ajouter à chaque produit importé, comment le répartir et comment arrêter de le faire à la main.',
  content: `## Le prix du fournisseur n’est pas votre coût

En Guinée équatoriale, presque tout ce qui se vend vient de l’étranger : d’Europe, d’Asie, du Cameroun ou de Dubaï. Et presque toutes les entreprises fixent leurs prix de la même façon : ce qu’elles paient au fournisseur, plus un pourcentage.

Le problème, c’est que le prix du fournisseur n’est qu’une partie de ce que vous coûte un produit une fois dans votre entrepôt. Le reste arrive après, sur d’autres factures, parfois des semaines plus tard : le bateau ou l’avion, la douane, le port, le camion jusqu’à votre entrepôt. Si vous ne l’ajoutez pas à chaque produit, vous fixez vos prix sur un coût qui n’est pas le vrai.

## Ce qu’il faut ajouter

Ce qu’en comptabilité on appelle les **coûts logistiques** (ou frais d’approche) comprend généralement :

- **Le prix du fournisseur**, converti en francs CFA au taux du jour du paiement. Avec l’euro c’est simple, car la parité est fixe (1 euro = 655,957 FCFA) ; avec le dollar, le taux varie.
- **Le fret**, maritime ou aérien, et l’assurance de la marchandise si vous en prenez une.
- **La douane** : droits, taxes et redevances d’importation.
- **Le port et le transitaire** : manutention, magasinage si la marchandise attend, et les honoraires de celui qui fait les formalités.
- **Le transport du port ou de l’aéroport jusqu’à votre entrepôt.**
- **Les frais bancaires** du virement international, s’ils sont importants.

## Un exemple chiffré

Prenons une commande de démonstration à un fournisseur européen : 28 équipements informatiques pour une valeur de 5 710 000 FCFA. Trois autres factures arrivent ensuite : fret de 480 000 FCFA, douane de 1 350 000 FCFA et transport du port à l’entrepôt de 85 000 FCFA. Au total, 1 915 000 FCFA de plus, soit 33 % de la valeur de la commande.

L’un de ces équipements, un ordinateur portable, a coûté 410 000 FCFA sur la facture du fournisseur. Une fois les frais répartis, son coût réel en entrepôt est de **544 436 FCFA**.

Imaginez maintenant que vous le vendez 565 000 FCFA. Si vous calculez la marge à partir du prix du fournisseur, vous croyez gagner 155 000 FCFA par ordinateur. En réalité, vous gagnez environ **20 500**. Multipliez cela par chaque produit et chaque commande de l’année.

## Comment répartir les frais

Les frais d’un envoi doivent être répartis entre les produits arrivés avec lui. Il existe plusieurs méthodes, chacune adaptée à un type de frais :

- **Par valeur :** chaque produit supporte une part proportionnelle à son prix. C’est la méthode la plus courante pour la douane, car les droits se calculent sur la valeur.
- **Par quantité :** chaque unité supporte le même montant. Utile pour les frais qui ne dépendent pas de la valeur, comme le déchargement ou la manutention.
- **Par poids ou par volume :** le plus juste pour le fret quand vous mélangez des produits légers et lourds dans le même conteneur.

L’essentiel est de choisir une méthode, de l’appliquer toujours de la même façon et de le faire à chaque envoi, pas « au jugé » une fois par an.

## Coût moyen : quand le même produit arrive plusieurs fois

Si vous achetez le même produit en plusieurs envois, chacun arrivera avec un coût différent, parce que le fret, le cours du dollar ou les droits changent. Le plus pratique est de travailler au **coût moyen** : chaque nouvelle entrée se mélange à ce que vous aviez déjà en entrepôt et le coût unitaire est recalculé. Ainsi, vos marges reflètent ce que vous a vraiment coûté le stock que vous vendez aujourd’hui.

## Dans Excel ou dans un système

On peut le faire dans Excel, et c’est bien mieux que de ne pas le faire. Mais cela demande de la rigueur : conserver toutes les factures de chaque envoi, les répartir à la main, mettre à jour le coût de chaque produit et ne se tromper dans aucune formule. Et quand vous avez besoin du chiffre, pour fixer un prix ou négocier une remise, il est souvent dépassé.

Un ERP comme Odoo le fait dans le cadre du travail quotidien. Vous réceptionnez la marchandise en entrepôt, enregistrez les factures de fret, de douane et de transport liées à cette réception, choisissez comment répartir chaque frais, et le système met à jour le coût de chaque produit. Dès lors, chaque vente affiche sa vraie marge et la comptabilité enregistre la bonne valeur du stock.

## Comment nous faisons chez BKLN

Dans [notre Odoo de démonstration](/portfolio/bkln-en-odoo), vous pouvez voir exactement cet exemple : la commande en euros, la réception dans l’entrepôt de Malabo, les coûts logistiques répartis et le coût de chaque produit mis à jour.

Si vous importez et voulez savoir combien vous gagnez vraiment sur chaque produit, [nous vous aidons à le mettre en place](/servicios/erp-odoo-sap), avec Odoo ou, si vous n’en avez pas encore besoin, avec un tableur bien conçu.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['Importation', 'Coûts', 'Stock', 'ERP', 'Guinée équatoriale'],
}
