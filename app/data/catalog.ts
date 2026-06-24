import type { Bundle, Plan } from '@/types'
import plansJson from './plans.json'
import bundleJson from './bundle.json'

/** Static seed not yet sourced from Shopify: subscription plans + default bundle. */
export const plans = plansJson as Plan[]
export const defaultBundle = bundleJson as Bundle