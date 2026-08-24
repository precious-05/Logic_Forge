import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { PseudocodeLine } from '../../types'
import { normalizeAnswer } from '../../utils/helpers'

interface PseudocodePhaseProps {
  template: PseudocodeLine[]
  correctLines?: string[]
  onComplete: () => void
  skipIfNoEditable?: boolean
}

export function PseudocodePhase({
  template,
  correctLines = [],
  onComplete,
  skipIfNoEditable = true,
}: PseudocodePhaseProps) {
  const editableLines = template.filter((l) => l.editable)
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    editableLines.forEach((l) => { init[l.id] = '' })
    return init
  })
  const [feedback, setFeedback] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  if (skipIfNoEditable && editableLines.length === 0) {
    return (
      <div className="animate-slide-up">
        <div className="mb-6">
          <span className="text-xs font-mono text-forge-accent uppercase tracking-widest">
            Phase 3 — Pseudocode
          </span>
          <h2 className="text-xl font-bold mt-1">Review the Pseudocode</h2>
        </div>
        <div className="font-mono text-sm bg-forge-bg rounded-xl p-5 border border-forge-border mb-4 space-y-1">
          {template.map((line) => (
            <div key={line.id} className="text-forge-text">
              <span className="text-forge-muted select-none mr-3">{line.id.replace('l', '').padStart(2, '0')}</span>
              {line.text}
            </div>
          ))}
        </div>
        <Button onClick={onComplete} icon={CheckCircle2}>Continue to Challenge</Button>
      </div>
    )
  }

  const handleVerify = () => {
    const allCorrect = editableLines.every((line, idx) => {
      const expected = correctLines[idx] ?? line.correctAnswer ?? line.text
      return normalizeAnswer(values[line.id] ?? '') === normalizeAnswer(expected)
    })

    if (allCorrect) {
      setFeedback('Pseudocode is correct. Your logic translates cleanly to executable steps.')
      setVerified(true)
    } else {
      setFeedback('One or more lines do not match the required logic. Review inputs, operations, and outputs.')
    }
  }

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <span className="text-xs font-mono text-forge-accent uppercase tracking-widest">
          Phase 3 — Pseudocode
        </span>
        <h2 className="text-xl font-bold mt-1">Complete the Pseudocode</h2>
        <p className="text-forge-muted text-sm mt-1">
          Fill in the missing lines. Perfect syntax is not required — focus on the logic.
        </p>
      </div>

      <div className="font-mono text-sm bg-forge-bg rounded-xl p-5 border border-forge-border mb-4 space-y-2">
        {template.map((line, idx) => (
          <div key={line.id} className="flex items-center gap-3">
            <span className="text-forge-muted select-none w-6 text-right">{String(idx + 1).padStart(2, '0')}</span>
            {line.editable ? (
              <input
                type="text"
                value={values[line.id] ?? ''}
                onChange={(e) => {
                  setValues((v) => ({ ...v, [line.id]: e.target.value }))
                  setVerified(false)
                  setFeedback(null)
                }}
                placeholder={line.placeholder ?? '...'}
                className="flex-1 bg-forge-card border border-forge-border rounded px-3 py-1.5 text-forge-accent focus:outline-none focus:border-forge-accent/50"
              />
            ) : (
              <span className="text-forge-text">{line.text}</span>
            )}
          </div>
        ))}
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            verified
              ? 'bg-forge-success/10 border border-forge-success/30 text-forge-success'
              : 'bg-forge-warning/10 border border-forge-warning/30 text-forge-warning'
          }`}
        >
          {feedback}
        </div>
      )}

      <div className="flex gap-3">
        {!verified && <Button onClick={handleVerify}>Verify Pseudocode</Button>}
        {verified && (
          <Button onClick={onComplete} icon={CheckCircle2}>
            Continue to Challenge
          </Button>
        )}
      </div>
    </div>
  )
}
