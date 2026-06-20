export type PlanId = string

/** A subscription plan, priced per month. */
export interface Plan {
  id: PlanId
  name: string
  originalMonthlyPrice: number
  currentMonthlyPrice: number
}
