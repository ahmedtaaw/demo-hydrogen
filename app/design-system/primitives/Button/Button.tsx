import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/utils'

type ButtonVariant = 'primary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  /** Swaps the label for a spinner and blocks interaction. */
  loading?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsButton = ButtonBaseProps & { as?: 'button' } & Omit<
    ComponentPropsWithoutRef<'button'>,
    keyof ButtonBaseProps
  >

type ButtonAsAnchor = ButtonBaseProps & { as: 'a' } & Omit<
    ComponentPropsWithoutRef<'a'>,
    keyof ButtonBaseProps
  >

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'rounded-full bg-brand-primary text-text-on-primary hover:bg-brand-primary-hover',
  ghost: 'rounded-full border-2 border-brand-primary text-text-brand hover:bg-brand-primary-subtle',
  link: 'text-text-brand underline-offset-2 hover:underline',
}

const paddedSizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-caption',
  md: 'px-6 py-3 text-heading-3',
  lg: 'px-8 py-4 text-heading-3',
}

const linkSizeClasses: Record<ButtonSize, string> = {
  sm: 'text-caption',
  md: 'text-heading-3',
  lg: 'text-heading-3',
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  )
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    className,
    children,
    as = 'button',
    ...rest
  } = props

  const classes = cn(
    base,
    variant === 'link' ? linkSizeClasses[size] : paddedSizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    className,
  )

  const content = loading ? (
    <>
      <Spinner />
      <span className="sr-only">{children}</span>
    </>
  ) : (
    children
  )

  if (as === 'a') {
    const anchorProps = rest as Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonBaseProps>
    return (
      <a
        className={classes}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  const buttonProps = rest as Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps>
  return (
    <button
      className={classes}
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      disabled={buttonProps.disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  )
}
