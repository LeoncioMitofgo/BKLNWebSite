import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Comment digitaliser la gestion d’une école en Guinée équatoriale',
  excerpt: 'Du cahier et d’Excel à un système que tout le personnel peut utiliser : par où commencer, ce qu’il faut décider d’abord (cloud ou sans internet, qui accède à quoi) et comment faire la transition sans perdre l’année scolaire.',
  content: `## Le point de départ de nombreuses écoles

Les élèves dans un fichier Excel, les paiements des inscriptions notés dans un cahier, les bulletins remplis à la main à la fin de chaque trimestre. Cela fonctionne tant que l’école est petite et qu’une seule personne sait tout. Quand elle grandit, les problèmes commencent : des données répétées dans plusieurs fichiers, des paiements dont personne ne sait s’ils ont été encaissés, des bulletins qui prennent des semaines et des listes de classe à refaire chaque fois que quelqu’un change de groupe.

Digitaliser, ce n’est pas acheter des ordinateurs. C’est faire en sorte que les informations de chaque élève se trouvent à un seul endroit, que chacun voie ce dont il a besoin et que les documents se produisent tout seuls.

## Ce qu’il vaut mieux digitaliser en premier

Inutile de tout faire en même temps. Cet ordre fonctionne généralement bien :

1. **Le dossier de l’élève.** Données personnelles, responsable légal, contact d’urgence et observations médicales. C’est la base de tout le reste.
2. **Inscriptions et paiements.** Ce que chaque famille a payé, ce qu’elle doit et depuis quand. C’est ce qui fait gagner le plus de temps au secrétariat et évite le plus de discussions.
3. **Classes, niveaux et enseignants.** Qui est dans quel groupe et qui enseigne chaque matière.
4. **Notes et bulletins.** Une fois tout cela en ordre, le bulletin trimestriel est généré à partir des notes au lieu d’être écrit à la main.
5. **Communications.** Circulaires et avis pour le personnel et les familles.

## Une décision clé : dans le cloud ou sans internet

Un système dans le cloud s’utilise de n’importe où, mais il dépend d’une connexion qui fonctionne au moment précis où la secrétaire a une famille en face d’elle. Un système installé sur le réseau local de l’école fonctionne même sans internet : le serveur est au bureau et les autres ordinateurs de l’établissement y accèdent depuis le navigateur.

Aucune option ne l’emporte dans tous les cas. Si la connexion de votre école est stable et que vous voulez consulter les données depuis chez vous, le cloud a du sens. Si la connexion coupe souvent, un système local apporte de la tranquillité. Dans ce cas, demandez toujours comment se font les sauvegardes, car les données sont sur un seul ordinateur.

## Qui peut voir quoi

Une école manipule des données sensibles : informations médicales, situation des paiements et notes de mineurs. Tout le personnel n’a pas besoin de tout voir.

- La **direction ou l’administration** a besoin de la vue d’ensemble.
- Le **secrétariat** gère les élèves, les inscriptions et les documents.
- Les **enseignants**, s’ils utilisent le système, ne devraient voir et modifier que les notes de leurs propres groupes.

Exigez que chaque personne se connecte avec son propre identifiant et son propre mot de passe, jamais avec un compte partagé. Ainsi, on sait qui a fait chaque modification.

## Les documents qui devraient se produire tout seuls

Un bon système scolaire fait gagner des heures de paperasse. Vérifiez qu’il peut générer, prêts à imprimer :

- Les cartes d’élève.
- Les listes d’élèves par classe.
- Les bulletins trimestriels.
- L’historique des paiements de chaque famille.

## Comment faire la transition sans perdre l’année scolaire

- **Choisissez bien le moment.** L’idéal est de démarrer avant la rentrée ou entre deux trimestres, jamais en pleine période d’examens.
- **Demandez comment seront reprises les données que vous avez déjà.** Ressaisir chaque élève un par un est la partie la plus lourde du changement ; mieux vaut savoir dès le départ qui s’en charge et comment.
- **Formez le personnel.** Une ou deux sessions pratiques avec les personnes qui utiliseront le système chaque jour valent mieux que n’importe quel manuel.
- **Gardez l’ancienne méthode quelques semaines.** Pendant le premier mois, il est utile de pouvoir comparer avec le fichier Excel au cas où quelque chose ne correspondrait pas.
- **Désignez un responsable.** Quelqu’un de l’école qui connaît bien l’outil et sert d’interlocuteur avec le prestataire.

## Combien ça coûte

Il existe deux modèles courants : payer une licence en une fois ou payer un abonnement. Avec la licence, la dépense est plus élevée au départ ; avec l’abonnement, elle est plus faible au départ, mais continue. Dans les deux cas, demandez ce qui est inclus : installation, formation, mises à jour et ce qui se passe en cas de panne. Pour comprendre ce qui fait varier le prix d’un projet logiciel, lisez notre guide [Combien coûte un site web ou une application en Guinée équatoriale ?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial).

## Comment nous le faisons chez BKLN

GestEscolar est le système de gestion scolaire que nous avons développé pour les écoles. Il fonctionne sans internet sur le réseau local de l’établissement, s’installe sur un ordinateur Windows et couvre les élèves, les inscriptions avec suivi des paiements, les notes par trimestre, les enseignants, les salles et les circulaires. Il génère cartes d’élève, listes de classe, bulletins et historiques de paiement prêts à imprimer, et comprend l’installation, un manuel et deux jours de formation du personnel.

Si vous voulez le voir en fonctionnement, demandez-nous une démonstration.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['Éducation', 'Gestion scolaire', 'Digitalisation', 'Guinée équatoriale'],
}
