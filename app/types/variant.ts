import type { ProductId } from './product'

export type VariantId = string

/**
 * A purchasable option of a product (color, finish, …). Carries its own price,
 * mirroring Shopify, where price/compareAtPrice live on the variant.
 */
export interface Variant {
  id: VariantId
  productId: ProductId
  label: string
  /** Optional swatch color (CSS color) for color-style options. */
  color?: string
  originalPrice: number | null
  currentPrice: number
}
