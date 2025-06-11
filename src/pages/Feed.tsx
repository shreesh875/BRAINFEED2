import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import FeedPost from '../components/Feed/FeedPost'
import QuizModal from '../components/Feed/QuizModal'
import { usePapers } from '../hooks/usePapers'

// Mock data for demonstration (keeping some for variety)
const mockPosts = [
  {
    id: 'mock-1',
    type: 'video' as const,
    title: 'Introduction to Neural Networks',
    description: 'A beginner-friendly overview of neural networks and their applications in modern AI systems.',
    author: {
      name: 'Dr. Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@alexchen'
    },
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Neural Networks', 'Deep Learning', 'AI Fundamentals'],
    likes: 342,
    comments: 47,
    timeAgo: '2h ago'
  },
  {
    id: 'mock-2',
    type: 'article' as const,
    title: 'The Future of Renewable Energy',
    description: 'Exploring innovative solar and wind technologies that could revolutionize how we generate clean energy.',
    author: {
      name: 'Dr. Michael Torres',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      handle: '@mtorres'
    },
    thumbnail: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Renewable Energy', 'Sustainability', 'Technology'],
    likes: 289,
    comments: 34,
    timeAgo: '1d ago'
  }
]

const mockQuizQuestion = {
  id: '1',
  question: 'What is the primary function of a neural network\'s activation function?',
  options: [
    'To store data in the network',
    'To introduce non-linearity and enable complex pattern recognition',
    'To reduce the size of the network',
    'To connect different layers'
  ],
  correctAnswer: 1,
  explanation: 'Activation functions introduce non-linearity into neural networks, allowing them to learn and represent complex patterns that linear functions cannot capture.'
}

const Feed: React.FC = () => {
  const { papers, loading: papersLoading, error: papersError, refetch } = usePapers()
  const [viewedPosts, setViewedPosts] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [points, setPoints] = useState(0)

  // Combine mock posts with real papers
  const allPosts = [...mockPosts, ...papers]

  useEffect(() => {
    // Trigger quiz every 3 posts viewed
    if (viewedPosts > 0 && viewedPosts % 3 === 0) {
      setShowQuiz(true)
    }
  }, [viewedPosts])

  const handlePostView = () => {
    setViewedPosts(prev => prev + 1)
  }

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      setPoints(prev => prev + 10)
    }
  }

  const handleCloseQuiz = () => {
    setShowQuiz(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Feed</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover educational content tailored to your interests</p>
        
        <div className="flex items-center justify-center space-x-4 mt-4">
          {points > 0 && (
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full">
              <span className="font-semibold">Points: {points}</span>
            </div>
          )}
          
          <button
            onClick={refetch}
            disabled={papersLoading}
            className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${papersLoading ? 'animate-spin' : ''}`} />
            Refresh Papers
          </button>
        </div>
      </div>

      {papersError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">
            Failed to load research papers: {papersError}
          </p>
        </div>
      )}

      {papersLoading && (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading personalized research papers...</p>
        </div>
      )}

      <div className="space-y-6">
        {allPosts.map((post, index) => (
          <div key={post.id} onMouseEnter={() => index === viewedPosts && handlePostView()}>
            <FeedPost post={post} />
          </div>
        ))}
      </div>

      {allPosts.length === 0 && !papersLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No posts available. Try refreshing or check your interests in your profile.
          </p>
        </div>
      )}

      <QuizModal
        isOpen={showQuiz}
        onClose={handleCloseQuiz}
        question={mockQuizQuestion}
        onAnswer={handleQuizAnswer}
      />
    </div>
  )
}

export default Feed