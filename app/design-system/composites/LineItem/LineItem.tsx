import { PriceDisplay } from '@/design-system/composites/PriceDisplay'
import { QuantityStepper } from '@/design-system/composites/QuantityStepper'
import { Text, Thumbnail } from '@/design-system/primitives'
import { cn } from '@/utils'

type LineItemSize = 'sm' | 'md'

export type LineItemProps = {
  thumbnail: { src: string; alt: string }
  name: string
  meta?: string | null
  quantity: number
  /** Pass null for a read-only row (no stepper rendered). */
  onQuantityChange?: ((next: number) => void) | null
  /** Lower bound for the stepper — e.g. 1 for a required line (disables minus). */
  minQuantity?: number
  originalPrice?: number | null
  currentPrice: number
  free?: boolean
  size?: LineItemSize
  className?: string
}

const thumbnailSize = { sm: 'sm', md: 'md' } as const

export function LineItem({
  thumbnail,
  name,
  meta = null,
  quantity,
  onQuantityChange = null,
  minQuantity = 0,
  originalPrice = null,
  currentPrice,
  free = false,
  size = 'sm',
  className,
}: LineItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border-b border-border-subtle px-4 py-3',
        className,
      )}
    >
      <Thumbnail src={thumbnail.src} alt={thumbnail.alt} size={thumbnailSize[size]} className="shrink-0" />

      <div className="min-w-0 flex-1">
        <Text variant="body" color="primary" className="line-clamp-2">
          {name}
        </Text>
        {meta && (
          <Text variant="caption" color="secondary">
            {meta}
          </Text>
        )}
      </div>

      {onQuantityChange ? (
        <QuantityStepper
          value={quantity}
          min={minQuantity}
          onChange={onQuantityChange}
          size={size}
        />
      ) : (
        <Text as="span" variant="body" color="secondary" aria-label={`Quantity: ${quantity}`}>
          ×{quantity}
        </Text>
      )}

      <PriceDisplay
        layout="stacked"
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        free={free}
        currentColor="brand"
        originalColor="muted"
        freeColor="brand"
        className="shrink-0"
      />
    </div>
  )
}
