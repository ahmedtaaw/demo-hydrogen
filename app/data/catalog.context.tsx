import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { Category, CategoryId, Product, ProductId, Variant, VariantId } from '@/types'

export interface Catalog {
  categories: Category[]
  products: Product[]
  variants: Variant[]
  getProduct: (id: ProductId) => Product | undefined
  getVariant: (id: VariantId) => Variant | undefined
  getProductVariants: (productId: ProductId) => Variant[]
  getCategoryProducts: (categoryId: CategoryId) => Product[]
}

export interface CatalogData {
  categories: Category[]
  products: Product[]
  variants: Variant[]
}

const CatalogContext = createContext<Catalog | null>(null)

export function CatalogProvider({ data, children }: { data: CatalogData; children: ReactNode }) {
  const catalog = useMemo<Catalog>(() => {
    const productMap = new Map(data.products.map((p) => [p.id, p]))
    const variantMap = new Map(data.variants.map((v) => [v.id, v]))
    return {
      categories: data.categories,
      products: data.products,
      variants: data.variants,
      getProduct: (id) => productMap.get(id),
      getVariant: (id) => variantMap.get(id),
      getProductVariants: (productId) => data.variants.filter((v) => v.productId === productId),
      getCategoryProducts: (categoryId) => data.products.filter((p) => p.categoryId === categoryId),
    }
  }, [data])

  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>
}

export function useCatalog(): Catalog {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within a CatalogProvider')
  return ctx
}