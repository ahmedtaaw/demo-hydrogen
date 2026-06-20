import { type ReactNode, useMemo, useReducer } from 'react'
import {
  BuilderDispatchContext,
  BuilderStateContext,
  type BuilderStateValue,
} from './builderContext'
import { builderReducer, createInitialState } from './reducer'
import { selectTotals } from './selectors'
import type { StepStatus } from './types'

interface BuilderProviderProps {
  children: ReactNode
  /** Optional initial step open/closed map (the page supplies its flow). */
  initialSteps?: Record<string, StepStatus>
}

export function BuilderProvider({ children, initialSteps }: BuilderProviderProps) {
  const [state, dispatch] = useReducer(builderReducer, initialSteps ?? {}, createInitialState)
  const totals = useMemo(() => selectTotals(state), [state])
  const stateValue = useMemo<BuilderStateValue>(() => ({ state, totals }), [state, totals])

  return (
    <BuilderDispatchContext.Provider value={dispatch}>
      <BuilderStateContext.Provider value={stateValue}>{children}</BuilderStateContext.Provider>
    </BuilderDispatchContext.Provider>
  )
}
