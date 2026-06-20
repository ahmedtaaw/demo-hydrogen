import { categories, getProduct, getVariant } from '@/data'
import type { CategoryId, Product, ProductId, Variant } from '@/types'
import type { BuilderState } from './types'

const roundCents = (value: number) => Math.round(value * 100) / 100

/** A selected item resolved against the catalog (quantity > 0). */
export interface SelectedLine {
  productId: ProductId
  product: Product
  variant: Variant
  quantity: number
}

/**
 * Resolves raw state selections into catalog-backed lines. This is the single
 * place selections are joined to products/variants — totals and sections both
 * build on it, so the join logic is never duplicated.
 */
export function selectSelectedLines(state: BuilderState): SelectedLine[] {
  const lines: SelectedLine[] = []
  for (const [productId, item] of Object.entries(state.items)) {
    if (item.quantity <= 0) continue
    const product = getProduct(productId)
    const variant = getVariant(item.variantId)
    if (!product || !variant) continue
    lines.push({ productId, product, variant, quantity: item.quantity })
  }
  return lines
}

export interface BuilderTotals {
  /** List-price sum across selected items (the struck-through subtotal). */
  subtotal: number
  /** Payable sum at current prices. */
  total: number
  /** Money off list price (subtotal − total). */
  discount: number
  /** Headline savings — equal to the discount. */
  savings: number
  /** Number of distinct products with a quantity greater than zero. */
  selectedCount: number
}

/** Derives all monetary figures and counts from state; nothing is stored back. */
export function selectTotals(state: BuilderState): BuilderTotals {
  const lines = selectSelectedLines(state)
  let subtotal = 0
  let total = 0

  for (const { variant, quantity } of lines) {
    subtotal += (variant.originalPrice ?? variant.currentPrice) * quantity
    total += variant.currentPrice * quantity
  }

  const roundedSubtotal = roundCents(subtotal)
  const roundedTotal = roundCents(total)
  const discount = roundCents(roundedSubtotal - roundedTotal)

  return {
    subtotal: roundedSubtotal,
    total: roundedTotal,
    discount,
    savings: discount,
    selectedCount: lines.length,
  }
}

export interface ReviewSectionData {
  categoryId: CategoryId
  label: string
  lines: SelectedLine[]
}

/** Groups selected lines by category, in catalog order, omitting empty groups. */
export function selectSections(state: BuilderState): ReviewSectionData[] {
  const lines = selectSelectedLines(state)
  return categories
    .map((category) => ({
      categoryId: category.id,
      label: category.name,
      lines: lines.filter((line) => line.product.categoryId === category.id),
    }))
    .filter((section) => section.lines.length > 0)
}
