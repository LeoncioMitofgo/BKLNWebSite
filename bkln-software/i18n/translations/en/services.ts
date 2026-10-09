import type { ServiceText } from '../../content'

export const services: Record<string, ServiceText> = {
  'desarrollo-web': {
    title: 'Websites and online stores',
    description: 'Websites to present your business, online stores and platforms with user accounts, designed for mobile and for slow connections.',
    longDescription:
      'From a simple website so people can find you on Google to a platform with user accounts, payments and an admin dashboard. We work out together what you really need: we don’t sell templates, we build what your project calls for.\n\nAll our websites are designed for mobile first, load quickly even on a poor connection and include a WhatsApp button. If you need it, they come with a dashboard so your team can change text, prices or photos without depending on anyone, and they can be in several languages.',
    forWho: [
      'Your customers search for you on Google and can’t find you.',
      'You answer the same questions on WhatsApp every day.',
      'You need a website and a professional email address to work with companies or institutions.',
      'You want to sell online or take orders and bookings outside opening hours.',
      'You have an idea for a platform (marketplace, job board, bookings) and want to launch it.',
    ],
    examples: [
      { title: 'Information website', description: 'Present your business or institution: who you are, what you offer, where you are and how to reach you.' },
      { title: 'Website with a dashboard', description: 'Your team publishes news, changes prices or uploads photos without touching code.' },
      { title: 'Catalogue or online store', description: 'Products with photos, categories and orders, with payment options for customers who don’t have a card.' },
      { title: 'Platforms with user accounts', description: 'Marketplaces, job or service portals, with accounts, roles, messaging and subscription plans.' },
    ],
    deliverables: [
      'Website published on your domain',
      'Full source code',
      'Basic user guide',
      '1–2 hours of training for your team',
      '30 days of post-launch support',
    ],
    pricingFactors: [
      'Type of website: informational, with a dashboard, store or platform with user accounts',
      'Number of pages and sections',
      'User accounts and roles',
      'Payments, maps, email, WhatsApp or other integrations',
      'Multiple languages',
      'Custom design or built on an existing base',
    ],
    timeline: '2 to 12 weeks depending on scope',
    faqs: [
      {
        question: 'Can I update the website myself?',
        answer: 'Yes, if we include a dashboard. We decide this when defining the scope, depending on how often you’ll change the content.',
      },
      {
        question: 'Can you help me with the domain and a professional email address?',
        answer: 'Yes. We guide you through registering your domain and setting up an email address with your name. If you already have them, we work with those.',
      },
      {
        question: 'How do I get paid if my customers don’t have cards?',
        answer: 'There are several options: orders paid by bank transfer, in cash or by mobile payment and confirmed from the dashboard, or a payment gateway when it makes sense. We look at it based on your business.',
      },
      {
        question: 'Do I own the website?',
        answer: 'Yes. Once payment is complete, the code and the content are yours.',
      },
    ],
  },
  'apps-moviles': {
    title: 'Mobile apps',
    description: 'Android and iPhone apps for your customers, your team or your delivery riders, that work well even when the connection drops.',
    longDescription:
      'We develop native Android apps, which is where most of your users are, and cross-platform apps with Flutter when you also need to reach iPhone users without doubling the budget. They almost always come with a server and an admin dashboard, and we take care of all of it.\n\nWe design every app for real-world use: mid-range phones, mobile data that comes and goes, notifications that arrive and processes that aren’t lost if the connection cuts out.',
    forWho: [
      'You want your customers to order, book or buy from their phones.',
      'Your team works out in the field (riders, sales reps, technicians) and needs a tool.',
      'You need to reach your users with notifications.',
      'Your customers mostly use their phones and your website is no longer enough.',
    ],
    examples: [
      { title: 'App for your customers', description: 'Orders, bookings, catalogue, tracking and notifications.' },
      { title: 'App for your team', description: 'For riders, sales reps or field staff, with features that remain available offline.' },
      { title: 'Management app', description: 'Your business on your phone: sales, cash register and statistics in real time.' },
      { title: 'App connected to devices', description: 'Point-of-sale terminals, receipt printers or scanners, integrated through their development kits.' },
    ],
    deliverables: [
      'Signed app ready to publish',
      'Full source code',
      'Technical documentation',
      'Publishing on Google Play (optional)',
      '30 days of post-launch support',
    ],
    pricingFactors: [
      'Android only or iPhone too',
      'Number of screens and flows',
      'Server and admin dashboard: new or existing',
      'Payments, maps, camera, notifications or other integrations',
      'Offline operation',
      'Custom design or one you provide',
    ],
    timeline: '4 to 16 weeks depending on complexity',
    faqs: [
      {
        question: 'Android, iPhone or both?',
        answer: 'In Equatorial Guinea most users have Android, so that is usually the starting point. If you also need iPhone, we use Flutter to build both from a single codebase.',
      },
      {
        question: 'Does it work without internet?',
        answer: 'It can be designed to store data on the phone and sync it when the connection comes back. We decide this at the start, because it changes how the app is built.',
      },
      {
        question: 'Who publishes the app on Google Play?',
        answer: 'We can do it. We recommend that the Google developer account is in your name, so the app belongs to you.',
      },
      {
        question: 'Do I need a website as well?',
        answer: 'Not always. Sometimes a well-built mobile-friendly website is enough to get started; we’ll tell you honestly before quoting.',
      },
    ],
  },
  'sistemas-de-gestion': {
    title: 'Custom management systems',
    description: 'Software to organise your business or your school: cash register and sales, stock, students and enrolment, orders and dashboards, even without internet.',
    longDescription:
      'We replace notebooks, spreadsheets and phone calls with a system where every piece of data lives in one place and each person sees what they need. A cash register that balances, stock that is always up to date, reports that generate themselves and your business on your phone even when you’re away.\n\nWe adapt it to the way you work: roles and permissions for each job, offline operation when the connection isn’t reliable, and use from a computer, a browser or an Android app. We start from systems that already work, such as GestEscolar or our point-of-sale system, or build it from scratch.',
    forWho: [
      'The cash register doesn’t balance at closing time and nobody knows why.',
      'You keep track of students, payments, stock or orders in Excel or in notebooks.',
      'You want to know how the business is doing from your phone without calling anyone.',
      'Each employee needs to see and do different things.',
      'The connection fails and you can’t afford to stop working.',
    ],
    examples: [
      { title: 'Point of sale and cash register', description: 'Sales, end-of-shift cash-ups, receipts and operators with PINs, for shops, pharmacies and restaurants.' },
      { title: 'Inventory and purchasing', description: 'Stock deducted with every sale, low-stock alerts, goods received and suppliers.' },
      { title: 'School management', description: 'Students, enrolment and fees, grades and report cards ready to print, without depending on the internet.' },
      { title: 'Dashboards', description: 'Sales, users, orders or content with date filters, on the web or in an Android app.' },
    ],
    deliverables: [
      'System installed on your computers or published in the cloud',
      'Full source code',
      'User manual',
      'Staff training',
      '30 days of post-launch support',
    ],
    pricingFactors: [
      'Modules needed: cash register, stock, students, orders, reports…',
      'Number of users, roles and locations',
      'Offline operation',
      'Connection to printers, barcode scanners or scales',
      'Importing the data you already have',
      'Custom reports',
    ],
    timeline: '4 to 14 weeks depending on modules',
    faqs: [
      {
        question: 'In the cloud or installed on my premises?',
        answer: 'It depends on your connection and whether you want to check the data from elsewhere. Installed on your local network, it works without internet; in the cloud, you can see it from anywhere. The two can also be combined: the local system keeps working and syncs when there is a connection.',
      },
      {
        question: 'Can you transfer the data I already have in Excel?',
        answer: 'We look into it at the start of the project. Importing what you already have saves typing everything in again by hand.',
      },
      {
        question: 'What equipment do I need?',
        answer: 'For most businesses a computer or a tablet, a receipt printer and, if you sell many products, a barcode scanner are enough. We tell you what to buy before we start.',
      },
      {
        question: 'What happens if the power or the internet goes down?',
        answer: 'If the system is designed to work offline, transactions are saved on the device and synced when the connection returns. For power cuts we recommend a UPS or a terminal with a battery.',
      },
    ],
  },
  'ia-y-automatizacion': {
    title: 'AI assistants and automation',
    description: 'Assistants that serve your customers on WhatsApp and on your website using your own information, and automation of the repetitive tasks you do by hand today.',
    longDescription:
      'An AI assistant answers your customers at any time of day using only the information you give it: catalogue, prices, opening hours, frequently asked questions. If it doesn’t know something, it says so and hands the conversation over to a person. It takes orders, sends you reports and only does what you allow it to.\n\nWe also automate processes: reports that are generated and sent on their own, data that moves from one system to another without copying and pasting, and alerts when something isn’t right. Tasks that cost you hours every week today and that a program does in seconds.',
    forWho: [
      'You answer the same questions on WhatsApp all day long.',
      'You lose customers who write outside opening hours.',
      'You prepare the same report by hand every week.',
      'You copy data from one place to another: Excel, email, systems that don’t talk to each other.',
    ],
    examples: [
      { title: 'Assistant for WhatsApp and the web', description: 'Answers with your business information, takes orders and hands over to a person when needed.' },
      { title: 'Automatic reports', description: 'Sales, activity or key figures delivered to your inbox as a PDF every week.' },
      { title: 'Data collection and organisation', description: 'Information from websites, documents or files, organised and ready to use.' },
      { title: 'Alerts and monitoring', description: 'A WhatsApp message if your website goes down or a key figure goes out of the normal range.' },
    ],
    deliverables: [
      'Working assistant or automation',
      'Dashboard to manage documents and review conversations (assistants)',
      'Documentation and user guide',
      'Training for your team',
      '30 days of post-launch support',
    ],
    pricingFactors: [
      'Channels: web, WhatsApp, email',
      'Volume of conversations (AI usage costs and some WhatsApp message fees)',
      'Connections to your systems: orders, calendar, email',
      'Amount and organisation of the starting information',
      'Complexity of the process to automate',
      'Frequency: on demand, scheduled or real time',
    ],
    timeline: 'Automations: 1 to 6 weeks · Assistants and AI: 4 to 16 weeks',
    faqs: [
      {
        question: 'Does the assistant make up answers?',
        answer: 'It is configured to answer only with your information. If it can’t find the answer, it says so and hands the conversation over to a person. We review the first conversations with you.',
      },
      {
        question: 'Can it answer on my WhatsApp?',
        answer: 'It connects through Meta’s WhatsApp Business API, which normally uses a dedicated number. We help you with the setup and with verifying your business.',
      },
      {
        question: 'How much does it cost to run?',
        answer: 'Besides the setup, there is a usage cost for the AI service and, on WhatsApp, for some messages. We estimate it based on your volume before we start.',
      },
      {
        question: 'What information does it need?',
        answer: 'Whatever you already have: catalogue, prices, opening hours, frequently asked questions and terms, in documents, on your website or in a spreadsheet.',
      },
    ],
  },
  'medios-de-comunicacion': {
    title: 'Platforms for media outlets',
    description: 'Websites and apps for radio and television: live streaming, podcasts and a content library, with your outlet’s identity.',
    longDescription:
      'We take your radio or TV station online: live streaming on the web and on mobile, on-demand programmes, podcasts and a well-organised content library, all with your outlet’s identity.\n\nIf you don’t yet have the infrastructure to broadcast online, we plan it from scratch with you. And since your audience will mostly watch or listen on their phones, everything is designed for mobile first.',
    forWho: [
      'Your audience wants to watch or listen on their phones, including from abroad.',
      'Your programmes are lost once they have aired.',
      'Your website doesn’t reflect your outlet’s image or is hard to update.',
      'You want to start broadcasting online and don’t know where to begin.',
    ],
    examples: [
      { title: 'Live streaming', description: 'Live radio and television on the web and in an app.' },
      { title: 'On demand and podcasts', description: 'Programmes, interviews and podcasts organised to watch or listen to whenever you like.' },
      { title: 'News portal', description: 'With a dashboard so the newsroom can publish without depending on a developer.' },
      { title: 'Your outlet’s app', description: 'Live broadcast, schedule, news and notifications on your audience’s phones.' },
    ],
    deliverables: [
      'Website and/or app with your outlet’s identity',
      'Content management dashboard',
      'Live streaming set up and running',
      'Team training',
      '30 days of post-launch support',
    ],
    pricingFactors: [
      'Website, app or both',
      'Live radio, live TV or both',
      'Audience size and volume of content',
      'Whether online broadcasting infrastructure already exists',
      'Number of languages',
      'Existing content to migrate',
    ],
    timeline: 'Defined in the proposal according to scope',
    faqs: [
      {
        question: 'Do we need our own servers to broadcast?',
        answer: 'Not necessarily. There are streaming services you pay for by usage; we recommend the option that best fits your audience and budget, or we build it from scratch if you prefer.',
      },
      {
        question: 'Can people watch from abroad?',
        answer: 'Yes. Online broadcasting reaches any country, unless rights over some content prevent it.',
      },
      {
        question: 'Who publishes the content?',
        answer: 'Your team, from a simple dashboard. We train them so they can work on their own.',
      },
    ],
  },
  'mantenimiento-y-soporte': {
    title: 'Maintenance and support',
    description: 'We look after your website or app after launch, even if we didn’t build it: updates, backups, fixes and small changes.',
    longDescription:
      'A website or app without maintenance deteriorates even if nobody touches it: certificates expire, outdated components break, Google Play rules change and security flaws appear. We make sure it keeps working so you can focus on your business.\n\nWe work with a monthly or yearly fee depending on what you need, and we also take over projects built by another provider: first we check what state they are in and tell you clearly what needs fixing.',
    forWho: [
      'Your website or app was built by someone who is no longer available.',
      'You don’t know whether your data is backed up.',
      'You need small changes from time to time and have nobody to ask.',
      'Your website is slow, shows errors or something has stopped working.',
    ],
    examples: [
      { title: 'Updates and security', description: 'We keep components, certificates and dependencies up to date.' },
      { title: 'Backups', description: 'Regular backups of data and files, and checks that they can actually be restored.' },
      { title: 'Monitoring', description: 'We let you know if the website goes down or something stops working, often before your customers notice.' },
      { title: 'Changes and improvements', description: 'Hours every month for changes to text, prices, sections or small features.' },
      { title: 'Hosting and domain', description: 'We handle renewals and configuration so nothing expires by oversight.' },
    ],
    deliverables: [
      'Initial review of the state of the project',
      'Written maintenance plan',
      'Regular report of the work done',
      'Priority handling of incidents',
    ],
    pricingFactors: [
      'Size and technology of the project',
      'The state we receive it in',
      'Frequency of backups and reviews',
      'Hours of changes included each month',
      'Response time for incidents',
    ],
    timeline: 'Monthly or yearly fee',
    faqs: [
      {
        question: 'Will you take over a website you didn’t build?',
        answer: 'Yes. We start with a review to see what state it is in and what risks it carries, and from there we propose a plan.',
      },
      {
        question: 'What happens if something breaks at the weekend?',
        answer: 'It depends on the plan you choose. Response times are agreed in writing from the start.',
      },
      {
        question: 'Do I need maintenance if my website is simple?',
        answer: 'It needs less, but not none: the domain and the certificate expire and components get old. For a simple website a light plan is usually enough.',
      },
    ],
  },
  'consultoria-y-formacion': {
    title: 'Consulting and training',
    description: 'A second opinion before you invest, a technical review of what you already have and training so your team works better with technology.',
    longDescription:
      'Sometimes you don’t need us to build anything, but someone experienced to tell you whether you’re on the right track. We review another provider’s quote before you sign, audit a website or app you already have, or help you decide which technology suits your project.\n\nWe also train teams: staff who are going to use a new system or developers who want to improve their practices. We start from the same real projects we build for our clients.',
    forWho: [
      'You have a quote from another provider and don’t know whether it’s reasonable.',
      'You’re about to invest in a digital project and want to make the right decisions before starting.',
      'Your website or app keeps failing and you want to know why.',
      'Your team needs training to make the most of a tool or to grow as developers.',
    ],
    examples: [
      { title: 'Second opinion on quotes', description: 'We review the scope, price, timelines and terms of a proposal before you sign it.' },
      { title: 'Technical audit', description: 'Security, performance, code quality and risks of an existing website or app, with a prioritised report.' },
      { title: 'Project planning', description: 'We help you define scope, priorities and technology before you request quotes.' },
      { title: 'Team training', description: 'Hands-on sessions for staff who will use a system or for development teams.' },
    ],
    deliverables: [
      'Report with findings and recommendations',
      'Prioritised action plan',
      'Training sessions in person or remotely',
      'Follow-up afterwards (optional)',
    ],
    pricingFactors: [
      'One-off review or ongoing support',
      'Size of the system or project to review',
      'Number of sessions or weeks',
      'Written report or sessions only',
      'In person or remote',
      'Number of people to train',
    ],
    timeline: '1 to 8 weeks depending on scope',
    faqs: [
      {
        question: 'Do you review other companies’ quotes even if we don’t end up working together?',
        answer: 'Yes. The review is a service in its own right and doesn’t commit you to anything else.',
      },
      {
        question: 'Is the training in person?',
        answer: 'In Malabo it can be in person; we also run it remotely.',
      },
      {
        question: 'Do you train developers?',
        answer: 'Yes: best practices, code review and specific technologies. You can also find our courses on this website.',
      },
    ],
    technologies: ['Code review', 'Architecture', 'Security', 'Performance', 'DevOps'],
  },
}
