import type { CourseText } from '../../content'

// Only published courses. The books themselves are in Spanish; this text describes them.
export const courses: Record<string, CourseText> = {
  'python-desde-cero': {
    title: 'Python from scratch · Complete series',
    description: 'Learn Python from zero to real projects: web, databases, APIs, data analysis, testing and professional Python. A complete series in three interactive books.',
    longDescription:
      'A complete Python course designed for people who have never programmed. No toy examples — every concept is explained with real situations and practised with exercises you can run directly in the browser.\n\nThe series is split into three books: Book 1 covers the fundamentals (variables, functions, lists, strings and a final project); Book 2 goes deeper into structure and organisation (OOP, error handling, files, modules, comprehensions and a real project); Book 3 takes your code into the real world (web and scraping, SQLite, REST APIs, data analysis with Pandas, automation, testing with unittest and professional Python with dataclasses, ABCs and logging).\n\nAll 24 modules are available right now, with no sign-up needed. Each module includes explanations, commented code examples, comprehension quizzes and exercises with a Python interpreter built into the browser.',
    duration: '3 books · complete series',
    instructor: {
      name: 'BKLN Software',
      bio: 'Developers with real experience on commercial projects: Android apps, marketplaces, APIs, automation and AI. We teach what we use.',
      avatar: '',
    },
    modules: [
      {
        id: 'l1-parte1',
        title: 'Book 1 · First steps',
        duration: '≈ 4h reading',
        lessons: [
          { id: 'l1-m1', title: 'What is programming?', duration: '≈ 35min', isFree: true },
          { id: 'l1-m2', title: 'Variables and data types', duration: '≈ 40min', isFree: true },
          { id: 'l1-m3', title: 'Operators and expressions', duration: '≈ 35min', isFree: true },
        ],
      },
      {
        id: 'l1-parte2',
        title: 'Book 1 · Logic and control',
        duration: '≈ 3h reading',
        lessons: [
          { id: 'l1-m4', title: 'Control flow', duration: '≈ 45min', isFree: true },
          { id: 'l1-m5', title: 'Functions', duration: '≈ 50min', isFree: true },
        ],
      },
      {
        id: 'l1-parte3',
        title: 'Book 1 · Data structures',
        duration: '≈ 3h reading',
        lessons: [
          { id: 'l1-m6', title: 'Lists and tuples', duration: '≈ 45min', isFree: true },
          { id: 'l1-m7', title: 'Strings', duration: '≈ 40min', isFree: true },
          { id: 'l1-m8', title: 'Basic final project', duration: '≈ 50min', isFree: true },
        ],
      },
      {
        id: 'l2',
        title: 'Book 2 · Intermediate Python',
        duration: '≈ 6h reading',
        lessons: [
          { id: 'l2-m1', title: 'Dictionaries and sets', duration: '≈ 40min', isFree: true },
          { id: 'l2-m2', title: 'Advanced functions', duration: '≈ 45min', isFree: true },
          { id: 'l2-m3', title: 'Object-oriented programming', duration: '≈ 50min', isFree: true },
          { id: 'l2-m4', title: 'Error handling', duration: '≈ 40min', isFree: true },
          { id: 'l2-m5', title: 'Files and data', duration: '≈ 45min', isFree: true },
          { id: 'l2-m6', title: 'Modules and packages', duration: '≈ 40min', isFree: true },
          { id: 'l2-m7', title: 'Comprehensions and iterators', duration: '≈ 40min', isFree: true },
          { id: 'l2-m8', title: 'Intermediate final project', duration: '≈ 60min', isFree: true },
        ],
      },
      {
        id: 'l3',
        title: 'Book 3 · Advanced Python',
        duration: '≈ 7h reading',
        lessons: [
          { id: 'l3-m1', title: 'Python and the web', duration: '≈ 45min', isFree: true },
          { id: 'l3-m2', title: 'Databases', duration: '≈ 45min', isFree: true },
          { id: 'l3-m3', title: 'APIs and external services', duration: '≈ 50min', isFree: true },
          { id: 'l3-m4', title: 'Data analysis', duration: '≈ 50min', isFree: true },
          { id: 'l3-m5', title: 'Automation', duration: '≈ 45min', isFree: true },
          { id: 'l3-m6', title: 'Testing and quality', duration: '≈ 45min', isFree: true },
          { id: 'l3-m7', title: 'Professional Python', duration: '≈ 50min', isFree: true },
          { id: 'l3-m8', title: 'Advanced final project', duration: '≈ 60min', isFree: true },
        ],
      },
    ],
    includes: [
      '3 complete books · 24 modules available now',
      'Python interpreter built into the browser',
      'Comprehension quizzes for every chapter',
      'Dark mode, adjustable font size and density',
      'No sign-up — lifetime access',
    ],
  },
  'ia-machine-learning-python': {
    title: 'AI and Machine Learning with Python',
    description: 'NumPy, Pandas, Matplotlib, scikit-learn and your first predictive models — all running in the browser.',
    longDescription:
      'A hands-on course in three books: the fundamentals of Python’s scientific ecosystem, classic ML algorithms and deep learning. All the code runs in the browser — nothing to install.',
    duration: '3 books · 24 modules',
    instructor: {
      name: 'Leoncio Felipe Mitogo',
      bio: 'Software engineer with more than 8 years of experience building applications and data systems. Founder of BKLN Software & Systems in Malabo.',
      avatar: '',
    },
    modules: [
      {
        id: 'l1',
        title: 'Book I — Fundamentals',
        duration: '8 modules',
        lessons: [
          { id: 'l1-m1', title: 'What is AI?', duration: '20 min', isFree: true },
          { id: 'l1-m2', title: 'NumPy — vectors and matrices', duration: '30 min', isFree: true },
          { id: 'l1-m3', title: 'Pandas — data in tables', duration: '35 min', isFree: true },
          { id: 'l1-m4', title: 'Matplotlib — seeing to understand', duration: '30 min', isFree: true },
          { id: 'l1-m5', title: 'Linear regression', duration: '40 min', isFree: true },
          { id: 'l1-m6', title: 'Classification — KNN', duration: '35 min', isFree: true },
          { id: 'l1-m7', title: 'Decision trees and Random Forest', duration: '40 min', isFree: true },
          { id: 'l1-m8', title: 'Model evaluation', duration: '35 min', isFree: true },
        ],
      },
      {
        id: 'l2',
        title: 'Book II — Intermediate',
        duration: '8 modules',
        lessons: [
          { id: 'l2-m1', title: 'Data preprocessing', duration: '40 min', isFree: true },
          { id: 'l2-m2', title: 'Regularised regression', duration: '35 min', isFree: true },
          { id: 'l2-m3', title: 'Support vector machines', duration: '40 min', isFree: true },
          { id: 'l2-m4', title: 'Clustering without labels', duration: '35 min', isFree: true },
          { id: 'l2-m5', title: 'PCA and dimensionality reduction', duration: '35 min', isFree: true },
          { id: 'l2-m6', title: 'Feature selection', duration: '30 min', isFree: true },
          { id: 'l2-m7', title: 'Pipelines and automation', duration: '40 min', isFree: true },
          { id: 'l2-m8', title: 'Project: recommendation system', duration: '60 min', isFree: true },
        ],
      },
      {
        id: 'l3',
        title: 'Book III — Deep Learning',
        duration: '8 modules',
        lessons: [
          { id: 'l3-m1', title: 'Artificial neural networks', duration: '45 min', isFree: true },
          { id: 'l3-m2', title: 'Backpropagation and gradients', duration: '45 min', isFree: true },
          { id: 'l3-m3', title: 'Convolutional networks (CNN)', duration: '50 min', isFree: true },
          { id: 'l3-m4', title: 'Recurrent networks (RNN)', duration: '50 min', isFree: true },
          { id: 'l3-m5', title: 'Transformers and attention', duration: '55 min', isFree: true },
          { id: 'l3-m6', title: 'Fine-tuning language models', duration: '60 min', isFree: true },
          { id: 'l3-m7', title: 'Agents and tools', duration: '55 min', isFree: true },
          { id: 'l3-m8', title: 'Final project — a context-aware assistant', duration: '90 min', isFree: true },
        ],
      },
    ],
    includes: [
      'Python code you can run directly in the browser',
      'NumPy, Pandas, Matplotlib and scikit-learn built in',
      'Matplotlib charts rendered in real time',
      '24 modules with quizzes and hands-on exercises',
      'Progress tracking without sign-up',
      'Instant access · no account needed',
    ],
  },
  'az-900-azure-fundamentals': {
    title: 'AZ-900: Microsoft Azure Fundamentals',
    description: 'Prepare for the AZ-900 certification with an interactive book: cloud concepts, Azure architecture and services, management and governance — with quizzes and a full mock exam.',
    longDescription:
      'AZ-900 (Microsoft Certified: Azure Fundamentals) is the entry-level certification for the Azure ecosystem. It requires no prior experience or deep technical knowledge: it checks that you understand cloud concepts, Azure’s main services and how the platform is managed and governed.\n\nThe book is organised in three parts: Part I covers the fundamental cloud concepts (what the cloud is, the IaaS/PaaS/SaaS service models, deployment models, benefits and the shared responsibility model); Part II covers Azure’s architecture and core services (regions and zones, resource hierarchy, compute, networking, storage and identity with Entra ID); Part III focuses on management and governance (costs, compliance, management tools and monitoring).\n\nAll 15 modules are available right now, with no sign-up needed. Each one includes interactive quizzes that reveal the correct answer with an explanation, and your progress is saved automatically in the browser. The book ends with a full mock exam, a glossary of terms and tips for exam day.',
    duration: '15 modules + mock exam',
    instructor: {
      name: 'BKLN Software',
      bio: 'Developers with real experience on commercial projects: Android apps, marketplaces, APIs, automation and AI. We teach what we use.',
      avatar: '',
    },
    modules: [
      {
        id: 'p1',
        title: 'Part I · Cloud concepts',
        duration: '≈ 1h 42min reading',
        lessons: [
          { id: 'p1-m1', title: 'What is the cloud?', duration: '18 min', isFree: true },
          { id: 'p1-m2', title: 'IaaS, PaaS and SaaS', duration: '22 min', isFree: true },
          { id: 'p1-m3', title: 'Deployment models', duration: '20 min', isFree: true },
          { id: 'p1-m4', title: 'Benefits of the cloud', duration: '22 min', isFree: true },
          { id: 'p1-m5', title: 'CapEx, OpEx and responsibility', duration: '20 min', isFree: true },
        ],
      },
      {
        id: 'p2',
        title: 'Part II · Architecture and services',
        duration: '≈ 2h 20min reading',
        lessons: [
          { id: 'p2-m1', title: 'Regions and zones', duration: '22 min', isFree: true },
          { id: 'p2-m2', title: 'Resource hierarchy', duration: '20 min', isFree: true },
          { id: 'p2-m3', title: 'Compute services', duration: '26 min', isFree: true },
          { id: 'p2-m4', title: 'Networking', duration: '24 min', isFree: true },
          { id: 'p2-m5', title: 'Storage', duration: '24 min', isFree: true },
          { id: 'p2-m6', title: 'Identity (Entra ID)', duration: '24 min', isFree: true },
        ],
      },
      {
        id: 'p3',
        title: 'Part III · Management and governance',
        duration: '≈ 1h 24min reading',
        lessons: [
          { id: 'p3-m1', title: 'Cost management', duration: '22 min', isFree: true },
          { id: 'p3-m2', title: 'Governance and compliance', duration: '22 min', isFree: true },
          { id: 'p3-m3', title: 'Management tools', duration: '20 min', isFree: true },
          { id: 'p3-m4', title: 'Monitoring', duration: '20 min', isFree: true },
        ],
      },
      {
        id: 'extra',
        title: 'Assessment and resources',
        duration: '≈ 38min',
        lessons: [
          { id: 'extra-m1', title: 'Mock exam', duration: '30 min', isFree: true },
          { id: 'extra-m2', title: 'Glossary of terms', duration: '—', isFree: true },
          { id: 'extra-m3', title: 'Tips for exam day', duration: '8 min', isFree: true },
        ],
      },
    ],
    includes: [
      '15 modules in 3 parts + a final mock exam',
      'Interactive quizzes with an explanation for every answer',
      'Glossary of terms and tips for exam day',
      'Progress saved automatically in the browser',
      'No sign-up — lifetime access',
    ],
  },
}
