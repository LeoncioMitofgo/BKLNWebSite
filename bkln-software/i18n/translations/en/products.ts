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
  zentry: {
    title: 'Zentry',
    description: 'Manage your events and QR access control from any device. Backend included and managed by BKLN. Unlimited guests.',
    longDescription:
      'Zentry is an event management and QR access control platform. With your login you create your events, add unlimited guests with VIP, Standard or Staff tickets, and manage access control in real time.\n\nThere is nothing to set up — the backend is included and fully managed by BKLN. You just log in and start creating events from any device: Android, iOS, Web, Windows, macOS or Linux.\n\nThe scanner validates QR codes in real time: it detects duplicate entries, blocks entry when capacity is reached and responds with distinct sounds and vibrations. Each guest’s QR code can be shared directly on WhatsApp with a single tap.',
    pricingNote: 'Pay per event or annual licence.',
    includes: [
      'Pay per event or annual licence',
      '1 access account (single login)',
      'Unlimited events with the annual licence',
      'Unlimited guests per event',
      'Backend managed by BKLN — no setup needed',
      'Available on Android, iOS, Web, Windows, macOS and Linux',
    ],
    requirements: ['Android 8.0+ / iOS 13+ / Web / Windows 10+', 'Internet connection', 'Camera (for the QR scanner)'],
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
