import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/utils'

type CardVariant = 'default' | 'selected'
type CardPadding = 'none' | 'sm' | 'md'

export type CardProps = {
  variant?: CardVariant
  padding?: CardPadding
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>

const variantClasses: Record<CardVariant, string> = {
  default: 'border border-border-default',
  selected: 'border-2 border-border-brand',
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
}

export function Card({ variant = 'default', padding = 'md', className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-surface-card shadow-card transition-colors',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
