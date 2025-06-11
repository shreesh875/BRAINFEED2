import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const availableInterests = [
  { id: '1', name: 'Artificial Intelligence' },
  { id: '2', name: 'Machine Learning' },
  { id: '3', name: 'Data Science' },
  { id: '4', name: 'Computer Science' },
  { id: '5', name: 'Physics' },
  { id: '6', name: 'Mathematics' },
  { id: '7', name: 'Biology' },
  { id: '8', name: 'Chemistry' },
  { id: '9', name: 'Neuroscience' },
  { id: '10', name: 'Psychology' },
  { id: '11', name: 'Economics' },
  { id: '12', name: 'Philosophy' },
  { id: '13', name: 'History' },
  { id: '14', name: 'Literature' },
  { id: '15', name: 'Linguistics' },
  { id: '16', name: 'Astronomy' },
  { id: '17', name: 'Environmental Science' },
  { id: '18', name: 'Medicine' },
  { id: '19', name: 'Engineering' },
  { id: '20', name: 'Quantum Computing' },
  { id: '21', name: 'Robotics' },
  { id: '22', name: 'Biotechnology' },
  { id: '23', name: 'Cybersecurity' },
  { id: '24', name: 'Blockchain' },
  { id: '25', name: 'Climate Science' }
]

const InterestSelection: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { updateProfile } = useUser()
  const navigate = useNavigate()

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
      // Save interests to localStorage
      const selectedInterestNames = availableInterests
        .filter(interest => selectedInterests.includes(interest.id))
        .map(interest => interest.name)
      
      localStorage.setItem('brainfeed-interests', JSON.stringify(selectedInterestNames))
      
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
            {availableInterests.map((interest) => (
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
              Selected: {selectedInterests.length}/{availableInterests.length} (minimum 3)
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