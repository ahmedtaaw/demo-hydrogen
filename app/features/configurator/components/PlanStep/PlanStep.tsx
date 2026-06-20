import { plans } from '@/data'
import { Card, PriceDisplay, Text } from '@/design-system'
import { useBuilderDispatch, useBuilderState } from '@/features/configurator/state'
import { StepAccordion } from '../StepAccordion'

export interface PlanStepProps {
  id: string
  title: string
  icon: string
  index: number
  total: number
  isOpen: boolean
  onToggle: () => void
  nextLabel?: string
  onNext?: () => void
}

/**
 * The "Choose your plan" step. Subscription plans are a single-select: picking a
 * plan replaces the current one; picking the selected plan again clears it.
 */
export function PlanStep({
  title,
  icon,
  index,
  total,
  isOpen,
  onToggle,
  nextLabel,
  onNext,
}: PlanStepProps) {
  const { state } = useBuilderState()
  const dispatch = useBuilderDispatch()

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
        state.planId ? (
          <Text as="span" variant="body" color="brand">
            1 selected
          </Text>
        ) : null
      }
    >
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-1">
        {plans.map((plan) => {
          const selected = state.planId === plan.id
          return (
            <Card key={plan.id} variant={selected ? 'selected' : 'default'} padding="none">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => dispatch({ type: 'SET_PLAN', planId: selected ? null : plan.id })}
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-md p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <img src={icon} alt="" aria-hidden className="size-6 shrink-0" />
                  <span className="flex min-w-0 flex-col">
                    <Text as="span" variant="heading-3" color={selected ? 'brand' : 'primary'}>
                      {plan.name}
                    </Text>
                    <Text variant="caption" color="secondary">
                      Cloud recording &amp; smart alerts
                    </Text>
                  </span>
                </span>
                <PriceDisplay
                  originalPrice={plan.originalMonthlyPrice}
                  currentPrice={plan.currentMonthlyPrice}
                  originalColor="muted"
                  subscriptionSuffix="/mo"
                />
              </button>
            </Card>
          )
        })}
      </div>
    </StepAccordion>
  )
}
