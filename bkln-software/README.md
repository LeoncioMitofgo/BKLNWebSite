# BKLN Software & Systems

Web completa para la empresa de software BKLN Software & Systems. Incluye servicios de desarrollo, productos propios, cursos, portfolio y blog.

## Stack tecnológico

- **Framework:** Next.js 16 con App Router
- **Styling:** Tailwind CSS v4
- **Base de datos:** Supabase
- **Email:** Resend (formulario de contacto)
- **Lenguaje:** TypeScript
- **Iconos:** Lucide React
- **Deploy:** Vercel (+ Vercel Web Analytics)

## Estructura del proyecto

```
bkln-software/
├── app/
│   ├── (main)/          # Páginas públicas con Navbar/Footer
│   │   ├── page.tsx     # Home
│   │   ├── servicios/[slug]/
│   │   ├── productos/[slug]/
│   │   ├── cursos/[slug]/
│   │   ├── portfolio/[slug]/
│   │   ├── blog/[slug]/
│   │   ├── contacto/
│   │   ├── privacidad/
│   │   └── terminos/
│   ├── api/contact/     # Envío del formulario de contacto
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/              # Button, Badge, SectionHeader...
│   └── sections/        # Navbar, Footer, cards, ChatWidget...
├── data/                # content.ts (servicios, productos, cursos, proyectos, blog), nav, anuncio
├── lib/                 # supabase.ts, utils.ts
├── public/libro*/       # Libros interactivos de los cursos
└── types/index.ts
```

## Instalación

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio de Supabase (solo servidor) |
| `RESEND_API_KEY` | API key de Resend — sin ella el formulario de contacto no envía |
| `EMAIL_FROM` | Remitente; debe ser de un dominio verificado en Resend |
| `NEXT_PUBLIC_APP_URL` | URL base exacta del sitio (en producción `https://www.bklnsoftware.tech`) |

## Scripts

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

---

**BKLN Software & Systems** — Code. Create. Educate.
