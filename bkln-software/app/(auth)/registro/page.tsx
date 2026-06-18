'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const inputClass =
  'w-full bg-bg-surface border border-white/10 rounded-md px-4 py-2.5 text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors'

export default function RegistroPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
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
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-green font-bold text-lg">B</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Crear cuenta</h1>
          <p className="text-text-secondary text-sm mt-1">Accede a cursos y descarga productos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-1.5">Nombre</label>
            <input
              type="text"
              required
              className={inputClass}
              placeholder="Tu nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1.5">Email</label>
            <input
              type="email"
              required
              className={inputClass}
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              minLength={8}
              className={inputClass}
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Creando cuenta...' : (
              <><UserPlus size={16} /> Crear cuenta</>
            )}
          </Button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-5">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-accent-green hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
