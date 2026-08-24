import { useState } from 'react'
import { GitBranch, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Challenge } from '../../types'

interface DecisionChallengeProps {
  decision: NonNullable<Challenge['decision']>
  onSuccess: () => void
}

export function DecisionChallenge({ decision, onSuccess }: DecisionChallengeProps) {
  const [trueAction, setTrueAction] = useState<string | null>(null)
  const [falseAction, setFalseAction] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const actions = [decision.branches[0].action, decision.branches[1].action]

  const handleSubmit = () => {
    if (!trueAction || !falseAction) {
      setFeedback('Assign an action to both the true and false branches.')
      return
    }

    const passAction = decision.branches[0].action
    const failAction = decision.branches[1].action

    if (trueAction === passAction && falseAction === failAction) {
      setFeedback('Decision flow is correct. The program handles both passing and failing cases.')
      setSuccess(true)
      setTimeout(onSuccess, 1000)
    } else {
      setFeedback('Think about what happens when the condition is false. Which action belongs on each branch?')
    }
  }

  return (
    <div>
      <div className="glass-panel rounded-xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-forge-warning" />
          <span className="font-mono text-sm text-forge-warning">IF {decision.condition}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-forge-success/30 bg-forge-success/5">
            <p className="text-xs font-mono text-forge-success mb-3 uppercase">True Branch</p>
            <div className="space-y-2">
              {actions.map((action) => (
                <button
                  key={`true-${action}`}
                  onClick={() => { setTrueAction(action); setSuccess(false); setFeedback(null) }}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm font-mono cursor-pointer transition-all ${
                    trueAction === action
                      ? 'border-forge-success bg-forge-success/20'
                      : 'border-forge-border hover:border-forge-success/40'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-forge-danger/30 bg-forge-danger/5">
            <p className="text-xs font-mono text-forge-danger mb-3 uppercase">False Branch</p>
            <div className="space-y-2">
              {actions.map((action) => (
                <button
                  key={`false-${action}`}
                  onClick={() => { setFalseAction(action); setSuccess(false); setFeedback(null) }}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm font-mono cursor-pointer transition-all ${
                    falseAction === action
                      ? 'border-forge-danger bg-forge-danger/20'
                      : 'border-forge-border hover:border-forge-danger/40'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
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
        <Button onClick={handleSubmit} icon={CheckCircle2}>
          Verify Decision Flow
        </Button>
      )}
    </div>
  )
}
