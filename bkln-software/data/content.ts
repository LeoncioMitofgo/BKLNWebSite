import type { Service, Product, Course, Project, BlogPost, Testimonial } from '@/types'

export const services: Service[] = [
  {
    id: '1',
    slug: 'desarrollo-web',
    title: 'Webs y tiendas online',
    description: 'Webs para presentar tu negocio, tiendas online y plataformas con usuarios, pensadas para el móvil y para conexiones lentas.',
    longDescription:
      'Desde una web sencilla para que te encuentren en Google hasta una plataforma con cuentas de usuario, pagos y panel de administración. Definimos juntos qué necesitas de verdad: no vendemos plantillas, construimos lo que tu proyecto pide.\n\nTodas nuestras webs se diseñan primero para el móvil, cargan rápido aunque la conexión sea mala y llevan botón de WhatsApp. Si lo necesitas, incluyen un panel para que tu equipo cambie textos, precios o fotos sin depender de nadie, y pueden estar en varios idiomas.',
    icon: 'Globe',
    forWho: [
      'Tus clientes te buscan en Google y no te encuentran.',
      'Contestas por WhatsApp las mismas preguntas todos los días.',
      'Necesitas una web y un correo profesional para trabajar con empresas o instituciones.',
      'Quieres vender online o recibir pedidos y reservas fuera de horario.',
      'Tienes una idea de plataforma (marketplace, portal de empleo, reservas) y quieres lanzarla.',
    ],
    examples: [
      { title: 'Web informativa', description: 'Presenta tu negocio o institución: quién eres, qué ofreces, dónde estás y cómo contactarte.' },
      { title: 'Web con panel de gestión', description: 'Tu equipo publica noticias, cambia precios o sube fotos sin tocar código.' },
      { title: 'Catálogo o tienda online', description: 'Productos con fotos, categorías y pedidos, con cobro adaptado a clientes sin tarjeta.' },
      { title: 'Plataformas con usuarios', description: 'Marketplaces, portales de empleo o de servicios, con cuentas, roles, mensajes y planes de suscripción.' },
    ],
    deliverables: [
      'Web publicada en tu dominio',
      'Código fuente completo',
      'Manual de uso básico',
      'Formación de 1 a 2 horas para tu equipo',
      'Soporte post-lanzamiento 30 días',
    ],
    pricingFactors: [
      'Tipo de web: informativa, con panel de gestión, tienda o plataforma con usuarios',
      'Número de páginas y secciones',
      'Cuentas de usuario y roles',
      'Pagos, mapas, correo, WhatsApp u otras integraciones',
      'Varios idiomas',
      'Diseño a medida o partiendo de una base existente',
    ],
    timeline: '2 a 12 semanas según alcance',
    faqs: [
      {
        question: '¿Puedo actualizar la web yo mismo?',
        answer: 'Sí, si incluimos un panel de gestión. Lo decidimos al definir el alcance, según cuánto vayas a cambiar el contenido.',
      },
      {
        question: '¿Me ayudáis con el dominio y el correo profesional?',
        answer: 'Sí. Te orientamos para registrar tu dominio y configurar un correo con tu nombre. Si ya los tienes, trabajamos con ellos.',
      },
      {
        question: '¿Cómo cobro si mis clientes no tienen tarjeta?',
        answer: 'Hay varias opciones: pedidos que se pagan por transferencia, en efectivo o por el móvil y se confirman desde el panel, o una pasarela de pago cuando tiene sentido. Lo vemos según tu negocio.',
      },
      {
        question: '¿La web es mía?',
        answer: 'Sí. Una vez completado el pago, el código y los contenidos son tuyos.',
      },
    ],
    relatedProjects: ['plataforma-delivery-multivertical'],
    relatedProducts: [],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Node.js', 'Vercel'],
    featured: true,
  },
  {
    id: '2',
    slug: 'apps-moviles',
    title: 'Apps móviles',
    description: 'Apps para Android y iPhone para tus clientes, tu equipo o tus repartidores, que funcionan bien aunque la conexión falle.',
    longDescription:
      'Desarrollamos apps Android nativas, que es donde está la mayoría de tus usuarios, y apps multiplataforma con Flutter cuando también necesitas llegar al iPhone sin duplicar el presupuesto. Casi siempre van acompañadas de un servidor y de un panel de administración, y nos encargamos de todo.\n\nPensamos cada app para el uso real: teléfonos de gama media, datos móviles que van y vienen, notificaciones que llegan y procesos que no se pierden si la conexión se corta.',
    icon: 'Smartphone',
    forWho: [
      'Quieres que tus clientes pidan, reserven o compren desde el móvil.',
      'Tu equipo trabaja en la calle (repartidores, comerciales, técnicos) y necesita una herramienta.',
      'Necesitas avisar a tus usuarios con notificaciones.',
      'Tus clientes usan sobre todo el teléfono y la web se te queda corta.',
    ],
    examples: [
      { title: 'App para tus clientes', description: 'Pedidos, reservas, catálogo, seguimiento y notificaciones.' },
      { title: 'App para tu equipo', description: 'Para repartidores, comerciales o personal de campo, con funciones que siguen disponibles sin conexión.' },
      { title: 'App de gestión', description: 'El negocio en tu móvil: ventas, caja y estadísticas en tiempo real.' },
      { title: 'App conectada a equipos', description: 'Terminales de venta, impresoras de tickets o lectores, integrados con sus kits de desarrollo.' },
    ],
    deliverables: [
      'App firmada y lista para publicar',
      'Código fuente completo',
      'Documentación técnica',
      'Publicación en Google Play (opcional)',
      'Soporte post-lanzamiento 30 días',
    ],
    pricingFactors: [
      'Solo Android o también iPhone',
      'Número de pantallas y flujos',
      'Servidor y panel de administración: nuevos o existentes',
      'Pagos, mapas, cámara, notificaciones u otras integraciones',
      'Funcionamiento sin conexión',
      'Diseño a medida o aportado por ti',
    ],
    timeline: '4 a 16 semanas según complejidad',
    faqs: [
      {
        question: '¿Android, iPhone o las dos?',
        answer: 'En Guinea Ecuatorial la mayoría de usuarios tiene Android, así que suele ser el punto de partida. Si también necesitas iPhone, usamos Flutter para hacer las dos con una sola base de código.',
      },
      {
        question: '¿Funciona sin internet?',
        answer: 'Se puede diseñar para que guarde los datos en el teléfono y los sincronice cuando vuelva la conexión. Lo decidimos al principio, porque cambia cómo se construye.',
      },
      {
        question: '¿Quién publica la app en Google Play?',
        answer: 'Podemos hacerlo nosotros. Lo recomendable es que la cuenta de desarrollador de Google esté a tu nombre, para que la app sea tuya.',
      },
      {
        question: '¿Necesito también una web?',
        answer: 'No siempre. A veces una web bien hecha para móvil basta para empezar; te lo decimos con honestidad antes de presupuestar.',
      },
    ],
    relatedProjects: ['sistema-pos-android-comercios', 'plataforma-delivery-multivertical', 'zentry'],
    relatedProducts: [],
    technologies: ['Kotlin', 'Jetpack Compose', 'Flutter', 'Dart', 'Firebase', 'Supabase', 'Room', 'Retrofit'],
    featured: false,
  },
  {
    id: '3',
    slug: 'sistemas-de-gestion',
    title: 'Sistemas de gestión a medida',
    description: 'Software para organizar tu negocio o tu centro: caja y ventas, stock, alumnos y matrículas, pedidos y paneles de control, también sin internet.',
    longDescription:
      'Sustituimos el cuaderno, el Excel y las llamadas por un sistema donde cada dato está en un solo sitio y cada persona ve lo que necesita. Caja que cuadra, stock al día, informes que salen solos y el negocio en tu móvil aunque no estés.\n\nLo adaptamos a cómo trabajas: roles y permisos para cada puesto, funcionamiento sin internet cuando la conexión no es fiable, y uso desde el ordenador, el navegador o una app Android. Partimos de sistemas que ya funcionan, como GestEscolar o nuestro punto de venta, o lo construimos desde cero.',
    icon: 'LayoutDashboard',
    forWho: [
      'La caja no cuadra al cerrar y nadie sabe por qué.',
      'Llevas alumnos, pagos, stock o pedidos en Excel o en cuadernos.',
      'Quieres saber cómo va el negocio desde el móvil sin llamar a nadie.',
      'Cada empleado necesita ver y hacer cosas distintas.',
      'La conexión falla y no te puedes permitir parar.',
    ],
    examples: [
      { title: 'Punto de venta y caja', description: 'Ventas, cierres de caja por turno, tickets y operadores con PIN, para comercios, farmacias y restaurantes.' },
      { title: 'Inventario y compras', description: 'Stock que se descuenta con cada venta, avisos de mínimo, entradas de mercancía y proveedores.' },
      { title: 'Gestión escolar', description: 'Alumnos, matrículas y pagos, notas y boletines listos para imprimir, sin depender de internet.' },
      { title: 'Paneles de control', description: 'Ventas, usuarios, pedidos o contenidos con filtros por fecha, en la web o en una app Android.' },
    ],
    deliverables: [
      'Sistema instalado en tus equipos o publicado en la nube',
      'Código fuente completo',
      'Manual de usuario',
      'Formación del personal',
      'Soporte post-lanzamiento 30 días',
    ],
    pricingFactors: [
      'Módulos necesarios: caja, stock, alumnos, pedidos, informes…',
      'Número de usuarios, roles y locales',
      'Funcionamiento sin internet',
      'Conexión con impresoras, lectores de códigos o básculas',
      'Importación de los datos que ya tienes',
      'Informes a medida',
    ],
    timeline: '4 a 14 semanas según módulos',
    faqs: [
      {
        question: '¿En la nube o instalado en mi local?',
        answer: 'Depende de tu conexión y de si quieres consultar los datos desde fuera. Instalado en tu red local funciona sin internet; en la nube lo ves desde cualquier sitio. También se pueden combinar: el local sigue funcionando y sincroniza cuando hay conexión.',
      },
      {
        question: '¿Podéis pasar los datos que ya tengo en Excel?',
        answer: 'Lo estudiamos al principio del proyecto. Importar lo que ya tienes evita volver a escribirlo todo a mano.',
      },
      {
        question: '¿Qué equipos necesito?',
        answer: 'Para la mayoría de negocios basta con un ordenador o una tablet, una impresora de tickets y, si vendes muchos productos, un lector de códigos. Te decimos qué comprar antes de empezar.',
      },
      {
        question: '¿Qué pasa si se va la luz o internet?',
        answer: 'Si el sistema está diseñado para trabajar sin conexión, las operaciones se guardan en el equipo y se sincronizan al volver. Para los cortes de luz recomendamos un SAI o un terminal con batería.',
      },
    ],
    relatedProjects: ['sistema-pos-android-comercios', 'gestescolar'],
    relatedProducts: ['gestescolar'],
    technologies: ['Python', 'FastAPI', 'SQLite', 'PostgreSQL', 'Supabase', 'Kotlin', 'React', 'Electron'],
    featured: true,
  },
  {
    id: '4',
    slug: 'ia-y-automatizacion',
    title: 'Asistentes con IA y automatización',
    description: 'Asistentes que atienden a tus clientes por WhatsApp y en tu web con tu propia información, y automatización de las tareas repetitivas que hoy haces a mano.',
    longDescription:
      'Un asistente con inteligencia artificial responde a tus clientes a cualquier hora usando solo la información que tú le das: catálogo, precios, horarios, preguntas frecuentes. Si no sabe algo, lo dice y pasa la conversación a una persona. Toma pedidos, te manda informes y hace solo lo que le permites.\n\nTambién automatizamos procesos: informes que se generan y se envían solos, datos que pasan de un sistema a otro sin copiar y pegar, y avisos cuando algo no va bien. Tareas que hoy te cuestan horas cada semana y que un programa hace en segundos.',
    icon: 'Bot',
    forWho: [
      'Respondes las mismas preguntas por WhatsApp todo el día.',
      'Pierdes clientes que escriben fuera de horario.',
      'Preparas a mano el mismo informe cada semana.',
      'Copias datos de un sitio a otro: Excel, correo, sistemas que no se hablan entre sí.',
    ],
    examples: [
      { title: 'Asistente para WhatsApp y web', description: 'Responde con la información de tu negocio, toma pedidos y pasa a una persona cuando hace falta.' },
      { title: 'Informes automáticos', description: 'Ventas, actividad o indicadores que te llegan por correo en PDF cada semana.' },
      { title: 'Recogida y orden de datos', description: 'Información de webs, documentos o archivos que queda ordenada y lista para usar.' },
      { title: 'Avisos y vigilancia', description: 'Un mensaje en tu WhatsApp si tu web se cae o si un indicador se sale de lo normal.' },
    ],
    deliverables: [
      'Asistente o automatización funcionando',
      'Panel para gestionar documentos y revisar conversaciones (asistentes)',
      'Documentación y guía de uso',
      'Formación para tu equipo',
      'Soporte post-lanzamiento 30 días',
    ],
    pricingFactors: [
      'Canales: web, WhatsApp, correo',
      'Volumen de conversaciones (coste de uso de la IA y de algunos mensajes de WhatsApp)',
      'Conexiones con tus sistemas: pedidos, calendario, correo',
      'Cantidad y orden de la información de partida',
      'Complejidad del proceso a automatizar',
      'Frecuencia: bajo demanda, programada o en tiempo real',
    ],
    timeline: 'Automatizaciones: 1 a 6 semanas · Asistentes e IA: 4 a 16 semanas',
    faqs: [
      {
        question: '¿El asistente se inventa respuestas?',
        answer: 'Está configurado para responder solo con tu información. Si no encuentra la respuesta, lo dice y pasa la conversación a una persona. Revisamos contigo las primeras conversaciones.',
      },
      {
        question: '¿Puede atender en mi WhatsApp?',
        answer: 'Se conecta a través de la API de WhatsApp Business de Meta, que normalmente usa un número dedicado. Te ayudamos con la configuración y la verificación de tu empresa.',
      },
      {
        question: '¿Cuánto cuesta mantenerlo?',
        answer: 'Además de la puesta en marcha, hay un coste por uso del servicio de IA y, en WhatsApp, de algunos mensajes. Te lo estimamos según tu volumen antes de empezar.',
      },
      {
        question: '¿Qué información necesita?',
        answer: 'Lo que ya tengas: catálogo, precios, horarios, preguntas frecuentes y condiciones, en documentos, en tu web o en un Excel.',
      },
    ],
    relatedProjects: ['brookai'],
    relatedProducts: ['brookai'],
    technologies: ['Python', 'FastAPI', 'Supabase', 'pgvector', 'WhatsApp Business API', 'Pandas', 'Playwright'],
    featured: true,
  },
  {
    id: '5',
    slug: 'medios-de-comunicacion',
    title: 'Plataformas para medios de comunicación',
    description: 'Webs y apps para radio y televisión: emisión en directo, podcast y biblioteca de contenidos, con la identidad de tu medio.',
    longDescription:
      'Llevamos tu radio o tu televisión a internet: emisión en directo desde la web y el móvil, programas a la carta, podcast y una biblioteca de contenidos ordenada, todo con la identidad de tu medio.\n\nSi todavía no tienes infraestructura para emitir por internet, la planteamos desde cero contigo. Y como tu audiencia te verá sobre todo desde el teléfono, todo se diseña primero para el móvil.',
    icon: 'Radio',
    forWho: [
      'Tu audiencia quiere verte u oírte desde el móvil, también fuera del país.',
      'Tus programas se pierden después de emitirse.',
      'Tu web no refleja la imagen de tu medio o es difícil de actualizar.',
      'Quieres empezar a emitir por internet y no sabes por dónde empezar.',
    ],
    examples: [
      { title: 'Emisión en directo', description: 'Radio y televisión en directo desde la web y desde una app.' },
      { title: 'A la carta y podcast', description: 'Programas, entrevistas y podcast organizados para ver o escuchar cuando quieras.' },
      { title: 'Portal de noticias', description: 'Con un panel para que la redacción publique sin depender de un programador.' },
      { title: 'App del medio', description: 'Directo, programación, noticias y notificaciones en el móvil de tu audiencia.' },
    ],
    deliverables: [
      'Web y/o app con la identidad del medio',
      'Panel de gestión de contenidos',
      'Puesta en marcha de la emisión en directo',
      'Formación del equipo',
      'Soporte post-lanzamiento 30 días',
    ],
    pricingFactors: [
      'Web, app o ambas',
      'Directo de radio, de televisión o de los dos',
      'Tamaño de la audiencia y volumen de contenidos',
      'Si ya existe infraestructura de emisión por internet',
      'Número de idiomas',
      'Contenido existente que hay que migrar',
    ],
    timeline: 'Se define en la propuesta según el alcance',
    faqs: [
      {
        question: '¿Necesitamos servidores propios para emitir?',
        answer: 'No necesariamente. Hay servicios de emisión que se contratan por uso; te recomendamos la opción que mejor encaje con tu audiencia y tu presupuesto, o la montamos desde cero si lo prefieres.',
      },
      {
        question: '¿Se puede ver desde el extranjero?',
        answer: 'Sí. La emisión por internet llega a cualquier país, salvo que haya derechos sobre algún contenido que lo impidan.',
      },
      {
        question: '¿Quién publica los contenidos?',
        answer: 'Tu equipo, desde un panel sencillo. Lo formamos para que sea autónomo.',
      },
    ],
    relatedProjects: [],
    relatedProducts: [],
    technologies: ['Next.js', 'React', 'Flutter', 'Supabase', 'Firebase Cloud Messaging'],
    featured: false,
  },
  {
    id: '6',
    slug: 'mantenimiento-y-soporte',
    title: 'Mantenimiento y soporte',
    description: 'Cuidamos tu web o tu app después del lanzamiento, también si no la hicimos nosotros: actualizaciones, copias de seguridad, arreglos y pequeños cambios.',
    longDescription:
      'Una web o una app sin mantenimiento se va estropeando aunque nadie la toque: caducan certificados, fallan componentes desactualizados, cambian las normas de Google Play y aparecen fallos de seguridad. Nos ocupamos de que siga funcionando para que tú te dediques a tu negocio.\n\nTrabajamos con una cuota mensual o anual según lo que necesites, y también nos hacemos cargo de proyectos que hizo otro proveedor: primero revisamos en qué estado están y te decimos con claridad qué hay que arreglar.',
    icon: 'Wrench',
    forWho: [
      'Tu web o tu app la hizo alguien que ya no está disponible.',
      'No sabes si tus datos tienen copia de seguridad.',
      'Necesitas pequeños cambios de vez en cuando y no tienes a quién pedírselos.',
      'Tu web va lenta, da errores o algo ha dejado de funcionar.',
    ],
    examples: [
      { title: 'Actualizaciones y seguridad', description: 'Mantenemos al día componentes, certificados y dependencias.' },
      { title: 'Copias de seguridad', description: 'Copias periódicas de datos y archivos, y comprobación de que se pueden recuperar.' },
      { title: 'Vigilancia', description: 'Te avisamos si la web se cae o algo deja de funcionar, muchas veces antes que tus clientes.' },
      { title: 'Cambios y mejoras', description: 'Horas cada mes para cambios de textos, precios, secciones o pequeñas funciones.' },
      { title: 'Hosting y dominio', description: 'Gestionamos renovaciones y configuración para que nada caduque por despiste.' },
    ],
    deliverables: [
      'Revisión inicial del estado del proyecto',
      'Plan de mantenimiento por escrito',
      'Informe periódico del trabajo realizado',
      'Atención prioritaria ante incidencias',
    ],
    pricingFactors: [
      'Tamaño y tecnología del proyecto',
      'Estado en que lo recibimos',
      'Frecuencia de copias de seguridad y revisiones',
      'Horas de cambios incluidas cada mes',
      'Tiempo de respuesta ante incidencias',
    ],
    timeline: 'Cuota mensual o anual',
    faqs: [
      {
        question: '¿Os hacéis cargo de una web que no hicisteis vosotros?',
        answer: 'Sí. Empezamos con una revisión para ver en qué estado está y qué riesgos tiene, y a partir de ahí te proponemos un plan.',
      },
      {
        question: '¿Qué pasa si algo falla un fin de semana?',
        answer: 'Depende del plan que elijas. Los tiempos de respuesta se pactan por escrito desde el principio.',
      },
      {
        question: '¿Necesito mantenimiento si mi web es sencilla?',
        answer: 'Necesita menos, pero no cero: el dominio y el certificado caducan y los componentes se quedan viejos. Para una web sencilla suele bastar un plan ligero.',
      },
    ],
    relatedProjects: [],
    relatedProducts: [],
    technologies: ['Vercel', 'Hostinger', 'Supabase', 'PostgreSQL', 'Next.js', 'Android'],
    featured: false,
  },
  {
    id: '7',
    slug: 'consultoria-y-formacion',
    title: 'Consultoría y formación',
    description: 'Una segunda opinión antes de invertir, revisión técnica de lo que ya tienes y formación para que tu equipo trabaje mejor con la tecnología.',
    longDescription:
      'A veces no necesitas que construyamos nada, sino a alguien con experiencia que te diga si vas por buen camino. Revisamos el presupuesto de otro proveedor antes de que firmes, auditamos una web o una app que ya tienes, o te ayudamos a decidir qué tecnología conviene a tu proyecto.\n\nTambién formamos equipos: personal que va a usar un sistema nuevo o desarrolladores que quieren mejorar sus prácticas. Partimos de los mismos proyectos reales que construimos para nuestros clientes.',
    icon: 'Lightbulb',
    forWho: [
      'Tienes un presupuesto de otro proveedor y no sabes si es razonable.',
      'Vas a invertir en un proyecto digital y quieres decidir bien antes de empezar.',
      'Tu web o tu app falla y quieres saber por qué.',
      'Tu equipo necesita formación para aprovechar una herramienta o mejorar como desarrolladores.',
    ],
    examples: [
      { title: 'Segunda opinión de presupuestos', description: 'Revisamos alcance, precio, plazos y condiciones de una propuesta antes de que la firmes.' },
      { title: 'Auditoría técnica', description: 'Seguridad, rendimiento, calidad del código y riesgos de una web o app existente, con un informe priorizado.' },
      { title: 'Planificación de proyectos', description: 'Te ayudamos a definir alcance, prioridades y tecnología antes de pedir presupuestos.' },
      { title: 'Formación de equipos', description: 'Sesiones prácticas para el personal que usará un sistema o para equipos de desarrollo.' },
    ],
    deliverables: [
      'Informe con hallazgos y recomendaciones',
      'Plan de acción priorizado',
      'Sesiones de formación presenciales o en remoto',
      'Seguimiento posterior (opcional)',
    ],
    pricingFactors: [
      'Revisión puntual o acompañamiento continuo',
      'Tamaño del sistema o del proyecto a revisar',
      'Número de sesiones o semanas',
      'Informe escrito o solo sesiones',
      'Presencial o en remoto',
      'Número de personas a formar',
    ],
    timeline: '1 a 8 semanas según alcance',
    faqs: [
      {
        question: '¿Revisáis presupuestos de otras empresas aunque luego no trabajemos juntos?',
        answer: 'Sí. La revisión es un servicio en sí mismo y no te obliga a nada más.',
      },
      {
        question: '¿La formación es presencial?',
        answer: 'En Malabo puede ser presencial; también la hacemos en remoto.',
      },
      {
        question: '¿Formáis a desarrolladores?',
        answer: 'Sí: buenas prácticas, revisión de código y tecnologías concretas. También tienes nuestros cursos en la web.',
      },
    ],
    relatedProjects: [],
    relatedProducts: [],
    technologies: ['Revisión de código', 'Arquitectura', 'Seguridad', 'Rendimiento', 'DevOps'],
    featured: false,
  },
]

