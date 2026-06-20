import { useId } from 'react'
import { Text } from '@/design-system/primitives'
import { cn } from '@/utils'

export type SelectorOption = {
  label: string
  /** Optional swatch color (data-driven hex/css color), rendered as a dot. */
  color?: string
  disabled?: boolean
}

export type OptionSelectorProps = {
  options: SelectorOption[]
  value: string
  onChange: (label: string) => void
  /** Accessible group name (visually hidden). */
  label?: string | null
  className?: string
}

export function OptionSelector({
  options,
  value,
  onChange,
  label = null,
  className,
}: OptionSelectorProps) {
  const groupName = useId()

  return (
    <div
      role="radiogroup"
      aria-label={label ?? undefined}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {options.map((option) => {
        const selected = option.label === value

        return (
          <label
            key={option.label}
            className={cn(
              'inline-flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 transition-colors',
              'focus-within:ring-2 focus-within:ring-brand-primary',
              selected
                ? 'border-2 border-border-brand bg-brand-primary-subtle'
                : 'border border-border-subtle',
              option.disabled && 'cursor-not-allowed opacity-40',
            )}
          >
            <input
              type="radio"
              name={groupName}
              value={option.label}
              checked={selected}
              disabled={option.disabled}
              onChange={() => onChange(option.label)}
              className="sr-only"
            />
            {option.color && (
              <span
                aria-hidden="true"
                className="size-3 rounded-full border border-border-subtle"
                style={{ backgroundColor: option.color }}
              />
            )}
            <Text as="span" variant="body">
              {option.label}
            </Text>
          </label>
        )
      })}
    </div>
  )
}
