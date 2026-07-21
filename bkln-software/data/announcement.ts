export interface Announcement {
  label: string
  title: string
  href: string
  /** ISO date (YYYY-MM-DD). Si se pasa esta fecha, el banner deja de mostrarse solo. */
  expiresAt?: string
}

/**
 * Un solo aviso a la vez — no un carrusel. Cambia estos valores cuando haya
 * algo nuevo que destacar (curso, producto, proyecto, evento...).
 * Pon `announcement` en `null` para ocultarlo sin borrar el archivo.
 */
export const announcement: Announcement | null = {
  label: 'Nuevo curso gratis',
  title: 'AZ-1900 · Microsoft Azure Fundamentals ya disponible',
  href: '/cursos/az-900-azure-fundamentals',
  expiresAt: '2026-09-30',
}
