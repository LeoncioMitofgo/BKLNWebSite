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
      '/zentry-ss1.jpg',
      '/zentry-ss2.jpg',
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
    image: '/ventasclaro-cover.jpg',
    screenshots: [
      '/ventasclaro-ss1.jpg',
      '/ventasclaro-ss2.jpg',
      '/ventasclaro-ss3.jpg',
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
  {
    id: '10',
    slug: 'miempleo',
    title: 'MiEmpleo GE',
    description: 'Portal de empleo llave en mano para Guinea Ecuatorial — vacantes, perfiles profesionales, mensajería en tiempo real, panel de empresa y suscripciones. White-label disponible.',
    longDescription:
      'MiEmpleo GE es la plataforma de empleo digital pensada para el mercado de Guinea Ecuatorial. Conecta empresas que buscan talento con profesionales que buscan oportunidades — todo en español, con la realidad local como punto de partida.\n\nLas empresas publican vacantes, gestionan candidaturas por estado (recibida, en revisión, entrevista, contratada) y acceden a un directorio de profesionales verificados. Los profesionales completan su perfil, suben su CV, se postulan con un clic y hacen seguimiento de todo desde su dashboard.\n\nMensajería interna en tiempo real, sistema de notificaciones instantáneas, tres roles diferenciados (empresa, profesional, particular) y un panel de administración completo. Modelo de monetización por planes de suscripción (free y premium) con activación manual desde el admin — sin depender de pasarelas de pago externas.\n\nDisponible como licencia white-label: BKLN instala, configura y entrega el sistema bajo tu marca y dominio. Incluye formación del equipo y soporte durante el lanzamiento.',
    category: 'web',
    price: 0,
    priceOnRequest: true,
    isFree: false,
    image: '/miempleo-logo.png',
    screenshots: ['/miempleo-logo.png', '/miempleo-icon.png'],
    rating: 0,
    downloads: 0,
    version: '1.0.0',
    deliveryType: 'source-code',
    includes: [
      'Plataforma completa instalada bajo tu dominio y marca',
      'Tres roles: empresa, profesional y particular',
      'Panel de administración con moderación de vacantes y usuarios',
      'Mensajería interna en tiempo real (Supabase Realtime)',
      'Sistema de notificaciones instantáneas',
      'Planes de suscripción con activación desde el admin',
      'Formación del equipo y soporte durante el lanzamiento',
      'Código fuente completo — tuyo para siempre',
    ],
    requirements: [
      'Dominio propio',
      'Cuenta Supabase (plan Pro recomendado)',
      'Hosting en Vercel u otro proveedor compatible con Next.js',
    ],
    changelog: [
      { version: '1.0.0', date: '2025-06-01', changes: ['Lanzamiento oficial'] },
    ],
  },
  {
    id: '9',
    slug: 'brookai',
    title: 'BrookAI',
    description: 'Bot de atención al cliente con IA que aprende de tus documentos y responde en tu web y WhatsApp. Multi-tenant y revendible — un sistema, múltiples clientes, cada uno con su propia identidad.',
    longDescription:
      'BrookAI es un sistema SaaS de chatbot con inteligencia artificial construido para funcionar en producción desde el primer día. Se integra en cualquier web con un fragmento de código y en WhatsApp Business API — el mismo bot, en todos los canales donde están tus clientes.\n\nEl bot responde usando exclusivamente los documentos que tú subes: catálogos, manuales, preguntas frecuentes, listas de precios, políticas. No inventa — busca en tu propio contenido usando RAG (pgvector + LangChain) y responde con tus propias palabras. Si no sabe responder después de varios intentos, deriva la conversación automáticamente a un agente humano.\n\nCada cliente tiene su propio espacio aislado (multi-tenant): sus documentos, su configuración, su historial de conversaciones y sus métricas. Desde el panel de administración puede gestionar todo sin tocar código — subir documentos, personalizar el nombre y tono del bot, ver el historial y revisar qué preguntas no supo responder.\n\nSi eres agencia o consultor, BrookAI es revendible: puedes ofrecer el servicio a tus propios clientes bajo tu marca, con cada uno en su propio tenant y configuración independiente.\n\nStack: FastAPI (Python) · Claude API (Anthropic) · LangChain + pgvector · Supabase · Widget Vanilla JS · React + Vite · WhatsApp Business API. En producción en bklnsoftware.tech.',
    category: 'ia',
    price: 0,
    priceOnRequest: true,
    isFree: false,
    image: '/brookai-cover.png',
    screenshots: ['/brookai-cover.png', '/brookai-logo.png'],
    rating: 0,
    downloads: 0,
    version: '1.0.0',
    deliveryType: 'source-code',
    includes: [
      'Bot entrenado con tus documentos (PDF, TXT, URLs) — RAG con pgvector',
      'Widget JS embebible en cualquier web con un solo snippet',
      'Integración completa con WhatsApp Business API',
      'Derivación automática a agente humano cuando el bot no sabe responder',
      'Panel de administración para gestionar documentos, configuración y métricas',
      'Multi-tenant — un sistema para múltiples clientes, cada uno aislado',
      'Historial de conversaciones y análisis de preguntas sin respuesta',
      'Instalación y puesta en marcha incluidas · Formación del equipo',
    ],
    requirements: [
      'Página web o número de WhatsApp Business activo',
      'Documentos del negocio en PDF o texto plano',
      'Conexión a internet',
    ],
    changelog: [
      { version: '1.0.0', date: '2026-05-25', changes: ['Lanzamiento oficial'] },
    ],
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
    thumbnail: '/course-python.jpg',
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
    thumbnail: '/course-web.jpg',
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
    description: 'NumPy, Pandas, Matplotlib, scikit-learn y tus primeros modelos predictivos — ejecutable en el navegador.',
    longDescription:
      'Un curso práctico en tres libros: fundamentos del ecosistema científico de Python, algoritmos de ML clásicos y deep learning. Todo el código se ejecuta en el navegador — sin instalar nada.',
    category: 'ia-ml',
    price: 0,
    thumbnail: '/course-ia.jpg',
    duration: '3 libros · 24 módulos',
    level: 'intermedio',
    rating: 0,
    students: 0,
    status: 'available',
    bookUrl: '/libro-ia/index.html',
    instructor: {
      name: 'Leoncio Felipe Mitogo',
      bio: 'Ingeniero de software con más de 8 años de experiencia en desarrollo de aplicaciones y sistemas de datos. Fundador de BKLN Software & Systems en Malabo.',
      avatar: '',
    },
    modules: [
      {
        id: 'l1',
        title: 'Libro I — Fundamentos',
        duration: '8 módulos',
        lessons: [
          { id: 'l1-m1', title: '¿Qué es la IA?', duration: '20 min', isFree: true },
          { id: 'l1-m2', title: 'NumPy — vectores y matrices', duration: '30 min', isFree: true },
          { id: 'l1-m3', title: 'Pandas — datos en tablas', duration: '35 min', isFree: true },
          { id: 'l1-m4', title: 'Matplotlib — ver para entender', duration: '30 min', isFree: true },
          { id: 'l1-m5', title: 'Regresión lineal', duration: '40 min', isFree: true },
          { id: 'l1-m6', title: 'Clasificación — KNN', duration: '35 min', isFree: true },
          { id: 'l1-m7', title: 'Árboles de decisión y Random Forest', duration: '40 min', isFree: true },
          { id: 'l1-m8', title: 'Evaluación de modelos', duration: '35 min', isFree: true },
        ],
      },
      {
        id: 'l2',
        title: 'Libro II — Intermedio',
        duration: '8 módulos',
        lessons: [
          { id: 'l2-m1', title: 'Preprocesamiento de datos', duration: '40 min', isFree: true },
          { id: 'l2-m2', title: 'Regresión con regularización', duration: '35 min', isFree: true },
          { id: 'l2-m3', title: 'Máquinas de soporte vectorial', duration: '40 min', isFree: true },
          { id: 'l2-m4', title: 'Clustering sin etiquetas', duration: '35 min', isFree: true },
          { id: 'l2-m5', title: 'PCA y reducción de dimensiones', duration: '35 min', isFree: true },
          { id: 'l2-m6', title: 'Selección de características', duration: '30 min', isFree: true },
          { id: 'l2-m7', title: 'Pipelines y automatización', duration: '40 min', isFree: true },
          { id: 'l2-m8', title: 'Proyecto: sistema de recomendación', duration: '60 min', isFree: true },
        ],
      },
      {
        id: 'l3',
        title: 'Libro III — Deep Learning',
        duration: '8 módulos',
        lessons: [
          { id: 'l3-m1', title: 'Redes neuronales artificiales', duration: '45 min', isFree: true },
          { id: 'l3-m2', title: 'Backpropagation y gradiente', duration: '45 min', isFree: true },
          { id: 'l3-m3', title: 'Redes convolucionales (CNN)', duration: '50 min', isFree: true },
          { id: 'l3-m4', title: 'Redes recurrentes (RNN)', duration: '50 min', isFree: true },
          { id: 'l3-m5', title: 'Transformers y atención', duration: '55 min', isFree: true },
          { id: 'l3-m6', title: 'Fine-tuning de modelos de lenguaje', duration: '60 min', isFree: true },
          { id: 'l3-m7', title: 'Agentes y herramientas', duration: '55 min', isFree: true },
          { id: 'l3-m8', title: 'Proyecto final — asistente con contexto', duration: '90 min', isFree: true },
        ],
      },
    ],
    includes: [
      'Código Python ejecutable directamente en el navegador',
      'NumPy, Pandas, Matplotlib y scikit-learn integrados',
      'Gráficos matplotlib renderizados en tiempo real',
      '24 módulos con quizzes y ejercicios prácticos',
      'Seguimiento de progreso sin registro',
      'Acceso inmediato · sin crear cuenta',
    ],
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
    thumbnail: '/course-android.jpg',
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
    thumbnail: '/course-sql.jpg',
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
    description: 'Plataforma C2C completa para África Central: compra-venta, mensajería en tiempo real, suscripciones y panel de administración — operativa en bklnmarketplace.com.',
    longDescription:
      'En Guinea Ecuatorial y la región no existía una plataforma de compra-venta online adaptada a la realidad local: precios en XAF, usuarios que acceden principalmente desde móvil y sin tarjeta bancaria universal. BKLN Marketplace nació para cubrir ese hueco.\n\nCualquier usuario puede publicar productos con hasta 10 fotos, gestionar su catálogo, activar ofertas con cuenta atrás y contactar a compradores directamente desde la plataforma. El chat funciona en tiempo real — los mensajes llegan al instante, sin necesidad de recargar. Los perfiles incluyen integración con WhatsApp, Instagram y TikTok para que vendedores con presencia en redes puedan conectar todo desde un solo lugar.\n\nEl modelo de activación de planes evita depender de pasarelas de pago externas: el cliente solicita el plan Premium, paga por el canal que prefiera (transferencia, efectivo, mobile money) y recibe un código de activación desde el panel de administración. Un sistema pensado para la realidad del mercado.\n\nLa plataforma está construida íntegramente en JavaScript puro sin frameworks — una decisión deliberada para garantizar la máxima velocidad en dispositivos modestos y conexiones variables, que es exactamente el perfil del usuario objetivo.',
    category: 'web',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Supabase', 'Supabase Realtime', 'Google OAuth'],
    image: '/Screenshot.png',
    gallery: ['/Screenshot.png', '/mktlogo.png'],
    year: 2025,
    liveUrl: 'https://bklnmarketplace.com',
    challenges: [
      'Sin pasarelas de pago convencionales: había que diseñar un modelo de activación por código adaptado al mercado local',
      'Usuarios en dispositivos modestos con conexión variable: cada KB del bundle cuenta',
      'Chat en tiempo real sin frameworks de estado — todo la reactividad implementada a mano',
      'Autenticación por email, SMS OTP y Google OAuth en un solo flujo coherente',
    ],
    solutions: [
      'Panel de admin con generación de códigos de activación — el cliente paga como prefiera, nosotros activamos',
      'Vanilla JS sin bundler: cero overhead de framework, primera interacción en milisegundos',
      'Supabase Realtime Channels con cleanup automático al salir de la vista de chat',
      'Interfaz de tabs animados con manejo de errores específico por método de login',
    ],
  },
  {
    id: '2',
    slug: 'match-date',
    title: 'Match&Date',
    description: 'Plataforma de citas y eventos en español — swipe, matching mutuo en tiempo real, chat con indicador de escritura en vivo y perfiles de alta profundidad. Lista para producción.',
    longDescription:
      'Match&Date es una plataforma de citas digital completa orientada al mercado hispanohablante, vendida como código fuente listo para producción. El comprador recibe todo el sistema — frontend, backend preconfigurado en Supabase y documentación de despliegue — y puede lanzar su propio servicio de citas sin partir de cero.\n\nLa experiencia está diseñada para enganchar desde el primer segundo: el onboarding guía al usuario en 4 pasos (perfil básico, foto, intereses y estilo de vida), y la mecánica de swipe responde con animaciones fluidas y feedback táctil. El matching es siempre mutuo — nadie puede escribir a alguien que no le haya dado like también.\n\nEl chat funciona en tiempo real con indicador de escritura en vivo, confirmación de lectura y actualización instantánea de conversaciones. Todo con Supabase Realtime, sin ninguna librería de estado adicional. La privacidad está garantizada a nivel de base de datos mediante Row Level Security — ningún usuario puede acceder a datos de otro, ni aunque intente manipular las peticiones.\n\nDiseño mobile-first en dark theme con glassmorphism y animaciones CSS propias. Funciona en cualquier navegador moderno sin instalación.',
    category: 'web',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Supabase', 'Supabase Realtime', 'PostgreSQL', 'Supabase Storage'],
    image: '/matchdate.png',
    gallery: ['/matchdate.png', '/match1.png', '/match2.png', '/match3.png', '/match4.png'],
    year: 2025,
    challenges: [
      'Matching mutuo sin mostrar perfiles ya vistos ni crear conexiones duplicadas',
      'Chat en tiempo real con typing indicators — sin Redux, sin Zustand, sin nada',
      'Swipe con gestos táctiles naturales: arrastrar, rotar y animar la salida de la tarjeta',
      'Privacidad real: que ningún usuario pueda leer datos de otro aunque lo intente',
    ],
    solutions: [
      'Función RPC en PostgreSQL que verifica el like mutuo y crea el match en una sola operación atómica',
      'Supabase Realtime con broadcast para typing y postgres_changes para mensajes nuevos',
      'Detector de gestos custom: umbral de distancia, rotación proporcional al desplazamiento y animación de salida',
      'Row Level Security en todas las tablas — perfiles, matches y mensajes solo accesibles por su propietario',
    ],
  },
  {
    id: '8',
    slug: 'zentry',
    title: 'Zentry',
    description: 'App multiplataforma de gestión de eventos y control de acceso por QR — tickets VIP, Normal y Staff, scanner en tiempo real con audio y vibración, disponible en Android, iOS, Web y escritorio.',
    longDescription:
      'Organizar un evento en Malabo significaba listas en papel, entradas fotocopiadas y control de acceso manual. Con Zentry, el organizador crea el evento en minutos, añade los invitados desde el móvil y comparte el QR de cada uno directamente por WhatsApp — con un solo toque.\n\nEn la puerta, el staff escanea los códigos con la cámara del dispositivo. El sistema responde en menos de un segundo: entrada válida, ya escaneado, aforo completo o código inválido — cada caso con audio y vibración distintos para que el staff no tenga que mirar la pantalla en un entorno ruidoso. Las entradas duplicadas son imposibles.\n\nEl dashboard muestra en tiempo real cuántas personas han entrado, cuántas están pendientes y el progreso de capacidad del evento. Todo sincronizado al instante entre todos los dispositivos del equipo.\n\nZentry funciona en Android, iOS, Web, Windows, macOS y Linux desde una única aplicación — lo que significa que el organizador gestiona desde su portátil y el staff controla desde su móvil, sin instalar apps distintas.',
    category: 'android',
    technologies: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'QR Flutter', 'Mobile Scanner'],
    image: '/zentry-logo.png',
    gallery: ['/zentry-ss1.jpg', '/zentry-ss2.jpg'],
    year: 2025,
    challenges: [
      'Evitar que dos personas del staff validen el mismo QR al mismo tiempo — race condition en la entrada',
      'Feedback instantáneo en entornos ruidosos: el scanner tiene que comunicar sin depender del sonido solo',
      'Compartir QR individuales por WhatsApp en alta resolución desde el móvil',
      'Una sola app que funcione en Android, iOS, Web y escritorio sin duplicar código',
    ],
    solutions: [
      'Consulta a Supabase con actualización de estado atómica — si dos dispositivos escanean el mismo QR a la vez, solo uno pasa',
      'Combinación de audio + vibración con patrones distintos por resultado, con fallback a solo vibración',
      'Exportación del QR como imagen de alta resolución (pixel ratio 3x) antes de compartir',
      'Flutter con separación de lógica por plataforma solo donde es estrictamente necesario',
    ],
  },
  {
    id: '10',
    slug: 'brookai',
    title: 'BrookAI',
    description: 'SaaS de chatbot con IA multi-tenant: bot de atención al cliente que aprende de documentos propios, se integra en cualquier web y WhatsApp, y escala a agente humano. En producción en bklnsoftware.tech.',
    longDescription:
      'BrookAI nació de una necesidad concreta: empresas que querían atender a sus clientes fuera del horario laboral sin contratar más personal. El bot responde usando exclusivamente los documentos del negocio (RAG con pgvector y LangChain), no inventa ni alucina — si no sabe, lo dice y deriva a un humano.\n\nLa arquitectura es multi-tenant desde el diseño: cada cliente tiene su propio espacio aislado con sus documentos, su historial y su configuración. El mismo sistema en producción sirve a múltiples empresas sin que ninguna vea los datos de las demás.\n\nLa integración en la web del cliente es un único snippet de JavaScript — nada de instalar dependencias ni modificar el backend existente. El widget se inicializa con la API key del tenant y empieza a responder al instante. La integración con WhatsApp Business API lleva el mismo bot al canal de mensajería más usado en el mercado.\n\nEl panel de administración (React + Vite) permite gestionar documentos, ver el historial de conversaciones completo, revisar qué preguntas no supo responder (señal directa de qué documentación falta), y configurar el tono y nombre del bot — todo sin tocar código.\n\nStack: FastAPI · Python · Claude API (Anthropic) · LangChain · pgvector · Supabase · Vanilla JS widget · React + Vite · WhatsApp Business API. Dockerizado, con CI/CD y desplegado en Hostinger VPS (bklnsoftware.tech).',
    category: 'ia',
    technologies: ['Python', 'FastAPI', 'Claude API', 'LangChain', 'pgvector', 'Supabase', 'JavaScript', 'React', 'Vite', 'Docker', 'WhatsApp Business API'],
    image: '/brookai-cover.png',
    gallery: ['/brookai-cover.png', '/brookai-logo.png'],
    year: 2026,
    liveUrl: 'https://bklnsoftware.tech',
    challenges: [
      'RAG fiable: el bot debe responder solo con información real del cliente, sin alucinar ni mezclar datos de otros tenants',
      'Aislamiento total entre tenants — documentos, vectores y conversaciones deben ser invisibles entre clientes',
      'Widget JS embebible sin romper los estilos ni el JS de la web huésped',
      'Integración con WhatsApp Business API: validación de firma Meta, gestión de sesiones por número de teléfono',
    ],
    solutions: [
      'Filtro por tenant_id en todas las búsquedas pgvector — cada query de RAG solo accede a los chunks del tenant correspondiente',
      'Row Level Security en Supabase + API keys hasheadas por tenant — imposible acceder a datos ajenos aunque se manipule la request',
      'Shadow DOM para el widget: estilos y scripts completamente encapsulados, cero conflictos con el host',
      'Endpoint de webhook con validación X-Hub-Signature-256 y sesiones de conversación indexadas por número de teléfono',
    ],
  },
  {
    id: '9',
    slug: 'miempleo',
    title: 'MiEmpleo GE',
    description: 'Portal de empleo completo para Guinea Ecuatorial — ofertas, perfiles profesionales, mensajería en tiempo real, panel de empresa y suscripciones premium.',
    longDescription:
      'Guinea Ecuatorial no tenía un portal de empleo digital adaptado a su mercado: empresas locales, perfiles en español y francés, y un flujo pensado para la realidad del país. MiEmpleo nació para cubrir ese vacío.\n\nLas empresas publican vacantes, gestionan candidaturas y acceden a un directorio de profesionales verificados. Los profesionales completan su perfil, suben su CV, se postulan con un clic y hacen seguimiento de sus aplicaciones desde un dashboard propio. Ambos tipos de usuario pueden comunicarse vía mensajería interna en tiempo real.\n\nEl sistema incluye tres roles diferenciados (empresa, profesional, particular), un panel de administración completo con moderación de vacantes y usuarios, y un modelo de monetización por planes de suscripción (free, premium). Las notificaciones llegan en tiempo real tanto dentro de la app como por email.\n\nConstruido con Next.js 15 App Router, Supabase para auth y base de datos, Tailwind CSS y TypeScript. Desplegado en Vercel.',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Supabase Realtime', 'Tailwind CSS', 'Vercel', 'PostgreSQL', 'RLS'],
    image: '/miempleo-logo.png',
    gallery: ['/miempleo-logo.png', '/miempleo-icon.png'],
    year: 2025,
    liveUrl: 'https://miempleo.vercel.app',
    challenges: [
      'Tres roles de usuario con dashboards, flujos y permisos completamente distintos en una sola app',
      'Mensajería en tiempo real con notificaciones instantáneas — sin polling, con Supabase Realtime',
      'Modelo de monetización sin pasarela de pago estándar: solicitud de upgrade + activación manual desde admin',
      'Moderación de contenido: vacantes y perfiles deben poder ser revisados y bloqueados desde el panel',
    ],
    solutions: [
      'Route groups de Next.js por rol con layouts y middleware de auth independientes',
      'Supabase Realtime Channels con RLS — cada usuario solo recibe sus propias notificaciones y mensajes',
      'Panel de admin con tabla de solicitudes de pago y acción de activación one-click por usuario',
      'Sistema de flags en la base de datos + acciones de servidor para aprobar, rechazar o banear contenido',
    ],
  },
  {
    id: '7',
    slug: 'gestescolar',
    title: 'GestEscolar',
    description: 'Sistema de gestión escolar completo para colegios en Guinea Ecuatorial — alumnos, matrículas, notas, pagos y documentos imprimibles. Funciona sin internet, instalación en un clic.',
    longDescription:
      'La mayoría de los colegios de Guinea Ecuatorial gestionan sus alumnos en Excel, sus pagos en cuadernos y sus boletines de notas a mano. GestEscolar digitaliza todo ese flujo en un sistema que cualquier secretaria puede aprender a usar en un día.\n\nDesde el primer día, el colegio puede registrar alumnos con ficha completa (datos médicos, tutor, documentos), gestionar matrículas con seguimiento de pagos, introducir calificaciones por trimestre y generar boletines listos para imprimir. Los carnets de estudiante se producen automáticamente. Las listas de aula también. Todo desde el navegador, sin instalar nada en cada equipo.\n\nEl sistema funciona completamente sin internet — corre en la red local del colegio. Si el servidor se apaga, nadie pierde datos: todo está en la base de datos local. Si se necesita acceder desde otro equipo del colegio, basta con abrir el navegador y escribir la IP del servidor.\n\nLa instalación completa tarda menos de 5 minutos: un archivo .bat configura el entorno Python, crea la base de datos y arranca el servidor. No hace falta saber de informática para instalarlo ni para mantenerlo.',
    category: 'desktop',
    technologies: ['Python', 'FastAPI', 'SQLite', 'JWT', 'Jinja2', 'HTML5', 'CSS3', 'JavaScript'],
    image: '/Screenshot2.png',
    gallery: ['/Screenshot2.png', '/gest1.png', '/gest2.png', '/gest3.png', '/gest4.png', '/gest5.png'],
    year: 2024,
    challenges: [
      'Colegios sin internet ni servidor cloud — todo tiene que funcionar offline en la red local',
      'Personal no técnico: la instalación no puede requerir conocimientos de informática',
      'Jerarquía académica compleja: Nivel → Grado → Aula → Materia → Alumno con historial preservado',
      'Boletines, listas y carnets que se puedan imprimir directamente desde el navegador',
    ],
    solutions: [
      'SQLite local con acceso vía LAN — sin dependencias externas, sin suscripciones, sin nube',
      'Script .bat que instala Python, dependencias y arranca el servidor en un doble clic',
      'Modelo de datos con 14 tablas y soft deletes — los registros eliminados se conservan en el historial',
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
    coverImage: '/course-web.jpg',
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
    coverImage: '/course-python.jpg',
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
    coverImage: '/course-sql.jpg',
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

export const testimonials: Testimonial[] = []
