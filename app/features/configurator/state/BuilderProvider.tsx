import { type ReactNode, useMemo, useReducer } from 'react'
import type { Catalog } from '@/data/catalog.context'
import { BuilderDispatchContext, BuilderStateContext, type BuilderStateValue } from './builderContext'
import { builderReducer, createInitialState } from './reducer'
import { selectTotals } from './selectors'
import type { StepStatus } from './types'

interface BuilderProviderProps {
  children: ReactNode
  catalog: Catalog
  initialSteps?: Record<string, StepStatus>
}

export function BuilderProvider({ children, catalog, initialSteps }: BuilderProviderProps) {
  const [state, dispatch] = useReducer(
    builderReducer,
    initialSteps ?? {},
    (steps) => createInitialState(catalog, steps),
  )
  const totals = useMemo(() => selectTotals(state, catalog), [state, catalog])
  const stateValue = useMemo<BuilderStateValue>(() => ({ state, totals }), [state, totals])

  return (
    <BuilderDispatchContext.Provider value={dispatch}>
      <BuilderStateContext.Provider value={stateValue}>{children}</BuilderStateContext.Provider>
    </BuilderDispatchContext.Provider>
  )
}