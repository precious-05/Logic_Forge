import { useState } from 'react'
import { CheckCircle2, Lightbulb, Code2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { PseudocodeLine } from '../../types'
import { checkPseudocodeAnswer } from '../../utils/helpers'

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
            Phase 3: Pseudocode
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
      return checkPseudocodeAnswer(values[line.id] ?? '', expected, line.acceptedAnswers)
    })

    if (allCorrect) {
      setFeedback('Pseudocode is correct. Your logic translates cleanly to executable steps.')
      setVerified(true)
    } else {
      setFeedback('One or more lines do not match the required logic. Check the format hint below each field.')
    }
  }

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <span className="text-xs font-mono text-forge-accent uppercase tracking-widest flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5" />
          Phase 3: Pseudocode
        </span>
        <h2 className="text-xl font-bold mt-1">Complete the Pseudocode</h2>
        <p className="text-forge-muted text-sm mt-1">
          Fill in the missing lines. Spacing and casing are flexible - focus on the logic.
        </p>
      </div>

      <div className="font-mono text-sm bg-forge-bg rounded-xl p-5 border border-forge-border mb-4 space-y-3">
        {template.map((line, idx) => (
          <div key={line.id} className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-forge-muted select-none w-6 text-right font-semibold">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {line.editable ? (
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="text"
                    value={values[line.id] ?? ''}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, [line.id]: e.target.value }))
                      setVerified(false)
                      setFeedback(null)
                    }}
                    placeholder={line.placeholder ?? 'Enter instruction expression...'}
                    className="w-full bg-forge-card border border-forge-border rounded-lg px-3.5 py-2 text-forge-accent font-mono focus:outline-none focus:border-forge-accent focus:neon-glow-accent transition-all"
                  />
                  {line.formatHint && (
                    <div className="flex items-center gap-1 text-[11px] text-forge-muted font-sans ml-1">
                      <Lightbulb className="w-3 h-3 text-forge-warning shrink-0" />
                      <span>Format hint: <code className="text-forge-accent font-mono">{line.formatHint}</code></span>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-forge-text py-1.5">{line.text}</span>
              )}
            </div>
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
