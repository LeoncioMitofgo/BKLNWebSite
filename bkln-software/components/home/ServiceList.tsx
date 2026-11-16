'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ServiceListItem {
  href: string
  title: string
  description: string
  image?: string
}

/** Lista tipográfica de servicios. Con ratón, al pasar por uno aparece al lado una captura de su trabajo. */
export function ServiceList({ items }: { items: ServiceListItem[] }) {
  const [active, setActive] = useState<string | null>(null)
  const [fine, setFine] = useState(false)
  const peek = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!fine) return
    const move = (e: MouseEvent) => {
      if (peek.current) peek.current.style.translate = `${e.clientX + 28}px calc(${e.clientY}px - 50%)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [fine])

  return (
    <>
      <ul className="border-t border-white/10">
        {items.map((item) => (
          <li key={item.href} className="border-b border-white/10" data-reveal>
            <Link
              href={item.href}
              onMouseEnter={() => setActive(item.image ?? null)}
              onMouseLeave={() => setActive(null)}
              className="group grid grid-cols-1 gap-1.5 py-6 transition-[padding,color] duration-500 ease-out-soft md:grid-cols-[1.4fr_1fr] md:items-center md:gap-6 md:py-8 hover:text-accent-green md:hover:pl-4"
            >
              <span className="font-display text-[30px] font-bold leading-[1.05] tracking-[-0.025em] md:text-[clamp(32px,3.6vw,52px)]">{item.title}</span>
              <span className="text-[15px] text-text-secondary transition-colors group-hover:text-text-primary md:text-base">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      {fine && (
        <div
          ref={peek}
          aria-hidden="true"
          className={cn(
            'pointer-events-none fixed left-0 top-0 z-30 aspect-[5/3] w-[320px] overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-[opacity,scale] duration-300',
            active ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          )}
        >
          {active && <Image src={active} alt="" fill sizes="320px" className="object-cover" />}
        </div>
      )}
    </>
  )
}
