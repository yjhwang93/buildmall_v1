'use client'

import { useState } from 'react'

interface ProductImageProps {
  src?: string
  alt: string
  fallback?: string
  className?: string
}

export function ProductImage({ src, alt, fallback = '📦', className = '' }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  if (!src || imageError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <span className="text-4xl">{fallback}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  )
}

