interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercent?: boolean
  size?: 'sm' | 'md'
  color?: 'accent' | 'secondary'
  animated?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = true,
  size = 'md',
  color = 'accent',
  animated = true,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  const barClass =
    color === 'accent'
      ? animated ? 'progress-shimmer' : 'bg-forge-accent'
      : animated ? 'progress-shimmer-secondary' : 'bg-forge-secondary'

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-forge-muted uppercase tracking-wider">{label}</span>}
          {showPercent && (
            <span className="text-xs text-forge-accent font-mono">{Math.round(percent)}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-forge-border/50 rounded-full overflow-hidden ${size === 'sm' ? 'h-1.5' : 'h-2.5'}`}
      >
        <div
          className={`${barClass} h-full rounded-full transition-all duration-700 ease-out relative`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
