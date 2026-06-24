import type { CategoryId, Product, ProductId, Variant } from '@/types'
import type { Catalog } from '@/data/catalog.context'
import type { BuilderState } from './types'

const roundCents = (value: number) => Math.round(value * 100) / 100

export interface SelectedLine {
  productId: ProductId
  product: Product
  variant: Variant
  quantity: number
}

export function selectSelectedLines(state: BuilderState, catalog: Catalog): SelectedLine[] {
  const lines: SelectedLine[] = []
  for (const [productId, item] of Object.entries(state.items)) {
    if (item.quantity <= 0) continue
    const product = catalog.getProduct(productId)
    const variant = catalog.getVariant(item.variantId)
    if (!product || !variant) continue
    lines.push({ productId, product, variant, quantity: item.quantity })
  }
  return lines
}

export interface BuilderTotals {
  subtotal: number
  total: number
  discount: number
  savings: number
  selectedCount: number
}

export function selectTotals(state: BuilderState, catalog: Catalog): BuilderTotals {
  const lines = selectSelectedLines(state, catalog)
  let subtotal = 0
  let total = 0
  for (const { variant, quantity } of lines) {
    subtotal += (variant.originalPrice ?? variant.currentPrice) * quantity
    total += variant.currentPrice * quantity
  }
  const roundedSubtotal = roundCents(subtotal)
  const roundedTotal = roundCents(total)
  const discount = roundCents(roundedSubtotal - roundedTotal)
  return { subtotal: roundedSubtotal, total: roundedTotal, discount, savings: discount, selectedCount: lines.length }
}

export interface ReviewSectionData {
  categoryId: CategoryId
  label: string
  lines: SelectedLine[]
}

export function selectSections(state: BuilderState, catalog: Catalog): ReviewSectionData[] {
  const lines = selectSelectedLines(state, catalog)
  return catalog.categories
    .map((category) => ({
      categoryId: category.id,
      label: category.name,
      lines: lines.filter((line) => line.product.categoryId === category.id),
    }))
    .filter((section) => section.lines.length > 0)
}