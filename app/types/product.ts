import type { CategoryId } from './category'

export type ProductId = string

/**
 * A sellable product. Pricing lives on its {@link Variant}s (matching Shopify's
 * variant-level pricing); the "Save X%" badge is derived from a variant's
 * original vs. current price, not stored.
 */
export interface Product {
  id: ProductId
  categoryId: CategoryId
  name: string
  description: string
  image: string
  /** Marks a product the system cannot function without. */
  required?: boolean
}
