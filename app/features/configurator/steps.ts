import type { CategoryId } from '@/types'

/**
 * Declarative configuration for one configurator step (the flow, not the UI).
 * `kind` selects which body renders: a product grid or the plan picker.
 */
export type StepConfig =
  | {
      id: string
      title: string
      icon: string
      kind: 'products'
      categoryId: CategoryId
    }
  | {
      id: string
      title: string
      icon: string
      kind: 'plan'
    }

export const steps: StepConfig[] = [
  {
    id: 'cameras',
    title: 'Choose your cameras',
    icon: '/icons/cameras.svg',
    kind: 'products',
    categoryId: 'cameras',
  },
  { id: 'plan', title: 'Choose your plan', icon: '/icons/plan.svg', kind: 'plan' },
  {
    id: 'sensors',
    title: 'Choose your sensors',
    icon: '/icons/sensors.svg',
    kind: 'products',
    categoryId: 'sensors',
  },
  {
    id: 'accessories',
    title: 'Add extra protection',
    icon: '/icons/accessories.svg',
    kind: 'products',
    categoryId: 'accessories',
  },
]
