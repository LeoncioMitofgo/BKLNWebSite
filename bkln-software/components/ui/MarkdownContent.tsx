'use client'

import ReactMarkdown from 'react-markdown'

interface Props {
  content: string
}

export function MarkdownContent({ content }: Props) {
  return (
    <ReactMarkdown>{content}</ReactMarkdown>
  )
}