export const products: Product[] = [
  {
    id: '5',
    slug: 'gestescolar',
    title: 'GestEscolar',
    description: 'Sistema de gestión escolar completo para Windows — instalación, formación y manual incluidos. Funciona offline en red local.',
    longDescription:
      'GestEscolar es un sistema de gestión escolar integral listo para instalar en cualquier colegio con Windows. Cubre el ciclo académico completo: registro de alumnos con ficha médica y tutor, matrículas con seguimiento de pagos, calificaciones por trimestre, gestión de profesores y aulas, y circulares internas.\n\nFunciona completamente offline en la red local del centro — sin suscripciones a la nube, sin dependencias externas. Accesible desde cualquier equipo conectado a la red del colegio.\n\nIncluye generación de documentos listos para imprimir: carnets de estudiante, listas por aula, boletines de notas trimestrales e historial de pagos. Dos roles de usuario: Administrador y Secretaria.',
    category: 'desktop',
    pricingNote: 'Compra de licencia o licencia anual. Requiere reunión previa para definir alcance.',
    requiresMeeting: true,
    image: '/Screenshot2.png',
    screenshots: ['/gest1.png', '/gest2.png', '/gest3.png', '/gest4.png'],
    deliveryType: 'install',
    includes: [
      'Instalación remota o presencial incluida',
      'Manual de funcionamiento completo',
      '2 días de formación del personal',
      'Licencia de compra o anual, según lo que mejor encaje con el centro',
    ],
    supportPlan: {
      period: 'año',
      includes: [
        'Asistencia remota y presencial prioritaria',
        'Actualizaciones de versión gratuitas',
        'Nuevas funcionalidades sin coste adicional',
      ],
    },
    requirements: ['Windows 10 / 11', 'Python 3.10+ (instalación automática)', 'Red local para acceso multiequipo'],
  },
  {
    id: '6',
    slug: 'zentry',
    title: 'Zentry',
    description: 'Gestiona tus eventos y el control de acceso con QR desde cualquier dispositivo. Backend incluido y gestionado por BKLN. Invitados ilimitados.',
    longDescription:
      'Zentry es una plataforma de gestión de eventos y control de acceso por QR. Con tu acceso creas tus eventos, añades invitados ilimitados con tickets VIP, Normal o Staff, y gestionas el control de acceso en tiempo real.\n\nNo necesitas configurar nada — el backend está incluido y es gestionado íntegramente por BKLN. Tú solo accedes con tu login y empiezas a crear eventos desde cualquier dispositivo: Android, iOS, Web, Windows, macOS o Linux.\n\nEl scanner valida QR en tiempo real: detecta entradas duplicadas, bloquea cuando se alcanza el aforo y responde con audio y vibración diferenciados. Los QR de cada invitado se comparten directamente por WhatsApp con un toque.',
    category: 'android',
    pricingNote: 'Pago por evento o licencia anual.',
    image: '/logo8.png',
    screenshots: [
      '/zentry-ss1.jpg',
      '/zentry-ss2.jpg',
    ],
    deliveryType: 'license',
    includes: [
      'Pago por evento o licencia anual',
      '1 cuenta de acceso (login único)',
      'Eventos ilimitados con la licencia anual',
      'Invitados ilimitados por evento',
      'Backend gestionado por BKLN — sin configuración',
      'Disponible en Android, iOS, Web, Windows, macOS y Linux',
    ],
    requirements: ['Android 8.0+ / iOS 13+ / Web / Windows 10+', 'Conexión a internet', 'Cámara (para el scanner QR)'],
  },
  {
    id: '9',
    slug: 'brookai',
    title: 'BrookAI',
    description: 'Bot de atención al cliente con IA que aprende de tus documentos y responde en tu web y WhatsApp. Multi-tenant y revendible — un sistema, múltiples clientes, cada uno con su propia identidad.',
    longDescription:
      'BrookAI es un sistema SaaS de chatbot con inteligencia artificial construido para funcionar en producción desde el primer día. Se integra en cualquier web con un fragmento de código y en WhatsApp Business API — el mismo bot, en todos los canales donde están tus clientes.\n\nEl bot responde usando exclusivamente los documentos que tú subes: catálogos, manuales, preguntas frecuentes, listas de precios, políticas. No inventa — busca en tu propio contenido usando RAG (pgvector + LangChain) y responde con tus propias palabras. Si no sabe responder después de varios intentos, deriva la conversación automáticamente a un agente humano.\n\nCada cliente tiene su propio espacio aislado (multi-tenant): sus documentos, su configuración, su historial de conversaciones y sus métricas. Desde el panel de administración puede gestionar todo sin tocar código — subir documentos, personalizar el nombre y tono del bot, ver el historial y revisar qué preguntas no supo responder.\n\nSi eres agencia o consultor, BrookAI es revendible: puedes ofrecer el servicio a tus propios clientes bajo tu marca, con cada uno en su propio tenant y configuración independiente.\n\nStack: FastAPI (Python) · Claude API (Anthropic) · LangChain + pgvector · Supabase · Widget Vanilla JS · React + Vite · WhatsApp Business API.',
    category: 'ia',
    pricingNote: 'Planes según volumen de consultas.',
    image: '/brookai-cover.jpg',
    screenshots: ['/brookai-cover.jpg', '/brookai-logo.webp'],
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
  },
]

