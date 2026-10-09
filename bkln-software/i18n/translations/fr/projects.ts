import type { ProjectText } from '../../content'

export const projects: Record<string, ProjectText> = {
  zentry: {
    description: 'Une application multiplateforme de gestion d’événements et de contrôle d’accès par QR code — billets VIP, Standard et Staff, scanner en temps réel avec son et vibration, disponible sur Android, iOS, Web et ordinateur.',
    longDescription:
      'Organiser un événement à Malabo, c’était des listes sur papier, des billets photocopiés et un contrôle d’accès manuel. Avec Zentry, l’organisateur crée l’événement en quelques minutes, ajoute les invités depuis son téléphone et partage le QR code de chacun directement sur WhatsApp — d’un simple geste.\n\nÀ l’entrée, le staff scanne les codes avec la caméra de l’appareil. Le système répond en moins d’une seconde : billet valide, déjà scanné, capacité atteinte ou code invalide — chaque cas avec un son et une vibration distincts, pour que le staff n’ait pas à regarder l’écran dans un environnement bruyant. Les entrées en double sont impossibles.\n\nLe tableau de bord affiche en temps réel le nombre de personnes entrées, celles encore attendues et le taux de remplissage. Tout est synchronisé instantanément entre tous les appareils de l’équipe.\n\nZentry fonctionne sur Android, iOS, Web, Windows, macOS et Linux à partir d’une seule application — l’organisateur gère depuis son ordinateur portable et le staff contrôle depuis son téléphone, sans installer d’applications différentes.',
    sector: 'Événementiel',
    challenges: [
      'Empêcher deux membres du staff de valider le même QR code au même moment — une situation de concurrence à l’entrée',
      'Un retour instantané dans les environnements bruyants : le scanner doit communiquer sans dépendre uniquement du son',
      'Partager des QR codes individuels sur WhatsApp en haute résolution depuis un téléphone',
      'Une seule application qui fonctionne sur Android, iOS, Web et ordinateur sans dupliquer le code',
    ],
    solutions: [
      'Une requête Supabase avec mise à jour atomique du statut — si deux appareils scannent le même QR code en même temps, un seul passe',
      'Une combinaison son + vibration avec des motifs distincts selon le résultat, avec repli sur la vibration seule',
      'Export du QR code en image haute résolution (ratio de pixels 3x) avant le partage',
      'Flutter, avec une logique séparée par plateforme uniquement là où c’est strictement nécessaire',
    ],
  },
  brookai: {
    description: 'Un chatbot SaaS d’IA multi-tenant : un bot de service client qui apprend à partir des documents de l’entreprise, s’intègre à n’importe quel site et à WhatsApp, et passe la main à un agent humain.',
    longDescription:
      'BrookAI est né d’un besoin concret : des entreprises qui voulaient répondre à leurs clients en dehors des heures de bureau sans embaucher davantage. Le bot répond uniquement à partir des documents de l’entreprise (RAG avec pgvector et LangChain) ; il n’invente rien et n’hallucine pas — s’il ne sait pas, il le dit et passe la main à un humain.\n\nL’architecture est multi-tenant dès la conception : chaque client dispose de son propre espace isolé avec ses documents, son historique et sa configuration. Le même système en production sert plusieurs entreprises sans qu’aucune ne voie les données des autres.\n\nL’intégration sur le site du client tient en un seul extrait de JavaScript — aucune dépendance à installer, aucune modification du backend existant. Le widget s’initialise avec la clé d’API du client et commence à répondre immédiatement. L’intégration avec l’API WhatsApp Business emmène le même bot sur le canal de messagerie le plus utilisé du marché.\n\nLe tableau d’administration (React + Vite) permet de gérer les documents, de consulter tout l’historique des conversations, de voir à quelles questions le bot n’a pas su répondre (un signal direct de la documentation manquante) et de régler le ton et le nom du bot — le tout sans toucher au code.\n\nStack : FastAPI · Python · Claude API (Anthropic) · LangChain · pgvector · Supabase · Widget Vanilla JS · React + Vite · WhatsApp Business API. Dockerisé, avec CI/CD, et déployé sur notre propre serveur.',
    sector: 'Service client',
    challenges: [
      'Un RAG fiable : le bot ne doit répondre qu’avec les informations réelles du client, sans halluciner ni mélanger les données d’autres clients',
      'Une isolation totale entre clients — documents, vecteurs et conversations doivent rester invisibles d’un client à l’autre',
      'Un widget JS intégrable sans casser les styles ni le JavaScript du site hôte',
      'L’intégration avec l’API WhatsApp Business : validation de la signature Meta et gestion des sessions par numéro de téléphone',
    ],
    solutions: [
      'Un filtre tenant_id sur toutes les recherches pgvector — chaque requête RAG n’accède qu’aux fragments du client concerné',
      'Row Level Security dans Supabase + clés d’API hachées par client — impossible d’accéder aux données d’un autre même en manipulant la requête',
      'Shadow DOM pour le widget : styles et scripts entièrement encapsulés, aucun conflit avec le site hôte',
      'Un point de terminaison webhook avec validation X-Hub-Signature-256 et des sessions de conversation indexées par numéro de téléphone',
    ],
  },
  gestescolar: {
    description: 'Un système complet de gestion scolaire pour les établissements de Guinée équatoriale — élèves, inscriptions, notes, paiements et documents imprimables. Fonctionne sans internet, installation en un clic.',
    longDescription:
      'La plupart des écoles de Guinée équatoriale gèrent leurs élèves dans Excel, leurs paiements dans des cahiers et leurs bulletins à la main. GestEscolar numérise tout ce processus dans un système que n’importe quelle secrétaire peut apprendre à utiliser en une journée.\n\nDès le premier jour, l’école peut inscrire les élèves avec un dossier complet (informations médicales, responsable légal, documents), gérer les inscriptions avec le suivi des paiements, saisir les notes par trimestre et générer des bulletins prêts à imprimer. Les cartes d’élève sont produites automatiquement. Les listes de classe aussi. Le tout depuis le navigateur, sans rien installer sur chaque poste.\n\nLe système fonctionne entièrement sans internet — il tourne sur le réseau local de l’établissement. Si le serveur s’éteint, personne ne perd de données : tout est dans la base de données locale. Pour l’utiliser depuis un autre poste de l’école, il suffit d’ouvrir le navigateur et de saisir l’adresse IP du serveur.\n\nL’installation complète prend moins de 5 minutes : un fichier .bat configure l’environnement Python, crée la base de données et démarre le serveur. Aucune connaissance en informatique n’est nécessaire pour l’installer ou l’entretenir.',
    sector: 'Éducation',
    challenges: [
      'Des écoles sans internet ni serveur cloud — tout doit fonctionner hors ligne sur le réseau local',
      'Un personnel non technique : l’installation ne peut exiger aucune connaissance en informatique',
      'Une hiérarchie scolaire complexe : Cycle → Niveau → Classe → Matière → Élève, avec l’historique conservé',
      'Des bulletins, des listes et des cartes imprimables directement depuis le navigateur',
    ],
    solutions: [
      'SQLite en local avec accès via le réseau — sans dépendances externes, sans abonnement, sans cloud',
      'Un script .bat qui installe Python et les dépendances et démarre le serveur d’un double clic',
      'Un modèle de données de 14 tables avec suppression logique — les enregistrements supprimés restent dans l’historique',
      'CSS @media print avec des classes .no-print pour produire des documents propres depuis n’importe quelle vue',
    ],
  },
  'sistema-pos-android-comercios': {
    title: 'Système de caisse Android pour commerces',
    description: 'Un système de point de vente pour terminaux Android avec catalogue, opérateurs, clôture de caisse, impression et tableau de bord de gestion à distance.',
    longDescription:
      'Nous avons développé un système de caisse Android et un tableau de bord mobile pour gérer produits, opérateurs, terminaux, ventes et recettes à partir d’un même backend.\n\nSur le terminal, l’opérateur se connecte avec un code PIN validé par le serveur, enregistre la vente, imprime le reçu et peut continuer à travailler avec un cache local quand la connexion est instable. Le tableau de bord permet de suivre les ventes, les produits et les terminaux sans interrompre le travail au comptoir.\n\nL’intégration matérielle couvre l’impression et la lecture sans contact via le SDK de l’appareil. Le flux EMV a été préparé et testé sur du matériel de développement ; l’autorisation bancaire réelle nécessite encore un acquéreur, des clés de production et une certification spécifique.\n\nStack : Kotlin · Jetpack Compose · Hilt · Room · Retrofit · WorkManager · Supabase · PostgreSQL.',
    sector: 'Commerce et restauration',
    challenges: [
      'Garder le processus de vente disponible quand la connexion est intermittente',
      'Éviter que deux comptoirs réclament le même terminal ou dupliquent une vente si la connexion se coupe en pleine opération',
      'Une clôture de caisse toujours juste, même si l’appareil perd le réseau au moment de fermer la journée',
      'Une deuxième application de gestion qui reflète l’activité en temps réel sans ralentir le terminal de paiement au comptoir',
    ],
    solutions: [
      'Intégration avec le SDK du terminal pour l’impression et la lecture sans contact, avec un retour clair en cas d’erreur ou de délai dépassé',
      'Une file d’attente locale avec WorkManager qui se synchronise en arrière-plan, l’attribution des terminaux étant résolue de façon atomique côté backend',
      'Une clôture de caisse validée par le serveur — l’état distant fait toujours foi, l’appareil ne « suppose » jamais qu’une clôture a été appliquée',
      'Un tableau de bord sur le même backend avec son propre cycle de synchronisation — le gérant voit l’activité en temps réel sans toucher au travail du comptoir',
    ],
  },
  'plataforma-delivery-multivertical': {
    title: 'Plateforme de livraison multicatégorie',
    description: 'Un écosystème web et mobile pour les commandes, les commerces et les livreurs, avec attribution, tarifs et suivi en temps réel.',
    longDescription:
      'Nous avons conçu une plateforme de logistique à la demande avec des applications distinctes pour les clients et les livreurs, ainsi que des tableaux de bord pour l’exploitation. Le système couvre la restauration, les courses, la pharmacie et les colis à partir d’une architecture commune.\n\nLe parcours principal couvre le catalogue, le panier, le paiement, la création de commandes, les offres temporaires aux livreurs, les statuts de livraison, les gains et le suivi en temps réel. La logique sensible s’exécute dans des fonctions côté serveur et les applications partagent les types, les règles et les composants métier.\n\nLe projet a été construit avec une attention particulière au contexte local : montants entiers en FCFA, connectivité variable, règles d’annulation explicites et permissions renforcées dans la base de données.',
    sector: 'Logistique et livraison',
    status: 'En développement',
    challenges: ['Coordonner clients, commerces et livreurs avec des statuts valides et cohérents', 'Attribuer les commandes avec des offres limitées dans le temps sans dépendre d’interrogations continues', 'Calculer les tarifs et protéger les opérations critiques côté serveur', 'Partager les contrats de données entre les applications Flutter et les tableaux de bord web'],
    solutions: ['Des Edge Functions pour créer les commandes, calculer les tarifs et attribuer les livreurs', 'Supabase Realtime pour le suivi et les offres, avec RLS et triggers pour renforcer les permissions', 'Des paquets partagés pour les énumérations, les constantes, le thème et les règles métier', 'Les parcours principaux vérifiés de bout en bout sur un appareil physique'],
  },
  'suite-herramientas-web-privadas': {
    title: 'Suite d’outils web privés',
    description: 'Une plateforme d’utilitaires en ligne pour la productivité, les documents, le développement et le traitement local des données.',
    longDescription:
      'Nous avons posé les bases d’une plateforme d’outils numériques rapides et accessibles, conçue pour résoudre des tâches précises sans obliger l’utilisateur à créer un compte. La priorité technique est que chaque outil se charge vite et traite les données dans le navigateur dès que possible, ce qui réduit l’infrastructure et l’exposition des informations sensibles.',
    sector: 'Outils numériques',
    challenges: ['Concevoir de nombreux utilitaires indépendants sans perdre une expérience cohérente', 'Traiter fichiers et textes en respectant la confidentialité et les performances', 'Créer des pages utiles pour les moteurs de recherche sans sacrifier l’accessibilité', 'Élargir le catalogue uniquement quand chaque outil apporte une vraie valeur'],
    solutions: ['Des composants et des modèles partagés pour accélérer les nouveaux outils', 'Un traitement local côté client quand l’opération n’a pas besoin de backend', 'Une structure pensée pour le SEO avec des routes claires, des métadonnées et un contenu spécialisé', 'Linting, vérification des types et tests intégrés dès le départ'],
  },
}
