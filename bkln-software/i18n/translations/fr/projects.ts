import type { ProjectText } from '../../content'

export const projects: Record<string, ProjectText> = {
  'bkln-en-odoo': {
    title: 'BKLN sur Odoo',
    description: 'Nous gérons notre propre entreprise sur Odoo, avec la comptabilité de la Guinée équatoriale, et nous avons monté une entreprise de démonstration complète : achats importés à leur coût réel, entrepôts à Malabo et à Bata, ventes, factures, projets avec heures et maintenance.',
    longDescription:
      'Avant de déployer Odoo chez un client, nous l’avons mis en place chez nous. BKLN Software & Systems travaille sur Odoo avec la localisation officielle de la Guinée équatoriale : plan comptable SYSCOHADA, TVA, franc CFA comme devise principale, euro à sa parité fixe et dollar à son taux de change.\n\nÀ côté de notre propre gestion, nous avons préparé une entreprise de démonstration qui importe, stocke et vend, pour montrer à chaque client à quoi ressemblerait son quotidien avant de commencer. Une opportunité entre dans le CRM, devient un devis puis une commande, l’entrepôt livre et la facture se crée toute seule, avec les encaissements et les impayés toujours visibles.\n\nLes achats se font en euros ou en dollars et sont réceptionnés dans l’entrepôt de Malabo ou de Bata, avec un numéro de série pour les équipements qui en ont besoin. Quand arrivent les factures du fret, de la douane et du transport depuis le port, elles sont réparties sur ce qui a été reçu et le coût de chaque produit est mis à jour : dans la démonstration, un ordinateur portable acheté 410 000 FCFA coûte en réalité 544 436 FCFA une fois en entrepôt. Les vraies marges se calculent avec ce coût.\n\nLes services sont facturés au réalisé. À la confirmation d’une commande d’installation, Odoo crée le projet ; l’équipe saisit ses heures sur chaque tâche et la facture reprend les heures effectuées (42 sur les 60 prévues dans l’exemple), pas l’estimation. Le même système planifie l’entretien des groupes électrogènes, des véhicules et des serveurs, et regroupe les frais de déplacement du personnel avec leur validation.\n\nTout a été chargé et vérifié via l’API d’Odoo avec des scripts plutôt qu’à la main : c’est ainsi que nous reprenons les données d’un client depuis ses tableurs. Les captures proviennent de notre Odoo avec des données de démonstration : clients, produits, montants et personnes sont fictifs.',
    sector: 'Gestion d’entreprise (ERP)',
    challenges: [
      'Comptabilité de la Guinée équatoriale (SYSCOHADA, TVA, francs CFA) avec des fournisseurs qui facturent en euros et en dollars',
      'Connaître le coût réel des importations quand le fret, la douane et le transport arrivent sur des factures séparées, des semaines plus tard',
      'Deux entrepôts dans deux villes et des équipements à suivre un par un par numéro de série',
      'Facturer les services selon les heures réellement travaillées, sans tableurs parallèles',
      'Charger les données de base et les documents sans erreurs de saisie, de façon reproductible',
    ],
    solutions: [
      'Localisation officielle de la Guinée équatoriale ; euro à la parité fixe de 655,957 FCFA et dollar avec un taux de change daté',
      'Coûts logistiques répartis par valeur ou par quantité sur chaque réception, avec coût moyen par produit',
      'Un entrepôt par ville avec transferts internes, réceptions et livraisons, et numéros de série dès la réception',
      'Des services qui créent leur projet à la confirmation de la commande ; les heures des tâches passent directement sur la facture',
      'Données et documents chargés par XML-RPC avec des scripts idempotents qui vérifient chaque étape',
    ],
  },
  'bkln-marketplace': {
    description: 'Un site de petites annonces pour toute la Guinée équatoriale : achat et vente entre particuliers et professionnels, messagerie en temps réel, boutiques Premium et panneau de modération. Pensé pour le mobile et les connexions lentes.',
    longDescription:
      'La Guinée équatoriale n’avait pas de site d’achat-vente pensé pour son marché : des prix en francs CFA, des acheteurs qui naviguent presque toujours sur leur téléphone et très peu de paiements par carte. BKLN Marketplace est notre propre produit pour combler ce manque : des annonces de toutes sortes, des voitures et des appartements aux téléphones, aux meubles ou aux services, à Malabo, à Bata et dans le reste du pays.\n\nTout le monde peut consulter les annonces sans créer de compte. Avec un compte, on publie une annonce en quatre étapes depuis son téléphone, on enregistre ses favoris et on discute avec le vendeur dans une messagerie avec photos en temps réel, sans donner son numéro. Si le vendeur le souhaite, un bouton WhatsApp apparaît aussi, mais seulement pour les utilisateurs connectés : le numéro n’est jamais public et n’apparaît jamais sur Google.\n\nIl y a deux formules. La formule Normale est gratuite. La formule Premium, de 1 à 12 mois, donne plus d’annonces en même temps, plus de photos, une place parmi les annonces à la une et une boutique avec sa propre adresse. Comme presque personne ne paie par carte, Premium se règle à notre bureau de Malabo ou, depuis une autre ville, par une agence de transfert d’argent, et nous l’activons depuis le panneau d’administration. La plateforme est prête pour ajouter le paiement mobile plus tard.\n\nPour que le site reste digne de confiance, tout utilisateur peut signaler une annonce ou une conversation : au troisième signalement, l’annonce est masquée automatiquement jusqu’à ce qu’un modérateur l’examine. Les annonces contenant des termes interdits ne sont pas publiées, et le panneau réunit les paiements, les signalements et les utilisateurs, avec un journal de chaque action.\n\nTout est pensé pour un Android d’entrée de gamme en 3G : les photos sont compressées sur le téléphone avant l’envoi, chaque écran arrive du serveur en un seul aller-retour et le site peut s’installer sur l’écran d’accueil comme une application, avec des alertes pour les nouveaux messages. Plus de 500 vérifications automatiques parcourent ses vrais parcours, de l’inscription à la modération depuis le panneau.',
    sector: 'Petites annonces',
    status: 'En développement',
    challenges: [
      'Des utilisateurs sur des téléphones d’entrée de gamme, avec une 3G lente et chère : chaque photo et chaque aller-retour vers le serveur comptent',
      'Mettre en relation acheteurs et vendeurs sans exposer leur numéro de téléphone',
      'Faire payer une formule dans un marché où presque personne n’utilise de carte',
      'Garder le site propre, sans arnaques, annonces interdites ni spam, sans une grande équipe de modération',
    ],
    solutions: [
      'Photos converties en WebP et réduites sur le téléphone lui-même, sans données de localisation ; pages générées sur le serveur avec leurs données demandées en parallèle',
      'Une messagerie interne en temps réel avec photos et notifications push ; le bouton WhatsApp n’est visible qu’aux utilisateurs connectés et seulement si le vendeur l’active',
      'Paiement au bureau ou par agence de transfert et activation depuis le panneau, avec les limites de chaque formule dans une configuration modifiable et non dans le code',
      'Signalements avec masquage automatique au troisième, termes interdits détectés en mots entiers, blocages et permissions vérifiées dans la base de données elle-même (Row Level Security)',
    ],
  },
  pasa: {
    title: 'Billets pour Crazy December',
    description: 'Vente et contrôle de billets avec QR code pour Crazy December, la fête de fin d’année de +240 Dream Team Party à Accra (Ghana) : l’équipe enregistre chaque paiement, envoie le billet par WhatsApp et le scanne à l’entrée.',
    longDescription:
      '+240 Dream Team Party est un groupe d’étudiants équato-guinéens à Accra (Ghana) qui organise Crazy December : deux soirées d’affilée, les 25 et 26 décembre 2026. Les billets se vendent en direct, par MoMo (le paiement mobile du Ghana) ou en espèces, et il fallait suivre la caisse de chaque vendeur, envoyer les billets et contrôler l’entrée les deux soirs sans listes papier.\n\nNous leur avons créé une application web mobile aux couleurs de l’événement, devenue depuis notre produit Pasa. Chaque vendeur enregistre le billet (nom, WhatsApp, type VIP, Local ou Guest, montant et mode de paiement) et l’application génère un QR code unique et prépare le message WhatsApp avec le lien vers le billet. L’acheteur le reçoit dans sa conversation, avec sa carte et son code.\n\nChaque billet est valable pour les deux soirées, une fois à chacune. À l’entrée, les portiers scannent avec leur téléphone : l’écran devient vert ou rouge et affiche le type de billet en grand, pour orienter chacun vers sa zone. L’administrateur choisit la soirée active, car la nuit dépasse minuit et la date seule ne suffit pas.\n\nL’équipe se connecte avec un code PIN à six chiffres et chacun ne voit que ce qui le concerne. Le résumé affiche en direct les recettes, la caisse de chaque vendeur, avec les espèces et le MoMo séparés, et la fréquentation de chaque soirée.\n\nL’application sert déjà à vendre les billets avant les soirées. Les captures viennent d’une copie de démonstration avec des données inventées : les noms et numéros des vrais invités ne sortent jamais de l’application.',
    sector: 'Événements',
    challenges: [
      'Des ventes en direct, par MoMo ou en espèces, réparties entre plusieurs vendeurs : il fallait savoir à tout moment combien chacun avait encaissé',
      'Deux soirées avec le même billet : chaque QR code devait valoir une fois par soirée, et jamais deux fois la même soirée',
      'Des portiers pressés, la nuit et avec la musique forte : le résultat du scan devait se comprendre sans lire',
      'Envoyer chaque billet par WhatsApp sans l’API payante de WhatsApp et sans enregistrer le numéro de l’acheteur dans les contacts',
    ],
    solutions: [
      'Chaque billet enregistre qui l’a vendu, le montant encaissé et le mode de paiement ; le résumé additionne la caisse de chaque vendeur en direct',
      'Une entrée par billet et par soirée, garantie dans la base de données : même si deux portiers scannent le même QR code en même temps, un seul passe',
      'Un résultat plein écran en vert ou en rouge, avec vibration et son, et le type de billet en grand dans sa couleur',
      'Un lien WhatsApp qui ouvre la conversation de l’acheteur avec le message et le lien vers son billet déjà rédigés',
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
