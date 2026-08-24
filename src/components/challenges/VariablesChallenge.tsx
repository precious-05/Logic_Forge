import { useState } from 'react'
import { Database, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Challenge, VariableState } from '../../types'

interface VariablesChallengeProps {
  variables: NonNullable<Challenge['variables']>
  onSuccess: () => void
}

function VariableDisplay({ state }: { state: VariableState[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {state.map((v) => (
        <div
          key={v.name}
          className="px-4 py-2 rounded-lg bg-forge-card border border-forge-border font-mono text-sm"
        >
          <span className="text-forge-secondary">{v.name}</span>
          <span className="text-forge-muted mx-2">=</span>
          <span className="text-forge-accent">{v.value}</span>
        </div>
      ))}
    </div>
  )
}

export function VariablesChallenge({ variables, onSuccess }: VariablesChallengeProps) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [displayState, setDisplayState] = useState(variables.initialState)

  const scenario = variables.scenarios[currentScenario]
  const allDone = currentScenario >= variables.scenarios.length

  const handleSubmit = () => {
    if (selected === null) return
    if (selected === scenario.correctIndex) {
      const nextState = [...scenario.stateBefore]
      if (scenario.operation.includes('coins + 10')) {
        const c = nextState.find((v) => v.name === 'coins')
        if (c) c.value = Number(c.value) + 10
      } else if (scenario.operation.includes('lives - 1')) {
        const l = nextState.find((v) => v.name === 'lives')
        if (l) l.value = Number(l.value) - 1
      }
      setDisplayState(nextState)
      setFeedback('Correct. The variable updated as expected.')

      if (currentScenario < variables.scenarios.length - 1) {
        setTimeout(() => {
          setCurrentScenario((c) => c + 1)
          setSelected(null)
          setFeedback(null)
        }, 800)
      } else {
        setTimeout(onSuccess, 1000)
      }
    } else {
      setFeedback('That value does not match. Apply the operation to the current variable state.')
    }
  }

  if (allDone) return null

  return (
    <div>
      <div className="glass-panel rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-forge-secondary" />
          <span className="text-sm font-medium">Memory State</span>
        </div>
        <VariableDisplay state={displayState} />
        <p className="text-xs text-forge-muted mt-3 font-mono">{scenario.operation}</p>
      </div>

      <p className="text-sm font-medium mb-3">
        Scenario {currentScenario + 1}/{variables.scenarios.length}: {scenario.question}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {scenario.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => { setSelected(idx); setFeedback(null) }}
            className={`px-4 py-3 rounded-lg border font-mono text-sm transition-all cursor-pointer ${
              selected === idx
                ? 'border-forge-accent bg-forge-accent/10'
                : 'border-forge-border bg-forge-card hover:border-forge-accent/30'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            feedback.startsWith('Correct')
              ? 'bg-forge-success/10 border border-forge-success/30 text-forge-success'
              : 'bg-forge-warning/10 border border-forge-warning/30 text-forge-warning'
          }`}
        >
          {feedback}
        </div>
      )}

      <Button onClick={handleSubmit} icon={CheckCircle2} disabled={selected === null}>
        Check Answer
      </Button>
    </div>
  )
}
