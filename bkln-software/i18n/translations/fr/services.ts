import type { ServiceText } from '../../content'

export const services: Record<string, ServiceText> = {
  'desarrollo-web': {
    title: 'Sites web et boutiques en ligne',
    description: 'Des sites pour présenter votre activité, des boutiques en ligne et des plateformes avec comptes utilisateurs, pensés pour le mobile et les connexions lentes.',
    longDescription:
      'D’un site simple pour qu’on vous trouve sur Google à une plateforme avec comptes utilisateurs, paiements et tableau d’administration. Nous définissons ensemble ce dont vous avez vraiment besoin : nous ne vendons pas de modèles tout faits, nous construisons ce que votre projet demande.\n\nTous nos sites sont conçus d’abord pour le mobile, se chargent vite même avec une mauvaise connexion et intègrent un bouton WhatsApp. Si besoin, ils comprennent un tableau de bord pour que votre équipe modifie textes, prix ou photos sans dépendre de personne, et ils peuvent être en plusieurs langues.',
    forWho: [
      'Vos clients vous cherchent sur Google et ne vous trouvent pas.',
      'Vous répondez chaque jour aux mêmes questions sur WhatsApp.',
      'Il vous faut un site et une adresse e-mail professionnelle pour travailler avec des entreprises ou des institutions.',
      'Vous voulez vendre en ligne ou recevoir des commandes et des réservations en dehors des heures d’ouverture.',
      'Vous avez une idée de plateforme (marketplace, site d’emploi, réservations) et vous voulez la lancer.',
    ],
    examples: [
      { title: 'Site vitrine', description: 'Présentez votre entreprise ou votre institution : qui vous êtes, ce que vous proposez, où vous trouver et comment vous joindre.' },
      { title: 'Site avec tableau de bord', description: 'Votre équipe publie des actualités, modifie les prix ou ajoute des photos sans toucher au code.' },
      { title: 'Catalogue ou boutique en ligne', description: 'Produits avec photos, catégories et commandes, avec un paiement adapté aux clients sans carte bancaire.' },
      { title: 'Plateformes avec comptes utilisateurs', description: 'Marketplaces, portails d’emploi ou de services, avec comptes, rôles, messagerie et abonnements.' },
    ],
    deliverables: [
      'Site publié sur votre nom de domaine',
      'Code source complet',
      'Guide d’utilisation de base',
      'Formation de 1 à 2 heures pour votre équipe',
      '30 jours d’assistance après le lancement',
    ],
    pricingFactors: [
      'Type de site : vitrine, avec tableau de bord, boutique ou plateforme avec comptes utilisateurs',
      'Nombre de pages et de rubriques',
      'Comptes utilisateurs et rôles',
      'Paiements, cartes, e-mail, WhatsApp ou autres intégrations',
      'Plusieurs langues',
      'Design sur mesure ou à partir d’une base existante',
    ],
    timeline: '2 à 12 semaines selon le périmètre',
    faqs: [
      {
        question: 'Puis-je mettre à jour le site moi-même ?',
        answer: 'Oui, si nous incluons un tableau de bord. Nous le décidons en définissant le périmètre, selon la fréquence à laquelle vous changerez le contenu.',
      },
      {
        question: 'Pouvez-vous m’aider avec le nom de domaine et l’adresse e-mail professionnelle ?',
        answer: 'Oui. Nous vous guidons pour enregistrer votre nom de domaine et configurer une adresse e-mail à votre nom. Si vous les avez déjà, nous travaillons avec.',
      },
      {
        question: 'Comment encaisser si mes clients n’ont pas de carte bancaire ?',
        answer: 'Il existe plusieurs options : commandes payées par virement, en espèces ou par paiement mobile et confirmées depuis le tableau de bord, ou une passerelle de paiement quand c’est pertinent. Nous voyons cela selon votre activité.',
      },
      {
        question: 'Le site m’appartient-il ?',
        answer: 'Oui. Une fois le paiement réglé, le code et les contenus sont à vous.',
      },
    ],
  },
  'apps-moviles': {
    title: 'Applications mobiles',
    description: 'Des applications Android et iPhone pour vos clients, votre équipe ou vos livreurs, qui fonctionnent bien même quand la connexion lâche.',
    longDescription:
      'Nous développons des applications Android natives, là où se trouve la majorité de vos utilisateurs, et des applications multiplateformes avec Flutter quand vous devez aussi toucher les utilisateurs d’iPhone sans doubler le budget. Elles s’accompagnent presque toujours d’un serveur et d’un tableau d’administration, et nous nous occupons de tout.\n\nNous pensons chaque application pour un usage réel : téléphones de milieu de gamme, données mobiles intermittentes, notifications qui arrivent et opérations qui ne se perdent pas si la connexion coupe.',
    forWho: [
      'Vous voulez que vos clients commandent, réservent ou achètent depuis leur téléphone.',
      'Votre équipe travaille sur le terrain (livreurs, commerciaux, techniciens) et a besoin d’un outil.',
      'Vous devez prévenir vos utilisateurs par des notifications.',
      'Vos clients utilisent surtout leur téléphone et votre site ne suffit plus.',
    ],
    examples: [
      { title: 'Application pour vos clients', description: 'Commandes, réservations, catalogue, suivi et notifications.' },
      { title: 'Application pour votre équipe', description: 'Pour les livreurs, les commerciaux ou le personnel de terrain, avec des fonctions disponibles hors connexion.' },
      { title: 'Application de gestion', description: 'Votre activité dans votre téléphone : ventes, caisse et statistiques en temps réel.' },
      { title: 'Application connectée à des équipements', description: 'Terminaux de paiement, imprimantes de tickets ou lecteurs, intégrés via leurs kits de développement.' },
    ],
    deliverables: [
      'Application signée et prête à publier',
      'Code source complet',
      'Documentation technique',
      'Publication sur Google Play (en option)',
      '30 jours d’assistance après le lancement',
    ],
    pricingFactors: [
      'Android seulement ou iPhone aussi',
      'Nombre d’écrans et de parcours',
      'Serveur et tableau d’administration : nouveaux ou existants',
      'Paiements, cartes, appareil photo, notifications ou autres intégrations',
      'Fonctionnement hors connexion',
      'Design sur mesure ou fourni par vous',
    ],
    timeline: '4 à 16 semaines selon la complexité',
    faqs: [
      {
        question: 'Android, iPhone ou les deux ?',
        answer: 'En Guinée équatoriale, la majorité des utilisateurs ont Android : c’est donc généralement le point de départ. Si vous avez aussi besoin d’iPhone, nous utilisons Flutter pour faire les deux avec une seule base de code.',
      },
      {
        question: 'Est-ce que ça marche sans internet ?',
        answer: 'L’application peut être conçue pour enregistrer les données sur le téléphone et les synchroniser au retour de la connexion. Nous le décidons dès le début, car cela change la façon de la construire.',
      },
      {
        question: 'Qui publie l’application sur Google Play ?',
        answer: 'Nous pouvons nous en charger. Il est recommandé que le compte développeur Google soit à votre nom, pour que l’application vous appartienne.',
      },
      {
        question: 'Ai-je aussi besoin d’un site web ?',
        answer: 'Pas toujours. Parfois, un site bien conçu pour le mobile suffit pour commencer ; nous vous le dirons honnêtement avant d’établir le devis.',
      },
    ],
  },
  'sistemas-de-gestion': {
    title: 'Systèmes de gestion sur mesure',
    description: 'Des logiciels pour organiser votre entreprise ou votre établissement : caisse et ventes, stock, élèves et inscriptions, commandes et tableaux de bord, même sans internet.',
    longDescription:
      'Nous remplaçons le cahier, le tableur et les appels par un système où chaque donnée se trouve à un seul endroit et où chacun voit ce dont il a besoin. Une caisse juste, un stock à jour, des rapports qui se génèrent tout seuls et votre activité dans votre téléphone, même quand vous n’êtes pas là.\n\nNous l’adaptons à votre façon de travailler : rôles et permissions pour chaque poste, fonctionnement hors ligne quand la connexion n’est pas fiable, et utilisation depuis un ordinateur, un navigateur ou une application Android. Nous partons de systèmes qui fonctionnent déjà, comme GestEscolar ou notre logiciel de caisse, ou nous le construisons de zéro.',
    forWho: [
      'La caisse ne tombe pas juste à la fermeture et personne ne sait pourquoi.',
      'Vous suivez élèves, paiements, stock ou commandes dans Excel ou dans des cahiers.',
      'Vous voulez savoir comment va votre activité depuis votre téléphone sans appeler personne.',
      'Chaque employé doit voir et faire des choses différentes.',
      'La connexion coupe et vous ne pouvez pas vous permettre de vous arrêter.',
    ],
    examples: [
      { title: 'Caisse et point de vente', description: 'Ventes, clôtures de caisse par équipe, tickets et opérateurs avec code PIN, pour commerces, pharmacies et restaurants.' },
      { title: 'Stock et achats', description: 'Stock décompté à chaque vente, alertes de seuil minimum, réceptions de marchandises et fournisseurs.' },
      { title: 'Gestion scolaire', description: 'Élèves, inscriptions et paiements, notes et bulletins prêts à imprimer, sans dépendre d’internet.' },
      { title: 'Tableaux de bord', description: 'Ventes, utilisateurs, commandes ou contenus avec filtres par date, sur le web ou dans une application Android.' },
    ],
    deliverables: [
      'Système installé sur vos ordinateurs ou publié dans le cloud',
      'Code source complet',
      'Manuel d’utilisation',
      'Formation du personnel',
      '30 jours d’assistance après le lancement',
    ],
    pricingFactors: [
      'Modules nécessaires : caisse, stock, élèves, commandes, rapports…',
      'Nombre d’utilisateurs, de rôles et de points de vente',
      'Fonctionnement hors connexion',
      'Connexion à des imprimantes, lecteurs de codes-barres ou balances',
      'Import des données que vous avez déjà',
      'Rapports sur mesure',
    ],
    timeline: '4 à 14 semaines selon les modules',
    faqs: [
      {
        question: 'Dans le cloud ou installé dans mes locaux ?',
        answer: 'Cela dépend de votre connexion et de votre besoin de consulter les données à distance. Installé sur votre réseau local, il fonctionne sans internet ; dans le cloud, vous le consultez de n’importe où. On peut aussi combiner les deux : le système local continue de fonctionner et se synchronise quand la connexion revient.',
      },
      {
        question: 'Pouvez-vous reprendre les données que j’ai déjà dans Excel ?',
        answer: 'Nous l’étudions au début du projet. Importer ce que vous avez déjà évite de tout ressaisir à la main.',
      },
      {
        question: 'De quel matériel ai-je besoin ?',
        answer: 'Pour la plupart des entreprises, un ordinateur ou une tablette, une imprimante de tickets et, si vous vendez beaucoup de produits, un lecteur de codes-barres suffisent. Nous vous disons quoi acheter avant de commencer.',
      },
      {
        question: 'Que se passe-t-il en cas de coupure de courant ou d’internet ?',
        answer: 'Si le système est conçu pour fonctionner hors ligne, les opérations sont enregistrées sur l’appareil et synchronisées au retour de la connexion. Pour les coupures de courant, nous recommandons un onduleur ou un terminal avec batterie.',
      },
    ],
  },
  'oficina-digital-microsoft-365': {
    title: 'Bureau numérique avec Microsoft 365',
    description: 'Dossiers, validations, documents et messagerie de votre organisation dans Microsoft 365, avec Teams comme bureau : chaque affaire a son numéro, son responsable et son délai.',
    longDescription:
      'Pour les institutions, entreprises et organisations où les dossiers voyagent encore dans des chemises de bureau en bureau. Nous construisons sur Microsoft 365 un système dans lequel chaque demande reçoit un numéro d’enregistrement et un dossier, arrive automatiquement à la personne qui doit agir, et la direction peut valider, renvoyer ou signer depuis un ordinateur ou un téléphone. Tout est tracé : qui a reçu chaque affaire, qui l’a examinée et quand elle a été décidée.\n\nLe personnel travaille depuis Microsoft Teams, sans avoir à savoir ce qui fonctionne en arrière-plan : SharePoint, Microsoft Lists et Power Automate. Nous le construisons dans le Microsoft 365 de votre organisation et à son nom, avec des droits par poste et la vérification en deux étapes, et nous le livrons documenté. Nous commençons par ce qui sert le plus, nous retirons le papier par étapes et nous formons votre équipe sur place.',
    forWho: [
      'Les dossiers circulent dans des chemises et personne ne sait où en est chacun avant que quelqu’un ne demande.',
      'La direction doit être au bureau pour décider ou signer, et un déplacement bloque tout.',
      'Les documents sont dispersés entre classeurs, messageries personnelles et WhatsApp.',
      'Quand quelqu’un change de poste ou s’en va, l’information part avec cette personne.',
      'Votre équipe utilise des adresses e-mail personnelles au lieu d’une adresse au nom de votre organisation.',
    ],
    examples: [
      { title: 'Registre et dossier numériques', description: 'Chaque demande, courrier ou document entrant reçoit un numéro et un dossier qui rassemble tout, de l’arrivée à l’archivage.' },
      { title: 'Validations de la direction', description: 'Une corbeille avec tout ce qui attend une décision et un code couleur des délais, pour valider, renvoyer ou demander des informations depuis le téléphone.' },
      { title: 'Tâches et alertes automatiques', description: 'Chaque décision devient des tâches avec un responsable et un délai, et le système prévient quand quelque chose prend du retard.' },
      { title: 'Guichet pour les demandes externes', description: 'Un formulaire web pour que partenaires, fournisseurs ou citoyens déposent leurs demandes avec des documents et en suivent l’état.' },
      { title: 'Messagerie et documents partagés', description: 'Adresses e-mail sur le domaine de votre organisation, Teams pour les réunions et la discussion, et documents dans SharePoint avec versions et droits d’accès.' },
      { title: 'Tableaux de suivi', description: 'Ce qui est en attente, ce qui est en retard et l’avancement de chaque service, sur un seul écran.' },
    ],
    deliverables: [
      'Système configuré dans le Microsoft 365 de votre organisation, à son nom',
      'Applications Teams pour le personnel et pour la direction',
      'Droits par poste et vérification en deux étapes',
      'Manuel d’utilisation et guides courts pour chaque processus',
      'Formation sur place par profil',
      '30 jours d’accompagnement après la livraison',
    ],
    pricingFactors: [
      'Nombre de services, de processus et d’utilisateurs',
      'Microsoft 365 déjà en place ou à mettre en place',
      'Guichet web pour les demandes externes',
      'Migration de la messagerie et des documents existants',
      'Signature électronique, tableaux avancés ou autres éléments payants chez Microsoft',
      'Nombre de personnes et de sessions de formation',
    ],
    timeline: 'De 1 semaine (messagerie et Teams) à 4 mois (système complet)',
    faqs: [
      {
        question: 'Faut-il acheter des licences Microsoft ?',
        answer: 'Chaque personne qui utilise le système a besoin d’une licence Microsoft 365. Si vous en avez déjà, nous les utilisons ; sinon, nous calculons combien il en faut et de quel type avant tout achat, et vous les payez directement à Microsoft ou à son revendeur. Si votre organisation est à but non lucratif, Microsoft propose des licences gratuites ou à prix réduit : nous vous aidons à vérifier si vous y avez droit.',
      },
      {
        question: 'Pourquoi Microsoft 365 plutôt qu’un logiciel sur mesure ?',
        answer: 'Parce que beaucoup d’organisations le paient déjà ou en ont besoin pour la messagerie, et que leur personnel connaît déjà Teams, Word et Excel. Construire dessus est plus rapide, bénéficie du support de l’éditeur et ne dépend pas d’un serveur à vous. Si votre cas demande un système sur mesure, nous vous le dirons.',
      },
      {
        question: 'Faut-il abandonner le papier du jour au lendemain ?',
        answer: 'Non. D’abord, le courrier papier est numérisé à l’accueil et traité dans le système ; ensuite, on cesse d’imprimer les copies internes ; enfin, les processus se traitent uniquement en numérique, avec les exceptions que vous décidez.',
      },
      {
        question: 'La validation dans le système remplace-t-elle la signature ?',
        answer: 'La validation garde la trace de qui a décidé quoi, et quand. Pour signer des contrats ou des décisions ayant une valeur juridique, il faut une solution de signature électronique, que nous intégrons une fois validée par votre service juridique.',
      },
      {
        question: 'À qui appartient le système ?',
        answer: 'À votre organisation. Il est construit dans son propre Microsoft 365, avec des comptes institutionnels, et livré documenté pour que n’importe quel technicien puisse le maintenir.',
      },
    ],
  },
  'ia-y-automatizacion': {
    title: 'Assistants IA et automatisation',
    description: 'Des assistants qui répondent à vos clients sur WhatsApp et sur votre site avec vos propres informations, et l’automatisation des tâches répétitives que vous faites aujourd’hui à la main.',
    longDescription:
      'Un assistant d’intelligence artificielle répond à vos clients à toute heure en n’utilisant que les informations que vous lui donnez : catalogue, prix, horaires, questions fréquentes. S’il ne sait pas, il le dit et transmet la conversation à une personne. Il prend des commandes, vous envoie des rapports et ne fait que ce que vous lui autorisez.\n\nNous automatisons aussi des processus : rapports qui se génèrent et s’envoient tout seuls, données qui passent d’un système à l’autre sans copier-coller, et alertes quand quelque chose ne va pas. Des tâches qui vous prennent des heures chaque semaine et qu’un programme fait en quelques secondes.',
    forWho: [
      'Vous répondez toute la journée aux mêmes questions sur WhatsApp.',
      'Vous perdez des clients qui écrivent en dehors des heures d’ouverture.',
      'Vous préparez à la main le même rapport chaque semaine.',
      'Vous copiez des données d’un endroit à l’autre : Excel, e-mail, des systèmes qui ne communiquent pas entre eux.',
    ],
    examples: [
      { title: 'Assistant pour WhatsApp et le web', description: 'Répond avec les informations de votre entreprise, prend des commandes et passe la main à une personne si nécessaire.' },
      { title: 'Rapports automatiques', description: 'Ventes, activité ou indicateurs envoyés par e-mail en PDF chaque semaine.' },
      { title: 'Collecte et organisation de données', description: 'Des informations issues de sites, de documents ou de fichiers, rangées et prêtes à l’emploi.' },
      { title: 'Alertes et surveillance', description: 'Un message sur votre WhatsApp si votre site tombe ou si un indicateur sort de la normale.' },
    ],
    deliverables: [
      'Assistant ou automatisation en service',
      'Tableau de bord pour gérer les documents et relire les conversations (assistants)',
      'Documentation et guide d’utilisation',
      'Formation de votre équipe',
      '30 jours d’assistance après le lancement',
    ],
    pricingFactors: [
      'Canaux : web, WhatsApp, e-mail',
      'Volume de conversations (coût d’utilisation de l’IA et de certains messages WhatsApp)',
      'Connexions à vos systèmes : commandes, agenda, e-mail',
      'Quantité et organisation des informations de départ',
      'Complexité du processus à automatiser',
      'Fréquence : à la demande, programmée ou en temps réel',
    ],
    timeline: 'Automatisations : 1 à 6 semaines · Assistants et IA : 4 à 16 semaines',
    faqs: [
      {
        question: 'L’assistant invente-t-il des réponses ?',
        answer: 'Il est configuré pour répondre uniquement avec vos informations. S’il ne trouve pas la réponse, il le dit et transmet la conversation à une personne. Nous relisons avec vous les premières conversations.',
      },
      {
        question: 'Peut-il répondre sur mon WhatsApp ?',
        answer: 'Il se connecte via l’API WhatsApp Business de Meta, qui utilise normalement un numéro dédié. Nous vous aidons pour la configuration et la vérification de votre entreprise.',
      },
      {
        question: 'Combien coûte son fonctionnement ?',
        answer: 'En plus de la mise en place, il y a un coût d’utilisation du service d’IA et, sur WhatsApp, de certains messages. Nous l’estimons selon votre volume avant de commencer.',
      },
      {
        question: 'De quelles informations a-t-il besoin ?',
        answer: 'Ce que vous avez déjà : catalogue, prix, horaires, questions fréquentes et conditions, dans des documents, sur votre site ou dans un tableur.',
      },
    ],
  },
  'medios-de-comunicacion': {
    title: 'Plateformes pour les médias',
    description: 'Des sites et des applications pour la radio et la télévision : diffusion en direct, podcasts et médiathèque, à l’image de votre média.',
    longDescription:
      'Nous emmenons votre radio ou votre télévision sur internet : diffusion en direct sur le web et le mobile, émissions à la demande, podcasts et une médiathèque bien organisée, le tout à l’image de votre média.\n\nSi vous n’avez pas encore d’infrastructure pour diffuser en ligne, nous la concevons de zéro avec vous. Et comme votre public vous suivra surtout depuis son téléphone, tout est conçu d’abord pour le mobile.',
    forWho: [
      'Votre public veut vous voir ou vous écouter depuis son téléphone, y compris depuis l’étranger.',
      'Vos émissions se perdent une fois diffusées.',
      'Votre site ne reflète pas l’image de votre média ou il est difficile à mettre à jour.',
      'Vous voulez commencer à diffuser en ligne et ne savez pas par où commencer.',
    ],
    examples: [
      { title: 'Diffusion en direct', description: 'Radio et télévision en direct sur le web et dans une application.' },
      { title: 'Replay et podcasts', description: 'Émissions, interviews et podcasts organisés pour être vus ou écoutés quand on veut.' },
      { title: 'Portail d’actualités', description: 'Avec un tableau de bord pour que la rédaction publie sans dépendre d’un développeur.' },
      { title: 'L’application de votre média', description: 'Direct, grille des programmes, actualités et notifications sur le téléphone de votre public.' },
    ],
    deliverables: [
      'Site et/ou application à l’image de votre média',
      'Tableau de bord de gestion des contenus',
      'Mise en service de la diffusion en direct',
      'Formation de l’équipe',
      '30 jours d’assistance après le lancement',
    ],
    pricingFactors: [
      'Site, application ou les deux',
      'Direct radio, télévision ou les deux',
      'Taille du public et volume de contenus',
      'Existence ou non d’une infrastructure de diffusion en ligne',
      'Nombre de langues',
      'Contenus existants à migrer',
    ],
    timeline: 'Défini dans la proposition selon le périmètre',
    faqs: [
      {
        question: 'Avons-nous besoin de nos propres serveurs pour diffuser ?',
        answer: 'Pas forcément. Il existe des services de diffusion facturés à l’usage ; nous vous recommandons l’option la mieux adaptée à votre public et à votre budget, ou nous la montons de zéro si vous préférez.',
      },
      {
        question: 'Peut-on nous suivre depuis l’étranger ?',
        answer: 'Oui. La diffusion en ligne atteint n’importe quel pays, sauf si des droits sur certains contenus l’empêchent.',
      },
      {
        question: 'Qui publie les contenus ?',
        answer: 'Votre équipe, depuis un tableau de bord simple. Nous la formons pour qu’elle soit autonome.',
      },
    ],
  },
  'mantenimiento-y-soporte': {
    title: 'Maintenance et assistance',
    description: 'Nous prenons soin de votre site ou de votre application après le lancement, même si nous ne l’avons pas conçu : mises à jour, sauvegardes, corrections et petites modifications.',
    longDescription:
      'Un site ou une application sans maintenance se dégrade même si personne n’y touche : les certificats expirent, des composants obsolètes cessent de fonctionner, les règles de Google Play changent et des failles de sécurité apparaissent. Nous veillons à ce qu’il continue de fonctionner pour que vous puissiez vous consacrer à votre activité.\n\nNous travaillons avec un forfait mensuel ou annuel selon vos besoins, et nous reprenons aussi des projets réalisés par un autre prestataire : nous vérifions d’abord leur état et vous disons clairement ce qu’il faut corriger.',
    forWho: [
      'Votre site ou votre application a été réalisé par quelqu’un qui n’est plus disponible.',
      'Vous ne savez pas si vos données sont sauvegardées.',
      'Vous avez besoin de petites modifications de temps en temps et personne à qui les demander.',
      'Votre site est lent, affiche des erreurs ou quelque chose a cessé de fonctionner.',
    ],
    examples: [
      { title: 'Mises à jour et sécurité', description: 'Nous maintenons à jour composants, certificats et dépendances.' },
      { title: 'Sauvegardes', description: 'Des sauvegardes régulières des données et des fichiers, et la vérification qu’on peut les restaurer.' },
      { title: 'Surveillance', description: 'Nous vous prévenons si le site tombe ou si quelque chose cesse de fonctionner, souvent avant vos clients.' },
      { title: 'Modifications et améliorations', description: 'Des heures chaque mois pour modifier textes, prix, rubriques ou petites fonctionnalités.' },
      { title: 'Hébergement et nom de domaine', description: 'Nous gérons les renouvellements et la configuration pour que rien n’expire par oubli.' },
    ],
    deliverables: [
      'Bilan initial de l’état du projet',
      'Plan de maintenance écrit',
      'Rapport régulier du travail effectué',
      'Prise en charge prioritaire des incidents',
    ],
    pricingFactors: [
      'Taille et technologie du projet',
      'État dans lequel nous le recevons',
      'Fréquence des sauvegardes et des vérifications',
      'Heures de modifications incluses chaque mois',
      'Délai d’intervention en cas d’incident',
    ],
    timeline: 'Forfait mensuel ou annuel',
    faqs: [
      {
        question: 'Reprenez-vous un site que vous n’avez pas réalisé ?',
        answer: 'Oui. Nous commençons par un bilan pour voir dans quel état il est et quels risques il présente, puis nous vous proposons un plan.',
      },
      {
        question: 'Que se passe-t-il si quelque chose tombe en panne le week-end ?',
        answer: 'Cela dépend du forfait choisi. Les délais d’intervention sont fixés par écrit dès le départ.',
      },
      {
        question: 'Ai-je besoin de maintenance si mon site est simple ?',
        answer: 'Il en a moins besoin, mais pas zéro : le nom de domaine et le certificat expirent et les composants vieillissent. Pour un site simple, un forfait léger suffit généralement.',
      },
    ],
  },
  'consultoria-y-formacion': {
    title: 'Conseil et formation',
    description: 'Un deuxième avis avant d’investir, un audit technique de ce que vous avez déjà et des formations pour que votre équipe tire le meilleur parti de la technologie.',
    longDescription:
      'Parfois, vous n’avez pas besoin que nous construisions quoi que ce soit, mais de quelqu’un d’expérimenté qui vous dise si vous êtes sur la bonne voie. Nous analysons le devis d’un autre prestataire avant que vous signiez, nous auditons un site ou une application que vous avez déjà, ou nous vous aidons à choisir la technologie adaptée à votre projet.\n\nNous formons aussi des équipes : le personnel qui va utiliser un nouveau système ou des développeurs qui veulent améliorer leurs pratiques. Nous partons des mêmes projets réels que ceux que nous construisons pour nos clients.',
    forWho: [
      'Vous avez le devis d’un autre prestataire et ne savez pas s’il est raisonnable.',
      'Vous allez investir dans un projet numérique et voulez prendre les bonnes décisions avant de commencer.',
      'Votre site ou votre application connaît des pannes et vous voulez savoir pourquoi.',
      'Votre équipe a besoin d’être formée pour tirer parti d’un outil ou progresser en développement.',
    ],
    examples: [
      { title: 'Deuxième avis sur un devis', description: 'Nous examinons le périmètre, le prix, les délais et les conditions d’une proposition avant que vous la signiez.' },
      { title: 'Audit technique', description: 'Sécurité, performances, qualité du code et risques d’un site ou d’une application existants, avec un rapport hiérarchisé.' },
      { title: 'Cadrage de projet', description: 'Nous vous aidons à définir le périmètre, les priorités et la technologie avant de demander des devis.' },
      { title: 'Formation des équipes', description: 'Des sessions pratiques pour le personnel qui utilisera un système ou pour des équipes de développement.' },
    ],
    deliverables: [
      'Rapport avec constats et recommandations',
      'Plan d’action hiérarchisé',
      'Sessions de formation en présentiel ou à distance',
      'Suivi ultérieur (en option)',
    ],
    pricingFactors: [
      'Revue ponctuelle ou accompagnement continu',
      'Taille du système ou du projet à examiner',
      'Nombre de sessions ou de semaines',
      'Rapport écrit ou sessions uniquement',
      'En présentiel ou à distance',
      'Nombre de personnes à former',
    ],
    timeline: '1 à 8 semaines selon le périmètre',
    faqs: [
      {
        question: 'Examinez-vous les devis d’autres entreprises même si nous ne travaillons pas ensemble ensuite ?',
        answer: 'Oui. L’analyse est un service à part entière et ne vous engage à rien d’autre.',
      },
      {
        question: 'La formation se fait-elle en présentiel ?',
        answer: 'À Malabo, elle peut se faire en présentiel ; nous la proposons aussi à distance.',
      },
      {
        question: 'Formez-vous des développeurs ?',
        answer: 'Oui : bonnes pratiques, revue de code et technologies spécifiques. Vous trouverez aussi nos cours sur ce site.',
      },
    ],
    technologies: ['Revue de code', 'Architecture', 'Sécurité', 'Performances', 'DevOps'],
  },
  'erp-odoo-sap': {
    title: 'ERP : Odoo et SAP',
    description: 'Achats, entrepôts, ventes, facturation et comptabilité dans un seul système. Nous déployons Odoo avec la comptabilité de la Guinée équatoriale, et nous développons et intégrons SAP.',
    longDescription:
      'Un ERP est le système où vit toute l’entreprise : ce que vous achetez, ce que vous avez dans chaque entrepôt, ce que vous vendez, ce qu’on vous doit et ce que vous devez. Quand la marchandise arrive, le stock augmente et le comptable voit la facture du fournisseur ; quand une vente part, le stock diminue et la facture se crée toute seule. Personne ne recopie des données d’un tableur à l’autre.\n\nNous déployons Odoo de bout en bout : nous analysons votre façon de travailler, configurons ce qu’Odoo propose déjà (comptabilité SYSCOHADA de la Guinée équatoriale, francs CFA, euros et dollars, plusieurs entrepôts), reprenons vos données depuis Excel, formons chaque équipe et vous accompagnons après le démarrage. Nous l’utilisons aussi dans notre propre entreprise : nous vous le montrons en fonctionnement avant de commencer.\n\nSi votre entreprise travaille déjà avec SAP, nous développons en ABAP, connectons SAP à vos autres applications et préparons les rapports et les écrans qui vous manquent. Et si vous êtes encore en train de choisir, nous vous disons franchement ce qui vous convient : Odoo, SAP ou une solution plus simple.',
    forWho: [
      'Chaque service tient son propre tableur et les chiffres ne concordent pas en fin de mois.',
      'Vous importez de la marchandise et ne savez pas ce que coûte vraiment chaque produit avec le fret et la douane.',
      'Vous achetez en euros ou en dollars, vendez en francs CFA, et chacun calcule le change à sa manière.',
      'Vous avez des entrepôts à Malabo et à Bata et personne ne sait ce qu’il y a dans chacun sans téléphoner.',
      'Vous facturez des heures ou des services par projet et des heures ne sont jamais facturées.',
      'Votre comptable ressaisit tout dans un autre logiciel pour clôturer le mois.',
      'Vous utilisez déjà SAP et avez besoin d’un développement, d’un rapport ou d’une connexion avec une autre application.',
    ],
    examples: [
      { title: 'Achats et importation', description: 'Commandes fournisseurs en euros ou en dollars, réception en entrepôt, et le fret, la douane et le transport répartis sur le coût de chaque produit.' },
      { title: 'Entrepôts et traçabilité', description: 'Stock par entrepôt, transferts entre Malabo et Bata, numéros de série et lots, et alertes quand un article passe sous le minimum.' },
      { title: 'Ventes et facturation', description: 'Devis, commandes, livraisons et factures à votre logo, en francs CFA ou en devise, avec les encaissements et les impayés toujours visibles.' },
      { title: 'Comptabilité de la Guinée équatoriale', description: 'Plan comptable SYSCOHADA, TVA et devises configurés dès le premier jour, pour que la comptabilité découle du travail quotidien.' },
      { title: 'Projets et heures facturables', description: 'Chaque commande de services crée son projet ; l’équipe saisit ses heures et vous facturez le réalisé, pas l’estimé.' },
      { title: 'Maintenance, notes de frais et personnel', description: 'Entretiens planifiés des véhicules, groupes électrogènes et équipements, frais de déplacement avec validation et fiches des employés.' },
      { title: 'Plusieurs sociétés dans un seul système', description: 'Groupes de plusieurs sociétés : chacune avec sa comptabilité et ses droits, et la direction avec la vue d’ensemble.' },
      { title: 'Développement et intégration SAP', description: 'Programmes et rapports ABAP, extensions, connexions avec d’autres applications via des services OData, BAPI/RFC ou IDoc, et écrans Fiori.' },
    ],
    deliverables: [
      'Analyse de vos processus et proposition ferme avant toute configuration',
      'Système configuré au nom de votre entreprise, avec vos données reprises',
      'Droits par poste et modèles de documents à votre image',
      'Manuels et formation par profil : achats, entrepôt, ventes, comptabilité et direction',
      'Accompagnement après le démarrage',
    ],
    pricingFactors: [
      'Nombre de sociétés, de services et d’utilisateurs',
      'Applications Odoo nécessaires et édition (Community ou Enterprise)',
      'Hébergement : dans le cloud d’Odoo ou sur votre propre serveur',
      'Données à reprendre et leur état',
      'Développements sur mesure et intégrations avec d’autres systèmes',
      'Pour SAP : périmètre du développement ou de l’intégration et accès à vos environnements',
    ],
    timeline: 'De 6 à 12 semaines pour une entreprise de 4 à 6 services ; les développements SAP selon le périmètre',
    faqs: [
      {
        question: 'Odoo ou SAP ?',
        answer: 'Pour la plupart des PME et des groupes de taille moyenne, Odoo : il se déploie en quelques semaines, coûte beaucoup moins cher et couvre achats, entrepôt, ventes, comptabilité et projets. SAP se justifie dans les grandes entreprises ou quand la maison mère l’exige. Si vous avez déjà SAP, nous travaillons dessus ; si vous choisissez, nous vous le disons franchement après avoir vu vos processus.',
      },
      {
        question: 'Est-ce adapté à la comptabilité de la Guinée équatoriale ?',
        answer: 'Oui. Odoo inclut la localisation officielle de la Guinée équatoriale, avec le plan comptable SYSCOHADA, et gère les francs CFA, les euros et les dollars. Avant toute déclaration, nous le validons avec votre comptable ou votre auditeur.',
      },
      {
        question: 'Faut-il payer des licences ?',
        answer: 'Cela dépend de l’édition. Odoo Community est gratuit et s’installe sur votre propre serveur ; Enterprise se paie par utilisateur et par mois directement à Odoo et inclut plus d’applications et les mises à jour. Nous vous recommandons celle qui correspond à vos besoins et calculons le nombre d’utilisateurs nécessaires avant tout achat.',
      },
      {
        question: 'Que se passe-t-il si internet est coupé ?',
        answer: 'Le cloud d’Odoo nécessite une connexion. Si votre connexion n’est pas fiable, il peut être installé sur un serveur dans vos bureaux, avec des sauvegardes conservées ailleurs. Nous décidons ensemble après avoir vu votre connexion, votre alimentation électrique et vos onduleurs ou groupes électrogènes.',
      },
      {
        question: 'La paie est-elle incluse ?',
        answer: 'Odoo ne propose pas encore de paie prête à l’emploi pour la Guinée équatoriale. Elle peut être configurée sur mesure, mais nous recommandons de la garder pour une deuxième phase et de commencer par les achats, l’entrepôt, les ventes et la comptabilité.',
      },
      {
        question: 'Nous sommes un groupe de plusieurs sociétés. Fait-on tout en même temps ?',
        answer: 'Nous ne le recommandons pas. Nous commençons par une société et quelques services, nous démarrons, puis nous ajoutons le reste. Vouloir tout faire d’un coup est la première cause d’échec des projets ERP.',
      },
      {
        question: 'Nous utilisons déjà SAP. Que pouvez-vous faire ?',
        answer: 'Des développements ABAP (programmes, rapports, formulaires et extensions), des intégrations avec d’autres applications via OData, BAPI/RFC ou IDoc, et des écrans Fiori. Nous travaillons dans votre environnement de développement et passons les modifications en production selon votre procédure.',
      },
    ],
  },
}
