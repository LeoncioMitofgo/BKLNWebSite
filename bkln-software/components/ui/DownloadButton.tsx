'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DownloadButtonProps {
  product: {
    slug: string
    fileUrl: string
  }
}

export function DownloadButton({ product }: DownloadButtonProps) {
  function handleDownload() {
    fetch(`/api/download/${product.slug}`, { method: 'POST' }).catch(() => {})
    window.open(product.fileUrl, '_blank')
  }

  return (
    <Button size="lg" className="w-full gap-2" onClick={handleDownload}>
      <Download size={16} /> Descargar gratis
    </Button>
  )
}