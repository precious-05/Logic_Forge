import { useState } from 'react'
import { Bug, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Challenge } from '../../types'

interface DebugChallengeProps {
  debug: NonNullable<Challenge['debug']>
  onSuccess: () => void
}

export function DebugChallenge({ debug, onSuccess }: DebugChallengeProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [selectedFix, setSelectedFix] = useState<string | null>(null)
  const [phase, setPhase] = useState<'find' | 'fix' | 'done'>('find')
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleFindBug = () => {
    if (!selectedStep) return
    if (selectedStep === debug.bugStepId) {
      setFeedback('Correct. That line contains the logical error. Now select the fix.')
      setPhase('fix')
    } else {
      setFeedback('That step is logically correct. Trace the calculation again — which line uses the wrong operation or missing value?')
    }
  }

  const handleApplyFix = () => {
    if (!selectedFix) return
    const fix = debug.fixOptions.find((f) => f.id === selectedFix)
    if (fix?.correct) {
      setFeedback('Fix applied. The program now includes all three scores in the total.')
      setPhase('done')
      setTimeout(onSuccess, 1000)
    } else {
      setFeedback('That correction does not produce the correct average. Re-read the problem requirements.')
    }
  }

  return (
    <div>
      <div className="font-mono text-sm bg-forge-bg rounded-xl p-5 border border-forge-border mb-4 space-y-1">
        {debug.steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => phase === 'find' && setSelectedStep(step.id)}
            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer ${
              selectedStep === step.id
                ? 'bg-forge-accent/10 border border-forge-accent/40'
                : phase === 'done' && step.isBug
                  ? 'bg-forge-success/10 border border-forge-success/30'
                  : 'hover:bg-forge-card'
            }`}
          >
            <span className="text-forge-muted w-6">{String(idx + 1).padStart(2, '0')}</span>
            <span className={phase === 'done' && step.isBug ? 'text-forge-success line-through decoration-forge-danger' : ''}>
              {step.text}
            </span>
            {phase === 'done' && step.isBug && (
              <Bug className="w-4 h-4 text-forge-danger ml-auto" />
            )}
          </button>
        ))}
      </div>

      {phase === 'fix' && (
        <div className="mb-4">
          <p className="text-sm text-forge-muted mb-3">Select the correct fix for the bug:</p>
          <div className="space-y-2">
            {debug.fixOptions.map((fix) => (
              <button
                key={fix.id}
                onClick={() => setSelectedFix(fix.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border font-mono text-sm transition-all cursor-pointer ${
                  selectedFix === fix.id
                    ? 'border-forge-accent bg-forge-accent/10'
                    : 'border-forge-border bg-forge-card hover:border-forge-accent/30'
                }`}
              >
                {fix.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            phase === 'done'
              ? 'bg-forge-success/10 border border-forge-success/30 text-forge-success'
              : 'bg-forge-warning/10 border border-forge-warning/30 text-forge-warning'
          }`}
        >
          {feedback}
        </div>
      )}

      <div className="flex gap-3">
        {phase === 'find' && (
          <Button onClick={handleFindBug} icon={Bug} disabled={!selectedStep}>
            Identify Bug
          </Button>
        )}
        {phase === 'fix' && (
          <Button onClick={handleApplyFix} icon={CheckCircle2} disabled={!selectedFix}>
            Apply Fix
          </Button>
        )}
      </div>
    </div>
  )
}
