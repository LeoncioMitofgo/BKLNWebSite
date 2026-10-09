import ReactMarkdown from 'react-markdown'
import type { Locale } from '@/i18n/config'
import { localizePath } from '@/i18n/routes'

interface Props {
  content: string
  lang: Locale
}

// Componente de servidor: react-markdown no llega al navegador.
export function MarkdownContent({ content, lang }: Props) {
  return (
    <ReactMarkdown
      components={{
        // Los artículos enlazan con rutas internas en español ('/blog/...'): llevarlas a la versión del idioma.
        a: ({ href, children }) => {
          if (href?.startsWith('/')) return <a href={localizePath(lang, href)}>{children}</a>
          if (href?.startsWith('http')) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          }
          return <a href={href}>{children}</a>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
