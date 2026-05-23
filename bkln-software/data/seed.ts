import type { Service, Product, Course, Project, BlogPost, Testimonial } from '@/types'

export const services: Service[] = [
  {
    id: '1',
    slug: 'apps-android',
    title: 'Apps Android',
    description: 'Desarrollo de aplicaciones Android nativas y multiplataforma con rendimiento profesional.',
    longDescription:
      'Desarrollamos aplicaciones móviles Android desde cero: nativas en Kotlin con Jetpack Compose para máximo rendimiento, o multiplataforma con Flutter si necesitas llegar también a iOS sin duplicar el presupuesto. Cada proyecto incluye diseño de UI/UX, integración con backend, testing en dispositivos reales y publicación en Google Play.\n\nTrabajamos tanto apps sencillas de gestión interna como plataformas complejas con pagos, geolocalización, notificaciones push, modo offline y sincronización en tiempo real.',
    icon: 'Smartphone',
    technologies: ['Kotlin', 'Jetpack Compose', 'Flutter', 'Dart', 'Firebase', 'Supabase', 'Room DB', 'Retrofit'],
    pricingFactors: [
      'Plataforma: Android nativo (Kotlin) vs multiplataforma (Flutter — Android + iOS)',
      'Complejidad de pantallas y flujos de usuario',
      'Backend necesario: existente, nuevo, o sin backend',
      'Integraciones: pagos, mapas, cámara, notificaciones, redes sociales',
      'Diseño: aportado por el cliente o diseñado desde cero',
      'Publicación en Google Play incluida o no',
    ],
    deliverables: [
      'APK / AAB firmado listo para producción',
      'Código fuente completo',
      'Documentación técnica',
      'Publicación en Google Play (opcional)',
      'Soporte post-lanzamiento 30 días',
    ],
    timeline: '4 a 16 semanas según complejidad',
    featured: true,
  },
  {
    id: '2',
    slug: 'desarrollo-web',
    title: 'Desarrollo Web & Marketplaces',
    description: 'Sitios web modernos, plataformas e-commerce y marketplaces escalables con tecnologías de vanguardia.',
    longDescription:
      'Desde una landing page estática hasta un marketplace C2C completo con pagos, chat y panel de administración. El alcance y la tecnología se definen según tus objetivos y presupuesto — no vendemos plantillas, construimos lo que el proyecto necesita.\n\nUna web estática informativa es radicalmente diferente (en tiempo y coste) a una plataforma dinámica con autenticación, base de datos y lógica de negocio. Igual que un e-commerce con catálogo fijo no es lo mismo que un marketplace multivendedor. Cada proyecto tiene su propio presupuesto.',
    icon: 'Globe',
    technologies: ['Next.js', 'React', 'Node.js', 'PHP', 'Laravel', 'Supabase', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    pricingFactors: [
      'Tipo: web estática informativa vs plataforma dinámica con base de datos',
      'Número de páginas y secciones',
      'Autenticación de usuarios y roles',
      'Integraciones: pagos (Stripe), email, mapas, APIs externas',
      'Panel de administración o dashboard',
      'Diseño: aportado por el cliente o creado desde cero',
      'Hosting y dominio: gestión incluida o por cuenta del cliente',
    ],
    deliverables: [
      'Código fuente completo',
      'Deploy en producción (Vercel, VPS, etc.)',
      'Manual de uso básico',
      'Formación de 1-2 horas para el equipo',
      'Soporte post-lanzamiento 30 días',
    ],
    timeline: '2 a 12 semanas según alcance',
    featured: true,
  },
  {
    id: '3',
    slug: 'desktop-electron',
    title: 'Desktop & Electron',
    description: 'Aplicaciones de escritorio multiplataforma para Windows, macOS y Linux.',
    longDescription:
      'Desarrollamos software de escritorio que funciona en Windows, macOS y Linux desde una única base de código. Ideal para herramientas internas de empresa, sistemas de gestión que trabajan offline, o software que necesita acceso directo al hardware del equipo (impresoras, escáneres, puertos COM, etc.).\n\nUtilizamos Electron para interfaces modernas con tecnologías web, o Python con frameworks gráficos para herramientas más ligeras. Si el proyecto lo requiere, también trabajamos con C# y .NET para aplicaciones nativas Windows.',
    icon: 'Monitor',
    technologies: ['Electron', 'React', 'Python', 'Tkinter', 'PyQt', 'Tauri', 'C#', '.NET', 'SQLite'],
    pricingFactors: [
      'Plataforma objetivo: solo Windows vs multiplataforma (Win + Mac + Linux)',
      'Interfaz gráfica: sencilla vs compleja con múltiples módulos',
      'Base de datos: local (SQLite) vs sincronización cloud',
      'Acceso a hardware: impresoras, puertos COM, escáneres, cámara',
      'Sistema de actualizaciones automáticas',
      'Instalador y firma de código para distribución',
    ],
    deliverables: [
      'Instalador ejecutable para la plataforma objetivo',
      'Código fuente completo',
      'Manual de usuario',
      'Sistema de actualizaciones (si aplica)',
      'Soporte post-lanzamiento 30 días',
    ],
    timeline: '4 a 14 semanas según complejidad',
    featured: true,
  },
  {
    id: '4',
    slug: 'python-automatizacion',
    title: 'Python & Automatización',
    description: 'Scripts de automatización, bots, scraping de datos y herramientas de productividad.',
    longDescription:
      'Automatizamos procesos repetitivos que consumen tiempo: extracción y procesamiento de datos, bots para redes sociales o plataformas web, integración entre sistemas que no se comunican, generación automática de reportes, y cualquier tarea que hoy se hace manualmente y debería hacerse sola.\n\nPython es nuestra herramienta principal para esto — versátil, potente y con un ecosistema de librerías incomparable. Entregamos scripts listos para ejecutar, documentados y con instrucciones claras.',
    icon: 'Code2',
    technologies: ['Python', 'Selenium', 'Playwright', 'BeautifulSoup', 'Scrapy', 'Celery', 'FastAPI', 'Pandas', 'OpenPyXL'],
    pricingFactors: [
      'Complejidad del proceso a automatizar',
      'Número de fuentes de datos o sistemas involucrados',
      'Frecuencia de ejecución: manual, programada o en tiempo real',
      'Interfaz gráfica incluida o solo script de terminal',
      'Integración con APIs externas o plataformas protegidas',
      'Volumen de datos a procesar',
    ],
    deliverables: [
      'Scripts Python listos para ejecutar',
      'Documentación de uso e instalación',
      'Configuración del scheduler si aplica',
      'Soporte para ajustes iniciales',
    ],
    timeline: '1 a 6 semanas según complejidad',
    featured: false,
  },
  {
    id: '5',
    slug: 'databases-apis',
    title: 'Databases & APIs',
    description: 'Diseño e implementación de bases de datos y APIs robustas para cualquier escala.',
    longDescription:
      'Diseñamos el modelo de datos y construimos las APIs que conectan tu frontend con tu negocio. Ya sea una API REST clásica, GraphQL, o un backend en tiempo real con Supabase — el diseño correcto desde el principio evita problemas costosos más adelante.\n\nTambién trabajamos con bases de datos existentes: optimización de consultas lentas, migración entre sistemas, diseño de índices, o simplemente añadir una capa de API sobre datos que ya tienes.',
    icon: 'Database',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'REST', 'GraphQL', 'Supabase', 'FastAPI', 'Node.js', 'Prisma'],
    pricingFactors: [
      'Número de endpoints o entidades del modelo de datos',
      'Complejidad de la lógica de negocio',
      'Autenticación y autorización (roles, permisos)',
      'Documentación de la API (Swagger / Postman)',
      'Tests automatizados incluidos',
      'Necesidad de migración desde sistema existente',
    ],
    deliverables: [
      'API funcional y documentada',
      'Esquema de base de datos',
      'Colección Postman o Swagger UI',
      'Tests de integración básicos',
      'Soporte post-entrega 30 días',
    ],
    timeline: '2 a 8 semanas según alcance',
    featured: false,
  },
  {
    id: '6',
    slug: 'ia-machine-learning',
    title: 'IA & Machine Learning',
    description: 'Integración de modelos de lenguaje, visión por computadora y ML en tus productos.',
    longDescription:
      'Integramos inteligencia artificial en productos reales — no demos de laboratorio. Desde chatbots con LLMs (GPT-4, Claude, Llama) entrenados con tu propia base de conocimiento, hasta modelos de clasificación, detección de objetos o sistemas de recomendación.\n\nLa IA solo tiene valor cuando está bien integrada en el flujo de trabajo del usuario. Por eso trabajamos de extremo a extremo: desde la elección del modelo hasta la API de inferencia, el frontend y el sistema de monitorización.',
    icon: 'Brain',
    technologies: ['Python', 'OpenAI API', 'Anthropic API', 'LangChain', 'TensorFlow', 'PyTorch', 'Hugging Face', 'FastAPI', 'Pinecone'],
    pricingFactors: [
      'Tipo de solución: LLM / visión por computadora / clasificación / recomendación',
      'Datos disponibles: el cliente los aporta o hay que recopilarlos',
      'Modelo base: API de terceros (OpenAI, etc.) vs modelo propio',
      'Integración en producto existente vs desarrollo desde cero',
      'Coste recurrente de inferencia (APIs externas)',
      'Sistema de evaluación y monitorización del modelo',
    ],
    deliverables: [
      'Modelo o integración funcional en producción',
      'API de inferencia documentada',
      'Dashboard de monitorización básica',
      'Documentación técnica y guía de uso',
      'Soporte post-lanzamiento 30 días',
    ],
    timeline: '4 a 16 semanas según complejidad',
    featured: false,
  },
  {
    id: '7',
    slug: 'consultoria-tech',
    title: 'Consultoría Tech',
    description: 'Auditoría de código, arquitectura de sistemas y mentoring técnico para tu equipo.',
    longDescription:
      'A veces no necesitas que alguien construya — necesitas que alguien con experiencia te diga si vas por el buen camino. Revisamos tu código, tu arquitectura y tus decisiones técnicas, e identificamos riesgos antes de que se conviertan en problemas costosos.\n\nTambién hacemos mentoring para equipos que necesitan mejorar sus prácticas: code reviews, formación en tecnologías específicas, definición de estándares de desarrollo o preparación para escalar un sistema.',
    icon: 'Lightbulb',
    technologies: ['Code Review', 'System Design', 'DevOps', 'CI/CD', 'Security Audit', 'Performance', 'Refactoring'],
    pricingFactors: [
      'Tipo: auditoría puntual vs mentoring continuo',
      'Tamaño del código o sistema a revisar',
      'Número de sesiones o semanas de consultoría',
      'Entregable: informe escrito vs solo sesiones',
      'Presencial o remoto',
      'Número de personas del equipo involucradas',
    ],
    deliverables: [
      'Informe técnico con hallazgos y recomendaciones',
      'Sesiones de revisión grabadas (si aplica)',
      'Plan de acción priorizado',
      'Seguimiento posterior (opcional)',
    ],
    timeline: '1 a 8 semanas según alcance',
    featured: false,
  },
]

