import { defaultBundle } from '@/data'
import type { Catalog } from '@/data/catalog.context'
import type { BuilderAction, BuilderItem, BuilderState, StepStatus } from './types'

export function createInitialState(
  catalog: Catalog,
  initialSteps: Record<string, StepStatus> = {},
): BuilderState {
  const items: Record<string, BuilderItem> = {}

  for (const product of catalog.products) {
    const firstVariant = catalog.variants.find((v) => v.productId === product.id)
    if (!firstVariant) continue
    items[product.id] = { variantId: firstVariant.id, quantity: 0 }
  }

  for (const bundleItem of defaultBundle.items) {
    const variant = catalog.variants.find((e) => e.id === bundleItem.variantId)
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
      return { ...state, items: { ...state.items, [action.productId]: { ...item, quantity } } }
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
      const isOpen = state.steps[action.stepId] === 'expanded'
      return { ...state, steps: { [action.stepId]: isOpen ? 'collapsed' : 'expanded' } }
    }
    default:
      return state
  }
}