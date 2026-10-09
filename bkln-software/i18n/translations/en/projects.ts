import type { ProjectText } from '../../content'

export const projects: Record<string, ProjectText> = {
  zentry: {
    description: 'A cross-platform app for event management and QR access control — VIP, Standard and Staff tickets, a real-time scanner with sound and vibration, available on Android, iOS, Web and desktop.',
    longDescription:
      'Organising an event in Malabo used to mean paper lists, photocopied tickets and manual access control. With Zentry, the organiser creates the event in minutes, adds guests from their phone and shares each guest’s QR code directly on WhatsApp — with a single tap.\n\nAt the door, staff scan the codes with the device’s camera. The system responds in under a second: valid ticket, already scanned, venue full or invalid code — each case with its own sound and vibration, so staff don’t need to look at the screen in a noisy environment. Duplicate entries are impossible.\n\nThe dashboard shows in real time how many people have entered, how many are still to come and how close the event is to capacity. Everything is synced instantly across all the team’s devices.\n\nZentry runs on Android, iOS, Web, Windows, macOS and Linux from a single app — which means the organiser manages from a laptop and the staff check tickets from their phones, without installing different apps.',
    sector: 'Events',
    challenges: [
      'Preventing two staff members from validating the same QR code at the same time — a race condition at the entrance',
      'Instant feedback in noisy environments: the scanner has to communicate without relying on sound alone',
      'Sharing individual QR codes on WhatsApp in high resolution from a phone',
      'A single app that works on Android, iOS, Web and desktop without duplicating code',
    ],
    solutions: [
      'A Supabase query with an atomic status update — if two devices scan the same QR code at once, only one gets through',
      'A combination of sound + vibration with distinct patterns for each result, falling back to vibration only',
      'Exporting the QR code as a high-resolution image (3x pixel ratio) before sharing',
      'Flutter, with platform-specific logic separated only where strictly necessary',
    ],
  },
  brookai: {
    description: 'A multi-tenant AI chatbot SaaS: a customer service bot that learns from a business’s own documents, plugs into any website and WhatsApp, and escalates to a human agent.',
    longDescription:
      'BrookAI was born from a concrete need: companies that wanted to serve their customers outside business hours without hiring more staff. The bot answers using only the business’s own documents (RAG with pgvector and LangChain); it doesn’t make things up or hallucinate — if it doesn’t know, it says so and hands over to a human.\n\nThe architecture is multi-tenant by design: each client has its own isolated space with its documents, its history and its settings. The same production system serves many companies without any of them seeing the others’ data.\n\nAdding it to a client’s website takes a single JavaScript snippet — no dependencies to install and no changes to the existing backend. The widget initialises with the tenant’s API key and starts answering straight away. The WhatsApp Business API integration takes the same bot to the most widely used messaging channel in the market.\n\nThe admin dashboard (React + Vite) lets clients manage documents, see the full conversation history, review which questions the bot couldn’t answer (a direct signal of which documentation is missing) and set the bot’s tone and name — all without touching code.\n\nStack: FastAPI · Python · Claude API (Anthropic) · LangChain · pgvector · Supabase · Vanilla JS widget · React + Vite · WhatsApp Business API. Dockerised, with CI/CD, and deployed on our own server.',
    sector: 'Customer service',
    challenges: [
      'Reliable RAG: the bot must answer only with the client’s real information, without hallucinating or mixing in other tenants’ data',
      'Complete isolation between tenants — documents, vectors and conversations must be invisible across clients',
      'An embeddable JS widget that doesn’t break the host website’s styles or JavaScript',
      'WhatsApp Business API integration: Meta signature validation and session management per phone number',
    ],
    solutions: [
      'A tenant_id filter on every pgvector search — each RAG query only reaches that tenant’s chunks',
      'Row Level Security in Supabase + hashed API keys per tenant — no way to reach other clients’ data even if the request is tampered with',
      'Shadow DOM for the widget: styles and scripts fully encapsulated, zero conflicts with the host',
      'A webhook endpoint with X-Hub-Signature-256 validation and conversation sessions indexed by phone number',
    ],
  },
  gestescolar: {
    description: 'A complete school management system for schools in Equatorial Guinea — students, enrolment, grades, payments and printable documents. Works without internet, one-click installation.',
    longDescription:
      'Most schools in Equatorial Guinea manage their students in Excel, their payments in notebooks and their report cards by hand. GestEscolar digitises that whole workflow in a system any school secretary can learn to use in a day.\n\nFrom day one, the school can register students with a full record (medical details, guardian, documents), manage enrolment with payment tracking, enter grades by term and generate report cards ready to print. Student ID cards are produced automatically. So are class lists. All from the browser, without installing anything on each computer.\n\nThe system works completely without internet — it runs on the school’s local network. If the server is switched off, nobody loses data: everything is in the local database. To use it from another computer in the school, you just open the browser and type the server’s IP address.\n\nThe full installation takes less than 5 minutes: a .bat file sets up the Python environment, creates the database and starts the server. No IT knowledge is needed to install it or maintain it.',
    sector: 'Education',
    challenges: [
      'Schools with no internet or cloud server — everything has to work offline on the local network',
      'Non-technical staff: installation cannot require any IT knowledge',
      'A complex academic hierarchy: Level → Grade → Class → Subject → Student, with history preserved',
      'Report cards, lists and ID cards that can be printed straight from the browser',
    ],
    solutions: [
      'Local SQLite accessed over the LAN — no external dependencies, no subscriptions, no cloud',
      'A .bat script that installs Python and the dependencies and starts the server with a double click',
      'A 14-table data model with soft deletes — deleted records are kept in the history',
      'CSS @media print with .no-print classes to produce clean documents from any view',
    ],
  },
  'sistema-pos-android-comercios': {
    title: 'Android POS system for shops',
    description: 'A point-of-sale system for Android terminals with a catalogue, operators, cash-up, printing and a remote management dashboard.',
    longDescription:
      'We developed an Android point-of-sale system and a mobile operations dashboard to manage products, operators, terminals, sales and revenue from a single backend.\n\nOn the terminal, the operator logs in with a PIN validated on the server, creates the sale, prints the receipt and can keep working from a local cache when the connection is unstable. The dashboard lets the owner monitor sales, products and terminals without interrupting the flow at the counter.\n\nThe hardware integration covers printing and contactless reading through the device’s SDK. The EMV flow was prepared and tested on development hardware; real bank authorisation still requires an acquirer, production keys and specific certification.\n\nStack: Kotlin · Jetpack Compose · Hilt · Room · Retrofit · WorkManager · Supabase · PostgreSQL.',
    sector: 'Retail and hospitality',
    challenges: [
      'Keeping the sales flow available when the connection is intermittent',
      'Preventing two counters from claiming the same terminal or duplicating a sale if the connection drops mid-transaction',
      'A cash-up that always balances, even if the device loses its connection right as the shift closes',
      'A second management app that reflects the business in real time without slowing down the card terminal at the counter',
    ],
    solutions: [
      'Integration with the terminal’s SDK for printing and contactless reading, with clear feedback on errors and timeouts',
      'A local queue with WorkManager that syncs in the background, with terminal assignment resolved atomically on the backend',
      'Cash-up validated on the server — the remote state always wins, and the device never “assumes” a cash-up went through',
      'A management dashboard on the same backend with its own sync cycle — the owner sees the business in real time without touching the counter flow',
    ],
  },
  'plataforma-delivery-multivertical': {
    title: 'Multi-category delivery platform',
    description: 'A web and mobile ecosystem for orders, merchants and delivery riders, with assignment, delivery fees and real-time tracking.',
    longDescription:
      'We designed an on-demand logistics platform with separate apps for customers and riders, plus dashboards for operations. The system covers food, groceries, pharmacy and parcels from a common architecture.\n\nThe main flow covers the catalogue, cart, checkout, order creation, time-limited offers to riders, delivery statuses, earnings and real-time tracking. Sensitive logic runs in server-side functions, and the apps share types, rules and domain components.\n\nThe project was built with particular attention to the local context: whole-number amounts in XAF, variable connectivity, explicit cancellation rules and permissions enforced in the database.',
    sector: 'Logistics and delivery',
    status: 'In development',
    challenges: ['Coordinating customers, merchants and riders with valid, consistent statuses', 'Assigning orders with timed offers without relying on constant polling', 'Calculating delivery fees and protecting critical operations on the server', 'Sharing data contracts between Flutter apps and web dashboards'],
    solutions: ['Edge Functions to create orders, calculate fees and assign riders', 'Supabase Realtime for tracking and offers, with RLS and triggers to enforce permissions', 'Shared packages for enums, constants, theme and business rules', 'Main flows verified end to end on a physical device'],
  },
  'suite-herramientas-web-privadas': {
    title: 'Private web tools suite',
    description: 'A platform of online utilities for productivity, documents, development and local data processing.',
    longDescription:
      'We built the foundation of a platform of fast, accessible digital tools, designed to solve specific tasks without forcing users to create an account. The technical priority is for every tool to load quickly and process data in the browser whenever possible, reducing infrastructure and the exposure of sensitive information.',
    sector: 'Digital tools',
    challenges: ['Designing many independent utilities without losing a consistent experience', 'Processing files and text while respecting privacy and performance', 'Creating pages that are useful for search engines without sacrificing accessibility', 'Growing the catalogue only when each tool adds real value'],
    solutions: ['Shared components and patterns to speed up new tools', 'Local processing on the client when an operation doesn’t need a backend', 'An SEO-first structure with clear routes, metadata and specialised content', 'Linting, type checking and tests built in from the start'],
  },
}