export const products: Product[] = [
  {
    id: '1',
    slug: 'bkln-task-manager',
    title: 'BKLN Task Manager',
    description: 'App Android de gestión de tareas con sincronización en la nube y modo offline.',
    longDescription:
      'Una potente aplicación de gestión de tareas para Android construida con Jetpack Compose. Incluye sincronización en tiempo real con Firebase, modo offline completo, notificaciones inteligentes, etiquetas y prioridades, estadísticas de productividad y widget para pantalla de inicio.',
    category: 'android',
    price: 6000,
    isFree: false,
    image: '/images/products/task-manager.png',
    screenshots: [],
    rating: 4.8,
    downloads: 1240,
    version: '2.1.0',
    requirements: ['Android 8.0+', '50 MB de espacio libre', 'Conexión a internet (para sincronización)'],
    changelog: [
      { version: '2.1.0', date: '2025-03-15', changes: ['Nuevo widget para pantalla de inicio', 'Mejoras de rendimiento'] },
      { version: '2.0.0', date: '2025-01-10', changes: ['Rediseño completo con Material You', 'Modo offline mejorado'] },
    ],
    stripeProductId: 'prod_taskmanager',
    stripePriceId: 'price_taskmanager',
  },
  {
    id: '2',
    slug: 'py-web-scraper',
    title: 'PY Web Scraper Pro',
    description: 'Herramienta Python de scraping con interfaz gráfica, scheduler y exportación a múltiples formatos.',
    longDescription:
      'Una herramienta de scraping web profesional construida en Python con interfaz gráfica (Tkinter). Permite definir múltiples jobs de scraping, programarlos con cron, exportar a CSV/Excel/JSON y recibir notificaciones por email. Incluye soporte para sitios con JavaScript mediante integración con Selenium.',
    category: 'scripts',
    price: 12000,
    isFree: false,
    image: '/images/products/py-scraper.png',
    screenshots: [],
    rating: 4.6,
    downloads: 867,
    version: '1.3.2',
    requirements: ['Python 3.9+', 'Windows / macOS / Linux', '100 MB de espacio libre'],
    changelog: [
      { version: '1.3.2', date: '2025-04-20', changes: ['Soporte para autenticación OAuth2', 'Fix: exportación a Excel'] },
    ],
    stripeProductId: 'prod_pyscraper',
    stripePriceId: 'price_pyscraper',
  },
  {
    id: '3',
    slug: 'bkln-portfolio-template',
    title: 'Portfolio Template Next.js',
    description: 'Template gratuito de portfolio para desarrolladores construido con Next.js y Tailwind CSS.',
    longDescription:
      'Un template moderno y completamente responsive para portfolios de desarrolladores. Construido con Next.js 14, Tailwind CSS y Framer Motion. Incluye secciones de hero, proyectos, habilidades, experiencia, y formulario de contacto. Fácil de personalizar con variables CSS.',
    category: 'free',
    price: 0,
    isFree: true,
    image: '/images/products/portfolio-template.png',
    screenshots: [],
    rating: 4.9,
    downloads: 3420,
    version: '1.0.0',
    requirements: ['Node.js 18+', 'npm o pnpm'],
    changelog: [
      { version: '1.0.0', date: '2025-02-01', changes: ['Lanzamiento inicial'] },
    ],
  },
  {
    id: '4',
    slug: 'expense-tracker-cli',
    title: 'Expense Tracker CLI',
    description: 'Herramienta gratuita de línea de comandos para control de gastos personales en Python.',
    longDescription:
      'Un tracker de gastos en línea de comandos construido en Python. Permite registrar ingresos y gastos, visualizar estadísticas mensuales con gráficos ASCII, exportar reportes a CSV y configurar alertas de presupuesto. Datos almacenados localmente en SQLite.',
    category: 'free',
    price: 0,
    isFree: true,
    image: '/images/products/expense-tracker.png',
    screenshots: [],
    rating: 4.5,
    downloads: 2100,
    version: '1.2.0',
    requirements: ['Python 3.8+', 'Terminal compatible'],
    changelog: [
      { version: '1.2.0', date: '2025-01-25', changes: ['Gráficos ASCII mejorados', 'Soporte para múltiples monedas'] },
    ],
  },
  {
    id: '5',
    slug: 'gestescolar',
    title: 'GestEscolar',
    description: 'Sistema de gestión escolar completo para Windows — instalación, formación y manual incluidos. Funciona offline en red local. Licencia perpetua.',
    longDescription:
      'GestEscolar es un sistema de gestión escolar integral listo para instalar en cualquier colegio con Windows. Cubre el ciclo académico completo: registro de alumnos con ficha médica y tutor, matrículas con seguimiento de pagos, calificaciones por trimestre, gestión de profesores y aulas, y circulares internas.\n\nFunciona completamente offline en la red local del centro — sin suscripciones a la nube, sin dependencias externas. Accesible desde cualquier equipo conectado a la red del colegio.\n\nIncluye generación de documentos listos para imprimir: carnets de estudiante, listas por aula, boletines de notas trimestrales e historial de pagos. Dos roles de usuario: Administrador y Secretaria.',
    category: 'desktop',
    price: 550000,
    isFree: false,
    image: '/Screenshot2.png',
    screenshots: ['/gest1.png', '/gest2.png', '/gest3.png', '/gest4.png'],
    rating: 5.0,
    downloads: 12,
    version: '1.0.0',
    deliveryType: 'install',
    includes: [
      'Instalación remota o presencial incluida',
      'Manual de funcionamiento completo',
      '2 días de formación del personal',
      'Licencia perpetua — pago único, sin renovaciones',
    ],
    supportPlan: {
      price: 120000,
      period: 'año',
      includes: [
        'Asistencia remota y presencial prioritaria',
        'Actualizaciones de versión gratuitas',
        'Nuevas funcionalidades sin coste adicional',
      ],
    },
    requirements: ['Windows 10 / 11', 'Python 3.10+ (instalación automática)', 'Red local para acceso multiequipo'],
    changelog: [
      { version: '1.0.0', date: '2024-04-23', changes: ['Lanzamiento oficial'] },
    ],
    stripeProductId: 'prod_gestescolar',
    stripePriceId: 'price_gestescolar',
  },
  {
    id: '6',
    slug: 'zentry',
    title: 'Zentry',
    description: 'Licencia de uso vitalicia — un acceso desde el que gestionar todos tus eventos con QR. Backend incluido y gestionado por BKLN. Eventos y invitados ilimitados.',
    longDescription:
      'Zentry es una plataforma de gestión de eventos y control de acceso por QR. Con una sola licencia obtienes un acceso único desde el que puedes crear todos los eventos que necesites, añadir invitados ilimitados con tickets VIP, Normal o Staff, y gestionar el control de acceso en tiempo real.\n\nNo necesitas configurar nada — el backend está incluido y es gestionado íntegramente por BKLN. Tú solo accedes con tu login y empiezas a crear eventos desde cualquier dispositivo: Android, iOS, Web, Windows, macOS o Linux.\n\nEl scanner valida QR en tiempo real: detecta entradas duplicadas, bloquea cuando se alcanza el aforo y responde con audio y vibración diferenciados. Los QR de cada invitado se comparten directamente por WhatsApp con un toque.',
    category: 'android',
    price: 198200,
    isFree: false,
    image: '/logo8.png',
    screenshots: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622126807280-a1880da2f0e7?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.9,
    downloads: 34,
    version: '1.0.0',
    deliveryType: 'license',
    includes: [
      'Licencia de uso vitalicia — pago único',
      '1 cuenta de acceso (login único)',
      'Eventos ilimitados',
      'Invitados ilimitados por evento',
      'Backend gestionado por BKLN — sin configuración',
      'Disponible en Android, iOS, Web, Windows, macOS y Linux',
    ],
    requirements: ['Android 8.0+ / iOS 13+ / Web / Windows 10+', 'Conexión a internet', 'Cámara (para el scanner QR)'],
    changelog: [
      { version: '1.0.0', date: '2025-01-15', changes: ['Lanzamiento oficial'] },
    ],
    stripeProductId: 'prod_zentry',
    stripePriceId: 'price_zentry',
  },
  {
    id: '7',
    slug: 'match-date',
    title: 'Match&Date',
    description: 'Plataforma de citas y eventos completa — swipe, matching mutuo, chat en tiempo real, perfiles detallados e integración con eventos en vivo. Lista para producción.',
    longDescription:
      'Match&Date es una plataforma de citas digital completa orientada al mercado hispanohablante. Combina la mecánica de swipe tipo Tinder con perfiles de alta profundidad (zodíaco, estilo de vida, hábitos, preferencias) y un sistema de eventos presenciales integrado.\n\nEl sistema de matching es mutuo y en tiempo real: cuando dos usuarios se dan like simultáneamente aparece una notificación animada. El chat incluye indicador de escritura en vivo, emojis, read receipts y actualizaciones instantáneas vía Supabase Realtime. El onboarding guía al usuario en 4 pasos con subida de avatar, selección de intereses y configuración de preferencias.\n\nConstructa íntegramente en JavaScript puro con Supabase como backend — autenticación, base de datos PostgreSQL, Row Level Security, funciones RPC para el algoritmo de matching y Storage para avatares. Sin frameworks, sin dependencias de build.',
    category: 'web',
    price: 850000,
    isFree: false,
    image: '/matchdate.png',
    screenshots: ['/match1.png', '/match2.png', '/match3.png', '/match4.png'],
    rating: 5.0,
    downloads: 8,
    version: '1.0.0',
    deliveryType: 'source-code',
    includes: [
      'Código fuente completo — tuyo para siempre',
      '7 páginas funcionales (landing, onboarding, swipe, chat, perfil y más)',
      'Backend Supabase preconfigurado (esquema SQL, RLS y funciones RPC incluidas)',
      'Documentación técnica de instalación y despliegue',
      'Licencia comercial — puedes usarlo en tu propio negocio',
    ],
    requirements: ['Cuenta Supabase (plan gratuito válido)', 'Hosting estático — Vercel, Netlify o similar', 'Navegador moderno'],
    changelog: [
      { version: '1.0.0', date: '2025-05-01', changes: ['Lanzamiento oficial'] },
    ],
    stripeProductId: 'prod_matchdate',
    stripePriceId: 'price_matchdate',
  },
  {
    id: '8',
    slug: 'ventasclaro',
    title: 'VentasClaro',
    description: 'Sube tu Excel o CSV de ventas y obtén un informe visual al instante — gráficas, KPIs y exportación a PDF. Sin configuración, sin fórmulas.',
    longDescription:
      'VentasClaro es una herramienta web que convierte cualquier archivo de ventas en Excel o CSV en un informe visual completo en segundos. No hace falta saber de tecnología ni tocar una sola fórmula.\n\nArrastras tu archivo, la aplicación detecta automáticamente las columnas de fecha, producto, cantidad y precio, y genera: ingresos totales en XAF, unidades vendidas, ticket medio, ranking de los 8 productos más vendidos y evolución de ventas en el tiempo. Todo con gráficas interactivas.\n\nEl informe se puede exportar a PDF con un clic usando la impresión del navegador. Los archivos nunca se almacenan en el servidor — se procesan en memoria y se descartan inmediatamente.\n\nIncluye código fuente completo (Python + FastAPI + HTML/CSS/JS) listo para instalar en tu propio servidor o equipo local. Sin suscripciones, sin nube obligatoria.',
    category: 'scripts',
    price: 0,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80',
    ],
    rating: 0,
    downloads: 0,
    version: '1.0.0',
    deliveryType: 'source-code',
    includes: [
      'Código fuente completo (Python + FastAPI + HTML/CSS/JS)',
      'Detección automática de columnas (fecha, producto, cantidad, precio)',
      'Gráfica de top productos y evolución temporal',
      'Exportación a PDF con un clic',
      'Compatible con .xlsx, .xls y .csv',
      'Instalación en local o servidor propio',
      'Soporte 30 días por email',
    ],
    requirements: ['Python 3.9+', 'Windows / macOS / Linux', 'Navegador moderno'],
    changelog: [
      { version: '1.0.0', date: '2026-05-22', changes: ['Lanzamiento inicial'] },
    ],
    fileKey: 'ventasclaro.zip',
    stripeProductId: 'prod_ventasclaro',
    stripePriceId: 'price_ventasclaro',
  },
]

