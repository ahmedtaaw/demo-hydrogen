import { type ReactNode } from 'react'
import { cn } from '@/utils'

type BadgeVariant = 'brand' | 'success' | 'neutral' | 'promo'
type BadgeShape = 'rounded' | 'pill'
type BadgeSize = 'sm' | 'md'

export type BadgeProps = {
  variant?: BadgeVariant
  /** Defaults to `pill` for the `promo` variant, otherwise `rounded`. */
  shape?: BadgeShape
  size?: BadgeSize
  className?: string
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  brand: 'bg-brand-primary text-text-on-primary',
  success: 'bg-success/15 text-success',
  neutral: 'bg-border-subtle text-text-secondary',
  promo: 'bg-brand-primary-subtle text-text-brand',
}

const shapeClasses: Record<BadgeShape, string> = {
  rounded: 'rounded-xs',
  pill: 'rounded-full',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-1',
  md: 'px-3 py-1',
}

export function Badge({ variant = 'neutral', shape, size = 'sm', className, children }: BadgeProps) {
  const resolvedShape = shape ?? (variant === 'promo' ? 'pill' : 'rounded')

  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap text-caption',
        variantClasses[variant],
        shapeClasses[resolvedShape],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
