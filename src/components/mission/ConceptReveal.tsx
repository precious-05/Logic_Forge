import { Brain, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Challenge } from '../../types'

interface ConceptRevealProps {
  challenge: Challenge
  onContinue: () => void
}

export function ConceptReveal({ challenge, onContinue }: ConceptRevealProps) {
  return (
    <div className="animate-slide-up text-center max-w-lg mx-auto">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-2xl bg-forge-accent/20 animate-pulse-ring" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
        <div className="relative w-16 h-16 rounded-2xl bg-forge-accent/10 border border-forge-accent/40 flex items-center justify-center neon-glow-accent animate-float">
          <Brain className="w-8 h-8 text-forge-accent icon-neon" />
        </div>
      </div>

      <span className="text-xs font-mono text-forge-accent uppercase tracking-widest animate-neon-flicker">
        Concept Discovered
      </span>
      <h2 className="text-2xl font-bold mt-2 mb-4 text-gradient animate-text-glow">{challenge.concept}</h2>

      <p className="text-forge-muted leading-relaxed mb-6">{challenge.conceptExplanation}</p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {challenge.conceptsLearned.map((c, i) => (
          <span
            key={c}
            className="px-3 py-1 rounded-full text-xs font-mono bg-forge-accent/10 text-forge-accent border border-forge-accent/30 animate-slide-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {c}
          </span>
        ))}
      </div>

      <Button onClick={onContinue} icon={Sparkles} size="lg" className="animate-glow-pulse">
        Claim XP & Continue
      </Button>
    </div>
  )
}
