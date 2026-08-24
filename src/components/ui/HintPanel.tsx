import { Lightbulb, X } from 'lucide-react'
import { Button } from './Button'
import type { Hint } from '../../types'

interface HintPanelProps {
  hints: Hint[]
  hintsUsed: number
  onUseHint: () => void
  onClose: () => void
}

export function HintPanel({ hints, hintsUsed, onUseHint, onClose }: HintPanelProps) {
  const available = hints.filter((h) => h.level <= hintsUsed)
  const canRevealMore = hintsUsed < hints.length

  return (
    <div className="glass-panel rounded-xl p-5 border-forge-warning/30 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-forge-warning" />
          <h3 className="font-semibold text-forge-text">Hints</h3>
          <span className="text-xs text-forge-muted font-mono">
            {hintsUsed}/{hints.length} used
          </span>
        </div>
        <button onClick={onClose} className="text-forge-muted hover:text-forge-text transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {available.length === 0 && (
          <p className="text-sm text-forge-muted">Reveal a hint to get guidance on this challenge.</p>
        )}
        {available.map((hint) => (
          <div
            key={hint.level}
            className="p-3 rounded-lg bg-forge-warning/5 border border-forge-warning/20 text-sm text-forge-text"
          >
            <span className="text-forge-warning font-mono text-xs mr-2">HINT {hint.level}</span>
            {hint.text}
          </div>
        ))}
      </div>

      {canRevealMore && (
        <Button variant="outline" size="sm" icon={Lightbulb} onClick={onUseHint}>
          Reveal Hint {hintsUsed + 1}
        </Button>
      )}
    </div>
  )
}
