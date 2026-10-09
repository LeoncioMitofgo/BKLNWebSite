import { notFound } from 'next/navigation'

// Dinámica a propósito: así no se guarda en caché una página por cada dirección inventada
// (bots que prueban /wp-admin y similares).
export const dynamic = 'force-dynamic'

// Cualquier dirección sin página dentro de un idioma: 404 con el diseño y el idioma de la web.
export default function CatchAll() {
  notFound()
}
