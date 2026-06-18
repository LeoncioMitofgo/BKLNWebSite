import { Mail, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Solicita un presupuesto o consulta gratuita para tu proyecto de software.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Hablemos de tu <span className="text-accent-green">proyecto</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Cuéntanos qué necesitas y te enviamos una propuesta detallada sin compromiso.
          </p>
        </div>
      </section>

      {/* Formulario + Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Info de contacto */}
            <div className="space-y-5">
              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand-green/15 rounded-md flex items-center justify-center">
                    <Mail size={16} className="text-accent-green" />
                  </div>
                  <h3 className="text-text-primary font-semibold text-sm">Email directo</h3>
                </div>
                <a
                  href="mailto:hello@bklnsoftware.com"
                  className="text-accent-green hover:underline text-sm"
                >
                  hello@bklnsoftware.com
                </a>
              </div>

              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand-green/15 rounded-md flex items-center justify-center">
                    <MessageCircle size={16} className="text-accent-green" />
                  </div>
                  <h3 className="text-text-primary font-semibold text-sm">WhatsApp</h3>
                </div>
                <a
                  href="https://wa.me/240222798086"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-green hover:underline text-sm"
                >
                  Escribir por WhatsApp
                </a>
                <p className="text-text-secondary text-xs mt-1">Para consultas rápidas</p>
              </div>

              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand-green/15 rounded-md flex items-center justify-center">
                    <Clock size={16} className="text-accent-green" />
                  </div>
                  <h3 className="text-text-primary font-semibold text-sm">Tiempo de respuesta</h3>
                </div>
                <p className="text-text-secondary text-sm">Menos de 24 horas hábiles</p>
              </div>

              {/* Disponibilidad */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
                  <span className="text-success font-semibold text-sm">Disponible</span>
                </div>
                <p className="text-text-secondary text-sm">
                  Actualmente aceptando nuevos proyectos. ¡Contáctanos hoy!
                </p>
              </div>

              {/* Qué esperar */}
              <div className="bg-bg-surface border border-white/5 rounded-lg p-5">
                <h3 className="text-text-primary font-semibold text-sm mb-3">Qué esperar</h3>
                <ul className="space-y-2">
                  {[
                    'Respuesta en menos de 24h',
                    'Propuesta técnica detallada',
                    'Presupuesto sin letra pequeña',
                    'Sin compromiso de contratación',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle size={13} className="text-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
