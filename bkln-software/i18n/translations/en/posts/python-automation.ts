import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Python for automation: real cases we have solved',
  excerpt: 'Not theory — concrete examples of Python scripts we use in production: scraping with robust error handling, automated reports and bots that run unsupervised.',
  content: `## Why Python for automation

There is a reason Python is the automation language par excellence: the distance between “I have an idea” and “this works” is remarkably short.

At BKLN we have used Python to solve tasks that used to take hours of manual work. Here are three real cases.

## Case 1: Fault-tolerant data extraction

The first script we built for a client was a data extractor for web portals. The classic scraping problem isn’t getting the data — it’s the script failing at 2 a.m. because a page took too long or changed its structure.

The solution was an extractor with automatic retries and detailed logging:

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
            logging.warning(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(delay * (attempt + 1))
    logging.error(f"All attempts failed for {url}")
    return None
\`\`\`

With this pattern, the script doesn’t die at the first error. It retries with an increasing wait, logs everything to a file and moves on to the next item. The client runs it every night with \`cron\` and has the data ready in the morning.

## Case 2: Automatic PDF report generation

A client needed a weekly sales report that they used to prepare by hand in Excel — two hours of work every Monday. We automated it with Python + \`reportlab\`.

The key was separating the data logic from the presentation logic:

\`\`\`python
def generate_report(data, period):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    # Title
    styles = getSampleStyleSheet()
    elements.append(Paragraph(f"Sales report — {period}", styles['Title']))
    elements.append(Spacer(1, 20))

    # Data table
    table_data = [['Product', 'Units', 'Total XAF']]
    for row in data:
        table_data.append([row['product'], str(row['units']), f"{row['total']:,}"])

    table = Table(table_data, colWidths=[200, 80, 100])
    table.setStyle(table_style())
    elements.append(table)

    doc.build(elements)
    return buffer.getvalue()
\`\`\`

The script runs on Mondays at 7:00 AM and emails the PDF automatically. The client doesn’t touch a thing.

## Case 3: Uptime monitor with alerts

For another client we built a monitor that checks every 5 minutes whether their application is responding correctly and sends a WhatsApp message if it detects a problem.

\`\`\`python
import schedule
import requests

def check_service(url, threshold_ms=2000):
    try:
        start = time.time()
        r = requests.get(url, timeout=10)
        duration_ms = (time.time() - start) * 1000

        if r.status_code != 200:
            alert(f"⚠️ {url} returns {r.status_code}")
        elif duration_ms > threshold_ms:
            alert(f"🐢 {url} takes {duration_ms:.0f}ms (threshold: {threshold_ms}ms)")
        else:
            logging.info(f"✓ {url} — {duration_ms:.0f}ms")

    except requests.RequestException as e:
        alert(f"🔴 {url} is not responding: {e}")

schedule.every(5).minutes.do(lambda: check_service("https://your-app.com"))

while True:
    schedule.run_pending()
    time.sleep(1)
\`\`\`

Simple, effective, with no unnecessary third-party dependencies.

## What these scripts have in common

All three share the same principle: **they do one thing and do it well**. They don’t try to be frameworks. They have no XML or YAML configuration. They are straightforward Python scripts that any developer can read, modify and maintain.

Automation doesn’t have to be complex to be valuable. Sometimes the biggest impact comes from the most boring task someone was doing by hand.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'The BKLN Software & Systems development team.',
  },
  tags: ['Python', 'Automation', 'Scraping', 'Scripts'],
}