export const courses: Course[] = [
  {
    id: '1',
    slug: 'python-desde-cero',
    title: 'Python desde cero · Serie completa',
    description: 'Aprende Python de cero hasta proyectos reales: web, bases de datos, APIs, análisis de datos, testing y Python profesional. Serie completa en tres libros interactivos.',
    longDescription:
      'Un curso completo de Python en español pensado para quien nunca ha programado. Nada de ejemplos de juguete — cada concepto se explica con situaciones reales y se practica con ejercicios ejecutables directamente en el navegador.\n\nLa serie se divide en tres libros: Libro 1 cubre los fundamentos (variables, funciones, listas, cadenas de texto y un proyecto final); Libro 2 profundiza en estructura y organización (POO, manejo de errores, archivos, módulos, comprensiones y un proyecto real); Libro 3 lleva el código al mundo real (web y scraping, SQLite, APIs REST, análisis de datos con Pandas, automatización, testing con unittest y Python profesional con dataclasses, ABCs y logging).\n\nLos 24 módulos están disponibles ahora mismo, sin registro ni pago. Cada módulo incluye explicaciones en español, ejemplos de código comentados, quizzes de comprensión y ejercicios con intérprete de Python integrado en el navegador.',
    category: 'python',
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&auto=format&fit=crop&q=80',
    duration: '3 libros · serie completa',
    level: 'principiante',
    rating: 0,
    students: 0,
    status: 'available',
    bookUrl: '/libro/index.html',
    instructor: {
      name: 'BKLN Software',
      bio: 'Desarrolladores con experiencia real en proyectos comerciales: apps Android, marketplaces, APIs, automatización e IA. Enseñamos lo que usamos.',
      avatar: '',
    },
    modules: [
      {
        id: 'l1-parte1',
        title: 'Libro 1 · Primeros pasos',
        duration: '≈ 4h de lectura',
        lessons: [
          { id: 'l1-m1', title: '¿Qué es programar?', duration: '≈ 35min', isFree: true },
          { id: 'l1-m2', title: 'Variables y tipos de datos', duration: '≈ 40min', isFree: true },
          { id: 'l1-m3', title: 'Operadores y expresiones', duration: '≈ 35min', isFree: true },
        ],
      },
      {
        id: 'l1-parte2',
        title: 'Libro 1 · Lógica y control',
        duration: '≈ 3h de lectura',
        lessons: [
          { id: 'l1-m4', title: 'Control de flujo', duration: '≈ 45min', isFree: true },
          { id: 'l1-m5', title: 'Funciones', duration: '≈ 50min', isFree: true },
        ],
      },
      {
        id: 'l1-parte3',
        title: 'Libro 1 · Estructuras de datos',
        duration: '≈ 3h de lectura',
        lessons: [
          { id: 'l1-m6', title: 'Listas y tuplas', duration: '≈ 45min', isFree: true },
          { id: 'l1-m7', title: 'Cadenas de texto', duration: '≈ 40min', isFree: true },
          { id: 'l1-m8', title: 'Proyecto final básico', duration: '≈ 50min', isFree: true },
        ],
      },
      {
        id: 'l2',
        title: 'Libro 2 · Python intermedio',
        duration: '≈ 6h de lectura',
        lessons: [
          { id: 'l2-m1', title: 'Diccionarios y conjuntos', duration: '≈ 40min', isFree: true },
          { id: 'l2-m2', title: 'Funciones avanzadas', duration: '≈ 45min', isFree: true },
          { id: 'l2-m3', title: 'Programación orientada a objetos', duration: '≈ 50min', isFree: true },
          { id: 'l2-m4', title: 'Manejo de errores', duration: '≈ 40min', isFree: true },
          { id: 'l2-m5', title: 'Archivos y datos', duration: '≈ 45min', isFree: true },
          { id: 'l2-m6', title: 'Módulos y paquetes', duration: '≈ 40min', isFree: true },
          { id: 'l2-m7', title: 'Comprensiones e iteradores', duration: '≈ 40min', isFree: true },
          { id: 'l2-m8', title: 'Proyecto final intermedio', duration: '≈ 60min', isFree: true },
        ],
      },
      {
        id: 'l3',
        title: 'Libro 3 · Python avanzado',
        duration: '≈ 7h de lectura',
        lessons: [
          { id: 'l3-m1', title: 'Python y la web', duration: '≈ 45min', isFree: true },
          { id: 'l3-m2', title: 'Bases de datos', duration: '≈ 45min', isFree: true },
          { id: 'l3-m3', title: 'APIs y servicios externos', duration: '≈ 50min', isFree: true },
          { id: 'l3-m4', title: 'Análisis de datos', duration: '≈ 50min', isFree: true },
          { id: 'l3-m5', title: 'Automatización', duration: '≈ 45min', isFree: true },
          { id: 'l3-m6', title: 'Testing y calidad', duration: '≈ 45min', isFree: true },
          { id: 'l3-m7', title: 'Python profesional', duration: '≈ 50min', isFree: true },
          { id: 'l3-m8', title: 'Proyecto final avanzado', duration: '≈ 60min', isFree: true },
        ],
      },
    ],
    includes: [
      '3 libros completos · 24 módulos disponibles ahora',
      'Intérprete de Python integrado en el navegador',
      'Quizzes de comprensión por capítulo',
      'Modo oscuro, ajuste de fuente y densidad',
      'Sin registro, sin pago — acceso de por vida',
    ],
  },
  {
    id: '2',
    slug: 'desarrollo-web-fullstack',
    title: 'Desarrollo Web Full Stack con Next.js',
    description: 'Construye aplicaciones web de producción con Next.js, Supabase y TypeScript.',
    longDescription:
      'Aprende a construir aplicaciones web modernas con el stack más demandado: Next.js, React, TypeScript, Tailwind CSS y Supabase. Crearás proyectos reales con autenticación, base de datos y despliegue incluidos.',
    category: 'web',
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=80',
    duration: 'próximamente',
    level: 'intermedio',
    rating: 0,
    students: 0,
    status: 'coming-soon',
    instructor: {
      name: 'BKLN Software',
      bio: '',
      avatar: '',
    },
    modules: [],
    includes: [],
  },
  {
    id: '3',
    slug: 'ia-machine-learning-python',
    title: 'IA y Machine Learning con Python',
    description: 'Machine learning, modelos de lenguaje y automatización inteligente con Python.',
    longDescription:
      'Un curso práctico de IA y Machine Learning con Python. Aprenderás a usar scikit-learn, integrar APIs de OpenAI y construir soluciones de automatización inteligente.',
    category: 'ia-ml',
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80',
    duration: 'próximamente',
    level: 'intermedio',
    rating: 0,
    students: 0,
    status: 'coming-soon',
    instructor: {
      name: 'BKLN Software',
      bio: '',
      avatar: '',
    },
    modules: [],
    includes: [],
  },
  {
    id: '4',
    slug: 'android-kotlin-jetpack',
    title: 'Apps Android con Kotlin y Jetpack Compose',
    description: 'Crea apps Android modernas desde cero: interfaz con Jetpack Compose, Room, Retrofit y publicación en Google Play.',
    longDescription:
      'Aprende a desarrollar aplicaciones Android profesionales con Kotlin y Jetpack Compose. Desde la primera pantalla hasta la publicación en Google Play — con arquitectura limpia, base de datos local, consumo de APIs y autenticación.',
    category: 'android',
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&auto=format&fit=crop&q=80',
    duration: 'próximamente',
    level: 'principiante',
    rating: 0,
    students: 0,
    status: 'coming-soon',
    instructor: {
      name: 'BKLN Software',
      bio: '',
      avatar: '',
    },
    modules: [],
    includes: [],
  },
  {
    id: '5',
    slug: 'sql-bases-de-datos',
    title: 'SQL y Bases de Datos para Desarrolladores',
    description: 'Domina SQL, diseño de bases de datos relacionales y PostgreSQL. Lo que todo desarrollador debería saber.',
    longDescription:
      'Un curso práctico de SQL y diseño de bases de datos para desarrolladores. Aprenderás desde SELECT hasta procedimientos almacenados, índices, transacciones y cómo estructurar datos para aplicaciones reales con PostgreSQL.',
    category: 'databases',
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    duration: 'próximamente',
    level: 'principiante',
    rating: 0,
    students: 0,
    status: 'coming-soon',
    instructor: {
      name: 'BKLN Software',
      bio: '',
      avatar: '',
    },
    modules: [],
    includes: [],
  },
]

