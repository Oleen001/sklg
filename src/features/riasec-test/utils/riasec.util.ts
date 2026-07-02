import { defaultRiasecResultId } from '@/features/riasec-test/constants'
import type { RiasecTestFormFields } from '@/features/riasec-test/interfaces'

// Mock scoring — the real project posts answers and receives a computed result.
// Here we simply resolve to a static mock result so the flow stays end-to-end
// without any backend. `fields` is accepted to mirror the real signature.
export function evaluateRiasecResult(fields: RiasecTestFormFields): string {
  void fields
  return defaultRiasecResultId
}

// Formats an ISO date string into a Thai-locale long date (e.g. 19 มิ.ย. 2569).
export function formatThaiDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
