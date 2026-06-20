/**
 * Format a numeric amount as a localized currency string.
 * Pure presentation helper — no pricing or business logic.
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}
