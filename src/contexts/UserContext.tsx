import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserProfile {
  id: string
  username: string
  full_name: string
  avatar_url?: string
  points: number
  streak: number
  created_at: string
  onboarding_completed: boolean
}

interface UserContextType {
  user: any | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Mock user data
const mockUser = {
  id: 'mock-user-123',
  email: 'demo@brainfeed.com'
}

const defaultProfile: UserProfile = {
  id: 'mock-user-123',
  username: 'demo_user',
  full_name: 'Demo User',
  points: 245,
  streak: 3,
  created_at: new Date().toISOString(),
  onboarding_completed: true
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and auto-login for demo
    const timer = setTimeout(() => {
      const savedProfile = localStorage.getItem('brainfeed-profile')
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile)
        setProfile(parsedProfile)
        setUser(mockUser)
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const signUp = async (email: string, password: string, fullName: string, username: string) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newProfile: UserProfile = {
      id: 'mock-user-123',
      username,
      full_name: fullName,
      points: 0,
      streak: 0,
      created_at: new Date().toISOString(),
      onboarding_completed: false
    }
    
    setUser(mockUser)
    setProfile(newProfile)
    localStorage.setItem('brainfeed-profile', JSON.stringify(newProfile))
    setLoading(false)
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setUser(mockUser)
    setProfile(defaultProfile)
    localStorage.setItem('brainfeed-profile', JSON.stringify(defaultProfile))
    setLoading(false)
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
    localStorage.removeItem('brainfeed-profile')
    localStorage.removeItem('brainfeed-interests')
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return
    
    const updatedProfile = { ...profile, ...updates }
    setProfile(updatedProfile)
    localStorage.setItem('brainfeed-profile', JSON.stringify(updatedProfile))
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}