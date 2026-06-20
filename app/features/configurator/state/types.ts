import type { PlanId, ProductId, VariantId } from '@/types'

export type StepStatus = 'collapsed' | 'expanded'

/**
 * A single product selection, keyed by product id in {@link BuilderState.items}.
 * Holds only the chosen variant and a quantity — price is never stored here, it
 * is read from the catalog variant (which also links back to its product).
 */
export interface BuilderItem {
  variantId: VariantId
  quantity: number
}

/**
 * The single source of truth for what the user is building. Contains only raw
 * selections — totals, savings, and counts are derived, never stored.
 */
export interface BuilderState {
  items: Record<ProductId, BuilderItem>
  planId: PlanId | null
  steps: Record<string, StepStatus>
}

export type BuilderAction =
  | { type: 'SET_QUANTITY'; productId: ProductId; quantity: number }
  | { type: 'SET_VARIANT'; productId: ProductId; variantId: VariantId }
  | { type: 'SET_PLAN'; planId: PlanId | null }
  | { type: 'TOGGLE_STEP'; stepId: string }
