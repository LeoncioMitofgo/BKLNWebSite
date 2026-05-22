'use client'
import { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
  tag?: string
}

function nextDelay(char: string, prevChar: string): number {
  // Long pause after sentence-ending punctuation
  if ('.—'.includes(prevChar)) return 320 + Math.random() * 180
  // Medium pause after comma
  if (prevChar === ',') return 160 + Math.random() * 80
  // Slight pause before capital (new word after pause)
  if (char === char.toUpperCase() && char !== char.toLowerCase() && Math.random() < 0.3) return 120 + Math.random() * 60
  // Occasional random micro-hesitation
  if (Math.random() < 0.07) return 180 + Math.random() * 140
  // Normal keystroke: variable between 55–130ms
  return 55 + Math.random() * 75
}

export function TypewriterText({ text, delay = 600, className, tag }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      return
    }

    function typeNext() {
      const i = indexRef.current
      if (i >= text.length) {
        setDone(true)
        return
      }
      indexRef.current += 1
      setDisplayed(text.slice(0, indexRef.current))
      const wait = nextDelay(text[i], i > 0 ? text[i - 1] : '')
      timeoutRef.current = setTimeout(typeNext, wait)
    }

    timeoutRef.current = setTimeout(typeNext, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, delay])

  return (
    <span className={className}>
      {tag && (
        <span className="text-accent-blue opacity-70">&lt;{tag}&gt;</span>
      )}
      {displayed}
      <span className={`inline-block w-[2px] h-[0.85em] bg-current align-middle ml-[2px] ${done ? 'cursor-blink' : 'opacity-100'}`} />
      {tag && done && (
        <span className="text-accent-blue opacity-70">&lt;/{tag}&gt;</span>
      )}
    </span>
  )
}
