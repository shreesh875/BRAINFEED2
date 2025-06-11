import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { supabase } from '../../lib/supabase'

interface Interest {
  id: string
  name: string
}

const InterestSelection: React.FC = () => {
  const [interests, setInterests] = useState<Interest[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingInterests, setLoadingInterests] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, updateProfile } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    fetchInterests()
  }, [])

  const fetchInterests = async () => {
    try {
      const { data, error } = await supabase
        .from('interests')
        .select('id, name')
        .order('name')

      if (error) throw error
      setInterests(data || [])
    } catch (error) {
      console.error('Error fetching interests:', error)
      setError('Failed to load interests')
    } finally {
      setLoadingInterests(false)
    }
  }

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleContinue = async () => {
    if (selectedInterests.length < 3) return

    setLoading(true)
    setError(null)
    
    try {
      // Save user interests
      const interestInserts = selectedInterests.map(interestId => ({
        user_id: user?.id,
        interest_id: interestId
      }))
      
      const { error: interestsError } = await supabase
        .from('user_interests')
        .insert(interestInserts)
      
      if (interestsError) throw interestsError
      
      // Mark onboarding as completed
      await updateProfile({ onboarding_completed: true })
      
      navigate('/feed')
    } catch (error: any) {
      console.error('Error saving interests:', error)
      setError(error.message || 'Failed to save interests')
    } finally {
      setLoading(false)
    }
  }

  if (loadingInterests) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading interests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to BrainFeed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Let's personalize your experience by selecting topics you're interested in.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  selectedInterests.includes(interest.id)
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                {interest.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected: {selectedInterests.length}/{interests.length} (minimum 3)
            </p>
            <button
              onClick={handleContinue}
              disabled={selectedInterests.length < 3 || loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Setting up...
                </div>
              ) : (
                'Continue to Feed'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterestSelection