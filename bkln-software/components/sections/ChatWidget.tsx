'use client'

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Bot, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/data/contact'
import type { Dictionary } from '@/i18n/dictionaries'

type Message = {
    id: string
    text: string
    sender: 'user' | 'assistant'
    sources?: string[]
}

const STORAGE_KEY = 'bkln_chat_session_id'
// La burbuja de presentación sale una vez por visita (pestaña).
const TEASER_KEY = 'bkln_chat_teaser_seen'
const TEASER_DELAY_MS = 4000
// Mensajes previos que se envían con cada pregunta para que el asistente recuerde la conversación.
const HISTORY_LIMIT = 8
const LOCAL_MESSAGE_IDS = new Set(['welcome'])

// Un id por pestaña, creado al enviar el primer mensaje (sessionStorage puede fallar en modo privado).
function getSessionId(): string {
    const generate = () => `bkln-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    try {
        const existing = window.sessionStorage.getItem(STORAGE_KEY)
        if (existing) return existing
        const created = generate()
        window.sessionStorage.setItem(STORAGE_KEY, created)
        return created
    } catch {
        return generate()
    }
}

function messageId(prefix: string): string {
    return `${prefix}-${Date.now()}`
}

function teaserSeen(): boolean {
    try {
        return window.sessionStorage.getItem(TEASER_KEY) === '1'
    } catch {
        return false
    }
}

function markTeaserSeen() {
    try {
        window.sessionStorage.setItem(TEASER_KEY, '1')
    } catch {
        // Sin almacenamiento: la burbuja podría volver a salir en otra página, sin más.
    }
}

/** Avatar del asistente con el punto verde de "en línea". */
function AssistantAvatar({ size = 'md' }: { size?: 'sm' | 'md' }) {
    const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
    const icon = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
    return (
        <span className={`relative flex ${box} flex-none items-center justify-center rounded-full bg-white text-brand-green`}>
            <Bot className={icon} aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-green ring-2 ring-bg-surface" />
            </span>
        </span>
    )
}

export default function ChatWidget({ t, whatsappMessage }: { t: Dictionary['chat']; whatsappMessage: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showTeaser, setShowTeaser] = useState(false)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: t.welcome,
            sender: 'assistant',
        },
    ])
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const hasConversation = messages.some((m) => m.sender === 'user')

    useEffect(() => {
        if (teaserSeen()) return
        const timer = window.setTimeout(() => setShowTeaser(true), TEASER_DELAY_MS)
        return () => window.clearTimeout(timer)
    }, [])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [isOpen])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    const dismissTeaser = () => {
        setShowTeaser(false)
        markTeaserSeen()
    }

    const openChat = () => {
        dismissTeaser()
        setIsOpen(true)
    }

    const sendMessage = async (text?: string) => {
        const trimmed = (text ?? input).trim()
        if (!trimmed || loading) return

        const userMessage: Message = {
            id: messageId('user'),
            text: trimmed,
            sender: 'user',
        }
        const history = messages
            .filter((m) => !LOCAL_MESSAGE_IDS.has(m.id) && !m.id.startsWith('error-'))
            .slice(-HISTORY_LIMIT)
            .map((m) => ({ role: m.sender, content: m.text }))

        setMessages((current) => [...current, userMessage])
        setInput('')
        setLoading(true)

        try {
            const response = await fetch('https://ai.bklnsoftware.tech/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: trimmed,
                    session_id: getSessionId(),
                    history,
                }),
            })

            if (!response.ok) {
                throw new Error('Request failed')
            }

            const data = (await response.json()) as {
                answer?: string
                sources?: string[]
            }

            const assistantMessage: Message = {
                id: messageId('assistant'),
                text: data.answer || t.noAnswer,
                sender: 'assistant',
                sources: Array.isArray(data.sources) ? data.sources : [],
            }

            setMessages((current) => [...current, assistantMessage])
        } catch {
            setMessages((current) => [
                ...current,
                {
                    id: messageId('error'),
                    text: t.error,
                    sender: 'assistant',
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    const askSuggestion = (question: string) => {
        openChat()
        void sendMessage(question)
    }

    const suggestionClass =
        'rounded-full border border-accent-green/30 bg-brand-green/10 px-3 py-1.5 text-left text-xs font-medium text-accent-green transition hover:border-accent-green/60 hover:bg-brand-green/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green'

    return (
        <>
            {showTeaser && !isOpen && (
                <div
                    role="dialog"
                    aria-label={t.teaserTitle}
                    className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[300px] rounded-2xl border border-white/10 bg-bg-surface p-4 text-text-primary shadow-2xl shadow-black/60"
                >
                    <button
                        type="button"
                        aria-label={t.teaserClose}
                        onClick={dismissTeaser}
                        className="absolute right-2 top-2 rounded-full p-1 text-white/50 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button type="button" onClick={openChat} className="flex items-center gap-3 pr-6 text-left">
                        <AssistantAvatar size="sm" />
                        <span className="text-sm font-semibold leading-snug">{t.teaserTitle}</span>
                    </button>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{t.teaserText}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {t.suggestions.map((question) => (
                            <button key={question} type="button" onClick={() => askSuggestion(question)} className={suggestionClass}>
                                {question}
                            </button>
                        ))}
                    </div>
                    {/* Pico que apunta al botón */}
                    <span aria-hidden="true" className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-bg-surface" />
                </div>
            )}

            <button
                type="button"
                aria-label={isOpen ? t.close : t.open}
                aria-expanded={isOpen}
                onClick={() => (isOpen ? setIsOpen(false) : openChat())}
                className={`fixed bottom-4 right-4 z-50 flex items-center rounded-full bg-brand-green text-white shadow-lg shadow-black/40 ring-1 ring-white/10 transition hover:bg-[#00b862] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark ${isOpen ? 'h-14 w-14 justify-center' : 'gap-3 py-2 pl-2 pr-5'}`}
            >
                {isOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                    <>
                        <AssistantAvatar />
                        <span className="flex flex-col items-start text-left leading-tight">
                            <span className="text-sm font-semibold">{t.launcher}</span>
                            <span className="text-[11px] text-white/85">{t.launcherHint}</span>
                        </span>
                    </>
                )}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-4 z-40 flex w-[calc(100vw-2rem)] max-w-[370px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-dark text-text-primary shadow-2xl shadow-black/60 sm:w-[370px]">
                    <div className="flex items-center gap-3 border-b border-white/10 bg-bg-surface px-4 py-3">
                        <AssistantAvatar size="sm" />
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white">{t.title}</p>
                            <p className="truncate text-xs text-accent-green">{t.status}</p>
                        </div>
                        <button
                            type="button"
                            aria-label={t.close}
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="flex h-[min(520px,calc(100dvh-9rem))] flex-col">
                        <div className="flex-1 space-y-3 overflow-y-auto p-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.sender === 'user'
                                            ? 'bg-brand-green text-white'
                                            : 'border border-white/5 bg-white/[0.06] text-slate-100'
                                            }`}
                                    >
                                        <div className="markdown-content whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ node, ...props }) => (
                                                        <a {...props} target="_blank" rel="noreferrer" className="font-medium text-green-300 underline decoration-green-400/70 underline-offset-2 hover:text-green-200" />
                                                    ),
                                                    p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                                                    ul: ({ node, ...props }) => <ul {...props} className="mb-2 list-disc space-y-1 pl-5" />,
                                                    ol: ({ node, ...props }) => <ol {...props} className="mb-2 list-decimal space-y-1 pl-5" />,
                                                    li: ({ node, ...props }) => <li {...props} className="pl-1" />,
                                                    strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-white" />,
                                                    em: ({ node, ...props }) => <em {...props} className="italic text-slate-200" />,
                                                    code: ({ node, ...props }) => <code {...props} className="rounded bg-slate-700/80 px-1 py-0.5 text-[0.8em] text-green-200" />,
                                                }}
                                            >
                                                {message.text}
                                            </ReactMarkdown>
                                        </div>

                                        {message.sources && message.sources.length > 0 && (
                                            <div className="mt-2 border-t border-white/10 pt-2">
                                                <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
                                                    {t.sources}
                                                </p>
                                                <ul className="space-y-1 text-xs text-slate-200">
                                                    {[...new Set(message.sources)].map((source, index) => (
                                                        <li key={`${source}-${index}`}>
                                                            {source.startsWith('http://') || source.startsWith('https://') ? (
                                                                <a href={source} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-white">
                                                                    {source}
                                                                </a>
                                                            ) : (
                                                                <span>{source}</span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {!hasConversation && !loading && (
                                <div className="pt-1">
                                    <p className="mb-2 text-xs text-white/50">{t.suggestionsLabel}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {t.suggestions.map((question) => (
                                            <button key={question} type="button" onClick={() => void sendMessage(question)} className={suggestionClass}>
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="rounded-2xl border border-white/5 bg-white/[0.06] px-3 py-2 text-sm text-slate-100">
                                        <div className="flex items-center gap-2">
                                            <span>{t.thinking}</span>
                                            <span className="flex gap-1">
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-accent-green [animation-delay:-0.3s]" />
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-accent-green [animation-delay:-0.15s]" />
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-accent-green" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-white/10 bg-bg-surface p-3">
                            <div className="flex gap-2">
                                <input
                                    aria-label={t.inputLabel}
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' && !event.shiftKey) {
                                            event.preventDefault()
                                            void sendMessage()
                                        }
                                    }}
                                    placeholder={t.placeholder}
                                    className="flex-1 rounded-xl border border-white/10 bg-bg-dark px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/40"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    aria-label={t.sendLabel}
                                    onClick={() => void sendMessage()}
                                    disabled={loading || !input.trim()}
                                    className="rounded-xl bg-brand-green px-3 py-2 text-sm font-medium text-white transition hover:bg-[#00b862] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
                                >
                                    {t.send}
                                </button>
                            </div>
                            <p className="mt-2 text-[11px] text-white/45">{t.notice}</p>
                            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] text-white/60">
                                <span>{t.human}</span>
                                <a
                                    href={waLink(whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-medium text-[#25D366] hover:underline"
                                >
                                    <WhatsAppIcon size={12} />
                                    {t.humanLink}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
