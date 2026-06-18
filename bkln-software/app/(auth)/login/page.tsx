'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const inputClass =
  'w-full bg-bg-surface border border-white/10 rounded-md px-4 py-2.5 text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: implementar con Supabase Auth
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-bg-surface border border-white/5 rounded-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-green font-bold text-lg">B</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Iniciar sesión</h1>
          <p className="text-text-secondary text-sm mt-1">Accede a tus cursos y compras</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-1.5">Email</label>
            <input
              type="email"
              required
              className={inputClass}
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              className={inputClass}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Iniciando sesión...' : (
              <><LogIn size={16} /> Iniciar sesión</>
            )}
          </Button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-5">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-accent-green hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
