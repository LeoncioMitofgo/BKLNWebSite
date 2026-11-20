# Plan de la web v3 — bklnsoftware.tech

> Desde el 20-11-2026. Sustituye el rediseño de la rama `rediseno`: se queda su base técnica (tipografías, colores, papel, componentes), pero cambian el aspecto y el contenido.
> Referencia visual: `maqueta-portada/v3.html` (fuera de git, en `.git/info/exclude`).
> Rama de trabajo: `web-v3`, creada desde `rediseno`, que queda intacta. **Nada se sube a GitHub ni a producción sin el visto bueno de Mike** (el repo es público).

## Decisiones de Mike (20-11-2026)
- **Titular:** "Software a medida, hecho en Malabo." Sin franco CFA. "Malabo" no se repite en el rótulo ni en el texto de entrada.
- **Trabajos de la portada, de cuatro sectores:**
  - Crazy December (eventos).
  - WallBlue, el TPV de los carritos del aeropuerto. Se puede citar por contrato, pero no se enseña el producto en uso: va una recreación del Z92 con datos de demostración.
  - Gestión de un despacho de abogados, sin nombre y sin capturas: va una tarjeta con sus módulos. En uso desde julio de 2026.
  - GestEscolar, con datos de demostración y sin el nombre del colegio.
- **"Hemos trabajado con":** empresas, comercio, banca, instituciones públicas, educación, despachos de abogados, deporte y eventos. Son sectores, sin nombrar clientes, salvo los que Mike autoriza.
- **Lenguaje para cualquier organización**, no solo para negocios ("tu organización"). Odoo es un servicio y una demo, no el caso principal.
- **Verde solo como acento:** el botón principal y la palabra "Malabo.".
- **Un único botón flotante (WhatsApp).** El chat del asistente está retirado hasta que `ai.bklnsoftware.tech` vuelva a funcionar (ahora falla la conexión segura desde fuera). Cuando vuelva, irá como un enlace que no se abre solo.
- **Fuera "35+ proyectos" y "3 países"**, porque no se pueden respaldar. Tampoco Madrid.
- **"ERP con Odoo", sin SAP**, hasta que haya un proyecto de SAP que enseñar.
- **Cargo público: "Fundador".** "Fundador y CTO" cuando importa lo técnico. **Nunca "CEO".**
- **El origen de BKLN se cuenta por su porqué** (apostar por la transformación digital con proyectos y formación), no por dónde ni cuándo nació.
- **La foto de Mike solo va en "Nosotros", pequeña.** Nunca en la portada.
- **Imágenes:** pantallas y aparatos recreados en HTML con datos de demostración, o fotos reales. Nada generado con IA en los trabajos.
- **La página de Trabajos mantiene** el Marketplace ("En desarrollo"), la plataforma de delivery y la suite de herramientas web.

## Fases
### Fase 1 — Base y portada (hecha el 20-11-2026, pendiente de revisión de Mike)
- [x] Portada v3 en ES, EN y FR: titular, cuatro casos, sectores, "También", servicios, carta firmada y guías para cualquier organización.
- [x] `components/home/PosIllustration.tsx` (el Z92 y el móvil del dueño) y `components/home/LegalCaseCard.tsx`.
- [x] Cabecera con cuatro entradas (Trabajos, Servicios, Nosotros, Guías) y "Hablemos" en contorno. Productos y Cursos en el pie y en el menú del móvil.
- [x] Pie de página con columnas, sin la marca gigante. Fuera X, que está sin verificar.
- [x] Un solo botón flotante de WhatsApp, oscuro y abajo a la derecha. Chat retirado.
- [x] JSON-LD: `jobTitle` "Founder" y sin Twitter.
- [x] Muro de capturas sin el Marketplace. `public/gestescolar-panel.jpg`, recortada sin el nombre del colegio.
- [x] `tsc`, `eslint` y `next build` sin errores. Revisado con capturas en escritorio (1440 px) y en móvil (390 px).

### Fase 2 — Casos y productos
- [ ] Caso WallBlue: renombrar el caso `sistema-pos-android-comercios` y conservar el slug (y el inglés `android-pos-system`) para no romper enlaces. Recreación del Z92, demo sin conexión (`OfflineDemo`, que sale de la portada) y texto corregido según lo que de verdad cobra con tarjeta (ver Pendientes).
- [ ] Caso nuevo `gestion-despacho-abogados` en ES, EN y FR: módulos, stack y "en uso desde julio de 2026". Hoy **el enlace de la portada da 404** hasta hacer esta página.
- [ ] GestEscolar (producto y caso): etiqueta "Datos de demostración" en todas las capturas (`gest1–5.png`, que muestran el nombre del colegio). Decidir si se recortan.
- [ ] Crazy December, BKLN en Odoo (demo) y BrookAI con el lenguaje v3.
- [ ] Listado de Trabajos: los cuatro casos primero, luego el resto. El Marketplace, delivery y suite, con su estado.

### Fase 3 — Resto de páginas
- [ ] Nosotros: el porqué (`about.whoP1`), ficha "Quién está detrás de BKLN" con foto pequeña y "Fundador". Fuera "35+" y "3 países" (también en `about.metaDescription` y `about.confidentialText`). Textos en `CV/busqueda-empleo/09-textos-github-y-web.md`.
- [ ] Servicios (listado y detalle): "ERP con Odoo", lenguaje para cualquier organización.
- [ ] Contacto, guías (blog), cursos y páginas legales con el lenguaje visual v3.
- [ ] Revisar `meta.siteDescription`, `keywords` y los textos de OG en los tres idiomas (que no digan "35+").

### Fase 4 — Revisión y publicación
- [ ] Revisión de los tres idiomas, el SEO (canonical, hreflang, sitemap) y la accesibilidad.
- [ ] Mike lo revisa en su móvil con un enlace de previsualización de Vercel. Antes hay que subir la rama, con su permiso.
- [ ] Producción solo con su aprobación.

## Pendientes de Mike
1. **¿Se cobra ya con tarjeta en WallBlue?** El caso actual dice que el flujo EMV está "preparado" y que la autorización bancaria real necesita adquirente, claves y certificación. Si es así, la ilustración ("Pago aprobado") y el texto ("en efectivo o con tarjeta") exageran. Hay que cambiarlos a "preparado para tarjetas sin contacto".
2. **El LinkedIn del fundador tiene dos URL:** `data/contact.ts` usa `linkedin.com/in/leoncio-felipe-mitogo-edjang-obono-362627420` y la ficha del CV usa `linkedin.com/in/leonciomitogoedjang`. ¿Cuál es la buena?
3. ¿Existe la página de empresa en LinkedIn (`bkln-software-systems`) y tiene contenido? ¿Y la cuenta de X `@bklnsoftware`? (X se ha quitado del pie).
4. ¿Con qué cargo figura Mike en el registro de la empresa? Es el que va en los contratos.

## Notas técnicas
- En `next dev`, las clases nuevas de Tailwind a veces no se regeneran y la página se ve sin ellas. Para comprobar el aspecto real: `next build && next start`.
- La sección `home` de los diccionarios conserva las claves `demo*` de la demo sin conexión hasta llevarla al caso de WallBlue (fase 2).
