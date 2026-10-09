import Link from 'next/link'
import type { ReactNode } from 'react'
import { contactEmail } from '@/data/contact'

interface LegalLayoutProps {
  title: string
  updated: string
  links: { href: string; label: string }[]
  children: ReactNode
}

/** Marco común de las páginas legales; el texto de cada idioma va en components/legal/<página>/<idioma>.tsx. */
export function LegalLayout({ title, updated, links, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{title}</h1>
          <p className="text-text-secondary text-sm">{updated}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
          {children}

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-accent-green hover:underline text-sm">
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
      <h2 className="text-text-primary font-semibold text-lg">{title}</h2>
      {children}
    </section>
  )
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc list-inside space-y-1.5 ml-2">{children}</ul>
}

export function B({ children }: { children: ReactNode }) {
  return <strong className="text-text-primary">{children}</strong>
}

export function EmailLink() {
  return (
    <a href={`mailto:${contactEmail}`} className="text-accent-green hover:underline">
      {contactEmail}
    </a>
  )
}
