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
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { LogicBlock } from '../../types'
import { arraysEqual } from '../../utils/helpers'

interface LogicPhaseProps {
  blocks: LogicBlock[]
  correctOrder: string[]
  onComplete: () => void
}

function SortableBlock({ block }: { block: LogicBlock }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  })

  const typeColors: Record<LogicBlock['type'], string> = {
    start: 'border-forge-success/50 bg-forge-success/5',
    input: 'border-forge-secondary/50 bg-forge-secondary/5',
    process: 'border-forge-accent/50 bg-forge-accent/5',
    decision: 'border-forge-warning/50 bg-forge-warning/5',
    output: 'border-forge-secondary/50 bg-forge-secondary/5',
    end: 'border-forge-danger/50 bg-forge-danger/5',
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${typeColors[block.type]} cursor-grab active:cursor-grabbing`}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-4 h-4 text-forge-muted shrink-0" />
      <span className="font-mono text-sm">{block.label}</span>
    </div>
  )
}

export function LogicPhase({ blocks, correctOrder, onComplete }: LogicPhaseProps) {
  const [items, setItems] = useState(() => [...blocks].sort(() => Math.random() - 0.5))
  const [feedback, setFeedback] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((b) => b.id === active.id)
        const newIndex = prev.findIndex((b) => b.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
      setFeedback(null)
      setVerified(false)
    }
  }

  const handleVerify = () => {
    const order = items.map((b) => b.id)
    if (arraysEqual(order, correctOrder)) {
      setFeedback('Logic flow is correct. Each step follows in the right order.')
      setVerified(true)
    } else {
      const firstWrong = order.findIndex((id, i) => id !== correctOrder[i])
      setFeedback(
        firstWrong >= 0
          ? `The order breaks down at step ${firstWrong + 1}. Consider what must happen before "${items[firstWrong]?.label}".`
          : 'The logic flow has incorrect ordering. Trace from START to END.'
      )
    }
  }

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <span className="text-xs font-mono text-forge-accent uppercase tracking-widest">
          Phase 2 — Build the Logic
        </span>
        <h2 className="text-xl font-bold mt-1">Arrange the Logic Flow</h2>
        <p className="text-forge-muted text-sm mt-1">
          Drag blocks into the correct execution order from START to END.
        </p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 mb-4">
            {items.map((block) => (
              <SortableBlock key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            verified
              ? 'bg-forge-success/10 border border-forge-success/30 text-forge-success'
              : 'bg-forge-warning/10 border border-forge-warning/30 text-forge-warning'
          }`}
        >
          {feedback}
        </div>
      )}

      <div className="flex gap-3">
        {!verified && (
          <Button onClick={handleVerify}>Verify Logic Flow</Button>
        )}
        {verified && (
          <Button onClick={onComplete} icon={CheckCircle2}>
            Continue to Pseudocode
          </Button>
        )}
      </div>
    </div>
  )
}
