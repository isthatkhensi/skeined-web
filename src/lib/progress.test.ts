import { describe, expect, it } from 'vitest'
import { getProgress } from './progress'

describe('getProgress', () => {
  it('computes percent and remaining for a partial claim', () => {
    expect(getProgress(43, 50)).toEqual({ percent: 86, remaining: 7 })
  })

  it('clamps percent at 100 when claimed exceeds total', () => {
    expect(getProgress(60, 50)).toEqual({ percent: 100, remaining: 0 })
  })

  it('handles zero claimed', () => {
    expect(getProgress(0, 50)).toEqual({ percent: 0, remaining: 50 })
  })
})
