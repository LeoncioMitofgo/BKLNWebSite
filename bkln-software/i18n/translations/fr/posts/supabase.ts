import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Supabase en production : ce que personne ne vous dit',
  excerpt: 'Nous utilisons Supabase dans plusieurs projets en service. Voici ce que nous avons appris : un RLS bien fait, Realtime sans fuites de mémoire, une authentification multi-méthodes et les vraies limites de l’offre gratuite.',
  content: `## Pourquoi nous utilisons Supabase

Chez BKLN, nous utilisons Supabase en production sur plusieurs projets différents : une marketplace entre particuliers, une plateforme de rencontres, un système de gestion scolaire et un site d’entreprise avec formulaires. Ce n’est pas un choix au hasard — c’est l’outil qui équilibre le mieux productivité, contrôle et coût pour le type de projets que nous construisons.

Mais Supabase a des subtilités que la documentation ne couvre pas toujours. Voici ce que nous avons appris.

## Row Level Security : faites-le bien dès le départ

Le RLS est la fonctionnalité qui déroute le plus les équipes venant de Firebase. Dans Firebase, le contrôle d’accès se trouve dans des règles de sécurité séparées du schéma. Dans Supabase, il vit directement dans PostgreSQL.

En développement, la tentation est de désactiver le RLS pour aller plus vite. **Ne le faites pas.** Il est bien plus difficile de l’ajouter après coup que de le concevoir dès le départ.

Le modèle que nous utilisons dans tous nos projets :

\`\`\`sql
-- Activer le RLS sur toutes les tables utilisateur
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs ne voient que leurs propres messages
CREATE POLICY "utilisateurs_voient_leurs_messages"
ON messages FOR SELECT
USING (
  auth.uid() = sender_id OR
  auth.uid() = receiver_id
);

-- Seul l'expéditeur peut insérer
CREATE POLICY "utilisateurs_inserent_leurs_messages"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);
\`\`\`

L’erreur la plus courante : oublier que le RLS s’applique aussi aux abonnements Realtime. Si vous avez une politique SELECT restrictive, votre canal Realtime ne recevra que les changements que cette politique autorise. C’est bien pour la sécurité, mais cela peut prêter à confusion si on ne le sait pas.

## Realtime sans fuites de mémoire

Supabase Realtime est puissant mais demande de gérer les abonnements à la main. Si vous ouvrez des canaux sans les fermer, vous accumulez des connexions qui consomment des ressources côté client et côté serveur.

En JavaScript pur (sans hooks React pour faire le nettoyage automatiquement), voici le modèle que nous suivons :

\`\`\`javascript
let activeChannel = null

function sAbonnerAConversation(conversationId) {
  // Nettoyer le canal précédent s'il existe
  if (activeChannel) {
    supabase.removeChannel(activeChannel)
    activeChannel = null
  }

  activeChannel = supabase
    .channel(\`conv:\${conversationId}\`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: \`conversation_id=eq.\${conversationId}\`
    }, gererNouveauMessage)
    .subscribe()
}

// En quittant la vue
function nettoyer() {
  if (activeChannel) {
    supabase.removeChannel(activeChannel)
    activeChannel = null
  }
}
\`\`\`

La règle : pour chaque \`channel()\` que vous ouvrez, il vous faut un \`removeChannel()\` quand vous n’en avez plus besoin.

## Une authentification multi-méthodes sans complexité

Supabase Auth prend en charge e-mail/mot de passe, lien magique, OAuth (Google, GitHub, etc.) et OTP par SMS. L’astuce, c’est qu’ils partagent tous la même session — vous n’avez pas à gérer plusieurs systèmes d’authentification.

Ce que vous devez gérer, en revanche : le parcours d’accueil après la première connexion. Avec OAuth, l’utilisateur arrive avec un e-mail mais sans les données de profil dont vous avez besoin. Le modèle que nous utilisons est un trigger PostgreSQL :

\`\`\`sql
CREATE OR REPLACE FUNCTION creer_profil_utilisateur()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profils (id, email, cree_le)
  VALUES (NEW.id, NEW.email, NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER a_la_creation_utilisateur
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION creer_profil_utilisateur();
\`\`\`

Ainsi, quelle que soit la méthode de connexion, vous disposez toujours immédiatement d’un profil.

## Les vraies limites de l’offre gratuite

L’offre gratuite de Supabase est généreuse pour le développement et les petits projets, mais elle a des limites qu’il vaut mieux connaître avant de lancer :

- **500 Mo de base de données** — suffisant pour commencer, limitant si vous stockez des fichiers ou des logs dans la base
- **2 Go de bande passante** — la limite la plus facile à atteindre si vous servez des images depuis Supabase Storage
- **50 000 utilisateurs actifs par mois** — rarement un problème au début
- **Projets mis en pause** après 7 jours d’inactivité — ça, c’est vraiment gênant en développement

Pour des projets en production avec un vrai trafic, l’offre Pro (25 $/mois) est le bon choix. Mais pour un MVP, l’offre gratuite va bien plus loin qu’il n’y paraît.

## Notre bilan après plusieurs projets

Supabase est la meilleure option que nous connaissions pour les projets où l’on veut une vraie base PostgreSQL (avec toutes ses capacités : fonctions, triggers, index, recherche plein texte) sans gérer d’infrastructure.

La courbe d’apprentissage du RLS est réelle, mais elle en vaut la peine. Une fois compris, il vous donne sur qui accède à quoi un niveau de contrôle que Firebase n’offre tout simplement pas.

L’utiliserions-nous pour un projet de plusieurs millions d’utilisateurs ? Cela dépendrait du cas. Pour les projets que nous construisons — applications métier, plateformes de niche, systèmes de gestion — c’est exactement l’outil qu’il nous faut.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['Supabase', 'PostgreSQL', 'RLS', 'Realtime', 'Auth'],
}
