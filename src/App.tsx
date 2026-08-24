import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { MissionPage } from './pages/MissionPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="mission/:missionId" element={<MissionPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  )
}
