import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { supabase } from '../../lib/supabase'

const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Quantum Physics',
  'Astronomy',
  'Biology',
  'Chemistry',
  'Mathematics',
  'Computer Science',
  'Neuroscience',
  'Psychology',
  'Economics'
]

const InterestSelection: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { user, updateProfile } = useUser()
  const navigate = useNavigate()

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleContinue = async () => {
    if (selectedInterests.length < 3) return

    setLoading(true)
    try {
      // Save user interests
      const interestPromises = selectedInterests.map(interest =>
        supabase.from('user_interests').insert({
          user_id: user?.id,
          interest_name: interest
        })
      )
      
      await Promise.all(interestPromises)
      
      // Mark onboarding as completed
      await updateProfile({ onboarding_completed: true })
      
      navigate('/feed')
    } catch (error) {
      console.error('Error saving interests:', error)
    } finally {
      setLoading(false)
    }
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  selectedInterests.includes(interest)
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected: {selectedInterests.length}/12 (minimum 3)
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