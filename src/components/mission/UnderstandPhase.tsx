import { useState } from 'react'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'
import type { UnderstandQuestion } from '../../types'

interface UnderstandPhaseProps {
  questions: UnderstandQuestion[]
  onComplete: () => void
}

export function UnderstandPhase({ questions, onComplete }: UnderstandPhaseProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; text: string } | null>(null)
  const question = questions[currentQ]

  const handleSubmit = () => {
    if (selected === null) return
    const isCorrect = selected === question.correctIndex

    if (isCorrect) {
      setFeedback({
        type: 'correct',
        text: question.feedback?.correct ?? 'Correct analysis.',
      })
    } else {
      setFeedback({
        type: 'incorrect',
        text: question.feedback?.incorrect ?? 'Reconsider the problem statement before selecting again.',
      })
    }
  }

  const handleNext = () => {
    setFeedback(null)
    setSelected(null)
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    }
  }

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <span className="text-xs font-mono text-forge-accent uppercase tracking-widest">
          Phase 1 — Understand the Problem
        </span>
        <h2 className="text-xl font-bold mt-1">Analyze Before You Solve</h2>
        <p className="text-forge-muted text-sm mt-1">
          Question {currentQ + 1} of {questions.length}
        </p>
      </div>

      <div className="glass-panel rounded-xl p-6 mb-4">
        <p className="text-lg font-medium mb-5">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => !feedback?.type && setSelected(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all cursor-pointer ${
                selected === idx
                  ? 'border-forge-accent bg-forge-accent/10 text-forge-text'
                  : 'border-forge-border bg-forge-card/50 text-forge-muted hover:border-forge-accent/30 hover:text-forge-text'
              } ${feedback && idx === question.correctIndex ? 'border-forge-success bg-forge-success/10' : ''}
              ${feedback?.type === 'incorrect' && selected === idx ? 'border-forge-danger bg-forge-danger/10' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            feedback.type === 'correct'
              ? 'bg-forge-success/10 border border-forge-success/30 text-forge-success'
              : 'bg-forge-danger/10 border border-forge-danger/30 text-forge-danger'
          }`}
        >
          {feedback.text}
        </div>
      )}

      <div className="flex gap-3">
        {!feedback && (
          <Button onClick={handleSubmit} disabled={selected === null}>
            Check Answer
          </Button>
        )}
        {feedback?.type === 'correct' && currentQ < questions.length - 1 && (
          <Button onClick={handleNext} icon={ChevronRight}>
            Next Question
          </Button>
        )}
        {feedback?.type === 'correct' && currentQ === questions.length - 1 && (
          <Button onClick={onComplete} icon={CheckCircle2}>
            Continue to Logic Building
          </Button>
        )}
        {feedback?.type === 'incorrect' && (
          <Button variant="ghost" onClick={() => { setFeedback(null); setSelected(null) }}>
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}
