import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Comment nous avons construit une marketplace pour la Guinée équatoriale',
  excerpt: 'Des téléphones simples, la 3G et presque personne avec une carte. Les sept décisions derrière BKLN Marketplace, notre site de petites annonces pour tout le pays.',
  content: `## Le point de départ

[BKLN Marketplace](/portfolio/bkln-marketplace) est notre propre produit : un site de petites annonces pour toute la Guinée équatoriale, où chacun peut vendre une voiture, louer un appartement ou trouver un téléphone d’occasion, et où les professionnels peuvent avoir leur propre boutique.

Avant d’écrire une seule ligne de code, nous avons mis par écrit ce que ce serait et ce que ce ne serait pas. Trois réalités du marché ont guidé tout le reste :

- **Presque tout le monde navigue sur son téléphone**, souvent un Android d’entrée de gamme.
- **La connexion est lente et les données coûtent cher.** Chaque mégaoctet téléchargé par le site est payé par l’utilisateur.
- **Très peu de gens paient par carte.** L’espèce, le virement et les agences de transfert d’argent dominent.

De là viennent ces sept décisions.

## 1. Un site web, pas une application

Si quelqu’un vous envoie une annonce sur WhatsApp, vous devez pouvoir l’ouvrir tout de suite, sans rien installer. C’est pourquoi BKLN Marketplace est un site web : il se partage avec un lien, s’ouvre sur n’importe quel téléphone et Google peut trouver les annonces.

Ceux qui l’utilisent tous les jours peuvent **l’installer sur leur écran d’accueil** : il a son icône, s’ouvre sans la barre du navigateur et prévient des nouveaux messages, comme une application. Sans passer par une boutique d’applications ni prendre de place sur le téléphone.

## 2. Conçu pour un écran de 360 pixels

Chaque écran a d’abord été conçu pour la largeur d’un petit téléphone, 360 pixels, puis pour l’ordinateur. Les boutons font au moins 44 pixels pour être touchés avec le pouce, l’action principale reste toujours en bas et rien ne déborde de l’écran. La première vraie annonce a été publiée depuis un Android, pas depuis un ordinateur.

## 3. Les photos sont compressées sur le téléphone

Une photo prise avec un téléphone pèse entre 3 et 5 Mo. En envoyer cinq en 3G est lent et consomme les données du vendeur. Le site convertit donc chaque photo en WebP et la réduit **sur le téléphone lui-même, avant l’envoi**, en supprimant les données de localisation enregistrées par l’appareil photo.

Dans la première vraie annonce, trois photos pesaient entre 14 et 127 Ko chacune. Et comme le serveur n’a pas à traiter les images, la plateforme coûte moins cher à faire tourner.

## 4. Un seul aller-retour par écran

Les serveurs sont en Europe. Chaque trajet depuis Malabo prend environ 150 millisecondes : ce qui compte n’est donc pas seulement la vitesse du serveur, mais **le nombre d’allers-retours**.

Chaque écran est préparé sur le serveur avec toutes ses données demandées en même temps, et arrive sur le téléphone en une seule fois. Les pages publiques, comme les annonces ou les catégories, sont mises en cache et servies immédiatement. Le téléphone reçoit une page prête à lire, sans attendre que les éléments se chargent l’un après l’autre.

## 5. Le numéro du vendeur n’est pas public

Sur beaucoup de sites d’annonces, le vendeur doit publier son numéro, et dès lors n’importe qui peut l’obtenir. Sur BKLN Marketplace, on discute dans une **messagerie interne**, en temps réel et avec photos, et le vendeur reçoit une alerte sur son téléphone quand on lui écrit.

Si le vendeur le souhaite, il peut ajouter un bouton WhatsApp ou d’appel, mais **seuls les utilisateurs connectés le voient**. Le numéro n’apparaît jamais sur la page publique ni sur Google. Et la messagerie rappelle l’essentiel aux acheteurs : ne pas payer d’avance et se retrouver dans un lieu public.

## 6. Une formule payante sans passerelle de paiement

La formule Premium donne plus d’annonces, plus de photos, une place parmi les annonces à la une et une boutique avec sa propre adresse. Pour la faire payer, nous n’avons pas mis de passerelle de paiement par carte, car la plupart des vendeurs ne l’utiliseraient pas. Elle se règle **à notre bureau de Malabo** ou, depuis une autre ville, **par une agence de transfert d’argent**, en envoyant le code du transfert par WhatsApp. L’équipe l’active depuis le panneau d’administration, avec sa date de fin.

Les limites de chaque formule (annonces en même temps, photos, durée d’une annonce) sont dans une configuration modifiable depuis le panneau, pas dispersées dans le code. Et la plateforme est prête à ajouter le paiement mobile le moment venu, sans la refaire.

## 7. Une modération qui ne dépend pas de quelqu’un qui surveille toute la journée

Un site d’annonces vit de la confiance. Tout utilisateur peut **signaler** une annonce ou une conversation, et au troisième signalement l’annonce est masquée automatiquement jusqu’à ce qu’un modérateur l’examine. Les mots interdits sont détectés en mots entiers, pour ne pas bloquer par erreur des annonces normales, et chacun peut bloquer une autre personne.

Les permissions ne vivent pas seulement à l’écran : la base de données elle-même vérifie que chaque utilisateur ne peut voir et modifier que ses propres données. Même en manipulant une requête, personne ne peut lire les messages d’un autre ni s’attribuer Premium.

## Comment nous le testons

Plus de 500 vérifications automatiques parcourent les vrais parcours, dans la base de données et dans un navigateur de la taille d’un téléphone : s’inscrire, publier avec des photos, chercher avec des filtres, discuter entre deux navigateurs à la fois, signaler, demander Premium et modérer depuis le panneau. Et avant de l’ouvrir au public, nous le testerons sur des Android d’entrée de gamme avec un réseau lent, comme les gens vont l’utiliser.

Sous le capot, nous utilisons Next.js et React pour le site, Supabase (PostgreSQL, temps réel et stockage des photos) pour les données, et Vercel pour le servir.

## Ce qui vaut pour toute plateforme

Ces décisions ne valent pas seulement pour une marketplace. Un site d’emploi, un système de réservation ou une plateforme de livraison en Guinée équatoriale font face aux mêmes réalités : téléphones simples, données chères et paiements sans carte. Si vous pensez à une plateforme de ce type, lisez aussi [Combien coûte un site web ou une application en Guinée équatoriale ?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial) et parlez-nous de votre idée.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['Marketplace', 'Guinée équatoriale', 'Mobile', 'Next.js', 'Supabase'],
}
