import { Trophy, Star, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'
import type { Challenge } from '../../types'

interface MissionCompleteProps {
  challenge: Challenge
  xpEarned: number
  score: number
  isBoss?: boolean
  nextMissionId: string | null
}

export function MissionComplete({
  challenge,
  xpEarned,
  score,
  isBoss,
  nextMissionId,
}: MissionCompleteProps) {
  if (isBoss) {
    return (
      <div className="animate-slide-up text-center max-w-2xl mx-auto py-8">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-2xl border-2 border-forge-accent/30 animate-success-burst" />
          <div className="relative w-24 h-24 rounded-2xl bg-forge-accent/10 border-2 border-forge-accent/40 flex items-center justify-center neon-glow-accent animate-float">
            <Trophy className="w-12 h-12 text-forge-accent icon-neon" />
          </div>
        </div>

        <span className="text-sm font-mono text-forge-accent uppercase tracking-[0.3em]">
          Level 01 Complete
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-gradient">
          The Logic Core is Yours
        </h1>
        <p className="text-lg text-forge-muted leading-relaxed mb-2">
          You are no longer just following instructions.
        </p>
        <p className="text-lg text-forge-text leading-relaxed mb-8">
          You are beginning to think like a programmer.
        </p>

        <div className="glass-panel rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-forge-warning" />
            Concepts Mastered
          </h3>
          <ul className="grid md:grid-cols-2 gap-2">
            {challenge.conceptsLearned.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-forge-muted">
                <ChevronRight className="w-3 h-3 text-forge-accent shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="text-center animate-xp-pop">
            <p className="text-2xl font-bold text-neon-accent">+{xpEarned}</p>
            <p className="text-xs text-forge-muted uppercase">XP Earned</p>
          </div>
          <div className="text-center animate-xp-pop" style={{ animationDelay: '0.15s' }}>
            <p className="text-2xl font-bold text-forge-warning">{score}</p>
            <p className="text-xs text-forge-muted uppercase">Score</p>
          </div>
        </div>

        <Link to="/">
          <Button size="lg" icon={ArrowRight}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-slide-up text-center max-w-md mx-auto py-8">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-2xl animate-success-burst border border-forge-success/30" />
        <div className="relative w-16 h-16 rounded-2xl bg-forge-success/10 border border-forge-success/40 flex items-center justify-center neon-glow-success">
          <Trophy className="w-8 h-8 text-forge-success icon-neon" />
        </div>
      </div>

      <span className="text-xs font-mono text-forge-success uppercase tracking-widest">
        Mission Complete
      </span>
      <h2 className="text-2xl font-bold mt-2 mb-2">{challenge.title}</h2>

      <div className="flex items-center justify-center gap-6 my-6">
        <div className="animate-xp-pop">
          <p className="text-xl font-bold text-neon-accent">+{xpEarned}</p>
          <p className="text-xs text-forge-muted">XP</p>
        </div>
        <div className="animate-xp-pop" style={{ animationDelay: '0.1s' }}>
          <p className="text-xl font-bold text-forge-warning">{score}</p>
          <p className="text-xs text-forge-muted">Score</p>
        </div>
      </div>

      <ProgressBar value={score} label="Mission Score" color="accent" />

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        {nextMissionId ? (
          <Link to={`/mission/${nextMissionId}`}>
            <Button size="lg" icon={ArrowRight}>
              Next Mission
            </Button>
          </Link>
        ) : null}
        <Link to="/">
          <Button variant="outline" size="lg">
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
