import { useState } from 'react'
import { Play, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Challenge } from '../../types'

interface BossTestChallengeProps {
  boss: NonNullable<Challenge['boss']>
  onSuccess: () => void
}

export function BossTestChallenge({ boss, onSuccess }: BossTestChallengeProps) {
  const [results, setResults] = useState<Record<number, string>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const runTest = (index: number) => {
    const tc = boss.testCases[index]
    const spaces = tc.input.spaces as number

    let output: string
    if (spaces > 0) {
      output = `Entry allowed. Spaces: ${spaces - 1}`
    } else {
      output = 'Parking Full'
    }

    setResults((prev) => ({ ...prev, [index]: output }))
  }

  const runAllTests = () => {
    boss.testCases.forEach((_, i) => runTest(i))
  }

  const handleVerify = () => {
    const allPass = boss.testCases.every((tc, i) => results[i] === tc.expectedOutput)
    if (allPass) {
      setFeedback('All test cases pass. The Smart Parking System works correctly.')
      setSuccess(true)
      setTimeout(onSuccess, 1000)
    } else {
      setFeedback('Some test cases fail. Review the condition and what happens when spaces equals zero.')
    }
  }

  const allRun = boss.testCases.every((_, i) => results[i] !== undefined)

  return (
    <div>
      <p className="text-sm text-forge-muted mb-4">
        Test your parking system logic with these scenarios. Run each test case and verify the output.
      </p>

      <div className="space-y-3 mb-4">
        {boss.testCases.map((tc, i) => (
          <div key={i} className="glass-panel rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-sm">
                <span className="text-forge-muted">spaces = </span>
                <span className="text-forge-accent">{String(tc.input.spaces)}</span>
              </div>
              <Button variant="outline" size="sm" icon={Play} onClick={() => runTest(i)}>
                Run Test
              </Button>
            </div>
            {results[i] && (
              <div className="mt-3 flex items-center gap-3 text-sm">
                <span className="text-forge-muted">Output:</span>
                <span className={results[i] === tc.expectedOutput ? 'text-forge-success' : 'text-forge-danger'}>
                  {results[i]}
                </span>
                {results[i] === tc.expectedOutput ? (
                  <CheckCircle2 className="w-4 h-4 text-forge-success" />
                ) : (
                  <span className="text-forge-muted text-xs">Expected: {tc.expectedOutput}</span>
                )}
              </div>
            )}
          </div>
        ))}
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

      <div className="flex gap-3">
        <Button variant="outline" icon={Play} onClick={runAllTests}>
          Run All Tests
        </Button>
        {allRun && !success && (
          <Button onClick={handleVerify} icon={CheckCircle2}>
            Verify Results
          </Button>
        )}
      </div>
    </div>
  )
}
