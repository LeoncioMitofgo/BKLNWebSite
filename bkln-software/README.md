# BKLN Software & Systems

Web completa para la empresa de software BKLN Software & Systems. Ecosistema tecnológico que incluye servicios de desarrollo, tienda de productos digitales, plataforma de cursos, portfolio y blog técnico.

## Stack tecnológico

- **Framework:** Next.js 16 con App Router
- **Styling:** Tailwind CSS v4
- **Base de datos:** Supabase (auth + database + storage)
- **Pagos:** Stripe
- **Lenguaje:** TypeScript
- **Iconos:** Lucide React
- **Deploy:** Vercel

## Estructura del proyecto

```
bkln-software/
├── app/
│   ├── (main)/          # Páginas públicas con Navbar/Footer
│   │   ├── page.tsx     # Home
│   │   ├── servicios/
│   │   ├── productos/[slug]/
│   │   ├── cursos/[slug]/
│   │   ├── portfolio/[slug]/
│   │   ├── blog/[slug]/
│   │   └── contacto/
│   ├── (auth)/          # Login y registro
│   ├── dashboard/       # Panel del usuario autenticado
│   ├── api/
│   │   ├── contact/     # Envío de formulario de contacto
│   │   └── stripe/webhook/
│   └── sitemap.ts
├── components/
│   ├── ui/              # Button, Badge, SectionHeader
│   └── sections/        # Navbar, Footer, cards...
├── data/seed.ts         # Datos de ejemplo
├── lib/                 # supabase.ts, stripe.ts, utils.ts
└── types/index.ts
```

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio de Supabase |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook de Stripe |
| `RESEND_API_KEY` | API key de Resend para emails |
| `EMAIL_FROM` | Email de envío |
| `NEXT_PUBLIC_APP_URL` | URL base de la app |

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000).

## Configuración de Supabase

```sql
create table user_courses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  purchased_at timestamptz default now(),
  progress integer default 0,
  unique(user_id, course_id)
);

create table user_products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  product_id text not null,
  purchased_at timestamptz default now(),
  unique(user_id, product_id)
);

alter table user_courses enable row level security;
alter table user_products enable row level security;

create policy "Users can view own courses" on user_courses for select using (auth.uid() = user_id);
create policy "Users can view own products" on user_products for select using (auth.uid() = user_id);
```

## Stripe Webhooks (desarrollo)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Deploy en Vercel

1. Conecta el repositorio a Vercel
2. Añade todas las variables de entorno
3. Configura el webhook de Stripe con la URL de producción

## Scripts

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

---

**BKLN Software & Systems** — Code. Create. Educate.
