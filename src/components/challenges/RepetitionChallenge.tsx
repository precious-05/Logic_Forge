import { useState } from 'react'
import { Repeat, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Challenge } from '../../types'

interface RepetitionChallengeProps {
  repetition: NonNullable<Challenge['repetition']>
  onSuccess: () => void
}

export function RepetitionChallenge({ repetition, onSuccess }: RepetitionChallengeProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    if (selected === repetition.correctIndex) {
      setFeedback('Correct. The loop repeats the three actions exactly 5 times: once per box.')
      setSuccess(true)
      setTimeout(onSuccess, 1000)
    } else {
      setFeedback('That loop does not match the pattern. Count how many boxes need stamping and which actions repeat.')
    }
  }

  return (
    <div>
      <div className="glass-panel rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Repeat className="w-5 h-5 text-forge-accent" />
          <span className="text-sm font-medium">Repeating Actions (per box)</span>
        </div>
        <div className="space-y-2 mb-4">
          {repetition.pattern.map((action, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-forge-card border border-forge-border font-mono text-sm">
              <span className="text-forge-muted w-6">{i + 1}.</span>
              {action}
            </div>
          ))}
        </div>
        <p className="text-xs text-forge-muted">This block repeats for each of the 5 boxes on the line.</p>
      </div>

      <p className="text-sm font-medium mb-3">{repetition.question}</p>
      <div className="space-y-2 mb-4">
        {repetition.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => { setSelected(idx); setSuccess(false); setFeedback(null) }}
            className={`w-full text-left px-4 py-3 rounded-lg border font-mono text-sm transition-all cursor-pointer ${
              selected === idx
                ? 'border-forge-accent bg-forge-accent/10'
                : 'border-forge-border bg-forge-card hover:border-forge-accent/30'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {success && (
        <div className="font-mono text-sm bg-forge-bg rounded-xl p-4 border border-forge-accent/30 mb-4 whitespace-pre-line text-forge-accent">
          {repetition.loopRepresentation}
        </div>
      )}

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            success
              ? 'bg-forge-success/10 border border-forge-success/30 text-forge-success'
              : 'bg-forge-warning/10 border border-forge-warning/30 text-forge-warning'
          }`}
        >
          {feedback}
        </div>
      )}

      {!success && (
        <Button onClick={handleSubmit} icon={CheckCircle2} disabled={selected === null}>
          Submit Answer
        </Button>
      )}
    </div>
  )
}
