import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, Lightbulb, FileText, Brain, Code2, Target, Lock,
} from 'lucide-react'
import { getMissionById, mission04Steps, mission04CorrectOrder } from '../data/levels'
import { useGameProgress } from '../context/ProgressContext'
import { calculateMissionScore } from '../hooks/useProgress'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { HintPanel } from '../components/ui/HintPanel'
import { UnderstandPhase } from '../components/mission/UnderstandPhase'
import { LogicPhase } from '../components/mission/LogicPhase'
import { PseudocodePhase } from '../components/mission/PseudocodePhase'
import { ConceptReveal } from '../components/mission/ConceptReveal'
import { MissionComplete } from '../components/mission/MissionComplete'
import { SequenceChallenge } from '../components/challenges/SequenceChallenge'
import { OrderChallenge } from '../components/challenges/OrderChallenge'
import { DebugChallenge } from '../components/challenges/DebugChallenge'
import { DecisionChallenge } from '../components/challenges/DecisionChallenge'
import { RepetitionChallenge } from '../components/challenges/RepetitionChallenge'
import { VariablesChallenge } from '../components/challenges/VariablesChallenge'
import { ProblemAnalysisChallenge } from '../components/challenges/ProblemAnalysisChallenge'
import { BossTestChallenge } from '../components/challenges/BossTestChallenge'
import type { MissionPhase } from '../types'

const PHASES: { id: MissionPhase; label: string; icon: typeof FileText }[] = [
  { id: 'brief', label: 'Brief', icon: FileText },
  { id: 'understand', label: 'Understand', icon: Brain },
  { id: 'logic', label: 'Logic', icon: Target },
  { id: 'pseudocode', label: 'Pseudocode', icon: Code2 },
  { id: 'challenge', label: 'Challenge', icon: Target },
  { id: 'concept', label: 'Discover', icon: Lightbulb },
]

