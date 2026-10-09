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
  zentry: {
    title: 'Zentry',
    description: 'Gérez vos événements et le contrôle d’accès par QR depuis n’importe quel appareil. Backend inclus et géré par BKLN. Invités illimités.',
    longDescription:
      'Zentry est une plateforme de gestion d’événements et de contrôle d’accès par QR code. Avec votre identifiant, vous créez vos événements, ajoutez un nombre illimité d’invités avec des billets VIP, Standard ou Staff, et gérez le contrôle d’accès en temps réel.\n\nVous n’avez rien à configurer — le backend est inclus et entièrement géré par BKLN. Il vous suffit de vous connecter pour créer des événements depuis n’importe quel appareil : Android, iOS, Web, Windows, macOS ou Linux.\n\nLe scanner valide les QR codes en temps réel : il détecte les entrées en double, bloque l’accès quand la capacité est atteinte et répond par des sons et des vibrations distincts. Le QR code de chaque invité se partage directement sur WhatsApp d’un simple geste.',
    pricingNote: 'Paiement par événement ou licence annuelle.',
    includes: [
      'Paiement par événement ou licence annuelle',
      '1 compte d’accès (identifiant unique)',
      'Événements illimités avec la licence annuelle',
      'Invités illimités par événement',
      'Backend géré par BKLN — aucune configuration',
      'Disponible sur Android, iOS, Web, Windows, macOS et Linux',
    ],
    requirements: ['Android 8.0+ / iOS 13+ / Web / Windows 10+', 'Connexion internet', 'Caméra (pour le scanner QR)'],
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
