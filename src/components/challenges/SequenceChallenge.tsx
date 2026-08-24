import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Play, RotateCcw, ArrowUp, CornerUpLeft, CornerUpRight, GripVertical, Trash2, HelpCircle, Lightbulb } from 'lucide-react'
import { Button } from '../ui/Button'
import { RobotGrid } from './RobotGrid'
import { HowToPlayModal } from '../ui/HowToPlayModal'
import type { RobotConfig } from '../../types'
import { simulateRobot, initRobot } from '../../utils/helpers'

interface SequenceChallengeProps {
  robot: RobotConfig
  onSuccess: () => void
}

type Instr = 'forward' | 'left' | 'right'

const INSTR_LABELS: Record<Instr, { label: string; icon: typeof ArrowUp }> = {
  forward: { label: 'MOVE FORWARD', icon: ArrowUp },
  left: { label: 'TURN LEFT', icon: CornerUpLeft },
  right: { label: 'TURN RIGHT', icon: CornerUpRight },
}

function SortableInstruction({ id, instr, onRemove }: { id: string; instr: Instr; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const { label, icon: Icon } = INSTR_LABELS[instr]
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="instr-block-neon flex items-center gap-2 px-3 py-2 rounded-lg bg-forge-accent/10 border border-forge-accent/40 font-mono text-xs shrink-0 neon-glow-accent"
    >
      <span {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="w-3 h-3 text-forge-muted" />
      </span>
      <Icon className="w-3.5 h-3.5 text-forge-accent icon-neon" />
      {label}
      <button onClick={onRemove} className="ml-1 text-forge-muted hover:text-forge-danger cursor-pointer" title="Remove command">
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  )
}

export function SequenceChallenge({ robot, onSuccess }: SequenceChallengeProps) {
  const [sequence, setSequence] = useState<{ id: string; instr: Instr }[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [robotState, setRobotState] = useState(() => initRobot(robot.grid, robot.startDirection))
  const [stepIndex, setStepIndex] = useState(-1)
  const [lastAction, setLastAction] = useState<'forward' | 'left' | 'right' | 'start' | null>(null)
  const [missionSuccess, setMissionSuccess] = useState(false)
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const addInstruction = (instr: Instr) => {
    setSequence((prev) => [...prev, { id: `${instr}-${Date.now()}`, instr }])
    setFeedback(null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSequence((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id)
        const newIndex = prev.findIndex((s) => s.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  const runMission = async () => {
    if (sequence.length === 0) {
      setFeedback('Add at least one instruction before running the mission.')
      return
    }

    setRunning(true)
    setFeedback(null)
    setMissionSuccess(false)
    const instructions = sequence.map((s) => s.instr)
    const result = simulateRobot(robot.grid, robot.startDirection, instructions)

    for (let i = 0; i < result.steps.length; i++) {
      setStepIndex(i)
      setLastAction(result.steps[i].action === 'Turn Left' ? 'left' :
        result.steps[i].action === 'Turn Right' ? 'right' :
        result.steps[i].action === 'Move Forward' ? 'forward' : 'start')
      setRobotState(result.steps[i].state)
      await new Promise((r) => setTimeout(r, 450))
    }

    setRunning(false)
    setLastAction(null)

    if (result.success) {
      setMissionSuccess(true)
      setFeedback(result.message)
      setTimeout(onSuccess, 1500)
    } else {
      setFeedback(result.message)
    }
  }

  const reset = () => {
    setSequence([])
    setRobotState(initRobot(robot.grid, robot.startDirection))
    setStepIndex(-1)
    setLastAction(null)
    setMissionSuccess(false)
    setFeedback(null)
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <RobotGrid
          grid={robot.grid}
          robotState={robotState}
          animating={running && stepIndex >= 0}
          lastAction={lastAction}
          missionSuccess={missionSuccess}
        />

        <div className="flex-1">
          {/* Quick Helper / Tutorial Prompt */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-forge-muted font-medium">Build your instruction sequence:</p>
            <button
              onClick={() => setShowHowToPlay(true)}
              className="flex items-center gap-1 text-xs font-mono text-forge-accent hover:underline cursor-pointer bg-forge-accent/10 px-2.5 py-1 rounded-lg border border-forge-accent/30"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How to Control Robot?</span>
            </button>
          </div>

          {/* Quick Direction Tip */}
          <div className="mb-4 p-2.5 rounded-lg bg-forge-card/80 border border-forge-border flex items-start gap-2 text-xs text-forge-muted">
            <Lightbulb className="w-4 h-4 text-forge-warning shrink-0 mt-0.5" />
            <p>
              <strong className="text-forge-text">Movement Rule:</strong> The robot always moves forward relative to its facing direction. To move <strong>Downwards</strong>, add <span className="text-forge-warning font-mono">TURN RIGHT</span> first, followed by <span className="text-forge-accent font-mono">MOVE FORWARD</span>.
            </p>
          </div>

          {/* Instruction buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(INSTR_LABELS) as Instr[]).map((instr) => {
              const { label, icon: Icon } = INSTR_LABELS[instr]
              return (
                <button
                  key={instr}
                  onClick={() => addInstruction(instr)}
                  disabled={running}
                  className="instr-btn-neon flex items-center gap-1.5 px-3 py-2 rounded-lg border border-forge-border bg-forge-card text-xs font-mono cursor-pointer disabled:opacity-50 hover:border-forge-accent/60"
                >
                  <Icon className="w-3.5 h-3.5 text-forge-accent" />
                  {label}
                </button>
              )
            })}
          </div>

          {/* DND Sequence Queue */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sequence.map((s) => s.id)} strategy={horizontalListSortingStrategy}>
              <div className={`flex flex-wrap gap-2 min-h-[52px] p-3 rounded-lg border border-dashed bg-forge-bg/50 transition-all duration-300 ${
                running ? 'border-forge-accent/40 neon-glow-accent' : 'border-forge-border'
              }`}>
                {sequence.length === 0 && (
                  <span className="text-xs text-forge-muted self-center">
                    Click buttons above to add instructions (e.g. Forward, Turn Right, etc.)
                  </span>
                )}
                {sequence.map((s, i) => (
                  <div key={s.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <SortableInstruction
                      id={s.id}
                      instr={s.instr}
                      onRemove={() => setSequence((prev) => prev.filter((x) => x.id !== s.id))}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm animate-slide-up ${
            feedback.includes('complete') || missionSuccess
              ? 'bg-forge-success/10 border border-forge-success/40 text-forge-success neon-glow-success'
              : 'bg-forge-warning/10 border border-forge-warning/30 text-forge-warning'
          }`}
        >
          {feedback}
        </div>
      )}

      <div className="flex gap-3">
        <Button icon={Play} onClick={runMission} loading={running} className={running ? 'animate-glow-pulse' : ''}>
          Run Mission
        </Button>
        <Button variant="ghost" icon={RotateCcw} onClick={reset} disabled={running}>
          Reset
        </Button>
      </div>

      {/* Interactive Cadet Field Manual Modal */}
      <HowToPlayModal open={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
    </div>
  )
}
