import { useState } from 'react'
import { cn } from '@/utils'

type ThumbnailSize = 'xs' | 'sm' | 'md' | 'lg'
type ThumbnailRatio = 'square' | 'portrait' | 'landscape'
type ThumbnailFit = 'contain' | 'cover'

export type ThumbnailProps = {
  src: string
  alt: string
  size?: ThumbnailSize
  ratio?: ThumbnailRatio
  objectFit?: ThumbnailFit
  className?: string
}

const sizeClasses: Record<ThumbnailSize, string> = {
  xs: 'w-8',
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-24',
}

const ratioClasses: Record<ThumbnailRatio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

const fitClasses: Record<ThumbnailFit, string> = {
  contain: 'object-contain',
  cover: 'object-cover',
}

export function Thumbnail({
  src,
  alt,
  size = 'md',
  ratio = 'square',
  objectFit = 'contain',
  className,
}: ThumbnailProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-sm bg-surface-card',
        sizeClasses[size],
        ratioClasses[ratio],
        className,
      )}
    >
      {/* On load failure, fall back to the empty surface box rather than a broken-image glyph. */}
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn('h-full w-full', fitClasses[objectFit])}
        />
      )}
    </div>
  )
}
