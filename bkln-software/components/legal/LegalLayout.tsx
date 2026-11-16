import Link from 'next/link'
import type { ReactNode } from 'react'
import { contactEmail } from '@/data/contact'

interface LegalLayoutProps {
  title: string
  updated: string
  links: { href: string; label: string }[]
  children: ReactNode
}

/** Marco común de las páginas legales (sobre papel, para leer); el texto de cada idioma va en components/legal/<página>/<idioma>.tsx. */
export function LegalLayout({ title, updated, links, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-paper pb-24 text-paper-ink">
      <div className="mx-auto max-w-[760px] px-5 pt-36 sm:px-7 sm:pt-44">
        <div className="mb-14">
          <h1 className="mb-4 font-display text-[clamp(42px,6vw,72px)] font-extrabold leading-none tracking-[-0.03em]">{title}</h1>
          <p className="text-sm text-paper-muted">{updated}</p>
        </div>

        <div className="space-y-10 text-[17px] leading-relaxed text-[#2d322e]">
          {children}

          <div className="flex flex-col gap-3 border-t border-paper-line pt-8 sm:flex-row sm:gap-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="font-semibold text-paper-green hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-[24px] font-bold tracking-[-0.01em] text-paper-ink">{title}</h2>
      {children}
    </section>
  )
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="ml-2 list-inside list-disc space-y-1.5 marker:text-paper-green">{children}</ul>
}

export function B({ children }: { children: ReactNode }) {
  return <strong className="text-paper-ink">{children}</strong>
}

export function EmailLink() {
  return (
    <a href={`mailto:${contactEmail}`} className="font-semibold text-paper-green hover:underline">
      {contactEmail}
    </a>
  )
}
