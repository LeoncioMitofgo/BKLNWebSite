'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface BuyButtonProps {
  productId: string
}

export function BuyButton({ productId }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleClick() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'No se pudo iniciar el pago')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar el pago')
      setLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? 'Redirigiendo...' : 'Comprar ahora'}
      </Button>
      {error && <p className="text-error text-xs mt-2 max-w-xs">{error}</p>}
    </div>
  )
}
