import { type ReactNode, type SVGProps } from 'react'
import { cn } from '@/utils'

type IconSize = 'sm' | 'md' | 'lg'

export type IconProps = {
  size?: IconSize
  /** Accessible name. Leave null for purely decorative icons (hidden from AT). */
  label?: string | null
  className?: string
  /** SVG shapes (paths, etc.). Use `currentColor` so color follows text color. */
  children: ReactNode
} & Omit<SVGProps<SVGSVGElement>, 'className' | 'children'>

const sizeClasses: Record<IconSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export function Icon({
  size = 'md',
  label = null,
  className,
  children,
  viewBox = '0 0 24 24',
  ...rest
}: IconProps) {
  const a11y = label
    ? ({ role: 'img', 'aria-label': label } as const)
    : ({ 'aria-hidden': true } as const)

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={cn('inline-block shrink-0', sizeClasses[size], className)}
      {...a11y}
      {...rest}
    >
      {children}
    </svg>
  )
}
