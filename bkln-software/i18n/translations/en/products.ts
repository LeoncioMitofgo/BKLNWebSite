import type { ProductText } from '../../content'

export const products: Record<string, ProductText> = {
  gestescolar: {
    title: 'GestEscolar',
    description: 'A complete school management system for Windows — installation, training and manual included. Works offline on the local network.',
    longDescription:
      'GestEscolar is a comprehensive school management system ready to install in any school running Windows. It covers the full academic cycle: student records with medical details and guardian, enrolment with payment tracking, termly grades, teacher and classroom management, and internal notices.\n\nIt works completely offline on the school’s local network — no cloud subscriptions, no external dependencies. It can be used from any computer connected to the school network.\n\nIt generates documents ready to print: student ID cards, class lists, termly report cards and payment history. Two user roles: Administrator and Secretary.',
    pricingNote: 'One-off licence purchase or annual licence. A prior meeting is required to define the scope.',
    includes: [
      'Remote or on-site installation included',
      'Complete operating manual',
      '2 days of staff training',
      'Perpetual or annual licence, whichever suits the school best',
    ],
    supportPlan: {
      period: 'year',
      includes: [
        'Priority remote and on-site support',
        'Free version updates',
        'New features at no extra cost',
      ],
    },
    requirements: ['Windows 10 / 11', 'Python 3.10+ (installed automatically)', 'Local network for multi-computer access'],
  },
  pasa: {
    title: 'Pasa',
    description: 'QR ticket sales and door control for parties, concerts and events: your team records each paid ticket, sends it on WhatsApp and scans it at the door from their phones. With your event’s logo and colours.',
    longDescription:
      'Pasa is the ticketing system for organisers who sell by hand: money comes in through mobile money or cash, and the team needs to keep track, send the tickets and control the door without paper lists. It runs in the phone’s browser, with nothing to install, and can be added to the home screen like an app.\n\nEach seller records a ticket in seconds: name, WhatsApp number, type (VIP, general, guest…) and the amount paid. Pasa generates a unique QR code and writes the WhatsApp message with the link to the ticket. The buyer gets it in their chat and shows it at the door, without downloading anything.\n\nAt the door, the doorman scans with the phone’s camera. The whole screen turns green if the person can go in, or red if the ticket has already been used or cancelled, with vibration and sound, and the ticket type appears in large letters so it’s clear at once who goes to the VIP area. If a QR code won’t scan, the ticket can be found by name or code. A ticket can never get in twice, even if two doormen scan it at the same time.\n\nThe organiser sees live what has been sold, each seller’s takings, with cash and mobile money shown separately, and how many people have come in each night. Every team member logs in with their own PIN and only sees what they need: doormen scan, sellers record and send, and the admin controls everything and can revoke someone’s access instantly.\n\nThe app carries your event’s name, logo and colours, and works for one-night or multi-night events. It is already in use in Accra (Ghana) for Crazy December, the end-of-year party of +240 Dream Team Party.',
    pricingNote: 'Per event, customised with your brand.',
    includes: [
      'Your logo, your colours and your event’s ticket types',
      'Recording of tickets paid by mobile money or cash',
      'A unique QR code per ticket and WhatsApp sending with the message already written',
      'A scanner on the doorman’s phone: green if they’re in, red if not, with manual search',
      'One-night or multi-night events, with one entry per night',
      'Team access by PIN with three roles: admin, sales and door',
      'Live summary: sales, takings per seller and attendance',
      'Setup and hosting managed by BKLN',
    ],
    requirements: [
      'Phones with a camera (Android or iPhone) and an up-to-date browser',
      'Internet connection at the door',
      'A WhatsApp number to send the tickets',
    ],
  },
  brookai: {
    title: 'BrookAI',
    description: 'An AI customer service bot that learns from your documents and answers on your website and on WhatsApp. Multi-tenant and resellable — one system, many clients, each with its own identity.',
    longDescription:
      'BrookAI is an AI chatbot SaaS built to run in production from day one. It plugs into any website with a code snippet and into the WhatsApp Business API — the same bot, on every channel where your customers are.\n\nThe bot answers using only the documents you upload: catalogues, manuals, FAQs, price lists, policies. It doesn’t make things up — it searches your own content using RAG (pgvector + LangChain) and answers in your own words. If it still can’t answer after several attempts, it automatically hands the conversation over to a human agent.\n\nEach client has its own isolated space (multi-tenant): its documents, its settings, its conversation history and its metrics. From the admin dashboard they can manage everything without touching code — upload documents, customise the bot’s name and tone, browse the history and review which questions it couldn’t answer.\n\nIf you are an agency or a consultant, BrookAI is resellable: you can offer the service to your own clients under your brand, each with their own tenant and independent settings.\n\nStack: FastAPI (Python) · Claude API (Anthropic) · LangChain + pgvector · Supabase · Vanilla JS widget · React + Vite · WhatsApp Business API.',
    pricingNote: 'Plans based on query volume.',
    includes: [
      'Bot trained on your documents (PDF, TXT, URLs) — RAG with pgvector',
      'JS widget you can embed in any website with a single snippet',
      'Full integration with the WhatsApp Business API',
      'Automatic handover to a human agent when the bot can’t answer',
      'Admin dashboard to manage documents, settings and metrics',
      'Multi-tenant — one system for many clients, each one isolated',
      'Conversation history and analysis of unanswered questions',
      'Installation and setup included · Team training',
    ],
    requirements: [
      'An active website or WhatsApp Business number',
      'Business documents in PDF or plain text',
      'Internet connection',
    ],
  },
}
