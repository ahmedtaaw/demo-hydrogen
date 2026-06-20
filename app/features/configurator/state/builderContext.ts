import { type Dispatch, createContext, useContext } from 'react'
import type { BuilderTotals } from './selectors'
import type { BuilderAction, BuilderState } from './types'

export interface BuilderStateValue {
  state: BuilderState
  /** Derived view of state — recomputed on change, never persisted. */
  totals: BuilderTotals
}

// State and dispatch are split into separate contexts so that dispatch-only
// consumers do not re-render when state changes (dispatch identity is stable).
export const BuilderStateContext = createContext<BuilderStateValue | null>(null)
export const BuilderDispatchContext = createContext<Dispatch<BuilderAction> | null>(null)

export function useBuilderState(): BuilderStateValue {
  const value = useContext(BuilderStateContext)
  if (!value) {
    throw new Error('useBuilderState must be used within a BuilderProvider')
  }
  return value
}

export function useBuilderDispatch(): Dispatch<BuilderAction> {
  const dispatch = useContext(BuilderDispatchContext)
  if (!dispatch) {
    throw new Error('useBuilderDispatch must be used within a BuilderProvider')
  }
  return dispatch
}
