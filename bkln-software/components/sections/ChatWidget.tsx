'use client'

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Message = {
    id: string
    text: string
    sender: 'user' | 'assistant'
    sources?: string[]
    grounded?: boolean
}

const STORAGE_KEY = 'bkln_chat_session_id'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: '¡Hola! Soy el asistente virtual de BKLN Software & Systems. ¿En qué puedo ayudarte?',
            sender: 'assistant',
        },
        {
            id: 'notice',
            text: 'El asistente puede tardar unos segundos en responder.',
            sender: 'assistant',
        },
    ])
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const existing = window.sessionStorage.getItem(STORAGE_KEY)
        if (existing) {
            setSessionId(existing)
            return
        }

        const generated = `bkln-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
        window.sessionStorage.setItem(STORAGE_KEY, generated)
        setSessionId(generated)
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

    const sendMessage = async () => {
        const trimmed = input.trim()
        if (!trimmed || loading || !sessionId) return

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: trimmed,
            sender: 'user',
        }

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
                    session_id: sessionId,
                }),
            })

            if (!response.ok) {
                throw new Error('Request failed')
            }

            const data = (await response.json()) as {
                answer?: string
                sources?: string[]
                grounded?: boolean
            }

            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                text: data.answer || 'No tengo una respuesta disponible en este momento.',
                sender: 'assistant',
                sources: Array.isArray(data.sources) ? data.sources : [],
                grounded: typeof data.grounded === 'boolean' ? data.grounded : true,
            }

            setMessages((current) => [...current, assistantMessage])
        } catch (error) {
            setMessages((current) => [
                ...current,
                {
                    id: `error-${Date.now()}`,
                    text: 'No he podido responder ahora mismo. Inténtalo en unos segundos.',
                    sender: 'assistant',
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                aria-label="Abrir asistente de BKLN"
                onClick={() => setIsOpen((value) => !value)}
                className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-900/30 transition hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1220]"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
                    <path d="M6 18h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Zm0 0 1.5-3h9L18 18M8 9.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM9.5 13h5" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-4 z-40 w-[calc(100vw-1.5rem)] max-w-[360px] rounded-2xl border border-white/10 bg-[#0f172a] text-slate-100 shadow-2xl shadow-black/40 sm:w-[360px]">
                    <div className="flex items-center justify-between border-b border-white/10 bg-green-600 px-4 py-3 text-white">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide">Asistente BKLN</p>
                        </div>
                        <button
                            type="button"
                            aria-label="Cerrar asistente"
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1 text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                                <path d="M6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293Z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex h-[520px] flex-col">
                        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-950/30 p-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.sender === 'user'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-slate-800 text-slate-100'
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
                                                    Fuentes:
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

                                        {typeof message.grounded === 'boolean' && !message.grounded && (
                                            <p className="mt-2 text-[11px] text-slate-300">Sin información suficiente.</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="rounded-2xl bg-slate-800 px-3 py-2 text-sm text-slate-100">
                                        <div className="flex items-center gap-2">
                                            <span>Pensando</span>
                                            <span className="flex gap-1">
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-green-400 [animation-delay:-0.3s]" />
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-green-400 [animation-delay:-0.15s]" />
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-green-400" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-white/10 bg-slate-900 p-3">
                            <div className="flex gap-2">
                                <input
                                    aria-label="Escribe tu pregunta"
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' && !event.shiftKey) {
                                            event.preventDefault()
                                            void sendMessage()
                                        }
                                    }}
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                                    disabled={loading || !sessionId}
                                />
                                <button
                                    type="button"
                                    aria-label="Enviar pregunta"
                                    onClick={() => void sendMessage()}
                                    disabled={loading || !sessionId || !input.trim()}
                                    className="rounded-xl bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
