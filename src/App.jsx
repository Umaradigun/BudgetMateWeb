import { useState } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { Dashboard } from './components/Dashboard'
import { LandingPage } from './components/LandingPage'
import './App.css'

function AppContent() {
  const { user, loading } = useAuth()
  const [showLanding, setShowLanding] = useState(!user)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">💰</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading BudgetMate...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return <Dashboard />
  }

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />
  }

  return <AuthForm />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

