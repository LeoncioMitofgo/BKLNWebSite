'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Hace aparecer los elementos con `data-reveal` al entrar en pantalla.
 * Solo oculta los que todavía están por debajo: lo visible al cargar nunca parpadea,
 * y sin JavaScript todo se ve normal.
 */
export function RevealOnScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add('r-in')
          el.classList.remove('r-pending')
          io.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll<HTMLElement>('[data-reveal]:not(.r-in)').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return
      const delay = Number(el.dataset.reveal) || 0
      if (delay) el.style.transitionDelay = `${delay * 0.1}s`
      el.classList.add('r-pending')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])

  return null
}
