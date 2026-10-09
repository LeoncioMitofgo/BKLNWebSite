import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Un assistant IA qui répond à votre place sur WhatsApp et sur votre site',
  excerpt: 'Il répond à vos clients à toute heure avec les informations que vous lui donnez, prend des commandes et vous envoie des rapports. Comment il fonctionne vraiment, quelles permissions lui donner et où sont ses limites.',
  content: `## Ce que c’est, et ce que ce n’est pas

Un assistant d’intelligence artificielle est un programme qui converse par écrit avec vos clients, sur WhatsApp ou dans le chat de votre site, et leur répond comme le ferait quelqu’un de votre équipe. La différence avec les robots d’avant, ceux du « tapez 1 pour les prix », c’est qu’il comprend les questions écrites naturellement, même avec des fautes ou mal formulées, et répond avec des phrases normales.

Ce que ce n’est pas : ce n’est pas un employé doté de son propre jugement, et il ne connaît rien de votre activité par magie. Il sait ce que vous lui donnez et fait ce que vous lui permettez.

## Comment il sait ce qu’il sait

Il y a souvent une confusion à ce sujet. L’assistant n’apprend pas tout seul en lisant vos conversations et ne s’entraîne pas de lui-même. Ce qu’il fait, c’est consulter une base d’informations que vous préparez :

- Votre catalogue, avec les prix et la disponibilité.
- Les horaires, l’adresse et les moyens de paiement.
- Les questions fréquentes et leurs réponses.
- Les conditions de livraison, de retour ou de réservation.
- Si c’est pour votre profil professionnel : vos services, votre expérience, vos tarifs et votre façon de travailler.

Quand un client pose une question, l’assistant cherche dans ces informations ce qui correspond et rédige sa réponse à partir de là. Si la réponse n’y est pas, le bon comportement est de le dire et de transmettre la conversation à une personne, pas d’inventer.

C’est pourquoi un assistant ne vaut que par les informations que vous lui donnez. Si vous changez un prix sans le mettre à jour, il continuera de donner l’ancien.

## Où il peut répondre

- **WhatsApp.** C’est là que sont vos clients. Pour y connecter un assistant, il faut la plateforme WhatsApp Business de Meta (l’API), pas l’application habituelle du téléphone. Sachez qu’on utilise normalement un numéro dédié, que Meta peut vous demander de vérifier votre entreprise et qu’il facture certains messages, surtout ceux que votre entreprise envoie sans que le client ait écrit d’abord. De plus, si le client ne vous a pas écrit depuis plus de 24 heures, vous ne pouvez le contacter qu’avec des modèles de messages approuvés par Meta.
- **Le chat de votre site.** Une fenêtre de conversation sur votre page, comme celle qui se trouve en bas à droite de celle-ci.
- **L’e-mail.** Il peut lire ce qui arrive sur une adresse, répondre aux messages simples et vous laisser le reste classé.
- **D’autres canaux**, comme Messenger ou Instagram, peuvent être ajoutés avec un peu plus de travail d’intégration.

Un avantage : c’est le même assistant sur tous les canaux, avec les mêmes informations. Vous modifiez une donnée une fois et elle vaut partout.

## Ce qu’il peut faire pour vous

- **Répondre à toute heure**, y compris la nuit et le week-end.
- **Prendre des commandes ou des réservations.** Il recueille ce que veut le client, le nombre d’unités, l’adresse ou la date, et l’enregistre pour que vous ou votre équipe le confirmiez.
- **Informer sur l’état d’une commande.** S’il est connecté à votre système, il peut vérifier où elle en est et répondre au « quand est-ce que ma commande arrive ? ».
- **Prendre des rendez-vous**, si vous le connectez à votre agenda.
- **Passer la main à une personne** quand le client le demande, quand il ne connaît pas la réponse ou quand il détecte une réclamation.
- **Faire des rapports.** Un résumé quotidien ou hebdomadaire : combien de conversations il y a eu, ce qu’on a le plus demandé, quelles commandes sont arrivées et, très utile, à quelles questions il n’a pas su répondre. Cette liste vous dit exactement quelles informations lui manquent.
- **Répondre en plusieurs langues.** Espagnol, français ou anglais, selon la langue du client. Avec les langues locales, n’attendez pas le même niveau.
- **Comprendre les messages vocaux**, s’il est configuré pour les transcrire. Sur WhatsApp, beaucoup de gens préfèrent envoyer des audios : mieux vaut le prévoir dès le départ.

## Les permissions : c’est vous qui fixez les limites

Qu’il puisse répondre à votre place ne veut pas dire qu’il peut tout faire. Le plus sensé est de lui donner des permissions par niveaux :

1. **Informer seulement.** Il répond avec les informations que vous lui avez données. C’est le point de départ recommandé.
2. **Recueillir des données.** Il prend des commandes, des réservations ou des demandes, qui restent en attente jusqu’à ce que quelqu’un les confirme.
3. **Agir dans un cadre.** Il confirme lui-même des commandes ou des rendez-vous, mais uniquement dans des limites claires : créneaux disponibles, produits en stock, montants maximums.
4. **Demander l’autorisation pour ce qui est délicat.** Remises, retours, changements de prix ou tout engagement inhabituel : l’assistant le prépare et vous l’approuvez d’un geste.

Et il y a des choses qu’il ne devrait jamais faire : inventer des prix ou des conditions, partager les données d’un client avec un autre, ou considérer comme valide un paiement que personne n’a vérifié.

## Aussi pour votre profil professionnel

Il ne sert pas qu’aux boutiques. Si vous êtes consultant, avocat, formateur ou indépendant, un assistant peut présenter vos services, répondre aux questions fréquentes, filtrer les personnes qui vous écrivent et proposer un rendez-vous dans votre agenda. Vous arrivez à la réunion en sachant déjà ce dont l’autre personne a besoin.

Un conseil : séparez bien le professionnel du personnel. Ne lui donnez que les informations que vous acceptez que n’importe qui lise, car n’importe qui peut l’interroger.

## Les limites à connaître

- **Il peut se tromper.** Avec de bonnes informations, il se trompe peu, mais il n’est pas infaillible. Relisez des conversations de temps en temps, surtout au début.
- **Il ne remplace pas les relations importantes.** Un gros client ou une réclamation sérieuse méritent que vous répondiez vous-même.
- **Dites que c’est un assistant.** Vos clients doivent savoir qu’ils parlent à un assistant automatique et comment joindre une personne. Cela inspire plus confiance que d’essayer de le cacher.
- **Il a un coût d’utilisation.** En plus de la mise en place, chaque conversation consomme du service d’intelligence artificielle et, sur WhatsApp, peut entraîner un coût facturé par Meta. Demandez comment il est calculé avant de commencer.
- **Il faut l’entretenir.** Quand vos prix, vos horaires ou vos produits changent, il faut mettre à jour ses informations.

## Comment commencer

1. **Rassemblez les informations :** catalogue, prix, horaires, questions fréquentes et conditions. Si vous les avez déjà dans des documents ou sur votre site, cela suffit.
2. **Commencez par le chat du site**, plus simple, et ajoutez WhatsApp ensuite.
3. **Les premières semaines, ne lui donnez que la permission d’informer.**
4. **Chaque semaine, relisez les questions auxquelles il n’a pas su répondre** et complétez ses informations.
5. **Élargissez ses permissions** (commandes, rendez-vous) quand vous avez confiance dans ses réponses.

## Comment nous le faisons chez BKLN

BrookAI est notre assistant pour les entreprises. Il répond uniquement avec les documents que vous lui fournissez (catalogues, manuels, questions fréquentes, listes de prix), fonctionne sur votre site avec un extrait de code et sur WhatsApp Business, et transmet la conversation à une personne quand il ne sait pas répondre. Depuis son tableau de bord, vous ajoutez des documents, réglez son nom et son ton, consultez l’historique et voyez à quelles questions il n’a pas su répondre. Les connexions avec votre messagerie, votre agenda ou votre système de commandes sont développées sur mesure, selon vos besoins.

Vous pouvez essayer dès maintenant un assistant de ce type : le chat de ce site fonctionne ainsi et ne répond qu’avec des informations sur BKLN.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['Intelligence artificielle', 'WhatsApp', 'Service client', 'Automatisation'],
}
