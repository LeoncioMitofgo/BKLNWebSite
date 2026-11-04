import type { ProductText } from '../../content'

export const products: Record<string, ProductText> = {
  gestescolar: {
    title: 'GestEscolar',
    description: 'Un système complet de gestion scolaire pour Windows — installation, formation et manuel inclus. Fonctionne hors ligne sur le réseau local.',
    longDescription:
      'GestEscolar est un système de gestion scolaire complet, prêt à installer dans n’importe quel établissement équipé de Windows. Il couvre tout le cycle scolaire : dossiers des élèves avec fiche médicale et responsable légal, inscriptions avec suivi des paiements, notes par trimestre, gestion des enseignants et des salles, et circulaires internes.\n\nIl fonctionne entièrement hors ligne sur le réseau local de l’établissement — sans abonnement au cloud, sans dépendances externes. Il est accessible depuis n’importe quel poste connecté au réseau de l’école.\n\nIl génère des documents prêts à imprimer : cartes d’élève, listes par classe, bulletins trimestriels et historique des paiements. Deux rôles d’utilisateur : Administrateur et Secrétariat.',
    pricingNote: 'Achat de licence ou licence annuelle. Un rendez-vous préalable est nécessaire pour définir le périmètre.',
    includes: [
      'Installation à distance ou sur place incluse',
      'Manuel d’utilisation complet',
      '2 jours de formation du personnel',
      'Licence définitive ou annuelle, selon ce qui convient le mieux à l’établissement',
    ],
    supportPlan: {
      period: 'an',
      includes: [
        'Assistance prioritaire à distance et sur place',
        'Mises à jour de version gratuites',
        'Nouvelles fonctionnalités sans coût supplémentaire',
      ],
    },
    requirements: ['Windows 10 / 11', 'Python 3.10+ (installation automatique)', 'Réseau local pour l’accès depuis plusieurs postes'],
  },
  pasa: {
    title: 'Pasa',
    description: 'Vente et contrôle de billets avec QR code pour soirées, concerts et événements : votre équipe enregistre chaque billet payé, l’envoie par WhatsApp et le scanne à l’entrée depuis son téléphone. Aux couleurs et avec le logo de votre événement.',
    longDescription:
      'Pasa est le système de billetterie des organisateurs qui vendent en direct : l’argent arrive par paiement mobile ou en espèces, et l’équipe doit tenir les comptes, envoyer les billets et contrôler l’entrée sans listes papier. Il s’utilise depuis le navigateur du téléphone, sans rien installer, et peut s’ajouter à l’écran d’accueil comme une application.\n\nChaque vendeur enregistre un billet en quelques secondes : nom, WhatsApp, type (VIP, standard, invité…) et montant payé. Pasa génère un QR code unique et prépare le message WhatsApp avec le lien vers le billet. L’acheteur le reçoit dans sa conversation et le présente à l’entrée, sans rien télécharger.\n\nÀ l’entrée, le portier scanne avec l’appareil photo de son téléphone. Tout l’écran devient vert si la personne peut entrer, ou rouge si le billet a déjà été utilisé ou annulé, avec vibration et son, et le type de billet s’affiche en grand pour savoir tout de suite qui va en zone VIP. Si un QR code ne se lit pas, on cherche le billet par nom ou par code. Un billet ne peut jamais entrer deux fois, même si deux portiers le scannent en même temps.\n\nL’organisateur voit en direct les ventes, la caisse de chaque vendeur, avec les espèces et le paiement mobile séparés, et le nombre d’entrées de chaque soirée. Chaque membre de l’équipe se connecte avec son propre code PIN et ne voit que ce qui le concerne : le portier scanne, le vendeur enregistre et envoie, et l’administrateur contrôle tout et peut retirer un accès à tout moment.\n\nL’application porte le nom, le logo et les couleurs de votre événement, et convient aux événements d’une ou de plusieurs soirées. Elle est déjà utilisée à Accra (Ghana) pour Crazy December, la fête de fin d’année de +240 Dream Team Party.',
    pricingNote: 'Par événement, personnalisé à vos couleurs.',
    includes: [
      'Votre logo, vos couleurs et les types de billets de votre événement',
      'Enregistrement des billets payés par paiement mobile ou en espèces',
      'Un QR code unique par billet et envoi par WhatsApp avec le message déjà rédigé',
      'Un scanner sur le téléphone du portier : vert s’il passe, rouge sinon, avec recherche manuelle',
      'Événements d’une ou de plusieurs soirées, avec une entrée par soirée',
      'Accès de l’équipe par code PIN avec trois rôles : administration, vente et entrée',
      'Résumé en direct : ventes, caisse par vendeur et fréquentation',
      'Mise en place et hébergement gérés par BKLN',
    ],
    requirements: [
      'Des téléphones avec appareil photo (Android ou iPhone) et un navigateur à jour',
      'Une connexion internet à l’entrée',
      'Un numéro WhatsApp pour envoyer les billets',
    ],
  },
  brookai: {
    title: 'BrookAI',
    description: 'Un bot de service client avec IA qui apprend de vos documents et répond sur votre site et sur WhatsApp. Multi-tenant et revendable — un seul système, plusieurs clients, chacun avec sa propre identité.',
    longDescription:
      'BrookAI est un chatbot SaaS d’intelligence artificielle conçu pour fonctionner en production dès le premier jour. Il s’intègre à n’importe quel site avec un extrait de code et à l’API WhatsApp Business — le même bot, sur tous les canaux où se trouvent vos clients.\n\nLe bot répond uniquement à partir des documents que vous téléversez : catalogues, manuels, questions fréquentes, listes de prix, politiques. Il n’invente rien — il cherche dans votre propre contenu grâce au RAG (pgvector + LangChain) et répond avec vos propres mots. S’il ne sait toujours pas répondre après plusieurs tentatives, il transmet automatiquement la conversation à un agent humain.\n\nChaque client dispose de son propre espace isolé (multi-tenant) : ses documents, sa configuration, son historique de conversations et ses statistiques. Depuis le tableau d’administration, il gère tout sans toucher au code — téléverser des documents, personnaliser le nom et le ton du bot, consulter l’historique et voir à quelles questions il n’a pas su répondre.\n\nSi vous êtes une agence ou un consultant, BrookAI est revendable : vous pouvez proposer le service à vos propres clients sous votre marque, chacun avec son propre espace et une configuration indépendante.\n\nStack : FastAPI (Python) · Claude API (Anthropic) · LangChain + pgvector · Supabase · Widget Vanilla JS · React + Vite · WhatsApp Business API.',
    pricingNote: 'Forfaits selon le volume de requêtes.',
    includes: [
      'Bot entraîné sur vos documents (PDF, TXT, URL) — RAG avec pgvector',
      'Widget JS à intégrer sur n’importe quel site avec un seul extrait de code',
      'Intégration complète avec l’API WhatsApp Business',
      'Transfert automatique vers un agent humain quand le bot ne sait pas répondre',
      'Tableau d’administration pour gérer les documents, la configuration et les statistiques',
      'Multi-tenant — un seul système pour plusieurs clients, chacun isolé',
      'Historique des conversations et analyse des questions sans réponse',
      'Installation et mise en service incluses · Formation de l’équipe',
    ],
    requirements: [
      'Un site web ou un numéro WhatsApp Business actif',
      'Documents de l’entreprise en PDF ou en texte brut',
      'Connexion internet',
    ],
  },
}
