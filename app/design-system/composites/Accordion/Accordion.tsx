import { type ReactNode, useId, useState } from 'react'
import { Icon } from '@/design-system/primitives'
import { cn } from '@/utils'

export type AccordionProps = {
  heading: ReactNode
  leadingIcon?: ReactNode | null
  /** Slot to the right of the heading — badges, counts, etc. */
  trailingContent?: ReactNode | null
  defaultOpen?: boolean
  /** Controlled open state. Leave undefined/null for uncontrolled. */
  open?: boolean | null
  onToggle?: (open: boolean) => void
  disabled?: boolean
  children: ReactNode
}

export function Accordion({
  heading,
  leadingIcon = null,
  trailingContent = null,
  defaultOpen = false,
  open = null,
  onToggle,
  disabled = false,
  children,
}: AccordionProps) {
  const panelId = useId()
  const isControlled = open != null
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isControlled ? open : internalOpen

  const toggle = () => {
    if (disabled) return
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onToggle?.(next)
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        onClick={toggle}
        className="flex w-full cursor-pointer items-center gap-3 border-b border-t border-border-subtle px-6 py-4 text-left transition-colors enabled:hover:bg-surface-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-40"
      >
        {leadingIcon}
        {/* heading is rendered unwrapped — callers own its typography. */}
        <span className="flex-1">{heading}</span>
        {trailingContent}
        <Icon
          size="sm"
          className={cn('text-text-brand transition-transform', isOpen && 'rotate-180')}
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      </button>
      <div id={panelId} hidden={!isOpen} className="p-6">
        {children}
      </div>
    </div>
  )
}
