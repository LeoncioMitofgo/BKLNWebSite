import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Python pour l’automatisation : des cas réels que nous avons résolus',
  excerpt: 'Pas de théorie — des exemples concrets de scripts Python que nous utilisons en production : scraping avec une gestion d’erreurs robuste, automatisation de rapports et bots qui tournent sans supervision.',
  content: `## Pourquoi Python pour automatiser

Il y a une raison pour laquelle Python est le langage d’automatisation par excellence : la distance entre « j’ai une idée » et « ça marche » est remarquablement courte.

Chez BKLN, nous avons résolu avec Python des tâches qui demandaient auparavant des heures de travail manuel. Voici trois cas réels.

## Cas 1 : extraction de données tolérante aux pannes

Le premier script que nous avons construit pour un client était un extracteur de données de portails web. Le problème classique du scraping n’est pas d’obtenir les données — c’est que le script plante à 2 heures du matin parce qu’une page a mis trop de temps à répondre ou a changé de structure.

La solution a été un extracteur avec des tentatives automatiques et une journalisation détaillée :

\`\`\`python
import requests
from bs4 import BeautifulSoup
import time
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('scraper.log'),
        logging.StreamHandler()
    ]
)

def fetch_with_retry(url, max_retries=3, delay=2):
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response
        except requests.RequestException as e:
            logging.warning(f"Tentative {attempt + 1} échouée : {e}")
            if attempt < max_retries - 1:
                time.sleep(delay * (attempt + 1))
    logging.error(f"Toutes les tentatives ont échoué pour {url}")
    return None
\`\`\`

Avec ce modèle, le script ne s’arrête pas à la première erreur. Il réessaie avec une attente croissante, consigne tout dans un fichier de log et passe à l’élément suivant. Le client l’exécute chaque nuit avec \`cron\` et, le matin, les données sont prêtes.

## Cas 2 : génération automatique de rapports PDF

Un client avait besoin d’un rapport de ventes hebdomadaire qu’il préparait auparavant à la main dans Excel — deux heures de travail chaque lundi. Nous l’avons automatisé avec Python + \`reportlab\`.

La clé a été de séparer la logique des données de la logique de présentation :

\`\`\`python
def generer_rapport(donnees, periode):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    # Titre
    styles = getSampleStyleSheet()
    elements.append(Paragraph(f"Rapport des ventes — {periode}", styles['Title']))
    elements.append(Spacer(1, 20))

    # Tableau de données
    donnees_tableau = [['Produit', 'Unités', 'Total FCFA']]
    for ligne in donnees:
        donnees_tableau.append([ligne['produit'], str(ligne['unites']), f"{ligne['total']:,}"])

    tableau = Table(donnees_tableau, colWidths=[200, 80, 100])
    tableau.setStyle(style_tableau())
    elements.append(tableau)

    doc.build(elements)
    return buffer.getvalue()
\`\`\`

Le script s’exécute le lundi à 7 h et envoie automatiquement le PDF par e-mail. Le client n’a rien à faire.

## Cas 3 : surveillance de disponibilité avec alertes

Pour un autre client, nous avons construit un outil qui vérifie toutes les 5 minutes que son application répond correctement et envoie un message WhatsApp s’il détecte un problème.

\`\`\`python
import schedule
import requests

def verifier_service(url, seuil_ms=2000):
    try:
        debut = time.time()
        r = requests.get(url, timeout=10)
        duree_ms = (time.time() - debut) * 1000

        if r.status_code != 200:
            alerter(f"⚠️ {url} renvoie {r.status_code}")
        elif duree_ms > seuil_ms:
            alerter(f"🐢 {url} met {duree_ms:.0f} ms (seuil : {seuil_ms} ms)")
        else:
            logging.info(f"✓ {url} — {duree_ms:.0f} ms")

    except requests.RequestException as e:
        alerter(f"🔴 {url} ne répond pas : {e}")

schedule.every(5).minutes.do(lambda: verifier_service("https://votre-app.com"))

while True:
    schedule.run_pending()
    time.sleep(1)
\`\`\`

Simple, efficace, sans dépendances tierces inutiles.

## Ce que ces scripts ont en commun

Tous les trois partagent le même principe : **ils font une seule chose, et ils la font bien**. Ils n’essaient pas d’être des frameworks. Ils n’ont pas de configuration XML ni YAML. Ce sont des scripts Python directs que n’importe quel développeur peut lire, modifier et maintenir.

L’automatisation n’a pas besoin d’être complexe pour avoir de la valeur. Parfois, le plus grand impact vient de la tâche la plus ennuyeuse que quelqu’un faisait à la main.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'L’équipe de développement de BKLN Software & Systems.',
  },
  tags: ['Python', 'Automatisation', 'Scraping', 'Scripts'],
}
