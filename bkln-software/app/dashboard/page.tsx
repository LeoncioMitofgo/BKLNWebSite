import Link from 'next/link'
import { BookOpen, Download, User } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Mi Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-bg-surface border border-white/5 rounded-lg p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-blue/15 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-accent-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">0</p>
              <p className="text-text-secondary text-sm">Cursos comprados</p>
            </div>
          </div>
          <div className="bg-bg-surface border border-white/5 rounded-lg p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-blue/15 rounded-lg flex items-center justify-center">
              <Download size={20} className="text-accent-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">0</p>
              <p className="text-text-secondary text-sm">Productos descargados</p>
            </div>
          </div>
          <div className="bg-bg-surface border border-white/5 rounded-lg p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-blue/15 rounded-lg flex items-center justify-center">
              <User size={20} className="text-accent-blue" />
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">Mi cuenta</p>
              <p className="text-text-secondary text-xs">Gestionar perfil</p>
            </div>
          </div>
        </div>

        {/* Mis cursos */}
        <div className="bg-bg-surface border border-white/5 rounded-lg p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">Mis cursos</h2>
          <div className="text-center py-10 text-text-secondary">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>Aún no tienes cursos. Visita nuestra tienda.</p>
            <Link href="/cursos" className="inline-block mt-4">
              <span className="text-accent-blue hover:underline text-sm">Ver cursos disponibles →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