export const projects: Project[] = [
  {
    id: '1',
    slug: 'bkln-marketplace',
    title: 'BKLN Marketplace',
    description: 'Plataforma C2C completa para África Central: 18 páginas, mensajería en tiempo real, sistema de suscripciones y panel de administración — construida desde cero en JavaScript puro.',
    longDescription:
      'BKLN Marketplace es una plataforma de compra-venta online orientada al mercado de África Central (moneda FCFA/XAF), construida íntegramente sin frameworks frontend. 18 páginas funcionales que cubren desde el onboarding hasta el panel de administración, pasando por un sistema de mensajería en tiempo real entre compradores y vendedores.\n\nLos usuarios pueden publicar productos con hasta 10 fotos, crear catálogos curados, activar ofertas con countdown y gestionar su perfil con integración de WhatsApp, Instagram, Facebook y TikTok. El sistema de autenticación soporta tres métodos: email/contraseña, OTP por SMS y Google OAuth — pensado para la realidad de un mercado emergente donde el móvil es el dispositivo principal.\n\nEl modelo de negocio se articula en torno a planes de suscripción (gratuito y Premium) con un flujo de activación por código gestionado desde el panel de admin, evitando dependencias de pasarelas de pago externas. El dashboard de administración incluye gestión de solicitudes, generación de códigos, moderación de contenido y analíticas.',
    category: 'web',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Supabase', 'Supabase Realtime', 'Google OAuth'],
    image: '/Screenshot.png',
    gallery: [],
    year: 2025,
    liveUrl: 'https://bklnmarketplace.com',
    challenges: [
      'Mensajería en tiempo real sin frameworks ni librerías de estado externas',
      'Sistema de planes con feature gating en cliente manteniendo coherencia con el backend',
      'Autenticación multi-método (email, SMS OTP, OAuth) en un flujo UX único y fluido',
      'Diseño mobile-first para mercados donde el smartphone es el único dispositivo',
    ],
    solutions: [
      'Supabase Realtime Channels para entrega de mensajes con latencia cero y cleanup automático',
      'Objeto PLAN_LIMITS centralizado que controla límites de productos, fotos y funcionalidades por plan',
      'Flujo de auth unificado con tabs animados y manejo de errores específico por método',
      'Bottom navigation adaptativa y safe-area insets para dispositivos con notch en cualquier pantalla',
    ],
  },
  {
    id: '2',
    slug: 'match-date',
    title: 'Match&Date',
    description: 'Plataforma de citas y eventos en español — swipe, matching mutuo, chat en tiempo real con Supabase Realtime y perfiles con 15+ campos de estilo de vida.',
    longDescription:
      'Match&Date es una plataforma de citas digital completa para el mercado hispanohablante, construida íntegramente en JavaScript puro con Supabase como backend. Combina la mecánica de swipe con perfiles de alta profundidad y un sistema de eventos presenciales integrado.\n\nEl algoritmo de matching es mutuo: solo se conectan usuarios que se han dado like mutuamente, implementado mediante funciones RPC en PostgreSQL con Row Level Security. Cuando hay match, una notificación animada aparece en tiempo real. El onboarding guía al usuario en 4 pasos: información básica, avatar, intereses (12 categorías) y preferencias de estilo de vida (zodíaco, mascotas, hábitos).\n\nEl sistema de chat usa Supabase Realtime Channels para entrega instantánea de mensajes con indicador de escritura en vivo, read receipts y actualización automática de conversaciones. Diseño mobile-first (480px) con dark theme, glassmorphism y animaciones CSS propias.',
    category: 'web',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Supabase', 'Supabase Realtime', 'PostgreSQL', 'Supabase Storage'],
    image: '/matchdate.png',
    gallery: [],
    year: 2025,
    challenges: [
      'Algoritmo de matching mutuo que evita mostrar perfiles ya vistos o pasados',
      'Chat en tiempo real con typing indicators sin frameworks de estado',
      'Sistema de swipe con gestos drag táctiles y feedback visual animado',
      'Row Level Security en PostgreSQL para garantizar privacidad entre usuarios',
    ],
    solutions: [
      'Función RPC en Supabase que verifica likes mutuos y crea el match atómicamente',
      'Supabase Realtime Channels con broadcast para typing y postgres_changes para mensajes',
      'Detector de gestos custom con umbral de distancia, rotación CSS y animación de salida',
      'Políticas RLS que restringen el acceso a perfiles, matches y mensajes por user_id',
    ],
  },
  {
    id: '8',
    slug: 'zentry',
    title: 'Zentry',
    description: 'App Flutter de gestión de eventos y control de acceso por QR — VIP, Normal y Staff, scanner en tiempo real con feedback de audio y vibración, disponible en 6 plataformas.',
    longDescription:
      'Zentry es una aplicación multiplataforma de gestión de eventos y control de acceso construida con Flutter y Supabase. Permite a organizadores crear eventos con aforo limitado, añadir invitados con tres tipos de ticket (VIP, Normal y Staff), y generar un código QR único por invitado compartible directamente por WhatsApp.\n\nEn la entrada, el staff escanea los QR con la cámara del dispositivo: el sistema valida en tiempo real contra la base de datos, impide entradas duplicadas, bloquea el acceso cuando se alcanza el aforo y responde con feedback de audio y vibración diferenciado (éxito, ya escaneado, aforo completo, inválido). El dashboard muestra estadísticas en vivo por evento: total de invitados, dentro, pendientes y progreso de capacidad.\n\nDesarrollada en Flutter con soporte nativo para Android, iOS, Web, Windows, macOS y Linux desde una única base de código. Backend en Supabase con autenticación, base de datos PostgreSQL en tiempo real y almacenamiento de assets.',
    category: 'android',
    technologies: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'QR Flutter', 'Mobile Scanner'],
    image: '/logo8.png',
    gallery: [],
    year: 2025,
    challenges: [
      'Validación QR en tiempo real con prevención de entradas duplicadas y control de aforo simultáneo',
      'Feedback multimodal (audio + haptic) en el scanner para entornos ruidosos como clubs y eventos',
      'Compartir QR de alta resolución por WhatsApp, galería y share nativo desde una sola pantalla',
      'Soporte de 6 plataformas desde una única base de código Flutter',
    ],
    solutions: [
      'Consulta a Supabase por QR code + evento_id con actualización de estado atómica para evitar race conditions',
      'Combinación de audioplayers + vibration con fallback a solo vibración si el audio no está disponible',
      'Screenshot package con pixel ratio 3x para exportar QR en alta resolución antes de compartir',
      'Arquitectura Flutter con separación de lógica por plataforma solo donde es estrictamente necesario',
    ],
  },
  {
    id: '7',
    slug: 'gestescolar',
    title: 'GestEscolar',
    description: 'Sistema de gestión escolar completo para colegios hispanohablantes — funciona offline en red local, instalación en un clic, sin necesidad de internet.',
    longDescription:
      'GestEscolar es un sistema de gestión escolar integral desarrollado con FastAPI y SQLite, diseñado para operar completamente offline en la red local del centro educativo. Cubre todo el ciclo académico: desde la matrícula y el seguimiento de pagos hasta la generación de boletines de notas por trimestre.\n\nGestiona alumnos con ficha completa (datos médicos, tutores, documentos adjuntos), profesores con asignación de materias por aula, y una estructura académica multinivel que soporta desde Preescolar hasta Bachillerato. El sistema genera carnets de estudiante automáticamente, produce listados y boletines listos para imprimir, y envía circulares internas.\n\nDiseñado para colegios sin infraestructura IT dedicada: una instalación en Windows con un único archivo .bat levanta el entorno Python, la base de datos y abre el navegador en la aplicación. Accesible desde cualquier equipo de la red local sin configuración adicional.',
    category: 'desktop',
    technologies: ['Python', 'FastAPI', 'SQLite', 'JWT', 'Jinja2', 'HTML5', 'CSS3', 'JavaScript'],
    image: '/Screenshot2.png',
    gallery: [],
    year: 2024,
    liveUrl: undefined,
    challenges: [
      'Diseñar para entornos sin internet ni infraestructura cloud',
      'Instalación cero-fricción para personal no técnico de colegios',
      'Jerarquía académica compleja: Nivel → Grado → Aula → Materia → Alumno',
      'Generación de documentos imprimibles (boletines, listas, carnets) directamente desde el navegador',
    ],
    solutions: [
      'Arquitectura offline-first con SQLite local accesible vía LAN sin dependencias externas',
      'Script .bat que automatiza la instalación de Python, dependencias y arranque del servidor',
      'Modelo de datos normalizado con 14 tablas y soft deletes para preservar historial académico',
      'CSS @media print con clases .no-print para generar documentos limpios desde cualquier vista',
    ],
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'marketplace-javascript-puro-sin-frameworks',
    title: 'Cómo construimos un marketplace completo sin frameworks frontend',
    excerpt: 'BKLN Marketplace: 18 páginas funcionales, mensajería en tiempo real y autenticación multi-método usando solo JavaScript, HTML y CSS. Lo que aprendimos y por qué lo repetiríamos.',
    content: `## El punto de partida

Cuando empezamos a construir BKLN Marketplace, teníamos una decisión por delante: ¿React, Vue, o vanilla JS? La respuesta no fue obvia al principio, pero terminó siendo la que más nos enseñó.

El proyecto era ambicioso: una plataforma C2C orientada al mercado de África Central, con moneda XAF, autenticación múltiple, mensajería en tiempo real, sistema de suscripciones y panel de administración. Nada trivial.

Elegimos JavaScript puro. Sin frameworks. Sin bundlers. Sin toolchain.

## Por qué vanilla JS

La razón principal no fue filosófica — fue práctica.

El mercado objetivo usa dispositivos modestos con conexiones variables. Cada kilobyte cuenta. Un bundle de React con sus dependencias, hidratación y runtime ya pesa varios cientos de KB antes de escribir una sola línea de lógica de negocio.

Con vanilla JS, el navegador ya trae el runtime. No hay nada que cargar, compilar ni hidratar. La primera interacción ocurre en milisegundos.

La segunda razón: queríamos entender a fondo lo que estaba pasando. Con un framework, cuando algo falla en producción, a veces no sabes si el problema es tuyo o de la librería. Sin framework, el código es completamente tuyo.

## Mensajería en tiempo real sin librerías de estado

El mayor desafío técnico fue el chat entre compradores y vendedores. En un stack moderno lo típico es usar un hook de React con un store de Zustand o Redux. Nosotros no teníamos nada de eso.

La solución fue **Supabase Realtime Channels**: suscripción directa a cambios en la tabla de mensajes con RLS (Row Level Security) garantizando que cada usuario solo recibe sus propios mensajes.

\`\`\`javascript
const channel = supabase
  .channel(\`chat:\${conversationId}\`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: \`conversation_id=eq.\${conversationId}\`
  }, (payload) => {
    appendMessage(payload.new)
  })
  .subscribe()
\`\`\`

El cleanup lo hacemos manualmente al salir de la vista. Sin useEffect, sin dependencias. Solo lógica.

## Autenticación multi-método en un flujo unificado

Soporte para tres métodos: email/contraseña, OTP por SMS y Google OAuth. El reto era presentar los tres en una sola pantalla sin que pareciera un formulario de gobierno.

La solución fue una interfaz de tabs animados con un solo contenedor que cambia de estado. El error de cada método se muestra inline, no como un alert genérico. Si introduces un email ya registrado, el sistema te sugiere directamente hacer login en vez de darte un error críptico.

## El sistema de planes sin pasarelas de pago

Quisimos evitar depender de Stripe o cualquier otra pasarela de pago externa para la activación de planes premium. En mercados emergentes, las tasas de conversión caen drásticamente si obligas a usar tarjeta.

El modelo que construimos: el cliente pide el plan, nosotros generamos un código de activación desde el panel de administración, el cliente paga por el canal que prefiera (transferencia, efectivo, móvil) y nosotros activamos el código.

Un objeto \`PLAN_LIMITS\` centralizado controla qué puede hacer cada usuario según su plan activo. Un solo lugar donde tocar cuando cambian las reglas de negocio.

## Lo que repetiríamos y lo que cambiaríamos

**Repetiríamos:** la decisión de vanilla JS para este contexto específico. El rendimiento en dispositivos modestos es notablemente mejor. El código es predecible y fácil de depurar.

**Cambiaríamos:** la gestión del estado global. Sin un sistema de reactividad, acabas con event emitters caseros y funciones de "re-render" manuales en algunos sitios. No es insostenible, pero escala peor que un sistema reactivo bien pensado.

Para proyectos donde el rendimiento en dispositivos lentos no es crítico, un framework moderno sigue siendo la opción más productiva. El contexto manda.

## Conclusión

Construir BKLN Marketplace sin frameworks nos obligó a entender cada pieza que normalmente damos por sentada. La mensajería en tiempo real, la gestión de estado, el routing por hash, la reactividad — todo implementado a mano.

¿Lo recomendamos para todos los proyectos? No. ¿Valió la pena para este? Absolutamente.`,
    category: 'web',
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2025-03-20',
    readTime: 9,
    tags: ['JavaScript', 'Supabase', 'Arquitectura', 'Marketplace'],
  },
  {
    id: '2',
    slug: 'python-automatizacion-casos-reales',
    title: 'Python para automatización: casos reales que hemos resuelto',
    excerpt: 'No teoría — ejemplos concretos de scripts Python que usamos en producción: scraping con manejo de errores robusto, automatización de reportes y bots que funcionan sin supervisión.',
    content: `## Por qué Python para automatizar

Hay una razón por la que Python es el lenguaje de automatización por excelencia: la distancia entre "tengo una idea" y "esto funciona" es extraordinariamente corta.

En BKLN hemos resuelto con Python tareas que antes costaban horas de trabajo manual. Aquí van tres casos reales.

## Caso 1: Extracción de datos con tolerancia a fallos

El primer script que construimos para un cliente era un extractor de datos de portales web. El problema clásico de scraping no es obtener los datos — es que el script falle a las 2 de la mañana porque una página tardó demasiado o cambió su estructura.

La solución fue un extractor con reintentos automáticos y logging detallado:

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
            logging.warning(f"Intento {attempt + 1} fallido: {e}")
            if attempt < max_retries - 1:
                time.sleep(delay * (attempt + 1))
    logging.error(f"Todos los intentos fallaron para {url}")
    return None
\`\`\`

Con este patrón, el script no muere al primer error. Reintenta con espera exponencial, registra todo en un archivo de log y continúa con el siguiente elemento. El cliente lo ejecuta cada noche con \`cron\` y a la mañana tiene los datos listos.

## Caso 2: Generación automática de reportes en PDF

Un cliente necesitaba un reporte semanal de ventas que antes preparaba manualmente en Excel — dos horas de trabajo cada lunes. Lo automatizamos con Python + \`reportlab\`.

La clave fue separar la lógica de datos de la lógica de presentación:

\`\`\`python
def generar_reporte(datos, periodo):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elementos = []

    # Título
    estilos = getSampleStyleSheet()
    elementos.append(Paragraph(f"Reporte de ventas — {periodo}", estilos['Title']))
    elementos.append(Spacer(1, 20))

    # Tabla de datos
    tabla_datos = [['Producto', 'Unidades', 'Total XAF']]
    for fila in datos:
        tabla_datos.append([fila['producto'], str(fila['unidades']), f"{fila['total']:,}"])

    tabla = Table(tabla_datos, colWidths=[200, 80, 100])
    tabla.setStyle(tabla_estilo())
    elementos.append(tabla)

    doc.build(elementos)
    return buffer.getvalue()
\`\`\`

El script se ejecuta los lunes a las 7:00 AM y envía el PDF por email automáticamente. El cliente no toca nada.

## Caso 3: Monitor de disponibilidad con alertas

Para otro cliente construimos un monitor que comprueba cada 5 minutos si su aplicación responde correctamente y envía un mensaje de WhatsApp si detecta un problema.

\`\`\`python
import schedule
import requests

def comprobar_servicio(url, umbral_ms=2000):
    try:
        inicio = time.time()
        r = requests.get(url, timeout=10)
        duracion_ms = (time.time() - inicio) * 1000

        if r.status_code != 200:
            alertar(f"⚠️ {url} devuelve {r.status_code}")
        elif duracion_ms > umbral_ms:
            alertar(f"🐢 {url} tarda {duracion_ms:.0f}ms (umbral: {umbral_ms}ms)")
        else:
            logging.info(f"✓ {url} — {duracion_ms:.0f}ms")

    except requests.RequestException as e:
        alertar(f"🔴 {url} no responde: {e}")

schedule.every(5).minutes.do(lambda: comprobar_servicio("https://tu-app.com"))

while True:
    schedule.run_pending()
    time.sleep(1)
\`\`\`

Simple, efectivo, sin dependencias de terceros innecesarias.

## Lo que tienen en común estos scripts

Los tres comparten el mismo principio: **hacen una sola cosa y la hacen bien**. No intentan ser frameworks. No tienen configuración XML ni YAML. Son scripts Python directos que cualquier desarrollador puede leer, modificar y mantener.

La automatización no tiene que ser compleja para ser valiosa. A veces el mayor impacto viene de la tarea más aburrida que alguien estaba haciendo a mano.`,
    category: 'python',
    coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2025-04-10',
    readTime: 10,
    tags: ['Python', 'Automatización', 'Scraping', 'Scripts'],
  },
  {
    id: '3',
    slug: 'supabase-en-produccion-lo-que-nadie-cuenta',
    title: 'Supabase en producción: lo que nadie te cuenta',
    excerpt: 'Llevamos Supabase en múltiples proyectos activos. Aquí va lo que aprendimos: RLS bien hecho, Realtime sin memory leaks, auth multi-método y los límites reales del plan gratuito.',
    content: `## Por qué usamos Supabase

En BKLN llevamos Supabase en producción en varios proyectos distintos: un marketplace C2C, una plataforma de citas, un sistema de gestión escolar y una web corporativa con formularios. No es una elección casual — es la herramienta que mejor equilibra productividad, control y coste para el tipo de proyectos que construimos.

Pero Supabase tiene matices que la documentación no siempre cubre. Aquí va lo que hemos aprendido.

## Row Level Security: hazlo bien desde el principio

RLS es la característica que más confunde a los equipos que vienen de Firebase. En Firebase el control de acceso está en reglas de seguridad separadas del esquema. En Supabase vive directamente en PostgreSQL.

La tentación cuando estás en desarrollo es deshabilitar RLS para ir más rápido. **No lo hagas.** Es mucho más difícil añadirlo después que diseñarlo desde el principio.

El patrón que usamos en todos nuestros proyectos:

\`\`\`sql
-- Habilitar RLS en todas las tablas de usuario
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo ven sus propios mensajes
CREATE POLICY "usuarios_ven_sus_mensajes"
ON messages FOR SELECT
USING (
  auth.uid() = sender_id OR
  auth.uid() = receiver_id
);

-- Solo el emisor puede insertar
CREATE POLICY "usuarios_insertan_sus_mensajes"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);
\`\`\`

El error más común: olvidar que RLS se aplica también a los Realtime subscriptions. Si tienes una política restrictiva en SELECT, tu canal de Realtime solo recibirá los cambios que esa política permite. Esto es bueno para seguridad, pero puede crear confusión si no lo sabes.

## Realtime sin memory leaks

Supabase Realtime es potente pero requiere gestión manual de suscripciones. Si abres canales sin cerrarlos, acumulas conexiones que consumen recursos en cliente y servidor.

En JavaScript puro (sin React hooks para hacer cleanup automático), el patrón que seguimos:

\`\`\`javascript
let activeChannel = null

function suscribirseAConversacion(conversationId) {
  // Limpiar canal anterior si existe
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
    }, handleNuevoMensaje)
    .subscribe()
}

// Al salir de la vista
function limpiar() {
  if (activeChannel) {
    supabase.removeChannel(activeChannel)
    activeChannel = null
  }
}
\`\`\`

La regla: por cada \`channel()\` que abres, tienes que tener un \`removeChannel()\` cuando ya no lo necesitas.

## Auth multi-método sin complejidad

Supabase Auth soporta email/contraseña, magic link, OAuth (Google, GitHub, etc.) y OTP por SMS. El truco es que todos comparten la misma sesión — no tienes que gestionar múltiples sistemas de autenticación.

Lo que sí tienes que gestionar: el flujo de onboarding tras el primer login. Con OAuth, el usuario llega con email pero sin los datos de perfil que necesitas. El patrón que usamos es un trigger en PostgreSQL:

\`\`\`sql
CREATE OR REPLACE FUNCTION crear_perfil_usuario()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO perfiles (id, email, creado_en)
  VALUES (NEW.id, NEW.email, NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER al_crear_usuario
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION crear_perfil_usuario();
\`\`\`

Así, independientemente del método de login, siempre tienes un perfil disponible inmediatamente.

## Los límites reales del plan gratuito

El plan gratuito de Supabase es generoso para desarrollo y proyectos pequeños, pero tiene límites que conviene conocer antes de lanzar:

- **500 MB de base de datos** — suficiente para empezar, limitante si guardas archivos o logs en la DB
- **2 GB de ancho de banda** — el más fácil de alcanzar si sirves imágenes desde Supabase Storage
- **50.000 usuarios activos mensuales** — difícilmente un problema al principio
- **Proyectos en pausa** tras 7 días de inactividad — esto sí es molesto en desarrollo

Para proyectos en producción con tráfico real, el plan Pro (25$/mes) es la opción correcta. Pero para MVP, el plan gratuito da para mucho más de lo que parece.

## Nuestra valoración después de varios proyectos

Supabase es la mejor opción que conocemos para proyectos donde quieres una base de datos PostgreSQL real (con todas sus capacidades: funciones, triggers, índices, full-text search) sin gestionar infraestructura.

La curva de aprendizaje de RLS es real, pero vale la pena. Una vez que lo entiendes, te da un nivel de control sobre quién accede a qué que Firebase simplemente no tiene.

¿Lo usaríamos para un proyecto de millones de usuarios? Dependería del caso. Para los proyectos que construimos — aplicaciones de negocio, plataformas de nicho, sistemas de gestión — es exactamente la herramienta que necesitamos.`,
    category: 'databases',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2025-05-12',
    readTime: 11,
    tags: ['Supabase', 'PostgreSQL', 'RLS', 'Realtime', 'Auth'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    company: 'FitLife Studio',
    role: 'CEO',
    avatar: '/images/testimonials/carlos.png',
    content: 'BKLN entregó exactamente lo que necesitábamos en tiempo y forma. La app supera las expectativas de nuestros usuarios y el código es limpio y bien documentado.',
    rating: 5,
  },
  {
    id: '2',
    name: 'María González',
    company: 'TechStore Online',
    role: 'Directora de Operaciones',
    avatar: '/images/testimonials/maria.png',
    content: 'El chatbot de IA que desarrollaron redujo nuestro volumen de tickets en un 60%. Una inversión que se pagó sola en el primer mes. Totalmente recomendados.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Alejandro Méndez',
    company: 'DataFlow Analytics',
    role: 'CTO',
    avatar: '/images/testimonials/alejandro.png',
    content: 'El pipeline de datos que construyeron procesa medio millón de registros diarios sin un solo problema. Profesionales de primer nivel.',
    rating: 5,
  },
]
