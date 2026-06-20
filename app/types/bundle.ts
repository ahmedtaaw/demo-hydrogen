import type { PlanId } from './plan'
import type { VariantId } from './variant'

/** A single selected line in a bundle — references a variant, never copies it. */
export interface BundleItem {
  variantId: VariantId
  quantity: number
}

/** A composed bundle: selected items plus an optional subscription plan. */
export interface Bundle {
  items: BundleItem[]
  planId: PlanId | null
}