export const courses: Course[] = [
  {
    id: '1',
    slug: 'python-desde-cero',
    title: 'Python desde cero · Serie completa',
    description: 'Aprende Python de cero hasta proyectos reales: web, bases de datos, APIs, análisis de datos, testing y Python profesional. Serie completa en tres libros interactivos.',
    longDescription:
      'Un curso completo de Python en español pensado para quien nunca ha programado. Nada de ejemplos de juguete — cada concepto se explica con situaciones reales y se practica con ejercicios ejecutables directamente en el navegador.\n\nLa serie se divide en tres libros: Libro 1 cubre los fundamentos (variables, funciones, listas, cadenas de texto y un proyecto final); Libro 2 profundiza en estructura y organización (POO, manejo de errores, archivos, módulos, comprensiones y un proyecto real); Libro 3 lleva el código al mundo real (web y scraping, SQLite, APIs REST, análisis de datos con Pandas, automatización, testing con unittest y Python profesional con dataclasses, ABCs y logging).\n\nLos 24 módulos están disponibles ahora mismo, sin necesidad de registro. Cada módulo incluye explicaciones en español, ejemplos de código comentados, quizzes de comprensión y ejercicios con intérprete de Python integrado en el navegador.',
    category: 'python',
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
      'Sin registro — acceso de por vida',
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
  {
    id: '6',
    slug: 'az-900-azure-fundamentals',
    title: 'AZ-900: Microsoft Azure Fundamentals',
    description: 'Prepárate para la certificación AZ-900 con un libro interactivo: conceptos de la nube, arquitectura y servicios de Azure, gestión y gobernanza — con quizzes y un simulacro de examen completo.',
    longDescription:
      'El AZ-900 (Microsoft Certified: Azure Fundamentals) es la certificación de entrada al ecosistema Azure. No requiere experiencia previa ni conocimientos técnicos profundos: mide que comprendas los conceptos de la nube, los servicios principales de Azure y cómo se gestiona y gobierna la plataforma.\n\nEl libro se organiza en tres partes: Parte I cubre los conceptos fundamentales de la nube (qué es, modelos de servicio IaaS/PaaS/SaaS, modelos de despliegue, beneficios y el modelo de responsabilidad compartida); Parte II entra en la arquitectura y los servicios core de Azure (regiones y zonas, jerarquía de recursos, cómputo, redes, almacenamiento e identidad con Entra ID); Parte III se centra en gestión y gobernanza (costes, cumplimiento, herramientas de gestión y supervisión).\n\nLos 15 módulos están disponibles ahora mismo, sin necesidad de registro. Cada uno incluye quizzes interactivos que revelan la respuesta correcta con su explicación, y tu progreso se guarda automáticamente en el navegador. El libro cierra con un simulacro de examen completo, un glosario de términos y consejos para el día del examen.',
    category: 'cloud',
    thumbnail: '/course-az900.webp',
    duration: '15 módulos + simulacro',
    level: 'principiante',
    rating: 0,
    students: 0,
    status: 'available',
    bookUrl: '/libro-az900/index.html',
    instructor: {
      name: 'BKLN Software',
      bio: 'Desarrolladores con experiencia real en proyectos comerciales: apps Android, marketplaces, APIs, automatización e IA. Enseñamos lo que usamos.',
      avatar: '',
    },
    modules: [
      {
        id: 'p1',
        title: 'Parte I · Conceptos de la nube',
        duration: '≈ 1h 42min de lectura',
        lessons: [
          { id: 'p1-m1', title: '¿Qué es la nube?', duration: '18 min', isFree: true },
          { id: 'p1-m2', title: 'IaaS, PaaS y SaaS', duration: '22 min', isFree: true },
          { id: 'p1-m3', title: 'Modelos de despliegue', duration: '20 min', isFree: true },
          { id: 'p1-m4', title: 'Beneficios de la nube', duration: '22 min', isFree: true },
          { id: 'p1-m5', title: 'CapEx, OpEx y responsabilidad', duration: '20 min', isFree: true },
        ],
      },
      {
        id: 'p2',
        title: 'Parte II · Arquitectura y servicios',
        duration: '≈ 2h 20min de lectura',
        lessons: [
          { id: 'p2-m1', title: 'Regiones y zonas', duration: '22 min', isFree: true },
          { id: 'p2-m2', title: 'Jerarquía de recursos', duration: '20 min', isFree: true },
          { id: 'p2-m3', title: 'Servicios de cómputo', duration: '26 min', isFree: true },
          { id: 'p2-m4', title: 'Redes', duration: '24 min', isFree: true },
          { id: 'p2-m5', title: 'Almacenamiento', duration: '24 min', isFree: true },
          { id: 'p2-m6', title: 'Identidad (Entra ID)', duration: '24 min', isFree: true },
        ],
      },
      {
        id: 'p3',
        title: 'Parte III · Gestión y gobernanza',
        duration: '≈ 1h 24min de lectura',
        lessons: [
          { id: 'p3-m1', title: 'Gestión de costes', duration: '22 min', isFree: true },
          { id: 'p3-m2', title: 'Gobernanza y cumplimiento', duration: '22 min', isFree: true },
          { id: 'p3-m3', title: 'Herramientas de gestión', duration: '20 min', isFree: true },
          { id: 'p3-m4', title: 'Supervisión', duration: '20 min', isFree: true },
        ],
      },
      {
        id: 'extra',
        title: 'Evaluación y recursos',
        duration: '≈ 38min',
        lessons: [
          { id: 'extra-m1', title: 'Simulacro de examen', duration: '30 min', isFree: true },
          { id: 'extra-m2', title: 'Glosario de términos', duration: '—', isFree: true },
          { id: 'extra-m3', title: 'Consejos para el día del examen', duration: '8 min', isFree: true },
        ],
      },
    ],
    includes: [
      '15 módulos organizados en 3 partes + simulacro de examen final',
      'Quizzes interactivos con explicación de cada respuesta',
      'Glosario de términos y consejos para el día del examen',
      'Seguimiento de progreso guardado automáticamente en el navegador',
      'Sin registro — acceso de por vida',
    ],
  },
  {
    id: '7',
    slug: 'flutter-supabase-aplicaciones-reales',
    title: 'Flutter y Supabase para aplicaciones reales',
    description: 'Construye una aplicación multiplataforma con autenticación, base de datos, permisos, Realtime y lógica server-side.',
    longDescription:
      'Formación práctica basada en los problemas que aparecen al construir productos móviles de verdad: varios tipos de usuario, datos compartidos, permisos, sincronización y conectividad irregular.\n\nAprenderás a organizar una aplicación Flutter con Riverpod, conectar Supabase de forma segura y diseñar flujos donde la lógica crítica vive en el servidor. El recorrido incluye autenticación, PostgreSQL, Row Level Security, Storage, Realtime y Edge Functions.\n\nEl objetivo no es completar pantallas aisladas, sino entender cómo construir un producto mantenible que pueda crecer desde un prototipo hasta una operación real.',
    category: 'android',
    thumbnail: '/course-android.jpg',
    duration: 'Taller práctico · 8 módulos',
    level: 'intermedio',
    rating: 0,
    students: 0,
    status: 'coming-soon',
    instructor: {
      name: 'BKLN Software',
      bio: 'Formación creada desde proyectos reales de aplicaciones móviles, plataformas multi-rol y backends con Supabase.',
      avatar: '',
    },
    modules: [
      {
        id: 'flutter-1',
        title: 'Arquitectura y estado',
        duration: '2 módulos',
        lessons: [
          { id: 'flutter-1-1', title: 'Estructura de una app Flutter mantenible', duration: '30 min', isFree: true },
          { id: 'flutter-1-2', title: 'Riverpod y contratos compartidos', duration: '35 min', isFree: true },
        ],
      },
      {
        id: 'flutter-2',
        title: 'Supabase seguro',
        duration: '3 módulos',
        lessons: [
          { id: 'flutter-2-1', title: 'Auth y perfiles por rol', duration: '35 min', isFree: true },
          { id: 'flutter-2-2', title: 'PostgreSQL y Row Level Security', duration: '45 min', isFree: true },
          { id: 'flutter-2-3', title: 'Storage y archivos privados', duration: '30 min', isFree: true },
        ],
      },
      {
        id: 'flutter-3',
        title: 'Tiempo real y producción',
        duration: '3 módulos',
        lessons: [
          { id: 'flutter-3-1', title: 'Realtime sin polling', duration: '35 min', isFree: true },
          { id: 'flutter-3-2', title: 'Edge Functions y lógica crítica', duration: '45 min', isFree: true },
          { id: 'flutter-3-3', title: 'Proyecto final: flujo multi-rol', duration: '60 min', isFree: true },
        ],
      },
    ],
    includes: [
      '8 módulos con ejemplos de arquitectura',
      'Supabase Auth, PostgreSQL, RLS, Storage y Realtime',
      'Ejercicios sobre flujos multi-rol y conectividad variable',
    ],
  },
  {
    id: '8',
    slug: 'android-kotlin-pos-hardware',
    title: 'Android con Kotlin: apps conectadas a hardware',
    description: 'Diseña aplicaciones Android robustas para terminales, impresión, sincronización local y operaciones sensibles.',
    longDescription:
      'Una formación orientada a quienes necesitan que una aplicación Android siga siendo útil fuera de una conexión perfecta y pueda comunicarse con dispositivos físicos.\n\nTrabajaremos con Kotlin, Jetpack Compose, Room, Retrofit y WorkManager para construir flujos offline-first, colas de sincronización y estados de operación claros. También revisaremos cómo integrar SDKs de hardware, manejar errores y separar la detección de un dispositivo de la confirmación real de una operación.\n\nEl curso pone el foco en decisiones de ingeniería: qué debe validarse en servidor, cómo evitar duplicados y cómo probar una integración física sin confundir una lectura con una transacción confirmada.',
    category: 'android',
    thumbnail: '/course-android.jpg',
    duration: 'Taller práctico · 8 módulos',
    level: 'avanzado',
    rating: 0,
    students: 0,
    status: 'coming-soon',
    instructor: {
      name: 'BKLN Software',
      bio: 'Contenido basado en integraciones Android verificadas con terminales, impresoras, NFC y backends remotos.',
      avatar: '',
    },
    modules: [
      {
        id: 'hardware-1',
        title: 'Base de la aplicación',
        duration: '2 módulos',
        lessons: [
          { id: 'hardware-1-1', title: 'Compose, navegación y estados de operación', duration: '35 min', isFree: true },
          { id: 'hardware-1-2', title: 'Room y modelo offline-first', duration: '45 min', isFree: true },
        ],
      },
      {
        id: 'hardware-2',
        title: 'Sincronización y backend',
        duration: '3 módulos',
        lessons: [
          { id: 'hardware-2-1', title: 'Retrofit y errores de red', duration: '30 min', isFree: true },
          { id: 'hardware-2-2', title: 'WorkManager y colas idempotentes', duration: '45 min', isFree: true },
          { id: 'hardware-2-3', title: 'Validación server-side y permisos', duration: '40 min', isFree: true },
        ],
      },
      {
        id: 'hardware-3',
        title: 'Hardware y pruebas',
        duration: '3 módulos',
        lessons: [
          { id: 'hardware-3-1', title: 'Impresoras y SDKs propietarios', duration: '35 min', isFree: true },
          { id: 'hardware-3-2', title: 'NFC, EMV y límites de una integración', duration: '45 min', isFree: true },
          { id: 'hardware-3-3', title: 'Proyecto final: terminal operativo', duration: '60 min', isFree: true },
        ],
      },
    ],
    includes: [
      '8 módulos sobre Android offline-first',
      'Room, Retrofit, WorkManager y Jetpack Compose',
      'Integración responsable con impresión y NFC',
    ],
  },
]

// Solo se muestran los cursos con libro publicado; el resto se queda aquí hasta que tenga contenido.
export const publishedCourses = courses.filter((c) => c.status === 'available' && c.bookUrl)

export const projects: Project[] = [
  {
    id: '8',
    slug: 'zentry',
    title: 'Zentry',
    description: 'App multiplataforma de gestión de eventos y control de acceso por QR — tickets VIP, Normal y Staff, scanner en tiempo real con audio y vibración, disponible en Android, iOS, Web y escritorio.',
    longDescription:
      'Organizar un evento en Malabo significaba listas en papel, entradas fotocopiadas y control de acceso manual. Con Zentry, el organizador crea el evento en minutos, añade los invitados desde el móvil y comparte el QR de cada uno directamente por WhatsApp — con un solo toque.\n\nEn la puerta, el staff escanea los códigos con la cámara del dispositivo. El sistema responde en menos de un segundo: entrada válida, ya escaneado, aforo completo o código inválido — cada caso con audio y vibración distintos para que el staff no tenga que mirar la pantalla en un entorno ruidoso. Las entradas duplicadas son imposibles.\n\nEl dashboard muestra en tiempo real cuántas personas han entrado, cuántas están pendientes y el progreso de capacidad del evento. Todo sincronizado al instante entre todos los dispositivos del equipo.\n\nZentry funciona en Android, iOS, Web, Windows, macOS y Linux desde una única aplicación — lo que significa que el organizador gestiona desde su portátil y el staff controla desde su móvil, sin instalar apps distintas.',
    category: 'android',
    sector: 'Eventos',
    technologies: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'QR Flutter', 'Mobile Scanner'],
    image: '/zentry-ss1.jpg',
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
    description: 'SaaS de chatbot con IA multi-tenant: bot de atención al cliente que aprende de documentos propios, se integra en cualquier web y WhatsApp, y escala a agente humano.',
    longDescription:
      'BrookAI nació de una necesidad concreta: empresas que querían atender a sus clientes fuera del horario laboral sin contratar más personal. El bot responde usando exclusivamente los documentos del negocio (RAG con pgvector y LangChain), no inventa ni alucina — si no sabe, lo dice y deriva a un humano.\n\nLa arquitectura es multi-tenant desde el diseño: cada cliente tiene su propio espacio aislado con sus documentos, su historial y su configuración. El mismo sistema en producción sirve a múltiples empresas sin que ninguna vea los datos de las demás.\n\nLa integración en la web del cliente es un único snippet de JavaScript — nada de instalar dependencias ni modificar el backend existente. El widget se inicializa con la API key del tenant y empieza a responder al instante. La integración con WhatsApp Business API lleva el mismo bot al canal de mensajería más usado en el mercado.\n\nEl panel de administración (React + Vite) permite gestionar documentos, ver el historial de conversaciones completo, revisar qué preguntas no supo responder (señal directa de qué documentación falta), y configurar el tono y nombre del bot — todo sin tocar código.\n\nStack: FastAPI · Python · Claude API (Anthropic) · LangChain · pgvector · Supabase · Vanilla JS widget · React + Vite · WhatsApp Business API. Dockerizado, con CI/CD y desplegado en un servidor propio.',
    category: 'ia',
    sector: 'Atención al cliente',
    technologies: ['Python', 'FastAPI', 'Claude API', 'LangChain', 'pgvector', 'Supabase', 'JavaScript', 'React', 'Vite', 'Docker', 'WhatsApp Business API'],
    image: '/brookai-cover.jpg',
    gallery: ['/brookai-cover.jpg', '/brookai-logo.webp'],
    year: 2026,
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
    id: '7',
    slug: 'gestescolar',
    title: 'GestEscolar',
    description: 'Sistema de gestión escolar completo para colegios en Guinea Ecuatorial — alumnos, matrículas, notas, pagos y documentos imprimibles. Funciona sin internet, instalación en un clic.',
    longDescription:
      'La mayoría de los colegios de Guinea Ecuatorial gestionan sus alumnos en Excel, sus pagos en cuadernos y sus boletines de notas a mano. GestEscolar digitaliza todo ese flujo en un sistema que cualquier secretaria puede aprender a usar en un día.\n\nDesde el primer día, el colegio puede registrar alumnos con ficha completa (datos médicos, tutor, documentos), gestionar matrículas con seguimiento de pagos, introducir calificaciones por trimestre y generar boletines listos para imprimir. Los carnets de estudiante se producen automáticamente. Las listas de aula también. Todo desde el navegador, sin instalar nada en cada equipo.\n\nEl sistema funciona completamente sin internet — corre en la red local del colegio. Si el servidor se apaga, nadie pierde datos: todo está en la base de datos local. Si se necesita acceder desde otro equipo del colegio, basta con abrir el navegador y escribir la IP del servidor.\n\nLa instalación completa tarda menos de 5 minutos: un archivo .bat configura el entorno Python, crea la base de datos y arranca el servidor. No hace falta saber de informática para instalarlo ni para mantenerlo.',
    category: 'desktop',
    sector: 'Educación',
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
  {
    id: '11',
    slug: 'sistema-pos-android-comercios',
    title: 'Sistema POS Android para comercios',
    description: 'Sistema de punto de venta para terminales Android con catálogo, operadores, cierre de caja, impresión y panel de gestión remoto.',
    longDescription:
      'Desarrollamos un sistema de punto de venta Android y un panel móvil de operaciones para gestionar productos, operadores, terminales, ventas e ingresos desde un mismo backend.\n\nEn el terminal, el operador inicia sesión con un PIN validado en servidor, crea la venta, imprime el recibo y puede trabajar con caché local cuando la conexión es inestable. El panel permite supervisar ventas, productos y terminales sin interrumpir el flujo del mostrador.\n\nLa integración con hardware incluye impresión y lectura contactless con el SDK del dispositivo. El flujo EMV se dejó preparado y probado en hardware de desarrollo; la autorización bancaria real requiere todavía adquirente, claves de producción y certificación específica.\n\nStack: Kotlin · Jetpack Compose · Hilt · Room · Retrofit · WorkManager · Supabase · PostgreSQL.',
    category: 'android',
    sector: 'Comercio y restauración',
    technologies: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Room', 'Retrofit', 'WorkManager', 'Supabase', 'PostgreSQL'],
    image: '/course-android.jpg',
    gallery: ['/course-android.jpg'],
    year: 2026,
    challenges: [
      'Mantener el flujo de venta disponible cuando la conexión es intermitente',
      'Evitar que dos mostradores reclamen el mismo terminal o dupliquen una venta si se pierde la conexión a mitad de una operación',
      'Cierre de caja que cuadre siempre, incluso si el dispositivo se queda sin red justo al cerrar el turno',
      'Una segunda app de gestión que refleje el negocio en tiempo real sin ralentizar el datáfono en el mostrador',
    ],
    solutions: [
      'Integración con el SDK del terminal para impresión y lectura contactless, con feedback claro ante errores y timeouts',
      'Cola local con WorkManager que sincroniza en segundo plano, con la asignación de terminal resuelta de forma atómica en el backend',
      'Cierre de caja con validación server-side — el estado remoto siempre manda, el dispositivo nunca "asume" que un cierre se aplicó',
      'Panel de gestión sobre el mismo backend con su propio ciclo de sincronización — el dueño ve el negocio en tiempo real sin tocar el flujo del mostrador',
    ],
  },
  {
    id: '12',
    slug: 'plataforma-delivery-multivertical',
    title: 'Plataforma de delivery multi-vertical',
    description: 'Ecosistema web y móvil para pedidos, comercios y repartidores, con asignación, tarifas y seguimiento en tiempo real.',
    longDescription:
      'Diseñamos una plataforma de logística bajo demanda con aplicaciones separadas para clientes y repartidores, además de paneles para la operación. El sistema contempla comida, supermercado, farmacia y paquetería desde una arquitectura común.\n\nEl flujo principal cubre catálogo, carrito, checkout, creación de pedidos, asignación temporal de repartidores, estados de entrega, ganancias y seguimiento en tiempo real. La lógica sensible se ejecuta en funciones server-side y las aplicaciones comparten tipos, reglas y componentes de dominio.\n\nEl proyecto fue construido con especial atención al contexto local: importes enteros en XAF, conectividad variable, reglas explícitas de cancelación y permisos reforzados en la base de datos.',
    category: 'android',
    sector: 'Logística y reparto',
    status: 'En desarrollo',
    technologies: ['Flutter', 'Dart', 'Riverpod', 'Next.js', 'TypeScript', 'Supabase', 'Realtime', 'Edge Functions'],
    image: '/course-android.jpg',
    gallery: ['/course-android.jpg'],
    year: 2026,
    challenges: ['Coordinar clientes, comercios y repartidores con estados válidos y consistentes', 'Asignar pedidos con ofertas temporizadas sin depender de polling continuo', 'Calcular tarifas y proteger las operaciones críticas en el servidor', 'Compartir contratos de datos entre aplicaciones Flutter y paneles web'],
    solutions: ['Edge Functions para crear pedidos, calcular tarifas y asignar repartidores', 'Supabase Realtime para tracking y ofertas, con RLS y triggers para reforzar permisos', 'Paquetes compartidos para enums, constantes, tema y reglas de negocio', 'Flujos principales verificados de extremo a extremo en dispositivo físico'],
  },
  {
    id: '13',
    slug: 'suite-herramientas-web-privadas',
    title: 'Suite de herramientas web privadas',
    description: 'Plataforma de utilidades online para productividad, documentos, desarrollo y tratamiento local de datos.',
    longDescription:
      'Creamos la base de una plataforma de herramientas digitales rápidas y accesibles, pensada para resolver tareas concretas sin obligar al usuario a crear una cuenta. La prioridad técnica es que cada herramienta cargue rápido y procese los datos en el navegador siempre que sea posible, reduciendo infraestructura y exposición de información sensible.',
    category: 'web',
    sector: 'Herramientas digitales',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'Cloudflare'],
    image: '/course-web.jpg',
    gallery: ['/course-web.jpg'],
    year: 2026,
    challenges: ['Diseñar muchas utilidades independientes sin perder una experiencia coherente', 'Procesar archivos y texto respetando privacidad y rendimiento', 'Crear páginas útiles para buscadores sin sacrificar accesibilidad', 'Escalar el catálogo solo cuando cada herramienta aporte valor real'],
    solutions: ['Componentes y patrones compartidos para acelerar nuevas herramientas', 'Procesamiento local en el cliente cuando la operación no necesita backend', 'Estructura SEO-first con rutas claras, metadatos y contenido especializado', 'Linting, typechecking y tests integrados desde el inicio'],
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '7',
    slug: 'sistema-caja-stock-farmacias-supermercados-restaurantes',
    title: 'Caja, stock y control desde el móvil: guía para farmacias, supermercados y restaurantes',
    excerpt: 'Qué debe tener un sistema de gestión para tu comercio: una caja que cuadra, el inventario al día, permisos para cada empleado y el negocio en tu móvil aunque no estés. Con lo específico de farmacias, supermercados, restaurantes y bares.',
    content: `## El problema: no saber qué pasa cuando no estás

Si tienes una farmacia, un supermercado o un restaurante, seguramente te suena: al cerrar, la caja no cuadra y nadie sabe por qué. Un producto se agota sin que nadie avise. Descubres que algo ha caducado cuando ya está en la basura. Y si no estás en el local, la única forma de saber cómo va el día es llamar por teléfono.

Un sistema de gestión, también llamado punto de venta, resuelve buena parte de esto. No es solo una caja registradora moderna: es el registro de todo lo que entra, sale y se cobra en tu negocio, y lo puedes consultar desde el móvil.

## Las cuatro piezas de un buen sistema

### 1. La caja

Es donde empieza todo. Cada venta queda registrada con sus productos, su importe, la hora y quién la hizo. Lo que debería tener:

- **Apertura y cierre por turno.** El cajero abre con un fondo inicial y, al cerrar, el sistema calcula lo que debería haber. Si el dinero contado no coincide, el descuadre queda registrado con nombre y hora.
- **Varias formas de pago.** Efectivo, transferencia, pago por móvil o tarjeta, y poder combinarlas en una misma venta.
- **Ticket impreso o digital.** Con una impresora térmica pequeña es suficiente; también se puede enviar por WhatsApp.
- **Anulaciones y descuentos bajo control.** Un cajero no debería poder borrar una venta ni aplicar un descuento grande sin la autorización de un encargado. Cada anulación queda registrada.

### 2. El inventario

- **Stock que se actualiza solo.** Si vendes una caja de paracetamol, el sistema descuenta una unidad. No hace falta contar a mano para saber qué queda.
- **Entradas de mercancía.** Cuando llega un pedido del proveedor, se registra y el stock sube.
- **Avisos de mínimo.** Defines un mínimo para cada producto y el sistema te avisa antes de que se agote.
- **Recuentos periódicos.** Contar de vez en cuando lo que hay en la estantería y compararlo con lo que dice el sistema saca a la luz mermas, roturas y robos.

### 3. Los usuarios y sus permisos

Cada persona entra con su propio usuario o un PIN y solo puede hacer lo que su puesto requiere. Un reparto habitual:

- **Propietario:** lo ve todo y desde cualquier sitio: informes, márgenes y todos los locales.
- **Gerente o encargado:** gestiona productos y precios, autoriza anulaciones y descuentos, cierra la caja y revisa los informes de su local.
- **Cajero:** vende y cobra. No cambia precios ni borra ventas.
- **Camarero**, en restaurantes y bares: abre mesas y toma pedidos; el cobro se cierra en caja.
- **Almacén:** registra entradas de mercancía y recuentos, sin acceso a la caja.

Que cada acción quede firmada por quien la hizo no es desconfiar del equipo. Es lo que permite aclarar un descuadre en cinco minutos en lugar de discutirlo una semana.

### 4. El negocio en tu móvil

Aquí está el cambio de verdad. Desde el teléfono, estés donde estés, puedes ver:

- Las ventas del día en tiempo real, por caja y por local.
- Los productos más vendidos y las horas de más movimiento.
- Las ventas de cada empleado.
- Avisos de stock bajo, productos a punto de caducar, anulaciones o descuadres.
- Un resumen al final del día que te llega sin tener que pedirlo.

Si tienes más de un local, todos aparecen en el mismo panel.

## Lo específico de cada negocio

### Farmacias

- **Lotes y fechas de caducidad.** Cada entrada se registra con su lote y su fecha, y el sistema avisa con tiempo de lo que va a caducar para venderlo antes o devolverlo al proveedor.
- **Primero sale lo que caduca antes.** Al vender, el sistema indica qué lote dispensar.
- **Búsqueda rápida** por nombre comercial o por principio activo, para ofrecer una alternativa cuando un medicamento se agota.
- **Registro de los medicamentos que se venden con receta**, si necesitas llevar ese control.

### Supermercados y tiendas

- **Lector de códigos de barras.** Cobrar escaneando es más rápido y evita errores de precio.
- **Productos al peso**, con báscula conectada o, al menos, con precio por kilo.
- **Miles de productos** organizados por categorías y proveedores, con cambios de precio en bloque.
- **Compras a proveedores:** qué pedir, cuánto y a quién, según lo que realmente se vende.
- **Margen por producto**, para saber qué te deja dinero y qué solo ocupa estantería.

### Restaurantes y bares

- **Plano de mesas.** De un vistazo, qué mesas están libres, ocupadas o pendientes de cobro.
- **Comandas a cocina y barra.** El camarero toma el pedido en el móvil o en una tablet y llega directamente a cocina, impreso o en pantalla. Se acabaron los papeles que se pierden.
- **Dividir la cuenta** entre varias personas o cobrar cada parte por separado.
- **Control de ingredientes.** Si una hamburguesa lleva 150 gramos de carne, cada venta descuenta esa cantidad del almacén. Así sabes cuánto debería quedar y detectas el desperdicio.
- **Coste de cada plato** a partir de sus ingredientes, para poner precios con criterio.

## Lo que hay que tener en cuenta aquí

- **Que siga funcionando sin internet.** Si se cae la conexión, la caja tiene que seguir vendiendo y sincronizar cuando vuelva. Pregunta siempre qué pasa sin conexión antes de elegir un sistema.
- **Los cortes de luz.** Un terminal con batería o un pequeño sistema de alimentación ininterrumpida (SAI) evita perder una venta a medias.
- **Pagos sin tarjeta.** El sistema tiene que registrar bien el efectivo, las transferencias y los pagos por móvil, que en muchos negocios son la mayoría.
- **Equipos sencillos.** Un terminal o una tablet Android, una impresora de tickets, un cajón portamonedas y, si vendes muchos productos, un lector de códigos. No hace falta un ordenador caro.
- **Copias de seguridad.** Tus ventas y tu inventario son la memoria del negocio: comprueba que se guardan también fuera del local.

## Cómo implantarlo sin parar el negocio

1. **Carga el catálogo:** productos, precios y, si los tienes, códigos de barras. Si ya están en una hoja de Excel, pregunta si se pueden importar.
2. **Haz un recuento inicial** para que el stock de partida sea real.
3. **Crea los usuarios** con sus permisos.
4. **Forma al equipo** con ventas de prueba antes de abrir.
5. **Empieza con una sola caja o un solo turno** y amplía cuando todo funcione.
6. **Revisa el primer cierre de caja** junto al encargado.

## Cuánto cuesta

Hay sistemas por suscripción mensual y sistemas con licencia propia, y a eso hay que sumar los equipos. Lo que más encarece suele ser lo específico de tu negocio: básculas, varios locales, comandas a cocina o informes a medida. Si quieres entender qué mueve el precio de un proyecto de software, lee [¿Cuánto cuesta una web o una app en Guinea Ecuatorial?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial).

## Cómo lo hacemos en BKLN

Hemos desarrollado un [sistema de punto de venta para terminales Android](/portfolio/sistema-pos-android-comercios) con caja, cierre de turno validado en el servidor, impresión de tickets, acceso de cada operador con su PIN y un panel en el móvil desde el que el propietario sigue las ventas en tiempo real. Sigue vendiendo cuando la conexión falla y sincroniza en cuanto vuelve. Sobre esa base adaptamos lo que tu negocio necesita: lotes y caducidades para una farmacia, códigos de barras para un supermercado, o mesas y comandas para un restaurante.

Cuéntanos cómo funciona hoy tu negocio y te proponemos cómo ordenarlo.`,
    category: 'guias',
    relatedService: 'sistemas-de-gestion',
    coverImage: '/course-android.jpg',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2026-10-09',
    readTime: 6,
    tags: ['Punto de venta', 'Gestión de negocios', 'Inventario', 'Restaurantes'],
  },
  {
    id: '8',
    slug: 'asistente-ia-whatsapp-web-negocio',
    title: 'Un asistente con IA que atiende por ti en WhatsApp y en tu web',
    excerpt: 'Responde a tus clientes a cualquier hora con la información que tú le das, toma pedidos y te manda informes. Cómo funciona de verdad, qué permisos darle y dónde están sus límites.',
    content: `## Qué es, y qué no es

Un asistente con inteligencia artificial es un programa que conversa por escrito con tus clientes, en WhatsApp o en el chat de tu web, y les responde como lo haría alguien de tu equipo. La diferencia con los bots de antes, los de "escriba 1 para precios", es que entiende preguntas escritas con naturalidad, aunque tengan faltas o estén mal planteadas, y contesta con frases normales.

Lo que no es: no es un empleado con criterio propio ni sabe nada de tu negocio por arte de magia. Sabe lo que tú le das y hace lo que tú le permites.

## Cómo sabe lo que sabe

Aquí suele haber una confusión. El asistente no aprende solo leyendo tus conversaciones ni se entrena por su cuenta. Lo que hace es consultar una base de información que preparas tú:

- Tu catálogo, con precios y disponibilidad.
- Horarios, ubicación y formas de pago.
- Las preguntas frecuentes y sus respuestas.
- Condiciones de envío, devoluciones o reservas.
- Si es para tu perfil profesional: tus servicios, tu experiencia, tus tarifas y tu forma de trabajar.

Cuando un cliente pregunta, el asistente busca en esa información lo que corresponde y redacta la respuesta a partir de ahí. Si la respuesta no está, lo correcto es que lo diga y pase la conversación a una persona, no que se invente algo.

Por eso, un asistente es tan bueno como la información que le das. Si cambias un precio y no lo actualizas, seguirá dando el precio antiguo.

## Dónde puede atender

- **WhatsApp.** Es donde están tus clientes. Para conectar un asistente hace falta la plataforma de WhatsApp Business de Meta (la API), no la aplicación normal del móvil. Ten en cuenta que normalmente se usa un número dedicado, que Meta puede pedirte verificar tu empresa y que cobra por algunos mensajes, sobre todo los que tu negocio envía sin que el cliente haya escrito antes. Además, si el cliente lleva más de 24 horas sin escribirte, solo puedes contactarle con plantillas de mensaje aprobadas por Meta.
- **El chat de tu web.** Una ventana de conversación en tu página, como la que tienes abajo a la derecha en esta.
- **El correo.** Puede leer lo que llega a una dirección, responder lo sencillo y dejarte el resto clasificado.
- **Otros canales**, como Messenger o Instagram, se pueden añadir con algo más de trabajo de integración.

Una ventaja: es el mismo asistente en todos los canales, con la misma información. Cambias un dato una vez y vale para todos.

## Qué puede hacer por ti

- **Responder a cualquier hora**, también de noche y en fin de semana.
- **Tomar pedidos o reservas.** Recoge qué quiere el cliente, cuántas unidades, la dirección o la fecha, y lo deja registrado para que tú o tu equipo lo confirméis.
- **Informar del estado de un pedido.** Si está conectado a tu sistema, puede consultar en qué punto está y responder al "¿cuándo llega lo mío?".
- **Agendar citas**, si lo conectas a tu calendario.
- **Pasar a una persona** cuando el cliente lo pide, cuando no sabe la respuesta o cuando detecta una queja.
- **Hacer informes.** Un resumen diario o semanal: cuántas conversaciones hubo, qué se preguntó más, qué pedidos entraron y, muy útil, qué preguntas no supo contestar. Esa lista te dice exactamente qué información le falta.
- **Atender en varios idiomas.** Español, francés o inglés, según escriba el cliente. Con las lenguas locales no esperes el mismo nivel.
- **Entender notas de voz**, si se configura para transcribirlas. En WhatsApp mucha gente prefiere mandar audios, así que conviene pedirlo desde el principio.

## Los permisos: tú decides hasta dónde llega

Que el asistente pueda atender en tu lugar no significa que pueda hacerlo todo. Lo sensato es darle permisos por niveles:

1. **Solo informar.** Responde con la información que le has dado. Es el punto de partida recomendable.
2. **Recoger datos.** Toma pedidos, reservas o solicitudes, que quedan pendientes hasta que alguien las confirma.
3. **Actuar dentro de unas reglas.** Confirma pedidos o citas por sí mismo, pero solo dentro de límites claros: horarios disponibles, productos con stock, importes máximos.
4. **Pedir permiso para lo delicado.** Descuentos, devoluciones, cambios de precio o cualquier compromiso fuera de lo habitual: el asistente lo prepara y tú lo apruebas con un toque.

Y hay cosas que no debería hacer nunca: inventarse precios o condiciones, compartir los datos de un cliente con otro o dar por bueno un pago que nadie ha comprobado.

## También para tu perfil profesional

No solo sirve para tiendas. Si eres consultor, abogado, formador o trabajas por tu cuenta, un asistente puede presentar tus servicios, resolver las dudas frecuentes, filtrar a quién te escribe y proponer una cita en tu agenda. Llegas a la reunión sabiendo ya qué necesita la otra persona.

Un consejo: separa bien lo profesional de lo personal. Dale solo la información que estés dispuesto a que lea cualquiera, porque cualquiera puede preguntarle.

## Los límites que conviene conocer

- **Puede equivocarse.** Con buena información se equivoca poco, pero no es infalible. Revisa conversaciones de vez en cuando, sobre todo al principio.
- **No sustituye las relaciones importantes.** Un cliente grande o una queja seria merecen que respondas tú.
- **Di que es un asistente.** Tus clientes tienen que saber que hablan con un asistente automático y cómo llegar a una persona. Da más confianza que intentar disimularlo.
- **Tiene un coste por uso.** Además de la puesta en marcha, cada conversación consume servicio de inteligencia artificial y, en WhatsApp, puede tener coste de Meta. Pregunta cómo se calcula antes de empezar.
- **Hay que mantenerlo.** Cuando cambian tus precios, tu horario o tus productos, hay que actualizar su información.

## Cómo empezar

1. **Reúne la información:** catálogo, precios, horario, preguntas frecuentes y condiciones. Si ya la tienes en documentos o en tu web, sirve.
2. **Empieza por el chat de la web**, que es más sencillo, y añade WhatsApp después.
3. **Las primeras semanas, dale solo permiso para informar.**
4. **Revisa cada semana las preguntas que no supo contestar** y completa su información.
5. **Amplía los permisos** (pedidos, citas) cuando te fíes de cómo responde.

## Cómo lo hacemos en BKLN

BrookAI es nuestro asistente para negocios. Responde solo con los documentos que tú le subes (catálogos, manuales, preguntas frecuentes, listas de precios), funciona en tu web con un fragmento de código y en WhatsApp Business, y pasa la conversación a una persona cuando no sabe responder. Desde su panel subes documentos, ajustas su nombre y su tono, revisas el historial y ves qué preguntas no supo contestar. Las conexiones con tu correo, tu calendario o tu sistema de pedidos las desarrollamos a medida, según lo que necesites.

Puedes probar ahora mismo un asistente de este tipo: el chat de esta web funciona así y solo responde con información de BKLN.`,
    category: 'guias',
    relatedProduct: 'brookai',
    coverImage: '/project-ia.jpg',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2026-10-09',
    readTime: 6,
    tags: ['Inteligencia artificial', 'WhatsApp', 'Atención al cliente', 'Automatización'],
  },
  {
    id: '4',
    slug: 'cuanto-cuesta-web-app-guinea-ecuatorial',
    title: '¿Cuánto cuesta una web o una app en Guinea Ecuatorial?',
    excerpt: 'No hay una cifra única, pero sí factores claros que mueven el precio. Qué encarece un proyecto, qué costes aparecen después y cómo pedir un presupuesto que puedas comparar.',
    content: `## La respuesta corta

Depende. Ya sabemos que es la respuesta que nadie quiere oír. Pero entre una página para dar a conocer tu negocio y una plataforma donde cientos de personas compran, venden y se escriben mensajes, el trabajo puede pasar de unas semanas a varios meses. Y el precio sigue al trabajo.

Lo útil es saber *de qué* depende. Con eso puedes calcular si tu idea es pequeña, mediana o grande, y comparar presupuestos sabiendo qué estás comparando.

## Primero: qué tipo de proyecto tienes

De menos a más trabajo:

- **Web informativa.** Unas pocas páginas para presentar tu negocio: quién eres, qué ofreces y cómo contactarte. Es lo más rápido de construir.
- **Web con panel de gestión.** Lo mismo, pero tu equipo puede publicar noticias, cambiar precios o subir fotos sin depender de un programador.
- **Catálogo o tienda online.** Productos, categorías, fotos y una forma de hacer pedidos. Aquí empieza a importar cómo cobras.
- **Plataforma con usuarios.** Cuentas, perfiles, roles distintos (cliente, vendedor, administrador) y mensajes entre usuarios. Un marketplace, un portal de empleo o un sistema de reservas entran aquí.
- **App móvil.** Para Android, o para Android e iPhone a la vez con una sola base de código. Casi siempre necesita también un servidor y un panel de administración detrás.
- **Sistema de gestión interno.** El software que tu equipo usa cada día: alumnos y notas en un colegio, ventas y caja en un comercio, inventario en un almacén.

Como referencia de plazos, en BKLN una web lleva de 2 a 12 semanas según el alcance, y una app móvil de 4 a 16. La horquilla es amplia porque dentro de cada tipo hay proyectos muy distintos.

## Lo que más mueve el precio

Dentro de un mismo tipo de proyecto, estas preguntas son las que hacen subir o bajar el presupuesto:

- **¿Cuántas pantallas y flujos?** No es lo mismo un formulario de contacto que un proceso de compra con carrito, pago y seguimiento del pedido.
- **¿Cuántos tipos de usuario?** Cada rol tiene sus pantallas y sus permisos. Un portal con empresas, candidatos y administradores es casi como hacer tres aplicaciones.
- **¿Hay que cobrar dentro de la plataforma?** Los pagos añaden trabajo, pruebas y responsabilidad.
- **¿Se conecta con otros servicios?** WhatsApp, SMS, mapas, correo o el programa de contabilidad que ya usas. Cada conexión es una pieza más que construir y mantener.
- **¿Diseño propio o adaptado?** Un diseño hecho a medida para tu marca lleva más tiempo que partir de una base que ya existe.
- **¿Tiene que funcionar sin internet?** Una app que guarda los datos en el teléfono y los sincroniza cuando vuelve la conexión es más compleja que una que siempre está conectada.

## Lo que cambia al construir para Guinea Ecuatorial

Hay decisiones que en otros mercados casi no se plantean y aquí sí:

- **Cobrar sin tarjeta.** Mucha gente no paga con tarjeta bancaria. Una solución habitual es que el cliente pague por transferencia, en efectivo o por el móvil, y que alguien active el servicio desde un panel de administración. Es más sencillo que integrar una pasarela de pago, pero hay que diseñarlo bien desde el principio.
- **Conexión irregular.** Si tus usuarios entran con datos móviles y la cobertura va y viene, la web tiene que ser ligera y la app tiene que saber esperar. Prepararlo cuesta algo más; no hacerlo cuesta clientes.
- **El móvil, primero.** La mayoría de tus clientes te verá desde un teléfono Android, no desde un ordenador. El diseño tiene que pensarse primero para esa pantalla.
- **Idiomas.** Si además vendes en Camerún o Gabón, el francés no es opcional. Traducir una plataforma ya terminada sale más caro que prepararla para varios idiomas desde el inicio.
- **Soporte cercano.** Instalar un sistema en un colegio o en una oficina y formar al personal en persona también es trabajo, y el presupuesto debería decirlo.

## Los costes que no salen en el primer presupuesto

El desarrollo no es el único gasto. Pregunta siempre por estos:

- **Dominio y alojamiento.** Se pagan cada año. Son pequeños para una web informativa y crecen con el tráfico y el número de usuarios.
- **Servicios de terceros.** Enviar SMS, usar la API de WhatsApp Business o un modelo de inteligencia artificial tiene un coste por uso que paga el propietario del proyecto.
- **Publicar en Google Play.** Google cobra una cuota de registro como desarrollador, y la app tiene que cumplir sus normas para que la aprueben.
- **Mantenimiento.** Corregir errores, actualizar componentes y adaptar la app a nuevas versiones de Android. Un software sin mantenimiento se va estropeando aunque nadie lo toque.
- **Formación.** Si tu equipo no sabe usar la herramienta, no la va a usar.

## Cómo gastar menos sin acabar con un mal producto

- **Empieza por lo imprescindible.** Una primera versión con solo lo que necesitas para operar (lo que se suele llamar MVP) te deja lanzar antes y gastar menos. El resto se añade cuando sepas qué piden tus usuarios.
- **Puede que no necesites una app.** Una web bien hecha para móvil se abre sin instalar nada y a veces cubre lo mismo por bastante menos.
- **Aprovecha lo que ya existe.** Si un producto ya hecho cubre la mayor parte de lo que buscas, adaptarlo suele salir mejor que construirlo desde cero.
- **Decide antes de empezar.** Los cambios a mitad de proyecto son lo que más encarece. Dedicar unos días a definir bien el alcance ahorra semanas después.

## Qué debe incluir un buen presupuesto

Antes de firmar, comprueba que tienes por escrito:

1. **El alcance**: qué pantallas y funciones entran y, tan importante como eso, cuáles no.
2. **Los plazos por fases**, con entregas que puedas ver y probar.
3. **Los pagos por hitos**, ligados a esas entregas.
4. **De quién es el código** al terminar. Debería ser tuyo.
5. **El soporte después del lanzamiento**: cuánto dura y qué cubre.
6. **Los costes recurrentes**: alojamiento, servicios externos y mantenimiento.

## Señales de alarma

Desconfía si te dan un precio cerrado sin preguntarte nada sobre tu negocio, si no hay nada por escrito, si el código y las cuentas quedan a nombre del proveedor o si no te entregan documentación. Lo barato sale caro cuando hay que rehacer el proyecto.

## ¿Y en tu caso?

Cuéntanos qué quieres construir, para quién y en qué plazo. Te respondemos con una estimación de alcance, tecnología y presupuesto, sin compromiso.`,
    category: 'guias',
    relatedService: 'desarrollo-web',
    coverImage: '/service-consulting.jpg',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2026-10-09',
    readTime: 5,
    tags: ['Presupuesto', 'Desarrollo web', 'Apps móviles', 'Guinea Ecuatorial'],
  },
  {
    id: '5',
    slug: 'digitalizar-gestion-colegio-guinea-ecuatorial',
    title: 'Cómo digitalizar la gestión de un colegio en Guinea Ecuatorial',
    excerpt: 'Del cuaderno y el Excel a un sistema que todo el personal pueda usar: por dónde empezar, qué decidir antes (nube o sin internet, quién accede a qué) y cómo hacer el cambio sin perder el curso.',
    content: `## El punto de partida de muchos colegios

Alumnos en una hoja de Excel, pagos de matrícula apuntados en un cuaderno, boletines rellenados a mano al final de cada trimestre. Funciona mientras el colegio es pequeño y una misma persona lo sabe todo. Cuando crece, empiezan los problemas: datos repetidos en varios archivos, pagos que nadie sabe si se cobraron, boletines que tardan semanas y listas de aula que hay que rehacer cada vez que alguien cambia de grupo.

Digitalizar no es comprar ordenadores. Es conseguir que la información de cada alumno esté en un solo sitio, que cada persona vea lo que necesita y que los documentos salgan solos.

## Qué conviene digitalizar primero

No hace falta hacerlo todo a la vez. Este orden suele funcionar:

1. **La ficha del alumno.** Datos personales, tutor o tutora, contacto de emergencia y observaciones médicas. Es la base de todo lo demás.
2. **Matrículas y pagos.** Qué ha pagado cada familia, qué debe y desde cuándo. Es lo que más tiempo ahorra a secretaría y lo que más discusiones evita.
3. **Aulas, grados y profesores.** Quién está en qué grupo y quién imparte cada materia.
4. **Notas y boletines.** Con lo anterior en orden, el boletín trimestral se genera a partir de las notas en lugar de escribirse a mano.
5. **Comunicaciones.** Circulares y avisos para el personal y las familias.

## Una decisión clave: en la nube o sin internet

Un sistema en la nube se usa desde cualquier sitio, pero depende de que la conexión funcione justo cuando la secretaria tiene a una familia delante. Un sistema instalado en la red local del colegio funciona aunque no haya internet: el servidor está en la oficina y los demás ordenadores del centro entran desde el navegador.

Ninguna opción gana en todos los casos. Si la conexión de tu colegio es estable y quieres consultar datos desde casa, la nube tiene sentido. Si la conexión falla a menudo, un sistema local da tranquilidad. En ese caso pregunta siempre cómo se hacen las copias de seguridad, porque los datos están en un solo equipo.

## Quién puede ver qué

En un colegio se manejan datos delicados: información médica, situación de pagos y notas de menores. No todo el personal necesita verlo todo.

- La **dirección o administración** necesita la visión completa.
- **Secretaría** gestiona alumnos, matrículas y documentos.
- El **profesorado**, si usa el sistema, solo debería ver y editar las notas de sus grupos.

Pide que cada persona entre con su propio usuario y contraseña, nunca con una cuenta compartida. Así se sabe quién hizo cada cambio.

## Los documentos que deberían salir solos

Un buen sistema escolar ahorra horas de papeleo. Comprueba que puede generar, listos para imprimir:

- Carnets de estudiante.
- Listas de alumnos por aula.
- Boletines de notas por trimestre.
- El historial de pagos de cada familia.

## Cómo hacer el cambio sin perder el curso

- **Elige bien el momento.** Lo ideal es arrancar antes del inicio del curso o entre trimestres, nunca en plena época de exámenes.
- **Pregunta cómo se pasan los datos que ya tienes.** Volver a escribir a cada alumno uno a uno es la parte más pesada del cambio; conviene saber desde el principio quién la hace y cómo.
- **Forma al personal.** Una o dos sesiones prácticas con quien va a usar el sistema cada día valen más que cualquier manual.
- **Mantén el método antiguo unas semanas.** Durante el primer mes conviene poder comparar con el Excel por si algo no cuadra.
- **Nombra a un responsable.** Alguien del colegio que conozca bien la herramienta y sea el contacto con el proveedor.

## Cuánto cuesta

Hay dos modelos habituales: pagar una licencia de una vez o pagar una cuota periódica. Con la licencia el gasto es mayor al principio; con la cuota es menor al principio, pero continuo. En los dos casos pregunta qué incluye: instalación, formación, actualizaciones y qué pasa cuando algo falla. Si quieres entender qué mueve el precio de un proyecto de software, lee nuestra guía [¿Cuánto cuesta una web o una app en Guinea Ecuatorial?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial).

## Cómo lo resolvemos en BKLN

GestEscolar es el sistema de gestión escolar que hemos desarrollado para colegios. Funciona sin internet en la red local del centro, se instala en un ordenador con Windows y cubre alumnos, matrículas con seguimiento de pagos, notas por trimestre, profesores, aulas y circulares. Genera carnets, listas de aula, boletines e historial de pagos listos para imprimir, e incluye la instalación, un manual y dos días de formación del personal.

Si quieres verlo funcionando, pídenos una demostración.`,
    category: 'guias',
    relatedProduct: 'gestescolar',
    coverImage: '/Screenshot2.png',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2026-10-09',
    readTime: 4,
    tags: ['Educación', 'Gestión escolar', 'Digitalización', 'Guinea Ecuatorial'],
  },
  {
    id: '6',
    slug: 'web-o-redes-sociales-negocio',
    title: '¿Tu negocio necesita una web o te basta con WhatsApp y las redes?',
    excerpt: 'Muchos negocios venden solo por WhatsApp, Facebook e Instagram, y les funciona. Cuándo es suficiente, cuándo empieza a quedarse corto y cómo combinar redes, web y WhatsApp sin gastar de más.',
    content: `## Las redes funcionan (hasta cierto punto)

Muchos negocios venden solo por WhatsApp, Facebook e Instagram, y les va bien. Tiene sentido: es gratis, tus clientes ya están ahí todos los días y puedes empezar hoy mismo. Nadie debería pagar una web solo porque "hay que tenerla".

La pregunta útil no es si necesitas una web, sino en qué momento las redes empiezan a quedarse cortas para lo que quieres conseguir.

## Cuándo te basta con WhatsApp y redes

Probablemente no necesitas una web todavía si:

- Vendes pocos productos o servicios y cambian poco.
- Tus clientes ya te conocen o llegan por recomendación.
- Puedes contestar tú mismo todos los mensajes del día.
- No te preocupa que alguien que no te conoce te encuentre buscando en Google.

En ese caso, saca todo el partido a lo que ya tienes. Pásate a **WhatsApp Business**, que es gratuito: te permite mostrar un catálogo con fotos y precios, dejar mensajes automáticos de bienvenida y de fuera de horario, guardar respuestas rápidas y etiquetar a cada cliente según en qué punto está su pedido.

## Señales de que se te está quedando corto

- **Contestas las mismas preguntas veinte veces al día.** Precio, horario, dónde estáis, si hacéis envíos. Cada una de esas respuestas es tiempo que no dedicas a vender.
- **Te buscan y no te encuentran.** Alguien escribe en Google lo que vendes y tu ciudad, y aparecen otros.
- **Empresas o instituciones te piden más.** Para trabajar como proveedor, presentarte a un concurso o simplemente dar confianza, una web y un correo con tu propio nombre (info@tunegocio.com) pesan mucho más que un número de teléfono.
- **Tu catálogo se pierde entre publicaciones.** Si tienes muchos productos o cambian a menudo, en las redes se hunden bajo las publicaciones nuevas y nadie los vuelve a ver.
- **Dependes de algo que no controlas.** Si te bloquean la cuenta o la plataforma cambia sus reglas, pierdes de golpe tu escaparate y tus contactos.
- **Quieres recibir pedidos o reservas mientras duermes.** Las redes no toman pedidos por sí solas; una web con un formulario o una tienda, sí.

## Lo que aporta una web propia

- **Te encuentran en Google** cuando alguien busca lo que vendes cerca de él.
- **Una dirección que es tuya**: tu propio dominio y tu propio correo, que no dependen de ninguna red social.
- **Toda la información ordenada en un solo sitio**: qué vendes, precios, horario, ubicación con mapa y cómo pedir.
- **Credibilidad** ante empresas, instituciones y clientes de fuera del país.
- **Un sitio al que enlazar** desde tus redes, tu WhatsApp, tus tarjetas y tu local.

## No es una cosa o la otra

Lo que mejor funciona es combinar las tres piezas, cada una con su papel:

1. **Las redes atraen.** Publicas, la gente te descubre.
2. **La web informa.** Quien quiere saber más encuentra todo ordenado, sin tener que preguntarlo.
3. **WhatsApp cierra.** Un botón visible en la web lleva directamente a la conversación para pedir o reservar.

Así no tienes que elegir. Las redes y WhatsApp siguen siendo tu día a día; la web es la base que lo ordena todo.

## Cómo empezar sin gastar de más

- **Empieza sencillo.** Una web de una o pocas páginas con quién eres, qué ofreces, dónde estás y cómo contactarte ya resuelve la mayoría de los problemas de arriba.
- **Botón de WhatsApp en todas las páginas.** Es la forma más natural de que tus clientes te escriban.
- **Fotos reales.** De tu local, tus productos y tu equipo. Las imágenes genéricas de internet no generan confianza.
- **Pensada para el móvil.** La mayoría de tus visitas llegarán desde un teléfono, a veces con poca cobertura: la web tiene que cargar rápido.
- **Crea tu perfil de empresa en Google.** Es gratuito y te ayuda a aparecer en Google Maps cuando alguien busca negocios como el tuyo cerca.
- **Mantenla al día.** Una web con precios o un horario de hace dos años resta más de lo que suma.

## Test rápido

Responde con sinceridad:

1. ¿Me preguntan lo mismo muchas veces al día?
2. ¿Quiero que me encuentren clientes que todavía no me conocen?
3. ¿Trabajo, o quiero trabajar, con empresas o instituciones?
4. ¿Tengo más productos o servicios de los que caben en unas cuantas publicaciones?

Si has contestado que sí a dos o más, una web te va a ayudar. Si quieres saber qué influye en el precio, lo explicamos en [¿Cuánto cuesta una web o una app en Guinea Ecuatorial?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial).

## Cómo lo hacemos en BKLN

Diseñamos webs para negocios pensadas primero para el móvil y para conexiones lentas, con botón de WhatsApp y, si lo necesitas, un panel para que tú mismo cambies precios, fotos y horarios sin depender de nadie. Cuéntanos qué vendes y te decimos qué necesitas, y también qué no.`,
    category: 'guias',
    relatedService: 'desarrollo-web',
    coverImage: '/blog-tutorials.jpg',
    author: {
      name: 'BKLN Software',
      avatar: '',
      bio: 'Equipo de desarrollo de BKLN Software & Systems.',
    },
    publishedAt: '2026-10-09',
    readTime: 4,
    tags: ['Desarrollo web', 'WhatsApp', 'Redes sociales', 'Pequeños negocios'],
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
    category: 'taller',
    relatedService: 'ia-y-automatizacion',
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
    category: 'taller',
    relatedService: 'desarrollo-web',
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

const showDrafts = process.env.NODE_ENV !== 'production'

// Más recientes primero; los borradores solo aparecen en desarrollo.
export const visiblePosts = blogPosts
  .filter((p) => showDrafts || !p.draft)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const testimonials: Testimonial[] = []
