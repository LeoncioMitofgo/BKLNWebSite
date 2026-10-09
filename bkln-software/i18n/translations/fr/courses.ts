import type { CourseText } from '../../content'

// Uniquement les cours publiés. Les livres eux-mêmes sont en espagnol ; ce texte les décrit.
export const courses: Record<string, CourseText> = {
  'python-desde-cero': {
    title: 'Python depuis zéro · Série complète',
    description: 'Apprenez Python de zéro jusqu’à de vrais projets : web, bases de données, API, analyse de données, tests et Python professionnel. Une série complète en trois livres interactifs.',
    longDescription:
      'Un cours complet de Python conçu pour celles et ceux qui n’ont jamais programmé. Pas d’exemples gadgets — chaque notion est expliquée à partir de situations réelles et mise en pratique avec des exercices exécutables directement dans le navigateur.\n\nLa série se divise en trois livres : le livre 1 couvre les fondamentaux (variables, fonctions, listes, chaînes de caractères et un projet final) ; le livre 2 approfondit la structure et l’organisation (POO, gestion des erreurs, fichiers, modules, compréhensions et un projet réel) ; le livre 3 emmène votre code dans le monde réel (web et scraping, SQLite, API REST, analyse de données avec Pandas, automatisation, tests avec unittest et Python professionnel avec dataclasses, ABC et logging).\n\nLes 24 modules sont disponibles dès maintenant, sans inscription. Chaque module comprend des explications, des exemples de code commentés, des quiz de compréhension et des exercices avec un interpréteur Python intégré au navigateur.',
    duration: '3 livres · série complète',
    instructor: {
      name: 'BKLN Software',
      bio: 'Des développeurs avec une vraie expérience de projets commerciaux : applications Android, marketplaces, API, automatisation et IA. Nous enseignons ce que nous utilisons.',
      avatar: '',
    },
    modules: [
      {
        id: 'l1-parte1',
        title: 'Livre 1 · Premiers pas',
        duration: '≈ 4 h de lecture',
        lessons: [
          { id: 'l1-m1', title: 'Qu’est-ce que programmer ?', duration: '≈ 35min', isFree: true },
          { id: 'l1-m2', title: 'Variables et types de données', duration: '≈ 40min', isFree: true },
          { id: 'l1-m3', title: 'Opérateurs et expressions', duration: '≈ 35min', isFree: true },
        ],
      },
      {
        id: 'l1-parte2',
        title: 'Livre 1 · Logique et contrôle',
        duration: '≈ 3 h de lecture',
        lessons: [
          { id: 'l1-m4', title: 'Structures de contrôle', duration: '≈ 45min', isFree: true },
          { id: 'l1-m5', title: 'Fonctions', duration: '≈ 50min', isFree: true },
        ],
      },
      {
        id: 'l1-parte3',
        title: 'Livre 1 · Structures de données',
        duration: '≈ 3 h de lecture',
        lessons: [
          { id: 'l1-m6', title: 'Listes et tuples', duration: '≈ 45min', isFree: true },
          { id: 'l1-m7', title: 'Chaînes de caractères', duration: '≈ 40min', isFree: true },
          { id: 'l1-m8', title: 'Projet final de base', duration: '≈ 50min', isFree: true },
        ],
      },
      {
        id: 'l2',
        title: 'Livre 2 · Python intermédiaire',
        duration: '≈ 6 h de lecture',
        lessons: [
          { id: 'l2-m1', title: 'Dictionnaires et ensembles', duration: '≈ 40min', isFree: true },
          { id: 'l2-m2', title: 'Fonctions avancées', duration: '≈ 45min', isFree: true },
          { id: 'l2-m3', title: 'Programmation orientée objet', duration: '≈ 50min', isFree: true },
          { id: 'l2-m4', title: 'Gestion des erreurs', duration: '≈ 40min', isFree: true },
          { id: 'l2-m5', title: 'Fichiers et données', duration: '≈ 45min', isFree: true },
          { id: 'l2-m6', title: 'Modules et paquets', duration: '≈ 40min', isFree: true },
          { id: 'l2-m7', title: 'Compréhensions et itérateurs', duration: '≈ 40min', isFree: true },
          { id: 'l2-m8', title: 'Projet final intermédiaire', duration: '≈ 60min', isFree: true },
        ],
      },
      {
        id: 'l3',
        title: 'Livre 3 · Python avancé',
        duration: '≈ 7 h de lecture',
        lessons: [
          { id: 'l3-m1', title: 'Python et le web', duration: '≈ 45min', isFree: true },
          { id: 'l3-m2', title: 'Bases de données', duration: '≈ 45min', isFree: true },
          { id: 'l3-m3', title: 'API et services externes', duration: '≈ 50min', isFree: true },
          { id: 'l3-m4', title: 'Analyse de données', duration: '≈ 50min', isFree: true },
          { id: 'l3-m5', title: 'Automatisation', duration: '≈ 45min', isFree: true },
          { id: 'l3-m6', title: 'Tests et qualité', duration: '≈ 45min', isFree: true },
          { id: 'l3-m7', title: 'Python professionnel', duration: '≈ 50min', isFree: true },
          { id: 'l3-m8', title: 'Projet final avancé', duration: '≈ 60min', isFree: true },
        ],
      },
    ],
    includes: [
      '3 livres complets · 24 modules disponibles dès maintenant',
      'Interpréteur Python intégré au navigateur',
      'Quiz de compréhension à chaque chapitre',
      'Mode sombre, taille de police et densité réglables',
      'Sans inscription — accès à vie',
    ],
  },
  'ia-machine-learning-python': {
    title: 'IA et Machine Learning avec Python',
    description: 'NumPy, Pandas, Matplotlib, scikit-learn et vos premiers modèles prédictifs — exécutables dans le navigateur.',
    longDescription:
      'Un cours pratique en trois livres : les fondamentaux de l’écosystème scientifique de Python, les algorithmes classiques de ML et le deep learning. Tout le code s’exécute dans le navigateur — rien à installer.',
    duration: '3 livres · 24 modules',
    instructor: {
      name: 'Leoncio Felipe Mitogo',
      bio: 'Ingénieur logiciel avec plus de 8 ans d’expérience dans le développement d’applications et de systèmes de données. Fondateur de BKLN Software & Systems à Malabo.',
      avatar: '',
    },
    modules: [
      {
        id: 'l1',
        title: 'Livre I — Fondamentaux',
        duration: '8 modules',
        lessons: [
          { id: 'l1-m1', title: 'Qu’est-ce que l’IA ?', duration: '20 min', isFree: true },
          { id: 'l1-m2', title: 'NumPy — vecteurs et matrices', duration: '30 min', isFree: true },
          { id: 'l1-m3', title: 'Pandas — des données en tableaux', duration: '35 min', isFree: true },
          { id: 'l1-m4', title: 'Matplotlib — voir pour comprendre', duration: '30 min', isFree: true },
          { id: 'l1-m5', title: 'Régression linéaire', duration: '40 min', isFree: true },
          { id: 'l1-m6', title: 'Classification — KNN', duration: '35 min', isFree: true },
          { id: 'l1-m7', title: 'Arbres de décision et Random Forest', duration: '40 min', isFree: true },
          { id: 'l1-m8', title: 'Évaluation des modèles', duration: '35 min', isFree: true },
        ],
      },
      {
        id: 'l2',
        title: 'Livre II — Intermédiaire',
        duration: '8 modules',
        lessons: [
          { id: 'l2-m1', title: 'Prétraitement des données', duration: '40 min', isFree: true },
          { id: 'l2-m2', title: 'Régression avec régularisation', duration: '35 min', isFree: true },
          { id: 'l2-m3', title: 'Machines à vecteurs de support', duration: '40 min', isFree: true },
          { id: 'l2-m4', title: 'Clustering sans étiquettes', duration: '35 min', isFree: true },
          { id: 'l2-m5', title: 'ACP et réduction de dimension', duration: '35 min', isFree: true },
          { id: 'l2-m6', title: 'Sélection de caractéristiques', duration: '30 min', isFree: true },
          { id: 'l2-m7', title: 'Pipelines et automatisation', duration: '40 min', isFree: true },
          { id: 'l2-m8', title: 'Projet : système de recommandation', duration: '60 min', isFree: true },
        ],
      },
      {
        id: 'l3',
        title: 'Livre III — Deep Learning',
        duration: '8 modules',
        lessons: [
          { id: 'l3-m1', title: 'Réseaux de neurones artificiels', duration: '45 min', isFree: true },
          { id: 'l3-m2', title: 'Rétropropagation et gradient', duration: '45 min', isFree: true },
          { id: 'l3-m3', title: 'Réseaux convolutifs (CNN)', duration: '50 min', isFree: true },
          { id: 'l3-m4', title: 'Réseaux récurrents (RNN)', duration: '50 min', isFree: true },
          { id: 'l3-m5', title: 'Transformers et attention', duration: '55 min', isFree: true },
          { id: 'l3-m6', title: 'Fine-tuning de modèles de langage', duration: '60 min', isFree: true },
          { id: 'l3-m7', title: 'Agents et outils', duration: '55 min', isFree: true },
          { id: 'l3-m8', title: 'Projet final — un assistant avec contexte', duration: '90 min', isFree: true },
        ],
      },
    ],
    includes: [
      'Code Python exécutable directement dans le navigateur',
      'NumPy, Pandas, Matplotlib et scikit-learn intégrés',
      'Graphiques Matplotlib rendus en temps réel',
      '24 modules avec quiz et exercices pratiques',
      'Suivi de la progression sans inscription',
      'Accès immédiat · sans créer de compte',
    ],
  },
  'az-900-azure-fundamentals': {
    title: 'AZ-900 : Microsoft Azure Fundamentals',
    description: 'Préparez la certification AZ-900 avec un livre interactif : concepts du cloud, architecture et services Azure, gestion et gouvernance — avec des quiz et un examen blanc complet.',
    longDescription:
      'L’AZ-900 (Microsoft Certified: Azure Fundamentals) est la certification d’entrée dans l’écosystème Azure. Elle ne demande ni expérience préalable ni connaissances techniques poussées : elle vérifie que vous comprenez les concepts du cloud, les principaux services d’Azure et la façon dont la plateforme est gérée et gouvernée.\n\nLe livre s’organise en trois parties : la partie I couvre les concepts fondamentaux du cloud (ce qu’est le cloud, les modèles de service IaaS/PaaS/SaaS, les modèles de déploiement, les avantages et le modèle de responsabilité partagée) ; la partie II aborde l’architecture et les services essentiels d’Azure (régions et zones, hiérarchie des ressources, calcul, réseau, stockage et identité avec Entra ID) ; la partie III se concentre sur la gestion et la gouvernance (coûts, conformité, outils de gestion et supervision).\n\nLes 15 modules sont disponibles dès maintenant, sans inscription. Chacun comprend des quiz interactifs qui révèlent la bonne réponse avec son explication, et votre progression est enregistrée automatiquement dans le navigateur. Le livre se termine par un examen blanc complet, un glossaire et des conseils pour le jour de l’examen.',
    duration: '15 modules + examen blanc',
    instructor: {
      name: 'BKLN Software',
      bio: 'Des développeurs avec une vraie expérience de projets commerciaux : applications Android, marketplaces, API, automatisation et IA. Nous enseignons ce que nous utilisons.',
      avatar: '',
    },
    modules: [
      {
        id: 'p1',
        title: 'Partie I · Concepts du cloud',
        duration: '≈ 1 h 42 min de lecture',
        lessons: [
          { id: 'p1-m1', title: 'Qu’est-ce que le cloud ?', duration: '18 min', isFree: true },
          { id: 'p1-m2', title: 'IaaS, PaaS et SaaS', duration: '22 min', isFree: true },
          { id: 'p1-m3', title: 'Modèles de déploiement', duration: '20 min', isFree: true },
          { id: 'p1-m4', title: 'Avantages du cloud', duration: '22 min', isFree: true },
          { id: 'p1-m5', title: 'CapEx, OpEx et responsabilité', duration: '20 min', isFree: true },
        ],
      },
      {
        id: 'p2',
        title: 'Partie II · Architecture et services',
        duration: '≈ 2 h 20 min de lecture',
        lessons: [
          { id: 'p2-m1', title: 'Régions et zones', duration: '22 min', isFree: true },
          { id: 'p2-m2', title: 'Hiérarchie des ressources', duration: '20 min', isFree: true },
          { id: 'p2-m3', title: 'Services de calcul', duration: '26 min', isFree: true },
          { id: 'p2-m4', title: 'Réseau', duration: '24 min', isFree: true },
          { id: 'p2-m5', title: 'Stockage', duration: '24 min', isFree: true },
          { id: 'p2-m6', title: 'Identité (Entra ID)', duration: '24 min', isFree: true },
        ],
      },
      {
        id: 'p3',
        title: 'Partie III · Gestion et gouvernance',
        duration: '≈ 1 h 24 min de lecture',
        lessons: [
          { id: 'p3-m1', title: 'Gestion des coûts', duration: '22 min', isFree: true },
          { id: 'p3-m2', title: 'Gouvernance et conformité', duration: '22 min', isFree: true },
          { id: 'p3-m3', title: 'Outils de gestion', duration: '20 min', isFree: true },
          { id: 'p3-m4', title: 'Supervision', duration: '20 min', isFree: true },
        ],
      },
      {
        id: 'extra',
        title: 'Évaluation et ressources',
        duration: '≈ 38min',
        lessons: [
          { id: 'extra-m1', title: 'Examen blanc', duration: '30 min', isFree: true },
          { id: 'extra-m2', title: 'Glossaire', duration: '—', isFree: true },
          { id: 'extra-m3', title: 'Conseils pour le jour de l’examen', duration: '8 min', isFree: true },
        ],
      },
    ],
    includes: [
      '15 modules répartis en 3 parties + un examen blanc final',
      'Quiz interactifs avec l’explication de chaque réponse',
      'Glossaire et conseils pour le jour de l’examen',
      'Progression enregistrée automatiquement dans le navigateur',
      'Sans inscription — accès à vie',
    ],
  },
}
