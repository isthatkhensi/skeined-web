import { getProgress } from '../../lib/progress'

interface ProgressBarProps {
  claimed: number
  total: number
}

export default function ProgressBar({ claimed, total }: ProgressBarProps) {
  const { percent, remaining } = getProgress(claimed, total)

  return (
    <div className="w-full max-w-sm">
      <div className="h-2 w-full overflow-hidden rounded-pill bg-linen">
        <div
          className="h-full rounded-pill bg-primary transition-[width] duration-500"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={claimed}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
      <p className="mt-2 text-sm text-text-3">
        {remaining} of {total} spots remaining
      </p>
    </div>
  )
}
