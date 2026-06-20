import { type ReactNode } from 'react'
import { Text } from '@/design-system'

export interface ReviewSectionProps {
  label: string
  children: ReactNode
}

/** Presentational shell: an uppercase section label above its rows. */
export function ReviewSection({ label, children }: ReviewSectionProps) {
  return (
    <div className="flex flex-col">
      <Text variant="label-upper" color="secondary" className="block px-4 py-2">
        {label}
      </Text>
      {children}
    </div>
  )
}
