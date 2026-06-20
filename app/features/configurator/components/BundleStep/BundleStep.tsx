import { getCategoryProducts } from '@/data'
import { Text } from '@/design-system'
import { useBuilderState } from '@/features/configurator/state'
import type { CategoryId } from '@/types'
import { ProductCard } from '../ProductCard'
import { StepAccordion } from '../StepAccordion'

export interface BundleStepProps {
  id: string
  title: string
  icon: string
  categoryId: CategoryId
  index: number
  total: number
  isOpen: boolean
  onToggle: () => void
  nextLabel?: string
  onNext?: () => void
}

export function BundleStep({
  title,
  icon,
  categoryId,
  index,
  total,
  isOpen,
  onToggle,
  nextLabel,
  onNext,
}: BundleStepProps) {
  const { state } = useBuilderState()

  const products = getCategoryProducts(categoryId)
  const selectedCount = products.filter(
    (product) => (state.items[product.id]?.quantity ?? 0) > 0,
  ).length

  return (
    <StepAccordion
      index={index}
      total={total}
      title={title}
      icon={icon}
      isOpen={isOpen}
      onToggle={onToggle}
      nextLabel={nextLabel}
      onNext={onNext}
      trailing={
        selectedCount > 0 ? (
          <Text as="span" variant="body" color="brand">
            {selectedCount} selected
          </Text>
        ) : null
      }
    >
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-4 tablet:gap-5 desktop:grid-cols-2 desktop:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} productId={product.id} />
        ))}
      </div>
    </StepAccordion>
  )
}
