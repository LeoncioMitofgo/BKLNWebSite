import type { ProjectText } from '../../content'

export const projects: Record<string, ProjectText> = {
  'bkln-en-odoo': {
    title: 'BKLN on Odoo',
    description: 'We run our own company on Odoo, with Equatorial Guinea’s accounting, and we have set up a complete demo company: imported purchases at their real cost, warehouses in Malabo and Bata, sales, invoices, projects with hours and maintenance.',
    longDescription:
      'Before implementing Odoo in a client’s company, we set it up in our own. BKLN Software & Systems works on Odoo with the official localisation for Equatorial Guinea: SYSCOHADA chart of accounts, VAT, CFA francs as the main currency, the euro at its fixed parity and the dollar at its exchange rate.\n\nAlongside our own management we have prepared a demo company that imports, stores and sells, so we can show each client what their day-to-day would look like before we start. An opportunity comes into the CRM, becomes a quotation and an order, the warehouse delivers and the invoice is created automatically, with payments and amounts due always in view.\n\nPurchases are made in euros or dollars and received into the Malabo or Bata warehouse, with a serial number for the equipment that needs one. When the bills for freight, customs and transport from the port arrive, they are spread over what was received and the cost of each product is updated: in the demo, a laptop bought for 410,000 FCFA actually costs 544,436 FCFA once it is in the warehouse. Real margins are calculated with that cost.\n\nServices are invoiced for what was actually done. When an installation order is confirmed, Odoo creates the project; the team logs its hours on each task and the invoice picks up the hours worked (42 of the 60 quoted in the example), not the estimate. The same system schedules servicing for generators, vehicles and servers, and collects staff travel expenses with their approval.\n\nEverything was loaded and checked through Odoo’s API with scripts rather than by hand: the same way we migrate a client’s data from their spreadsheets. The screenshots come from our Odoo with demo data: the customers, products, amounts and people are made up.',
    sector: 'Business management (ERP)',
    challenges: [
      'Equatorial Guinea accounting (SYSCOHADA, VAT, CFA francs) with suppliers who invoice in euros and dollars',
      'Knowing the real cost of imported goods when freight, customs and transport arrive on separate bills, weeks later',
      'Two warehouses in different cities and equipment that has to be tracked one by one by serial number',
      'Invoicing services for the hours actually worked, without parallel spreadsheets',
      'Loading master data and documents without typing errors, in a repeatable way',
    ],
    solutions: [
      'Official Equatorial Guinea localisation; euro at the fixed parity of 655.957 FCFA and dollar with a dated exchange rate',
      'Landed costs spread by value or by quantity over each receipt, with average cost per product',
      'One warehouse per city with internal transfers, receipts and deliveries, and serial numbers from receipt onwards',
      'Services that create their project when the order is confirmed; hours logged on tasks flow straight into the invoice',
      'Data and documents loaded over XML-RPC with idempotent scripts that check every step',
    ],
  },
  'bkln-marketplace': {
    description: 'A classified ads website for the whole of Equatorial Guinea: buying and selling between individuals and businesses, real-time chat, Premium shops and a moderation panel. Built for mobile phones and slow connections.',
    longDescription:
      'Equatorial Guinea had no buy-and-sell website built for its market: prices in CFA francs, buyers who almost always browse on their phones and very few card payments. BKLN Marketplace is our own product to fill that gap: ads of every kind, from cars and flats to phones, furniture or services, in Malabo, Bata and the rest of the country.\n\nAnyone can browse the ads without an account. With an account, people post an ad in four steps from their phone, save favourites and talk to the seller in a real-time chat with photos, without giving out their phone number. If the seller wants, a WhatsApp button appears too, but only for signed-in users: the phone number is never public and never shows up on Google.\n\nThere are two plans. Normal is free. Premium, from 1 to 12 months, gives more ads at once, more photos, a place among the featured ads and a shop with its own address. As hardly anyone pays by card, Premium is paid at our office in Malabo or, from elsewhere, through a money transfer agency, and we activate it from the admin panel. The platform is ready to add mobile payments later.\n\nTo keep the site trustworthy, any user can report an ad or a conversation: after three reports, the ad is hidden automatically until a moderator reviews it. Ads with banned terms are not published, and the panel brings together payments, reports and users, with a log of every action.\n\nEverything is designed for a basic Android phone on 3G: photos are compressed on the phone itself before uploading, each screen comes from the server in a single round trip, and the website can be installed on the home screen like an app, with alerts for new messages. More than 500 automated checks run through its real flows, from signing up to moderating from the panel.',
    sector: 'Classified ads',
    status: 'In development',
    challenges: [
      'Users on low-end phones with slow, expensive 3G connections: every photo and every trip to the server counts',
      'Putting buyers and sellers in touch without exposing their phone numbers',
      'Charging for a paid plan in a market where hardly anyone uses a card',
      'Keeping the site free of scams, banned ads and spam without a large moderation team',
    ],
    solutions: [
      'Photos converted to WebP and resized on the phone itself, with location data removed; pages built on the server with their data fetched in parallel',
      'An in-app real-time chat with photos and push notifications; the WhatsApp button is only visible to signed-in users and only if the seller turns it on',
      'Payment at the office or through a money transfer agency and activation from the panel, with each plan’s limits in an editable configuration rather than in the code',
      'Reports with automatic hiding after the third one, banned terms matched as whole words, blocking, and permissions enforced in the database itself (Row Level Security)',
    ],
  },
  pasa: {
    title: 'Tickets for Crazy December',
    description: 'QR ticket sales and door control for Crazy December, the end-of-year party of +240 Dream Team Party in Accra (Ghana): the team records each payment, sends the ticket on WhatsApp and scans it at the door.',
    longDescription:
      '+240 Dream Team Party is a group of Equatoguinean students in Accra (Ghana) who organise Crazy December: two back-to-back parties on 25 and 26 December 2026. Tickets are sold by hand, through MoMo (Ghana’s mobile money) or cash, and they needed to keep track of each seller, send the tickets and control the door on both nights without paper lists.\n\nWe built them a mobile web app with the event’s look, which has since become our product Pasa. Each seller records the ticket (name, WhatsApp number, VIP, Local or Guest type, amount and payment method) and the app generates a unique QR code and prepares the WhatsApp message with the link to the ticket. The buyer gets it in their chat, with their ticket card and code.\n\nEach ticket is valid for both parties, once at each. At the door, the doormen scan with their phones: the screen turns green or red and shows the ticket type in large letters, so everyone is sent to the right area. The admin decides which party is active, because the night goes past midnight and the date alone can’t tell.\n\nThe team logs in with a six-digit PIN and each person only sees what concerns them. The summary shows live what has been taken, each seller’s takings, with cash and MoMo shown separately, and attendance for each night.\n\nThe app is already being used to sell tickets ahead of the parties. The screenshots come from a demo copy with made-up data: the names and phone numbers of real guests never leave the app.',
    sector: 'Events',
    challenges: [
      'Hand sales, by MoMo or cash, spread across several sellers: they needed to know at all times how much each one had taken',
      'Two parties on the same ticket: each QR code had to work once on each night, and never twice on the same night',
      'Doormen in a hurry, at night and with loud music: the scan result had to be understood without reading',
      'Sending each ticket on WhatsApp without the paid WhatsApp API and without saving the buyer’s number to the contacts',
    ],
    solutions: [
      'Each ticket stores who sold it, the amount paid and the payment method; the summary adds up each seller’s takings live',
      'One entry per ticket and per night, guaranteed in the database: even if two doormen scan the same QR code at once, only one gets through',
      'A full-screen green or red result, with vibration and sound, and the ticket type in large letters in its colour',
      'A WhatsApp link that opens the buyer’s chat with the message and the link to their ticket already written',
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
