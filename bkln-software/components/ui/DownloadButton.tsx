'use client'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DownloadButtonProps {
  slug: string
  fileUrl: string
}

export function DownloadButton({ slug, fileUrl }: DownloadButtonProps) {
  function handleDownload() {
    fetch(`/api/download/${slug}`, { method: 'POST' }).catch(() => {})
    window.open(fileUrl, '_blank')
  }

  return (
    <Button size="lg" className="w-full gap-2" onClick={handleDownload}>
      <Download size={16} /> Descargar gratis
    </Button>
  )
}
