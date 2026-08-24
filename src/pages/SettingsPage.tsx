import { Trash2 } from 'lucide-react'
import { useGameProgress } from '../context/ProgressContext'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function SettingsPage() {
  const { progress, resetProgress } = useGameProgress()

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      resetProgress()
      window.location.href = '/'
    }
  }

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-forge-muted text-sm mb-8">Manage your LogicForge experience.</p>

      <Card className="mb-4">
        <h2 className="font-semibold mb-2">Progress</h2>
        <p className="text-sm text-forge-muted mb-1">XP: {progress.xp}</p>
        <p className="text-sm text-forge-muted mb-1">Missions completed: {progress.completedMissions.length}</p>
        <p className="text-sm text-forge-muted">Achievements: {progress.achievements.length}</p>
      </Card>

      <Card className="mb-4">
        <h2 className="font-semibold mb-2">Data Storage</h2>
        <p className="text-sm text-forge-muted">
          Your progress is saved locally in your browser. No account or server is required.
        </p>
      </Card>

      <Button variant="danger" icon={Trash2} onClick={handleReset}>
        Reset All Progress
      </Button>
    </div>
  )
}
