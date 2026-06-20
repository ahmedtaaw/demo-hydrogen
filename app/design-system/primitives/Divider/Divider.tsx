import { cn } from '@/utils'

type DividerSpacing = 'sm' | 'md'

export type DividerProps = {
  /** When set, renders an uppercase section label beside the rule. */
  label?: string | null
  spacing?: DividerSpacing
  className?: string
}

const spacingClasses: Record<DividerSpacing, string> = {
  sm: 'my-2',
  md: 'my-4',
}

export function Divider({ label = null, spacing = 'md', className }: DividerProps) {
  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label={label}
        className={cn('flex items-center gap-3', spacingClasses[spacing], className)}
      >
        <span className="text-label-upper uppercase text-text-secondary">{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-border-subtle" />
      </div>
    )
  }

  return (
    <hr className={cn('border-0 border-t border-border-subtle', spacingClasses[spacing], className)} />
  )
}
