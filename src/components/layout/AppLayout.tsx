import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { AmbientBackground } from './AmbientBackground'

export function AppLayout() {
  return (
    <div className="min-h-screen grid-bg relative">
      <AmbientBackground />
      <div className="relative z-10">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
