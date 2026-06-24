import type { Category, CategoryId, Product, Variant } from '@/types'

interface SFMoney { amount: string; currencyCode: string }
interface SFVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
  price: SFMoney
  compareAtPrice: SFMoney | null
}
interface SFProduct {
  id: string
  title: string
  description: string
  tags: string[]
  featuredImage: { url: string; altText: string | null } | null
  variants: { nodes: SFVariant[] }
}

// Tags we treat as categories — display name + order.
const CATEGORY_NAMES: Record<string, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
}
const CATEGORY_ORDER = ['cameras', 'sensors', 'accessories']

// Shopify has no swatch hex — derive it from the color name.
const COLOR_HEX: Record<string, string> = {
  white: '#ffffff', black: '#000000', grey: '#808080',
  gray: '#808080', red: '#d8382a', blue: '#2f6fd1', beige: '#e8d8b0',
}

const toNumber = (m: SFMoney | null) => (m ? Number.parseFloat(m.amount) : null)
const colorName = (v: SFVariant) =>
  v.selectedOptions.find((o) => o.name.toLowerCase() === 'color')?.value
const categoryOf = (p: SFProduct): CategoryId | null =>
  p.tags.find((t) => t.toLowerCase() in CATEGORY_NAMES)?.toLowerCase() ?? null

export interface MappedCatalog {
  categories: Category[]
  products: Product[]
  variants: Variant[]
}

export function mapCatalog(nodes: SFProduct[]): MappedCatalog {
  const products: Product[] = []
  const variants: Variant[] = []
  const used = new Set<CategoryId>()

  for (const node of nodes) {
    const categoryId = categoryOf(node)
    if (!categoryId) continue // skip anything without a known category tag
    used.add(categoryId)

    products.push({
      id: node.id,
      categoryId,
      name: node.title,
      description: node.description,
      image: node.featuredImage?.url ?? '',
    })

    for (const v of node.variants.nodes) {
      const name = colorName(v)
      variants.push({
        id: v.id,
        productId: node.id,
        label: name ?? v.title,
        color: name ? COLOR_HEX[name.toLowerCase()] : undefined,
        originalPrice: toNumber(v.compareAtPrice),
        currentPrice: toNumber(v.price) ?? 0,
      })
    }
  }

  const categories: Category[] = CATEGORY_ORDER
    .filter((id) => used.has(id))
    .map((id) => ({ id, name: CATEGORY_NAMES[id] }))

  return { categories, products, variants }
}