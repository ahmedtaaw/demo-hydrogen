import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'
import { cn } from '@/utils'

type TextVariant =
  | 'display'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'label-upper'
  | 'body'
  | 'caption'
  | 'price'

type TextColor = 'primary' | 'secondary' | 'muted' | 'brand' | 'success' | 'error' | 'on-primary'

type TextOwnProps<E extends ElementType> = {
  /** Override the rendered element without changing the visual style. */
  as?: E
  variant?: TextVariant
  color?: TextColor
  strikethrough?: boolean
  truncate?: boolean
  className?: string
  children?: ReactNode
}

export type TextProps<E extends ElementType = 'p'> = TextOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof TextOwnProps<E>>

const variantClasses: Record<TextVariant, string> = {
  display: 'text-display',
  'heading-1': 'text-heading-1',
  'heading-2': 'text-heading-2',
  'heading-3': 'text-heading-3',
  'label-upper': 'text-label-upper uppercase',
  body: 'text-body',
  caption: 'text-caption',
  price: 'text-price',
}

const colorClasses: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  brand: 'text-text-brand',
  success: 'text-success',
  error: 'text-error',
  'on-primary': 'text-text-on-primary',
}

const defaultElement: Record<TextVariant, ElementType> = {
  display: 'h1',
  'heading-1': 'h2',
  'heading-2': 'h3',
  'heading-3': 'h4',
  'label-upper': 'span',
  body: 'p',
  caption: 'span',
  price: 'span',
}

export function Text<E extends ElementType = 'p'>({
  as,
  variant = 'body',
  color = 'primary',
  strikethrough = false,
  truncate = false,
  className,
  children,
  ...rest
}: TextProps<E>) {
  const Component = (as ?? defaultElement[variant]) as ElementType

  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        strikethrough && 'line-through',
        truncate && 'truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
