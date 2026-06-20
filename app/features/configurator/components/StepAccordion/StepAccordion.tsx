import { type ReactNode } from 'react'
import { Accordion, Button, Text } from '@/design-system'
import { cn } from '@/utils'

export interface StepAccordionProps {
  /** 1-based step position, shown as "Step {index} of {total}". */
  index: number
  total: number
  title: string
  /** Header icon asset (Figma export, served from public/). */
  icon: string
  /** Right-aligned slot in the header — e.g. "N selected". */
  trailing?: ReactNode
  isOpen: boolean
  onToggle: () => void
  /** Optional "Next: …" button rendered under the body. */
  nextLabel?: string
  onNext?: () => void
  children: ReactNode
}

/**
 * Shared chrome for a configurator step: the "Step X of Y" label, the accordion
 * header (icon + title + trailing slot), and an optional Next button. The body
 * (product grid, plan picker, …) is passed as children so each step type owns
 * only its content, not the chrome.
 */
export function StepAccordion({
  index,
  total,
  title,
  icon,
  trailing,
  isOpen,
  onToggle,
  nextLabel,
  onNext,
  children,
}: StepAccordionProps) {
  return (
    <section
      // The active (expanded) step is tinted bg-surface-page; collapsed steps stay
      // white. Single-open accordion means this highlight moves to the next step
      // automatically when the user advances.
      data-active={isOpen || undefined}
      className={cn(
        'transition-colors',
        isOpen ? 'bg-surface-page' : 'bg-surface-card',
      )}
    >
      <Text variant="label-upper" color="secondary" className="block px-6 pt-4">
        Step {index} of {total}
      </Text>
      <Accordion
        open={isOpen}
        onToggle={onToggle}
        leadingIcon={<img src={icon} alt="" aria-hidden className="size-6 shrink-0" />}
        heading={
          <Text as="span" variant="heading-2">
            {title}
          </Text>
        }
        trailingContent={trailing ?? null}
      >
        {children}
        {nextLabel && (
          <Button variant="ghost" fullWidth className="mt-6" onClick={onNext}>
            {nextLabel}
          </Button>
        )}
      </Accordion>
    </section>
  )
}
