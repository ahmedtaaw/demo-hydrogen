import {
  BuilderProvider,
  BundleStep,
  OrderSummary,
  PlanStep,
  steps,
  useBuilderDispatch,
  useBuilderState,
} from '@/features/configurator'
import { Text } from '@/design-system'

function BundleBuilder() {
  const { state } = useBuilderState()
  const dispatch = useBuilderDispatch()

  return (
    <main className="min-h-dvh">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 tablet:px-8 desktop:flex-row desktop:px-12">
        <div className="min-w-0 flex-1 ">
          {/* Hero is mobile-only; the wider layouts open straight into the first step. */}
          <Text variant="display" className="mb-6 block tablet:hidden">
            Let&apos;s get started!
          </Text>

          <div className="flex flex-col overflow-hidden rounded-lg ">
            {steps.map((step, index) => {
              const next = steps[index + 1]
              const common = {
                index: index + 1,
                total: steps.length,
                isOpen: state.steps[step.id] === 'expanded',
                onToggle: () => dispatch({ type: 'TOGGLE_STEP', stepId: step.id }),
                nextLabel: next ? `Next: ${next.title}` : undefined,
                // Single-open accordion: opening the next step collapses the current one.
                onNext: next ? () => dispatch({ type: 'TOGGLE_STEP', stepId: next.id }) : undefined,
              }

              return step.kind === 'plan' ? (
                <PlanStep key={step.id} id={step.id} title={step.title} icon={step.icon} {...common} />
              ) : (
                <BundleStep
                  key={step.id}
                  id={step.id}
                  title={step.title}
                  icon={step.icon}
                  categoryId={step.categoryId}
                  {...common}
                />
              )
            })}
          </div>
        </div>

        <div className="desktop:w-[380px] desktop:shrink-0">
          <div className="desktop:sticky desktop:top-4">
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  )
}

export function BundleBuilderPage() {
  const firstStep = steps[0]
  return (
    <BuilderProvider initialSteps={firstStep ? { [firstStep.id]: 'expanded' } : {}}>
      <BundleBuilder />
    </BuilderProvider>
  )
}
