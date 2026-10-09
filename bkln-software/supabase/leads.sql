-- Tabla de solicitudes del formulario de contacto.
-- Ejecutar una vez en Supabase → SQL Editor (proyecto de la web, no el del chat).
-- Solo el servidor (service role) lee y escribe: RLS activado y sin políticas,
-- así que la clave pública (anon) no puede ver ni insertar nada.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) <= 120),
  email text not null check (char_length(email) <= 200),
  whatsapp text check (char_length(whatsapp) <= 30),
  company text check (char_length(company) <= 120),
  project_type text check (char_length(project_type) <= 60),
  product text check (char_length(product) <= 80),
  budget text check (char_length(budget) <= 60),
  description text not null check (char_length(description) <= 5000),
  source_path text check (char_length(source_path) <= 300),
  email_sent boolean not null default false
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;