export function MissionPage() {
  const { missionId } = useParams<{ missionId: string }>()
  const navigate = useNavigate()
  const { progress, completeMission, useHint: consumeHint, getHintsUsed, isUnlocked } = useGameProgress()

  const data = missionId ? getMissionById(missionId) : null
  const [phase, setPhase] = useState<MissionPhase>('brief')
  const [showHints, setShowHints] = useState(false)
  const [challengeComplete, setChallengeComplete] = useState(false)
  const [finalized, setFinalized] = useState(false)

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-forge-muted mb-4">Mission not found.</p>
        <Link to="/"><Button variant="outline">Back to Dashboard</Button></Link>
      </div>
    )
  }

  const { mission, level } = data
  const { challenge } = mission
  const unlocked = isUnlocked(mission.id)
  const hintsUsed = getHintsUsed(mission.id)
  if (!unlocked) {
    return (
      <div className="text-center py-20">
        <Lock className="w-12 h-12 text-forge-muted mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Mission Locked</h2>
        <p className="text-forge-muted mb-4">Complete the previous mission to unlock this one.</p>
        <Link to="/"><Button variant="outline">Back to Dashboard</Button></Link>
      </div>
    )
  }

  const visiblePhases = PHASES.filter((p) => {
    if (p.id === 'pseudocode' && !challenge.pseudocode) return false
    if (p.id === 'logic' && !challenge.logicBlocks) return false
    return true
  })

  const goNext = () => {
    const idx = visiblePhases.findIndex((p) => p.id === phase)
    if (idx < visiblePhases.length - 1) {
      setPhase(visiblePhases[idx + 1].id)
    }
  }

  const handleChallengeSuccess = () => {
    setChallengeComplete(true)
    setPhase('concept')
  }

  const handleConceptContinue = () => {
    if (!finalized) {
      if (!progress.completedMissions.includes(mission.id)) {
        completeMission(mission.id, challenge.xp, hintsUsed)
      }
      setFinalized(true)
    }
  }

  const { xp: xpEarned, score } = calculateMissionScore(challenge.xp, hintsUsed)

  const renderChallenge = () => {
    switch (challenge.type) {
      case 'sequence':
        if (challenge.robot) {
          return <SequenceChallenge robot={challenge.robot} onSuccess={handleChallengeSuccess} />
        }
        if (mission.id === 'mission-04') {
          return (
            <OrderChallenge
              steps={mission04Steps}
              correctOrder={mission04CorrectOrder}
              onSuccess={handleChallengeSuccess}
            />
          )
        }
        return null
      case 'problem-analysis':
        return <ProblemAnalysisChallenge onSuccess={handleChallengeSuccess} />
      case 'debug':
        return challenge.debug ? (
          <DebugChallenge debug={challenge.debug} onSuccess={handleChallengeSuccess} />
        ) : null
      case 'decision':
        return challenge.decision ? (
          <DecisionChallenge decision={challenge.decision} onSuccess={handleChallengeSuccess} />
        ) : null
      case 'repetition':
        return challenge.repetition ? (
          <RepetitionChallenge repetition={challenge.repetition} onSuccess={handleChallengeSuccess} />
        ) : null
      case 'variables':
        return challenge.variables ? (
          <VariablesChallenge variables={challenge.variables} onSuccess={handleChallengeSuccess} />
        ) : null
      case 'boss':
        return challenge.boss ? (
          <BossTestChallenge boss={challenge.boss} onSuccess={handleChallengeSuccess} />
        ) : null
      default:
        return null
    }
  }

  if (finalized) {
    const nextId = mission.id === 'boss-01' ? null : (
      level.missions.find((m) => m.number === mission.number + 1)?.id ?? null
    )
    const result = progress.missionResults[mission.id]
    return (
      <MissionComplete
        challenge={challenge}
        xpEarned={result?.xpEarned ?? xpEarned}
        score={result?.score ?? score}
        isBoss={challenge.isBoss}
        nextMissionId={nextId}
      />
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-forge-muted hover:text-forge-text transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Dashboard
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-forge-muted">{level.subtitle}</span>
          <Button
            variant="ghost"
            size="sm"
            icon={Lightbulb}
            onClick={() => setShowHints(!showHints)}
          >
            Hint
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <span className="text-xs font-mono text-forge-accent">
          Mission {String(mission.number).padStart(2, '0')}
          {challenge.isBoss && ' — FINAL BOSS'}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold mt-1">{mission.title}</h1>
        <p className="text-forge-muted text-sm mt-1">{mission.subtitle}</p>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {visiblePhases.map((p, i) => {
          const Icon = p.icon
          const current = p.id === phase
          const done = visiblePhases.findIndex((x) => x.id === phase) > i
          return (
            <div key={p.id} className="flex items-center gap-1 shrink-0">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  current
                    ? 'bg-forge-accent/20 text-forge-accent border border-forge-accent/40'
                    : done
                      ? 'bg-forge-success/10 text-forge-success'
                      : 'bg-forge-card text-forge-muted border border-forge-border'
                }`}
              >
                <Icon className="w-3 h-3" />
                {p.label}
              </div>
              {i < visiblePhases.length - 1 && (
                <div className={`w-4 h-px ${done ? 'bg-forge-success' : 'bg-forge-border'}`} />
              )}
            </div>
          )
        })}
      </div>

      {showHints && (
        <div className="mb-6">
          <HintPanel
            hints={challenge.hints}
            hintsUsed={hintsUsed}
            onUseHint={() => consumeHint(mission.id)}
            onClose={() => setShowHints(false)}
          />
        </div>
      )}

      {phase === 'brief' && (
        <div className="animate-slide-up">
          <Card className="mb-6">
            <h2 className="text-sm font-mono text-forge-accent uppercase tracking-wider mb-3">
              Problem Statement
            </h2>
            <div className="text-forge-text leading-relaxed whitespace-pre-line">
              {challenge.problemStatement}
            </div>
          </Card>
          <Button onClick={goNext}>Begin Analysis</Button>
        </div>
      )}

      {phase === 'understand' && challenge.understand && (
        <UnderstandPhase questions={challenge.understand} onComplete={goNext} />
      )}

      {phase === 'logic' && challenge.logicBlocks && (
        <LogicPhase
          blocks={challenge.logicBlocks.blocks}
          correctOrder={challenge.logicBlocks.correctOrder}
          onComplete={goNext}
        />
      )}

      {phase === 'pseudocode' && challenge.pseudocode && (
        <PseudocodePhase
          template={challenge.pseudocode.template}
          correctLines={challenge.pseudocode.correctLines}
          onComplete={goNext}
        />
      )}

      {phase === 'challenge' && (
        <div className="animate-slide-up">
          <div className="mb-6">
            <span className="text-xs font-mono text-forge-accent uppercase tracking-widest">
              Phase — Solve the Challenge
            </span>
            <h2 className="text-xl font-bold mt-1">Execute Your Solution</h2>
          </div>
          {renderChallenge()}
        </div>
      )}

      {phase === 'concept' && challengeComplete && (
        <ConceptReveal challenge={challenge} onContinue={handleConceptContinue} />
      )}
    </div>
  )
}
