import { Text } from '@/design-system/primitives'
import { cn } from '@/utils'

type StepperSize = 'sm' | 'md'

export type QuantityStepperProps = {
  value: number
  min?: number
  max?: number | null
  size?: StepperSize
  disabled?: boolean
  onChange: (next: number) => void
}

const buttonSizeClasses: Record<StepperSize, string> = {
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
}

// Owns its own <button> controls intentionally — coupling to the Button primitive
// would leak Button's API (loading, `as`, …) into a borderless tap target.
const controlClasses =
  'cursor-pointer text-text-secondary transition-colors enabled:hover:text-text-primary disabled:cursor-not-allowed disabled:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset'

export function QuantityStepper({
  value,
  min = 0,
  max = null,
  size = 'md',
  disabled = false,
  onChange,
}: QuantityStepperProps) {
  const atMin = value <= min
  const atMax = max != null && value >= max

  return (
    <div className="inline-flex items-center rounded-sm border border-border-subtle">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || atMin}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(controlClasses, buttonSizeClasses[size])}
      >
        <span aria-hidden="true">−</span>
      </button>
      <Text as="span" variant="body" aria-live="polite" className="min-w-8 text-center tabular-nums">
        {value}
      </Text>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || atMax}
        onClick={() => onChange(max != null ? Math.min(max, value + 1) : value + 1)}
        className={cn(controlClasses, buttonSizeClasses[size])}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  )
}
