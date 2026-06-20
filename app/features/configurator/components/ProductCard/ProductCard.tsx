import { getProduct, getProductVariants } from '@/data'
import {
  Badge,
  Card,
  OptionSelector,
  PriceDisplay,
  QuantityStepper,
  Text,
  Thumbnail,
} from '@/design-system'
import { useBuilderDispatch, useBuilderState } from '@/features/configurator/state'
import type { ProductId } from '@/types'

/** Discount badge percentage, derived from prices (null when no sale or free). */
function discountPercent(original: number | null, current: number): number | null {
  if (original == null || current <= 0 || original <= current) return null
  return Math.floor(((original - current) / original) * 100)
}

export interface ProductCardProps {
  productId: ProductId
}

export function ProductCard({ productId }: ProductCardProps) {
  const { state } = useBuilderState()
  const dispatch = useBuilderDispatch()

  const product = getProduct(productId)
  const item = state.items[productId]
  if (!product || !item) return null

  const variants = getProductVariants(productId)
  const selectedVariant = variants.find((variant) => variant.id === item.variantId) ?? variants[0]
  if (!selectedVariant) return null

  const percent = discountPercent(selectedVariant.originalPrice, selectedVariant.currentPrice)
  const hasOptions = variants.length > 1

  return (
    <Card
      variant={item.quantity > 0 ? 'selected' : 'default'}
      padding="sm"
      className="relative flex items-start gap-4 tablet:flex-col tablet:items-center desktop:flex-row desktop:items-start"
    >
      {percent != null && (
        <Badge variant="brand" className="absolute left-2 top-2 z-10">
          Save {percent}%
        </Badge>
      )}
      <Thumbnail
        src={product.image}
        alt={product.name}
        size="lg"
        className="shrink-0 tablet:mt-2"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2 tablet:w-full">
        <div className="flex flex-col gap-1">
          <Text variant="heading-3">{product.name}</Text>
          <Text variant="body" color="secondary">
            {product.description}
          </Text>
        </div>
        {hasOptions && (
          <OptionSelector
            label={`${product.name} options`}
            options={variants.map((variant) => ({ label: variant.label, color: variant.color }))}
            value={selectedVariant.label}
            onChange={(label) => {
              const next = variants.find((variant) => variant.label === label)
              if (next) dispatch({ type: 'SET_VARIANT', productId, variantId: next.id })
            }}
          />
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <QuantityStepper
            value={item.quantity}
            onChange={(quantity) => dispatch({ type: 'SET_QUANTITY', productId, quantity })}
          />
          <PriceDisplay
            originalPrice={selectedVariant.originalPrice}
            currentPrice={selectedVariant.currentPrice}
            free={selectedVariant.currentPrice === 0}
          />
        </div>
      </div>
    </Card>
  )
}
