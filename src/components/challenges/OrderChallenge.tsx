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
import { arraysEqual } from '../../utils/helpers'

interface OrderChallengeProps {
  steps: { id: string; label: string }[]
  correctOrder: string[]
  onSuccess: () => void
}

function SortableStep({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-forge-border bg-forge-card cursor-grab"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-4 h-4 text-forge-muted" />
      <span className="font-mono text-sm">{label}</span>
    </div>
  )
}

export function OrderChallenge({ steps, correctOrder, onSuccess }: OrderChallengeProps) {
  const [items, setItems] = useState(() => [...steps].sort(() => Math.random() - 0.5))
  const [feedback, setFeedback] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id)
        const newIndex = prev.findIndex((s) => s.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
      setFeedback(null)
      setSuccess(false)
    }
  }

  const handleSubmit = () => {
    const order = items.map((s) => s.id)
    if (arraysEqual(order, correctOrder)) {
      setFeedback('Correct order. Each step depends on the previous one completing first.')
      setSuccess(true)
      setTimeout(onSuccess, 1000)
    } else {
      const firstWrong = order.findIndex((id, i) => id !== correctOrder[i])
      setFeedback(
        firstWrong >= 0
          ? `Step ${firstWrong + 1} is out of place. What must happen before "${items[firstWrong]?.label}"?`
          : 'The sequence order is incorrect. Consider dependencies between steps.'
      )
    }
  }

  return (
    <div>
      <p className="text-sm text-forge-muted mb-4">Drag steps into the correct execution order:</p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 mb-4">
            {items.map((step) => (
              <SortableStep key={step.id} id={step.id} label={step.label} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
          Submit Order
        </Button>
      )}
    </div>
  )
}
