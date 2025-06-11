import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DailyProvider } from '@daily-co/daily-react'
import { UserProvider, useUser } from './contexts/UserContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout/Layout'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import InterestSelection from './components/Onboarding/InterestSelection'
import Feed from './pages/Feed'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import BrainMate from './pages/BrainMate'

const AppRoutes: React.FC = () => {
  const { user, profile, loading } = useUser()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading BrainFeed...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/signin" 
        element={!user ? <SignIn /> : <Navigate to="/feed" replace />} 
      />
      <Route 
        path="/signup" 
        element={!user ? <SignUp /> : <Navigate to="/feed" replace />} 
      />

      {/* Onboarding Route */}
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute requireOnboarding={false}>
            {profile?.onboarding_completed ? (
              <Navigate to="/feed" replace />
            ) : (
              <InterestSelection />
            )}
          </ProtectedRoute>
        } 
      />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/feed" replace />} />
        <Route path="feed" element={<Feed />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="brainmate" element={
          <DailyProvider>
            <BrainMate />
          </DailyProvider>
        } />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App