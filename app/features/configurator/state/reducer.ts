import { defaultBundle, products, variants } from '@/data'
import type { BuilderAction, BuilderItem, BuilderState, StepStatus } from './types'

/**
 * Seeds state from the catalog: every product starts with its first variant and
 * quantity 0, then the default bundle applies its selected variants/quantities.
 * Computed lazily by the reducer hook (never on every render).
 */
export function createInitialState(initialSteps: Record<string, StepStatus> = {}): BuilderState {
  const items: Record<string, BuilderItem> = {}

  for (const product of products) {
    const firstVariant = variants.find((variant) => variant.productId === product.id)
    if (!firstVariant) continue
    items[product.id] = { variantId: firstVariant.id, quantity: 0 }
  }

  for (const bundleItem of defaultBundle.items) {
    const variant = variants.find((entry) => entry.id === bundleItem.variantId)
    if (!variant) continue
    items[variant.productId] = { variantId: variant.id, quantity: bundleItem.quantity }
  }

  return { items, planId: defaultBundle.planId, steps: initialSteps }
}

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'SET_QUANTITY': {
      const item = state.items[action.productId]
      const quantity = Math.max(0, action.quantity)
      if (!item || item.quantity === quantity) return state
      return {
        ...state,
        items: { ...state.items, [action.productId]: { ...item, quantity } },
      }
    }
    case 'SET_VARIANT': {
      const item = state.items[action.productId]
      if (!item || item.variantId === action.variantId) return state
      return {
        ...state,
        items: { ...state.items, [action.productId]: { ...item, variantId: action.variantId } },
      }
    }
    case 'SET_PLAN':
      if (state.planId === action.planId) return state
      return { ...state, planId: action.planId }
    case 'TOGGLE_STEP': {
      // Single-open accordion: opening a step collapses the others.
      const isOpen = state.steps[action.stepId] === 'expanded'
      return { ...state, steps: { [action.stepId]: isOpen ? 'collapsed' : 'expanded' } }
    }
    default:
      return state
  }
}
