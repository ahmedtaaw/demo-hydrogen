import type { Bundle, Category, CategoryId, Plan, Product, ProductId, Variant, VariantId } from '@/types'
import categoriesJson from './categories.json'
import productsJson from './products.json'
import variantsJson from './variants.json'
import plansJson from './plans.json'
import bundleJson from './bundle.json'

/**
 * Typed access to the normalized local catalog. Entities are flat collections
 * linked by id (variant → product → category); the default bundle references
 * variant ids only. Swap these JSON sources for a Shopify storefront fetch
 * without changing the shapes below.
 */
export const categories = categoriesJson as Category[]
export const products = productsJson as Product[]
export const variants = variantsJson as Variant[]
export const plans = plansJson as Plan[]
export const defaultBundle = bundleJson as Bundle

const productMap = new Map<ProductId, Product>(products.map((product) => [product.id, product]))
const variantMap = new Map<VariantId, Variant>(variants.map((variant) => [variant.id, variant]))

export const getProduct = (id: ProductId): Product | undefined => productMap.get(id)
export const getVariant = (id: VariantId): Variant | undefined => variantMap.get(id)

export const getProductVariants = (productId: ProductId): Variant[] =>
  variants.filter((variant) => variant.productId === productId)

export const getCategoryProducts = (categoryId: CategoryId): Product[] =>
  products.filter((product) => product.categoryId === categoryId)
