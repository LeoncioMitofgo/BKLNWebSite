import type { NavLink } from '@/types'

export const navLinks: NavLink[] = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Productos', href: '/productos' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Proyectos', href: '/portfolio' },
  { label: 'Guías', href: '/blog' },
]

export const footerLinks: NavLink[] = [...navLinks, { label: 'Contacto', href: '/contacto' }]
