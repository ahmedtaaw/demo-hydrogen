export type CategoryId = string

/** A product grouping — drives the order-summary sections and step grouping. */
export interface Category {
  id: CategoryId
  name: string
}
