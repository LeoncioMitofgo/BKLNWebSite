import type { NavLink } from '@/types'

export const navLinks: NavLink[] = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/portfolio' },
  { label: 'Productos', href: '/productos' },
  { label: 'Guías', href: '/blog' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Nosotros', href: '/nosotros' },
]

export const footerLinks: NavLink[] = [...navLinks, { label: 'Contacto', href: '/contacto' }]
