export function getProgress(claimed: number, total: number) {
  const percent = Math.min(100, Math.round((claimed / total) * 100))
  const remaining = Math.max(0, total - claimed)
  return { percent, remaining }
}
