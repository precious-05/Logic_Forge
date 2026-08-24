import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'

interface ProblemAnalysisChallengeProps {
  onSuccess: () => void
}

const slots = [
  { id: 'input', label: 'INPUT', description: 'Data given to the program' },
  { id: 'process', label: 'PROCESS', description: 'Operation performed on the data' },
  { id: 'output', label: 'OUTPUT', description: 'Result the program produces' },
]

export function ProblemAnalysisChallenge({ onSuccess }: ProblemAnalysisChallengeProps) {
  const [assignments, setAssignments] = useState<Record<string, string | null>>({
    input: null,
    process: null,
    output: null,
  })
  const [feedback, setFeedback] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const terms = ['Given values', 'Calculation / Logic', 'Required result']

  const handleAssign = (slotId: string, term: string) => {
    setAssignments((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((k) => {
        if (next[k] === term) next[k] = null
      })
      next[slotId] = term
      return next
    })
    setFeedback(null)
    setSuccess(false)
  }

  const handleSubmit = () => {
    const correct =
      assignments.input === 'Given values' &&
      assignments.process === 'Calculation / Logic' &&
      assignments.output === 'Required result'

    if (correct) {
      setFeedback('Analysis confirmed. Input → Process → Output model is correctly identified.')
      setSuccess(true)
      setTimeout(onSuccess, 1000)
    } else {
      setFeedback('Your input is partially correct, but the mapping does not produce the required model. Reconsider which part receives data, transforms it, and produces results.')
    }
  }

  const allAssigned = Object.values(assignments).every(Boolean)

  return (
    <div>
      <p className="text-sm text-forge-muted mb-4">
        Match each programming concept to its role in solving the problem:
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {slots.map((slot) => (
          <div key={slot.id} className="glass-panel rounded-xl p-4">
            <p className="font-mono text-xs text-forge-accent mb-1">{slot.label}</p>
            <p className="text-xs text-forge-muted mb-3">{slot.description}</p>
            <div
              className={`min-h-[44px] px-3 py-2 rounded-lg border border-dashed flex items-center justify-center text-sm ${
                assignments[slot.id]
                  ? 'border-forge-accent bg-forge-accent/10 text-forge-text'
                  : 'border-forge-border text-forge-muted'
              }`}
            >
              {assignments[slot.id] ?? 'Drop here'}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {terms.map((term) => {
          const isUsed = Object.values(assignments).includes(term)
          return (
            <button
              key={term}
              disabled={isUsed}
              onClick={() => {
                const empty = slots.find((s) => !assignments[s.id])
                if (empty) handleAssign(empty.id, term)
              }}
              className={`px-4 py-2 rounded-lg border text-sm font-mono transition-all cursor-pointer ${
                isUsed
                  ? 'opacity-30 cursor-not-allowed border-forge-border'
                  : 'border-forge-border bg-forge-card hover:border-forge-accent/50'
              }`}
            >
              {term}
            </button>
          )
        })}
      </div>

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
        <Button onClick={handleSubmit} icon={CheckCircle2} disabled={!allAssigned}>
          Confirm Analysis
        </Button>
      )}
    </div>
  )
}
